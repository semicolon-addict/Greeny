import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Transactions() {
  const transactions = [
    { id: 1, date: "Oct 2024", project: "Solar Farm Expansion", sector: "Energy", role: "Lead Advisor", value: "R 1.2bn", status: "Closed" },
    { id: 2, date: "Aug 2024", project: "Water Treatment Plant", sector: "Water", role: "Debt Arranger", value: "R 450m", status: "Closed" },
    { id: 3, date: "Jun 2024", project: "Green Logistics Fleet", sector: "Transport", role: "Financial Advisor", value: "R 300m", status: "Closed" },
    { id: 4, date: "Apr 2024", project: "Biomass Facility", sector: "Energy", role: "Lead Arranger", value: "R 850m", status: "Closed" },
    { id: 5, date: "Feb 2024", project: "Sustainable Housing Dev", sector: "Real Estate", role: "Transaction Advisor", value: "R 2.1bn", status: "Closed" },
    { id: 6, date: "Nov 2023", project: "Recycling Plant Upgrade", sector: "Waste", role: "Advisor", value: "R 120m", status: "Closed" },
    { id: 7, date: "Sep 2023", project: "Wind Farm Refinancing", sector: "Energy", role: "Lead Advisor", value: "R 3.5bn", status: "Closed" },
  ];

  return (
    <div className="pb-20">
      <div className="bg-secondary/50 py-20 mb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Transactions</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            A track record of delivering successful financial closes across complex projects.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="rounded-xl border shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[120px]">Date</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Sector</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Value</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="font-medium text-muted-foreground">{tx.date}</TableCell>
                  <TableCell className="font-semibold text-primary">{tx.project}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none">
                      {tx.sector}
                    </Badge>
                  </TableCell>
                  <TableCell>{tx.role}</TableCell>
                  <TableCell className="text-right font-mono">{tx.value}</TableCell>
                  <TableCell className="text-right">
                    <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-bold uppercase tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      {tx.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
