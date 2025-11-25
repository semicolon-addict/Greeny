import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Zap, Droplets, Recycle, Building2, Factory, Truck } from "lucide-react";

export default function Capabilities() {
  return (
    <div className="pb-20">
      <div className="bg-secondary/50 py-20 mb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Our Capabilities</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Comprehensive financial and advisory services tailored for the green economy.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <Tabs defaultValue="services" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="grid w-full max-w-md grid-cols-2 h-12">
              <TabsTrigger value="services" className="text-lg">Services</TabsTrigger>
              <TabsTrigger value="sectors" className="text-lg">Sectors</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="services" className="animate-in fade-in-50">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Corporate Finance Advisory</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>We provide expert advice on mergers, acquisitions, and disposals.</p>
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>Valuations and Fairness Opinions</li>
                    <li>Due Diligence Support</li>
                    <li>Deal Structuring and Negotiation</li>
                    <li>BEE Transaction Structuring</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Project Finance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>Structuring and raising capital for large-scale infrastructure projects.</p>
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>Financial Modeling</li>
                    <li>Debt and Equity Raising</li>
                    <li>Risk Allocation and Mitigation</li>
                    <li>Public-Private Partnerships (PPPs)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Capital Raising</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>Accessing diverse pools of capital for growth and development.</p>
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>Private Equity placements</li>
                    <li>Development Finance Institution (DFI) funding</li>
                    <li>Green Bonds and Sustainable Debt</li>
                  </ul>
                </CardContent>
              </Card>
              
               <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Strategic Consulting</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>Helping organizations navigate the transition to sustainability.</p>
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>ESG Strategy Development</li>
                    <li>Market Entry Strategy</li>
                    <li>Policy and Regulatory Advisory</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sectors" className="animate-in fade-in-50">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Zap, title: "Renewable Energy", desc: "Solar, Wind, Hydro, and Biomass projects." },
                { icon: Droplets, title: "Water Infrastructure", desc: "Treatment, distribution, and sanitation solutions." },
                { icon: Recycle, title: "Waste Management", desc: "Recycling, waste-to-energy, and circular economy." },
                { icon: Building2, title: "Green Real Estate", desc: "Sustainable commercial and industrial developments." },
                { icon: Truck, title: "Transport & Logistics", desc: "EV infrastructure and efficient logistics systems." },
                { icon: Factory, title: "Sustainable Industry", desc: "Manufacturing with reduced environmental footprint." },
              ].map((sector, idx) => (
                <Card key={idx} className="hover:border-primary/50 transition-colors">
                  <CardContent className="pt-6 flex flex-col items-center text-center">
                    <div className="h-16 w-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-4">
                      <sector.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2">{sector.title}</h3>
                    <p className="text-muted-foreground">{sector.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
