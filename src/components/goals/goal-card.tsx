"use client";

import { useFinanceStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import {
  Shield,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface GoalCardProps {
  id: string;
}

export function GoalCard({ id }: GoalCardProps) {
  const { goals, updateGoalProgress } = useFinanceStore((s) => ({
    goals: s.goals,
    updateGoalProgress: s.updateGoalProgress,
  }));

  const goal = goals.find((g) => g.id === id);
  if (!goal) return null;

  const progress = Math.min((goal.current / goal.target) * 100, 100);
  const remaining = Math.max(goal.target - goal.current, 0);
  const milestoneReached = goal.milestoneAlerts.some((m) => progress >= m && progress < m + 1);

  return (
    <Card className="group">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${goal.color}20`}>
              <Shield size={20} strokeWidth={2} className={goal.color} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-100">{goal.name}</h3>
              <p className="text-xs text-slate-500">
                {formatCurrency(goal.current)} of {formatCurrency(goal.target)}
              </p>
            </div>
          </div>
          <Badge variant={progress >= 100 ? "success" : "brand"} className="text-[10px] px-2 py-1">
            {progress >= 100 ? "Completed" : `${Math.round(progress)}%`}
          </Badge>
        </div>

        <div className="mb-3">
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>Saved</span>
            <span>{formatCurrency(goal.current)}</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-brand-green to-brand-purple transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 pt-3 border-t border-white/10">
          <div className="text-sm text-slate-300">
            {formatCurrency(remaining)} remaining
          </div>
          {goal.deadline && (
            <span className="text-xs text-slate-500">
              Target: {new Date(goal.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          )}
        </div>

        {milestoneReached && progress < 100 && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span className="text-xs text-emerald-300 font-medium">
                Milestone reached! Keep going — you're making great progress.
              </span>
            </div>
          </div>
        )}

        <div className="mt-5 flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const amount = prompt(`Add amount to ${goal.name} (current: ${formatCurrency(goal.current)})`);
              if (amount) {
                const val = parseFloat(amount);
                if (!isNaN(val)) updateGoalProgress(id, val);
              }
            }}
            disabled={progress >= 100}
          >
            {progress >= 100 ? "Completed ✓" : "Add contribution"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
