'use client'

import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Expense {
  id: string
  description: string
  amount: number
  category: string
  date: string
}

export default function MonthlyChart({ expenses }: { expenses: Expense[] }) {
  const chartData = useMemo(() => {
    const months: { [key: string]: number } = {}

    expenses.forEach((expense) => {
      const date = new Date(expense.date)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

      months[monthKey] = (months[monthKey] || 0) + expense.amount
    })

    const sorted = Object.entries(months)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, value]) => ({
        month: new Date(`${month}-01`).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
        value: parseFloat(value.toFixed(2)),
      }))

    return sorted.slice(-12)
  }, [expenses])

  if (chartData.length === 0) {
    return (
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Monthly Trends</CardTitle>
          <CardDescription>No data available</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle>Monthly Trends</CardTitle>
        <CardDescription>Your spending over the last 12 months</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} contentStyle={{ borderRadius: '8px' }} />
              <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
