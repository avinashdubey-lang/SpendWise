'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardClient from '@/components/dashboard/dashboard-client'

export default function DashboardPage() {
  const router = useRouter()
  const [userName, setUserName] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedName = localStorage.getItem('userName')
    
    if (!storedName) {
      router.push('/auth/login')
    } else {
      setUserName(storedName)
      setLoading(false)
    }
  }, [router])

  if (loading) {
    return null
  }

  return <DashboardClient userName={userName || ''} />
}
