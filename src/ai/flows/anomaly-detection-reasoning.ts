'use server';

/**
 * @fileOverview A flow for reasoning over the parameters of the anomaly detection engine.
 *
 * - anomalyDetectionReasoning - A function that handles the anomaly detection reasoning process.
 * - AnomalyDetectionReasoningInput - The input type for the anomalyDetectionReasoning function.
 * - AnomalyDetectionReasoningOutput - The return type for the anomalyDetectionReasoning function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnomalyDetectionReasoningInputSchema = z.object({
  logData: z
    .string()
    .describe('A sample of log data to analyze and provide reasoning for.'),
  currentRules: z
    .string()
    .optional()
    .describe('The current ruleset in use by the anomaly detection engine.'),
  request: z
    .string()
    .describe("A request for reasoning or tuning suggestions regarding the anomaly detection engine's rules."),
});
export type AnomalyDetectionReasoningInput = z.infer<
  typeof AnomalyDetectionReasoningInputSchema
>;

const AnomalyDetectionReasoningOutputSchema = z.object({
  reasoning: z
    .string()
    .describe(
      'The reasoning and suggestions for tuning the anomaly detection engine based on the input log data and request.'
    ),
});
export type AnomalyDetectionReasoningOutput = z.infer<
  typeof AnomalyDetectionReasoningOutputSchema
>;

export async function anomalyDetectionReasoning(
  input: AnomalyDetectionReasoningInput
): Promise<AnomalyDetectionReasoningOutput> {
  return anomalyDetectionReasoningFlow(input);
}

const prompt = ai.definePrompt({
  name: 'anomalyDetectionReasoningPrompt',
  input: {schema: AnomalyDetectionReasoningInputSchema},
  output: {schema: AnomalyDetectionReasoningOutputSchema},
  prompt: `You are a security expert specializing in tuning anomaly detection engines.

You are provided with a sample of log data, the current ruleset in use, and a request for reasoning or tuning suggestions.

Based on this information, provide detailed reasoning and actionable suggestions for tuning the anomaly detection engine.

Log Data:
{{logData}}

Current Ruleset:
{{currentRules}}

Request:
{{request}}

Reasoning and Suggestions:
`,
});

const anomalyDetectionReasoningFlow = ai.defineFlow(
  {
    name: 'anomalyDetectionReasoningFlow',
    inputSchema: AnomalyDetectionReasoningInputSchema,
    outputSchema: AnomalyDetectionReasoningOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
