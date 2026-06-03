"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import {
  Brain, Lightbulb, MessageSquare, Code, BookOpen,
  HelpCircle, Sparkles, Target, ChevronDown, ChevronUp,
  Star, ThumbsUp,
} from "lucide-react";
import toast from "react-hot-toast";
import { AIThinkingIndicator, AIAgentBadge, AIProgressSteps } from "@/components/ai";

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
    font-size: 1.875rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  p { color: rgba(255,255,255,0.85); margin-top: 0.5rem; }
`;

const FormPanel = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
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

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.6rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.85rem;
  outline: none;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  box-sizing: border-box;

  &:focus { border-color: #667eea; }
`;

const GenerateBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;

  &:hover { filter: brightness(1.1); transform: translateY(-2px); }
  &:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  color: white;
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const QuestionCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  margin-bottom: 0.75rem;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.08);
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  cursor: pointer;

  &:hover { background: #f9fafb; }
`;

const QuestionText = styled.div`
  font-weight: 600;
  color: #1f2937;
  font-size: 0.9rem;
  flex: 1;
  padding-right: 1rem;
`;

const Difficulty = styled.span<{ $level: string }>`
  font-size: 0.6rem;
  padding: 0.2rem 0.5rem;
  border-radius: 9999px;
  background: ${(props) => {
    if (props.$level === "hard") return "#fee2e2";
    if (props.$level === "medium") return "#fef3c7";
    return "#d1fae5";
  }};
  color: ${(props) => {
    if (props.$level === "hard") return "#991b1b";
    if (props.$level === "medium") return "#92400e";
    return "#065f46";
  }};
  margin-right: 0.5rem;
`;

const Answer = styled.div`
  padding: 0 1.25rem 1rem 1.25rem;
  font-size: 0.8rem;
  color: #374151;
  line-height: 1.6;
  border-top: 1px solid #f3f4f6;
  padding-top: 0.75rem;
`;

const TopicTag = styled.span`
  font-size: 0.7rem;
  padding: 0.35rem 0.75rem;
  background: rgba(255,255,255,0.15);
  color: white;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin: 0.25rem;
`;

const TipsBox = styled.div`
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(10px);
  border-radius: 0.75rem;
  padding: 1.25rem;
  color: white;
  border: 1px solid rgba(255,255,255,0.15);
  line-height: 1.6;
  font-size: 0.85rem;
`;

const AskQuestion = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1rem 1.25rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #667eea;
  font-weight: 500;
`;

interface PrepData {
  technicalQuestions: { question: string; suggestedAnswer: string; difficulty: string }[];
  behavioralQuestions: { question: string; suggestedAnswer: string; theme: string }[];
  topicsToStudy: string[];
  questionsToAsk: string[];
  preparationTips: string;
}

export default function InterviewPrepPage() {
  const { status } = useSession();
  const router = useRouter();
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeContent, setResumeContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PrepData | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    fetch("/api/resumes")
      .then((r) => r.json())
      .then((resumes) => {
        const active = Array.isArray(resumes) ? resumes.find((r: { isActive: boolean }) => r.isActive) : null;
        if (active?.content) setResumeContent(active.content);
      })
      .catch(() => {});
  }, [status, router]);

  const handleGenerate = async () => {
    if (!jobTitle || !company || !jobDescription) {
      toast.error("Job title, company, and job description are required");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/ai/interview-prep", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobTitle, company, jobDescription, resumeContent }),
      });
      if (!res.ok) throw new Error();
      const prep = await res.json();
      setData(prep);
      toast.success("Interview prep generated!");
    } catch {
      toast.error("Failed to generate interview prep");
    } finally {
      setLoading(false);
    }
  };

  const toggle = (key: string) => {
    const next = new Set(expanded);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setExpanded(next);
  };

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
        <Header>
          <h2>
            <Brain size={28} color="white" />
            AI Interview Coach
          </h2>
          <p>AI generates personalized interview prep based on the job description and your resume.</p>
        </Header>

        <FormPanel>
          <FormGrid>
            <Input
              placeholder="Job Title (e.g. Senior Frontend Engineer)"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
            <Input
              placeholder="Company Name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </FormGrid>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#374151", marginBottom: "0.35rem" }}>
              Job Description
            </label>
            <Textarea
              placeholder="Paste the full job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>
          <GenerateBtn onClick={handleGenerate} disabled={loading}>
            {loading ? <Lightbulb size={18} /> : <Sparkles size={18} />}
            {loading ? "AI is generating..." : "Generate Interview Prep"}
          </GenerateBtn>
        </FormPanel>

        {loading && (
          <div style={{ marginBottom: "1.5rem" }}>
            <AIThinkingIndicator label="AI Interview Coach is preparing your materials" />
            <div style={{ marginTop: "1rem" }}>
              <AIProgressSteps steps={[
                { label: "Analyzing job requirements", status: "done" },
                { label: "Generating technical questions", status: "active" },
                { label: "Generating behavioral questions", status: "pending" },
                { label: "Preparing suggested answers", status: "pending" },
              ]} />
            </div>
          </div>
        )}

        {data && (
          <>
            <Section>
              <SectionTitle>
                <Code size={18} /> Technical Questions
              </SectionTitle>
              {data.technicalQuestions.map((q, i) => {
                const key = `tech-${i}`;
                return (
                  <QuestionCard key={key}>
                    <QuestionHeader onClick={() => toggle(key)}>
                      <Difficulty $level={q.difficulty}>{q.difficulty}</Difficulty>
                      <QuestionText>{q.question}</QuestionText>
                      {expanded.has(key) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </QuestionHeader>
                    {expanded.has(key) && (
                      <Answer>
                        <strong style={{ color: "#10b981" }}>Suggested Answer:</strong> {q.suggestedAnswer}
                      </Answer>
                    )}
                  </QuestionCard>
                );
              })}
            </Section>

            <Section>
              <SectionTitle>
                <MessageSquare size={18} /> Behavioral Questions
              </SectionTitle>
              {data.behavioralQuestions.map((q, i) => {
                const key = `beh-${i}`;
                return (
                  <QuestionCard key={key}>
                    <QuestionHeader onClick={() => toggle(key)}>
                      <span style={{ fontSize: "0.6rem", color: "#8b5cf6", fontWeight: 600, marginRight: "0.5rem" }}>
                        {q.theme}
                      </span>
                      <QuestionText>{q.question}</QuestionText>
                      {expanded.has(key) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </QuestionHeader>
                    {expanded.has(key) && (
                      <Answer>
                        <strong style={{ color: "#10b981" }}>STAR Format Answer:</strong> {q.suggestedAnswer}
                      </Answer>
                    )}
                  </QuestionCard>
                );
              })}
            </Section>

            <Section>
              <SectionTitle>
                <BookOpen size={18} /> Topics to Study
              </SectionTitle>
              <div>
                {data.topicsToStudy.map((t, i) => (
                  <TopicTag key={i}>
                    <Star size={10} /> {t}
                  </TopicTag>
                ))}
              </div>
            </Section>

            <Section>
              <SectionTitle>
                <HelpCircle size={18} /> Questions to Ask the Interviewer
              </SectionTitle>
              {data.questionsToAsk.map((q, i) => (
                <AskQuestion key={i}>
                  <ThumbsUp size={14} color="#667eea" />
                  {q}
                </AskQuestion>
              ))}
            </Section>

            <Section>
              <SectionTitle>
                <Lightbulb size={18} /> Personalized Prep Strategy
              </SectionTitle>
              <TipsBox>{data.preparationTips}</TipsBox>
            </Section>
          </>
        )}

        {!data && !loading && (
          <div style={{
            textAlign: "center", padding: "3rem", color: "white",
            background: "rgba(255,255,255,0.1)", borderRadius: "1rem",
          }}>
            <Brain size={48} style={{ marginBottom: "1rem", opacity: 0.5 }} />
            <p>Enter a job description above and AI will generate interview prep material.</p>
          </div>
        )}
      </MainContent>
    </Container>
  );
}
