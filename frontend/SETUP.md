# SpendWise - Expense Tracker Setup Guide

## 🚀 Quick Start

SpendWise is a modern expense tracking application with AI-powered budgeting assistance. Follow these steps to get started:

### 1. Connect Supabase Integration

First, you need to connect your Supabase account:
1. Click on the **Integrations** section in v0
2. Select **Supabase** and connect your account
3. Create a new Supabase project or select an existing one
4. Note your `Project URL` and `Anon Key`

### 2. Set Environment Variables

Once Supabase is connected, the environment variables will be automatically added:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Run Database Migration

Execute the migration script to create the necessary tables:
1. Go to the Supabase SQL editor
2. Copy the contents of `scripts/001_create_expenses_table.sql`
3. Run it in your Supabase SQL editor

Or, if you have the System Action tool available, it will execute automatically.

This creates:
- **profiles table**: Stores user profile information
- **expenses table**: Stores all expense records with RLS policies

### 4. Features

#### 📊 Expense Tracking
- Add expenses with description, amount, category, and date
- View recent expenses in a clean list format
- Delete expenses you no longer need

#### 📈 Analytics & Charts
- **Spending by Category**: Interactive pie chart showing expense breakdown
- **Monthly Trends**: Bar chart tracking spending over 12 months
- **Weekly Activity**: Line chart showing last 7 days of spending
- **Quick Stats**: Cards displaying total spent, average expense, and transaction count

#### 💰 AI Money Coach
- Chat with your AI money coach for personalized budgeting advice
- Get insights based on your actual spending patterns
- Receive recommendations for better financial habits
- Ask questions about your spending and get actionable tips

#### 🔐 Authentication
- Secure email/password authentication with Supabase
- Email verification required for new accounts
- Session management with HTTP-only cookies

## 📋 Database Schema

### profiles table
```sql
id (UUID) - User ID from auth.users
full_name (TEXT) - User's full name
monthly_budget (NUMERIC) - Optional monthly budget
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### expenses table
```sql
id (UUID) - Unique expense ID
user_id (UUID) - Reference to user
description (TEXT) - What was the expense for
amount (DECIMAL) - Expense amount
category (TEXT) - Category: Food & Dining, Transportation, etc.
date (DATE) - When the expense occurred
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

## 🎨 Design Features

- **Modern UI**: Clean, colorful interface with gradient backgrounds
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Vibrant Colors**: Blue (#2563eb), Purple (#8b5cf6), and Orange (#ff7a00) palette
- **Interactive Charts**: Using Recharts for beautiful data visualization
- **Smooth Animations**: Transitions and loading states for better UX

## 🤖 AI Money Coach

The AI coach uses GPT-4o-mini to:
- Analyze your spending patterns
- Identify spending trends by category
- Suggest budget improvements
- Provide encouragement and support
- Answer financial questions

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- Users can only see/modify their own data
- Secure authentication with Supabase Auth
- Session tokens stored in HTTP-only cookies
- Password hashing handled by Supabase

## 🚀 Deployment

Deploy to Vercel:
1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Vercel will auto-detect Next.js and configure it
4. Add environment variables in Vercel dashboard
5. Deploy!

## 📞 Support

If you encounter any issues:
1. Check that Supabase is properly connected
2. Verify environment variables are set
3. Ensure the database migration ran successfully
4. Check browser console for error messages

## 💡 Next Steps

- Set a monthly budget in your profile
- Add your expenses to start tracking
- Chat with the AI coach for budgeting tips
- Analyze your spending patterns with the charts
- 
