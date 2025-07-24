'use server';

/**
 * @fileOverview CV Builder AI agent.
 *
 * - buildCv - A function that handles the CV building process.
 * - CvBuilderInput - The input type for the buildCv function.
 * - CvBuilderOutput - The return type for the buildCv function.
 */

import {ai} from '../genkit';
import {z} from 'genkit';

const CvBuilderInputSchema = z.object({
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "A photo for the CV, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  name: z.string().describe('Your full name.'),
  email: z.string().email().describe('Your email address.'),
  phone: z.string().describe('Your phone number.'),
  linkedin: z.string().optional().describe('Your LinkedIn profile URL.'),
  summary: z.string().describe('A brief professional summary.'),
  experience: z
    .array(
      z.object({
        title: z.string().describe('Your job title.'),
        company: z.string().describe('The company name.'),
        dates: z.string().describe('The dates of employment.'),
        description: z.string().describe('A description of your responsibilities and achievements.'),
      })
    )
    .describe('Your work experience.'),
  education:
    z
      .array(
        z.object({
          institution: z.string().describe('The name of the educational institution.'),
          degree: z.string().describe('The degree obtained.'),
          dates: z.string().describe('The dates of attendance.'),
        })
      )
      .describe('Your education history'),
  skills: z.array(z.string()).describe('A list of your skills.'),
  certifications: z
    .array(
      z.object({
        name: z.string().describe('The name of the certification or training.'),
        organizer: z.string().describe('The organization that issued the certification.'),
        dates: z.string().describe('The date the certification was obtained.'),
      })
    )
    .optional()
    .describe('Optional list of certifications or trainings.'),
});
export type CvBuilderInput = z.infer<typeof CvBuilderInputSchema>;

const CvBuilderOutputSchema = z.object({
  name: z.string().describe('The full name of the person.'),
  email: z.string().describe('The email address.'),
  phone: z.string().describe('The phone number.'),
  linkedin: z.string().optional().describe('The LinkedIn profile URL.'),
  summary: z
    .string()
    .describe('A professionally rewritten, impactful summary in the third person. Keep it concise (3-4 sentences).'),
  experience: z
    .array(
      z.object({
        title: z.string().describe('The job title.'),
        company: z.string().describe('The company name.'),
        dates: z.string().describe('The dates of employment.'),
        description: z
          .string()
          .describe(
            'A professionally rewritten description of responsibilities and achievements, using action verbs and quantifiable results. Format as a bulleted list within the string, starting each item with a hyphen (-) and ending with a semicolon (;).'
          ),
      })
    )
    .describe('The professional experience, with improved descriptions.'),
  education: z
    .array(
      z.object({
        institution: z.string().describe('The name of the educational institution.'),
        degree: z.string().describe('The degree obtained.'),
        dates: z.string().describe('The dates of attendance.'),
      })
    )
    .describe('The education history.'),
  skills: z.array(z.string()).describe('The list of skills.'),
  certifications: z.array(
      z.object({
        name: z.string().describe('The name of the certification or training.'),
        organizer: z.string().describe('The organization that issued the certification.'),
        dates: z.string().describe('The date the certification was obtained.'),
      })
    ).optional().describe('The list of certifications or trainings.'),
});

export type CvBuilderOutput = z.infer<typeof CvBuilderOutputSchema>;

export async function buildCv(input: CvBuilderInput): Promise<CvBuilderOutput> {
  return buildCvFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cvBuilderPrompt',
  input: {schema: CvBuilderInputSchema},
  output: {schema: CvBuilderOutputSchema},
  prompt: `You are an expert CV writer and career coach from Indonesia. Your task is to take the user's raw CV data and transform it into a professional, polished CV.
  Rewrite the summary and experience descriptions to be more impactful, using strong action verbs and quantifying achievements where possible.
  For experience descriptions, format them as a bulleted list. Each bullet point should start with a hyphen and end with a semicolon. For example: - Managed a team of 5 engineers; - Increased sales by 20% in Q3;.
  Do not change the certifications data, just return it as is.
  Return the refined information as a structured JSON object. Do not add any new information, only enhance the provided content.

  Here is the user's data:
  Name: {{{name}}}
  Email: {{{email}}}
  Phone: {{{phone}}}
  {{#if linkedin}}LinkedIn: {{{linkedin}}}{{/if}}
  Summary: {{{summary}}}

  Experience:
  {{#each experience}}
  - Title: {{{this.title}}} at {{{this.company}}} ({{{this.dates}}})
    Description: {{{this.description}}}
  {{/each}}

  Education:
  {{#each education}}
  - Degree: {{{this.degree}}} at {{{this.institution}}} ({{{this.dates}}})
  {{/each}}

  Skills:
  {{#each skills}}
  - {{{this}}}
  {{/each}}
  
  {{#if certifications}}
  Certifications:
  {{#each certifications}}
  - Name: {{{this.name}}}, Organizer: {{{this.organizer}}}, Date: {{{this.dates}}}
  {{/each}}
  {{/if}}
  `,
});

export const buildCvFlow = ai.defineFlow(
  {
    name: 'buildCvFlow',
    inputSchema: CvBuilderInputSchema,
    outputSchema: CvBuilderOutputSchema,
  },
  async (input: CvBuilderInput) => {
    const {output} = await prompt(input);
    return output!;
  }
);
