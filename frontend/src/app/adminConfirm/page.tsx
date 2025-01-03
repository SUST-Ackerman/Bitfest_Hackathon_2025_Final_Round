"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, XCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { useTrainingData } from "@/features/train-data/hooks/use-training-data"
import { apiClient } from "@/lib/clients/api-client"

export default function AdminReviewPage() {
  const { data: trainingData, isLoading, isError } = useTrainingData()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [contributions, setContributions] = useState(trainingData || [])
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  useEffect(() => {
    if (trainingData) {
      setContributions(trainingData)
    }
  }, [trainingData])

  const currentContribution = contributions[currentIndex]

  const handleApprove = async () => {
    const res = await apiClient('api/chatbot/training-data/' + currentContribution.id + '/', {
        method: 'PATCH',
        body: JSON.stringify({
            approved: true,
            rejected: false,
        })
    });
    if (!res) {
        setMessage({ type: "error", text: "Error approving contribution." })
        return
    }
    updateStatus("approved")
    setMessage({ type: "success", text: "Contribution approved." })
    moveToNext()
  }

  const handleReject = async () => {
    const res = await apiClient('api/chatbot/training-data/' + currentContribution.id + '/', {
        method: 'PATCH',
        body: JSON.stringify({
            approved: false,
            rejected: true,
        })
    });
    if (!res) {
        setMessage({ type: "error", text: "Error rejecting contribution." })
        return
    }
    updateStatus("rejected")
    setMessage({ type: "success", text: "Contribution rejected." })
    moveToNext()
  }

  const updateStatus = (status: "approved" | "rejected") => {
    setContributions((prevContributions) =>
      prevContributions.map((c, index) =>
        index === currentIndex
          ? { ...c, approved: status === "approved", rejected: status === "rejected" }
          : c
      )
    )
  }

  const moveToNext = () => {
    if (currentIndex < contributions.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1)
    } else {
      setMessage({ type: "error", text: "No more contributions to review." })
    }
  }

  const moveToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1)
    } else {
      setMessage({ type: "error", text: "This is the first contribution." })
    }
  }

  const handleTextChange = (field: "banglish" | "bangla", value: string) => {
    setContributions((prevContributions) =>
      prevContributions.map((c, index) =>
        index === currentIndex ? { ...c, [field]: value } : c
      )
    )
  }

  if (isLoading) {
    return <div>Loading contributions...</div>
  }

  if (isError || !currentContribution) {
    return <div>Error loading contributions or no contributions available.</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Review: Banglish to Bangla Contributions</h1>
      {message && (
        <Alert variant={message.type === "success" ? "default" : "destructive"} className="mb-4">
          <AlertTitle>{message.type === "success" ? "Success" : "Error"}</AlertTitle>
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
              value={currentContribution.banglish}
              onChange={(e) => handleTextChange("banglish", e.target.value)}
              rows={15}
            />
          </CardContent>
        </Card>
        <Card className="w-1/2">
          <CardHeader>
            <CardTitle>Bangla</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={currentContribution.bangla}
              onChange={(e) => handleTextChange("bangla", e.target.value)}
              rows={15}
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
