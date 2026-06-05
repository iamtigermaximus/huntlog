"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import styled, { keyframes } from "styled-components";
import {
  Search, MapPin, Briefcase, TrendingUp, Sparkles,
  Calendar, DollarSign, Filter, ArrowUpDown, Zap,
  Target, ChevronRight, Clock, AlertCircle,
  ChevronDown, ListChecks, GraduationCap, FileText,
} from "lucide-react";
import toast from "react-hot-toast";
import { AIScoreCircle, AIThinkingIndicator, AIAgentBadge, AIProgressSteps } from "@/components/ai";

const Container = styled.div`
  min-height: 100vh;
  background: #0f172a;
`;

const MainContent = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.div`
  margin-bottom: 2rem;

  h2 {
    color: white;
    font-size: 1.875rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  p { color: rgba(255,255,255,0.85); }

  @media (max-width: 768px) {
    h2 { font-size: 1.5rem; }
  }
`;

const SearchPanel = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.6rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.85rem;
  outline: none;
  box-sizing: border-box;

  &:focus { border-color: #667eea; }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.6rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.85rem;
  outline: none;
  background: white;

  &:focus { border-color: #667eea; }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.6rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.85rem;
  outline: none;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  box-sizing: border-box;

  &:focus { border-color: #667eea; }
`;

const ScrapeButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  background: #0f172a;
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 1.25rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const JobCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.25rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.08);
  border: 1px solid #e5e7eb;
  transition: all 0.2s;
  animation: ${fadeIn} 0.3s ease-out;
  display: flex;
  gap: 1.25rem;

  &:hover {
    border-color: #667eea;
    box-shadow: 0 8px 20px rgba(0,0,0,0.12);
    transform: translateY(-2px);
  }
`;

const ScoreArea = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const JobInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const JobTitle = styled.h4`
  font-size: 0.95rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
`;

const CompanyName = styled.p`
  color: #667eea;
  font-weight: 500;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
`;

const JobMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const MetaTag = styled.span`
  font-size: 0.65rem;
  padding: 0.15rem 0.5rem;
  background: #f3f4f6;
  border-radius: 9999px;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const MatchReason = styled.p`
  font-size: 0.7rem;
  color: #9ca3af;
  margin-top: 0.5rem;
  line-height: 1.4;
`;

const SkillsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.5rem;
`;

const SkillTag = styled.span`
  font-size: 0.6rem;
  padding: 0.15rem 0.5rem;
  background: rgba(15, 23, 42, 0.05);
  color: #667eea;
  border-radius: 9999px;
  font-weight: 500;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

const ApplyButton = styled.button`
  padding: 0.4rem 1rem;
  background: #0f172a;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  transition: all 0.2s;

  &:hover { filter: brightness(1.1); }
`;

const SecondaryButton = styled.button`
  padding: 0.4rem 1rem;
  background: #f3f4f6;
  color: #374151;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.35rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: rgba(255,255,255,0.1);
  border-radius: 1rem;
  backdrop-filter: blur(10px);
  color: white;

  p { margin-bottom: 1rem; opacity: 0.9; }
`;

const SortRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const ResultsCount = styled.span`
  color: white;
  font-size: 0.85rem;
  opacity: 0.9;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const FilterBtn = styled.button<{ $active: boolean }>`
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid ${(props) => (props.$active ? "white" : "rgba(255,255,255,0.3)")};
  background: ${(props) => (props.$active ? "white" : "transparent")};
  color: ${(props) => (props.$active ? "#667eea" : "white")};
  font-size: 0.7rem;
  font-weight: 500;
  cursor: pointer;
`;

interface JobMatch {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  qualifications: string[];
  matchScore: number;
  matchReason: string;
  topSkills: string[];
  salaryMin?: number;
  salaryMax?: number;
  jobType?: string;
  seniorityLevel?: string;
  source?: string;
  postedDate?: string;
}

const JobDetailSection = styled.div`
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid #f3f4f6;
`;

const DetailHeading = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.7rem;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const DetailList = styled.ul`
  margin: 0;
  padding: 0 0 0 1rem;
  font-size: 0.72rem;
  color: #4b5563;
  line-height: 1.6;

  li { margin-bottom: 0.25rem; }
`;

const DescriptionText = styled.p`
  font-size: 0.75rem;
  color: #4b5563;
  line-height: 1.6;
  white-space: pre-line;
`;

const ExpandButton = styled.button`
  background: none;
  border: none;
  color: #667eea;
  font-size: 0.72rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0;
  margin-top: 0.5rem;

  &:hover { color: #5a67d8; }
`;

export default function JobMatchesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<JobMatch[]>([]);
  const [resumeContent, setResumeContent] = useState("");
  const [preferences, setPreferences] = useState({
    role: "",
    location: "",
    jobType: "",
    seniority: "",
  });
  const [filterScore, setFilterScore] = useState(0);
  const [sortBy, setSortBy] = useState<"score" | "recent">("score");
  const [expandedJobs, setExpandedJobs] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    // Load active resume if available
    fetch("/api/resumes")
      .then((r) => r.json())
      .then((data) => {
        const active = Array.isArray(data) ? data.find((r: { isActive: boolean }) => r.isActive) : null;
        if (active?.content) setResumeContent(active.content);
      })
      .catch(() => {});
  }, []);

  const handleScrape = async () => {
    if (!resumeContent.trim()) {
      toast.error("Please paste your resume text or upload a resume first");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/ai/job-scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeContent, searchPreferences: preferences }),
      });
      const data = await res.json();
      if (data.jobs) {
        setJobs(data.jobs);
        toast.success(`Found ${data.jobs.length} matching jobs!`);
      } else {
        toast.error(data.error || "No jobs found");
      }
    } catch {
      toast.error("Failed to find jobs");
    } finally {
      setLoading(false);
    }
  };

  const filtered = jobs
    .filter((j) => j.matchScore >= filterScore)
    .sort((a, b) => sortBy === "score" ? b.matchScore - a.matchScore : 0);

  const toggleExpand = (id: string) => {
    setExpandedJobs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return null;
    const fmt = (n: number) => `$${(n / 1000).toFixed(0)}k`;
    if (min && max) return `${fmt(min)} - ${fmt(max)}`;
    if (min) return `From ${fmt(min)}`;
    return `Up to ${fmt(max!)}`;
  };

  if (status === "loading") {
    return (
      <Container>
        <MainContent>
          <div style={{ color: "white", textAlign: "center", paddingTop: "3rem" }}>
            Loading...
          </div>
        </MainContent>
      </Container>
    );
  }

  return (
    <Container>
      <MainContent>
        <Header>
          <h2>
            <Sparkles size={28} color="white" />
            AI Job Matcher
          </h2>
          <p>
            AI searches and ranks jobs based on your resume. Higher match scores mean better fit.
          </p>
        </Header>

        <SearchPanel>
          <FormGrid>
            <Input
              placeholder="Role / Job Title (e.g. Software Engineer)"
              value={preferences.role}
              onChange={(e) => setPreferences({ ...preferences, role: e.target.value })}
            />
            <Input
              placeholder="Location (e.g. Remote, San Francisco)"
              value={preferences.location}
              onChange={(e) => setPreferences({ ...preferences, location: e.target.value })}
            />
            <Select
              value={preferences.jobType}
              onChange={(e) => setPreferences({ ...preferences, jobType: e.target.value })}
            >
              <option value="">Any Job Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Contract">Contract</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </Select>
            <Select
              value={preferences.seniority}
              onChange={(e) => setPreferences({ ...preferences, seniority: e.target.value })}
            >
              <option value="">Any Level</option>
              <option value="Entry">Entry Level</option>
              <option value="Junior">Junior</option>
              <option value="Mid-level">Mid-level</option>
              <option value="Senior">Senior</option>
              <option value="Lead">Lead</option>
            </Select>
          </FormGrid>
          <Textarea
            placeholder="Paste your resume text here... (or set an active resume in Resume Manager)"
            value={resumeContent}
            onChange={(e) => setResumeContent(e.target.value)}
          />
          <ScrapeButton onClick={handleScrape} disabled={loading || !resumeContent.trim()}>
            {loading ? <RefreshCwIcon /> : <Search size={18} />}
            {loading ? "AI is searching..." : "Find Matching Jobs"}
          </ScrapeButton>
        </SearchPanel>

        {loading && (
          <div style={{ marginBottom: "1.5rem" }}>
            <AIThinkingIndicator label="AI Job Scraper is searching for matching jobs" />
            <div style={{ marginTop: "1rem" }}>
              <AIProgressSteps steps={[
                { label: "Extracting skills from resume", status: "done" },
                { label: "Generating search queries", status: "done" },
                { label: "Searching for matching jobs", status: "active" },
                { label: "Calculating match scores", status: "pending" },
                { label: "Ranking results", status: "pending" },
              ]} />
            </div>
          </div>
        )}

        {jobs.length > 0 && (
          <>
            <SortRow>
              <ResultsCount>
                {filtered.length} of {jobs.length} jobs | Min match: {filterScore}%
              </ResultsCount>
              <FilterGroup>
                {[0, 60, 70, 80, 90].map((score) => (
                  <FilterBtn
                    key={score}
                    $active={filterScore === score}
                    onClick={() => setFilterScore(score)}
                  >
                    {score === 0 ? "All" : `≥${score}%`}
                  </FilterBtn>
                ))}
              </FilterGroup>
            </SortRow>

            <ResultsGrid>
              {filtered.map((job) => (
                <JobCard key={job.id}>
                  <ScoreArea>
                    <AIScoreCircle score={job.matchScore} size={70} />
                    <AIAgentBadge />
                  </ScoreArea>
                  <JobInfo>
                    <JobTitle>{job.title}</JobTitle>
                    <CompanyName>{job.company}</CompanyName>
                    <JobMeta>
                      {job.location && <MetaTag><MapPin size={10} />{job.location}</MetaTag>}
                      {job.jobType && <MetaTag><Briefcase size={10} />{job.jobType}</MetaTag>}
                      {job.seniorityLevel && <MetaTag><TrendingUp size={10} />{job.seniorityLevel}</MetaTag>}
                      {formatSalary(job.salaryMin, job.salaryMax) && (
                        <MetaTag><DollarSign size={10} />{formatSalary(job.salaryMin, job.salaryMax)}</MetaTag>
                      )}
                      {job.postedDate && <MetaTag><Clock size={10} />{job.postedDate}</MetaTag>}
                    </JobMeta>
                    <MatchReason>{job.matchReason}</MatchReason>
                    <SkillsRow>
                      {job.topSkills.map((skill) => (
                        <SkillTag key={skill}>{skill}</SkillTag>
                      ))}
                    </SkillsRow>
                    <ExpandButton onClick={() => toggleExpand(job.id)}>
                      <ChevronDown size={14} style={{
                        transform: expandedJobs.has(job.id) ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s",
                      }} />
                      {expandedJobs.has(job.id) ? "Hide Details" : "View Job Details"}
                    </ExpandButton>
                    {expandedJobs.has(job.id) && (
                      <JobDetailSection>
                        <DetailHeading>
                          <FileText size={12} /> Description
                        </DetailHeading>
                        <DescriptionText>{job.description}</DescriptionText>

                        {job.responsibilities?.length > 0 && (
                          <>
                            <DetailHeading style={{ marginTop: "0.75rem" }}>
                              <ListChecks size={12} /> Responsibilities
                            </DetailHeading>
                            <DetailList>
                              {job.responsibilities.map((r, i) => (
                                <li key={i}>{r}</li>
                              ))}
                            </DetailList>
                          </>
                        )}

                        {job.requirements?.length > 0 && (
                          <>
                            <DetailHeading style={{ marginTop: "0.75rem" }}>
                              <Target size={12} /> Requirements
                            </DetailHeading>
                            <DetailList>
                              {job.requirements.map((r, i) => (
                                <li key={i}>{r}</li>
                              ))}
                            </DetailList>
                          </>
                        )}

                        {job.qualifications?.length > 0 && (
                          <>
                            <DetailHeading style={{ marginTop: "0.75rem" }}>
                              <GraduationCap size={12} /> Qualifications
                            </DetailHeading>
                            <DetailList>
                              {job.qualifications.map((q, i) => (
                                <li key={i}>{q}</li>
                              ))}
                            </DetailList>
                          </>
                        )}
                      </JobDetailSection>
                    )}
                    <ActionButtons>
                      <ApplyButton onClick={() => router.push(`/job-matches/${job.id}/prepare?title=${encodeURIComponent(job.title)}&company=${encodeURIComponent(job.company)}&desc=${encodeURIComponent(job.description)}&score=${job.matchScore}`)}>
                        <Zap size={14} /> Prepare Application
                      </ApplyButton>
                      <SecondaryButton onClick={() => router.push(`/applications/new?title=${encodeURIComponent(job.title)}&company=${encodeURIComponent(job.company)}`)}>
                        <Target size={14} /> Track Manually
                      </SecondaryButton>
                    </ActionButtons>
                  </JobInfo>
                </JobCard>
              ))}
            </ResultsGrid>
          </>
        )}

        {!loading && jobs.length === 0 && (
          <EmptyState>
            <Search size={48} style={{ marginBottom: "1rem", opacity: 0.5 }} />
            <p>Paste your resume and click "Find Matching Jobs" to start.</p>
            <p style={{ fontSize: "0.8rem", opacity: 0.7 }}>
              AI will analyze your skills and find the best matching positions.
            </p>
          </EmptyState>
        )}
      </MainContent>
    </Container>
  );
}

function RefreshCwIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s linear infinite" }}>
      <path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16" />
    </svg>
  );
}
