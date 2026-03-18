
import Anthropic from "@anthropic-ai/sdk";
import { Appliance } from "../types";

const anthropic = new Anthropic({
  apiKey: process.env.API_KEY,
  dangerouslyAllowBrowser: true
});

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

    const message = await anthropic.messages.create({
      model: "claude-opus-4-5-20251101",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') return [];

    const text = content.text;
    if (!text) return [];

    // Extract JSON from the response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) return [];

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Error fetching Claude insights:", error);
    return [];
  }
};

export const generateFullReport = async (appliances: Appliance[]) => {
  try {
    const context = appliances.map(a => `${a.name} usage: ${a.usageKwH}kWh`).join(", ");
    const prompt = `Generate a comprehensive energy performance report summary for a building with these units: ${context}. Include an executive summary, a breakdown of top consumers, and a 30-day outlook. Format as Markdown.`;

    const message = await anthropic.messages.create({
      model: "claude-opus-4-5-20251101",
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      return "Failed to generate AI report. Please check your connection.";
    }

    return content.text;
  } catch (error) {
    console.error("Error generating report:", error);
    return "Failed to generate AI report. Please check your connection.";
  }
};
