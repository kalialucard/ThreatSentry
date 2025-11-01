'use server';
/**
 * @fileOverview A flow that uses an LLM to generate human-readable summaries of security incidents.
 *
 * - summarizeIncidents - A function that handles the summarization process.
 * - SummarizeIncidentsInput - The input type for the summarizeIncidents function.
 * - SummarizeIncidentsOutput - The return type for the summarizeIncidents function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeIncidentsInputSchema = z.object({
  incidentDetails: z.string().describe('Detailed information about the security incident.'),
});
export type SummarizeIncidentsInput = z.infer<typeof SummarizeIncidentsInputSchema>;

const SummarizeIncidentsOutputSchema = z.object({
  summary: z.string().describe('A human-readable summary of the security incident.'),
});
export type SummarizeIncidentsOutput = z.infer<typeof SummarizeIncidentsOutputSchema>;

export async function summarizeIncidents(input: SummarizeIncidentsInput): Promise<SummarizeIncidentsOutput> {
  return summarizeIncidentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeIncidentsPrompt',
  input: {schema: SummarizeIncidentsInputSchema},
  output: {schema: SummarizeIncidentsOutputSchema},
  prompt: `You are an expert security analyst tasked with summarizing security incidents.

  Given the following details about a security incident, generate a concise and human-readable summary that highlights the key aspects of the incident and its potential impact.

  Incident Details: {{{incidentDetails}}}
  `,
  config: {
    // Example safety settings (adjust as needed):
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
    ],
  },
});

const summarizeIncidentsFlow = ai.defineFlow(
  {
    name: 'summarizeIncidentsFlow',
    inputSchema: SummarizeIncidentsInputSchema,
    outputSchema: SummarizeIncidentsOutputSchema,
  },
  async input => {
    // It's crucial to inform users about the implications of using 3rd party LLMs, data sharing etc.
    // This should ideally happen in the UI when they configure/enable the LLM summarization feature.
    // Additionally, you may want to give the option of redacting sensitive data (PII, etc.)

    // Call the LLM to generate the summary.  The prompt defines how to use the incident details to create the summary.
    const {output} = await prompt(input);
    return output!;
  }
);
