"use client";

import { useFinanceStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, TrendingDown, Wallet, PiggyBank } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function NetWorthTracker() {
  const { netWorth, accounts } = useFinanceStore((s) => ({
    netWorth: s.getDashboardStats().netWorth,
    accounts: s.accounts,
  }));

  const positive = netWorth >= 0;

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-sm">Net Worth</CardTitle>
          <CardDescription>Total across all accounts</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          {positive ? (
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          ) : (
            <TrendingDown className="h-4 w-4 text-rose-400" />
          )}
          <Badge variant="brand">{positive ? "Growing" : "Declining"}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="pt-4">
          <div className="text-3xl font-bold text-slate-100">
            {formatCurrency(netWorth)}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Last updated just now
          </div>
        </div>
        <div className="mt-6 grid grid-cols-4 gap-4">
          {accounts.map((acc) => {
            const Icon = acc.type === "savings" ? PiggyBank : Wallet;
            const isCredit = acc.type === "credit";
            return (
              <div key={acc.id} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Icon size={16} className="text-slate-400" />
                  <span className="text-xs text-slate-400">{acc.name}</span>
                </div>
                <div className={`text-sm font-medium ${
                  isCredit ? "text-rose-400" : "text-slate-200"
                }`}>
                  {formatCurrency(acc.balance)}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
