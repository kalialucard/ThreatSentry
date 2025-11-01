
"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Wand2, Loader2, Bot, User } from "lucide-react";
import { anomalyDetectionReasoning } from "@/ai/flows/anomaly-detection-reasoning";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Card } from "../ui/card";

type Message = {
  role: "user" | "bot";
  content: string;
};

export default function AnomalyReasoning() {
  const [request, setRequest] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!request.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: request };
    setMessages((prev) => [...prev, userMessage]);
    setRequest("");
    setIsLoading(true);

    try {
      // Mock data for the flow - in a real app, this would come from a live data source.
      const logData = `[{"timestamp":"2023-11-20T10:00:00Z","level":"info","message":"user 'admin' logged in from 192.168.1.1"},{"timestamp":"2023-11-20T10:00:05Z","level":"warning","message":"failed login attempt for 'guest' from 203.0.113.5"}]`;
      const currentRules = `{"failed_login_threshold": 5, "blacklisted_ips": ["1.2.3.4"]}`;
      
      const result = await anomalyDetectionReasoning({ logData, currentRules, request });

      const botMessage: Message = { role: "bot", content: result.reasoning };
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error(error);
      const errorMessage: Message = { role: "bot", content: "Sorry, I encountered an error while processing your request." };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-[60vh]">
        <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
            {messages.map((message, index) => (
                <div key={index} className={`flex items-start gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
                    {message.role === 'bot' && (
                        <Avatar className="w-8 h-8 border">
                            <AvatarFallback><Bot className="w-4 h-4" /></AvatarFallback>
                        </Avatar>
                    )}
                    <div className={`rounded-lg p-3 max-w-lg ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        <p className="text-sm">{message.content}</p>
                    </div>
                    {message.role === 'user' && (
                         <Avatar className="w-8 h-8 border">
                            <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                        </Avatar>
                    )}
                </div>
            ))}
             {messages.length === 0 && (
                <div className="text-center text-muted-foreground p-8">
                    <Wand2 className="mx-auto h-10 w-10 mb-2" />
                    <p>Ask for suggestions or analysis on your detection rules.</p>
                </div>
            )}
            </div>
        </ScrollArea>
        <div className="p-4 border-t bg-background/50">
            <form onSubmit={handleSubmit} className="flex gap-2">
                <Textarea
                    value={request}
                    onChange={(e) => setRequest(e.target.value)}
                    placeholder="e.g., 'Suggest a new rule for failed logins' or 'Is this IP suspicious?'"
                    className="flex-1"
                    rows={1}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e);
                        }
                    }}
                />
                <Button type="submit" disabled={isLoading || !request.trim()}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
                    <span className="sr-only">Ask</span>
                </Button>
            </form>
        </div>
    </Card>
  );
}
