import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, BarChart3, Globe, Users } from "lucide-react";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/modern_sustainable_corporate_office_building_with_greenery.png";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Sustainable Architecture" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-2xl space-y-6 animate-in slide-in-from-left duration-700">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Investing in a <span className="text-emerald-400">Sustainable</span> Future
            </h1>
            <p className="text-xl text-gray-200">
              We bridge the gap between capital and sustainable development, creating value that lasts for generations.
            </p>
            <div className="flex gap-4 pt-4">
              <Link href="/capabilities">
                <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white border-none">
                  Our Capabilities
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6 text-primary">Who We Are</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Greeny is a premier investment advisory firm dedicated to the green economy. 
            We partner with visionary leaders to finance and build infrastructure that respects our planet while delivering superior returns.
          </p>
        </div>
      </section>

      {/* Key Areas */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6 space-y-4">
                <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 mb-4">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-primary">Sustainable Infrastructure</h3>
                <p className="text-muted-foreground">
                  Developing renewable energy, water, and waste management solutions for a resilient future.
                </p>
                <Link href="/capabilities">
                  <a className="text-emerald-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all mt-4">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </a>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6 space-y-4">
                <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 mb-4">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-primary">Corporate Advisory</h3>
                <p className="text-muted-foreground">
                  Strategic guidance on mergers, acquisitions, and capital raising for green enterprises.
                </p>
                <Link href="/capabilities">
                  <a className="text-emerald-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all mt-4">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </a>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6 space-y-4">
                <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-primary">Impact Investment</h3>
                <p className="text-muted-foreground">
                  Connecting conscious capital with high-impact projects across the African continent.
                </p>
                <Link href="/transactions">
                  <a className="text-emerald-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all mt-4">
                    View transactions <ArrowRight className="h-4 w-4" />
                  </a>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats/Trust */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">R5bn+</div>
              <div className="text-white/70">Capital Deployed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-white/70">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-white/70">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-white/70">Black Owned</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
