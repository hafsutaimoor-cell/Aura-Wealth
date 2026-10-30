import { VoiceWidget } from "@/components/voice/voice-widget";
import { NetWorthTracker } from "@/components/dashboard/net-worth";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { SpendingChart, CategoryDonut } from "@/components/dashboard/spending-chart";
import { AppLayout } from "@/components/layout/app-layout";

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Dashboard</h1>
            <p className="text-sm text-slate-400">
              Here&apos;s how your wealth is doing today.
            </p>
          </div>
        </div>

        <div className="mb-2">
          <VoiceWidget />
        </div>

        <div className="grid gap-5 md:grid-cols-4 lg:grid-cols-4">
          <NetWorthTracker />
          <SummaryCards />
          <SpendingChart />
          <CategoryDonut />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="glass rounded-3xl border border-white/10 p-6 shadow-glass">
              <h2 className="text-sm font-semibold text-slate-100 mb-4">
                Recent Activity
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-xs text-slate-500">
                      <th className="text-left pb-3 font-medium">Transaction</th>
                      <th className="text-left pb-3 font-medium w-24">Category</th>
                      <th className="text-left pb-3 font-medium w-20">Type</th>
                      <th className="text-left pb-3 font-medium w-24">Date</th>
                      <th className="text-right pb-3 font-medium w-24">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr key={i} className="py-4 group hover:bg-white/5">
                        <td className="text-slate-200">Sample transaction {i}</td>
                        <td className="text-slate-400">Groceries</td>
                        <td className="text-slate-400">Expense</td>
                        <td className="text-slate-400">Today</td>
                        <td className="text-right text-rose-400">−$42.00</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="glass rounded-3xl border border-white/10 p-6 shadow-glass space-y-4">
              <h2 className="text-sm font-semibold text-slate-100">Quick actions</h2>
              <div className="space-y-2">
                <button className="w-full glass-btn text-left text-sm text-slate-300 hover:text-white">
                  Log a voice transaction
                </button>
                <button className="w-full glass-btn text-left text-sm text-slate-300 hover:text-white">
                  Add a savings goal
                </button>
                <button className="w-full glass-btn text-left text-sm text-slate-300 hover:text-white">
                  Review weekly spending
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
