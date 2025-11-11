import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from "openai";
import type { OptimizeRequest, OptimizeResponse } from "../shared/types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { blurb, hashtags, cta, platform, characterLimit } = req.body as OptimizeRequest;

    if (!blurb || !platform || !characterLimit) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "OpenAI API key not configured" });
    }

    const optimizedText = await optimizeForPlatform(
      blurb,
      hashtags || "",
      cta || "",
      platform,
      characterLimit
    );

    res.json({ optimizedText } as OptimizeResponse);
  } catch (error) {
    console.error("Optimization error:", error);
    res.status(500).json({ error: "Failed to optimize content" });
  }
}

async function optimizeForPlatform(
  blurb: string,
  hashtags: string,
  cta: string,
  platform: string,
  characterLimit: number
): Promise<string> {
  const prompt = `You are a social media expert. Optimize the following content for ${platform} to maximize engagement and appeal.

Original content:
${blurb}
${hashtags ? `Hashtags: ${hashtags}` : ''}
${cta ? `CTA: ${cta}` : ''}

CRITICAL REQUIREMENTS:
- The optimized post MUST be ${characterLimit} characters or less (this is a HARD LIMIT)
- Count every character including spaces, punctuation, hashtags, and line breaks
- Make it more engaging and compelling for ${platform} specifically
- Maintain the core message and any CTAs
- Use platform-appropriate tone and style
- Include hashtags naturally if provided
- Return ONLY the optimized text, no explanations or quotes

If you cannot fit everything within ${characterLimit} characters, prioritize the core message over hashtags.

Optimized version (maximum ${characterLimit} characters):`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are a social media optimization expert. Return only the optimized post text. CRITICAL: The output must be ${characterLimit} characters or less. Count every character carefully.`,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 500,
  });

  let optimized = completion.choices[0]?.message?.content?.trim() || blurb;
  
  // Ensure it fits within the character limit
  if (optimized.length > characterLimit) {
    optimized = optimized.slice(0, characterLimit).trim();
    // Try to avoid cutting off mid-word
    const lastSpace = optimized.lastIndexOf(' ');
    if (lastSpace > characterLimit * 0.9) {
      optimized = optimized.slice(0, lastSpace).trim();
    }
  }

  return optimized;
}