import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  throw new Error('GOOGLE_API_KEY environment variable is not set.');
}
export const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });