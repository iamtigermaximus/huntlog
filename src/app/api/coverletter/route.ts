// import { NextRequest, NextResponse } from "next/server";
// // import { generateCoverLetter } from "@/lib/groq";
// import { generateCoverLetter } from "@/lib/ai";

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { jobDescription, resumeContent, company, jobTitle, strengths } =
//       body;

//     if (!jobDescription || !resumeContent) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 },
//       );
//     }

//     const coverLetter = await generateCoverLetter(
//       jobDescription,
//       resumeContent,
//       company || "the company",
//       jobTitle || "the position",
//       strengths || [],
//     );

//     return NextResponse.json({ coverLetter });
//   } catch (error) {
//     console.error("Cover letter error:", error);
//     return NextResponse.json(
//       { error: "Failed to generate cover letter" },
//       { status: 500 },
//     );
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize DeepSeek client
const deepseek = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com",
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      jobDescription,
      resumeContent,
      company,
      jobTitle,
      strengths,
      additionalInstructions,
    } = body;

    console.log("=== Cover Letter Generation ===");
    console.log("Job Title:", jobTitle);
    console.log("Company:", company);
    console.log("Job Description length:", jobDescription?.length || 0);
    console.log("Resume length:", resumeContent?.length || 0);
    console.log("Additional Instructions:", additionalInstructions || "None");

    if (!jobDescription || !resumeContent) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const strengthsText =
      strengths && strengths.length > 0
        ? `\n\nKey strengths from my resume: ${strengths.join(", ")}`
        : "";

    const instructionsText = additionalInstructions
      ? `\n\nSPECIAL INSTRUCTIONS:\n${additionalInstructions}\n\nPlease incorporate these instructions into the cover letter.`
      : "";

    const prompt = `Write a professional cover letter.

COMPANY: ${company}
JOB TITLE: ${jobTitle}

JOB DESCRIPTION:
${jobDescription.substring(0, 2500)}

MY RESUME:
${resumeContent.substring(0, 2500)}${strengthsText}

Write a compelling cover letter that:
- Is professional and confident in tone
- Is minimum 350-450 words long
- Highlights 2-3 specific achievements from my resume that match the job
- Shows genuine enthusiasm for ${company}
- Ends with a clear call to action for an interview
- Uses proper business letter format
${additionalInstructions ? `- Follows the special instructions provided above` : ""}

Write ONLY the cover letter. Start with the date. No explanations.`;

    console.log("Calling DeepSeek API for cover letter...");

    const completion = await deepseek.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an expert cover letter writer. Write only the cover letter. No explanations, no meta-commentary.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "deepseek-chat",
      temperature: 0.7,
      max_tokens: 2000,
    });

    const coverLetter = completion.choices[0]?.message?.content || "";

    if (!coverLetter) {
      return NextResponse.json(
        { error: "Failed to generate cover letter" },
        { status: 500 },
      );
    }

    console.log("Cover letter generated, length:", coverLetter.length);

    return NextResponse.json({ coverLetter });
  } catch (error) {
    console.error("Cover letter API error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate cover letter",
      },
      { status: 500 },
    );
  }
}
