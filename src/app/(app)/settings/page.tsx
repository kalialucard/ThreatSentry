
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import AnomalyReasoning from "@/components/settings/anomaly-reasoning";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // You can render a skeleton loader here if you want.
    return null;
  }
  
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
        <div>
            <h1 className="text-3xl font-headline font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your ThreatSentry AI configuration.</p>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>Anomaly Detection Engine</CardTitle>
          <CardDescription>
            Fine-tune the rules and models for detecting anomalies. Use the AI Reasoner for suggestions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AnomalyReasoning />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>LLM Summarization</CardTitle>
          <CardDescription>
            Configure the optional AI-powered incident summarization feature. 
            <span className="font-semibold text-destructive"> Note: Enabling this will send incident data to a third-party API.</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="llm-enabled" />
            <Label htmlFor="llm-enabled">Enable LLM Summarization</Label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="llm-api-key">LLM API Key</Label>
            <Input id="llm-api-key" type="password" placeholder="Enter your API key" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Client-Side Encryption</CardTitle>
          <CardDescription>
            Encrypt logs in your browser before they are sent to the server.
            <span className="font-semibold"> You will be responsible for managing your passphrase. If lost, data cannot be recovered.</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="encryption-enabled" />
            <Label htmlFor="encryption-enabled">Enable Client-Side Encryption</Label>
          </div>
          <Button variant="outline" disabled>Set Passphrase</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Channels</CardTitle>
          <CardDescription>
            Configure where to send alerts.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
                <Input id="slack-webhook" placeholder="https://hooks.slack.com/services/..." />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email-address">Alerting Email Address</Label>
                <Input id="email-address" type="email" placeholder="alerts@example.com" />
            </div>
            <Button>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
