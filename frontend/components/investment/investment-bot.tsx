'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getInvestmentSuggestions, getInvestmentTips, getReturnEstimate } from '@/lib/investment-advisor'
import { TrendingUp } from 'lucide-react'

export default function InvestmentBot() {
  const [amount, setAmount] = useState<string>('')
  const [suggestions, setSuggestions] = useState<any>(null)
  const [tips, setTips] = useState<string[]>([])
  const [returns, setReturns] = useState<any>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleCalculate = () => {
    const investAmount = parseFloat(amount)
    if (investAmount > 0) {
      const breakdown = getInvestmentSuggestions(investAmount)
      const investmentTips = getInvestmentTips(investAmount, breakdown)
      const estimatedReturns = getReturnEstimate(breakdown)
      
      setSuggestions(breakdown)
      setTips(investmentTips)
      setReturns(estimatedReturns)
      setSubmitted(true)
    }
  }

  const handleReset = () => {
    setAmount('')
    setSuggestions(null)
    setTips([])
    setReturns(null)
    setSubmitted(false)
  }

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-teal-50">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
          <CardTitle className="text-lg">Investment Bot</CardTitle>
        </div>
        <CardDescription>Enter amount to get smart investment suggestions</CardDescription>
      </CardHeader>
      <CardContent>
        {!submitted ? (
          <div className="space-y-3">
            <Input
              type="number"
              placeholder="Enter amount to invest (₹)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              className="text-base"
            />
            <Button
              onClick={handleCalculate}
              disabled={!amount || parseFloat(amount) <= 0}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              Get Investment Plan
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Investment Breakdown */}
            <div className="bg-white rounded-lg p-3 border border-emerald-200 space-y-2">
              <h3 className="font-semibold text-gray-900 text-sm">Allocation Breakdown</h3>
              {suggestions && (
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Emergency Fund ({suggestions.emergencyFund.percentage}%)</span>
                    <span className="font-semibold">₹{suggestions.emergencyFund.amount.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SIP Mutual Funds ({suggestions.sipMutualFunds.percentage}%)</span>
                    <span className="font-semibold">₹{suggestions.sipMutualFunds.amount.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>PPF ({suggestions.ppf.percentage}%)</span>
                    <span className="font-semibold">₹{suggestions.ppf.amount.toFixed(0)}</span>
                  </div>
                  {suggestions.fixedDeposits.amount > 0 && (
                    <div className="flex justify-between">
                      <span>Fixed Deposits ({suggestions.fixedDeposits.percentage}%)</span>
                      <span className="font-semibold">₹{suggestions.fixedDeposits.amount.toFixed(0)}</span>
                    </div>
                  )}
                  {suggestions.gold.amount > 0 && (
                    <div className="flex justify-between">
                      <span>Gold ({suggestions.gold.percentage}%)</span>
                      <span className="font-semibold">₹{suggestions.gold.amount.toFixed(0)}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Return Estimate */}
            {returns && (
              <div className="bg-white rounded-lg p-3 border border-emerald-200 space-y-2">
                <h3 className="font-semibold text-gray-900 text-sm">Estimated Returns</h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-gray-600">After 1 Year</p>
                    <p className="font-bold text-emerald-700">₹{returns.year1.toFixed(0)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">After 3 Years</p>
                    <p className="font-bold text-emerald-700">₹{returns.year3.toFixed(0)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">After 5 Years</p>
                    <p className="font-bold text-emerald-700">₹{returns.year5.toFixed(0)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">After 10 Years</p>
                    <p className="font-bold text-emerald-700">₹{returns.year10.toFixed(0)}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Investment Tips */}
            {tips.length > 0 && (
              <div className="bg-white rounded-lg p-3 border border-emerald-200 space-y-2">
                <h3 className="font-semibold text-gray-900 text-sm">Investment Tips</h3>
                <ScrollArea className="h-32">
                  <div className="space-y-1 pr-3">
                    {tips.map((tip, idx) => (
                      <p key={idx} className="text-xs text-gray-700 leading-relaxed">
                        {tip}
                      </p>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}

            <Button
              onClick={handleReset}
              variant="outline"
              className="w-full bg-transparent"
            >
              Calculate Different Amount
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
