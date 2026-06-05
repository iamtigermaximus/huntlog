"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import {
  FileText, Upload, Plus, Trash2, CheckCircle, Circle,
  Sparkles, Download, Eye, Clock, AlertCircle,
  FileUp, X, Pencil, Save,
} from "lucide-react";
import toast from "react-hot-toast";

const Container = styled.div`
  min-height: 100vh;
  background: #0f172a;
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
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;

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

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.25rem;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.85rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
`;

const FormCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    font-size: 0.8rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.35rem;
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
  min-height: 200px;
  font-family: inherit;
  box-sizing: border-box;

  &:focus { border-color: #667eea; }
`;

const SubmitButton = styled.button`
  padding: 0.6rem 1.5rem;
  background: #0f172a;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;

  &:hover { filter: brightness(1.1); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

const CancelButton = styled.button`
  padding: 0.6rem 1.5rem;
  background: #f3f4f6;
  color: #374151;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  margin-right: 0.5rem;
`;

const ResumeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ResumeCard = styled.div<{ $active: boolean }>`
  background: white;
  border-radius: 0.75rem;
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border: 1px solid ${(props) => (props.$active ? "#667eea" : "#e5e7eb")};
  box-shadow: ${(props) => (props.$active ? "0 0 0 2px rgba(102,126,234,0.2)" : "0 1px 3px rgba(0,0,0,0.08)")};
  transition: all 0.2s;

  &:hover {
    border-color: #667eea;
  }
`;

const ResumeInfo = styled.div`
  flex: 1;
  min-width: 0;

  h4 { font-size: 0.9rem; color: #1f2937; margin-bottom: 0.25rem; }
  p { font-size: 0.7rem; color: #9ca3af; }
`;

const ResumeActions = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const IconButton = styled.button<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.75rem;
  border: 1px solid ${(props) => (props.$danger ? "#fee2e2" : "#e5e7eb")};
  border-radius: 0.5rem;
  background: white;
  cursor: pointer;
  font-size: 0.7rem;
  font-weight: 500;
  color: ${(props) => (props.$danger ? "#ef4444" : "#6b7280")};

  &:hover {
    background: ${(props) => (props.$danger ? "#fef2f2" : "#f3f4f6")};
  }
`;

const ActiveBadge = styled.span`
  font-size: 0.6rem;
  font-weight: 600;
  color: #667eea;
  background: #ede9fe;
  padding: 0.15rem 0.5rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: white;
  background: rgba(255,255,255,0.1);
  border-radius: 1rem;

  h4 { margin-bottom: 0.5rem; }
  p { font-size: 0.85rem; opacity: 0.8; }
`;

const UploadZone = styled.div<{ $dragging: boolean }>`
  border: 2px dashed ${(p) => (p.$dragging ? "#667eea" : "#d1d5db")};
  border-radius: 0.75rem;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  background: ${(p) => (p.$dragging ? "#f0f0ff" : "#fafafa")};
  transition: all 0.2s;
  margin-bottom: 1rem;

  &:hover {
    border-color: #667eea;
    background: #f8f8ff;
  }

  svg { margin-bottom: 0.5rem; }

  p {
    color: #6b7280;
    font-size: 0.85rem;
    margin-top: 0.5rem;
  }

  span {
    color: #667eea;
    font-weight: 600;
    cursor: pointer;
  }
`;

const UploadingStatus = styled.div`
  background: #ede9fe;
  border: 1px solid #c4b5fd;
  border-radius: 0.75rem;
  padding: 1rem;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #6d28d9;
  font-size: 0.85rem;
  font-weight: 500;
`;

const ExtractedPreview = styled.div`
  margin: 1rem 0;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  overflow: hidden;
`;

const PreviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.8rem;
  font-weight: 600;
  color: #374151;
`;

const PreviewContent = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: none;
  font-size: 0.8rem;
  font-family: inherit;
  line-height: 1.6;
  resize: vertical;
  min-height: 200px;
  outline: none;
  box-sizing: border-box;
  color: #374151;

  &:focus {
    box-shadow: inset 0 0 0 2px #667eea;
  }
`;

const TabBar = styled.div`
  display: flex;
  gap: 0;
  margin-bottom: 0;
  border-bottom: 1px solid #e5e7eb;
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  border-bottom: 2px solid ${(p) => (p.$active ? "#667eea" : "transparent")};
  color: ${(p) => (p.$active ? "#667eea" : "#6b7280")};
  font-weight: ${(p) => (p.$active ? "600" : "400")};
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover { color: #667eea; }
`;

interface Resume {
  id: string;
  name: string;
  fileName: string;
  content: string;
  isActive: boolean;
  version: number;
  createdAt: string;
  lastUsed?: string;
}

export default function ResumesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [inputMode, setInputMode] = useState<"upload" | "paste">("upload");
  const [formData, setFormData] = useState({ name: "", content: "" });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [viewing, setViewing] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    else fetchResumes();
  }, [status, router]);

  const fetchResumes = async () => {
    const res = await fetch("/api/resumes");
    const data = await res.json();
    if (Array.isArray(data)) setResumes(data);
  };

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", file.name.replace(/\.[^/.]+$/, ""));

      const res = await fetch("/api/resumes", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Upload failed");
      }

      const saved = await res.json();
      setFormData({ name: saved.name, content: saved.content });
      toast.success(`Extracted ${saved.content.length.toLocaleString()} characters from ${file.name}`);
      setShowForm(false);
      fetchResumes();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to process file");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handlePasteSubmit = async () => {
    if (!formData.name.trim() || !formData.content.trim()) {
      toast.error("Name and content are required");
      return;
    }
    setSaving(true);
    try {
      await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, fileName: formData.name, isActive: resumes.length === 0 }),
      });
      toast.success("Resume saved!");
      setShowForm(false);
      setFormData({ name: "", content: "" });
      fetchResumes();
    } catch {
      toast.error("Failed to save resume");
    } finally {
      setSaving(false);
    }
  };

  const handleSetActive = async (id: string) => {
    await fetch(`/api/resumes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: true }),
    });
    toast.success("Active resume updated");
    fetchResumes();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this resume?")) return;
    await fetch(`/api/resumes/${id}`, { method: "DELETE" });
    toast.success("Resume deleted");
    fetchResumes();
  };

  const startEdit = (r: Resume) => {
    setEditing(r.id);
    setEditContent(r.content);
  };

  const saveEdit = async (id: string) => {
    setSavingEdit(true);
    try {
      await fetch(`/api/resumes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editContent }),
      });
      toast.success("Content updated");
      setEditing(null);
      fetchResumes();
    } catch {
      toast.error("Failed to save changes");
    } finally {
      setSavingEdit(false);
    }
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

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
          <div>
            <h2>
              <FileText size={28} color="white" />
              Resume Manager
            </h2>
            <p>Upload and manage your resumes. Set one as active for AI-powered job matching.</p>
          </div>
          <AddButton onClick={() => setShowForm(true)}>
            <Plus size={18} /> Add Resume
          </AddButton>
        </Header>

        {showForm && (
          <FormCard>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ color: "#1f2937", margin: 0 }}>Add Resume</h3>
              <button
                onClick={() => setShowForm(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: "0.25rem" }}
              >
                <X size={20} />
              </button>
            </div>

            <TabBar>
              <Tab $active={inputMode === "upload"} onClick={() => setInputMode("upload")}>
                <FileUp size={14} style={{ marginRight: "0.35rem", display: "inline" }} />
                Upload File
              </Tab>
              <Tab $active={inputMode === "paste"} onClick={() => setInputMode("paste")}>
                <Pencil size={14} style={{ marginRight: "0.35rem", display: "inline" }} />
                Paste Text
              </Tab>
            </TabBar>

            {inputMode === "upload" ? (
              <div style={{ paddingTop: "1rem" }}>
                <UploadZone
                  $dragging={dragging}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload size={36} color={dragging ? "#667eea" : "#9ca3af"} />
                  <p style={{ fontWeight: 500, color: "#374151" }}>
                    {uploading ? "Processing..." : dragging ? "Drop your resume here" : "Drag & drop your resume file"}
                  </p>
                  <p>
                    {uploading ? "Extracting text..." : "PDF or DOCX, up to 5MB"}
                  </p>
                  {!uploading && (
                    <span onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
                      Browse files
                    </span>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx"
                    style={{ display: "none" }}
                    onChange={handleFileSelect}
                  />
                </UploadZone>
                {uploading && (
                  <UploadingStatus>
                    <Sparkles size={18} />
                    AI is extracting text from your resume...
                  </UploadingStatus>
                )}
              </div>
            ) : (
              <div style={{ paddingTop: "1rem" }}>
                <FormGroup>
                  <label>Resume Name</label>
                  <Input
                    placeholder="e.g. Software Engineer 2026"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Resume Content (paste full text)</label>
                  <Textarea
                    placeholder="Paste your resume text here..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  />
                </FormGroup>
                <div>
                  <SubmitButton onClick={handlePasteSubmit} disabled={saving}>
                    {saving ? "Saving..." : "Save Resume"}
                  </SubmitButton>
                </div>
              </div>
            )}
          </FormCard>
        )}

        {resumes.length === 0 && !showForm ? (
          <EmptyState>
            <Upload size={48} style={{ marginBottom: "1rem", opacity: 0.5 }} />
            <h4>No resumes yet</h4>
            <p>Add your first resume to activate AI job matching.</p>
          </EmptyState>
        ) : (
          <ResumeList>
            {resumes.map((r) => (
              <div key={r.id}>
                <ResumeCard $active={r.isActive}>
                  <ResumeInfo>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <h4>{r.name}</h4>
                      {r.isActive && (
                        <ActiveBadge>
                          <CheckCircle size={10} /> Active
                        </ActiveBadge>
                      )}
                      <span style={{ fontSize: "0.6rem", color: "#9ca3af" }}>v{r.version}</span>
                    </div>
                    <p>Created {formatDate(r.createdAt)} • {r.content.length.toLocaleString()} chars</p>
                  </ResumeInfo>
                  <ResumeActions>
                    <IconButton onClick={() => setViewing(viewing === r.id ? null : r.id)}>
                      <Eye size={12} /> {viewing === r.id ? "Hide" : "View"}
                    </IconButton>
                    <IconButton onClick={() => startEdit(r)}>
                      <Pencil size={12} /> Edit
                    </IconButton>
                    {!r.isActive && (
                      <IconButton onClick={() => handleSetActive(r.id)}>
                        <Sparkles size={12} /> Set Active
                      </IconButton>
                    )}
                    <IconButton onClick={() => handleDelete(r.id)} $danger>
                      <Trash2 size={12} /> Delete
                    </IconButton>
                  </ResumeActions>
                </ResumeCard>
                {viewing === r.id && (
                  <div style={{
                    background: "white", borderRadius: "0 0 0.75rem 0.75rem",
                    padding: "1rem 1.25rem", marginTop: "-0.25rem",
                    border: "1px solid #e5e7eb", borderTop: "none",
                    maxHeight: "300px", overflowY: "auto",
                  }}>
                    <pre style={{ whiteSpace: "pre-wrap", fontSize: "0.8rem", color: "#374151", fontFamily: "inherit" }}>
                      {r.content.slice(0, 1500)}
                      {r.content.length > 1500 && "\n\n... (truncated)"}
                    </pre>
                  </div>
                )}
                {editing === r.id && (
                  <div style={{
                    background: "white", borderRadius: "0 0 0.75rem 0.75rem",
                    padding: "1rem 1.25rem", marginTop: "-0.25rem",
                    border: "1px solid #667eea", borderTop: "none",
                  }}>
                    <PreviewContent
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    />
                    <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                      <SubmitButton onClick={() => saveEdit(r.id)} disabled={savingEdit}>
                        <Save size={14} style={{ marginRight: "0.25rem" }} />
                        {savingEdit ? "Saving..." : "Save Changes"}
                      </SubmitButton>
                      <CancelButton onClick={() => setEditing(null)}>Cancel</CancelButton>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </ResumeList>
        )}
      </MainContent>
    </Container>
  );
}
