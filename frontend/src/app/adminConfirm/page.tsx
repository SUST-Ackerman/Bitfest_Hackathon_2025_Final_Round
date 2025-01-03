"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, XCircle, ChevronLeft, ChevronRight } from 'lucide-react'

interface Contribution {
  id: number
  banglishText: string
  banglaText: string
  status: 'pending' | 'approved' | 'rejected'
}

// Mock data for demonstration
const initialContributions: Contribution[] = [
  { id: 1, banglishText: "Amar nam John", banglaText: "মির্জা ফখরুল বলেন, ‘যারা রাজনীতি করছি, আমাদের ব্যর্থতা ৫৩ বছরেও বাংলাদেশকে একটা সুখী, শান্তিময়, প্রেমময় দেশ গড়তে পারলাম না। আমরা রাজনীতি নিয়ে সংকীর্ণতায় ভুগি এবং নৈতিকতার সর্বনিম্ন পর্যায়ে চলে গেছি। আমরা যে গর্বিত জাতি, কিছুদিন আগেও সেটা বলতে পারিনি। এখন আবার সেই আশা জেগে উঠেছে, আমরা একটা স্বপ্ন দেখতে শুরু করেছি। সত্যিকার অর্থে স্বাধীনতার ঘোষক জিয়াউর রহমান যে স্বপ্ন দেখেছিলেন সুখী, সুন্দর, প্রেমময়, গণতান্ত্রিক সমৃদ্ধ বাংলাদেশ নির্মাণ করবার, আমরা সেই চেষ্টা করছি। আমাদের গণতান্ত্রিক যুদ্ধ শেষ হয়েছে। কিন্তু ঐক্যের সাথে দেশটাকে নির্মাণ করার যে পথরেখা দেখাবে, এই জায়গায় আমাদের এখনো ব্যর্থতা আছে।’", status: 'pending' },
  { id: 2, banglishText: "Ami valo achi", banglaText: "আমি ভালো আছি", status: 'pending' },
  { id: 3, banglishText: "Tumi kemon acho", banglaText: "তুমি কেমন আছো", status: 'pending' },
]

export default function AdminReviewPage() {
  const [contributions, setContributions] = useState<Contribution[]>(initialContributions)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const currentContribution = contributions[currentIndex]

  const handleApprove = () => {
    setContributions(prevContributions => 
      prevContributions.map((c, index) => 
        index === currentIndex ? { ...c, status: 'approved' } : c
      )
    )
    setMessage({ type: 'success', text: 'Contribution approved.' })
    moveToNext()
  }

  const handleReject = () => {
    setContributions(prevContributions => 
      prevContributions.map((c, index) => 
        index === currentIndex ? { ...c, status: 'rejected' } : c
      )
    )
    setMessage({ type: 'success', text: 'Contribution rejected.' })
    moveToNext()
  }

  const moveToNext = () => {
    if (currentIndex < contributions.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1)
    } else {
      setMessage({ type: 'error', text: 'No more contributions to review.' })
    }
  }

  const moveToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1)
    } else {
      setMessage({ type: 'error', text: 'This is the first contribution.' })
    }
  }

  const handleTextChange = (field: 'banglishText' | 'banglaText', value: string) => {
    setContributions(prevContributions => 
      prevContributions.map((c, index) => 
        index === currentIndex ? { ...c, [field]: value } : c
      )
    )
  }

  if (!currentContribution) {
    return <div>No contributions to review.</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Review: Banglish to Bangla Contributions</h1>
      {message && (
        <Alert variant={message.type === 'success' ? 'default' : 'destructive'} className="mb-4">
          <AlertTitle>{message.type === 'success' ? 'Success' : 'Error'}</AlertTitle>
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}
      <div className="flex justify-between items-start space-x-4">
        <Card className="w-1/2">
          <CardHeader>
            <CardTitle>Banglish</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea 
              value={currentContribution.banglishText} 
              onChange={(e) => handleTextChange('banglishText', e.target.value)}
              rows={4}
            />
          </CardContent>
        </Card>
        <Card className="w-1/2">
          <CardHeader>
            <CardTitle>Bangla</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea 
              value={currentContribution.banglaText} 
              onChange={(e) => handleTextChange('banglaText', e.target.value)}
              rows={4}
            />
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button onClick={moveToPrevious} variant="outline">
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <div className="space-x-2">
          <Button onClick={handleApprove} variant="default">
            <CheckCircle2 className="mr-2 h-4 w-4" /> Approve
          </Button>
          <Button onClick={handleReject} variant="destructive">
            <XCircle className="mr-2 h-4 w-4" /> Reject
          </Button>
        </div>
        <Button onClick={moveToNext} variant="outline">
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

