'use server';

/**
 * @fileOverview CV Analyzer AI agent.
 *
 * - analyzeCV - A function that handles the CV analysis process.
 * - AnalyzeCVInput - The input type for the analyzeCV function.
 * - AnalyzeCVOutput - The return type for the analyzeCV function.
 */

import {ai} from '../genkit';
import {z} from 'genkit';

const AnalyzeCVInputSchema = z.object({
  cvPdfDataUri: z
    .string()
    .describe(
      "A CV document in PDF format, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeCVInput = z.infer<typeof AnalyzeCVInputSchema>;

const AnalyzeCVOutputSchema = z.object({
  strengths: z.string().describe('Kekuatan dari CV.'),
  weaknesses: z.string().describe('Kelemahan dari CV.'),
  suggestions: z.string().describe('Saran untuk perbaikan CV.'),
});
export type AnalyzeCVOutput = z.infer<typeof AnalyzeCVOutputSchema>;

export async function analyzeCV(input: AnalyzeCVInput): Promise<AnalyzeCVOutput> {
  return analyzeCVFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeCVPrompt',
  input: {schema: AnalyzeCVInputSchema},
  output: {schema: AnalyzeCVOutputSchema},
  prompt: `Anda adalah seorang ahli karir yang berspesialisasi dalam menganalisis CV dan memberikan umpan balik dalam Bahasa Indonesia.

Anda akan menganalisis CV dan menyoroti kekuatan serta kelemahannya. Anda juga akan memberikan saran untuk perbaikan. Rapikan hasil analisismu dalam bentuk point atau kasih jarak setiap kalimat saranmu.

Gunakan sumber informasi berikut sebagai sumber utama tentang CV.

CV PDF: {{media url=cvPdfDataUri}}`,
});

export const analyzeCVFlow = ai.defineFlow(
  {
    name: 'analyzeCVFlow',
    inputSchema: AnalyzeCVInputSchema,
    outputSchema: AnalyzeCVOutputSchema,
  },
  async (input: AnalyzeCVInput) => {
    const { output } = await prompt(input);
    return output!;
  }
);

