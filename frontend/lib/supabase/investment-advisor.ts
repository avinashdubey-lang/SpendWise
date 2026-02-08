export interface InvestmentBreakdown {
  emergencyFund: { amount: number; percentage: number }
  sipMutualFunds: { amount: number; percentage: number }
  ppf: { amount: number; percentage: number }
  fixedDeposits: { amount: number; percentage: number }
  gold: { amount: number; percentage: number }
}

export function getInvestmentSuggestions(amount: number): InvestmentBreakdown {
  if (amount <= 0) {
    return {
      emergencyFund: { amount: 0, percentage: 0 },
      sipMutualFunds: { amount: 0, percentage: 0 },
      ppf: { amount: 0, percentage: 0 },
      fixedDeposits: { amount: 0, percentage: 0 },
      gold: { amount: 0, percentage: 0 },
    }
  }

  let breakdown: InvestmentBreakdown

  if (amount < 10000) {
    // For small amounts - focus on accessible options
    breakdown = {
      emergencyFund: { amount: amount * 0.5, percentage: 50 },
      sipMutualFunds: { amount: amount * 0.3, percentage: 30 },
      ppf: { amount: amount * 0.2, percentage: 20 },
      fixedDeposits: { amount: 0, percentage: 0 },
      gold: { amount: 0, percentage: 0 },
    }
  } else if (amount < 50000) {
    // For moderate amounts - balanced portfolio
    breakdown = {
      emergencyFund: { amount: amount * 0.3, percentage: 30 },
      sipMutualFunds: { amount: amount * 0.35, percentage: 35 },
      ppf: { amount: amount * 0.2, percentage: 20 },
      fixedDeposits: { amount: amount * 0.1, percentage: 10 },
      gold: { amount: amount * 0.05, percentage: 5 },
    }
  } else {
    // For larger amounts - diversified portfolio
    breakdown = {
      emergencyFund: { amount: amount * 0.25, percentage: 25 },
      sipMutualFunds: { amount: amount * 0.4, percentage: 40 },
      ppf: { amount: amount * 0.15, percentage: 15 },
      fixedDeposits: { amount: amount * 0.12, percentage: 12 },
      gold: { amount: amount * 0.08, percentage: 8 },
    }
  }

  return breakdown
}

export function getInvestmentTips(amount: number, breakdown: InvestmentBreakdown): string[] {
  const tips: string[] = []

  if (amount < 10000) {
    tips.push('💡 Start with Emergency Fund: Build 3 months of expenses before investing.')
    tips.push('📈 SIP is Best: Start with ₹500/month SIP in Nifty 50 or Sensex ETF for long-term growth.')
    tips.push('🏛️ PPF Safety: Invest in PPF for guaranteed 7.1% returns and tax benefits.')
  } else if (amount < 50000) {
    tips.push('🎯 Emergency First: Ensure 6 months expenses in savings before aggressive investing.')
    tips.push('📊 SIP Strategy: Allocate 35% to SIP mutual funds - best for 5+ year returns (12% avg).')
    tips.push('🏦 FD Security: 10% in FDs gives you liquid funds at 6-7% returns.')
    tips.push('✨ Gold Hedge: 5% in Gold ETF protects against inflation.')
  } else {
    tips.push('🏦 Multi-Asset Diversification: Spread investments across 5 asset classes for risk management.')
    tips.push('📈 40% SIP Focus: Largest allocation to SIP mutual funds for wealth creation.')
    tips.push('💰 PPF + FD Balance: 15% PPF (tax-free) + 12% FD (safety) = stable returns.')
    tips.push('🪙 Gold Allocation: 8% in Gold ETF/Sovereign Gold Bonds for inflation protection.')
    tips.push('🎓 Review Quarterly: Rebalance portfolio every 3 months for optimal growth.')
  }

  return tips
}

export function getReturnEstimate(breakdown: InvestmentBreakdown): {
  year1: number
  year3: number
  year5: number
  year10: number
} {
  // Estimated annual returns by category
  const returns = {
    emergencyFund: 0.04, // 4% (savings account)
    sipMutualFunds: 0.12, // 12% average
    ppf: 0.071, // 7.1%
    fixedDeposits: 0.065, // 6.5%
    gold: 0.05, // 5% average
  }

  const totalInvested =
    breakdown.emergencyFund.amount +
    breakdown.sipMutualFunds.amount +
    breakdown.ppf.amount +
    breakdown.fixedDeposits.amount +
    breakdown.gold.amount

  const annualReturn =
    breakdown.emergencyFund.amount * returns.emergencyFund +
    breakdown.sipMutualFunds.amount * returns.sipMutualFunds +
    breakdown.ppf.amount * returns.ppf +
    breakdown.fixedDeposits.amount * returns.fixedDeposits +
    breakdown.gold.amount * returns.gold

  const avgReturnRate = totalInvested > 0 ? annualReturn / totalInvested : 0

  return {
    year1: totalInvested * Math.pow(1 + avgReturnRate, 1),
    year3: totalInvested * Math.pow(1 + avgReturnRate, 3),
    year5: totalInvested * Math.pow(1 + avgReturnRate, 5),
    year10: totalInvested * Math.pow(1 + avgReturnRate, 10),
  }
}
  
