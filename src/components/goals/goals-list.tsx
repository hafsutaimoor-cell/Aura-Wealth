"use client";

import { useFinanceStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GoalCard } from "@/components/goals/goal-card";

export function GoalsList() {
  const goals = useFinanceStore((s) => s.goals);
  const stats = useFinanceStore((s) => s.getDashboardStats());

  const overallProgress =
    goals.length > 0
      ? goals.reduce((acc, g) => acc + g.current, 0) /
        goals.reduce((acc, g) => acc + g.target, 0)
      : 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-sm">Wealth &amp; Savings Goals</CardTitle>
          <CardDescription>
            {goals.length} active goals • {formatCurrency(
              stats.totalIncome - stats.totalExpense,
            )} net cash flow this period
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="mb-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Overall progress</span>
            <span>{(overallProgress * 100).toFixed(0)}%</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-brand-green to-brand-purple transition-all duration-700 ease-out"
              style={{ width: `${Math.min(overallProgress * 100, 100)}%` }}
            />
          </div>
        </div>
        <div className="space-y-3">
          {goals.map((goal) => (
            <GoalCard key={goal.id} id={goal.id} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
