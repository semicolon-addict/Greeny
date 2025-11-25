import { Link, useLocation, useRoute } from "wouter";
import { LayoutDashboard, FileText, Users, Briefcase, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import type { Article, TeamMember, Transaction, Vacancy, InsertArticle, InsertTeamMember, InsertTransaction, InsertVacancy } from "@shared/schema";
import { useState } from "react";

function ArticlesTab() {
  const { data: articles = [] } = useQuery<Article[]>({ queryKey: ["/api/articles"] });
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<InsertArticle>();

  const createMutation = useMutation({
    mutationFn: async (data: InsertArticle) => {
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create article");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      toast({ title: "Article created successfully" });
      setOpen(false);
      reset();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/articles/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete article");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      toast({ title: "Article deleted successfully" });
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Articles & News</h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-article"><Plus className="h-4 w-4 mr-2" /> New Article</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Article</DialogTitle>
              <DialogDescription>Add a new article, publication, or news item.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit((data) => createMutation.mutate(data))} className="space-y-4">
              <div>
                <Label>Type</Label>
                <Select {...register("type", { required: true })} defaultValue="article">
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
                <Input {...register("date", { required: true })} placeholder="e.g. Nov 25, 2024" data-testid="input-article-date" />
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
      if (!response.ok) throw new Error("Failed to create team member");
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
      if (!response.ok) throw new Error("Failed to delete team member");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/team-members"] });
      toast({ title: "Team member removed successfully" });
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Team Members</h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-team"><Plus className="h-4 w-4 mr-2" /> Add Team Member</Button>
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
      if (!response.ok) throw new Error("Failed to create transaction");
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
      if (!response.ok) throw new Error("Failed to delete transaction");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
      toast({ title: "Transaction deleted successfully" });
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Transactions</h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-transaction"><Plus className="h-4 w-4 mr-2" /> Add Transaction</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Transaction</DialogTitle>
              <DialogDescription>Add a new completed transaction.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit((data) => createMutation.mutate(data))} className="space-y-4">
              <div>
                <Label>Date</Label>
                <Input {...register("date", { required: true })} placeholder="e.g. Nov 2024" data-testid="input-transaction-date" />
              </div>
              <div>
                <Label>Project</Label>
                <Input {...register("project", { required: true })} placeholder="Project name" data-testid="input-transaction-project" />
              </div>
              <div>
                <Label>Sector</Label>
                <Input {...register("sector", { required: true })} placeholder="e.g. Energy" data-testid="input-transaction-sector" />
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
          {transactions.map((tx) => (
            <TableRow key={tx.id} data-testid={`transaction-row-${tx.id}`}>
              <TableCell className="font-medium" data-testid={`transaction-project-${tx.id}`}>{tx.project}</TableCell>
              <TableCell data-testid={`transaction-sector-${tx.id}`}>{tx.sector}</TableCell>
              <TableCell data-testid={`transaction-value-${tx.id}`}>{tx.value}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteMutation.mutate(tx.id)}
                  disabled={deleteMutation.isPending}
                  data-testid={`button-delete-transaction-${tx.id}`}
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
      if (!response.ok) throw new Error("Failed to create vacancy");
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
      if (!response.ok) throw new Error("Failed to delete vacancy");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/vacancies"] });
      toast({ title: "Vacancy deleted successfully" });
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Job Vacancies</h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-vacancy"><Plus className="h-4 w-4 mr-2" /> Post Vacancy</Button>
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
  const [location] = useLocation();
  const { data: articles = [] } = useQuery<Article[]>({ queryKey: ["/api/articles"] });
  const { data: teamMembers = [] } = useQuery<TeamMember[]>({ queryKey: ["/api/team-members"] });
  const { data: transactions = [] } = useQuery<Transaction[]>({ queryKey: ["/api/transactions"] });

  return (
    <div className="flex min-h-screen bg-muted/20 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:flex flex-col">
        <div className="p-6 border-b">
          <Link href="/">
            <a className="flex items-center gap-2 font-heading font-bold text-xl text-primary">
              <span>greeny</span> <span className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">Admin</span>
            </a>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/dashboard">
            <a className="flex items-center gap-3 px-4 py-3 bg-emerald-50 text-emerald-700 rounded-lg font-medium">
              <LayoutDashboard className="h-5 w-5" /> Dashboard
            </a>
          </Link>
        </nav>
        <div className="p-4 border-t">
          <Link href="/">
            <Button variant="outline" className="w-full justify-start gap-3" data-testid="button-view-site">
              View Site
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b px-8 flex items-center justify-between">
          <h1 className="font-bold text-lg">Content Management</h1>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="stat-articles">{articles.length}</div>
                <p className="text-xs text-muted-foreground">Published content</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="stat-team">{teamMembers.length}</div>
                <p className="text-xs text-muted-foreground">Active profiles</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Transactions</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="stat-transactions">{transactions.length}</div>
                <p className="text-xs text-muted-foreground">Completed deals</p>
              </CardContent>
            </Card>
          </div>

          {/* Content Management Tabs */}
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="articles" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
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
        </div>
      </main>
    </div>
  );
}
