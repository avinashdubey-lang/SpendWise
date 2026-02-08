'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    // Check if user has a session stored in localStorage
    const userName = typeof window !== 'undefined' ? localStorage.getItem('userName') : null

    if (userName) {
      router.push('/dashboard')
    } else {
      router.push('/auth/login')
    }
  }, [router])

  return null
}
