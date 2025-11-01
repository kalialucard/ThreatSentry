'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertTriangle, Bot, Loader2, ShieldCheck, ShieldX } from 'lucide-react';
import { ipThreatAssessment } from '@/ai/flows/ip-threat-assessment';
import type { IpThreatAssessmentOutput } from '@/ai/schemas/ip-threat-assessment';
import { Badge } from '@/components/ui/badge';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormState } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  ipAddress: z.string().ip({ message: 'Please enter a valid IP address.' }),
});

const actionIconMap = {
  block: <ShieldX className="h-5 w-5 text-destructive" />,
  monitor: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
  investigate: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
  allow: <ShieldCheck className="h-5 w-5 text-green-500" />,
};

const actionColorMap: {
  [key in IpThreatAssessmentOutput['recommendedAction']]:
    | 'destructive'
    | 'secondary'
    | 'outline';
} = {
  block: 'destructive',
  monitor: 'secondary',
  investigate: 'secondary',
  allow: 'outline',
};

export default function ThreatIntelPage() {
  const [assessment, setAssessment] =
    useState<IpThreatAssessmentOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ipAddress: '',
    },
  });
  
  const { isSubmitting } = useFormState({ control: form.control });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null);
    setAssessment(null);
    try {
      const result = await ipThreatAssessment({
        ipAddress: values.ipAddress,
      });
      setAssessment(result);
    } catch (e) {
      console.error(e);
      setError('Failed to get threat assessment. Please try again.');
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-headline font-bold">
          Threat Intelligence Center
        </h1>
        <p className="text-muted-foreground mt-2">
          Get an AI-powered threat assessment for any IP address.
        </p>
      </div>

      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>IP Address Lookup</CardTitle>
              <CardDescription>
                Enter an IP address to analyze its threat level.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="ipAddress"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="ip-address">IP Address</Label>
                    <Input
                      id="ip-address"
                      placeholder="e.g., 198.51.100.12"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Analyze IP
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {isSubmitting && (
        <div className="flex items-center justify-center p-8 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin mr-4" />
          <p>Analyzing IP against threat intelligence feeds...</p>
        </div>
      )}

      {error && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Analysis Failed</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      )}

      {assessment && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-6 w-6" />
              <span>AI Threat Assessment</span>
            </CardTitle>
            <CardDescription>
              Assessment for IP Address:{' '}
              <span className="font-mono font-medium text-foreground">
                {form.getValues('ipAddress')}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Threat Score</Label>
                <div className="flex items-center gap-2">
                  <p
                    className={`text-4xl font-bold ${
                      assessment.threatScore >= 7
                        ? 'text-destructive'
                        : assessment.threatScore >= 4
                        ? 'text-yellow-500'
                        : 'text-green-500'
                    }`}
                  >
                    {assessment.threatScore}/10
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Recommended Action</Label>
                <div className="flex items-center gap-2">
                  {actionIconMap[assessment.recommendedAction]}
                  <Badge variant={actionColorMap[assessment.recommendedAction]}>
                    {assessment.recommendedAction.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>

            <div>
              <Label>Summary</Label>
              <p className="text-sm text-muted-foreground mt-1">
                {assessment.summary}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
