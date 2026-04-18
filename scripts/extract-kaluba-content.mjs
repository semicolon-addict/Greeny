/*
///////////////////////////////////////////////////
Author: Shashank Kakad
Inputs: Requested a repeatable extraction workflow for the provided Kaluba PDF and PPTX source files so page content can be derived from real project inputs.
Outcome: Generates structured JSON and markdown artifacts with extracted text and normalized fields that can be reused by the frontend and backend.
Short Description: Extracts source copy from Website Development assets into attached_assets/extracted for Task 1 data wiring.
/////////////////////////////////////////////////////////////
*/

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFParse } from "pdf-parse";
import JSZip from "jszip";
import { XMLParser } from "fast-xml-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const sourceRoot = path.join(projectRoot, "Kaluba_Website_Assets", "Website Development");
const outputRoot = path.join(projectRoot, "attached_assets", "extracted");
const jsonOutputPath = path.join(outputRoot, "kaluba-extracted.json");
const markdownOutputPath = path.join(outputRoot, "kaluba-extracted.md");
const normalizedOutputPath = path.join(outputRoot, "kaluba-normalized.json");

function toUnixPath(inputPath) {
  return inputPath.replaceAll("\\", "/");
}

function toProjectRelative(inputPath) {
  return toUnixPath(path.relative(projectRoot, inputPath));
}

async function listFilesRecursively(directoryPath) {
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      const nested = await listFilesRecursively(fullPath);
      files.push(...nested);
      continue;
    }

    files.push(fullPath);
  }

  return files;
}

function cleanText(rawText) {
  return rawText
    .replaceAll("\r\n", "\n")
    .replaceAll("\u0000", "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function lineArray(text) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function findLineValue(lines, prefix) {
  const line = lines.find((candidate) => candidate.toLowerCase().includes(prefix.toLowerCase()));
  if (!line) {
    return "";
  }

  const normalizedPrefix = prefix.toLowerCase();
  const prefixIndex = line.toLowerCase().indexOf(normalizedPrefix);
  const rawValue = line.slice(prefixIndex + prefix.length).trim();

  if (rawValue.length > 0) {
    return rawValue;
  }

  const index = lines.indexOf(line);
  if (index < 0 || index + 1 >= lines.length) {
    return "";
  }

  return lines[index + 1].trim();
}

function collectBullets(lines, startLabel) {
  const startIndex = lines.findIndex((line) => line.toLowerCase().includes(startLabel.toLowerCase()));

  if (startIndex < 0) {
    return [];
  }

  const bullets = [];
  for (let index = startIndex + 1; index < lines.length; index += 1) {
    const line = lines[index];

    if (line.startsWith("--") || line.toLowerCase().includes("website input") || line.toLowerCase().includes("notes")) {
      continue;
    }

    if (line.startsWith("•") || line.startsWith("-") || line.startsWith("−")) {
      bullets.push(line.replace(/^[•\-−]\s*/, "").trim());
      continue;
    }

    if (bullets.length > 0 && !line.startsWith("©")) {
      bullets.push(line);
      continue;
    }

    if (bullets.length > 0) {
      break;
    }
  }

  return bullets;
}

async function extractPdf(filePath) {
  const data = await fs.readFile(filePath);
  const parser = new PDFParse({ data });

  try {
    const result = await parser.getText();
    const text = cleanText(result.text ?? "");

    return {
      type: "pdf",
      text,
      pages: result.pages?.length ?? undefined,
    };
  } finally {
    await parser.destroy();
  }
}

function collectTextNodes(node, collector = []) {
  if (node === null || node === undefined) {
    return collector;
  }

  if (typeof node === "string") {
    const normalized = node.trim();
    if (normalized.length > 0) {
      collector.push(normalized);
    }
    return collector;
  }

  if (Array.isArray(node)) {
    for (const item of node) {
      collectTextNodes(item, collector);
    }
    return collector;
  }

  if (typeof node === "object") {
    for (const [key, value] of Object.entries(node)) {
      const isTextNode = key === "a:t" || key.endsWith(":t") || key === "t";

      if (isTextNode) {
        collectTextNodes(value, collector);
      } else {
        collectTextNodes(value, collector);
      }
    }
  }

  return collector;
}

function uniquePreserveOrder(list) {
  const seen = new Set();
  const unique = [];

  for (const item of list) {
    if (seen.has(item)) {
      continue;
    }

    seen.add(item);
    unique.push(item);
  }

  return unique;
}

function slideNumber(slidePath) {
  const match = /slide(\d+)\.xml$/.exec(slidePath);
  if (!match) {
    return Number.POSITIVE_INFINITY;
  }

  return Number(match[1]);
}

async function extractPptx(filePath) {
  const data = await fs.readFile(filePath);
  const zip = await JSZip.loadAsync(data);
  const parser = new XMLParser({ ignoreAttributes: false, trimValues: true });

  const slidePaths = Object.keys(zip.files)
    .filter((zipEntryPath) => /^ppt\/slides\/slide\d+\.xml$/.test(zipEntryPath))
    .sort((left, right) => slideNumber(left) - slideNumber(right));

  const slides = [];

  for (const slidePath of slidePaths) {
    const slideXml = await zip.file(slidePath)?.async("text");
    if (!slideXml) {
      continue;
    }

    const parsedXml = parser.parse(slideXml);
    const allNodes = collectTextNodes(parsedXml, []);
    const deduplicated = uniquePreserveOrder(allNodes);

    slides.push({
      slide: slidePath,
      text: deduplicated.join("\n"),
    });
  }

  const fullText = cleanText(slides.map((slide) => slide.text).join("\n\n"));

  return {
    type: "pptx",
    text: fullText,
    slides,
  };
}

function extractServiceTitles(capabilitiesText) {
  const lines = lineArray(capabilitiesText);
  const blockedWords = new Set([
    "services",
    "notes",
    "website input",
    "march 2026",
    "capabilities page",
    "greenfields website",
  ]);

  const serviceTitles = [];
  for (const line of lines) {
    const lower = line.toLowerCase();
    if (blockedWords.has(lower)) {
      continue;
    }

    const isShortTitle = line.length > 4 && line.length < 60;
    const titleStyle = /^[A-Z][A-Za-z&/\-\s]+$/.test(line);
    const looksLikeSentence = line.endsWith(".") || line.includes(",");

    if (isShortTitle && titleStyle && !looksLikeSentence) {
      serviceTitles.push(line);
    }
  }

  return uniquePreserveOrder(serviceTitles).slice(0, 12);
}

function extractTransactions(transactionText) {
  const lines = lineArray(transactionText)
    .filter((line) => !line.toLowerCase().includes("website input"))
    .filter((line) => !line.toLowerCase().includes("march 2026"));

  const results = [];
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    if (line.toLowerCase().includes("transaction") && !line.toLowerCase().includes("transactions page")) {
      const window = lines.slice(index, index + 6);
      const value = window.find((candidate) => /r\s?\d|\$|usd|zar/i.test(candidate)) ?? "";
      const sector = window.find((candidate) => /power|energy|water|transport|infrastructure|industrial|renewable/i.test(candidate)) ?? "";

      results.push({
        headline: line,
        sector,
        value,
      });
    }
  }

  return uniquePreserveOrder(results.map((item) => JSON.stringify(item))).map((item) => JSON.parse(item));
}

function extractJoinUsHighlights(joinUsText) {
  const lines = lineArray(joinUsText);

  const highlights = [];
  for (const line of lines) {
    const lower = line.toLowerCase();

    if (lower.includes("culture") || lower.includes("values") || lower.includes("career") || lower.includes("join")) {
      highlights.push(line);
    }
  }

  return uniquePreserveOrder(highlights).slice(0, 20);
}

function createNormalizedPayload(documents) {
  const getDocument = (needle) => documents.find((document) => document.relativePath.includes(needle));

  const general = getDocument("General.pdf");
  const home = getDocument("1. Home/Home Page.pdf");
  const about = getDocument("2. About Us/2. About Us/About Us.pdf");
  const capabilities = getDocument("3. Our Capabilities/Capabilities.pdf");
  const contact = getDocument("7. Contact Us/Contact Us.pdf");
  const transactions = getDocument("4. Transactions/Transactions.pptx");
  const joinUs = getDocument("6. Join Us/Join Us.pptx");

  const generalLines = general ? lineArray(general.text) : [];
  const homeLines = home ? lineArray(home.text) : [];
  const aboutLines = about ? lineArray(about.text) : [];
  const contactLines = contact ? lineArray(contact.text) : [];

  const footerLinks = collectBullets(generalLines, "Please include the following links in the website footer")
    .concat(collectBullets(generalLines, "Legal and Privacy should link to following subsections or sub-pages"))
    .filter((line) => line.length > 0);

  const normalized = {
    generatedAt: new Date().toISOString(),
    sourceRoot: toProjectRelative(sourceRoot),
    footer: {
      requiredLinks: uniquePreserveOrder(footerLinks),
    },
    home: {
      heroHeadingChange: findLineValue(homeLines, "Change Investing in a Sustainable Future to"),
      heroBodyChange: findLineValue(homeLines, "Change write up to"),
      whoWeAreCopy: collectBullets(homeLines, "Under Who We Are change write-up to").join(" "),
      backgroundDirection: findLineValue(homeLines, "Let us consider a dynamic homepage instead of static home page"),
    },
    about: {
      aboutIntro: collectBullets(aboutLines, "Please use following text under About Us").join(" "),
      companyNarrative: collectBullets(aboutLines, "Please use following text under The Greeny Company").join(" "),
      purposeStatement: collectBullets(aboutLines, "Our Purpose").join(" "),
      teamNotes: collectBullets(aboutLines, "The Team").join(" "),
    },
    capabilities: {
      serviceTitles: capabilities ? extractServiceTitles(capabilities.text) : [],
      serviceExcerpt: capabilities ? capabilities.text.slice(0, 2400) : "",
    },
    contact: {
      headOfficeAddress: findLineValue(contactLines, "Change Head Office to"),
      mapDirection: findLineValue(contactLines, "Please maps link that people can slick to open in Google Maps or other Maps apps"),
      phone: findLineValue(contactLines, "Change Phone Number to"),
    },
    transactions: {
      extractedHighlights: transactions ? extractTransactions(transactions.text) : [],
      rawSlideCount: transactions?.slides?.length ?? 0,
    },
    joinUs: {
      extractedHighlights: joinUs ? extractJoinUsHighlights(joinUs.text) : [],
      rawSlideCount: joinUs?.slides?.length ?? 0,
    },
  };

  return normalized;
}

function createMarkdown(documents, normalizedPayload) {
  const sections = [];
  sections.push("# Kaluba Extracted Source Data");
  sections.push("");
  sections.push(`Generated: ${normalizedPayload.generatedAt}`);
  sections.push(`Source Root: ${normalizedPayload.sourceRoot}`);
  sections.push("");
  sections.push("## Normalized Summary");
  sections.push("");
  sections.push("```json");
  sections.push(JSON.stringify(normalizedPayload, null, 2));
  sections.push("```");
  sections.push("");

  for (const document of documents) {
    sections.push(`## ${document.relativePath}`);
    sections.push("");
    sections.push(`Type: ${document.type}`);
    sections.push("");

    if (document.type === "pptx" && Array.isArray(document.slides)) {
      for (const slide of document.slides) {
        sections.push(`### ${slide.slide}`);
        sections.push("");
        sections.push("```");
        sections.push(slide.text);
        sections.push("```");
        sections.push("");
      }
      continue;
    }

    sections.push("```");
    sections.push(document.text);
    sections.push("```");
    sections.push("");
  }

  return sections.join("\n");
}

async function main() {
  await fs.mkdir(outputRoot, { recursive: true });

  const allFiles = await listFilesRecursively(sourceRoot);
  const extractableFiles = allFiles.filter((filePath) => {
    const extension = path.extname(filePath).toLowerCase();
    return extension === ".pdf" || extension === ".pptx";
  });

  const documents = [];

  for (const filePath of extractableFiles) {
    const extension = path.extname(filePath).toLowerCase();
    const relativePath = toProjectRelative(filePath);

    if (extension === ".pdf") {
      const extracted = await extractPdf(filePath);
      documents.push({ relativePath, ...extracted });
      continue;
    }

    if (extension === ".pptx") {
      const extracted = await extractPptx(filePath);
      documents.push({ relativePath, ...extracted });
    }
  }

  const normalizedPayload = createNormalizedPayload(documents);
  const markdownPayload = createMarkdown(documents, normalizedPayload);

  await fs.writeFile(jsonOutputPath, `${JSON.stringify(documents, null, 2)}\n`, "utf8");
  await fs.writeFile(normalizedOutputPath, `${JSON.stringify(normalizedPayload, null, 2)}\n`, "utf8");
  await fs.writeFile(markdownOutputPath, `${markdownPayload}\n`, "utf8");

  console.log("Extraction complete.");
  console.log(`Documents: ${documents.length}`);
  console.log(`Raw JSON: ${toProjectRelative(jsonOutputPath)}`);
  console.log(`Normalized JSON: ${toProjectRelative(normalizedOutputPath)}`);
  console.log(`Markdown: ${toProjectRelative(markdownOutputPath)}`);
}

main().catch((error) => {
  console.error("Extraction failed:", error);
  process.exitCode = 1;
});
