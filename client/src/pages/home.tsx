/*
///////////////////////////////////////////////////
Author: Shashank Kakad
Inputs: Refreshed the landing page copy and calls to action so the shared public experience aligns with the Green Fields Commercial brief.
Outcome: The homepage now introduces the same brand, sector focus, and page pathways that the new deliverables use.
Short Description: Updated core hero, overview, and statistics content to match the transaction advisory positioning of the project handover.
/////////////////////////////////////////////////////////////
*/

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { clientHighlights, homeCopy, portfolioProjects } from "@/lib/green-fields-content";
import { ArrowRight, BarChart3, Globe, Users } from "lucide-react";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/modern_sustainable_corporate_office_building_with_greenery.png";

export default function Home() {
  const heroWords = homeCopy.heroHeading.split(" ");
  const heroLead = heroWords.slice(0, Math.max(heroWords.length - 2, 1)).join(" ");
  const heroAccent = heroWords.slice(Math.max(heroWords.length - 2, 1)).join(" ");

  return (
    <div className="flex flex-col gap-0">
      <section className="relative flex h-[90vh] items-center">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Modern commercial development with integrated landscaping" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-white">
          <div className="max-w-2xl space-y-6 animate-in slide-in-from-left duration-700">
            <h1 className="text-5xl font-bold leading-tight md:text-7xl">
              {heroLead} <span className="text-emerald-400">{heroAccent}</span>
            </h1>
            <p className="text-xl text-gray-200">
              {homeCopy.heroBody}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/projects">
                <Button size="lg" className="border-none bg-emerald-500 text-white hover:bg-emerald-600">
                  Explore Projects
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold text-primary">Who We Are</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {homeCopy.whoWeAre}
          </p>
        </div>
      </section>

      <section className="bg-secondary/30 py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-none shadow-lg transition-shadow hover:shadow-xl">
              <CardContent className="space-y-4 pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-primary">Market-Led Advisory</h3>
                <p className="text-muted-foreground">
                  Investment strategy, asset positioning, and commercial guidance shaped by real occupier and capital market signals.
                </p>
                <Link href="/clients" className="mt-4 flex items-center gap-2 font-semibold text-emerald-600 transition-all hover:gap-3">
                  Meet our clients <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg transition-shadow hover:shadow-xl">
              <CardContent className="space-y-4 pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-primary">Project Execution</h3>
                <p className="text-muted-foreground">
                  From repositioning and leasing plans to development delivery, we help turn commercial intent into measurable outcomes.
                </p>
                <Link href="/projects" className="mt-4 flex items-center gap-2 font-semibold text-emerald-600 transition-all hover:gap-3">
                  View projects <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg transition-shadow hover:shadow-xl">
              <CardContent className="space-y-4 pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-primary">Relationship Capital</h3>
                <p className="text-muted-foreground">
                  We build long-term partnerships across institutional investors, occupiers, developers, and portfolio owners.
                </p>
                <Link href="/contact" className="mt-4 flex items-center gap-2 font-semibold text-emerald-600 transition-all hover:gap-3">
                  Start a conversation <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            <div>
              <div className="mb-2 text-4xl font-bold">{clientHighlights[0].value}</div>
              <div className="text-white/70">Transactions Advised</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold">{clientHighlights[1].value}</div>
              <div className="text-white/70">Operating History</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold">{clientHighlights[2].value}</div>
              <div className="text-white/70">Regional Footprint</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold">{portfolioProjects.length}</div>
              <div className="text-white/70">Sourced Mandates</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
