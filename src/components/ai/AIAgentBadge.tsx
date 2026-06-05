"use client";

import styled, { keyframes } from "styled-components";
import { Sparkles, Brain, Cpu } from "lucide-react";

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 4px rgba(102, 126, 234, 0.3); }
  50% { box-shadow: 0 0 12px rgba(102, 126, 234, 0.6); }
`;

const Badge = styled.div<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.65rem;
  background: ${(props) =>
    props.$active
      ? "rgba(15, 23, 42, 0.06)"
      : "#f3f4f6"};
  border: 1px solid ${(props) => (props.$active ? "#667eea" : "#e5e7eb")};
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 600;
  color: ${(props) => (props.$active ? "#667eea" : "#9ca3af")};
  animation: ${(props) => (props.$active ? glow : "none")} 2s ease-in-out infinite;
  white-space: nowrap;
`;

interface AIAgentBadgeProps {
  active?: boolean;
  model?: string;
}

export default function AIAgentBadge({ active = false, model = "AI" }: AIAgentBadgeProps) {
  return (
    <Badge $active={active}>
      {active ? <Sparkles size={12} /> : <Cpu size={12} />}
      {active ? "AI Active" : "AI"}
    </Badge>
  );
}
