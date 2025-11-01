"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { summarizeIncidents } from "@/ai/flows/llm-summarize-incidents";
import type { Incident } from "@/lib/mock-data";

export default function LlmSummary({ incident }: { incident: Incident }) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSummarize = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

      // Even if the key is not present, we will proceed.
      // The genkit flow will use a mock if it can't authenticate.
      // This allows the feature to be demonstrated without a valid key.
      if (!apiKey) {
        console.warn("NEXT_PUBLIC_GEMINI_API_KEY not set. Using mock summary.");
        // This is a fallback mock summary.
        setSummary(`The incident involves a high-severity brute-force attack on the 'auth-svc-eu' service. A total of 142 failed login events were detected from IP address 198.51.100.12. The attack is currently ongoing. Immediate action is recommended to block the source IP and monitor the affected accounts.`);
      } else {
        const result = await summarizeIncidents({
          incidentDetails: incident.details,
        });
        setSummary(result.summary);
      }
    } catch (e) {
      setError("Failed to generate summary. Please check your API key and try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button onClick={handleSummarize} disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Sparkles className="mr-2 h-4 w-4" />
        )}
        Summarize with AI
      </Button>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {summary && !isLoading && (
        <Alert>
          <Sparkles className="h-4 w-4" />
          <AlertTitle className="font-headline">AI-Generated Summary</AlertTitle>
          <AlertDescription>
            <p className="leading-relaxed">{summary}</p>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
