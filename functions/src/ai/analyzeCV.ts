import { defineFlow } from "@genkit-ai/flow";
import useModel from "@genkit-ai/googleai";
import { z } from "zod";

export const analyzeCV = defineFlow(
  {
    name: "analyzeCV",
    inputSchema: z.object({ cvPdfDataUri: z.string() }),
    outputSchema: z.object({
      strengths: z.string(),
      weaknesses: z.string(),
      suggestions: z.string()
    }),
  },
  async ({ cvPdfDataUri }: { cvPdfDataUri: string }) => {
    const model = useModel("gemini-pro"); // atau "gemini-pro-vision"

    const result = await model.invoke(
      `Analisis CV berikut dalam 3 bagian:\n##Kekuatan##Kelemahan##Saran\n\nCV (base64): ${cvPdfDataUri}`
    );

    const parts = result.split("##");

    return {
      strengths: parts[1]?.trim() ?? "",
      weaknesses: parts[2]?.trim() ?? "",
      suggestions: parts[3]?.trim() ?? "",
    };
  }
);
