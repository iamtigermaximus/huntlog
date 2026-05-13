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
}

export interface ResumeAnalysis {
  matchScore: number;
  missingSkills: string[];
  recommendations: string[];
  strengths: string[];
}
