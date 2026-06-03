export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
}

export interface Application {
  id: string;
  userId: string;
  jobTitle: string;
  company: string;
  location?: string;
  jobDescription: string;
  jobUrl?: string;
  salaryMin?: number;
  salaryMax?: number;
  status: string;
  appliedDate: Date;
  jobExpirationDate?: Date;
  matchScore?: number;
  missingSkills?: string;
  recommendations?: string;
  strengths?: string;
  coverLetter?: string;
  confirmationReceived: boolean;
  confirmationNotes?: string;
  notes?: string;
  autoApplied: boolean;
  applicationPackage?: Record<string, unknown>;
  lastMonitoredAt?: Date;
  monitoringNotes?: string;
  followUpDraft?: string;
}

export interface ResumeAnalysis {
  matchScore: number;
  missingSkills: string[];
  recommendations: string[];
  strengths: string[];
}

export interface JobMatch {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  qualifications: string[];
  url?: string;
  salaryMin?: number;
  salaryMax?: number;
  jobType?: string;
  seniorityLevel?: string;
  source?: string;
  postedDate?: string;
  matchScore: number;
  matchReason: string;
  topSkills: string[];
}

export interface ApplicationPackage {
  optimizedResume: string;
  coverLetter: string;
  screeningAnswers: { question: string; answer: string }[];
  matchBreakdown: {
    overallScore: number;
    skillsMatch: string;
    experienceMatch: string;
    educationMatch: string;
    cultureFit: string;
  };
  keyTalkingPoints: string[];
}

export interface InterviewPrepData {
  technicalQuestions: { question: string; suggestedAnswer: string; difficulty: string }[];
  behavioralQuestions: { question: string; suggestedAnswer: string; theme: string }[];
  topicsToStudy: string[];
  questionsToAsk: string[];
  preparationTips: string;
}
