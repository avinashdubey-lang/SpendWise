interface Expense {
  id: string
  description: string
  amount: number
  category: string
  date: string
}

interface SpendingAnalysis {
  categoryBreakdown: { [key: string]: number }
  categoryPercentages: { [key: string]: number }
  totalSpending: number
  averageTransaction: number
  highestCategory: string
  highestCategoryAmount: number
  spikesDetected: string[]
  trends: string[]
}

const NON_ESSENTIAL_CATEGORIES = ['Entertainment', 'Dining Out', 'Shopping', 'Hobbies']
const ESSENTIAL_CATEGORIES = ['Groceries', 'Transportation', 'Utilities', 'Healthcare']

export function analyzeSpending(expenses: Expense[]): SpendingAnalysis {
  if (expenses.length === 0) {
    return {
      categoryBreakdown: {},
      categoryPercentages: {},
      totalSpending: 0,
      averageTransaction: 0,
      highestCategory: '',
      highestCategoryAmount: 0,
      spikesDetected: [],
      trends: [],
    }
  }

  // Calculate category breakdown
  const categoryBreakdown: { [key: string]: number } = {}
  expenses.forEach((expense) => {
    categoryBreakdown[expense.category] = (categoryBreakdown[expense.category] || 0) + expense.amount
  })

  const totalSpending = Object.values(categoryBreakdown).reduce((sum, val) => sum + val, 0)
  const averageTransaction = totalSpending / expenses.length

  // Calculate percentages
  const categoryPercentages: { [key: string]: number } = {}
  Object.keys(categoryBreakdown).forEach((category) => {
    categoryPercentages[category] = Math.round((categoryBreakdown[category] / totalSpending) * 100)
  })

  // Find highest category
  const highestCategory = Object.entries(categoryBreakdown).sort(([, a], [, b]) => b - a)[0]

  // Detect spikes (transactions > 2x average)
  const spikesDetected: string[] = []
  expenses.forEach((expense) => {
    if (expense.amount > averageTransaction * 2) {
      spikesDetected.push(`${expense.category}: ₹${expense.amount.toFixed(0)}`)
    }
  })

  // Detect trends
  const trends: string[] = []
  const lastWeekExpenses = expenses.filter((e) => {
    const expenseDate = new Date(e.date)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return expenseDate >= weekAgo
  })

  if (lastWeekExpenses.length > 0) {
    const lastWeekTotal = lastWeekExpenses.reduce((sum, e) => sum + e.amount, 0)
    const lastWeekAverage = lastWeekTotal / 7

    if (lastWeekAverage > averageTransaction) {
      trends.push('increasing')
    }
  }

  return {
    categoryBreakdown,
    categoryPercentages,
    totalSpending,
    averageTransaction,
    highestCategory: highestCategory[0],
    highestCategoryAmount: highestCategory[1],
    spikesDetected,
    trends,
  }
}

export function generateAISuggestions(analysis: SpendingAnalysis, monthlyBudget?: number | null): string[] {
  const suggestions: string[] = []

  if (analysis.totalSpending === 0) {
    return ['💡 Start tracking your expenses to get personalized suggestions!']
  }

  // Check if today is the last day of the month
  const today = new Date()
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)
  const isLastDayOfMonth = today.getMonth() !== tomorrow.getMonth()

  // If it's the last day of month and user has budget, show investment message
  if (isLastDayOfMonth && monthlyBudget) {
    const thisMonthExpenses = 0 // This will be calculated from the expenses passed to the component
    // We'll pass the last day message as the first suggestion if applicable
  }

  // Suggestion 1: Budget-based with solutions
  if (monthlyBudget && analysis.totalSpending > monthlyBudget * 0.8) {
    const percentUsed = Math.round((analysis.totalSpending / monthlyBudget) * 100)
    const overspend = analysis.totalSpending - monthlyBudget
    suggestions.push(
      `⚠️ Budget Alert: You've used ${percentUsed}% of your ₹${monthlyBudget.toFixed(0)} budget (₹${overspend.toFixed(0)} over). Solution: Reduce non-essential spending on ${analysis.highestCategory} or defer discretionary purchases.`
    )
  }

  // Suggestion 2: Non-essential spending with solutions
  const nonEssentialSpending = Object.entries(analysis.categoryBreakdown)
    .filter(([cat]) => NON_ESSENTIAL_CATEGORIES.includes(cat))
    .reduce((sum, [, amount]) => sum + amount, 0)

  const nonEssentialPercent = Math.round((nonEssentialSpending / analysis.totalSpending) * 100)
  if (nonEssentialPercent > 30) {
    const savingsPotential = Math.round(nonEssentialSpending * 0.25)
    suggestions.push(
      `💡 High Non-Essential Spending: ${nonEssentialPercent}% goes to non-essentials. Solution: Implement the 25% rule - cut back on ${analysis.highestCategory} by 25% to save ₹${savingsPotential} monthly.`
    )
  }

  // Suggestion 3: Spike detection with solutions
  if (analysis.spikesDetected.length > 0) {
    const spike = analysis.spikesDetected[0]
    suggestions.push(
      `📊 Unusual Spike Detected: ${spike}. Solution: Review this transaction - was it necessary? Plan similar purchases in advance next time to negotiate better prices.`
    )
  }

  // Suggestion 4: Category-specific advice with solutions
  if (analysis.categoryPercentages['Dining Out'] && analysis.categoryPercentages['Dining Out'] > 25) {
    const diningAmount = analysis.categoryBreakdown['Dining Out']
    const mealPrepSavings = Math.round(diningAmount * 0.4)
    suggestions.push(
      `🍔 High Dining Out Expenses: ₹${diningAmount.toFixed(0)}/month. Solution: Prepare 70% of meals at home and dine out once weekly. Potential savings: ₹${mealPrepSavings}/month.`
    )
  }

  if (analysis.categoryPercentages['Shopping'] && analysis.categoryPercentages['Shopping'] > 20) {
    const shoppingAmount = analysis.categoryBreakdown['Shopping']
    suggestions.push(
      `🛍️ High Shopping Spending: ₹${shoppingAmount.toFixed(0)}/month. Solution: Implement a 48-hour rule - wait 2 days before non-essential purchases. Unsubscribe from promotional emails.`
    )
  }

  if (analysis.categoryPercentages['Entertainment'] && analysis.categoryPercentages['Entertainment'] > 15) {
    const entertainmentAmount = analysis.categoryBreakdown['Entertainment']
    const savingsTarget = Math.round(entertainmentAmount * 0.3)
    suggestions.push(
      `🎬 Entertainment Spending: ₹${entertainmentAmount.toFixed(0)}/month. Solution: Choose free/low-cost activities. Save ₹${savingsTarget}/month by cutting non-essential subscriptions.`
    )
  }

  // Suggestion 5: Investment tips if under budget
  const essentialSpending = Object.entries(analysis.categoryBreakdown)
    .filter(([cat]) => ESSENTIAL_CATEGORIES.includes(cat))
    .reduce((sum, [, amount]) => sum + amount, 0)

  if (monthlyBudget && analysis.totalSpending < monthlyBudget * 0.7 && essentialSpending > 0) {
    const surplus = monthlyBudget - analysis.totalSpending
    const investmentAmount = Math.round(surplus * 0.5)
    suggestions.push(
      `💰 Under Budget! You have ₹${surplus.toFixed(0)} surplus. Investment Tip: Invest 50% (₹${investmentAmount}) in: PPF (7.1% returns), Gold ETF, or Emergency Fund - build 6 months of expenses first!`
    )
  }

  // Suggestion 6: General investment tip for healthy spenders
  if (analysis.averageTransaction < 500 && nonEssentialPercent < 25 && !monthlyBudget) {
    const monthlyTarget = Math.round(analysis.totalSpending * 0.1)
    suggestions.push(
      `📈 Excellent Spending Discipline! Invest ₹${monthlyTarget}/month (10% of spending) in: SIP mutual funds (12% avg returns), Treasury bills, or cryptocurrency (5% allocation).`
    )
  }

  // Ensure at least one suggestion
  if (suggestions.length === 0) {
    suggestions.push('📈 Your spending looks balanced. Keep monitoring your categories. Consider investing 10% of surplus income for wealth growth.')
  }

  return suggestions.slice(0, 3) // Return top 3 suggestions
    }
