"use client";

import styled, { keyframes } from "styled-components";
import { Check, Loader2, Clock } from "lucide-react";

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Step = styled.div<{ $status: "done" | "active" | "pending" }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  background: ${(props) =>
    props.$status === "active"
      ? "rgba(102, 126, 234, 0.08)"
      : "transparent"};
  transition: all 0.3s;
`;

const StepIcon = styled.div<{ $status: "done" | "active" | "pending" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${(props) => {
    if (props.$status === "done") return "#10b981";
    if (props.$status === "active") return "#667eea";
    return "#e5e7eb";
  }};
  color: ${(props) => (props.$status === "pending" ? "#9ca3af" : "white")};
  transition: all 0.3s;
`;

const StepLabel = styled.span<{ $status: "done" | "active" | "pending" }>`
  font-size: 0.8rem;
  color: ${(props) => {
    if (props.$status === "active") return "#667eea";
    if (props.$status === "done") return "#374151";
    return "#9ca3af";
  }};
  font-weight: ${(props) => (props.$status === "active" ? "600" : "400")};
  animation: ${(props) => (props.$status === "active" ? pulse : "none")} 1.5s ease-in-out infinite;
`;

const Connector = styled.div<{ $done: boolean }>`
  width: 2px;
  height: 12px;
  background: ${(props) => (props.$done ? "#10b981" : "#e5e7eb")};
  margin-left: 11px;
  transition: background 0.3s;
`;

interface StepData {
  label: string;
  status: "done" | "active" | "pending";
}

interface AIProgressStepsProps {
  steps: StepData[];
}

function StepIconComponent({ status }: { status: "done" | "active" | "pending" }) {
  if (status === "done") return <Check size={12} />;
  if (status === "active") return <Loader2 size={12} className="spin" />;
  return <Clock size={12} />;
}

export default function AIProgressSteps({ steps }: AIProgressStepsProps) {
  return (
    <Wrapper>
      {steps.map((step, i) => (
        <div key={i}>
          <Step $status={step.status}>
            <StepIcon $status={step.status}>
              <StepIconComponent status={step.status} />
            </StepIcon>
            <StepLabel $status={step.status}>{step.label}</StepLabel>
          </Step>
          {i < steps.length - 1 && <Connector $done={step.status === "done"} />}
        </div>
      ))}
    </Wrapper>
  );
}
