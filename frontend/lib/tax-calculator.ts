export interface TaxBreakdown {
  [category: string]: {
    amount: number
    taxRate: number
    tax: number
  }
}

export interface TaxSummary {
  breakdown: TaxBreakdown
  totalTax: number
  grandTotal: number
}

const TAX_RATES: { [key: string]: number } = {
  'Food': 0.05,
  'Groceries': 0.05,
  'Transportation': 0.05,
  'Shopping': 0.12,
  'Health & Fitness': 0.12,
  'Travel': 0.12,
  'Education': 0.0,
  'Utilities': 0.18,
  'Entertainment': 0.18,
  'Dining Out': 0.18,
  'Hobbies': 0.18,
  'Other': 0.18,
}

export function calculateTaxes(categoryBreakdown: { [key: string]: number }, totalAmount: number): TaxSummary {
  const breakdown: TaxBreakdown = {}
  let totalTax = 0

  Object.entries(categoryBreakdown).forEach(([category, totalAmountIncludingTax]) => {
    const taxRate = TAX_RATES[category] || 0.18
    
    // Calculate tax amount included in the total
    // If tax rate is R%, then: totalAmount = baseAmount * (1 + R/100)
    // So: taxAmount = totalAmount - (totalAmount / (1 + R/100))
    const baseAmount = totalAmountIncludingTax / (1 + taxRate)
    const tax = totalAmountIncludingTax - baseAmount

    totalTax += tax

    breakdown[category] = {
      amount: baseAmount,
      taxRate: taxRate * 100,
      tax,
    }
  })

  return {
    breakdown,
    totalTax,
    grandTotal: totalAmount,
  }
}
