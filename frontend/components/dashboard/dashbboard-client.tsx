'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import AddExpenseDialog from '@/components/expense/add-expense-dialog'
import ExpensesList from '@/components/expense/expenses-list'
import AnalyticsSection from '@/components/analytics/analytics-section'
import EditBudgetDialog from '@/components/budget/edit-budget-dialog'
import AISmartCoach from '@/components/ai/ai-smart-coach'
import InvestmentBot from '@/components/investment/investment-bot'
import { Edit2 } from 'lucide-react'

interface Expense {
  id: string
  description: string
  amount: number
  category: string
  date: string
}

export default function DashboardClient({ userName }: { userName: string }) {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [monthlyBudget, setMonthlyBudget] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchExpenses()
    fetchBudget()
  }, [])

  const fetchExpenses = () => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('expenses')
        const expenseList = stored ? JSON.parse(stored) : []
        setExpenses(expenseList.sort((a: Expense, b: Expense) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        ))
      }
    } catch (error) {
      console.error('Error fetching expenses:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchBudget = () => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('monthlyBudget')
        if (stored) {
          setMonthlyBudget(parseFloat(stored))
        }
      }
    } catch (error) {
      console.error('Error fetching budget:', error)
    }
  }

  const handleAddExpense = (expense: Omit<Expense, 'id'>) => {
    try {
      const newExpense: Expense = {
        ...expense,
        id: Date.now().toString(),
      }

      const updated = [newExpense, ...expenses]
      localStorage.setItem('expenses', JSON.stringify(updated))
      setExpenses(updated)
      setShowAddDialog(false)
    } catch (error) {
      console.error('Error adding expense:', error)
    }
  }

  const handleDeleteExpense = (id: string) => {
    try {
      const updated = expenses.filter(e => e.id !== id)
      localStorage.setItem('expenses', JSON.stringify(updated))
      setExpenses(updated)
    } catch (error) {
      console.error('Error deleting expense:', error)
    }
  }

  const handleEditExpense = (id: string, newAmount: number) => {
    try {
      const updated = expenses.map(e => 
        e.id === id ? { ...e, amount: newAmount } : e
      )
      localStorage.setItem('expenses', JSON.stringify(updated))
      setExpenses(updated)
    } catch (error) {
      console.error('Error editing expense:', error)
    }
  }

  const handleSaveBudget = (budget: number) => {
    try {
      localStorage.setItem('monthlyBudget', budget.toString())
      setMonthlyBudget(budget)
    } catch (error) {
      console.error('Error saving budget:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('userName')
    localStorage.removeItem('userSession')
    router.push('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="border-b border-blue-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SpendWise
            </h1>
            <p className="text-sm text-gray-600 mt-1">Welcome, {userName}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Action Bar */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Expense Tracker</h2>
            <p className="text-gray-600 mt-1">Manage and analyze your spending</p>
          </div>
          <AddExpenseDialog onAdd={handleAddExpense}>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Add Expense
            </Button>
          </AddExpenseDialog>
        </div>

        {/* Top Section - Budget Setting */}
        <div className="grid grid-cols-1 gap-8 mb-8">
          {/* Budget Setting Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Monthly Budget</h3>
              <EditBudgetDialog currentBudget={monthlyBudget} onSave={handleSaveBudget}>
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                  <Edit2 className="w-4 h-4" />
                  {monthlyBudget ? `₹${monthlyBudget.toFixed(0)}` : 'Set Budget'}
                </Button>
              </EditBudgetDialog>
            </div>
          </div>
        </div>

        {/* Analytics & Recent Expenses */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Analytics */}
          <div className="lg:col-span-2">
            <AnalyticsSection expenses={expenses} monthlyBudget={monthlyBudget} />
          </div>

          {/* Right Column - Recent Expenses */}
          <div>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Recent Expenses</CardTitle>
                <CardDescription>Your latest transactions</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-4">Loading...</div>
                ) : expenses.length === 0 ? (
                  <p className="text-gray-500 text-sm">No expenses yet. Add one to get started!</p>
                ) : (
                  <ExpensesList expenses={expenses.slice(0, 5)} onDelete={handleDeleteExpense} onEdit={handleEditExpense} />
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* SpendWise AI & Investment Bot Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* SpendWise AI */}
          <AISmartCoach expenses={expenses} monthlyBudget={monthlyBudget} />

          {/* Investment Bot */}
          <InvestmentBot />
        </div>
      </main>
    </div>
  )
}
