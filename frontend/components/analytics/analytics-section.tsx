'use client'

import { useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { calculateTaxes } from '@/lib/tax-calculator'
import MonthlyChart from './monthly-chart'
import WeeklyChart from './weekly-chart'
import CategoryChart from './category-chart'

interface Expense {
  id: string
  description: string
  amount: number
  category: string
  date: string
}

export default function AnalyticsSection({ expenses, monthlyBudget }: { expenses: Expense[]; monthlyBudget?: number | null }) {
  const stats = useMemo(() => {
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()

    const thisMonth = expenses.filter((e) => {
      const date = new Date(e.date)
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear
    })

    const totalThisMonth = thisMonth.reduce((sum, e) => sum + e.amount, 0)
    const avgThisMonth = thisMonth.length > 0 ? totalThisMonth / thisMonth.length : 0

    // Calculate category breakdown for this month
    const categoryBreakdown: { [key: string]: number } = {}
    thisMonth.forEach((e) => {
      categoryBreakdown[e.category] = (categoryBreakdown[e.category] || 0) + e.amount
    })

    const taxSummary = calculateTaxes(categoryBreakdown, totalThisMonth)

    return {
      totalThisMonth,
      avgThisMonth,
      count: thisMonth.length,
      categoryBreakdown,
      taxSummary,
    }
  }, [expenses])

  const budgetPercentage = monthlyBudget ? Math.min((stats.totalThisMonth / monthlyBudget) * 100, 100) : 0

  return (
    <div className="space-y-6">
      {/* Budget Progress */}
      {monthlyBudget && (
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Monthly Budget Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Spent this month: ₹{stats.totalThisMonth.toFixed(2)}</span>
              <span className="text-gray-600">Budget: ₹{monthlyBudget.toFixed(2)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  budgetPercentage > 100
                    ? 'bg-red-500'
                    : budgetPercentage > 80
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
              />
            </div>
            <div className="text-sm text-center">
              <span
                className={
                  budgetPercentage > 100
                    ? 'text-red-600 font-semibold'
                    : budgetPercentage > 80
                      ? 'text-yellow-600 font-semibold'
                      : 'text-green-600 font-semibold'
                }
              >
                {budgetPercentage > 100
                  ? `Over budget by ₹${(stats.totalThisMonth - monthlyBudget).toFixed(2)}`
                  : `₹${(monthlyBudget - stats.totalThisMonth).toFixed(2)} remaining`}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardHeader className="pb-2">
            <CardDescription className="text-purple-100">Average Expense</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{stats.avgThisMonth.toFixed(2)}</div>
            <p className="text-purple-100 text-sm mt-1">Per transaction</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader className="pb-2">
            <CardDescription className="text-blue-100">Total Amount Paid</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{stats.taxSummary.grandTotal.toFixed(2)}</div>
            <p className="text-blue-100 text-sm mt-1">{stats.count} transactions</p>
          </CardContent>
        </Card>
      </div>

      {/* Tax Breakdown Card */}
      {stats.count > 0 && (
        <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-yellow-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Tax Breakdown by Category</CardTitle>
            <CardDescription>Base amount, tax included, and GST breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {Object.entries(stats.taxSummary.breakdown).map(([category, data]) => (
                <div key={category} className="flex flex-col p-3 bg-white rounded-lg border border-yellow-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-900">{category}</p>
                    <p className="text-xs font-medium text-amber-600">{data.taxRate.toFixed(0)}% GST</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-blue-50 p-2 rounded">
                      <p className="text-gray-600">Base Amount</p>
                      <p className="font-bold text-gray-900">₹{data.amount.toFixed(2)}</p>
                    </div>
                    <div className="bg-yellow-50 p-2 rounded">
                      <p className="text-gray-600">Tax (GST)</p>
                      <p className="font-bold text-amber-700">₹{data.tax.toFixed(2)}</p>
                    </div>
                    <div className="bg-green-50 p-2 rounded">
                      <p className="text-gray-600">Total Paid</p>
                      <p className="font-bold text-green-700">₹{(data.amount + data.tax).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-yellow-200 pt-3 mt-3">
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-blue-100 p-3 rounded-lg text-center">
                  <p className="text-xs text-gray-600 mb-1">Total Base Amount</p>
                  <p className="text-lg font-bold text-gray-900">
                    ₹{Object.values(stats.taxSummary.breakdown).reduce((sum, d) => sum + d.amount, 0).toFixed(2)}
                  </p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-lg text-center">
                  <p className="text-xs text-gray-600 mb-1">Total GST</p>
                  <p className="text-lg font-bold text-amber-700">₹{stats.taxSummary.totalTax.toFixed(2)}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg text-center">
                  <p className="text-xs text-gray-600 mb-1">Total Amount Paid</p>
                  <p className="text-lg font-bold text-green-700">₹{stats.taxSummary.grandTotal.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6">
        <CategoryChart expenses={expenses} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyChart expenses={expenses} />
        <WeeklyChart expenses={expenses} />
      </div>
    </div>
  )
}
