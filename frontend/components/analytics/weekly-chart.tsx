'use client'

import { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Expense {
  id: string
  description: string
  amount: number
  category: string
  date: string
}

export default function WeeklyChart({ expenses }: { expenses: Expense[] }) {
  const chartData = useMemo(() => {
    const days: { [key: string]: number } = {}

    const today = new Date()
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateKey = date.toISOString().split('T')[0]
      days[dateKey] = 0
    }

    expenses.forEach((expense) => {
      const dateKey = expense.date
      if (dateKey in days) {
        days[dateKey] += expense.amount
      }
    })

    return Object.entries(days).map(([date, value]) => ({
      day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      value: parseFloat(value.toFixed(2)),
    }))
  }, [expenses])

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle>Weekly Activity</CardTitle>
        <CardDescription>Last 7 days of spending</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} contentStyle={{ borderRadius: '8px' }} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ fill: '#8b5cf6' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
