import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="pb-20">
      <div className="bg-secondary/50 py-20 mb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">About Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Pioneering sustainable finance and advisory services across Africa.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 space-y-24">
        {/* The Company */}
        <section id="the-company" className="scroll-mt-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">The Company</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2010, Greeny has established itself as a leader in the environmental finance sector. 
                  We operate at the intersection of traditional finance and sustainable development, 
                  offering a unique blend of technical expertise and financial acumen.
                </p>
                <p>
                  Our firm is 100% Black-owned and managed, with a deep commitment to transformation 
                  and economic empowerment within the sectors we serve.
                </p>
              </div>
            </div>
            <div className="bg-muted rounded-2xl h-[400px] w-full flex items-center justify-center text-muted-foreground">
              [Company Office Image Placeholder]
            </div>
          </div>
        </section>

        {/* Our Purpose */}
        <section id="our-purpose" className="scroll-mt-24">
          <div className="bg-primary text-white rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-8">Our Purpose</h2>
            <p className="text-2xl md:text-3xl font-light leading-relaxed max-w-4xl mx-auto">
              "To accelerate the transition to a sustainable economy by unlocking capital for projects that matter."
            </p>
          </div>
        </section>

        {/* Meet the Team */}
        <section id="meet-the-team" className="scroll-mt-24">
          <h2 className="text-3xl font-bold text-primary mb-12 text-center">Meet the Team</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Card key={i} className="border-none shadow-md overflow-hidden group">
                <div className="h-64 bg-gray-200 w-full group-hover:scale-105 transition-transform duration-500 flex items-center justify-center text-gray-400">
                   [Team Member {i}]
                </div>
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg text-primary">Team Member {i}</h3>
                  <p className="text-sm text-emerald-600 font-medium mb-2">Managing Director</p>
                  <p className="text-xs text-muted-foreground">
                    15+ years in corporate finance and renewable energy.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
