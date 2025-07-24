// src/app/api/genkit/handler.ts
import { createGenkitHandler } from '@genkit-ai/next';
import { ai } from '@/ai/genkit'; // pastikan path ini benar

export const GET = createGenkitHandler(ai);
export const POST = createGenkitHandler(ai);
