"use client";

import { useState, useMemo } from "react";
import { useFinanceStore } from "@/lib/store";
import { formatCurrency, formatRelativeDate, getCategoryColor } from "@/lib/utils";
import { Search, Filter, Plus, Trash2, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function TransactionsTable() {
  const {
    transactions,
    categories,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useFinanceStore((s) => ({
    transactions: s.transactions,
    categories: s.categories,
    addTransaction: s.addTransaction,
    updateTransaction: s.updateTransaction,
    deleteTransaction: s.deleteTransaction,
  }));

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "income" | "expense">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<{
    type: "income" | "expense";
    amount: string;
    categoryId: string;
    description: string;
    date: string;
  }>({ type: "expense", amount: "", categoryId: "", description: "", date: new Date().toISOString().split("T")[0] });

  const filtered = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch = tx.description.toLowerCase().includes(search.toLowerCase()) || tx.category.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === "all" || tx.type === typeFilter;
      const matchesCategory = categoryFilter === "all" || tx.categoryId === categoryFilter;
      return matchesSearch && matchesType && matchesCategory;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, search, typeFilter, categoryFilter]);

  const incomeCategories = categories.filter((c) => c.type === "income");
  const expenseCategories = categories.filter((c) => c.type === "expense");

  const openEdit = (tx: any) => {
    setEditingId(tx.id);
    setForm({
      type: tx.type,
      amount: tx.amount.toString(),
      categoryId: tx.categoryId,
      description: tx.description,
      date: tx.date,
    });
    setOpen(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ type: "expense", amount: "", categoryId: "", description: "", date: new Date().toISOString().split("T")[0] });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(form.amount);
    if (!amount || !form.categoryId || !form.description) return;
    const cat = categories.find((c) => c.id === form.categoryId);
    const update: any = {
      amount,
      type: form.type,
      categoryId: form.categoryId,
      category: cat?.name || form.categoryId,
      description: form.description,
      date: form.date,
    };
    if (editingId) {
      updateTransaction(editingId, update);
    } else {
      addTransaction({ ...update, id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}` });
    }
    setOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this transaction?")) deleteTransaction(id);
  };

  return (
    <Card>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Plus size={20} className="text-brand-green" />
            <h2 className="text-lg font-bold text-slate-100">Transactions</h2>
          </div>
          <Button variant="brand" onClick={() => { resetForm(); setOpen(true); }}>
            Add transaction
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-3 text-slate-500" />
            <Input placeholder="Search transactions..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="bg-white/5 border border-white/20 rounded-xl text-sm text-slate-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-green"
          >
            <option value="all">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-white/5 border border-white/20 rounded-xl text-sm text-slate-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-green"
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <Button variant="outline" size="sm" onClick={() => { setSearch(""); setTypeFilter("all"); setCategoryFilter("all"); }}>
            <Filter size={16} className="mr-2" /> Reset
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-slate-300">
            <thead>
              <tr className="border-b border-white/10 text-xs text-slate-500">
                <th className="text-left pb-4 font-medium">Description</th>
                <th className="text-left pb-4 font-medium w-20">Category</th>
                <th className="text-left pb-4 font-medium w-20">Type</th>
                <th className="text-left pb-4 font-medium w-24">Date</th>
                <th className="text-right pb-4 font-medium w-24">Amount</th>
                <th className="text-right pb-4 font-medium w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="h-32 text-center text-slate-500">No transactions found</td>
                </tr>
              ) : (
                filtered.map((tx) => (
                  <tr key={tx.id} className="hover:bg-white/5 transition-colors group">
                    <td className="py-4 text-slate-200">{tx.description}</td>
                    <td className="py-4">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: categories.find((c) => c.id === tx.categoryId)?.color || "#94a3b8" }} />
                        {tx.category}
                      </span>
                    </td>
                    <td className="py-4">
                      <Badge variant={tx.type === "income" ? "success" : "danger"} className="text-[10px]">
                        {tx.type}
                      </Badge>
                    </td>
                    <td className="py-4 text-slate-400">{formatRelativeDate(tx.date)}</td>
                    <td className="py-4 text-right">
                      <span className={`font-medium ${getCategoryColor(tx.type)}`}>
                        {tx.type === "income" ? "+" : "−"}{formatCurrency(tx.amount)}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(tx)} className="p-1.5">
                        <Edit3 size={16} />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(tx.id)} className="p-1.5">
                        <Trash2 size={16} />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit transaction" : "Add transaction"}</DialogTitle>
              <DialogDescription>Record income or an expense.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, type: "income" })}
                      className={cn(
                        "flex-1 py-2 rounded-xl text-sm font-medium transition-colors",
                        form.type === "income"
                          ? "bg-brand-green/20 text-brand-green border border-brand-green/40"
                          : "bg-white/5 text-slate-400 hover:text-white",
                      )}
                    >
                      Income
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, type: "expense" })}
                      className={cn(
                        "flex-1 py-2 rounded-xl text-sm font-medium transition-colors",
                        form.type === "expense"
                          ? "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                          : "bg-white/5 text-slate-400 hover:text-white",
                      )}
                    >
                      Expense
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="bg-white/5 border border-white/20 rounded-xl text-sm text-slate-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-green"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-slate-500">$</span>
                  <Input
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <select
                  value={form.categoryId}
                  onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                  className="bg-white/5 border border-white/20 rounded-xl text-sm text-slate-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-green"
                >
                  <option value="">Select category</option>
                  {(form.type === "income" ? incomeCategories : expenseCategories).map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="e.g. Grocery run"
                />
              </div>
              <Separator />
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="brand"
                  type="submit"
                  disabled={!form.amount || !form.categoryId || !form.description}
                >
                  {editingId ? "Save changes" : "Add transaction"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

