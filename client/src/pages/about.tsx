/*
///////////////////////////////////////////////////
Author: Shashank Kakad
Inputs: Team tiles were clipping faces/text and needed richer person-level interaction to view details.
Outcome: Team cards now keep faces fully visible, avoid text clipping, and open a detailed profile dialog on click.
Short Description: Improved About page team tile CSS and added clickable profile dialogs with expanded member information.
/////////////////////////////////////////////////////////////
*/

import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { aboutCopy } from "@/lib/green-fields-content";
import { useQuery } from "@tanstack/react-query";
import type { TeamMember } from "@shared/schema";
import { useMemo } from "react";

import officeImage from "@assets/kaluba/office.png";

type TeamProfileDetail = {
  overview: string;
  keyExperience: string[];
  qualifications: string[];
};

const teamProfileDetails: Record<string, TeamProfileDetail> = {
  "Siphokazi Mpanza": {
    overview:
      "Siphokazi is a qualified chartered accountant with over 16 years of experience in finance and economic development advisory across multiple sectors.",
    keyExperience: [
      "Advised on Independent Transmission Projects Procurement Programme Bid Window 1.",
      "Supported Renewable Energy Independent Power Producer Procurement Programme Bid Window 7.5.",
      "Provided transaction support to clients across mining, banking, and private equity mandates.",
    ],
    qualifications: [
      "CA(SA)",
      "Certified PPP Professional",
      "Energy Risk Professional (P1)",
      "Postgraduate Diploma in Applied Accounting Science",
    ],
  },
  "Kaluba Chipulu": {
    overview:
      "Kaluba is a qualified chartered accountant with over 14 years of project and corporate transaction advisory experience across African infrastructure markets.",
    keyExperience: [
      "Advised on REIPPPP and Battery Energy Storage IPP procurement programme bid windows.",
      "Supported development and financing of bulk water supply schemes.",
      "Advised on medium/high-voltage cable manufacturing and green hydrogen project development.",
    ],
    qualifications: [
      "CA(SA)",
      "Postgraduate Diploma in Applied Accounting Science",
      "Bachelor of Accounting Science",
    ],
  },
  "Mpho Mogale": {
    overview:
      "Mpho is a qualified chartered accountant with over 10 years of advisory experience spanning corporate transactions, project finance, and tax structuring.",
    keyExperience: [
      "Supported IPP procurement programmes in renewable energy and battery storage windows.",
      "Advised pension and private equity clients on infrastructure and agricultural investments.",
      "Delivered diligence, financial model review, and transaction support across multiple sectors.",
    ],
    qualifications: [
      "CA(SA)",
      "FMVA",
      "Postgraduate Diploma in Applied Accounting Science (UNISA)",
    ],
  },
  "Chipasha Lupekesa": {
    overview:
      "Chipasha has over 6 years of transaction advisory experience across energy, telecommunications, and social infrastructure projects in Africa.",
    keyExperience: [
      "Advised on transmission, renewable energy, and battery storage procurement programmes.",
      "Supported private equity investments in broadband and solar manufacturing infrastructure.",
      "Delivered transaction support and model work across infrastructure and industrial mandates.",
    ],
    qualifications: [
      "FMVA",
      "MCom Statistics (cum laude)",
      "Postgraduate Diploma in Development Finance",
    ],
  },
  "Thabo Mbatha": {
    overview:
      "Thabo appears in the supplied team image set. A full source profile was not included in the provided document pack.",
    keyExperience: [
      "Detailed role history was not supplied in extracted source content.",
      "Tile remains visible to reflect provided team imagery.",
    ],
    qualifications: ["Profile details pending source update"],
  },
  "Lungile Mnyayiza": {
    overview:
      "Lungile is an experienced projects administrator with over 13 years of professional experience across administration, operations, and support functions.",
    keyExperience: [
      "Provided project administration support across entertainment and financial services environments.",
      "Led data and risk profiling responsibilities prior to joining Greenfields.",
      "Supports operational delivery and project coordination across advisory workstreams.",
    ],
    qualifications: ["National Certificate in Information Technology (System Support)"],
  },
};

function hierarchyRank(position: string) {
  const normalized = position.toLowerCase();

  if (normalized.includes("managing director")) {
    return 1;
  }

  if (normalized.includes("head of") || normalized.includes("director")) {
    return 2;
  }

  if (normalized.includes("senior associate")) {
    return 3;
  }

  if (normalized.includes("senior analyst")) {
    return 4;
  }

  if (normalized.includes("advisory team member")) {
    return 5;
  }

  if (normalized.includes("administrator")) {
    return 6;
  }

  return 99;
}

export default function About() {
  const { data: teamMembers = [], isLoading } = useQuery<TeamMember[]>({
    queryKey: ["/api/team-members"],
  });

  const orderedTeamMembers = useMemo(
    () =>
      [...teamMembers].sort((left, right) => {
        const rankDifference = hierarchyRank(left.position) - hierarchyRank(right.position);
        if (rankDifference !== 0) {
          return rankDifference;
        }

        return left.name.localeCompare(right.name);
      }),
    [teamMembers],
  );

  return (
    <div className="pb-20">
      <div className="mb-16 bg-secondary/50 py-20">
        <div className="container mx-auto px-4">
          <h1 className="mb-4 text-4xl font-bold text-primary md:text-5xl">About Us</h1>
          <p className="max-w-2xl text-xl text-muted-foreground">
            {aboutCopy.intro}
          </p>
        </div>
      </div>

      <div className="container mx-auto space-y-24 px-4">
        <section id="the-company" className="scroll-mt-24">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-primary">The Greeny Company</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  {aboutCopy.companyNarrative}
                </p>
                <p>
                  {aboutCopy.capabilityStatement}
                </p>
              </div>
            </div>
            <div className="h-[400px] w-full overflow-hidden rounded-2xl border border-[#205E3B]/10">
              <img src={officeImage} alt="Greenfields office" className="h-full w-full object-cover" />
            </div>
          </div>
        </section>

        <section id="our-purpose" className="scroll-mt-24">
          <div className="rounded-3xl bg-primary p-12 text-center text-white">
            <h2 className="mb-8 text-3xl font-bold">Our Purpose</h2>
            <p className="mx-auto max-w-4xl text-2xl font-light leading-relaxed md:text-3xl">
              "{aboutCopy.purpose}"
            </p>
          </div>
        </section>

        <section
          id="meet-the-team"
          className="relative scroll-mt-24 overflow-hidden rounded-[2rem] border border-white/30 bg-[linear-gradient(180deg,#102b1d_0%,#1e553b_28%,#dceee2_100%)] px-5 py-10 shadow-[0_12px_36px_rgba(10,35,22,0.2)] backdrop-blur-md md:px-8"
        >
          <div aria-hidden className="absolute -left-10 top-0 h-44 w-44 rounded-full bg-[#2E8B7F]/20 blur-3xl" />
          <div aria-hidden className="absolute -right-10 bottom-0 h-52 w-52 rounded-full bg-white/25 blur-3xl" />

          <h2 className="relative mb-12 text-center text-3xl font-bold text-white drop-shadow-sm">Meet the Team</h2>

          {isLoading ? (
            <div className="relative py-20 text-center">
              <p className="text-white/85">Loading team members...</p>
            </div>
          ) : (
            <div className="relative grid gap-8 md:grid-cols-3 lg:grid-cols-4">
              {orderedTeamMembers.map((member) => {
                const detail = teamProfileDetails[member.name];

                return (
                  <Dialog key={member.id}>
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        className="w-full rounded-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                        data-testid={`team-member-${member.id}`}
                      >
                        <Card className="group h-full overflow-hidden border border-white/40 bg-white/70 backdrop-blur-sm shadow-md transition-shadow hover:shadow-xl">
                          <div className="aspect-[4/5] w-full overflow-hidden bg-[#F4F6F5]">
                            {member.imageUrl ? (
                              <img
                                src={member.imageUrl}
                                alt={member.name}
                                className="h-full w-full object-contain object-top transition-transform duration-500 group-hover:scale-[1.02]"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                                {`[${member.name}]`}
                              </div>
                            )}
                          </div>
                          <CardContent className="space-y-2 p-5">
                            <h3 className="text-lg font-bold text-primary" data-testid={`team-name-${member.id}`}>{member.name}</h3>
                            <p className="text-sm font-medium text-emerald-700" data-testid={`team-position-${member.id}`}>{member.position}</p>
                            <p className="text-sm leading-6 text-muted-foreground" data-testid={`team-bio-${member.id}`}>
                              {member.bio}
                            </p>
                            <p className="pt-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#205E3B]">
                              Click to view profile
                            </p>
                          </CardContent>
                        </Card>
                      </button>
                    </DialogTrigger>

                    <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-3xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-[#205E3B]">{member.name}</DialogTitle>
                        <DialogDescription className="text-base font-medium text-emerald-700">
                          {member.position}
                        </DialogDescription>
                      </DialogHeader>

                      <div className="grid gap-6 md:grid-cols-[240px_1fr]">
                        <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-[#205E3B]/10 bg-[#F4F6F5]">
                          {member.imageUrl ? (
                            <img src={member.imageUrl} alt={member.name} className="h-full w-full object-contain object-top" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                              {`[${member.name}]`}
                            </div>
                          )}
                        </div>

                        <div className="space-y-5">
                          <div>
                            <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-[#205E3B]">Overview</h4>
                            <p className="mt-2 leading-7 text-muted-foreground">{detail?.overview ?? member.bio}</p>
                          </div>

                          {detail?.keyExperience?.length ? (
                            <div>
                              <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-[#205E3B]">Key Experience</h4>
                              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
                                {detail.keyExperience.map((experience) => (
                                  <li key={experience}>{experience}</li>
                                ))}
                              </ul>
                            </div>
                          ) : null}

                          {detail?.qualifications?.length ? (
                            <div>
                              <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-[#205E3B]">Qualifications</h4>
                              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
                                {detail.qualifications.map((qualification) => (
                                  <li key={qualification}>{qualification}</li>
                                ))}
                              </ul>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                );
              })}
            </div>
          )}

          {!isLoading && teamMembers.length === 0 && (
            <div className="relative py-20 text-center">
              <p className="text-white/85">No team members found.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
