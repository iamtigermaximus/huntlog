import { deepseek, DEEPSEEK_MODEL } from "./client";

export interface InterviewPrep {
  technicalQuestions: { question: string; suggestedAnswer: string; difficulty: string }[];
  behavioralQuestions: { question: string; suggestedAnswer: string; theme: string }[];
  topicsToStudy: string[];
  questionsToAsk: string[];
  preparationTips: string;
}

export async function generateInterviewPrep(
  jobTitle: string,
  company: string,
  jobDescription: string,
  resumeContent: string,
): Promise<InterviewPrep> {
  const prompt = `You are an expert interview coach. Prepare interview materials for this job.

JOB TITLE: ${jobTitle}
COMPANY: ${company}

JOB DESCRIPTION:
${jobDescription.substring(0, 2500)}

CANDIDATE RESUME:
${resumeContent.substring(0, 2500)}

Return ONLY a valid JSON object:
{
  "technicalQuestions": [
    {"question": "Explain closures in JavaScript", "suggestedAnswer": "A closure is...", "difficulty": "medium"}
  ],
  "behavioralQuestions": [
    {"question": "Tell me about a time you handled conflict", "suggestedAnswer": "In my previous role...", "theme": "Conflict Resolution"}
  ],
  "topicsToStudy": ["System Design", "React Performance"],
  "questionsToAsk": ["What does success look like in the first 90 days?"],
  "preparationTips": "Focus on demonstrating your React expertise..."
}

Rules:
- technicalQuestions: 5 questions based on the job's tech requirements, with realistic answers drawing from the resume
- behavioralQuestions: 5 questions based on seniority level, with STAR-format suggested answers
- topicsToStudy: 5-7 specific topics the candidate should review
- questionsToAsk: 5 smart questions to ask the interviewer
- preparationTips: A personalized 3-4 sentence prep strategy
- Make suggested answers reference actual experience from the resume
- Return ONLY the JSON. No markdown.`;

  try {
    const completion = await deepseek.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert interview coach. Return ONLY valid JSON.",
        },
        { role: "user", content: prompt },
      ],
      model: DEEPSEEK_MODEL,
      temperature: 0.6,
      max_tokens: 4000,
    });

    const response = completion.choices[0]?.message?.content || "{}";
    let clean = response.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
    const match = clean.match(/\{[\s\S]*\}/);
    if (match) clean = match[0];

    return JSON.parse(clean);
  } catch (error) {
    console.error("Interview prep error:", error);
    throw new Error("Failed to generate interview prep");
  }
}
