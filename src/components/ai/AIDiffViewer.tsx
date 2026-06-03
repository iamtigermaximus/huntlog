"use client";

import { useState } from "react";
import styled from "styled-components";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

const Wrapper = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  overflow: hidden;
`;

const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid #e5e7eb;
`;

const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 0.6rem;
  border: none;
  background: ${(props) => (props.$active ? "white" : "#f9fafb")};
  color: ${(props) => (props.$active ? "#667eea" : "#6b7280")};
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 2px solid ${(props) => (props.$active ? "#667eea" : "transparent")};
  transition: all 0.2s;

  &:hover {
    background: white;
  }
`;

const Panels = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.div<{ $side: "left" | "right" }>`
  padding: 1rem;
  border-right: ${(props) => (props.$side === "left" ? "1px solid #e5e7eb" : "none")};

  @media (max-width: 768px) {
    border-right: none;
    border-bottom: ${(props) => (props.$side === "left" ? "1px solid #e5e7eb" : "none")};
  }
`;

const PanelHeader = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  color: ${(props) => props.$color};
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Content = styled.div`
  font-size: 0.8rem;
  color: #374151;
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.5;
  max-height: 400px;
  overflow-y: auto;
`;

const HighlightAdded = styled.span`
  background: #d1fae5;
  color: #065f46;
  padding: 0.1rem 0;
`;

const HighlightRemoved = styled.span`
  background: #fee2e2;
  color: #991b1b;
  text-decoration: line-through;
  padding: 0.1rem 0;
`;

const DiffOnlyToggle = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.6rem;
  margin-bottom: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: white;
  font-size: 0.7rem;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #667eea;
    color: #667eea;
  }
`;

interface AIDiffViewerProps {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  changes?: { type: "added" | "removed"; text: string }[];
}

export default function AIDiffViewer({
  before,
  after,
  beforeLabel = "Original",
  afterLabel = "AI Optimized",
  changes,
}: AIDiffViewerProps) {
  const [view, setView] = useState<"side-by-side" | "unified">("side-by-side");
  const [showOnlyChanges, setShowOnlyChanges] = useState(false);

  const renderUnified = () => {
    if (changes && changes.length > 0 && showOnlyChanges) {
      return (
        <Content>
          {changes.map((change, i) => (
            <div key={i} style={{ marginBottom: "0.25rem" }}>
              {change.type === "added" ? (
                <HighlightAdded>+ {change.text}</HighlightAdded>
              ) : (
                <HighlightRemoved>- {change.text}</HighlightRemoved>
              )}
            </div>
          ))}
        </Content>
      );
    }
    return (
      <Content>
        <div style={{ marginBottom: "0.5rem", color: "#9ca3af" }}>
          --- {beforeLabel}
        </div>
        {before.split("\n").map((line, i) => (
          <div key={i} style={{ color: "#ef4444" }}>
            - {line}
          </div>
        ))}
        <div style={{ margin: "0.5rem 0", color: "#9ca3af" }}>
          +++ {afterLabel}
        </div>
        {after.split("\n").map((line, i) => (
          <div key={i} style={{ color: "#10b981" }}>
            + {line}
          </div>
        ))}
      </Content>
    );
  };

  return (
    <Wrapper>
      <Tabs>
        <Tab $active={view === "side-by-side"} onClick={() => setView("side-by-side")}>
          Side by Side
        </Tab>
        <Tab $active={view === "unified"} onClick={() => setView("unified")}>
          Unified Diff
        </Tab>
      </Tabs>

      {view === "side-by-side" ? (
        <Panels>
          <Panel $side="left">
            <PanelHeader $color="#ef4444">--- {beforeLabel}</PanelHeader>
            <Content>{before}</Content>
          </Panel>
          <Panel $side="right">
            <PanelHeader $color="#10b981">+++ {afterLabel}</PanelHeader>
            <Content>{after}</Content>
          </Panel>
        </Panels>
      ) : (
        <div style={{ padding: "1rem" }}>
          {changes && changes.length > 0 && (
            <DiffOnlyToggle onClick={() => setShowOnlyChanges(!showOnlyChanges)}>
              {showOnlyChanges ? <EyeOff size={12} /> : <Eye size={12} />}
              {showOnlyChanges ? "Show Full" : "Changes Only"}
            </DiffOnlyToggle>
          )}
          {renderUnified()}
        </div>
      )}
    </Wrapper>
  );
}
