'use server';

/**
 * @fileOverview A flow for assessing the threat level of an IP address.
 *
 * - ipThreatAssessment - A function that handles the IP threat assessment process.
 */

import { ai } from '@/ai/genkit';
import {
  IpThreatAssessmentInputSchema,
  IpThreatAssessmentOutputSchema,
  type IpThreatAssessmentInput,
  type IpThreatAssessmentOutput,
} from '@/ai/schemas/ip-threat-assessment';


const prompt = ai.definePrompt({
    name: 'ipThreatAssessmentPrompt',
    input: { schema: IpThreatAssessmentInputSchema },
    output: { schema: IpThreatAssessmentOutputSchema },
    prompt: `You are a Tier 3 Security Operations Center (SOC) analyst specializing in threat intelligence.
  
  You have been given an IP address: {{ipAddress}}.
  
  Your task is to provide a comprehensive threat assessment. You must simulate looking up this IP against common threat intelligence feeds (like AbuseIPDB, VirusTotal, Spamhaus), consider its geolocation, and analyze its potential for malicious activity.
  
  Based on your simulated analysis, generate a threat score, a summary, and a recommended action.
  
  - For a known malicious IP (e.g., part of a botnet, known for spam/attacks), the score should be high (7-10) and the action should be 'block'.
  - For an IP from a suspicious region or with some negative history, the score could be medium (4-6) and the action 'investigate' or 'monitor'.
  - For a benign IP (e.g., from a known cloud provider or residential ISP with no history), the score should be low (0-3) and the action 'allow'.
  
  Provide your response in the required JSON format.`,
  });

const ipThreatAssessmentFlow = ai.defineFlow(
  {
    name: 'ipThreatAssessmentFlow',
    inputSchema: IpThreatAssessmentInputSchema,
    outputSchema: IpThreatAssessmentOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

export async function ipThreatAssessment(
    input: IpThreatAssessmentInput
  ): Promise<IpThreatAssessmentOutput> {
    return ipThreatAssessmentFlow(input);
  }
