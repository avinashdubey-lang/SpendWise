# SpendWise - Deployment & Setup Checklist

## ✅ Pre-Deployment Setup

### 1. Supabase Integration
- [ ] Go to v0 **Integrations** section
- [ ] Click on **Supabase**
- [ ] Connect your Supabase account
- [ ] Create a new Supabase project OR select existing
- [ ] Verify environment variables are auto-populated:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL` is set
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set

### 2. Database Setup
- [ ] Open your Supabase project dashboard
- [ ] Go to **SQL Editor**
- [ ] Create a new query
- [ ] Copy the entire contents of `scripts/001_create_expenses_table.sql`
- [ ] Paste into the SQL editor
- [ ] Click **Run**
- [ ] Wait for "Success" message
- [ ] Verify tables were created:
  - [ ] `public.profiles` table exists
  - [ ] `public.expenses` table exists
  - [ ] Row Level Security (RLS) is enabled

### 3. Code Review
- [ ] Review `app/page.tsx` (redirects to auth or dashboard)
- [ ] Review `app/auth/login/page.tsx` (login form)
- [ ] Review `app/auth/sign-up/page.tsx` (signup form)
- [ ] Review `app/dashboard/page.tsx` (protected dashboard)
- [ ] Review `components/dashboard/dashboard-client.tsx` (main component)
- [ ] Review `app/api/money-coach/route.ts` (AI endpoint)

### 4. Environment Variables Verification
In your Vercel dashboard (or local `.env.local` for testing):
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

## 🚀 Deployment Steps

### Option A: Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial SpendWise deployment"
   git push
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js

3. **Add Environment Variables**
   - In Vercel dashboard: Settings → Environment Variables
   - Add:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. **Deploy**
   - Vercel auto-deploys on push
   - Check build logs for errors
   - Visit your Vercel URL

### Option B: Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Create `.env.local`**
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   - Visit `http://localhost:3000`
   - Should redirect to login

## ✅ Post-Deployment Testing

### Authentication Testing
- [ ] Sign up with new email
  - [ ] Form validates required fields
  - [ ] Success message appears
  - [ ] Email confirmation notice shown
- [ ] Check Supabase Auth for new user
  - [ ] User appears in Auth → Users
  - [ ] Profile created automatically
- [ ] Email confirmation (if configured)
  - [ ] Confirmation email sent
  - [ ] Callback link works
  - [ ] User redirected to dashboard

### Dashboard Testing
- [ ] Log in with created account
  - [ ] Dashboard loads
  - [ ] Statistics cards visible
  - [ ] No console errors
- [ ] Add an expense
  - [ ] Dialog opens
  - [ ] Form submission works
  - [ ] Expense appears in list
  - [ ] Charts update
- [ ] View charts
  - [ ] Category pie chart renders
  - [ ] Monthly bar chart renders
  - [ ] Weekly line chart renders
  - [ ] Hover tooltips work
- [ ] AI Money Coach
  - [ ] Chat interface loads
  - [ ] Can type message
  - [ ] Submit button works
  - [ ] AI responds with relevant advice
  - [ ] Respects spending context

### Data Verification
- [ ] Check Supabase Dashboard
  - [ ] Go to Table Editor
  - [ ] `expenses` table has new records
  - [ ] Data looks correct
  - [ ] Can see user filtering (RLS working)

### Security Testing
- [ ] Log in as different user
  - [ ] Can't see first user's expenses
  - [ ] Only sees own data
- [ ] Try accessing other users' data
  - [ ] Get permission error (RLS working)
- [ ] Check session handling
  - [ ] Logout button works
  - [ ] Redirected to login
  - [ ] Can't access dashboard without auth

### Performance Testing
- [ ] Page load time
  - [ ] Dashboard loads in < 3s
  - [ ] No layout shift
- [ ] Charts render smoothly
  - [ ] No lag on hover
  - [ ] Responsive to window resize
- [ ] API response time
  - [ ] Add expense < 500ms
  - [ ] AI Coach responds quickly

## 🔧 Troubleshooting Deployment

| Error | Solution |
|-------|----------|
| "NEXT_PUBLIC_SUPABASE_URL is not set" | Add env var to Vercel/local .env |
| "Database connection failed" | Run SQL migration in Supabase |
| "403 Unauthorized" | Check RLS policies in Supabase |
| "Sign up not working" | Verify email settings in Supabase Auth |
| "AI Coach returns error" | Check API key configuration |
| "Blank dashboard" | Check browser console for errors |

## 📊 Monitoring Post-Deployment

### Set Up Monitoring
- [ ] Enable Vercel Analytics
- [ ] Monitor error rates in Supabase
- [ ] Check API usage in Vercel dashboard

### Regular Checks
- [ ] Test sign up weekly
- [ ] Verify database backups
- [ ] Monitor Supabase usage
- [ ] Check error logs

## 🔒 Security Checklist

- [ ] HTTPS enabled (Vercel default)
- [ ] RLS policies in place
- [ ] Environment variables not exposed
- [ ] Email verification required
- [ ] Session expiry configured
- [ ] No hardcoded secrets
- [ ] CORS properly configured

## 📈 Performance Optimization

- [ ] Enable image optimization (next/image)
- [ ] Minify CSS and JS (automatic in Next.js)
- [ ] Set up CDN (Vercel automatic)
- [ ] Configure caching headers
- [ ] Enable database indexing
- [ ] Monitor Core Web Vitals

## 🚀 CI/CD Setup (Optional)

### GitHub Actions Example
```yaml
name: Deploy to Vercel
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

## 📞 Support Resources

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs
- **Shadcn/ui**: https://ui.shadcn.com

## ✨ Next Steps After Deployment

1. **Create backup strategy**
   - Enable Supabase backups
   - Export data regularly

2. **Monitor usage**
   - Supabase free tier limits
   - Vercel bandwidth usage

3. **Gather feedback**
   - Share with beta testers
   - Collect feature requests

4. **Plan improvements**
   - Budget alerts
   - Recurring expenses
   - Receipt uploads
   - Export reports

5. **Scale if needed**
   - Upgrade Supabase plan
   - Optimize database queries
   - Implement caching

## 🎉 Deployment Successful!

Once everything is working:
1. ✅ Users can sign up and log in
2. ✅ Dashboard displays correctly
3. ✅ Expenses can be added and deleted
4. ✅ Charts update in real-time
5. ✅ AI Money Coach provides advice
6. ✅ Data is secure and private

**Congratulations! SpendWise is live! 🚀**
