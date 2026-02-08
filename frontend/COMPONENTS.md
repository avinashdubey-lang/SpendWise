# Component Architecture

## Page Components

### `app/page.tsx`
**Root Home Page**
- Redirects authenticated users to `/dashboard`
- Redirects unauthenticated users to `/auth/login`

### `app/dashboard/page.tsx`
**Protected Dashboard Page**
- Server component that checks authentication
- Passes userId to DashboardClient
- Handles server-side auth verification

## Client Components

### `components/dashboard/dashboard-client.tsx`
**Main Dashboard Component**
- Manages expense state with hooks
- Handles CRUD operations for expenses
- Fetches expenses from Supabase on mount
- Provides logout functionality
- Layout: 2/3 width analytics, 1/3 width coach + expenses

### `components/analytics/analytics-section.tsx`
**Analytics Container**
- Displays statistics cards
- Renders category, monthly, and weekly charts
- Calculates stats (total, average, count)

### `components/analytics/category-chart.tsx`
**Category Pie Chart**
- Interactive pie chart showing spending by category
- Color-coded slices (8 colors)
- Displays percentages and amounts
- Legend and detailed breakdown table

### `components/analytics/monthly-chart.tsx`
**Monthly Bar Chart**
- Tracks last 12 months of spending
- Bar chart visualization
- Month labels on X-axis
- Tooltip with exact amounts

### `components/analytics/weekly-chart.tsx`
**Weekly Line Chart**
- Last 7 days of spending
- Smooth line chart
- Day-of-week labels
- Real-time data update

## Expense Management

### `components/expense/add-expense-dialog.tsx`
**Add Expense Dialog**
- Modal dialog for new expenses
- Form fields:
  - Description (text input)
  - Amount (number input)
  - Category (select dropdown)
  - Date (date picker)
- 9 predefined categories
- Loading state handling
- Form reset after submission

### `components/expense/expenses-list.tsx`
**Expense List Component**
- Displays recent expenses
- Shows category badge
- Amount and date
- Delete button for each expense
- Color-coded categories
- Responsive list layout

## AI Component

### `components/ai/money-coach-chat.tsx`
**Money Coach Chat Interface**
- Uses `useChat` hook from AI SDK
- Sends expenses as context
- Displays conversation history
- Message bubbles (user vs coach)
- Input field with send button
- Auto-scroll to latest message
- Loading indicator (animated dots)

## Authentication Components

### `app/auth/login/page.tsx`
**Login Page**
- Email and password inputs
- Form validation
- Error handling and display
- Link to sign-up page
- Gradient background
- Card-based layout

### `app/auth/sign-up/page.tsx`
**Sign Up Page**
- Full name input
- Email and password inputs
- Success message after signup
- Email confirmation notice
- Link back to login
- Consistent styling with login

### `app/auth/error/page.tsx`
**Authentication Error Page**
- Displayed on auth failures
- Simple error message
- Back to login link

### `app/auth/callback/route.ts`
**Auth Callback Route**
- Handles email confirmation callback
- Exchanges code for session
- Redirects to dashboard on success
- Redirects to error page on failure

## Supabase Integration

### `lib/supabase/client.ts`
**Browser Client**
- Creates browser Supabase client
- Uses SSR configuration
- Used in client components

### `lib/supabase/server.ts`
**Server Client**
- Creates server Supabase client
- Handles cookies properly
- Used in server components and route handlers
- Async function (requires await)

### `lib/supabase/proxy.ts`
**Middleware Proxy**
- Session update function
- Used in middleware
- Refreshes user session
- Handles token refresh

### `middleware.ts`
**Next.js Middleware**
- Intercepts all requests
- Refreshes Supabase session
- Updates cookies
- Protects routes

## API Routes

### `app/api/money-coach/route.ts`
**Money Coach API Endpoint**
- POST endpoint
- Receives messages and expenses
- Processes spending data
- Creates system prompt with context
- Uses `streamText` for streaming response
- Returns SSE-encoded stream

## Component Data Flow

```
app/page.tsx
└── Redirects to /dashboard or /auth/login

app/dashboard/page.tsx (Server)
└── Verifies auth
└── Passes userId to DashboardClient

DashboardClient
├── Manages expense state
├── Fetches expenses from Supabase
├── Provides CRUD operations
└── Renders:
    ├── Header (with logout)
    ├── AnalyticsSection
    │   ├── Stats cards
    │   ├── CategoryChart (Pie)
    │   ├── MonthlyChart (Bar)
    │   └── WeeklyChart (Line)
    ├── MoneyCoachChat
    │   └── useChat hook
    │   └── Calls /api/money-coach
    └── ExpensesList
        └── Shows recent expenses
```

## State Management

### useChat Hook
- Manages conversation history
- Handles message sending
- Manages loading state
- Receives expenses as body parameter

### React Hooks
- `useState`: Form inputs, dialog state, loading states
- `useEffect`: Fetch expenses on mount
- `useMemo`: Calculate stats and chart data
- `useRef`: Auto-scroll to latest message

## Styling

### Tailwind CSS Classes Used
- Layout: `grid`, `flex`, `gap-*`
- Colors: Theme tokens (primary, secondary, accent)
- Spacing: `p-*`, `m-*`, `space-*`
- Typography: `text-*`, `font-*`
- Interactive: `hover:`, `focus:`, `disabled:`
- Responsive: `md:`, `lg:` prefixes
- Gradients: `bg-gradient-to-*`

### Component Composition
- Cards: Shadow and border styling
- Buttons: Gradient backgrounds, hover states
- Inputs: Border and focus states
- Modals: Overlay and centering
- Charts: Responsive containers

## Performance Optimizations

- Memoization: `useMemo` for chart data calculation
- Code splitting: Components loaded on demand
- Lazy loading: Charts render on demand
- Query indexing: Database indexes on user_id, date
- RLS policies: Efficient permission checks

## Accessibility

- Semantic HTML: `main`, `header` tags
- ARIA labels: Form labels linked to inputs
- Screen reader text: `.sr-only` for icon buttons
- Keyboard navigation: Form controls accessible
- Color contrast: WCAG AA compliant

## Error Handling

- Try-catch blocks: API calls wrapped
- Error states: User feedback on failures
- Validation: Form input validation
- RLS errors: Handled gracefully
- Network errors: Retry or error message
