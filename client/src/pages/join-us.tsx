import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Vacancy } from "@shared/schema";

export default function JoinUs() {
  const { data: vacancies = [], isLoading } = useQuery<Vacancy[]>({
    queryKey: ["/api/vacancies"],
    queryFn: async () => {
      const response = await fetch("/api/vacancies?active=true");
      if (!response.ok) throw new Error("Failed to fetch vacancies");
      return response.json();
    },
  });

  return (
    <div className="pb-20">
      <div className="bg-secondary/50 py-20 mb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Join Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Build a career with purpose. Be part of the team shaping Africa's sustainable future.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 space-y-24">
        {/* Culture */}
        <section id="people-and-culture" className="scroll-mt-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 bg-muted rounded-2xl h-[400px] w-full flex items-center justify-center text-muted-foreground">
              [Culture Image Placeholder]
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold text-primary mb-6">People and Culture</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  At Greeny, our people are our greatest asset. We foster an environment of continuous learning, 
                  collaboration, and innovation. We believe that diverse perspectives lead to better solutions.
                </p>
                <p>
                  We are driven by a shared passion for sustainability and making a tangible impact. 
                  Work-life balance, mental well-being, and professional development are at the core of our employee value proposition.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section id="our-values" className="scroll-mt-24 bg-emerald-900 text-white p-12 rounded-3xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Integrity", desc: "We act with honesty and transparency in everything we do." },
              { title: "Excellence", desc: "We strive for the highest standards of quality and professionalism." },
              { title: "Innovation", desc: "We embrace new ideas to solve complex challenges." },
              { title: "Impact", desc: "We are committed to positive environmental and social outcomes." },
            ].map((val, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-400">
                  <Check className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">{val.title}</h3>
                <p className="text-white/70 text-sm">{val.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Vacancies */}
        <section id="current-vacancies" className="scroll-mt-24">
          <h2 className="text-3xl font-bold text-primary mb-8">Current Vacancies</h2>
          
          {isLoading ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Loading vacancies...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {vacancies.map((job) => (
                <Card key={job.id} className="hover:border-emerald-500 transition-colors cursor-pointer" data-testid={`vacancy-card-${job.id}`}>
                  <CardContent className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-primary" data-testid={`vacancy-title-${job.id}`}>{job.title}</h3>
                      <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                        <span data-testid={`vacancy-location-${job.id}`}>{job.location}</span>
                        <span>•</span>
                        <span data-testid={`vacancy-type-${job.id}`}>{job.type}</span>
                      </div>
                    </div>
                    <Button data-testid={`vacancy-apply-${job.id}`}>Apply Now</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!isLoading && vacancies.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No current vacancies. Check back soon!</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
