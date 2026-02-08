# SpendWise - Feature Guide

## 🎯 Overview

SpendWise is a comprehensive expense tracking application designed for young adults. It combines beautiful analytics, easy expense management, and AI-powered financial coaching to help you make smarter spending decisions.

## 🎨 Key Features

### 1. **User Authentication**
- Secure email/password signup and login
- Email verification for new accounts
- Session-based authentication with Supabase Auth
- Automatic profile creation on signup
- Secure logout functionality

### 2. **Expense Management**
- **Add Expenses**: Quick dialog to log new expenses
  - Description: What you spent on
  - Amount: Cost in dollars
  - Category: 9 predefined categories
  - Date: When the expense occurred

- **Categories Available**:
  - Food & Dining (🍽️)
  - Transportation (🚗)
  - Entertainment (🎬)
  - Shopping (🛍️)
  - Health & Fitness (💪)
  - Utilities (💡)
  - Travel (✈️)
  - Education (📚)
  - Other (📌)

- **Recent Expenses List**: View and delete recent transactions

### 3. **Advanced Analytics**

#### Dashboard Statistics
- **Total This Month**: Sum of current month expenses
- **Average Expense**: Per-transaction average
- **All-Time Total**: Complete spending history

#### Spending by Category (Interactive Pie Chart)
- Visual breakdown of expenses by category
- Percentage distribution
- Color-coded categories
- Shows both chart and detailed breakdown table
- Real-time updates as you add expenses

#### Monthly Trends (Bar Chart)
- Tracks spending over the last 12 months
- Identifies spending patterns
- Hover for exact amounts
- Helps spot seasonal spending changes

#### Weekly Activity (Line Chart)
- Last 7 days of spending
- Day-by-day breakdown
- Smooth line visualization
- Quick view of recent activity patterns

### 4. **AI Money Coach** 💰

An intelligent budgeting assistant powered by GPT-4o-mini that provides:

**Capabilities:**
- Analyzes your actual spending data
- Provides personalized budgeting advice
- Identifies spending patterns and trends
- Suggests budget improvements
- Offers money-saving tips
- Encourages healthy financial habits
- Answers questions about your finances

**How to Use:**
1. Open the Money Coach panel on the right side
2. Type your question or request
3. Get instant, personalized advice based on your data

**Example Prompts:**
- "What category am I spending the most on?"
- "How can I reduce my spending?"
- "What's my average daily expense?"
- "What are my top 3 spending areas?"
- "Give me tips to save money this month"

### 5. **Responsive Design**
- **Mobile First**: Optimized for smartphones
- **Tablet Friendly**: Full functionality on tablets
- **Desktop Optimized**: Best experience on large screens
- **Gradient Backgrounds**: Modern, vibrant aesthetic
- **Smooth Animations**: Polished transitions throughout

### 6. **Data Security**
- Row-Level Security (RLS) on all data
- Users can only access their own expenses
- Secure password handling with Supabase
- HTTP-only session cookies
- No client-side data exposure

## 🎯 Use Cases

### For Budget-Conscious Students
- Track spending without complex spreadsheets
- Understand where money goes each month
- Get AI-powered money-saving tips
- See visual spending patterns

### For Young Professionals
- Monitor salary expenses
- Identify wasteful spending
- Plan monthly budgets
- Track investment in different categories

### For Anyone Managing Finances
- Easily add daily expenses
- Review monthly spending at a glance
- Ask AI coach for budgeting advice
- Make data-driven financial decisions

## 📊 Data Visualization

### Color Scheme
**Expense Categories:**
- Food & Dining: Orange (#f97316)
- Transportation: Blue (#3b82f6)
- Entertainment: Purple (#8b5cf6)
- Shopping: Pink (#ec4899)
- Health & Fitness: Green (#10b981)
- Utilities: Yellow (#f59e0b)
- Travel: Cyan (#06b6d4)
- Education: Indigo (#6366f1)
- Other: Gray (#6b7280)

**Dashboard:**
- Primary: Blue (#2563eb)
- Secondary: Purple (#8b5cf6)
- Accent: Orange (#ff7a00)
- Background: Light gradient (blue → purple)

## 🚀 Performance

- **Fast Loading**: Optimized React components
- **Real-time Updates**: Instant UI refresh on expense changes
- **Efficient Queries**: Indexed database for quick lookups
- **Minimal Data Transfer**: Only fetches user's own data
- **Smooth Animations**: 60fps transitions

## 🔐 Privacy & Security

- Your data is yours alone
- Row-Level Security prevents unauthorized access
- Passwords encrypted with bcrypt
- Sessions stored securely
- No tracking or analytics
- Delete your account anytime

## 🎓 Learning Features

The app includes:
- Expense categorization to understand spending habits
- Visual trends to spot patterns
- AI insights to improve financial literacy
- Actionable recommendations for budgeting

## 💡 Pro Tips

1. **Categorize Consistently**: Use the same categories for better analytics
2. **Log Immediately**: Add expenses right after spending
3. **Review Weekly**: Check your weekly chart every Sunday
4. **Ask the Coach**: Get personalized advice regularly
5. **Set Goals**: Aim to reduce spending in high categories

## 🔄 Workflow Example

1. **Sign up** → Create your account
2. **Start Tracking** → Add your daily expenses
3. **Review Data** → Check charts after a few days
4. **Ask Questions** → Chat with AI coach for tips
5. **Adjust Budget** → Make changes based on insights
6. **Repeat** → Build healthy spending habits

## 📈 Next Features (Potential)

- Monthly budgets with alerts
- Recurring expenses
- Expense tagging
- Receipt uploads
- Multi-currency support
- Savings goals
- Export reports
- Integration with bank accounts
