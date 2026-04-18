/*
///////////////////////////////////////////////////
Author: Shashank Kakad
Inputs: Refined the dashboard presentation so the overview area feels more intentional, more professional, and more aligned with the public-page aesthetic improvements.
Outcome: The dashboard remains fully functional for content management while presenting the overview, quick links, and reporting sections with cleaner hierarchy and less generic widget framing.
Short Description: Polished the dashboard hero, shortcut area, and reporting copy without removing the underlying admin workflows.
/////////////////////////////////////////////////////////////
*/

import { Link } from "wouter";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  FileText,
  LayoutDashboard,
  MapPin,
  Plus,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import {
  dashboardQuickLinks,
  officeLocations,
  portfolioProjects,
} from "@/lib/green-fields-content";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import type {
  Article,
  InsertArticle,
  InsertTeamMember,
  InsertTransaction,
  InsertVacancy,
  TeamMember,
  Transaction,
  Vacancy,
} from "@shared/schema";

const pipelineChartConfig = {
  value: {
    label: "Transaction count",
    color: "#205E3B",
  },
} satisfies ChartConfig;

function ArticlesTab() {
  const { data: articles = [] } = useQuery<Article[]>({ queryKey: ["/api/articles"] });
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [articleType, setArticleType] = useState("article");
  const { register, handleSubmit, reset } = useForm<InsertArticle>();

  const createMutation = useMutation({
    mutationFn: async (data: InsertArticle) => {
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type: articleType }),
      });
      if (!response.ok) {
        throw new Error("Failed to create article");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      toast({ title: "Article created successfully" });
      setOpen(false);
      reset();
      setArticleType("article");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/articles/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Failed to delete article");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      toast({ title: "Article deleted successfully" });
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Articles and News</h3>
          <p className="text-sm text-muted-foreground">Publish thought leadership, publications, and announcement content.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-article" className="bg-[#205E3B] text-white hover:bg-[#18492e]">
              <Plus className="mr-2 h-4 w-4" />
              New Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Article</DialogTitle>
              <DialogDescription>Add a new article, publication, or news item.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit((data) => createMutation.mutate(data))} className="space-y-4">
              <div>
                <Label>Type</Label>
                <Select value={articleType} onValueChange={setArticleType}>
                  <SelectTrigger data-testid="select-article-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="publication">Publication</SelectItem>
                    <SelectItem value="news">News</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Title</Label>
                <Input {...register("title", { required: true })} placeholder="Article title" data-testid="input-article-title" />
              </div>
              <div>
                <Label>Date</Label>
                <Input {...register("date", { required: true })} placeholder="e.g. Apr 06, 2026" data-testid="input-article-date" />
              </div>
              <div>
                <Label>Summary</Label>
                <Textarea {...register("summary", { required: true })} placeholder="Brief summary..." data-testid="textarea-article-summary" />
              </div>
              <div>
                <Label>Content (Optional)</Label>
                <Textarea {...register("content")} placeholder="Full article content..." rows={6} data-testid="textarea-article-content" />
              </div>
              <div>
                <Label>Image URL (Optional)</Label>
                <Input {...register("imageUrl")} placeholder="https://..." data-testid="input-article-image" />
              </div>
              <Button type="submit" disabled={createMutation.isPending} data-testid="button-submit-article">
                {createMutation.isPending ? "Creating..." : "Create Article"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map((article) => (
            <TableRow key={article.id} data-testid={`article-row-${article.id}`}>
              <TableCell className="font-medium" data-testid={`article-title-${article.id}`}>{article.title}</TableCell>
              <TableCell data-testid={`article-type-${article.id}`}>{article.type}</TableCell>
              <TableCell data-testid={`article-date-${article.id}`}>{article.date}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteMutation.mutate(article.id)}
                  disabled={deleteMutation.isPending}
                  data-testid={`button-delete-article-${article.id}`}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function TeamTab() {
  const { data: members = [] } = useQuery<TeamMember[]>({ queryKey: ["/api/team-members"] });
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<InsertTeamMember>();

  const createMutation = useMutation({
    mutationFn: async (data: InsertTeamMember) => {
      const response = await fetch("/api/team-members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to create team member");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/team-members"] });
      toast({ title: "Team member added successfully" });
      setOpen(false);
      reset();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/team-members/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Failed to delete team member");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/team-members"] });
      toast({ title: "Team member removed successfully" });
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Team Members</h3>
          <p className="text-sm text-muted-foreground">Control who appears on the About page leadership section.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-team" className="bg-[#205E3B] text-white hover:bg-[#18492e]">
              <Plus className="mr-2 h-4 w-4" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Team Member</DialogTitle>
              <DialogDescription>Add a new team member to the About page.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit((data) => createMutation.mutate(data))} className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input {...register("name", { required: true })} placeholder="Full name" data-testid="input-team-name" />
              </div>
              <div>
                <Label>Position</Label>
                <Input {...register("position", { required: true })} placeholder="e.g. Managing Director" data-testid="input-team-position" />
              </div>
              <div>
                <Label>Bio</Label>
                <Textarea {...register("bio", { required: true })} placeholder="Brief bio..." data-testid="textarea-team-bio" />
              </div>
              <div>
                <Label>Image URL (Optional)</Label>
                <Input {...register("imageUrl")} placeholder="https://..." data-testid="input-team-image" />
              </div>
              <div>
                <Label>Display Order</Label>
                <Input type="number" {...register("order", { valueAsNumber: true })} defaultValue={0} data-testid="input-team-order" />
              </div>
              <Button type="submit" disabled={createMutation.isPending} data-testid="button-submit-team">
                {createMutation.isPending ? "Adding..." : "Add Team Member"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id} data-testid={`team-row-${member.id}`}>
              <TableCell className="font-medium" data-testid={`team-name-${member.id}`}>{member.name}</TableCell>
              <TableCell data-testid={`team-position-${member.id}`}>{member.position}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteMutation.mutate(member.id)}
                  disabled={deleteMutation.isPending}
                  data-testid={`button-delete-team-${member.id}`}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function TransactionsTab() {
  const { data: transactions = [] } = useQuery<Transaction[]>({ queryKey: ["/api/transactions"] });
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<InsertTransaction>();

  const createMutation = useMutation({
    mutationFn: async (data: InsertTransaction) => {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to create transaction");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
      toast({ title: "Transaction added successfully" });
      setOpen(false);
      reset();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/transactions/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
      toast({ title: "Transaction deleted successfully" });
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Transactions</h3>
          <p className="text-sm text-muted-foreground">Maintain the concise public deal record displayed on the Transactions page.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-transaction" className="bg-[#205E3B] text-white hover:bg-[#18492e]">
              <Plus className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Transaction</DialogTitle>
              <DialogDescription>Add a new completed transaction.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit((data) => createMutation.mutate(data))} className="space-y-4">
              <div>
                <Label>Date</Label>
                <Input {...register("date", { required: true })} placeholder="e.g. Apr 2026" data-testid="input-transaction-date" />
              </div>
              <div>
                <Label>Project</Label>
                <Input {...register("project", { required: true })} placeholder="Project name" data-testid="input-transaction-project" />
              </div>
              <div>
                <Label>Sector</Label>
                <Input {...register("sector", { required: true })} placeholder="e.g. Industrial" data-testid="input-transaction-sector" />
              </div>
              <div>
                <Label>Role</Label>
                <Input {...register("role", { required: true })} placeholder="e.g. Lead Advisor" data-testid="input-transaction-role" />
              </div>
              <div>
                <Label>Value</Label>
                <Input {...register("value", { required: true })} placeholder="e.g. R 1.2bn" data-testid="input-transaction-value" />
              </div>
              <div>
                <Label>Status</Label>
                <Input {...register("status")} defaultValue="Closed" data-testid="input-transaction-status" />
              </div>
              <Button type="submit" disabled={createMutation.isPending} data-testid="button-submit-transaction">
                {createMutation.isPending ? "Adding..." : "Add Transaction"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Sector</TableHead>
            <TableHead>Value</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id} data-testid={`transaction-row-${transaction.id}`}>
              <TableCell className="font-medium" data-testid={`transaction-project-${transaction.id}`}>{transaction.project}</TableCell>
              <TableCell data-testid={`transaction-sector-${transaction.id}`}>{transaction.sector}</TableCell>
              <TableCell data-testid={`transaction-value-${transaction.id}`}>{transaction.value}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteMutation.mutate(transaction.id)}
                  disabled={deleteMutation.isPending}
                  data-testid={`button-delete-transaction-${transaction.id}`}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function VacanciesTab() {
  const { data: vacancies = [] } = useQuery<Vacancy[]>({ queryKey: ["/api/vacancies"] });
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<InsertVacancy>();

  const createMutation = useMutation({
    mutationFn: async (data: InsertVacancy) => {
      const response = await fetch("/api/vacancies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to create vacancy");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/vacancies"] });
      toast({ title: "Vacancy posted successfully" });
      setOpen(false);
      reset();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/vacancies/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Failed to delete vacancy");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/vacancies"] });
      toast({ title: "Vacancy deleted successfully" });
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Job Vacancies</h3>
          <p className="text-sm text-muted-foreground">Manage the roles displayed on the Join Us page.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-vacancy" className="bg-[#205E3B] text-white hover:bg-[#18492e]">
              <Plus className="mr-2 h-4 w-4" />
              Post Vacancy
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Post New Vacancy</DialogTitle>
              <DialogDescription>Add a new job opening.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit((data) => createMutation.mutate({ ...data, isActive: 1 }))} className="space-y-4">
              <div>
                <Label>Job Title</Label>
                <Input {...register("title", { required: true })} placeholder="e.g. Senior Analyst" data-testid="input-vacancy-title" />
              </div>
              <div>
                <Label>Location</Label>
                <Input {...register("location", { required: true })} placeholder="e.g. Johannesburg" data-testid="input-vacancy-location" />
              </div>
              <div>
                <Label>Type</Label>
                <Input {...register("type", { required: true })} placeholder="e.g. Full-time" data-testid="input-vacancy-type" />
              </div>
              <div>
                <Label>Description (Optional)</Label>
                <Textarea {...register("description")} placeholder="Job description..." data-testid="textarea-vacancy-description" />
              </div>
              <Button type="submit" disabled={createMutation.isPending} data-testid="button-submit-vacancy">
                {createMutation.isPending ? "Posting..." : "Post Vacancy"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vacancies.map((vacancy) => (
            <TableRow key={vacancy.id} data-testid={`vacancy-row-${vacancy.id}`}>
              <TableCell className="font-medium" data-testid={`vacancy-title-${vacancy.id}`}>{vacancy.title}</TableCell>
              <TableCell data-testid={`vacancy-location-${vacancy.id}`}>{vacancy.location}</TableCell>
              <TableCell data-testid={`vacancy-type-${vacancy.id}`}>{vacancy.type}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteMutation.mutate(vacancy.id)}
                  disabled={deleteMutation.isPending}
                  data-testid={`button-delete-vacancy-${vacancy.id}`}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function Dashboard() {
  const { data: articles = [] } = useQuery<Article[]>({ queryKey: ["/api/articles"] });
  const { data: teamMembers = [] } = useQuery<TeamMember[]>({ queryKey: ["/api/team-members"] });
  const { data: transactions = [] } = useQuery<Transaction[]>({ queryKey: ["/api/transactions"] });
  const { data: vacancies = [] } = useQuery<Vacancy[]>({ queryKey: ["/api/vacancies"] });

  const transactionSectorData = Object.entries(
    transactions.reduce<Record<string, number>>((accumulator, transaction) => {
      accumulator[transaction.sector] = (accumulator[transaction.sector] ?? 0) + 1;
      return accumulator;
    }, {}),
  ).map(([sector, value]) => ({ sector, value }));

  const fallbackSectorData = Object.entries(
    portfolioProjects.reduce<Record<string, number>>((accumulator, project) => {
      accumulator[project.sector] = (accumulator[project.sector] ?? 0) + 1;
      return accumulator;
    }, {}),
  ).map(([sector, value]) => ({ sector, value }));

  const chartData = transactionSectorData.length > 0 ? transactionSectorData : fallbackSectorData;

  const summaryCards = [
    {
      title: "Source mandates",
      value: String(portfolioProjects.length),
      detail: "Mandates currently wired from extracted transaction source material.",
      icon: Building2,
    },
    {
      title: "Published records",
      value: String(articles.length + teamMembers.length + transactions.length + vacancies.length),
      detail: "Combined API records across articles, team, transactions, and vacancies.",
      icon: FileText,
    },
    {
      title: "Active transactions",
      value: String(transactions.length),
      detail: "Rows currently available on the public transactions track-record page.",
      icon: BriefcaseBusiness,
    },
    {
      title: "Office locations",
      value: String(officeLocations.length),
      detail: "Contact offices currently configured from source-verified details.",
      icon: MapPin,
    },
  ] as const;

  return (
    <div className="flex min-h-screen bg-[#f4f6f5] font-sans text-slate-900">
      <aside className="hidden w-72 flex-col border-r border-[#205E3B]/10 bg-white md:flex">
        <div className="border-b border-[#205E3B]/10 p-6">
          <Link href="/">
            <div className="cursor-pointer">
              <p className="font-heading text-xl font-bold text-[#205E3B]">Green Fields Commercial</p>
              <p className="mt-1 text-xs uppercase tracking-[0.28em] text-muted-foreground">Admin Dashboard</p>
            </div>
          </Link>
        </div>
        <nav className="flex-1 space-y-2 p-4">
          <div className="rounded-2xl bg-[#205E3B] px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="h-5 w-5" />
              <div>
                <p className="font-semibold">Portfolio overview</p>
                <p className="text-xs text-white/70">KPIs, content health, and site shortcuts</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-[#205E3B]/10 px-4 py-3 text-sm text-muted-foreground">
            Monitor public-facing content, portfolio signals, and core records from one place.
          </div>
        </nav>
        <div className="border-t border-[#205E3B]/10 p-4">
          <Link href="/">
            <Button variant="outline" className="w-full justify-start gap-3 border-[#205E3B]/15 text-[#205E3B]" data-testid="button-view-site">
              View public site
            </Button>
          </Link>
        </div>
      </aside>

      <main className="flex flex-1 flex-col">
        <header className="border-b border-[#205E3B]/10 bg-white px-6 py-5 shadow-sm md:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#205E3B]">Dashboard</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">Portfolio and content command center</h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/projects">
                <Button variant="outline" className="border-[#205E3B]/15 text-[#205E3B]">
                  Projects page
                </Button>
              </Link>
              <Link href="/clients">
                <Button className="bg-[#205E3B] text-white hover:bg-[#18492e]">
                  Clients page
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <div className="space-y-8 p-6 md:p-8">
          <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="grid gap-6 rounded-[2rem] bg-[linear-gradient(135deg,#205E3B_0%,#163E28_100%)] p-8 text-white shadow-none md:grid-cols-[1.15fr_0.85fr]">
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#A6E79F]">Executive snapshot</p>
                  <h2 className="max-w-2xl text-3xl font-bold">
                    A concise view of source-backed content readiness and transaction records.
                  </h2>
                </div>
                <p className="max-w-2xl text-white/75">
                  Monitor extracted content coverage, team visibility, and public record integrity from one dashboard.
                </p>
              </div>

              <div className="self-start rounded-[1.5rem] border border-white/10 bg-white/10 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#A6E79F]">Operations snapshot</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-1">
                  {[
                    { label: "Articles", value: articles.length },
                    { label: "Team members", value: teamMembers.length },
                    { label: "Transactions", value: transactions.length },
                    { label: "Vacancies", value: vacancies.length },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
                      <span className="text-sm text-white/75">{item.label}</span>
                      <span className="text-xl font-bold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Card className="border-[#205E3B]/10 shadow-sm">
              <CardHeader>
                <CardTitle>Public site shortcuts</CardTitle>
                <CardDescription>Jump directly to source-backed public pages from the admin area.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                {dashboardQuickLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <div className="cursor-pointer rounded-2xl border border-[#205E3B]/10 bg-[#F7F8F8] p-4 transition-colors hover:border-[#205E3B]/30 hover:bg-white">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold text-[#205E3B]">{link.title}</p>
                        <ArrowRight className="h-4 w-4 text-[#205E3B]" />
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{link.description}</p>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </section>
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {summaryCards.map((metric) => (
              <Card key={metric.title} className="border-[#205E3B]/10 shadow-sm">
                <CardContent className="space-y-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#205E3B] text-white">
                    <metric.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                    <p className="mt-2 text-3xl font-bold text-slate-900">{metric.value}</p>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{metric.detail}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <Card className="border-[#205E3B]/10 shadow-sm">
              <CardHeader>
                <CardTitle>Transactions by sector</CardTitle>
                <CardDescription>
                  Dynamic sector distribution from live transaction records, with extracted project sectors as fallback.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={pipelineChartConfig} className="h-[280px] w-full">
                  <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="sector" tickLine={false} tickMargin={10} axisLine={false} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                    <Bar dataKey="value" fill="var(--color-value)" radius={[12, 12, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="border-[#205E3B]/10 shadow-sm">
              <CardHeader>
                <CardTitle>Recent transactions</CardTitle>
                <CardDescription>Latest entries from the public transaction record.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {transactions.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} className="rounded-2xl border border-[#205E3B]/10 p-4">
                    <p className="font-semibold text-slate-900">{transaction.project}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{transaction.sector} • {transaction.role}</p>
                    <p className="mt-2 text-sm font-semibold text-[#205E3B]">{transaction.value}</p>
                  </div>
                ))}
                {transactions.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No transactions have been published yet. Add records in the Transactions tab.
                  </p>
                )}
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <Card className="border-[#205E3B]/10 shadow-sm">
              <CardContent className="space-y-2 p-6">
                <div className="flex items-center gap-3 text-[#205E3B]">
                  <FileText className="h-5 w-5" />
                  <p className="text-sm font-medium">Articles</p>
                </div>
                <p className="text-3xl font-bold" data-testid="stat-articles">{articles.length}</p>
                <p className="text-sm text-muted-foreground">Published insight items currently stored.</p>
              </CardContent>
            </Card>
            <Card className="border-[#205E3B]/10 shadow-sm">
              <CardContent className="space-y-2 p-6">
                <div className="flex items-center gap-3 text-[#205E3B]">
                  <Users className="h-5 w-5" />
                  <p className="text-sm font-medium">Team Members</p>
                </div>
                <p className="text-3xl font-bold" data-testid="stat-team">{teamMembers.length}</p>
                <p className="text-sm text-muted-foreground">Profiles available for the About page.</p>
              </CardContent>
            </Card>
            <Card className="border-[#205E3B]/10 shadow-sm">
              <CardContent className="space-y-2 p-6">
                <div className="flex items-center gap-3 text-[#205E3B]">
                  <BriefcaseBusiness className="h-5 w-5" />
                  <p className="text-sm font-medium">Transactions</p>
                </div>
                <p className="text-3xl font-bold" data-testid="stat-transactions">{transactions.length}</p>
                <p className="text-sm text-muted-foreground">Deals currently displayed in the public track record.</p>
              </CardContent>
            </Card>
            <Card className="border-[#205E3B]/10 shadow-sm">
              <CardContent className="space-y-2 p-6">
                <div className="flex items-center gap-3 text-[#205E3B]">
                  <LayoutDashboard className="h-5 w-5" />
                  <p className="text-sm font-medium">Vacancies</p>
                </div>
                <p className="text-3xl font-bold">{vacancies.length}</p>
                <p className="text-sm text-muted-foreground">Roles powering the Join Us page vacancy section.</p>
              </CardContent>
            </Card>
          </section>

          <section>
            <Card className="border-[#205E3B]/10 shadow-sm">
              <CardContent className="p-6">
                <Tabs defaultValue="articles" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 gap-2 md:grid-cols-4">
                    <TabsTrigger value="articles" data-testid="tab-articles">Articles</TabsTrigger>
                    <TabsTrigger value="team" data-testid="tab-team">Team</TabsTrigger>
                    <TabsTrigger value="transactions" data-testid="tab-transactions">Transactions</TabsTrigger>
                    <TabsTrigger value="vacancies" data-testid="tab-vacancies">Vacancies</TabsTrigger>
                  </TabsList>
                  <div className="mt-6">
                    <TabsContent value="articles"><ArticlesTab /></TabsContent>
                    <TabsContent value="team"><TeamTab /></TabsContent>
                    <TabsContent value="transactions"><TransactionsTab /></TabsContent>
                    <TabsContent value="vacancies"><VacanciesTab /></TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}
