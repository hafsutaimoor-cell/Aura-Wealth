import { TransactionsTable } from "@/components/transactions/transactions-table";
import { AppLayout } from "@/components/layout/app-layout";

export default function TransactionsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <TransactionsTable />
      </div>
    </AppLayout>
  );
}
