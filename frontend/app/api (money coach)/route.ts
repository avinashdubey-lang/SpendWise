import { streamText } from 'ai'
import { z } from 'zod'

interface Expense {
  id: string
  description: string
  amount: number
  category: string
  date: string
}

export async function POST(request: Request) {
  try {
    const { messages, expenses } = await request.json()

    // Process expenses for context
    const totalSpent = expenses.reduce((sum: number, e: Expense) => sum + e.amount, 0)
    const categoryBreakdown: { [key: string]: number } = {}
    const monthlySpending: { [key: string]: number } = {}

    expenses.forEach((expense: Expense) => {
      categoryBreakdown[expense.category] = (categoryBreakdown[expense.category] || 0) + expense.amount

      const monthKey = new Date(expense.date).toISOString().split('T')[0].substring(0, 7)
      monthlySpending[monthKey] = (monthlySpending[monthKey] || 0) + expense.amount
    })

    const systemPrompt = `You are a friendly and knowledgeable AI Money Coach helping young adults make smart financial decisions. 
    
Your role is to:
- Analyze spending patterns and provide actionable insights
- Suggest practical budgeting strategies
- Encourage healthy financial habits
- Help users understand their spending categories
- Offer specific, actionable tips for saving money
- Be supportive and non-judgmental about spending

Current Financial Overview:
- Total Spent: $${totalSpent.toFixed(2)}
- Category Breakdown: ${JSON.stringify(categoryBreakdown, null, 2)}
- Monthly Spending: ${JSON.stringify(monthlySpending, null, 2)}

Be conversational, encouraging, and specific in your recommendations based on the user's actual spending data.`

    const result = streamText({
      model: 'openai/gpt-4o-mini',
      system: systemPrompt,
      messages: messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
    })

    return result.toTextStreamResponse()
  } catch (error) {
    console.error('Error:', error)
    return new Response('Error processing request', { status: 500 })
  }
}
