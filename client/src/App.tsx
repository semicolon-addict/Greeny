/*
///////////////////////////////////////////////////
Author: Shashank Kakad
Inputs: Added the new Clients and Projects page routes to the main application router.
Outcome: Visitors can now navigate to all remaining public-facing deliverables requested in the onboarding brief.
Short Description: Updated the app route map so the new page components are mounted within the shared layout.
/////////////////////////////////////////////////////////////
*/

import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Layout from "@/components/layout";

import Home from "@/pages/home";
import About from "@/pages/about";
import Capabilities from "@/pages/capabilities";
import Clients from "@/pages/clients";
import Projects from "@/pages/projects";
import Transactions from "@/pages/transactions";
import Insights from "@/pages/insights";
import JoinUs from "@/pages/join-us";
import Contact from "@/pages/contact";
import Dashboard from "@/pages/dashboard";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/capabilities" component={Capabilities} />
        <Route path="/clients" component={Clients} />
        <Route path="/projects" component={Projects} />
        <Route path="/transactions" component={Transactions} />
        <Route path="/insights" component={Insights} />
        <Route path="/publications" component={Insights} />
        <Route path="/join-us" component={JoinUs} />
        <Route path="/contact" component={Contact} />
        <Route path="/dashboard" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
