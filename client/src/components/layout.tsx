/*
///////////////////////////////////////////////////
Author: Shashank Kakad
Inputs: Updated the shared layout to expose the new pages, refresh the site branding, and improve footer navigation and contact visibility.
Outcome: All key deliverable pages are now reachable through a cleaner navigation structure and the shared shell better reflects the Green Fields Commercial brief.
Short Description: Reworked the header and footer navigation while preserving the existing responsive site shell and dashboard exception behavior.
/////////////////////////////////////////////////////////////
*/

import { Link, useLocation } from "wouter";
import { ChevronDown, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { footerPolicyLinks, officeLocations, socialLinks } from "@/lib/green-fields-content";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const navItems: NavItem[] = [
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "The Company", href: "/about#the-company" },
      { label: "Our Purpose", href: "/about#our-purpose" },
      { label: "Meet the Team", href: "/about#meet-the-team" },
    ],
  },
  { label: "Our Capabilities", href: "/capabilities" },
  {
    label: "Transactions",
    href: "/transactions",
    children: [
      { label: "Client Mandates", href: "/clients" },
      { label: "Project Highlights", href: "/projects" },
      { label: "Track Record", href: "/transactions" },
    ],
  },
  { label: "Publications", href: "/publications" },
  { label: "Join Us", href: "/join-us" },
  { label: "Contact Us", href: "/contact" },
];

function isNavItemActive(location: string, href: string) {
  if (href === "/") {
    return location === "/";
  }

  return location === href || location.startsWith(`${href}/`);
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const primaryOffice = officeLocations[0];
  const brandLogoUrl = "/kaluba/logo.jpg";

  if (location.startsWith("/dashboard")) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-[#205E3B]/10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <Link href="/">
            <div className="flex cursor-pointer items-center gap-3 text-[#205E3B] transition-opacity hover:opacity-85">
              <div className="h-12 w-12 overflow-hidden rounded-2xl border border-[#205E3B]/15 bg-white">
                <img src={brandLogoUrl} alt="Greenfields logo" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="font-heading text-lg font-bold leading-none">Green Fields</p>
                <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">Advisory</p>
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-5 lg:flex">
            {navItems.map((item) => {
              const parentIsActive =
                isNavItemActive(location, item.href) ||
                Boolean(item.children?.some((child) => isNavItemActive(location, child.href.split("#")[0])));

              if (item.children) {
                return (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-[#205E3B] focus:outline-none">
                    <span className={parentIsActive ? "text-[#205E3B]" : ""}>{item.label}</span>
                    <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-48">
                    <DropdownMenuItem asChild>
                      <Link href={item.href} className="w-full cursor-pointer font-semibold text-[#205E3B]">
                        Overview
                      </Link>
                    </DropdownMenuItem>
                    {item.children.map((child) => (
                      <DropdownMenuItem key={child.label} asChild>
                        <Link href={child.href} className="cursor-pointer">
                          {child.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                );
              }

              return (
                <Link key={item.label} href={item.href}>
                  <div
                    className={`cursor-pointer text-sm font-medium transition-colors hover:text-[#205E3B] ${
                      isNavItemActive(location, item.href) ? "text-[#205E3B]" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </div>
                </Link>
              );
            })}
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="ml-2 border-[#205E3B]/15 text-[#205E3B]">
                Dashboard
              </Button>
            </Link>
          </nav>

          <button
            type="button"
            className="p-2 text-[#205E3B] lg:hidden"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMobileMenuOpen((current) => !current)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="absolute w-full border-t border-[#205E3B]/10 bg-white p-4 shadow-xl lg:hidden">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <div key={item.label} className="flex flex-col gap-2">
                  <Link href={item.href}>
                    <div
                      className="cursor-pointer border-b border-border/60 pb-2 text-base font-medium text-[#205E3B]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </div>
                  </Link>
                  {item.children && (
                    <div className="flex flex-col gap-2 pl-4 text-sm text-muted-foreground">
                      {item.children.map((child) => (
                        <Link key={child.label} href={child.href}>
                          <div className="cursor-pointer" onClick={() => setMobileMenuOpen(false)}>
                            {child.label}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link href="/dashboard">
                <Button
                  className="mt-2 w-full bg-[#205E3B] text-white hover:bg-[#18492e]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Open dashboard
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="w-full flex-1">{children}</main>

      <footer className="mt-auto bg-[#163E28] py-14 text-white">
        <div className="container mx-auto grid gap-10 px-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 overflow-hidden rounded-2xl border border-white/10 bg-white/90">
                <img src={brandLogoUrl} alt="Greenfields logo" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="font-heading text-lg font-bold">Green Fields</p>
                <p className="text-xs uppercase tracking-[0.28em] text-white/65">Advisory</p>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-7 text-white/75">
              Independent advisory focused on sustainable infrastructure and industrial development across Africa.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-heading text-lg font-bold">Pages</h4>
            <ul className="space-y-3 text-sm text-white/75">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/capabilities">Our Capabilities</Link></li>
              <li><Link href="/transactions">Transactions</Link></li>
              <li><Link href="/publications">Publications</Link></li>
              <li><Link href="/join-us">Join Us</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-heading text-lg font-bold">Head Office</h4>
            <div className="space-y-3 text-sm text-white/75">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-[#A6E79F]" />
                <div>
                  <p>{primaryOffice.addressLineOne}</p>
                  <p>{primaryOffice.addressLineTwo}</p>
                  <p>{primaryOffice.country}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#A6E79F]" />
                <a href={`tel:${primaryOffice.phone.replace(/\s+/g, "")}`}>{primaryOffice.phone}</a>
              </div>
              {primaryOffice.email && (
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-[#A6E79F]" />
                  <a href={`mailto:${primaryOffice.email}`}>{primaryOffice.email}</a>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-heading text-lg font-bold">Policy Links</h4>
            <ul className="space-y-3 text-sm text-white/75">
              {footerPolicyLinks.map((policyLink) => (
                <li key={policyLink}>{policyLink}</li>
              ))}
            </ul>
            {socialLinks.length > 0 && (
              <div>
                <h5 className="pt-2 font-heading text-base font-semibold">Stay Connected</h5>
                <ul className="mt-3 space-y-3 text-sm text-white/75">
                  {socialLinks.map((socialLink) => (
                    <li key={socialLink.label}>
                      <a href={socialLink.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">
                        {socialLink.label}
                      </a>
                      <p className="mt-1 text-white/50">{socialLink.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="container mx-auto mt-12 border-t border-white/10 px-4 pt-6 text-center text-sm text-white/55">
          (c) 2026 Greenfields. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
