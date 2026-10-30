import { GoalsList } from "@/components/goals/goals-list";
import { AppLayout } from "@/components/layout/app-layout";

export default function GoalsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <GoalsList />
      </div>
    </AppLayout>
  );
}
