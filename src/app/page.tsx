"use client";

import { useSession } from "next-auth/react";
import styled from "styled-components";
import Link from "next/link";
import {
  Briefcase,
  Sparkles,
  FileText,
  Zap,
  ArrowRight,
  TrendingUp,
  Brain,
  Target,
  Eye,
  MessageSquare,
  Search,
  BarChart3,
  Bell,
  Shield,
  CheckCircle2,
  Users,
  Clock,
  Mail,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════
// STYLED COMPONENTS
// ═══════════════════════════════════════════════════

const Page = styled.div`
  min-height: 100vh;
  background: #fff;
  color: #1a1a2e;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

// ── Navigation ────────────────────────────────────

const Nav = styled.nav<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: ${(p) => (p.$scrolled ? "rgba(255,255,255,0.97)" : "#fff")};
  border-bottom: 1px solid ${(p) => (p.$scrolled ? "#e5e7eb" : "transparent")};
  backdrop-filter: ${(p) => (p.$scrolled ? "blur(12px)" : "none")};
  transition: all 0.2s;
`;

const NavInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavLogo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #1a1a2e;
  font-weight: 700;
  font-size: 1.15rem;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: #4b5563;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.15s;

  &:hover {
    color: #1a1a2e;
  }
`;

const NavCTA = styled(Link)`
  background: #1a1a2e;
  color: #fff;
  padding: 0.5rem 1.25rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.2s;

  &:hover {
    background: #2d2d4a;
    transform: translateY(-1px);
  }
`;

const MobileMenuBtn = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: #1a1a2e;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenu = styled.div<{ $open: boolean }>`
  display: ${(p) => (p.$open ? "flex" : "none")};
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;

  a {
    padding: 0.5rem 0;
    color: #4b5563;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9rem;
  }
`;

// ── Hero ──────────────────────────────────────────

const Hero = styled.section`
  padding: 8rem 2rem 5rem;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 6rem 1rem 3rem;
  }
`;

const HeroBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #f0f0ff;
  color: #4f46e5;
  padding: 0.35rem 1rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  border: 1px solid #e0e0ff;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.15;
  margin: 0 0 1.25rem;
  letter-spacing: -0.02em;
  color: #0f0f1a;

  span {
    color: #4f46e5;
  }

  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const HeroSub = styled.p`
  font-size: 1.2rem;
  color: #6b7280;
  line-height: 1.7;
  max-width: 620px;
  margin: 0 auto 2.5rem;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const BtnPrimary = styled(Link)`
  background: #4f46e5;
  color: #fff;
  padding: 0.8rem 2rem;
  border-radius: 0.6rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background: #4338ca;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(79, 70, 229, 0.25);
  }
`;

const BtnSecondary = styled(Link)`
  background: #fff;
  color: #1a1a2e;
  padding: 0.8rem 2rem;
  border-radius: 0.6rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 1.5px solid #d1d5db;
  transition: all 0.2s;

  &:hover {
    border-color: #9ca3af;
    background: #f9fafb;
  }
`;

// ── Section shared ────────────────────────────────

const Section = styled.section<{ $dark?: boolean }>`
  padding: 5rem 2rem;
  background: ${(p) => (p.$dark ? "#f8f9fc" : "#fff")};

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const SectionInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const SectionLabel = styled.p`
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #4f46e5;
  margin: 0 0 0.75rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.25rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0 0 1rem;
  color: #0f0f1a;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const SectionSub = styled.p`
  font-size: 1.05rem;
  color: #6b7280;
  line-height: 1.65;
  max-width: 600px;
  margin: 0 0 3rem;
`;

// ── How It Works ──────────────────────────────────

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 2rem;
`;

const StepCard = styled.div`
  text-align: center;
`;

const StepIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: #f0f0ff;
  color: #4f46e5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
`;

const StepNum = styled.span`
  font-size: 0.7rem;
  font-weight: 700;
  color: #4f46e5;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const StepTitle = styled.h3`
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0.35rem 0 0.5rem;
`;

const StepDesc = styled.p`
  font-size: 0.85rem;
  color: #6b7280;
  line-height: 1.55;
`;

// ── Feature Cards (2-col) ─────────────────────────

const FeatureRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureBlock = styled.div<{ $accent?: string }>`
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  padding: 2rem;
  transition: all 0.2s;

  &:hover {
    border-color: #d1d5db;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  }
`;

const FeatureIcon = styled.div<{ $color: string }>`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: ${(p) => p.$color};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
`;

const FeatureDesc = styled.p`
  font-size: 0.88rem;
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
`;

// ── Capability cards (grid) ───────────────────────

const CapGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.25rem;
`;

const CapCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 0.85rem;
  padding: 1.5rem;
  background: #fff;
  transition: all 0.2s;

  &:hover {
    border-color: #c7d2fe;
    box-shadow: 0 2px 12px rgba(79, 70, 229, 0.06);
  }
`;

const CapHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  margin-bottom: 0.5rem;
`;

const CapIcon = styled.div<{ $bg: string; $fg: string }>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$fg};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const CapTitle = styled.h3`
  font-size: 0.95rem;
  font-weight: 700;
  margin: 0 0 0.25rem;
`;

const CapDesc = styled.p`
  font-size: 0.82rem;
  color: #6b7280;
  line-height: 1.55;
  margin: 0;
`;

// ── Stats bar ─────────────────────────────────────

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  text-align: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const StatVal = styled.p`
  font-size: 2.5rem;
  font-weight: 800;
  color: #4f46e5;
  margin: 0 0 0.25rem;
  letter-spacing: -0.02em;
`;

const StatLabel = styled.p`
  font-size: 0.85rem;
  color: #6b7280;
  margin: 0;
`;

// ── CTA ───────────────────────────────────────────

const CTABox = styled.div`
  background: #0f0f1a;
  border-radius: 1.25rem;
  padding: 3.5rem 2rem;
  text-align: center;
  color: #fff;
`;

const CTATitle = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  margin: 0 0 0.75rem;
  letter-spacing: -0.02em;
`;

const CTASub = styled.p`
  font-size: 1.05rem;
  color: #9ca3af;
  margin: 0 0 2rem;
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #4f46e5;
  color: #fff;
  padding: 0.85rem 2.25rem;
  border-radius: 0.6rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.2s;

  &:hover {
    background: #6366f1;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(79, 70, 229, 0.35);
  }
`;

// ── Footer ────────────────────────────────────────

const Footer = styled.footer`
  padding: 3rem 2rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FooterLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 0.95rem;
`;

const FooterRight = styled.div`
  font-size: 0.8rem;
  color: #9ca3af;
`;

// ═══════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════

export default function HomePage() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dashboardLink = session ? "/dashboard" : "/login";

  return (
    <Page>
      {/* ── Nav ───────────────────────────────── */}
      <Nav $scrolled={scrolled}>
        <NavInner>
          <NavLogo href="/">
            <Briefcase size={24} color="#4f46e5" />
            HuntLog
          </NavLogo>
          <NavLinks>
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#how-it-works">How It Works</NavLink>
            <NavLink href="#ai-capabilities">AI Agents</NavLink>
            <NavCTA href={dashboardLink}>
              {session ? "Dashboard" : "Get Started"}
            </NavCTA>
          </NavLinks>
          <MobileMenuBtn onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </MobileMenuBtn>
        </NavInner>
        <MobileMenu $open={mobileOpen}>
          <a href="#features" onClick={() => setMobileOpen(false)}>Features</a>
          <a href="#how-it-works" onClick={() => setMobileOpen(false)}>How It Works</a>
          <a href="#ai-capabilities" onClick={() => setMobileOpen(false)}>AI Agents</a>
          <NavCTA href={dashboardLink} onClick={() => setMobileOpen(false)}>
            {session ? "Dashboard" : "Get Started"}
          </NavCTA>
        </MobileMenu>
      </Nav>

      {/* ── Hero ──────────────────────────────── */}
      <Hero>
        <HeroBadge>
          <Sparkles size={14} /> AI-Powered
        </HeroBadge>
        <HeroTitle>
          Your <span>AI-Powered</span> Job Hunting Platform
        </HeroTitle>
        <HeroSub>
          Upload your resume once. Let AI agents find matching jobs, prepare tailored applications,
          generate cover letters, and coach you for interviews — while you stay in control and approve
          every step.
        </HeroSub>
        <HeroButtons>
          <BtnPrimary href={dashboardLink}>
            {session ? "Go to Dashboard" : "Start Free"} <ArrowRight size={18} />
          </BtnPrimary>
          <BtnSecondary href="#how-it-works">
            How It Works <ChevronRight size={16} />
          </BtnSecondary>
        </HeroButtons>
      </Hero>

      {/* ── Stats ─────────────────────────────── */}
      <Section $dark>
        <SectionInner>
          <StatsRow>
            <div>
              <StatVal>6</StatVal>
              <StatLabel>AI Agents working for you</StatLabel>
            </div>
            <div>
              <StatVal>5–8</StatVal>
              <StatLabel>Job matches per search</StatLabel>
            </div>
            <div>
              <StatVal>85%</StatVal>
              <StatLabel>Average ATS match improvement</StatLabel>
            </div>
            <div>
              <StatVal>10x</StatVal>
              <StatLabel>Faster than manual applications</StatLabel>
            </div>
          </StatsRow>
        </SectionInner>
      </Section>

      {/* ── How It Works ──────────────────────── */}
      <Section id="how-it-works">
        <SectionInner>
          <SectionLabel>How It Works</SectionLabel>
          <SectionTitle>One platform, end to end</SectionTitle>
          <SectionSub>
            From resume upload to interview preparation — HuntLog's AI agents handle
            the heavy lifting while you make the decisions.
          </SectionSub>
          <StepsGrid>
            <StepCard>
              <StepIcon><FileText size={26} /></StepIcon>
              <StepNum>Step 1</StepNum>
              <StepTitle>Upload Your Resume</StepTitle>
              <StepDesc>
                Drag and drop your PDF or DOCX resume. The AI extracts and
                structures all your experience, skills, and education automatically.
              </StepDesc>
            </StepCard>
            <StepCard>
              <StepIcon><Search size={26} /></StepIcon>
              <StepNum>Step 2</StepNum>
              <StepTitle>AI Finds Matching Jobs</StepTitle>
              <StepDesc>
                Set your preferences and the AI scrapes the best-matching roles,
                scoring each one against your resume with a match percentage.
              </StepDesc>
            </StepCard>
            <StepCard>
              <StepIcon><Sparkles size={26} /></StepIcon>
              <StepNum>Step 3</StepNum>
              <StepTitle>AI Prepares Applications</StepTitle>
              <StepDesc>
                For each job, get a tailored resume, custom cover letter, and
                pre-written screening answers — all ready for your review.
              </StepDesc>
            </StepCard>
            <StepCard>
              <StepIcon><CheckCircle2 size={26} /></StepIcon>
              <StepNum>Step 4</StepNum>
              <StepTitle>You Review &amp; Apply</StepTitle>
              <StepDesc>
                Review every AI-generated document, edit inline, approve what you
                like, and download formatted PDFs to submit with confidence.
              </StepDesc>
            </StepCard>
          </StepsGrid>
        </SectionInner>
      </Section>

      {/* ── AI Capabilities ───────────────────── */}
      <Section id="ai-capabilities" $dark>
        <SectionInner>
          <SectionLabel>AI Agents</SectionLabel>
          <SectionTitle>Six specialized agents, one platform</SectionTitle>
          <SectionSub>
            Each AI agent is purpose-built for a specific task. They work independently
            but share your resume and preferences so you never repeat yourself.
          </SectionSub>
          <CapGrid>
            <CapCard>
              <CapHeader>
                <CapIcon $bg="#eef2ff" $fg="#4f46e5"><Search size={20} /></CapIcon>
                <div>
                  <CapTitle>Job Scraper</CapTitle>
                  <CapDesc>
                    Finds jobs matching your skills and preferences. Returns rich
                    listings with responsibilities, requirements, qualifications,
                    and match scores — so you know exactly why each role fits.
                  </CapDesc>
                </div>
              </CapHeader>
            </CapCard>
            <CapCard>
              <CapHeader>
                <CapIcon $bg="#fef3c7" $fg="#d97706"><Target size={20} /></CapIcon>
                <div>
                  <CapTitle>Resume Optimizer</CapTitle>
                  <CapDesc>
                    Analyzes job descriptions for ATS keywords, then rewrites your
                    resume to incorporate missing terms. Shows a side-by-side diff
                    so you see exactly what changed and why.
                  </CapDesc>
                </div>
              </CapHeader>
            </CapCard>
            <CapCard>
              <CapHeader>
                <CapIcon $bg="#d1fae5" $fg="#059669"><FileText size={20} /></CapIcon>
                <div>
                  <CapTitle>Cover Letter Generator</CapTitle>
                  <CapDesc>
                    Writes personalized cover letters tailored to each role and
                    company. References your specific experience and the job's
                    requirements — every letter is unique.
                  </CapDesc>
                </div>
              </CapHeader>
            </CapCard>
            <CapCard>
              <CapHeader>
                <CapIcon $bg="#ede9fe" $fg="#7c3aed"><Brain size={20} /></CapIcon>
                <div>
                  <CapTitle>Interview Prep Coach</CapTitle>
                  <CapDesc>
                    Generates technical and behavioral questions with STAR-format
                    answers, study topics, and questions to ask the interviewer —
                    all tailored to the specific role and your background.
                  </CapDesc>
                </div>
              </CapHeader>
            </CapCard>
            <CapCard>
              <CapHeader>
                <CapIcon $bg="#fce7f3" $fg="#db2777"><Bell size={20} /></CapIcon>
                <div>
                  <CapTitle>Application Monitor</CapTitle>
                  <CapDesc>
                    Tracks all active applications and flags stale ones, suggests
                    follow-up timing, detects expiring job postings, and drafts
                    follow-up emails for your approval.
                  </CapDesc>
                </div>
              </CapHeader>
            </CapCard>
            <CapCard>
              <CapHeader>
                <CapIcon $bg="#e0f2fe" $fg="#0284c7"><Eye size={20} /></CapIcon>
                <div>
                  <CapTitle>Job Detail Extractor</CapTitle>
                  <CapDesc>
                    Paste any job posting URL and the AI extracts everything:
                    title, company, location, full description, salary range,
                    job type, and seniority level — auto-filling your tracker.
                  </CapDesc>
                </div>
              </CapHeader>
            </CapCard>
          </CapGrid>
        </SectionInner>
      </Section>

      {/* ── Features ──────────────────────────── */}
      <Section id="features">
        <SectionInner>
          <SectionLabel>Features</SectionLabel>
          <SectionTitle>Everything you need to run a professional job search</SectionTitle>
          <SectionSub>
            Beyond AI generation, HuntLog is a complete application tracking system
            that keeps you organized from first contact to offer letter.
          </SectionSub>
          <FeatureRow>
            <FeatureBlock>
              <FeatureIcon $color="#4f46e5"><BarChart3 size={22} /></FeatureIcon>
              <FeatureTitle>Pipeline Dashboard</FeatureTitle>
              <FeatureDesc>
                See every application at a glance with status badges, match scores,
                and key dates. Filter by status, sort by date or score, and never
                lose track of where you stand with any employer.
              </FeatureDesc>
            </FeatureBlock>
            <FeatureBlock>
              <FeatureIcon $color="#059669"><TrendingUp size={22} /></FeatureIcon>
              <FeatureTitle>ATS Keyword Analysis</FeatureTitle>
              <FeatureDesc>
                Every job description is analyzed for hard skills, soft skills,
                tools, qualifications, and buzzwords. Your resume is scored against
                each category so you know exactly what to emphasize.
              </FeatureDesc>
            </FeatureBlock>
            <FeatureBlock>
              <FeatureIcon $color="#d97706"><Clock size={22} /></FeatureIcon>
              <FeatureTitle>Status Tracking</FeatureTitle>
              <FeatureDesc>
                Move applications through 12 statuses from Wishlist to Accepted.
                Track application dates, follow-up reminders, offer deadlines, and
                confirmation receipts all in one place.
              </FeatureDesc>
            </FeatureBlock>
            <FeatureBlock>
              <FeatureIcon $color="#7c3aed"><Shield size={22} /></FeatureIcon>
              <FeatureTitle>Human Approval First</FeatureTitle>
              <FeatureDesc>
                Every piece of AI-generated content goes through your review.
                Edit inline, approve what you like, or regenerate. Nothing gets
                submitted without your explicit sign-off.
              </FeatureDesc>
            </FeatureBlock>
            <FeatureBlock>
              <FeatureIcon $color="#db2777"><Mail size={22} /></FeatureIcon>
              <FeatureTitle>Follow-Up Automation</FeatureTitle>
              <FeatureDesc>
                The monitor agent checks for stale applications (10+ days without
                response), suggests when to follow up, and drafts the email for
                you — reviewed and sent by you, not automatically.
              </FeatureDesc>
            </FeatureBlock>
            <FeatureBlock>
              <FeatureIcon $color="#0284c7"><Users size={22} /></FeatureIcon>
              <FeatureTitle>Interview Management</FeatureTitle>
              <FeatureDesc>
                Schedule interviews, track rounds, store interviewer details,
                and keep notes and feedback. Combined with AI prep questions,
                you walk into every interview ready.
              </FeatureDesc>
            </FeatureBlock>
          </FeatureRow>
        </SectionInner>
      </Section>

      {/* ── CTA ───────────────────────────────── */}
      <Section>
        <SectionInner>
          <CTABox>
            <CTATitle>Ready to land your next role?</CTATitle>
            <CTASub>
              Upload your resume, let the AI agents go to work, and take control
              of your job search — all in one place.
            </CTASub>
            <CTAButton href={dashboardLink}>
              {session ? "Go to Dashboard" : "Get Started Free"} <ArrowRight size={18} />
            </CTAButton>
          </CTABox>
        </SectionInner>
      </Section>

      {/* ── Footer ────────────────────────────── */}
      <Footer>
        <FooterLeft>
          <Briefcase size={18} color="#4f46e5" /> HuntLog
        </FooterLeft>
        <FooterRight>
          AI-powered job hunting. Built for professionals.
        </FooterRight>
      </Footer>
    </Page>
  );
}
