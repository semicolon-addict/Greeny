/*
///////////////////////////////////////////////////
Author: Shashank Kakad
Inputs: Replaced synthetic project cards with mandates extracted from Transactions source material and mapped to real Kaluba image assets.
Outcome: The Projects page now reflects source-backed transaction/project entries with sector filters and advisory roles, without fabricated years or outcome claims.
Short Description: Reworked the projects portfolio to display extracted mandates, disclosed values, and source references using real project imagery.
/////////////////////////////////////////////////////////////
*/

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { portfolioProjects } from "@/lib/green-fields-content";
import { ArrowRight, Handshake, MapPin, SlidersHorizontal } from "lucide-react";
import { useDeferredValue, useState } from "react";
import { Link } from "wouter";

const sectorStyles: Record<string, string> = {
  "Public Infrastructure": "from-[#205E3B] to-[#2E8B7F]",
  "Renewable Energy": "from-[#1D5A4E] to-[#3AA387]",
  "Power and Storage": "from-[#1E4D62] to-[#4A90A4]",
  "Power Generation": "from-[#26695A] to-[#67B59C]",
};

export default function Projects() {
  const [activeSector, setActiveSector] = useState("All");
  const deferredSector = useDeferredValue(activeSector);
  const sectors = ["All", ...Array.from(new Set(portfolioProjects.map((project) => project.sector)))];
  const filteredProjects =
    deferredSector === "All"
      ? portfolioProjects
      : portfolioProjects.filter((project) => project.sector === deferredSector);

  const geographyCount = new Set(portfolioProjects.map((project) => project.location)).size;
  const sourcedCount = new Set(portfolioProjects.map((project) => project.source)).size;

  return (
    <div className="pb-20">
      <section className="bg-[linear-gradient(135deg,#205E3B_0%,#163E28_55%,#2E8B7F_100%)] py-20 text-white">
        <div className="container mx-auto px-4">
          <Badge className="mb-6 bg-white/15 text-white shadow-none">Transaction-derived project set</Badge>
          <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div className="space-y-6">
              <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
                Projects and mandates extracted from supplied transactions material.
              </h1>
              <p className="max-w-2xl text-lg text-white/80">
                This portfolio includes disclosed assignments, procurement programmes, and advisory mandates captured
                directly from source decks and supporting brief files.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/transactions">
                  <Button size="lg" className="bg-[#A6E79F] text-[#163E28] hover:bg-[#95d48e]">
                    View transaction table
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">
                    Discuss a mandate
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid gap-6 rounded-[2rem] border border-white/15 bg-white/10 p-8 shadow-2xl sm:grid-cols-3">
              <div className="space-y-2">
                <p className="text-3xl font-bold">{portfolioProjects.length}</p>
                <p className="font-medium">Mandates profiled</p>
                <p className="text-sm leading-6 text-white/70">Each row is sourced from provided transaction material.</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold">{geographyCount}</p>
                <p className="font-medium">Geographies</p>
                <p className="text-sm leading-6 text-white/70">Coverage spans South Africa and regional mandates.</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold">{sourcedCount}</p>
                <p className="font-medium">Source files</p>
                <p className="text-sm leading-6 text-white/70">Content currently originates from extracted transaction docs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4 rounded-[1.75rem] border border-[#205E3B]/10 bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-[#205E3B]">
                <SlidersHorizontal className="h-5 w-5" />
                <p className="text-sm font-semibold uppercase tracking-[0.3em]">Filter by sector</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Filter source-backed mandates by sector.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {sectors.map((sector) => {
                const isActive = sector === activeSector;

                return (
                  <button
                    key={sector}
                    type="button"
                    onClick={() => setActiveSector(sector)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "border-[#205E3B] bg-[#205E3B] text-white"
                        : "border-[#205E3B]/15 bg-white text-[#205E3B] hover:border-[#205E3B]/40 hover:bg-[#F7F8F8]"
                    }`}
                  >
                    {sector}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 max-w-3xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#205E3B]">Portfolio highlights</p>
            <h2 className="text-3xl font-bold text-[#205E3B]">Selected mandates with disclosed scope and advisory role.</h2>
            <p className="text-muted-foreground">
              Entries emphasize mandate type, role, location, and disclosed value where available in source content.
            </p>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-[#205E3B]/10 bg-white shadow-sm">
            {filteredProjects.map((project) => (
              <article
                key={project.name}
                className="grid gap-0 border-b border-[#205E3B]/10 last:border-b-0 xl:grid-cols-[340px_1fr]"
              >
                <div className="relative min-h-[260px] overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={`${project.name} project visual`}
                    className="h-full w-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br opacity-85 ${
                      sectorStyles[project.sector] ?? "from-[#205E3B] to-[#2E8B7F]"
                    }`}
                  />
                  <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <Badge className="bg-white/15 text-white shadow-none">{project.type}</Badge>
                      <Badge variant="outline" className="border-white/30 text-white">{project.source}</Badge>
                    </div>
                    <div className="space-y-4">
                      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/75">{project.sector}</p>
                      <h3 className="text-3xl font-bold">{project.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-white/80">
                        <MapPin className="h-4 w-4" />
                        <span>{project.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-8 p-8 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="space-y-5">
                    <p className="leading-7 text-muted-foreground">{project.description}</p>
                    <div className="rounded-[1.5rem] bg-[#F7F8F8] p-5">
                      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#205E3B]">Advisory role</p>
                      <p className="mt-3 inline-flex items-center gap-2 text-base leading-7 text-slate-700">
                        <Handshake className="h-4 w-4 text-[#205E3B]" />
                        {project.role}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 border-l-0 border-[#205E3B]/10 pl-0 lg:border-l lg:pl-8">
                    <div className="rounded-[1.5rem] border border-[#205E3B]/10 p-5">
                      <p className="text-sm font-semibold text-[#205E3B]">Disclosed deal value</p>
                      <p className="mt-3 text-2xl font-bold text-slate-900">{project.dealSize}</p>
                    </div>
                    <div className="rounded-[1.5rem] border border-[#205E3B]/10 p-5">
                      <p className="text-sm font-semibold text-[#205E3B]">Geography</p>
                      <p className="mt-3 text-2xl font-bold text-slate-900">{project.location}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="mt-8 rounded-[1.75rem] border border-dashed border-[#205E3B]/20 bg-[#F7F8F8] p-10 text-center">
              <p className="text-lg font-semibold text-[#205E3B]">No projects match this filter yet.</p>
              <p className="mt-2 text-muted-foreground">
                Switch sectors or move to Transactions for the full tabular record.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="rounded-[2rem] bg-[linear-gradient(135deg,#F7F8F8_0%,#ffffff_50%,#e5f4e2_100%)] p-8 shadow-sm md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#205E3B]">Need the full track record?</p>
              <h2 className="text-3xl font-bold text-[#205E3B]">Use the Transactions page for the concise deal-by-deal view.</h2>
              <p className="max-w-2xl text-muted-foreground">
                Projects provide mandate context and sector grouping. Transactions provide the compact line-by-line list.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 lg:justify-end">
              <Link href="/transactions">
                <Button size="lg" className="bg-[#205E3B] text-white hover:bg-[#18492e]">
                  Go to transactions
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-[#205E3B]/20 text-[#205E3B]">
                  Contact our team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
