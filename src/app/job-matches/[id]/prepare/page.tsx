"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import styled from "styled-components";
import {
  Sparkles, FileText, Mail, MessageSquare, Check, X,
  RefreshCw, ArrowLeft, Send, Target, Award, Download, Copy, Eye,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  AIThinkingIndicator, AIApprovalCard, AIScoreCircle,
  AIDiffViewer, AIProgressSteps, AIAgentBadge,
} from "@/components/ai";
import ResumePreview from "@/components/ResumePreview";
import { generateFormattedResumePDF } from "@/lib/generate-pdf";
import type { StructuredResume } from "@/lib/ai/resume-structure";

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const MainContent = styled.main`
  max-width: 1000px;
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
    font-size: 1.75rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  p { color: rgba(255,255,255,0.85); margin-top: 0.5rem; }
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: rgba(255,255,255,0.15);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  cursor: pointer;
  margin-bottom: 1rem;

  &:hover { background: rgba(255,255,255,0.25); }
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionHeader = styled.h3`
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const GenerateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 0.75rem;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const MatchGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const MatchCard = styled.div`
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(10px);
  border-radius: 0.75rem;
  padding: 1rem;
  color: white;
  border: 1px solid rgba(255,255,255,0.15);
`;

const MatchLabel = styled.div`
  font-size: 0.7rem;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.35rem;
`;

const MatchValue = styled.div`
  font-size: 0.8rem;
  line-height: 1.4;
`;

const FormatBtn = styled.button<{ $primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.85rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  background: ${(p) => (p.$primary ? "#10b981" : "rgba(255,255,255,0.2)")};
  color: white;
  transition: all 0.2s;

  &:hover {
    background: ${(p) => (p.$primary ? "#059669" : "rgba(255,255,255,0.3)")};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ApprovalGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FinalActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
`;

const ActionBtn = styled.button<{ $variant: "primary" | "secondary" | "success" }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  border: none;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  background: ${(props) => {
    if (props.$variant === "success") return "#10b981";
    if (props.$variant === "primary") return "white";
    return "rgba(255,255,255,0.15)";
  }};
  color: ${(props) => (props.$variant === "primary" ? "#667eea" : "white")};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
`;

interface ApplicationPackage {
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

type ApprovalStatus = "pending" | "approved" | "rejected";

export default function PrepareApplicationPage() {
  const { status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const jobTitle = searchParams.get("title") || "Software Engineer";
  const company = searchParams.get("company") || "Tech Company";
  const jobDescription = searchParams.get("desc") || "";
  const matchScore = parseInt(searchParams.get("score") || "0");

  const [loading, setLoading] = useState(false);
  const [pkg, setPkg] = useState<ApplicationPackage | null>(null);
  const [resumeContent, setResumeContent] = useState("");
  const [resumeApproved, setResumeApproved] = useState<ApprovalStatus>("pending");
  const [coverLetterApproved, setCoverLetterApproved] = useState<ApprovalStatus>("pending");
  const [answersApproved, setAnswersApproved] = useState<ApprovalStatus>("pending");
  const [structuredResume, setStructuredResume] = useState<StructuredResume | null>(null);
  const [formattingResume, setFormattingResume] = useState(false);
  const [creatingApplication, setCreatingApplication] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    // Load active resume
    fetch("/api/resumes")
      .then((r) => r.json())
      .then((data) => {
        const active = Array.isArray(data) ? data.find((r: { isActive: boolean }) => r.isActive) : null;
        if (active?.content) setResumeContent(active.content);
      })
      .catch(() => {});
  }, [status, router]);

  const handleGenerate = async () => {
    if (!resumeContent.trim()) {
      toast.error("No resume loaded. Please upload a resume first.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/ai/prepare-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobTitle, company, jobDescription, resumeContent }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setPkg(data);
      toast.success("Application package ready for review!");
    } catch {
      toast.error("Failed to prepare application package");
    } finally {
      setLoading(false);
    }
  };

  const handleFormatResume = async () => {
    const textToParse = pkg?.optimizedResume || resumeContent;
    if (!textToParse) return;
    setFormattingResume(true);
    try {
      const res = await fetch("/api/ai/parse-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText: textToParse }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setStructuredResume(data);
      toast.success("Resume formatted!");
    } catch {
      toast.error("Failed to format resume");
    } finally {
      setFormattingResume(false);
    }
  };

  const handleCreateApplication = async () => {
    if (!pkg) return;
    setCreatingApplication(true);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle,
          company,
          jobDescription,
          matchScore,
          coverLetter: pkg.coverLetter,
          status: "WISHLIST",
          source: "ai-prepared",
          autoApplied: true,
          applicationPackage: {
            optimizedResume: pkg.optimizedResume,
            coverLetter: pkg.coverLetter,
            screeningAnswers: pkg.screeningAnswers,
            matchBreakdown: pkg.matchBreakdown,
            keyTalkingPoints: pkg.keyTalkingPoints,
          },
        }),
      });
      if (!res.ok) throw new Error();
      const app = await res.json();
      toast.success("Application saved to your tracker!");
      router.push(`/applications/${app.id}`);
    } catch {
      toast.error("Failed to save application");
    } finally {
      setCreatingApplication(false);
    }
  };

  const allApproved = resumeApproved === "approved" && coverLetterApproved === "approved" && answersApproved === "approved";

  if (status === "loading") {
    return (
      <Container>
        <MainContent>
          <div style={{ color: "white", textAlign: "center", paddingTop: "3rem" }}>Loading...</div>
        </MainContent>
      </Container>
    );
  }

  return (
    <Container>
      <MainContent>
        <BackButton onClick={() => router.back()}>
          <ArrowLeft size={14} /> Back
        </BackButton>

        <Header>
          <h2>
            <Sparkles size={24} color="white" />
            AI Application Builder
          </h2>
          <p>
            {jobTitle} at {company} {matchScore > 0 && `• ${matchScore}% match`}
          </p>
        </Header>

        {!pkg && !loading && (
          <div style={{ textAlign: "center", padding: "3rem 0" }}>
            <GenerateButton onClick={handleGenerate}>
              <Sparkles size={20} />
              AI, Prepare My Application
            </GenerateButton>
            <p style={{ color: "rgba(255,255,255,0.7)", marginTop: "1rem", fontSize: "0.85rem" }}>
              The AI will generate a tailored resume, cover letter, and screening answers.
              <br />You review and approve everything before submitting.
            </p>
          </div>
        )}

        {loading && (
          <div style={{ marginBottom: "2rem" }}>
            <AIThinkingIndicator label="AI is preparing your application package" />
            <div style={{ marginTop: "1rem" }}>
              <AIProgressSteps steps={[
                { label: "Analyzing job requirements", status: "done" },
                { label: "Optimizing resume for this job", status: "active" },
                { label: "Generating cover letter", status: "pending" },
                { label: "Preparing screening answers", status: "pending" },
                { label: "Compiling application package", status: "pending" },
              ]} />
            </div>
          </div>
        )}

        {pkg && (
          <>
            <Section>
              <SectionHeader>
                <Target size={18} /> Match Breakdown
              </SectionHeader>
              <MatchGrid>
                <MatchCard>
                  <MatchLabel>Overall Score</MatchLabel>
                  <MatchValue style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                    {pkg.matchBreakdown.overallScore}%
                  </MatchValue>
                </MatchCard>
                <MatchCard>
                  <MatchLabel>Skills Match</MatchLabel>
                  <MatchValue>{pkg.matchBreakdown.skillsMatch}</MatchValue>
                </MatchCard>
                <MatchCard>
                  <MatchLabel>Experience</MatchLabel>
                  <MatchValue>{pkg.matchBreakdown.experienceMatch}</MatchValue>
                </MatchCard>
                <MatchCard>
                  <MatchLabel>Culture Fit</MatchLabel>
                  <MatchValue>{pkg.matchBreakdown.cultureFit}</MatchValue>
                </MatchCard>
              </MatchGrid>
            </Section>

            <Section>
              <SectionHeader>
                <FileText size={18} /> Optimized Resume
                <AIAgentBadge active={resumeApproved === "pending"} />
              </SectionHeader>
              {resumeContent && pkg && (
                <AIDiffViewer
                  before={resumeContent}
                  after={pkg.optimizedResume}
                  beforeLabel="Your Resume"
                  afterLabel="AI Optimized"
                />
              )}

              {structuredResume && (
                <div style={{ marginBottom: "0.75rem" }}>
                  <ResumePreview resume={structuredResume} compact />
                </div>
              )}

              <div style={{ marginTop: "0.5rem" }}>
                <AIApprovalCard
                  title="Optimized Resume"
                  contentType="Resume"
                  content={pkg.optimizedResume}
                  status={resumeApproved}
                  onApprove={() => { setResumeApproved("approved"); toast.success("Resume approved!"); }}
                  onReject={() => { setResumeApproved("rejected"); toast.error("Resume rejected"); }}
                  onEdit={(edited) => {
                    setPkg({ ...pkg, optimizedResume: edited });
                    setStructuredResume(null);
                    toast.success("Resume updated!");
                  }}
                  onRegenerate={() => { setStructuredResume(null); handleGenerate(); }}
                  loading={loading}
                />
              </div>

              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                {!structuredResume && (
                  <FormatBtn onClick={handleFormatResume} disabled={formattingResume}>
                    <Eye size={14} />
                    {formattingResume ? "Formatting..." : "Format Resume"}
                  </FormatBtn>
                )}
                {structuredResume && (
                  <FormatBtn onClick={() => setStructuredResume(null)}>
                    <X size={14} /> Hide Formatted View
                  </FormatBtn>
                )}
                {structuredResume && (
                  <FormatBtn $primary onClick={() => {
                    generateFormattedResumePDF(structuredResume, `resume-${company}.pdf`.replace(/\s+/g, "-").toLowerCase());
                    toast.success("PDF downloaded!");
                  }}>
                    <Download size={14} /> Download Formatted PDF
                  </FormatBtn>
                )}
              </div>
            </Section>

            <Section>
              <SectionHeader>
                <Mail size={18} /> Cover Letter
                <AIAgentBadge active={coverLetterApproved === "pending"} />
              </SectionHeader>
              <AIApprovalCard
                title={`Cover Letter for ${company}`}
                contentType="Cover Letter"
                content={pkg.coverLetter}
                status={coverLetterApproved}
                onApprove={() => { setCoverLetterApproved("approved"); toast.success("Cover letter approved!"); }}
                onReject={() => { setCoverLetterApproved("rejected"); toast.error("Cover letter rejected"); }}
                onEdit={(edited) => { setPkg({ ...pkg, coverLetter: edited }); toast.success("Cover letter updated!"); }}
                onRegenerate={handleGenerate}
                loading={loading}
              />
            </Section>

            <Section>
              <SectionHeader>
                <MessageSquare size={18} /> Screening Answers
                <AIAgentBadge active={answersApproved === "pending"} />
              </SectionHeader>
              <ApprovalGrid>
                {pkg.screeningAnswers.map((qa, i) => (
                  <AIApprovalCard
                    key={i}
                    title={qa.question}
                    contentType={`Screening Q${i + 1}`}
                    content={qa.answer}
                    status={answersApproved}
                    onApprove={() => { setAnswersApproved("approved"); toast.success("Answers approved!"); }}
                    onReject={() => { setAnswersApproved("rejected"); toast.error("Answers rejected"); }}
                    onEdit={(edited) => {
                      const updated = [...pkg.screeningAnswers];
                      updated[i] = { ...updated[i], answer: edited };
                      setPkg({ ...pkg, screeningAnswers: updated });
                      toast.success("Answer updated!");
                    }}
                    onRegenerate={handleGenerate}
                    loading={loading}
                  />
                ))}
              </ApprovalGrid>
            </Section>

            {allApproved && (
              <FinalActions>
                <ActionBtn $variant="success" onClick={handleCreateApplication} disabled={creatingApplication}>
                  <Check size={18} /> {creatingApplication ? "Saving..." : "All Approved — Track Application"}
                </ActionBtn>
                <ActionBtn $variant="primary" onClick={() => { navigator.clipboard.writeText(pkg.coverLetter); toast.success("Cover letter copied!"); }}>
                  <Copy size={18} /> Copy Cover Letter
                </ActionBtn>
                <ActionBtn $variant="secondary" onClick={() => { navigator.clipboard.writeText(pkg.optimizedResume); toast.success("Resume copied!"); }}>
                  <Download size={18} /> Copy Resume
                </ActionBtn>
              </FinalActions>
            )}

            {!allApproved && (
              <FinalActions>
                <ActionBtn $variant="primary" onClick={() => {
                  setResumeApproved("approved");
                  setCoverLetterApproved("approved");
                  setAnswersApproved("approved");
                  toast.success("All items approved!");
                }}>
                  <Check size={18} /> Approve All
                </ActionBtn>
                <ActionBtn $variant="secondary" onClick={handleGenerate}>
                  <RefreshCw size={18} /> Regenerate All
                </ActionBtn>
              </FinalActions>
            )}
          </>
        )}
      </MainContent>
    </Container>
  );
}
