import OpenAI from "openai";

// Initialize DeepSeek client (OpenAI-compatible)
export const deepseek = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com",
});

export const DEEPSEEK_MODEL = "deepseek-chat"; // Use deepseek-chat (v4-pro might not exist)
