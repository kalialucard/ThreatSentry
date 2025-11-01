
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { UploadCloud, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { analyzeLogs } from "@/ai/flows/log-analysis";

export default function IngestPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const pasteTextareaRef = useRef<HTMLTextAreaElement>(null);
  const vendorTextareaRef = useRef<HTMLTextAreaElement>(null);


  const handleProcess = async (logSource: 'paste' | 'upload' | 'vendor') => {
    let logs = '';
    if (logSource === 'paste' && pasteTextareaRef.current) {
        logs = pasteTextareaRef.current.value;
    } else if (logSource === 'vendor' && vendorTextareaRef.current) {
        logs = vendorTextareaRef.current.value;
    }
    // Note: 'upload' source would require file reading logic, which is more complex.
    // For this prototype, we'll focus on the text areas.

    if (logSource !== 'upload' && !logs.trim()) {
        toast({
            variant: 'destructive',
            title: "No logs provided",
            description: "Please paste some logs to analyze."
        });
        return;
    }


    setIsProcessing(true);
    toast({
        title: "Processing logs...",
        description: "Your logs are being parsed and analyzed by the AI."
    });

    if (logSource === 'upload') {
        // Mocking upload analysis for now
        await new Promise(resolve => setTimeout(resolve, 1500));
         toast({
            title: "Processing Complete",
            description: "Analysis finished. 2 new anomalies found from file.",
        });
        setIsProcessing(false);
        return;
    }

    try {
        const result = await analyzeLogs({ logs });
        toast({
            title: "Analysis Complete",
            description: `${result.anomaliesFound} anomalies found. ${result.analysisSummary}`,
        });
    } catch (e) {
        console.error(e);
        toast({
            variant: "destructive",
            title: "Analysis Failed",
            description: "Could not process the logs. Please try again.",
        });
    } finally {
        setIsProcessing(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      <div className="text-center">
        <h1 className="text-3xl font-headline font-bold">Log Ingestion</h1>
        <p className="text-muted-foreground mt-2">
          Paste, upload, or connect a live feed to start analyzing your logs.
        </p>
      </div>

      <Tabs defaultValue="paste">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="paste">Paste Logs</TabsTrigger>
          <TabsTrigger value="upload">Upload File</TabsTrigger>
          <TabsTrigger value="vendor">Vendor Ingestion</TabsTrigger>
        </TabsList>
        <TabsContent value="paste">
          <Card>
            <CardHeader>
              <CardTitle>Paste Raw Logs</CardTitle>
              <CardDescription>
                Copy and paste log content directly into the text area below.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                ref={pasteTextareaRef}
                placeholder="<162>1 2023-10-27T10:00:00.000Z my-host auth - - - user:admin login failed"
                className="h-64 font-code"
              />
              <div className="flex justify-between items-end">
                <div className="w-full max-w-xs">
                    <Label htmlFor="log-format-paste">Log Format</Label>
                    <Select defaultValue="autodetect">
                        <SelectTrigger id="log-format-paste">
                            <SelectValue placeholder="Autodetect" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="autodetect">Autodetect</SelectItem>
                            <SelectItem value="syslog_rfc5424">Syslog (RFC5424)</SelectItem>
                            <SelectItem value="syslog_rfc3164">Syslog (RFC3164)</SelectItem>
                            <SelectItem value="json">JSON</SelectItem>
                            <SelectItem value="evtx">Windows Event Log (XML)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button onClick={() => handleProcess('paste')} disabled={isProcessing}>
                    {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Parse & Analyze
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload File</CardTitle>
              <CardDescription>
                Upload a file for analysis. Any file type is supported, including log files.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-center w-full">
                    <Label htmlFor="log-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-muted-foreground">Any file type supported</p>
                        </div>
                        <Input id="log-file" type="file" className="hidden" />
                    </Label>
                </div>
                <div className="flex justify-between items-end">
                    <div className="w-full max-w-xs">
                        <Label htmlFor="log-format-upload">Log Format</Label>
                        <Select defaultValue="autodetect">
                            <SelectTrigger id="log-format-upload">
                                <SelectValue placeholder="Autodetect" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="autodetect">Autodetect</SelectItem>
                                <SelectItem value="syslog_rfc5424">Syslog (RFC5424)</SelectItem>
                                <SelectItem value="syslog_rfc3164">Syslog (RFC3164)</SelectItem>
                                <SelectItem value="json">JSON</SelectItem>
                                <SelectItem value="evtx">Windows Event Log (EVTX)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button onClick={() => handleProcess('upload')} disabled={isProcessing}>
                        {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Parse & Analyze
                    </Button>
                </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="vendor">
          <Card>
            <CardHeader>
              <CardTitle>Vendor-Specific Ingestion</CardTitle>
              <CardDescription>
                Use this for more obscure or less commonly used vendor formats. This may require more operator maintenance.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                ref={vendorTextareaRef}
                placeholder="Paste your vendor-specific log data here..."
                className="h-64 font-code"
              />
              <div className="flex justify-between items-end">
                <div className="w-full max-w-xs">
                    <Label htmlFor="log-format-vendor">Log Format</Label>
                    <Select defaultValue="autodetect">
                        <SelectTrigger id="log-format-vendor">
                            <SelectValue placeholder="Select Vendor Format" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="autodetect">Autodetect</SelectItem>
                            <SelectItem value="vendor_a">Vendor A Format</SelectItem>
                            <SelectItem value="vendor_b">Vendor B Format</SelectItem>
                            <SelectItem value="vendor_c">Vendor C Format</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button onClick={() => handleProcess('vendor')} disabled={isProcessing}>
                    {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Parse & Analyze
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
