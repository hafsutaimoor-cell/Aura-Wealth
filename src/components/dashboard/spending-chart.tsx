"use client";

import { useFinanceStore } from "@/lib/store";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart as PieChart,
  Pie as Pie,
  Cell as Cell,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

interface ChartPoint {
  month: string;
  income: number;
  expense: number;
}

export function SpendingChart() {
  const summary = useFinanceStore((s) => s.getMonthlySummary(6));

  const data: ChartPoint[] = summary.map((m) => ({
    month: m.month,
    income: m.income,
    expense: m.expense,
  }));

  const totalExpense = data.reduce((acc, d) => acc + d.expense, 0);
  const totalIncome = data.reduce((acc, d) => acc + d.income, 0);
  const trend = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

  return (
    <Card className="col-span-1 lg:col-span-3">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-sm">Spending vs Income Trend</CardTitle>
          <CardDescription>Last 6 months of cash flow</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp size={16} className="text-emerald-400" />
          <span className={`text-sm font-semibold ${trend >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
            {trend >= 0 ? "+" : ""}{trend.toFixed(1)}%
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FB7185" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#FB7185" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34D399" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#34D399" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
              <YAxis axisLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
                itemStyle={{ color: "#f8fafc" }}
                labelStyle={{ color: "#94a3b8", fontSize: 12 }}
              />
              <Legend verticalAlign="top" align="right" height={36} />
              <Area type="monotone" dataKey="expense" stroke="#FB7185" strokeWidth={2} fillOpacity={1} fill="url(#colorExpense)" name="Expense" />
              <Area type="monotone" dataKey="income" stroke="#34D399" strokeWidth={2} fillOpacity={1} fill="url(#colorIncome)" name="Income" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function CategoryDonut() {
  const byCategory = useFinanceStore((s) => s.getTransactionsByCategory());
  const entries = Object.entries(byCategory).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const total = entries.reduce((acc, [, v]) => acc + v, 0);

  const colors = ["#10B981", "#3B82F6", "#8B5CF6", "#F59E0B", "#EC4899"];

  return (
    <Card className="col-span-1 lg:col-span-3">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Spending by Category</CardTitle>
        <CardDescription>Top expense categories this period</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="h-48 flex items-center justify-center">
            <ResponsiveContainer width="160" height={160}>
              <PieChart data={entries.map(([name, value]) => ({ name, value }))}>
                <Pie dataKey="value" cx={80} cy={80} innerRadius={60} outerRadius={80} fill="#888" label>
                  {entries.map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {entries.map(([name, value], i) => (
              <div key={name} className="flex items-center justify-between gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${colors[i % colors.length]}`} />
                  <span className="text-slate-300">{name}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-100">{formatCurrency(value)}</span>
                  <span className="text-xs text-slate-500">{(total > 0 ? ((value / total) * 100) : 0).toFixed(0)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

