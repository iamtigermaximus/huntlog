import { deepseek, DEEPSEEK_MODEL } from "./client";

export async function generateCoverLetter(
  jobDescription: string,
  resumeContent: string,
  company: string,
  jobTitle: string,
  strengths: string[],
): Promise<string> {
  const strengthsText =
    strengths.length > 0
      ? `\n\nKey strengths from analysis: ${strengths.join(", ")}`
      : "";

  const prompt = `Write a professional cover letter.

COMPANY: ${company}
JOB TITLE: ${jobTitle}

JOB DESCRIPTION:
${jobDescription.substring(0, 2500)}

MY RESUME:
${resumeContent.substring(0, 2500)}${strengthsText}

Requirements:
- Professional, confident tone
- 300-400 words
- Highlight 2-3 specific achievements from my resume
- Show genuine enthusiasm for ${company}
- Close with a call to action for an interview
- Use proper business letter format

Write ONLY the cover letter. No explanations.`;

  try {
    console.log("Calling DeepSeek for cover letter generation...");

    const completion = await deepseek.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an expert cover letter writer. Write compelling, personalized cover letters.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: DEEPSEEK_MODEL,
      temperature: 0.7,
      max_tokens: 4000,
    });

    return (
      completion.choices[0]?.message?.content ||
      "Failed to generate cover letter"
    );
  } catch (error) {
    console.error("Cover letter error:", error);
    return "Error generating cover letter. Please check your API key.";
  }
}
