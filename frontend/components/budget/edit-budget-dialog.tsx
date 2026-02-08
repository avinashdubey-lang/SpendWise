'use client'

import React from "react"

import { useState, ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface EditBudgetDialogProps {
  currentBudget: number | null
  onSave: (budget: number) => void
  children: ReactNode
}

export default function EditBudgetDialog({
  currentBudget,
  onSave,
  children,
}: EditBudgetDialogProps) {
  const [open, setOpen] = useState(false)
  const [budget, setBudget] = useState(currentBudget?.toString() || '')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!budget || isNaN(parseFloat(budget))) return

    setLoading(true)
    try {
      onSave(parseFloat(budget))
      setOpen(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Set Monthly Budget</DialogTitle>
          <DialogDescription>
            Set your monthly budget limit to track your spending
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Monthly Budget (₹)</label>
            <Input
              type="number"
              placeholder="e.g., 50000"
              step="100"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Saving...' : 'Save Budget'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
