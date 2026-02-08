'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { analyzeSpending, generateAISuggestions } from '@/lib/spending-analyzer'
import { MessageCircle, RefreshCw } from 'lucide-react'

interface Expense {
  id: string
  description: string
  amount: number
  category: string
  date: string
}

interface Message {
  id: string
  text: string
  timestamp: Date
}

export default function AISmartCoach({ expenses, monthlyBudget }: { expenses: Expense[]; monthlyBudget?: number | null }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    generateCoachMessages()
  }, [expenses, monthlyBudget])

  const generateCoachMessages = () => {
    setLoading(true)
    try {
      const analysis = analyzeSpending(expenses)
      const suggestions = generateAISuggestions(analysis, monthlyBudget)

      const newMessages: Message[] = suggestions.map((suggestion, index) => ({
        id: `msg-${Date.now()}-${index}`,
        text: suggestion,
        timestamp: new Date(),
      }))

      setMessages(newMessages)
    } catch (error) {
      console.error('Error generating coach messages:', error)
      setMessages([
        {
          id: 'error',
          text: '💭 Unable to analyze spending right now. Try again later.',
          timestamp: new Date(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    generateCoachMessages()
  }

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-orange-600" />
          <CardTitle className="text-lg">SpendWise AI</CardTitle>
        </div>
        <CardDescription>AI-powered spending insights</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-6">
            <div className="text-sm text-gray-500">Analyzing your spending...</div>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-6">
            <div className="text-sm text-gray-500">No insights available yet.</div>
          </div>
        ) : (
          <ScrollArea className="h-64 pr-4">
            <div className="space-y-3">
              {messages.map((message) => (
                <div key={message.id} className="bg-white rounded-lg p-4 shadow-sm border border-orange-100">
                  <p className="text-base text-gray-800 leading-relaxed font-medium">{message.text}</p>
                  <p className="text-xs text-gray-400 mt-2">{message.timestamp.toLocaleTimeString()}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
