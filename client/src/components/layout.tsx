import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, Leaf } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { 
      label: "About Us", 
      href: "/about",
      children: ["The Company", "Our Purpose", "Meet the Team"]
    },
    { 
      label: "Our Capabilities", 
      href: "/capabilities",
      children: ["Services", "Sectors"]
    },
    { label: "Transactions", href: "/transactions" },
    { 
      label: "Insights", 
      href: "/insights",
      children: ["Articles", "Publications", "News"]
    },
    { 
      label: "Join Us", 
      href: "/join-us",
      children: ["People and Culture", "Our Values", "Vacancies", "Events"]
    },
    { label: "Contact Us", href: "/contact" },
  ];

  // Hide navbar on dashboard
  if (location.startsWith("/dashboard")) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 font-heading font-bold text-2xl text-primary hover:opacity-80 transition-opacity cursor-pointer">
              <Leaf className="h-8 w-8" />
              <span>greeny</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              item.children ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors focus:outline-none">
                    {item.label} <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={item.href} className="font-semibold w-full cursor-pointer">Overview</Link>
                    </DropdownMenuItem>
                    {item.children.map((child) => (
                      <DropdownMenuItem key={child} asChild>
                        <Link href={`${item.href}#${child.toLowerCase().replace(/\s+/g, '-')}`} className="cursor-pointer">
                          {child}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link key={item.label} href={item.href}>
                  <div className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${location === item.href ? "text-primary font-semibold" : "text-muted-foreground"}`}>
                    {item.label}
                  </div>
                </Link>
              )
            ))}
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="ml-4">
                Admin
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-background absolute w-full p-4 flex flex-col gap-4 shadow-lg animate-in slide-in-from-top-5">
            {navItems.map((item) => (
              <div key={item.label} className="flex flex-col gap-2">
                <Link href={item.href}>
                  <div 
                    className="text-lg font-medium py-2 border-b border-border/50 cursor-pointer"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </div>
                </Link>
                {item.children && (
                  <div className="pl-4 flex flex-col gap-2">
                    {item.children.map(child => (
                      <Link key={child} href={`${item.href}#${child.toLowerCase().replace(/\s+/g, '-')}`}>
                        <div 
                          className="text-sm text-muted-foreground cursor-pointer"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
             <Link href="/dashboard">
              <Button className="w-full mt-4">
                Admin Dashboard
              </Button>
            </Link>
          </div>
        )}
      </header>

      <main className="flex-1 w-full">
        {children}
      </main>

      <footer className="bg-primary text-primary-foreground py-12 mt-auto">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-heading font-bold text-2xl">
              <Leaf className="h-6 w-6" />
              <span>greeny</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Empowering businesses with sustainable financial solutions for a greener future.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/capabilities">Our Capabilities</Link></li>
              <li><Link href="/transactions">Transactions</Link></li>
              <li><Link href="/insights">Insights</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>info@greeny.co.za</li>
              <li>+27 11 123 4567</li>
              <li>123 Green Street, Sandton, South Africa</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Newsletter</h4>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-white/10 border border-white/20 rounded px-3 py-2 text-sm w-full placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <Button variant="secondary" size="sm">Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-white/10 text-center text-sm text-primary-foreground/60">
          © 2025 Greeny. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
