import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Zap,
  Shield,
  TrendingUp,
  Mic,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden selection:bg-brand-green/30 selection:text-white">
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-green/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: "-2s" }} />
      </div>

      <nav className="fixed z-50 top-0 left-0 right-0 h-16 glass border-b border-white/5 px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src="/assets/logo.svg"
              alt="Aura Wealth logo"
              width={32}
              height={32}
              className="animate-wave shadow-brand"
              priority
            />
            <span className="font-bold text-xl tracking-tight text-slate-100">Aura</span>
            <span className="font-bold text-xl tracking-tight text-white">Wealth</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
            <Link href="/dashboard" className="hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/transactions" className="hover:text-white transition-colors">
              Transactions
            </Link>
            <Link href="/goals" className="hover:text-white transition-colors">
              Goals
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-gradient-to-br from-brand-green to-brand-purple shadow-brand hover:scale-[1.02] transition-transform"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative pt-24 pb-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-brand-green mb-6 animate-float">
            <div className="h-2 w-2 rounded-full bg-brand-green animate-pulse" />
            <span>AI Voice Assistant — Live</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-100 mb-6 leading-tight">
            Your wealth,<br />
            <span className="brand-text">voice-activated.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Aura Wealth is your AI-powered personal finance coach. Log transactions by
            voice, watch your net worth update in real time, and stay on track toward every
            savings goal — all in a sleek dark-mode glassmorphism dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="px-8 py-4 rounded-2xl font-semibold text-white bg-gradient-to-br from-brand-green to-brand-purple shadow-brand hover:from-emerald-400 hover:to-violet-500 transition-all transform hover:scale-[1.02]"
            >
              Open Dashboard <ArrowRight size={20} className="ml-2" />
            </Link>
            <Link
              href="#features"
              className="px-8 py-4 rounded-2xl font-semibold text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all"
            >
              See Features
            </Link>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-20 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-green to-brand-purple rounded-3xl blur opacity-25" />
          <CardPreview />
        </div>
      </main>

      <section id="features" className="py-24 border-y border-white/5 bg-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
              Built for your financial life
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Everything you need to master your money, powered by AI voice.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Mic size={24} className="text-brand-green" />}
              title="AI Voice Assistant"
              desc="Speak or type transactions like “Spent $45 on groceries” and watch your dashboard update instantly."
            />
            <FeatureCard
              icon={<TrendingUp size={24} className="text-blue-400" />}
              title="Live Net Worth Tracker"
              desc="Track net worth, monthly income/expense, and cash flow across all your accounts in one place."
            />
            <FeatureCard
              icon={<Shield size={24} className="text-emerald-400" />}
              title="Savings Goals"
              desc="Set targets, watch progress bars fill, and get milestone alerts for Emergency Fund, vacations, and more."
            />
          </div>
        </div>
      </section>

      <div className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-12 text-center border border-brand-green/30 shadow-brand">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-4">
              Ready to take control of your wealth?
            </h2>
            <p className="text-slate-400 mb-8">
              Join thousands using Aura Wealth to build smarter money habits.
            </p>
            <Link
              href="/dashboard"
              className="px-8 py-3 rounded-xl font-semibold text-white bg-brand-green hover:bg-emerald-500 transition-colors shadow-brand"
            >
              Open Dashboard
            </Link>
          </div>
        </div>
      </div>

      <footer className="border-t border-white/10 bg-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Image src="/assets/logo.svg" alt="Aura Wealth" width={24} height={24} />
            <span className="font-bold text-slate-200">Aura Wealth</span>
          </div>
          <p>
            © {new Date().getFullYear()} Aura Wealth. Built with Next.js 14,
            Tailwind CSS, Recharts &amp; Lucide React.
          </p>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CardPreview() {
  return (
    <div className="glass rounded-3xl border border-white/10 p-6 md:p-8 shadow-glass relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-20">
        <Zap size={48} className="text-brand-green" />
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500">Net Worth</p>
              <p className="text-2xl font-bold text-slate-100">$43,630.20</p>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400">+12.4%</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <StatMini label="Income" value="$5,200" color="text-emerald-400" />
            <StatMini label="Expense" value="$2,140" color="text-rose-400" />
            <StatMini label="Savings Rate" value="58.8%" color="text-blue-400" />
          </div>
        </div>
        <div className="w-full lg:w-96 h-64">
          <div className="h-full bg-gradient-to-b from-white/5 to-transparent rounded-2xl border border-white/10 flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-slate-100">Spending Trend</div>
              <div className="h-24 w-full flex items-end gap-2">
                {[65, 120, 95, 160, 140, 200].map((h, i) => (
                  <div
                    key={i}
                    className="h-0 flex-1 bg-brand-green/40 rounded-t-sm"
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-slate-500">
                {["Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
                  <div key={d}>{d}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatMini({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <p className={`font-bold text-slate-100 ${color}`}>{value}</p>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="p-6 rounded-3xl hover:bg-white/5 transition-colors group glass">
      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-brand-green/20 group-hover:border-brand-green/40 transition-colors">
        {icon}
      </div>
      <h3 className="font-semibold text-slate-100 mb-2">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}


