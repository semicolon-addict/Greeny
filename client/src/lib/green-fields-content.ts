/*
///////////////////////////////////////////////////
Author: Shashank Kakad
Inputs: Replaced synthetic page constants with values extracted from Kaluba source PDFs and PPTX files in Website Development.
Outcome: Task 1 pages can now render source-backed advisory content, verified contact details, real transaction mandates, and policy requirements.
Short Description: Centralized extracted Greenfields copy, project mandates, contact details, and join-us values for production-ready Task 1 wiring.
/////////////////////////////////////////////////////////////
*/

export type ClientHighlight = {
  label: string;
  value: string;
  detail: string;
};

export type ClientPartner = {
  name: string;
  sector: string;
  geography: string;
  role: string;
  partnership: string;
  disclosedValue?: string;
};

export type PortfolioProject = {
  name: string;
  location: string;
  sector: string;
  type: string;
  role: string;
  dealSize: string;
  description: string;
  imageUrl: string;
  source: string;
};

export type OfficeLocation = {
  city: string;
  addressLineOne: string;
  addressLineTwo: string;
  country: string;
  phone: string;
  email?: string;
  hours?: string;
  mapQuery: string;
};

export const homeCopy = {
  heroHeading: "Your Partners in a Sustainable Future",
  heroBody:
    "We bridge the gap between impossible and possible by supporting the mobilisation of capital for sustainable development and creating value that lasts for generations.",
  whoWeAre:
    "Greenfields is a premier independent advisory firm focused on sustainable infrastructure and industrial development across developing economies.",
} as const;

export const aboutCopy = {
  intro:
    "Delivering sustainable finance and advisory services across Africa with a focus on financial, economic, and social outcomes.",
  companyNarrative:
    "Greenfields, also known as Greeny, is an independent transaction advisory and economic development consultancy focused on sustainable infrastructure and industrial development across Africa.",
  capabilityStatement:
    "The team has advised on transactions in excess of R800 billion across project finance, infrastructure finance, corporate advisory, and public and private capital markets.",
  purpose:
    "We live to accelerate the development of sustainable infrastructure, industry, and commerce by unlocking projects and transactions that matter.",
} as const;

export const clientHighlights: ClientHighlight[] = [
  {
    label: "Transaction exposure",
    value: "R800bn+",
    detail: "Extracted from the About Us source brief describing advised transaction value across core sectors.",
  },
  {
    label: "Operating history",
    value: "10+ years",
    detail: "Source brief confirms Greenfields has operated for more than a decade in advisory and development work.",
  },
  {
    label: "Regional footprint",
    value: "Sub-Saharan Africa",
    detail: "Source copy references a network of offices and delivery capability across Sub-Saharan African markets.",
  },
];

export const clientPartners: ClientPartner[] = [
  {
    name: "Department of Electricity and Energy and IPP Office",
    sector: "Public energy infrastructure",
    geography: "South Africa",
    role: "Financial and Economic Development Advisor",
    partnership:
      "Advisory support on Independent Transmission Projects, Renewable Energy IPP procurement, and Battery Energy Storage programmes.",
  },
  {
    name: "Department of Public Works and Infrastructure and GTAC",
    sector: "Public infrastructure",
    geography: "South Africa",
    role: "Transaction and programme advisor",
    partnership:
      "Support on the Integrated Renewable Energy and Resource Efficiency Programme and the National Solar Water Heater Programme.",
  },
  {
    name: "Development Bank of Southern Africa and Magalies Water",
    sector: "Water infrastructure",
    geography: "South Africa",
    role: "Transaction advisor",
    partnership:
      "Advisory support on the Pilanesberg and Moretele North Klipvoor bulk water supply schemes.",
  },
  {
    name: "Department of Trade, Industry and Competition",
    sector: "Public facilities",
    geography: "South Africa",
    role: "Financial Advisor",
    partnership:
      "Transaction support on a potential acquisition of a stake in an office accommodation asset.",
    disclosedValue: "R230 Billion",
  },
  {
    name: "ROMPCO Pipeline stakeholders",
    sector: "Pipeline and energy infrastructure",
    geography: "South Africa and Mozambique",
    role: "Financial Advisor",
    partnership:
      "Transaction advisory for the potential acquisition of a stake in the ROMPCO pipeline.",
    disclosedValue: "R4.1 Billion",
  },
  {
    name: "eThala Power and African Development Bank",
    sector: "Power generation",
    geography: "Sub-Saharan Africa",
    role: "Development and financing advisor",
    partnership:
      "Support on development and financing of a biomass power project highlighted in source documents.",
    disclosedValue: "R0.6 Billion",
  },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    name: "Acquisition of a Stake in DTIC Office Accommodation",
    location: "South Africa",
    sector: "Public Infrastructure",
    type: "Transaction Advisory",
    role: "Financial Advisor",
    dealSize: "R230 Billion",
    description:
      "Advisory support for a potential acquisition of a stake in a Department of Trade, Industry and Competition office accommodation asset.",
    imageUrl: "/kaluba/project-water.jpg",
    source: "Transactions.pptx",
  },
  {
    name: "Integrated Renewable Energy and Resource Efficiency Programme",
    location: "South Africa",
    sector: "Renewable Energy",
    type: "Programme Advisory",
    role: "Financial and Economic Development Advisor",
    dealSize: "R387 Billion",
    description:
      "Advisory support across procurement and programme structuring for large-scale renewable energy implementation.",
    imageUrl: "/kaluba/project-renewables.jpg",
    source: "Transactions.pptx",
  },
  {
    name: "National Solar Water Heater Programme",
    location: "South Africa",
    sector: "Renewable Energy",
    type: "Feasibility and Procurement Support",
    role: "Financial and Economic Development Advisor",
    dealSize: "R18 Billion",
    description:
      "Feasibility and procurement support for implementation of a national solar water heater programme.",
    imageUrl: "/kaluba/project-energy.jpg",
    source: "Transactions.pptx",
  },
  {
    name: "REIPPPP Bid Window 7",
    location: "South Africa",
    sector: "Renewable Energy",
    type: "Procurement Programme Advisory",
    role: "Financial and Economic Development Advisor",
    dealSize: "R230 Billion",
    description:
      "Support for procurement of 3,940MW of solar PV and onshore wind under Bid Window 7.",
    imageUrl: "/kaluba/project-renewables.jpg",
    source: "Transactions.pptx",
  },
  {
    name: "Battery Energy Storage IPP Programme Bid Window 3",
    location: "South Africa",
    sector: "Power and Storage",
    type: "Economic Development Advisory",
    role: "Economic Development Advisor",
    dealSize: "R9.5 Billion",
    description:
      "Advisory support on procurement of 616MW and 2,464MWh of battery energy storage capacity.",
    imageUrl: "/kaluba/project-energy.jpg",
    source: "Transactions.pptx",
  },
  {
    name: "Battery Energy Storage IPP Programme Bid Window 2",
    location: "South Africa",
    sector: "Power and Storage",
    type: "Economic Development Advisory",
    role: "Economic Development Advisor",
    dealSize: "R12.8 Billion",
    description:
      "Advisory support on procurement of 615MW and 2,460MWh of battery energy storage capacity.",
    imageUrl: "/kaluba/project-dam.jpeg",
    source: "Transactions.pptx",
  },
  {
    name: "REIPPPP Bid Window 5",
    location: "South Africa",
    sector: "Renewable Energy",
    type: "Procurement Programme Advisory",
    role: "Financial Advisor",
    dealSize: "R250 Billion",
    description:
      "Advisory support for procurement of 2,583MW of solar PV and onshore wind capacity.",
    imageUrl: "/kaluba/project-renewables.jpg",
    source: "Transactions.pptx",
  },
  {
    name: "Biomass Plant Development",
    location: "Sub-Saharan Africa",
    sector: "Power Generation",
    type: "Transaction Advisory",
    role: "Financial Advisor",
    dealSize: "R0.6 Billion",
    description:
      "Transaction advisory for development of a biomass plant project highlighted in source transaction materials.",
    imageUrl: "/kaluba/project-dam.jpeg",
    source: "Transactions.pptx",
  },
];

export const dashboardQuickLinks = [
  {
    title: "Clients",
    href: "/clients",
    description: "Review source-backed client counterparties and mandate summaries.",
  },
  {
    title: "Projects",
    href: "/projects",
    description: "Browse transaction-derived project entries from the supplied deck.",
  },
  {
    title: "Transactions",
    href: "/transactions",
    description: "Open the concise track-record table maintained through API records.",
  },
  {
    title: "Publications",
    href: "/publications",
    description: "Access extracted brief items and insight/publication records.",
  },
  {
    title: "Contact",
    href: "/contact",
    description: "Validate head-office details and map routing from source requirements.",
  },
] as const;

export const officeLocations: OfficeLocation[] = [
  {
    city: "Head Office",
    addressLineOne: "2 Norwich Close",
    addressLineTwo: "Sandown, Sandton, 2031",
    country: "South Africa",
    phone: "+27 021 013 7199",
    mapQuery: "2 Norwich Close, Sandown, Sandton, 2031, South Africa",
  },
];

export const socialLinks: { label: string; href: string; description: string }[] = [];

export const joinUsCulturePoints = [
  "Work with multidisciplinary teams across infrastructure, industry, and transaction advisory mandates.",
  "Contribute to projects designed to deliver financial, economic, and social outcomes.",
  "Grow in a high-trust environment anchored by integrity, collaboration, and excellence.",
] as const;

export const joinUsValues = [
  {
    title: "Integrity",
    description: "We stick to our word and deliver on our promises.",
  },
  {
    title: "Impact",
    description: "We are driven by the impact we make.",
  },
  {
    title: "Collaboration",
    description: "We work together.",
  },
  {
    title: "Client-centric",
    description: "We focus on our clients' needs to deliver tailored solutions.",
  },
  {
    title: "Evolution",
    description: "We believe in continuously adapting and growing.",
  },
  {
    title: "Excellence",
    description: "We believe in a better way every time.",
  },
] as const;

export const footerPolicyLinks = [
  "Terms and Conditions",
  "Legal and Privacy",
  "Cookie Policy",
  "Privacy Notice",
  "PAIA",
] as const;
