'use server';

/**
 * @fileOverview A flow for analyzing raw log data.
 *
 * - analyzeLogs - A function that handles the log analysis process.
 * - LogAnalysisInput - The input type for the analyzeLogs function.
 * - LogAnalysisOutput - The return type for the analyzeLogs function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const LogAnalysisInputSchema = z.object({
  logs: z.string().describe('A string containing raw log data.'),
});
export type LogAnalysisInput = z.infer<typeof LogAnalysisInputSchema>;

const LogAnalysisOutputSchema = z.object({
  analysisSummary: z.string().describe('A summary of the log analysis, highlighting key findings.'),
  anomaliesFound: z.number().describe('The number of potential anomalies or security issues found.'),
});
export type LogAnalysisOutput = z.infer<typeof LogAnalysisOutputSchema>;

export async function analyzeLogs(
  input: LogAnalysisInput
): Promise<LogAnalysisOutput> {
  return logAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'logAnalysisPrompt',
  input: { schema: LogAnalysisInputSchema },
  output: { schema: LogAnalysisOutputSchema },
  prompt: `You are a security analyst AI. Analyze the following raw logs and provide a summary of your findings.
  Identify potential security anomalies, such as failed logins, errors, or suspicious activity.
  Count the number of distinct anomalies you find.

Logs:
{{{logs}}}
`,
});

const logAnalysisFlow = ai.defineFlow(
  {
    name: 'logAnalysisFlow',
    inputSchema: LogAnalysisInputSchema,
    outputSchema: LogAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
