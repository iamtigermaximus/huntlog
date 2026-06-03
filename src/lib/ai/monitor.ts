import { deepseek, DEEPSEEK_MODEL } from "./client";

export interface MonitoringResult {
  staleApplications: {
    id: string;
    jobTitle: string;
    company: string;
    daysSinceApplied: number;
    suggestedAction: string;
  }[];
  followUpSuggestions: {
    id: string;
    jobTitle: string;
    company: string;
    suggestedEmail: string;
    bestTime: string;
  }[];
  expiringSoon: {
    id: string;
    jobTitle: string;
    company: string;
    daysLeft: number;
  }[];
  insights: {
    totalActive: number;
    responseRate: string;
    averageTimeToResponse: string;
    recommendation: string;
  };
  actionItems: string[];
}

export async function monitorApplications(
  applications: {
    id: string;
    jobTitle: string;
    company: string;
    status: string;
    appliedDate: string;
    jobExpirationDate?: string;
    lastMonitoredAt?: string;
    matchScore?: number;
  }[],
): Promise<MonitoringResult> {
  const appsJson = JSON.stringify(applications, null, 2);

  const prompt = `You are an expert job application monitor. Analyze these active applications.

APPLICATIONS:
${appsJson.substring(0, 4000)}

Return ONLY a valid JSON object:
{
  "staleApplications": [
    {"id": "app-id", "jobTitle": "...", "company": "...", "daysSinceApplied": 14, "suggestedAction": "Send a polite follow-up email..."}
  ],
  "followUpSuggestions": [
    {"id": "app-id", "jobTitle": "...", "company": "...", "suggestedEmail": "Draft follow-up email...", "bestTime": "Tuesday morning"}
  ],
  "expiringSoon": [
    {"id": "app-id", "jobTitle": "...", "company": "...", "daysLeft": 3}
  ],
  "insights": {
    "totalActive": 10,
    "responseRate": "30% of applications got responses",
    "averageTimeToResponse": "5-7 days for most responses",
    "recommendation": "Focus on roles requiring your React skills..."
  },
  "actionItems": ["Follow up on the Senior Engineer role at Acme Corp", "Update your resume to highlight AWS experience"]
}

Rules:
- staleApplications: apps with no status change in 10+ days
- followUpSuggestions: apps where a follow-up would help, with personalized email drafts
- expiringSoon: jobs closing within 7 days
- insights should be data-driven from the provided applications
- actionItems should be specific and actionable
- Return ONLY the JSON. No markdown.`;

  try {
    const completion = await deepseek.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert application monitor. Return ONLY valid JSON.",
        },
        { role: "user", content: prompt },
      ],
      model: DEEPSEEK_MODEL,
      temperature: 0.4,
      max_tokens: 3000,
    });

    const response = completion.choices[0]?.message?.content || "{}";
    let clean = response.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
    const match = clean.match(/\{[\s\S]*\}/);
    if (match) clean = match[0];

    return JSON.parse(clean);
  } catch (error) {
    console.error("Monitor error:", error);
    return {
      staleApplications: [],
      followUpSuggestions: [],
      expiringSoon: [],
      insights: {
        totalActive: applications.length,
        responseRate: "Unable to calculate",
        averageTimeToResponse: "Unknown",
        recommendation: "Try again later",
      },
      actionItems: ["Check your applications manually"],
    };
  }
}
