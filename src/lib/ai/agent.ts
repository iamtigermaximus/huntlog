// AI Agent Orchestrator - manages AI operation lifecycle and status tracking

export type AgentStatus = "idle" | "thinking" | "done" | "error";

export interface AgentStep {
  label: string;
  status: "done" | "active" | "pending";
}

export interface AgentActivity {
  id: string;
  agentName: string;
  action: string;
  status: AgentStatus;
  timestamp: Date;
  details?: string;
}

class AIAgent {
  private static activities: AgentActivity[] = [];
  private static maxActivities = 50;

  static createActivity(agentName: string, action: string, details?: string): string {
    const id = `agent-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const activity: AgentActivity = {
      id,
      agentName,
      action,
      status: "thinking",
      timestamp: new Date(),
      details,
    };
    this.activities.unshift(activity);
    if (this.activities.length > this.maxActivities) {
      this.activities = this.activities.slice(0, this.maxActivities);
    }
    return id;
  }

  static updateActivity(id: string, status: AgentStatus, details?: string): void {
    const activity = this.activities.find((a) => a.id === id);
    if (activity) {
      activity.status = status;
      if (details) activity.details = details;
    }
  }

  static getRecentActivities(count = 10): AgentActivity[] {
    return this.activities.slice(0, count);
  }

  static getActiveAgents(): AgentActivity[] {
    return this.activities.filter((a) => a.status === "thinking");
  }

  static buildSteps(action: string): AgentStep[] {
    switch (action) {
      case "resume-match":
        return [
          { label: "Analyzing resume content", status: "pending" },
          { label: "Extracting key skills", status: "pending" },
          { label: "Matching against job description", status: "pending" },
          { label: "Calculating match score", status: "pending" },
          { label: "Generating recommendations", status: "pending" },
        ];
      case "cover-letter":
        return [
          { label: "Analyzing job requirements", status: "pending" },
          { label: "Mapping resume achievements", status: "pending" },
          { label: "Drafting cover letter", status: "pending" },
          { label: "Polishing tone and format", status: "pending" },
        ];
      case "job-scrape":
        return [
          { label: "Extracting skills from resume", status: "pending" },
          { label: "Generating search queries", status: "pending" },
          { label: "Searching for matching jobs", status: "pending" },
          { label: "Calculating match scores", status: "pending" },
          { label: "Ranking results", status: "pending" },
        ];
      case "prepare-application":
        return [
          { label: "Analyzing job requirements", status: "pending" },
          { label: "Optimizing resume for this job", status: "pending" },
          { label: "Generating cover letter", status: "pending" },
          { label: "Preparing screening answers", status: "pending" },
          { label: "Compiling application package", status: "pending" },
        ];
      case "resume-optimize":
        return [
          { label: "Analyzing target job", status: "pending" },
          { label: "Identifying keyword gaps", status: "pending" },
          { label: "Rewriting bullet points", status: "pending" },
          { label: "Optimizing skills section", status: "pending" },
        ];
      case "interview-prep":
        return [
          { label: "Analyzing job requirements", status: "pending" },
          { label: "Generating technical questions", status: "pending" },
          { label: "Generating behavioral questions", status: "pending" },
          { label: "Preparing suggested answers", status: "pending" },
        ];
      case "job-extract":
        return [
          { label: "Fetching job posting", status: "pending" },
          { label: "Extracting key details", status: "pending" },
          { label: "Structuring job data", status: "pending" },
        ];
      case "monitor":
        return [
          { label: "Scanning active applications", status: "pending" },
          { label: "Checking for stale applications", status: "pending" },
          { label: "Analyzing response patterns", status: "pending" },
          { label: "Generating insights", status: "pending" },
        ];
      default:
        return [
          { label: "Processing request", status: "pending" },
          { label: "Analyzing data", status: "pending" },
          { label: "Generating output", status: "pending" },
        ];
    }
  }
}

export { AIAgent };
