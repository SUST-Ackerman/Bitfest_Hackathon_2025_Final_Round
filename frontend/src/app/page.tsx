import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, MessageSquare, FileText, Search } from 'lucide-react'

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Banglish to Bangla Conversion</h1>
        <p className="text-xl mb-6">Seamlessly convert Banglish to Bangla and enhance your communication</p>
        <Button size="lg">
          Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Chatbot Assistance</CardTitle>
            <CardDescription>Get help with Banglish to Bangla conversion</CardDescription>
          </CardHeader>
          <CardContent>
            <MessageSquare className="h-12 w-12 mb-4" />
            <p>Our AI-powered chatbot can assist you with translations and answer your queries in Bangla.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Content Management</CardTitle>
            <CardDescription>Create and manage your Bangla content</CardDescription>
          </CardHeader>
          <CardContent>
            <FileText className="h-12 w-12 mb-4" />
            <p>Write in Banglish, convert to Bangla, and export your content as PDF with AI-generated titles.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Advanced Search</CardTitle>
            <CardDescription>Find content in Banglish or Bangla</CardDescription>
          </CardHeader>
          <CardContent>
            <Search className="h-12 w-12 mb-4" />
            <p>Easily search through user profiles and public PDFs using either Banglish or Bangla.</p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

