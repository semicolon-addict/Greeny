/*
///////////////////////////////////////////////////
Author: Shashank Kakad
Inputs: Replaced synthetic client testimonials and placeholder partnership content with source-backed mandate data extracted from Kaluba transaction materials.
Outcome: The Clients page now reflects real counterparties, sectors, and advisory roles without fabricated quotes or mock relationship metrics.
Short Description: Reworked the clients view into an advisory mandate directory with verified highlights, geography coverage, and transaction-linked context.
/////////////////////////////////////////////////////////////
*/

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { clientHighlights, clientPartners } from "@/lib/green-fields-content";
import { ArrowRight, Building2, Handshake, Landmark, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

export default function Clients() {
  return (
    <div className="pb-20">
      <section className="bg-[linear-gradient(135deg,#205E3B_0%,#163E28_55%,#2E8B7F_100%)] py-20 text-white">
        <div className="container mx-auto px-4">
          <Badge className="mb-6 bg-white/15 text-white shadow-none">Source-backed mandate coverage</Badge>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="space-y-6">
              <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
                Advisory relationships anchored in disclosed mandates and public-sector infrastructure delivery.
              </h1>
              <p className="max-w-2xl text-lg text-white/80">
                This page summarizes counterparties and advisory roles referenced in supplied source documents,
                including programme support, transaction structuring, and economic-development assignments.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-[#A6E79F] text-[#163E28] hover:bg-[#95d48e]">
                    Speak with our team
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">
                    View live projects
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid gap-6 rounded-[2rem] border border-white/15 bg-white/10 p-8 shadow-2xl sm:grid-cols-3">
              {clientHighlights.map((highlight) => (
                <div key={highlight.label} className="space-y-2">
                  <p className="text-3xl font-bold">{highlight.value}</p>
                  <p className="font-medium">{highlight.label}</p>
                  <p className="text-sm leading-6 text-white/70">{highlight.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 max-w-3xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#205E3B]">Client network</p>
            <h2 className="text-3xl font-bold text-[#205E3B]">Selected counterparties and assignments from source material.</h2>
            <p className="text-muted-foreground">
              Each entry below is aligned to extracted mandate references, with role and geography shown explicitly.
            </p>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-[#205E3B]/10 bg-white shadow-sm">
            {clientPartners.map((partner) => (
              <div
                key={partner.name}
                className="grid gap-5 border-b border-[#205E3B]/10 px-6 py-6 last:border-b-0 md:grid-cols-[1.2fr_0.8fr] md:items-start md:px-8"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-bold text-[#205E3B]">{partner.name}</h3>
                    <Badge variant="outline" className="border-[#205E3B]/20 text-[#205E3B]">
                      {partner.sector}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-2">
                      <Landmark className="h-4 w-4 text-[#205E3B]" />
                      {partner.geography}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Handshake className="h-4 w-4 text-[#205E3B]" />
                      {partner.role}
                    </span>
                  </div>
                  <p className="max-w-2xl text-sm leading-7 text-muted-foreground">{partner.partnership}</p>
                </div>
                <div className="border-l-0 border-[#205E3B]/10 pl-0 md:border-l md:pl-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#205E3B]">Disclosed value</p>
                  <p className="mt-3 text-2xl font-bold text-slate-900">{partner.disclosedValue ?? "Not publicly disclosed"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F7F8F8] py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 max-w-3xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#205E3B]">How we support mandates</p>
            <h2 className="text-3xl font-bold text-[#205E3B]">Advisory approach reflected in the sourced client briefs.</h2>
            <p className="text-muted-foreground">
              The source material consistently emphasizes transaction discipline, practical implementation, and clear
              stakeholder outcomes.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[1.75rem] border border-[#205E3B]/10 bg-white p-7 shadow-sm">
              <Handshake className="h-9 w-9 text-[#205E3B]" />
              <h3 className="mt-5 text-2xl font-bold text-[#205E3B]">Transaction Advisory</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Financial and commercial advisory on acquisitions, strategic procurement windows, and programme delivery.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-[#205E3B]/10 bg-white p-7 shadow-sm">
              <ShieldCheck className="h-9 w-9 text-[#205E3B]" />
              <h3 className="mt-5 text-2xl font-bold text-[#205E3B]">Economic Development</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Advisory work that links infrastructure transactions to measurable public and economic outcomes.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-[#205E3B]/10 bg-white p-7 shadow-sm">
              <Building2 className="h-9 w-9 text-[#205E3B]" />
              <h3 className="mt-5 text-2xl font-bold text-[#205E3B]">Programme Support</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                End-to-end support across procurement rounds, implementation pathways, and capital mobilisation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="rounded-[2rem] bg-[linear-gradient(135deg,#F7F8F8_0%,#ffffff_50%,#e5f4e2_100%)] p-8 shadow-sm md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#205E3B]">Start the conversation</p>
              <h2 className="text-3xl font-bold text-[#205E3B]">Need advisory support for infrastructure or industrial transactions?</h2>
              <p className="max-w-2xl text-muted-foreground">
                Use the Contact page to share mandate context, geography, and timeline. We will route the enquiry to the
                relevant advisory team.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 lg:justify-end">
              <Link href="/contact">
                <Button size="lg" className="bg-[#205E3B] text-white hover:bg-[#18492e]">
                  Contact us
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/projects">
                <Button size="lg" variant="outline" className="border-[#205E3B]/20 text-[#205E3B]">
                  Review project set
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
