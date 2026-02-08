'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash2, Edit2, Check, X } from 'lucide-react'

interface Expense {
  id: string
  description: string
  amount: number
  category: string
  date: string
}

interface ExpensesListProps {
  expenses: Expense[]
  onDelete: (id: string) => void
  onEdit?: (id: string, newAmount: number) => void
}

const CATEGORY_COLORS: { [key: string]: string } = {
  'Food & Dining': 'bg-orange-100 text-orange-800',
  'Transportation': 'bg-blue-100 text-blue-800',
  'Entertainment': 'bg-purple-100 text-purple-800',
  'Shopping': 'bg-pink-100 text-pink-800',
  'Health & Fitness': 'bg-green-100 text-green-800',
  'Utilities': 'bg-yellow-100 text-yellow-800',
  'Travel': 'bg-indigo-100 text-indigo-800',
  'Education': 'bg-cyan-100 text-cyan-800',
  'Other': 'bg-gray-100 text-gray-800',
}

export default function ExpensesList({ expenses, onDelete, onEdit }: ExpensesListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editAmount, setEditAmount] = useState<string>('')

  const handleEditClick = (expense: Expense) => {
    setEditingId(expense.id)
    setEditAmount(expense.amount.toString())
  }

  const handleSaveEdit = (id: string) => {
    const newAmount = parseFloat(editAmount)
    if (!isNaN(newAmount) && newAmount > 0 && onEdit) {
      onEdit(id, newAmount)
      setEditingId(null)
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditAmount('')
  }

  return (
    <div className="space-y-3">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2 py-1 rounded text-xs font-semibold ${CATEGORY_COLORS[expense.category] || CATEGORY_COLORS['Other']}`}>
                {expense.category}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-900">{expense.description}</p>
            <p className="text-xs text-gray-500">
              {new Date(expense.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {editingId === expense.id ? (
              <div className="flex items-center gap-1">
                <div className="flex items-center">
                  <span className="text-gray-900 font-bold">₹</span>
                  <Input
                    type="number"
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                    className="w-20 h-8 text-sm"
                    step="0.01"
                    min="0"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSaveEdit(expense.id)}
                  className="text-green-600 hover:text-green-700 hover:bg-green-50 p-1 h-8 w-8"
                >
                  <Check className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancelEdit}
                  className="text-gray-500 hover:text-gray-700 hover:bg-gray-200 p-1 h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <>
                <span className="font-bold text-gray-900 min-w-fit">₹{expense.amount.toFixed(2)}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditClick(expense)}
                  className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(expense.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
