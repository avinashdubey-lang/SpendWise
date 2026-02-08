'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold text-red-600">Authentication Error</CardTitle>
          <CardDescription>Something went wrong during authentication</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            There was an issue processing your authentication request. Please try again.
          </p>
          <Link href="/auth/login">
            <Button className="w-full">Back to Login</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
