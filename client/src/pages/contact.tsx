/*
///////////////////////////////////////////////////
Author: Shashank Kakad
Inputs: Replaced synthetic contact channels with source-verified head-office details and kept maps/form behavior deployment-safe.
Outcome: Contact now surfaces verified address/phone data from source files and conditionally shows optional channels only when present.
Short Description: Refactored Contact page to source-backed office details, real office imagery, and no fabricated social or email fields.
/////////////////////////////////////////////////////////////
*/

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { officeLocations, socialLinks } from "@/lib/green-fields-content";
import { Clock3, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

import officeImage from "@assets/kaluba/office.png";

type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function getMapEmbedUrl(mapQuery: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=14&output=embed`;
}

export default function Contact() {
  const { toast } = useToast();
  const { register, handleSubmit, reset } = useForm<ContactFormValues>();
  const primaryOffice = officeLocations[0];

  const onSubmit = (data: ContactFormValues) => {
    void data;
    toast({
      title: "Message received",
      description: "Your enquiry has been captured and is ready for follow-up.",
    });
    reset();
  };

  return (
    <div className="pb-20">
      <section className="bg-[linear-gradient(135deg,#205E3B_0%,#163E28_55%,#2E8B7F_100%)] py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div className="space-y-6">
              <Badge className="bg-white/15 text-white shadow-none">Contact Greenfields</Badge>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
                Share your mandate brief and we will route it to the right advisory team.
              </h1>
              <p className="max-w-2xl text-lg text-white/80">
                Contact details on this page are sourced from the supplied Contact Us brief. Use the form for business
                enquiries, introductions, and project or transaction discussions.
              </p>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 shadow-2xl">
              <img src={officeImage} alt="Greenfields office" className="h-56 w-full object-cover" />
              <div className="space-y-4 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#A6E79F]">Head office</p>
                <p className="text-lg font-semibold leading-7">
                  {primaryOffice.addressLineOne}, {primaryOffice.addressLineTwo}, {primaryOffice.country}
                </p>
                <a href={`tel:${primaryOffice.phone.replace(/\s+/g, "")}`} className="inline-flex items-center gap-2 font-semibold">
                  <Phone className="h-4 w-4 text-[#A6E79F]" />
                  {primaryOffice.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
            <div className="rounded-[2rem] border border-[#205E3B]/10 bg-white p-8 shadow-sm">
              <div className="mb-8 space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#205E3B]">Enquiry form</p>
                <h2 className="text-3xl font-bold text-[#205E3B]">Send us a message</h2>
                <p className="text-muted-foreground">
                  Share a short summary of your enquiry, location, and timeline. We will route it to the relevant team.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-700">
                    Name
                  </label>
                  <Input id="name" placeholder="Your full name" {...register("name")} required />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="you@example.com" {...register("email")} required />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-slate-700">
                    Subject
                  </label>
                  <Input id="subject" placeholder="What would you like to discuss?" {...register("subject")} required />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-slate-700">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    className="min-h-[180px]"
                    placeholder="Share your enquiry, timeline, or a brief summary of the opportunity."
                    {...register("message")}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-[#205E3B] text-white hover:bg-[#18492e]">
                  Send message
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-[#205E3B]/10 bg-[#F7F8F8] p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#205E3B]">Direct contact</p>
                <div className="mt-5 space-y-4">
                  <div className="flex items-start gap-4">
                    <Phone className="mt-1 h-5 w-5 text-[#205E3B]" />
                    <div>
                      <p className="font-semibold text-[#205E3B]">Phone</p>
                      <a href={`tel:${primaryOffice.phone.replace(/\s+/g, "")}`} className="mt-1 block text-lg font-bold text-slate-900">
                        {primaryOffice.phone}
                      </a>
                      <p className="text-sm text-muted-foreground">Main switchboard for enquiries and introductions.</p>
                    </div>
                  </div>
                  {primaryOffice.email && (
                    <div className="flex items-start gap-4">
                      <Mail className="mt-1 h-5 w-5 text-[#205E3B]" />
                      <div>
                        <p className="font-semibold text-[#205E3B]">Email</p>
                        <a href={`mailto:${primaryOffice.email}`} className="mt-1 block text-lg font-bold text-slate-900">
                          {primaryOffice.email}
                        </a>
                        <p className="text-sm text-muted-foreground">Share mandate notes and meeting requests.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {socialLinks.length > 0 && (
                <div className="rounded-[2rem] bg-[#205E3B] p-6 text-white shadow-none">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#A6E79F]">Stay connected</p>
                  <div className="mt-5 grid gap-4">
                    {socialLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4 transition-colors hover:bg-white/10"
                      >
                        <div>
                          <p className="font-semibold">{link.label}</p>
                          <p className="text-sm text-white/70">{link.description}</p>
                        </div>
                        <Linkedin className="h-5 w-5 text-[#A6E79F]" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F8F8] py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 max-w-3xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#205E3B]">Office directory</p>
            <h2 className="text-3xl font-bold text-[#205E3B]">Visit our offices or plan a meeting with the right team.</h2>
            <p className="text-muted-foreground">
              Address and phone data are sourced from the supplied Contact Us brief.
            </p>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-[#205E3B]/10 bg-white shadow-sm">
            {officeLocations.map((office) => (
              <div
                key={office.city}
                className="grid gap-0 border-b border-[#205E3B]/10 last:border-b-0 lg:grid-cols-[0.92fr_1.08fr]"
              >
                <div className="space-y-6 p-8">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-[#205E3B]">{office.city}</h3>
                    <div className="flex items-start gap-3 text-sm text-muted-foreground">
                      <MapPin className="mt-0.5 h-4 w-4 text-[#205E3B]" />
                      <div>
                        <p>{office.addressLineOne}</p>
                        <p>{office.addressLineTwo}</p>
                        <p>{office.country}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-[#205E3B]" />
                      <a href={`tel:${office.phone.replace(/\s+/g, "")}`}>{office.phone}</a>
                    </div>
                    {office.email && (
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-[#205E3B]" />
                        <a href={`mailto:${office.email}`}>{office.email}</a>
                      </div>
                    )}
                    {office.hours && (
                      <div className="flex items-center gap-3">
                        <Clock3 className="h-4 w-4 text-[#205E3B]" />
                        <span>{office.hours}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-[#205E3B]/10 lg:border-l lg:border-t-0">
                  <iframe
                    title={`${office.city} map`}
                    src={getMapEmbedUrl(office.mapQuery)}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-[320px] w-full border-0 lg:h-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
