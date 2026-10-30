# Aura Wealth

**AI Voice-Powered Personal Finance & Wealth Coach** — a production-ready Next.js 14 (App Router) boilerplate with a dark-mode glassmorphism UI.

Track your net worth, manage transactions, set savings goals, and log expenses by voice with Aura, your AI-powered wealth coach.

![Aura Wealth logo](/public/assets/logo.svg)

## Tech Stack

- **Framework:** Next.js 14 (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS (dark-mode glassmorphism), Inter font
- **Icons:** Lucide React
- **Charts:** Recharts
- **State:** Zustand (with localStorage persistence)
- **Forms/Dialogs:** Radix UI primitives
- **Toasts:** Sonner
- **Utilities:** clsx, tailwind-merge, date-fns, uuid, framer-motion

## Features

- **Dashboard Overview** — Net worth tracker, monthly income/expense summary cards, and interactive Recharts charts (spending vs income trend, category donut).
- **AI Voice Assistant Widget** — Speak or type transactions (e.g. *"Spent $45 on groceries"*) and watch the dashboard update dynamically. Uses the Web Speech API with a typed fallback.
- **Transaction Management** — Searchable, filterable table with categories, date range, full CRUD (add/edit/delete).
- **Wealth & Savings Goals** — Progress bars with automated milestone alerts (Emergency Fund, New Laptop, Vacation Fund, etc.).
- **Responsive** — Glassmorphism layout optimized for desktop and mobile (collapsible sidebar drawer).
- **Mock data** — Seed data included so the dashboard looks active out of the box.

## Project Structure

```
aura-wealth/
├── public/
│   └── assets/
│       └── logo.svg            # Aura Wealth brand logo
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout + metadata + Toaster
│   │   ├── page.tsx            # Landing page (logo in navbar + hero)
│   │   ├── dashboard/page.tsx  # Dashboard overview
│   │   ├── transactions/page.tsx
│   │   └── goals/page.tsx
│   ├── components/
│   │   ├── ui/                 # Base UI (card, button, input, badge, dialog, ...)
│   │   ├── layout/             # Navbar, Sidebar, AppLayout
│   │   ├── dashboard/          # Net worth, summary cards, charts
│   │   ├── voice/              # AI Voice Assistant widget
│   │   ├── transactions/       # Transactions table + form dialog
│   │   └── goals/              # Goal cards + goals list
│   ├── lib/                    # Store (zustand), mock data, utils, voice service
│   └── types/                  # TypeScript type definitions
├── tailwind.config.ts
├── tsconfig.json
├── next.config.mjs
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ (developed/tested with Node 20+)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/hafsutaimoor-cell/Aura-Wealth.git
cd Aura-Wealth

# Install dependencies
npm install

# Run the development server
npm run dev

# Open http://localhost:3000
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Voice Assistant

Click the microphone button in the dashboard header or say/type a command like:

- *"Spent $45 on groceries"*
- *"Paid $120 for internet bill"*
- *"Earned $1200 freelance project"*
- *"Received $500 dividend"*

The assistant parses the amount, category, and type, then logs the transaction and updates the dashboard in real time. If your browser doesn't support the Web Speech API, use the text input field instead.

## Deployment

This is a standard Next.js app and deploys to any platform supporting Next.js (Vercel, Netlify, Docker, etc.):

```bash
npm run build
npm run start
```

## License

MIT

---

Built with Next.js 14, Tailwind CSS, Recharts & Lucide React.

