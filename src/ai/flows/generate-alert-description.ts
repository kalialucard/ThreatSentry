'use server';
/**
 * @fileOverview A flow for generating human-readable alert descriptions from structured event data.
 *
 * - generateAlertDescription - A function that handles the alert generation process.
 * - GenerateAlertDescriptionInput - The input type for the function.
 * - GenerateAlertDescriptionOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAlertDescriptionInputSchema = z.object({
  eventType: z.string().describe('The type of event that triggered the alert (e.g., "failed_logins", "suspicious_process").'),
  sourceIp: z.string().ip().optional().describe('The source IP address related to the event.'),
  user: z.string().optional().describe('The user account associated with the event.'),
  host: z.string().optional().describe('The host or system where the event occurred.'),
  count: z.number().optional().describe('The number of times the event occurred in a given timeframe.'),
  timeframe: z.string().optional().describe('The timeframe over which the events were observed (e.g., "5 minutes").'),
});
export type GenerateAlertDescriptionInput = z.infer<
  typeof GenerateAlertDescriptionInputSchema
>;

const GenerateAlertDescriptionOutputSchema = z.object({
  title: z.string().describe('A short, descriptive title for the alert.'),
  description: z.string().describe('A detailed, human-readable description of the alert, including context and potential impact.'),
});
export type GenerateAlertDescriptionOutput = z.infer<
  typeof GenerateAlertDescriptionOutputSchema
>;

export async function generateAlertDescription(
  input: GenerateAlertDescriptionInput
): Promise<GenerateAlertDescriptionOutput> {
  return generateAlertDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAlertDescriptionPrompt',
  input: {schema: GenerateAlertDescriptionInputSchema},
  output: {schema: GenerateAlertDescriptionOutputSchema},
  prompt: `You are a security analyst writing an alert notification. Based on the following structured data, generate a clear and concise alert title and description.

Event Type: {{eventType}}
{{#if sourceIp}}Source IP: {{sourceIp}}{{/if}}
{{#if user}}User: {{user}}{{/if}}
{{#if host}}Host: {{host}}{{/if}}
{{#if count}}Count: {{count}}{{/if}}
{{#if timeframe}}Timeframe: {{timeframe}}{{/if}}

Provide a title that summarizes the event (e.g., "High Volume of Failed Logins").
Provide a description that explains what happened, includes the key details, and suggests potential impact.`,
});

const generateAlertDescriptionFlow = ai.defineFlow(
  {
    name: 'generateAlertDescriptionFlow',
    inputSchema: GenerateAlertDescriptionInputSchema,
    outputSchema: GenerateAlertDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
