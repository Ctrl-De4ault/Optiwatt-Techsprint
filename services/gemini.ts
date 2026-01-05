
import { GoogleGenAI } from "@google/genai";
import { Appliance } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getEnergyInsights = async (appliances: Appliance[], currentUsage: number) => {
  try {
    const blockContext = appliances
      .map(a => `${a.name}: ${a.usageKwH}kWh/day, efficiency ${a.efficiency}`)
      .join("\n");

    const prompt = `
      Act as a professional Energy Efficiency Consultant for OptiWatt.
      Current total system usage: ${currentUsage} kWh/day.
      Active System Blocks:
      ${blockContext}

      Provide 3 concise, actionable, and creative energy-saving suggestions for these specific blocks.
      Focus on reducing bills and improving block efficiency.
      Format the response as a JSON array of objects with keys: title, description, impact (High, Medium, or Low), and category.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) return [];
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Error fetching Gemini insights:", error);
    return [];
  }
};

export const generateFullReport = async (appliances: Appliance[]) => {
  try {
    const context = appliances.map(a => `${a.name} usage: ${a.usageKwH}kWh`).join(", ");
    const prompt = `Generate a comprehensive energy performance report summary for a building with these units: ${context}. Include an executive summary, a breakdown of top consumers, and a 30-day outlook. Format as Markdown.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error generating report:", error);
    return "Failed to generate AI report. Please check your connection.";
  }
};
