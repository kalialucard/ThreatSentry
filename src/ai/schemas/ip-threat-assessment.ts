/**
 * @fileOverview Schemas and types for the IP threat assessment flow.
 *
 * - IpThreatAssessmentInputSchema - The Zod schema for the input of the IP threat assessment flow.
 * - IpThreatAssessmentInput - The TypeScript type for the input.
 * - IpThreatAssessmentOutputSchema - The Zod schema for the output of the IP threat assessment flow.
 * - IpThreatAssessmentOutput - The TypeScript type for the output.
 */

import { z } from 'genkit';

export const IpThreatAssessmentInputSchema = z.object({
  ipAddress: z
    .string()
    .ip()
    .describe('The IP address to be assessed for potential threats.'),
});
export type IpThreatAssessmentInput = z.infer<
  typeof IpThreatAssessmentInputSchema
>;

export const IpThreatAssessmentOutputSchema = z.object({
  threatScore: z
    .number()
    .min(0)
    .max(10)
    .describe(
      'A score from 0 (no threat) to 10 (critical threat) representing the risk level of the IP address.'
    ),
  summary: z
    .string()
    .describe(
      'A concise summary of the assessment, including geolocation, known activities, and reputation.'
    ),
  recommendedAction: z
    .enum(['monitor', 'block', 'allow', 'investigate'])
    .describe(
      'The recommended action to take regarding this IP address (e.g., monitor, block).'
    ),
});
export type IpThreatAssessmentOutput = z.infer<
  typeof IpThreatAssessmentOutputSchema
>;
