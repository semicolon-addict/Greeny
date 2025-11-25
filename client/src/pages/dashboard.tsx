import { Link, useLocation } from "wouter";
import { LayoutDashboard, FileText, Users, Settings, LogOut, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Dashboard() {
  const [location] = useLocation();

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
          <Link href="#">
            <a className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-muted rounded-lg font-medium transition-colors">
              <FileText className="h-5 w-5" /> Pages & Content
            </a>
          </Link>
          <Link href="#">
            <a className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-muted rounded-lg font-medium transition-colors">
              <Users className="h-5 w-5" /> Team Members
            </a>
          </Link>
          <Link href="#">
            <a className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-muted rounded-lg font-medium transition-colors">
              <Settings className="h-5 w-5" /> Settings
            </a>
          </Link>
        </nav>
        <div className="p-4 border-t">
          <Link href="/">
            <a className="flex items-center gap-3 px-4 py-3 text-destructive hover:bg-destructive/10 rounded-lg font-medium transition-colors">
              <LogOut className="h-5 w-5" /> Logout
            </a>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b px-8 flex items-center justify-between">
          <h1 className="font-bold text-lg">Overview</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-9 w-64" />
            </div>
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
                <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,345</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Form Submissions</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">+201 since last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Articles</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+2 new this week</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Content */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Content Updates</CardTitle>
              <Button size="sm"><Plus className="h-4 w-4 mr-2" /> Add New</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Edited</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Q3 2024 Market Report</TableCell>
                    <TableCell>Published</TableCell>
                    <TableCell>Today at 9:00 AM</TableCell>
                    <TableCell className="text-right"><Button variant="ghost" size="sm">Edit</Button></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">New Team Member: John Doe</TableCell>
                    <TableCell>Draft</TableCell>
                    <TableCell>Yesterday</TableCell>
                    <TableCell className="text-right"><Button variant="ghost" size="sm">Edit</Button></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Solar Project Case Study</TableCell>
                    <TableCell>Published</TableCell>
                    <TableCell>Oct 23, 2024</TableCell>
                    <TableCell className="text-right"><Button variant="ghost" size="sm">Edit</Button></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
