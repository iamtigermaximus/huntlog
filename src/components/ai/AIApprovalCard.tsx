"use client";

import { useState } from "react";
import styled from "styled-components";
import { Check, X, RefreshCw, Edit3, FileText, Download, Expand, Minimize } from "lucide-react";
import { generateFormattedResumePDF, generateCoverLetterPDF } from "@/lib/generate-pdf";

const Card = styled.div<{ $status: "pending" | "approved" | "rejected" }>`
  background: white;
  border-radius: 1rem;
  padding: 1.25rem;
  border: 1px solid ${(props) => {
    if (props.$status === "approved") return "#d1fae5";
    if (props.$status === "rejected") return "#fee2e2";
    return "#e5e7eb";
  }};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  h4 {
    font-size: 0.95rem;
    color: #1f2937;
    font-weight: 600;
  }
`;

const StatusPill = styled.span<{ $status: "pending" | "approved" | "rejected" }>`
  font-size: 0.65rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  background: ${(props) => {
    if (props.$status === "approved") return "#d1fae5";
    if (props.$status === "rejected") return "#fee2e2";
    return "#fef3c7";
  }};
  color: ${(props) => {
    if (props.$status === "approved") return "#065f46";
    if (props.$status === "rejected") return "#991b1b";
    return "#92400e";
  }};
`;

const SubLabel = styled.span`
  font-size: 0.7rem;
  color: #9ca3af;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Content = styled.div<{ $expanded: boolean }>`
  color: #374151;
  font-size: 0.8rem;
  margin-bottom: 0.75rem;
  max-height: ${(props) => (props.$expanded ? "none" : "200px")};
  overflow-y: ${(props) => (props.$expanded ? "visible" : "auto")};
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.6;
  border: 1px solid #e5e7eb;
`;

const EditTextarea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 0.75rem;
  border: 2px solid #667eea;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  line-height: 1.6;
  font-family: inherit;
  resize: vertical;
  margin-bottom: 0.75rem;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);
  }
`;

const ExpandButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background: none;
  border: none;
  color: #667eea;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.2rem 0;
  margin-bottom: 0.5rem;

  &:hover {
    color: #5a67d8;
  }
`;

const ContentLength = styled.span`
  font-size: 0.68rem;
  color: #9ca3af;
  margin-left: 0.5rem;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
`;

const ActionButton = styled.button<{ $variant: "approve" | "reject" | "edit" | "secondary" | "pdf" }>`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.75rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  background: ${(props) => {
    switch (props.$variant) {
      case "approve": return "#10b981";
      case "reject": return "#ef4444";
      case "edit": return "#667eea";
      case "pdf": return "#f59e0b";
      default: return "#f3f4f6";
    }
  }};
  color: ${(props) => (props.$variant === "secondary" ? "#374151" : "white")};

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const EditActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

interface AIApprovalCardProps {
  title: string;
  contentType: string;
  content: string;
  status: "pending" | "approved" | "rejected";
  onApprove: () => void;
  onReject: () => void;
  onEdit: (editedContent: string) => void;
  onRegenerate: () => void;
  loading?: boolean;
}

export default function AIApprovalCard({
  title,
  contentType,
  content,
  status,
  onApprove,
  onReject,
  onEdit,
  onRegenerate,
  loading = false,
}: AIApprovalCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(content);
  const longContent = content.length > 500;

  const handleStartEdit = () => {
    setEditValue(content);
    setEditing(true);
  };

  const handleSaveEdit = () => {
    onEdit(editValue);
    setEditing(false);
  };

  const handleCancelEdit = () => {
    setEditValue(content);
    setEditing(false);
  };

  const [downloadingPDF, setDownloadingPDF] = useState(false);

  const handleDownloadPDF = async () => {
    const isResume = contentType.toLowerCase().includes("resume");
    if (isResume) {
      setDownloadingPDF(true);
      try {
        const res = await fetch("/api/ai/parse-resume", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resumeText: content }),
        });
        if (res.ok) {
          const structured = await res.json();
          generateFormattedResumePDF(structured);
        } else {
          // Fallback: generate with whatever we have
          const fallback = { name: "", title: "", contact: {}, summary: content, experience: [], education: [], certifications: [], skills: [] };
          generateFormattedResumePDF(fallback);
        }
      } catch {
        const fallback = { name: "", title: "", contact: {}, summary: content, experience: [], education: [], certifications: [], skills: [] };
        generateFormattedResumePDF(fallback);
      } finally {
        setDownloadingPDF(false);
      }
    } else {
      generateCoverLetterPDF(content);
    }
  };

  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const charCount = content.length;

  return (
    <Card $status={status}>
      <Header>
        <Title>
          <FileText size={16} color="#667eea" />
          <div>
            <SubLabel>{contentType}</SubLabel>
            <h4>{title}</h4>
          </div>
        </Title>
        <StatusPill $status={status}>
          {status === "approved" ? "Approved" : status === "rejected" ? "Rejected" : "Pending Review"}
        </StatusPill>
      </Header>

      {editing ? (
        <>
          <EditTextarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            placeholder="Edit the content..."
          />
          <EditActions>
            <ActionButton $variant="approve" onClick={handleSaveEdit}>
              <Check size={14} /> Save Changes
            </ActionButton>
            <ActionButton $variant="secondary" onClick={handleCancelEdit}>
              <X size={14} /> Cancel
            </ActionButton>
          </EditActions>
        </>
      ) : (
        <>
          <Content $expanded={expanded}>
            {longContent && !expanded ? content.slice(0, 500) + "…" : content}
          </Content>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
            {longContent && (
              <ExpandButton onClick={() => setExpanded(!expanded)}>
                {expanded ? (
                  <><Minimize size={12} /> Show Less</>
                ) : (
                  <><Expand size={12} /> Show Full Content</>
                )}
              </ExpandButton>
            )}
            <ContentLength>
              {wordCount.toLocaleString()} words · {charCount.toLocaleString()} characters
            </ContentLength>
          </div>
        </>
      )}

      <Actions>
        {!editing && status === "pending" && (
          <>
            <ActionButton $variant="approve" onClick={onApprove} disabled={loading}>
              <Check size={14} /> Approve
            </ActionButton>
            <ActionButton $variant="reject" onClick={onReject} disabled={loading}>
              <X size={14} /> Reject
            </ActionButton>
            <ActionButton $variant="edit" onClick={handleStartEdit} disabled={loading}>
              <Edit3 size={14} /> Edit
            </ActionButton>
            <ActionButton $variant="secondary" onClick={onRegenerate} disabled={loading}>
              <RefreshCw size={14} /> Regenerate
            </ActionButton>
            <ActionButton $variant="pdf" onClick={handleDownloadPDF} disabled={downloadingPDF}>
              <Download size={14} /> {downloadingPDF ? "Generating..." : "Download PDF"}
            </ActionButton>
          </>
        )}
        {!editing && status === "approved" && (
          <>
            <ActionButton $variant="pdf" onClick={handleDownloadPDF} disabled={downloadingPDF}>
              <Download size={14} /> {downloadingPDF ? "Generating..." : "Download PDF"}
            </ActionButton>
            <ActionButton $variant="secondary" onClick={handleStartEdit}>
              <Edit3 size={14} /> Edit
            </ActionButton>
            <ActionButton $variant="secondary" onClick={onRegenerate} disabled={loading}>
              <RefreshCw size={14} /> Regenerate
            </ActionButton>
          </>
        )}
        {!editing && status === "rejected" && (
          <>
            <ActionButton $variant="approve" onClick={onApprove} disabled={loading}>
              <Check size={14} /> Approve
            </ActionButton>
            <ActionButton $variant="secondary" onClick={onRegenerate} disabled={loading}>
              <RefreshCw size={14} /> Regenerate
            </ActionButton>
            <ActionButton $variant="pdf" onClick={handleDownloadPDF} disabled={downloadingPDF}>
              <Download size={14} /> {downloadingPDF ? "Generating..." : "Download PDF"}
            </ActionButton>
          </>
        )}
      </Actions>
    </Card>
  );
}
