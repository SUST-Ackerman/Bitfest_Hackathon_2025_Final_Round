"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";

export default function ContributePage() {
  const [banglishText, setBanglishText] = useState("");
  const [banglaText, setBanglaText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log("Form submission started");
    console.log("Banglish Text:", banglishText);
    console.log("Bangla Text:", banglaText);

    // Simulating an API call with a timeout
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Form submission completed");

    // Reset form and show success message
    setBanglishText("");
    setBanglaText("");
    setIsSubmitting(false);
    setSuccessMessage(
      "Thank you for your contribution. It will be reviewed by an admin."
    );

    console.log("Success message set:", successMessage);

    // Clear success message after 5 seconds
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Contribute to Translation Improvement</CardTitle>
        <CardDescription>
          Help us improve our Banglish to Bangla translation by providing examples. Your contribution will be reviewed by an admin before being added to our training data.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {successMessage && (
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="banglish">Banglish Text</Label>
            <Textarea
              id="banglish"
              placeholder="Enter Banglish text here"
              value={banglishText}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setBanglishText(e.target.value)
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bangla">Bangla Translation</Label>
            <Textarea
              id="bangla"
              placeholder="Enter corresponding Bangla text here"
              value={banglaText}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setBanglaText(e.target.value)
              }
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
            {isSubmitting ? "Submitting..." : "Submit Contribution"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
