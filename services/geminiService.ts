
import { GoogleGenAI } from "@google/genai";
import { AspectRatio } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const handleError = (error: unknown, context: string): string => {
  console.error(`Error in ${context}:`, error);
  if (error instanceof Error) {
    return `An error occurred: ${error.message}. Check the console for more details.`;
  }
  return `An unknown error occurred in ${context}.`;
};

export const generateText = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    throw new Error(handleError(error, 'generateText'));
  }
};

export const generateImage = async (prompt: string, aspectRatio: AspectRatio): Promise<string> => {
  try {
    const response = await ai.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: aspectRatio,
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
      throw new Error("No image was generated.");
    }
  } catch (error) {
    throw new Error(handleError(error, 'generateImage'));
  }
};

export const generateCode = async (prompt: string, language: string): Promise<string> => {
  try {
    const systemInstruction = `You are an expert software engineer specializing in ${language}. Your task is to provide clean, efficient, and production-ready code based on the user's request.
- Only output the raw code.
- Do not include any explanations, comments, or markdown formatting like \`\`\`${language.toLowerCase()}\`\`\` or \`\`\`json\`\`\`.
- Ensure the code is complete and runnable if possible.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { systemInstruction },
    });

    return response.text.trim();
  } catch (error) {
    throw new Error(handleError(error, 'generateCode'));
  }
};
