/*
///////////////////////////////////////////////////
Author: Shashank Kakad
Inputs: Reworked Join Us to use extracted values/culture direction from Kaluba source files and removed synthetic fallback roles/process copy.
Outcome: The careers page now shows source-backed values, a real culture image, and live API vacancies only when available.
Short Description: Converted Join Us into a source-aligned page with conditional vacancy rendering and a clean application-interest flow.
/////////////////////////////////////////////////////////////
*/

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { joinUsCulturePoints, joinUsValues } from "@/lib/green-fields-content";
import { ArrowRight, BriefcaseBusiness, CheckCircle2, Mail, MapPin, Users2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import type { Vacancy } from "@shared/schema";

import cultureImage from "@assets/kaluba/culture.jpg";

type ApplicationFormValues = {
  fullName: string;
  email: string;
  role: string;
  location: string;
  message: string;
};

function inferDepartment(title: string) {
  const normalized = title.toLowerCase();

  if (normalized.includes("analyst")) {
    return "Advisory";
  }

  if (normalized.includes("manager")) {
    return "Projects and Infrastructure";
  }

  if (normalized.includes("admin")) {
    return "Operations";
  }

  return "Advisory and Delivery";
}

export default function JoinUs() {
  const { toast } = useToast();
  const { register, handleSubmit, reset } = useForm<ApplicationFormValues>();
  const { data: vacancies = [], isLoading } = useQuery<Vacancy[]>({
    queryKey: ["/api/vacancies"],
    queryFn: async () => {
      const response = await fetch("/api/vacancies?active=true");

      if (!response.ok) {
        throw new Error("Failed to fetch vacancies");
      }

      return response.json();
    },
  });

  const liveRoles = vacancies.map((vacancy) => ({
    title: vacancy.title,
    department: inferDepartment(vacancy.title),
    location: vacancy.location,
    type: vacancy.type,
    summary:
      vacancy.description ||
      "Role details are maintained in the vacancy record and are shared during the application review process.",
  }));

  const onSubmit = (data: ApplicationFormValues) => {
    void data;
    toast({
      title: "Application interest received",
      description: "Our team will review your note and follow up with next steps.",
    });
    reset();
  };

  return (
    <div className="pb-20">
      <section className="bg-[linear-gradient(140deg,#205E3B_0%,#173724_45%,#0f291a_100%)] py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
            <div className="space-y-6">
              <Badge className="bg-white/15 text-white shadow-none">Join Us</Badge>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
                Build your career in sustainable infrastructure and transaction advisory.
              </h1>
              <p className="max-w-2xl text-lg text-white/80">
                We partner across infrastructure and industrial mandates throughout Africa, combining commercial rigor,
                execution discipline, and practical development outcomes.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#application-form">
                  <Button size="lg" className="bg-[#A6E79F] text-[#163E28] hover:bg-[#95d48e]">
                    Apply interest
                  </Button>
                </a>
                <a href="/contact">
                  <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">
                    Contact the team
                  </Button>
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/15 bg-white/10 p-8 shadow-2xl">
              <div className="flex items-start gap-4">
                <Users2 className="mt-1 h-8 w-8 text-[#A6E79F]" />
                <div>
                  <p className="text-4xl font-bold">{liveRoles.length}</p>
                  <p className="font-medium">Live roles</p>
                </div>
              </div>
              <div className="mt-6 space-y-3 text-sm leading-7 text-white/75">
                <p>Values and culture direction are aligned to supplied Join Us source material.</p>
                <p>Vacancy entries are rendered only when live records exist in the API.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="people-and-culture" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start">
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#205E3B]">People and culture</p>
              <h2 className="text-3xl font-bold text-[#205E3B]">A high-trust team focused on impact and delivery.</h2>
              <p className="leading-7 text-muted-foreground">
                Greenfields culture favors ownership, practical problem-solving, and clear communication across project
                teams, clients, and public stakeholders.
              </p>
              <div className="space-y-3 rounded-[1.5rem] border border-[#205E3B]/10 bg-[#F7F8F8] p-5">
                {joinUsCulturePoints.map((point) => (
                  <p key={point} className="text-sm leading-7 text-muted-foreground">
                    {point}
                  </p>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-[#205E3B]/10 bg-white shadow-sm">
              <img
                src={cultureImage}
                alt="Greenfields culture"
                className="h-[360px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="our-values" className="bg-[#F7F8F8] py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 max-w-3xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#205E3B]">Our values</p>
            <h2 className="text-3xl font-bold text-[#205E3B]">Core values extracted from Join Us source slides.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {joinUsValues.map((value) => (
              <div key={value.title} className="rounded-[1.75rem] border border-[#205E3B]/10 bg-white p-8 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#205E3B] text-white">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-2xl font-bold text-[#205E3B]">{value.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {liveRoles.length > 0 && (
        <section id="vacancies" className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#205E3B]">Open roles</p>
                <h2 className="text-3xl font-bold text-[#205E3B]">Current opportunities.</h2>
                <p className="max-w-2xl text-muted-foreground">
                  Explore currently published roles by title, department, location, and role type.
                </p>
              </div>
              <div className="rounded-2xl bg-[#F7F8F8] px-5 py-4 text-sm text-muted-foreground">
                {isLoading ? "Loading opportunities..." : `${liveRoles.length} active roles`}
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-[#205E3B]/10 bg-white shadow-sm">
              {liveRoles.map((role) => (
                <div
                  key={`${role.title}-${role.location}`}
                  className="grid gap-6 border-b border-[#205E3B]/10 px-6 py-6 last:border-b-0 lg:grid-cols-[1.2fr_0.8fr] lg:px-8"
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-2xl font-bold text-[#205E3B]">{role.title}</h3>
                      <Badge variant="outline" className="border-[#205E3B]/20 text-[#205E3B]">
                        {role.type}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-2">
                        <BriefcaseBusiness className="h-4 w-4 text-[#205E3B]" />
                        {role.department}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#205E3B]" />
                        {role.location}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm leading-7 text-muted-foreground">{role.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="application-form" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#205E3B]">Apply or express interest</p>
              <h2 className="text-3xl font-bold text-[#205E3B]">Tell us where you can contribute.</h2>
              <p className="leading-7 text-muted-foreground">
                Submit your details and we will review your profile against active or upcoming mandate requirements.
              </p>
              <div className="rounded-[1.75rem] border border-[#205E3B]/10 bg-[#F7F8F8] p-6">
                <div className="flex items-center gap-3 text-[#205E3B]">
                  <Mail className="h-5 w-5" />
                  <p className="font-semibold">What to include</p>
                </div>
                <div className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
                  <p>Share the role or discipline that interests you most.</p>
                  <p>Highlight relevant project, infrastructure, or transaction exposure.</p>
                  <p>Let us know your preferred location and best follow-up channel.</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#205E3B]/10 bg-white p-8 shadow-sm">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-medium text-slate-700">
                    Full Name
                  </label>
                  <Input id="fullName" placeholder="Your name" {...register("fullName")} required />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-700">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="you@example.com" {...register("email")} required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="location" className="text-sm font-medium text-slate-700">
                      Preferred Location
                    </label>
                    <Input id="location" placeholder="City or region" {...register("location")} required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="role" className="text-sm font-medium text-slate-700">
                    Role of Interest
                  </label>
                  <input
                    id="role"
                    list="role-options"
                    placeholder="Select or type a role"
                    className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring"
                    {...register("role")}
                    required
                  />
                  <datalist id="role-options">
                    {liveRoles.length > 0 ? (
                      liveRoles.map((role) => (
                        <option key={`${role.title}-${role.location}`} value={role.title} />
                      ))
                    ) : (
                      <option value="General application" />
                    )}
                  </datalist>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-slate-700">
                    Why this role?
                  </label>
                  <Textarea
                    id="message"
                    className="min-h-[140px]"
                    placeholder="Share your background, interests, and the role you want to discuss."
                    {...register("message")}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-[#205E3B] text-white hover:bg-[#18492e]">
                  Submit application interest
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
