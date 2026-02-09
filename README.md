# SpendWise - AI-Powered Expense Tracker

**Live Demo:** https://v0-financial-management-app-tau-seven.vercel.app/dashboard

A modern, colorful expense tracking application for young adults with real-time analytics, interactive pie charts, and an AI-powered money coach to help make better financial decisions.

## ✨ Features

- **💳 Expense Tracking**: Log expenses with category, amount, description, and date
- **📊 Visual Analytics**: 
  - Interactive pie charts for spending by category
  - Bar charts for monthly trends
  - Line charts for weekly activity
- **🤖 AI Money Coach**: Chat with an intelligent budgeting assistant
- **📱 Responsive Design**: Works beautifully on all devices
- **🔒 Secure**: Row-Level Security, email authentication, session management
- **⚡ Real-time Updates**: Instant UI refresh when adding/deleting expenses

## 🚀 Getting Started

### Prerequisites
- Supabase account (free tier available)
- Node.js 18+ (for local development)

## 📋 Tech Stack

- **Framework**: Next.js 16 with App Router
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Styling**: Tailwind CSS
- **AI**: Vercel AI SDK with GPT-4o-mini
- **State**: React hooks + SWR patterns

## Backend

SpendWise uses a serverless backend powered by:
- Supabase (PostgreSQL, Auth, Row-Level Security)
- Next.js API Routes (`/app/api`)

No separate backend service is required for the MVP.

## 📁 Project Structure

```
├── app/
│   ├── auth/
│   │   ├── login/page.tsx
│   │   ├── sign-up/page.tsx
│   │   ├── error/page.tsx
│   │   └── callback/route.ts
│   ├── dashboard/page.tsx
│   ├── api/
│   │   └── money-coach/route.ts
│   ├── page.tsx
│   └── layout.tsx
├── components/
│   ├── dashboard/dashboard-client.tsx
│   ├── expense/
│   │   ├── add-expense-dialog.tsx
│   │   └── expenses-list.tsx
│   ├── analytics/
│   │   ├── analytics-section.tsx
│   │   ├── category-chart.tsx
│   │   ├── monthly-chart.tsx
│   │   └── weekly-chart.tsx
│   ├── ai/money-coach-chat.tsx
│   └── ui/ (shadcn components)
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── proxy.ts
│   └── utils.ts
├── middleware.ts
├── scripts/
│   └── 001_create_expenses_table.sql
└── SETUP.md
```

## 🎨 Design

- **Color Palette**: Blue (#2563eb), Purple (#8b5cf6), Orange (#ff7a00)
- **Typography**: Geist (sans-serif)
- **Components**: Modern cards, smooth gradients, interactive elements
- **Responsiveness**: Mobile-first approach

## 📊 Database Schema

### profiles table
- `id` (UUID) - User ID from auth.users
- `full_name` (TEXT) - User's full name
- `monthly_budget` (NUMERIC) - Optional budget
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### expenses table
- `id` (UUID) - Unique expense ID
- `user_id` (UUID) - Reference to user
- `description` (TEXT) - Expense description
- `amount` (DECIMAL) - Expense amount
- `category` (TEXT) - Spending category
- `date` (DATE) - When expense occurred
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## 🤖 AI Money Coach

Powered by GPT-4o-mini, the Money Coach:
- Analyzes your spending patterns
- Provides personalized budgeting advice
- Identifies spending trends
- Suggests money-saving opportunities
- Encourages healthy financial habits

Ask questions like:
- "What are my top spending categories?"
- "How can I reduce my spending?"
- "What's my average expense?"
- "Give me budget tips for next month"

## 🔒 Security Features

- ✅ Row-Level Security (RLS) on all data
- ✅ Users can only access their own data
- ✅ Secure password hashing
- ✅ HTTP-only session cookies
- ✅ Email verification required
- ✅ Automatic token refresh

## 💰 Expense Categories

- Food & Dining
- Transportation
- Entertainment
- Shopping
- Health & Fitness
- Utilities
- Travel
- Education
- Other

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
git push  # Auto-deploys from GitHub
```

### Manual Deployment
```bash
npm run build
npm run start
```

## 📚 Documentation

- **SETUP.md** - Detailed setup instructions
- **FEATURES.md** - Complete feature guide
- **This README** - Project overview

## 🎯 Usage Example

1. **Sign Up** → Create account with email
2. **Add Expense** → Click "Add Expense" button
   - Enter description: "Coffee at Starbucks"
   - Amount: $5.50
   - Category: Food & Dining
   - Date: Today
3. **View Charts** → See spending patterns
4. **Chat with Coach** → Ask "How's my spending?"
5. **Make Decisions** → Adjust budget based on insights

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| Environment variables not loading | Check Supabase is connected in Integrations |
| Can't sign in | Verify email in database, check Supabase Auth |
| Charts not showing | Ensure database migration ran successfully |
| AI Coach not responding | Check API key configuration |

## 📞 Support

For issues:
1. Check SETUP.md for configuration help
2. Verify Supabase integration is connected
3. Check browser console for errors
4. Ensure environment variables are set

## 📄 License

This project is created with v0 and is open source.

## 🙏 Credits

- Built with [v0](https://v0.app)
- UI Components from [shadcn/ui](https://ui.shadcn.com)
- Charts by [Recharts](https://recharts.org)
- Backend by [Supabase](https://supabase.com)
- AI by [Vercel AI SDK](https://sdk.vercel.ai)

---

**Start tracking your expenses and build better financial habits with SpendWise! 💰**
