"use client";

import styled, { keyframes } from "styled-components";
import { Sparkles } from "lucide-react";

const pulse = keyframes`
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
  40% { transform: scale(1); opacity: 1; }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: rgba(15, 23, 42, 0.04);
  border-radius: 0.75rem;
  border: 1px solid rgba(102, 126, 234, 0.15);
`;

const IconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: #0f172a;
  border-radius: 50%;
  animation: ${shimmer} 2s linear infinite;
  background-size: 200% 100%;
`;

const Dots = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const Dot = styled.span<{ $delay: number }>`
  width: 6px;
  height: 6px;
  background: #667eea;
  border-radius: 50%;
  display: inline-block;
  animation: ${pulse} 1.4s ease-in-out infinite;
  animation-delay: ${(props) => props.$delay}s;
`;

const Label = styled.span`
  font-size: 0.8rem;
  color: #667eea;
  font-weight: 500;
`;

interface AIThinkingIndicatorProps {
  label?: string;
}

export default function AIThinkingIndicator({
  label = "AI Agent is thinking",
}: AIThinkingIndicatorProps) {
  return (
    <Wrapper>
      <IconWrapper>
        <Sparkles size={14} color="white" />
      </IconWrapper>
      <Label>{label}</Label>
      <Dots>
        <Dot $delay={0} />
        <Dot $delay={0.2} />
        <Dot $delay={0.4} />
      </Dots>
    </Wrapper>
  );
}
