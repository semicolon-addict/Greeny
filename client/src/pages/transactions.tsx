import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import type { Transaction } from "@shared/schema";

export default function Transactions() {
  const { data: transactions = [], isLoading } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions"],
  });

  if (isLoading) {
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
        <div className="container mx-auto px-4 text-center py-20">
          <p className="text-muted-foreground">Loading transactions...</p>
        </div>
      </div>
    );
  }

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
                <TableRow key={tx.id} data-testid={`transaction-row-${tx.id}`}>
                  <TableCell className="font-medium text-muted-foreground" data-testid={`transaction-date-${tx.id}`}>{tx.date}</TableCell>
                  <TableCell className="font-semibold text-primary" data-testid={`transaction-project-${tx.id}`}>{tx.project}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none" data-testid={`transaction-sector-${tx.id}`}>
                      {tx.sector}
                    </Badge>
                  </TableCell>
                  <TableCell data-testid={`transaction-role-${tx.id}`}>{tx.role}</TableCell>
                  <TableCell className="text-right font-mono" data-testid={`transaction-value-${tx.id}`}>{tx.value}</TableCell>
                  <TableCell className="text-right">
                    <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-bold uppercase tracking-wider" data-testid={`transaction-status-${tx.id}`}>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      {tx.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {transactions.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No transactions found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
