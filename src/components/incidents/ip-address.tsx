"use client";

import React, { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '../ui/button';
import type { IpThreatAssessmentOutput } from '@/ai/schemas/ip-threat-assessment';
import { ipThreatAssessment } from '@/ai/flows/ip-threat-assessment';
import { AlertTriangle, Loader2, ShieldCheck, ShieldX } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';

const IP_REGEX = /\b(?:\d{1,3}\.){3}\d{1,3}\b/g;

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

function ThreatIntelPopover({ ipAddress }: { ipAddress: string }) {
  const [assessment, setAssessment] = useState<IpThreatAssessmentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchAssessment = async () => {
    if (assessment || isLoading) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await ipThreatAssessment({ ipAddress });
      setAssessment(result);
    } catch (e) {
      console.error(e);
      setError('Failed to get threat assessment.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Popover onOpenChange={(open) => open && handleFetchAssessment()}>
      <PopoverTrigger asChild>
        <Button variant="link" className="p-0 h-auto font-mono bg-muted text-foreground hover:bg-muted-foreground/20 rounded-sm px-1">
          {ipAddress}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <div className="space-y-4">
          <h4 className="font-medium leading-none">Threat Assessment</h4>
          <p className="text-sm text-muted-foreground">
            AI-powered assessment for <span className="font-mono">{ipAddress}</span>
          </p>
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Analyzing...</span>
            </div>
          )}
          {error && <p className="text-sm text-destructive">{error}</p>}
          {assessment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Threat Score</Label>
                  <p
                    className={`text-2xl font-bold ${
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
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}


export default function IpAddress({ text }: { text: string }) {
  const parts = text.split(IP_REGEX);
  const ips = text.match(IP_REGEX) || [];

  return (
    <span>
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {ips[index] && <ThreatIntelPopover ipAddress={ips[index]} />}
        </React.Fragment>
      ))}
    </span>
  );
}