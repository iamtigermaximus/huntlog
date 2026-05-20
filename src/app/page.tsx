"use client";

import { useSession } from "next-auth/react";
import styled from "styled-components";
import Link from "next/link";
import {
  Briefcase,
  Sparkles,
  BarChart3,
  FileText,
  Zap,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
} from "lucide-react";

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow-x: hidden;
`;

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
  color: white;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 2rem;

  h1 {
    font-size: 2.5rem;
    font-weight: bold;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  max-width: 800px;
  background: linear-gradient(135deg, #fff 0%, #e0d4ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 600px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 4rem;
`;

const PrimaryButton = styled(Link)`
  background: white;
  color: #667eea;
  padding: 0.875rem 2rem;
  border-radius: 0.75rem;
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.2);
  }
`;

const SecondaryButton = styled(Link)`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.875rem 2rem;
  border-radius: 0.75rem;
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto 4rem;
  padding: 0 2rem;
`;

const StatCard = styled.div`
  text-align: center;
  color: white;

  h3 {
    font-size: 2rem;
    font-weight: bold;
  }

  p {
    opacity: 0.8;
    font-size: 0.875rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    gap: 1rem;
  }
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 2rem;
  color: white;
  text-align: center;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.15);
  }

  svg {
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }

  p {
    opacity: 0.8;
    font-size: 0.875rem;
    line-height: 1.5;
  }
`;

const CTASection = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  margin-top: 2rem;

  h2 {
    color: white;
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 2rem;
  }
`;

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <Container>
      <HeroSection>
        <Logo>
          <Briefcase size={40} color="white" />
          <h1>HuntLog</h1>
        </Logo>
        <Title>Track Your Job Hunt Journey</Title>
        <Subtitle>
          AI-powered job application tracking, resume matching, and cover letter
          generation. Land your dream job faster.
        </Subtitle>
        <ButtonGroup>
          <PrimaryButton href={session ? "/dashboard" : "/login"}>
            {session ? "Go to Dashboard" : "Get Started Free"}
            <ArrowRight size={18} />
          </PrimaryButton>
          {!session && <SecondaryButton href="/login">Sign In</SecondaryButton>}
        </ButtonGroup>

        <StatsSection>
          <StatCard>
            <h3>85%</h3>
            <p>Average match score improvement</p>
          </StatCard>
          <StatCard>
            <h3>10x</h3>
            <p>Faster cover letter generation</p>
          </StatCard>
          <StatCard>
            <h3>50+</h3>
            <p>Hours saved per job search</p>
          </StatCard>
        </StatsSection>
      </HeroSection>

      <FeaturesGrid>
        <FeatureCard>
          <Sparkles size={32} />
          <h3>AI Cover Letters</h3>
          <p>
            Generate personalized, professional cover letters tailored to each
            job description in seconds.
          </p>
        </FeatureCard>
        <FeatureCard>
          <TrendingUp size={32} />
          <h3>Resume Matching</h3>
          <p>
            Get AI-powered match scores and identify missing skills to improve
            your applications.
          </p>
        </FeatureCard>
        <FeatureCard>
          <BarChart3 size={32} />
          <h3>Smart Analytics</h3>
          <p>
            Track your response rates, interview success, and optimize your job
            search strategy.
          </p>
        </FeatureCard>
        <FeatureCard>
          <FileText size={32} />
          <h3>Application Tracking</h3>
          <p>
            Keep all your job applications organized with status tracking and
            follow-up reminders.
          </p>
        </FeatureCard>
        <FeatureCard>
          <CheckCircle size={32} />
          <h3>Receipt Tracking</h3>
          <p>
            Never lose track of application confirmations with our receipt
            management system.
          </p>
        </FeatureCard>
        <FeatureCard>
          <Star size={32} />
          <h3>Interview Preparation</h3>
          <p>
            Generate interview questions and track your progress through each
            round.
          </p>
        </FeatureCard>
      </FeaturesGrid>

      <CTASection>
        <h2>Ready to Transform Your Job Search?</h2>
        <p>
          Join thousands of job seekers who landed their dream jobs with HuntLog
        </p>
        <PrimaryButton href={session ? "/dashboard" : "/login"}>
          {session ? "Go to Dashboard" : "Start Free"}
          <ArrowRight size={18} />
        </PrimaryButton>
      </CTASection>
    </Container>
  );
}
