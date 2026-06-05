"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import styled, { keyframes } from "styled-components";
import {
  Sparkles,
  Search,
  FileText,
  Calendar,
  Brain,
  Target,
  Shield,
  Send,
  Clock,
  Activity,
  CheckCircle,
  AlertTriangle,
  Zap,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { AIThinkingIndicator, AIAgentBadge, AIScoreCircle } from "@/components/ai";

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

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 5px rgba(102, 126, 234, 0.3); }
  50% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.6); }
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

  p {
    color: rgba(255, 255, 255, 0.85);
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    h2 { font-size: 1.5rem; }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

const AgentCard = styled(Card)`
  cursor: pointer;
  border: 1px solid #e5e7eb;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: #667eea;
    animation: ${glow} 2s ease-in-out infinite;
  }
`;

const AgentIcon = styled.div<{ $color: string }>`
  width: 48px;
  height: 48px;
  border-radius: 0.75rem;
  background: ${(props) => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const AgentTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

const AgentDescription = styled.p`
  color: #6b7280;
  font-size: 0.8rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const AgentAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.75rem;
  border-top: 1px solid #f3f4f6;
`;

const AgentCTA = styled.span`
  color: #667eea;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.35rem;
`;

const ActivityFeed = styled(Card)`
  grid-column: 1 / -1;
  max-height: 400px;
  overflow-y: auto;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div<{ $status: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${(props) => {
    switch (props.$status) {
      case "done": return "#d1fae5";
      case "thinking": return "#ede9fe";
      case "error": return "#fee2e2";
      default: return "#f3f4f6";
    }
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ActivityInfo = styled.div`
  flex: 1;

  .title {
    font-size: 0.8rem;
    font-weight: 600;
    color: #374151;
  }

  .time {
    font-size: 0.7rem;
    color: #9ca3af;
  }
`;

const ActivityStatus = styled.span<{ $status: string }>`
  font-size: 0.65rem;
  font-weight: 600;
  padding: 0.15rem 0.5rem;
  border-radius: 9999px;
  background: ${(props) => {
    switch (props.$status) {
      case "done": return "#d1fae5";
      case "thinking": return "#ede9fe";
      case "error": return "#fee2e2";
      default: return "#f3f4f6";
    }
  }};
  color: ${(props) => {
    switch (props.$status) {
      case "done": return "#065f46";
      case "thinking": return "#5b21b6";
      case "error": return "#991b1b";
      default: return "#6b7280";
    }
  }};
`;

const SectionTitle = styled.h3`
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Badge = styled.span`
  background: rgba(255,255,255,0.2);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const StatRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const StatPill = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 0.75rem;
  padding: 0.75rem 1.25rem;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 500;

  strong {
    font-size: 1.25rem;
  }
`;

interface ActivityLog {
  id: string;
  agentName: string;
  action: string;
  status: "idle" | "thinking" | "done" | "error";
  timestamp: Date;
  details?: string;
}

const agents = [
  {
    key: "job-scraper",
    title: "Job Scraper Agent",
    description: "AI searches and matches jobs based on your resume skills and preferences. Get ranked results with match scores.",
    icon: <Search size={22} color="white" />,
    color: "#0f172a",
    href: "/job-matches",
    cta: "Find Matching Jobs",
  },
  {
    key: "cover-letter",
    title: "Cover Letter Generator",
    description: "AI generates tailored cover letters for each application, highlighting your most relevant achievements.",
    icon: <FileText size={22} color="white" />,
    color: "#10b981",
    href: "/cover-letter-generator",
    cta: "Generate Cover Letter",
  },
  {
    key: "resume-optimizer",
    title: "Resume Optimizer",
    description: "AI tailors your resume for specific jobs, optimizing keywords and highlighting matching experience.",
    icon: <Target size={22} color="white" />,
    color: "#f59e0b",
    href: "/resumes",
    cta: "Optimize Resume",
  },
  {
    key: "interview-prep",
    title: "Interview Prep Agent",
    description: "AI generates role-specific interview questions with suggested answers based on your experience.",
    icon: <Brain size={22} color="white" />,
    color: "#ef4444",
    href: "/interview-prep",
    cta: "Prepare for Interviews",
  },
  {
    key: "job-extractor",
    title: "Job Detail Extractor",
    description: "Paste a job URL and AI extracts all details — title, company, requirements, and auto-fills your application.",
    icon: <Zap size={22} color="white" />,
    color: "#8b5cf6",
    href: "/applications/new",
    cta: "Auto-Fill Application",
  },
  {
    key: "monitor",
    title: "Application Monitor",
    description: "AI monitors your pipeline, detects ghosted applications, suggests follow-ups, and alerts on expiring jobs.",
    icon: <Shield size={22} color="white" />,
    color: "#06b6d4",
    href: "/dashboard",
    cta: "Monitor Pipeline",
  },
];

export default function AIHubPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [stats, setStats] = useState({ active: 0, lastAction: "" });

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    // Simulate recent activity for demo
    setActivities([
      { id: "1", agentName: "Job Scraper", action: "job-scrape", status: "done", timestamp: new Date(Date.now() - 300000), details: "Found 6 matching jobs" },
      { id: "2", agentName: "Cover Letter Generator", action: "cover-letter", status: "done", timestamp: new Date(Date.now() - 900000), details: "Generated cover letter for Senior Developer role" },
      { id: "3", agentName: "Resume Optimizer", action: "resume-optimize", status: "done", timestamp: new Date(Date.now() - 1800000), details: "Optimized resume with 12 keyword improvements" },
      { id: "4", agentName: "Application Monitor", action: "monitor", status: "done", timestamp: new Date(Date.now() - 3600000), details: "Checked 15 applications, 2 need follow-up" },
    ]);
  }, []);

  const getStatusIcon = (status: string) => {
    if (status === "done") return <CheckCircle size={14} color="#10b981" />;
    if (status === "thinking") return <Activity size={14} color="#7c3aed" />;
    if (status === "error") return <AlertTriangle size={14} color="#ef4444" />;
    return <Clock size={14} color="#9ca3af" />;
  };

  const formatTime = (date: Date) => {
    const mins = Math.round((Date.now() - date.getTime()) / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    return `${Math.round(mins / 60)}h ago`;
  };

  if (status === "loading") {
    return (
      <Container>
        <MainContent>
          <div style={{ color: "white", textAlign: "center", paddingTop: "3rem" }}>
            Loading AI Hub...
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
            <Sparkles size={32} color="white" />
            AI Command Center
          </h2>
          <p>
            All AI agents at your command. Each agent is specialized for a specific job hunting task.
          </p>
        </Header>

        <StatRow>
          <StatPill>
            <Activity size={16} />
            <span>Agents: <strong>6</strong></span>
          </StatPill>
          <StatPill>
            <CheckCircle size={16} />
            <span>Ready: <strong>All systems operational</strong></span>
          </StatPill>
          <StatPill>
            <Sparkles size={16} />
            <span>Model: <strong>AI</strong></span>
          </StatPill>
        </StatRow>

        <SectionTitle>
          <Zap size={20} />
          AI Agents
          <Badge>6 agents available</Badge>
        </SectionTitle>

        <Grid>
          {agents.map((agent) => (
            <Link key={agent.key} href={agent.href} style={{ textDecoration: "none" }}>
              <AgentCard>
                <AgentIcon $color={agent.color}>
                  {agent.icon}
                </AgentIcon>
                <AgentTitle>{agent.title}</AgentTitle>
                <AgentDescription>{agent.description}</AgentDescription>
                <AgentAction>
                  <AIAgentBadge active={false} />
                  <AgentCTA>
                    {agent.cta} <ArrowRight size={14} />
                  </AgentCTA>
                </AgentAction>
              </AgentCard>
            </Link>
          ))}
        </Grid>

        <SectionTitle>
          <Clock size={20} />
          Recent AI Activity
        </SectionTitle>

        <ActivityFeed>
          {activities.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2rem", color: "#9ca3af" }}>
              <Activity size={32} style={{ marginBottom: "0.5rem" }} />
              <p>No AI activity yet. Start by using one of the agents above.</p>
            </div>
          ) : (
            activities.map((activity) => (
              <ActivityItem key={activity.id}>
                <ActivityIcon $status={activity.status}>
                  {getStatusIcon(activity.status)}
                </ActivityIcon>
                <ActivityInfo>
                  <div className="title">{activity.agentName}</div>
                  <div className="time">{activity.details}</div>
                </ActivityInfo>
                <div style={{ textAlign: "right" }}>
                  <ActivityStatus $status={activity.status}>
                    {activity.status.toUpperCase()}
                  </ActivityStatus>
                  <div className="time" style={{ marginTop: "0.25rem" }}>
                    {formatTime(activity.timestamp)}
                  </div>
                </div>
              </ActivityItem>
            ))
          )}
        </ActivityFeed>
      </MainContent>
    </Container>
  );
}
