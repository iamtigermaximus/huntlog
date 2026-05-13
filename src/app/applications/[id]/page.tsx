"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import styled from "styled-components";
import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  MapPin,
  DollarSign,
  FileText,
  CheckCircle,
  AlertCircle,
  Trash2,
  Phone,
  Code,
  Users,
  Award,
  Clock,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

// ============ Types ============
interface ApplicationDetail {
  id: string;
  jobTitle: string;
  company: string;
  location: string | null;
  jobDescription: string;
  jobUrl: string | null;
  salaryMin: number | null;
  salaryMax: number | null;
  jobType: string;
  seniorityLevel: string;
  status: string;
  appliedDate: string;
  source: string | null;
  coverLetter: string | null;
  matchScore: number | null;
  missingSkills: string | null;
  recommendations: string | null;
  strengths: string | null;
  confirmationReceived: boolean;
  confirmationNotes: string | null;
  notes: string | null;
}

// ============ Styled Components ============
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  text-decoration: none;
  margin-bottom: 1.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  @media (max-width: 768px) {
    padding: 1.25rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

const TitleSection = styled.div`
  flex: 1;
`;

const JobTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 0.25rem;
`;

const Company = styled.p`
  color: #667eea;
  font-weight: 500;
  font-size: 1rem;
  margin-bottom: 0.25rem;
`;

const Location = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const StatusBadge = styled.span<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  background: ${(props) => {
    switch (props.$status) {
      case "APPLIED":
        return "#e3f2fd";
      case "REVIEWING":
        return "#fff3e0";
      case "PHONE_SCREEN":
        return "#fff3e0";
      case "TECHNICAL":
        return "#f3e5f5";
      case "ONSITE":
        return "#e8eaf6";
      case "OFFER":
        return "#e8f5e9";
      case "REJECTED":
        return "#ffebee";
      default:
        return "#f5f5f5";
    }
  }};
  color: ${(props) => {
    switch (props.$status) {
      case "APPLIED":
        return "#1976d2";
      case "REVIEWING":
        return "#f57c00";
      case "PHONE_SCREEN":
        return "#f57c00";
      case "TECHNICAL":
        return "#7b1fa2";
      case "ONSITE":
        return "#3949ab";
      case "OFFER":
        return "#388e3c";
      case "REJECTED":
        return "#d32f2f";
      default:
        return "#666";
    }
  }};
`;

const Section = styled.div`
  margin-top: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const InfoItem = styled.div`
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 0.75rem;
`;

const InfoLabel = styled.div`
  font-size: 0.7rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const InfoValue = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: #1f2937;
`;

const TextBox = styled.div`
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 0.75rem;
  white-space: pre-wrap;
  font-size: 0.875rem;
  line-height: 1.5;
  color: #374151;
`;

const MatchScoreCircle = styled.div<{ $score: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${(props) => {
    if (props.$score >= 80) return "#10b981";
    if (props.$score >= 60) return "#f59e0b";
    return "#ef4444";
  }};
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
`;

const SkillTag = styled.span<{ $type?: "strength" | "missing" }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  margin: 0.25rem;
  background: ${(props) => {
    if (props.$type === "strength") return "#d1fae5";
    if (props.$type === "missing") return "#fee2e2";
    return "#e5e7eb";
  }};
  color: ${(props) => {
    if (props.$type === "strength") return "#065f46";
    if (props.$type === "missing") return "#991b1b";
    return "#374151";
  }};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const Button = styled.button<{ $variant?: "danger" }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
  background: ${(props) =>
    props.$variant === "danger" ? "#ef4444" : "#667eea"};
  color: white;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    background: ${(props) =>
      props.$variant === "danger" ? "#dc2626" : "#5a67d8"};
  }
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 3rem;
  color: white;
`;

// ============ Modal Components ============
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 1rem;
  width: 90%;
  max-width: 400px;
  overflow: hidden;
  animation: slideIn 0.2s ease-out;

  @keyframes slideIn {
    from {
      transform: scale(0.95);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: #ef4444;
  color: white;
`;

const ModalTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
`;

const ModalMessage = styled.p`
  color: #374151;
  margin-bottom: 1rem;
`;

const ModalJobInfo = styled.div`
  background: #f9fafb;
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;

  .job-title {
    font-weight: 600;
    color: #1f2937;
  }

  .company {
    font-size: 0.875rem;
    color: #667eea;
  }
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
`;

const ModalButton = styled.button<{ $variant?: "danger" | "secondary" }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  background: ${(props) => {
    if (props.$variant === "danger") return "#ef4444";
    if (props.$variant === "secondary") return "#e5e7eb";
    return "#667eea";
  }};
  color: ${(props) => (props.$variant === "secondary" ? "#374151" : "white")};

  &:hover {
    transform: translateY(-1px);
    background: ${(props) => {
      if (props.$variant === "danger") return "#dc2626";
      if (props.$variant === "secondary") return "#d1d5db";
      return "#5a67d8";
    }};
  }
`;

// ============ Helper Functions ============
function getStatusIcon(status: string): React.ReactNode {
  switch (status) {
    case "APPLIED":
      return <Clock size={16} />;
    case "PHONE_SCREEN":
      return <Phone size={16} />;
    case "TECHNICAL":
      return <Code size={16} />;
    case "ONSITE":
      return <Users size={16} />;
    case "OFFER":
      return <Award size={16} />;
    case "REJECTED":
      return <AlertCircle size={16} />;
    default:
      return <Briefcase size={16} />;
  }
}

function getStatusDisplayName(status: string): string {
  switch (status) {
    case "PHONE_SCREEN":
      return "Phone Screen";
    case "APPLIED":
      return "Applied";
    case "REVIEWING":
      return "Reviewing";
    case "TECHNICAL":
      return "Technical";
    case "ONSITE":
      return "Onsite";
    case "OFFER":
      return "Offer";
    case "REJECTED":
      return "Rejected";
    default:
      return status;
  }
}

// ============ Main Component ============
export default function ApplicationDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [application, setApplication] = useState<ApplicationDetail | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const fetchApplication = async (): Promise<void> => {
    try {
      const response = await fetch(`/api/applications/${params.id}`);
      const data: ApplicationDetail = await response.json();
      setApplication(data);
    } catch (error) {
      console.error("Error fetching application:", error);
      toast.error("Failed to load application");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchApplication();
  }, []);

  const handleDelete = async (): Promise<void> => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/applications/${params.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Application deleted successfully!");
        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        toast.error("Failed to delete");
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete");
      setShowDeleteModal(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const handlePrintCoverLetter = (): void => {
    if (!application?.coverLetter) return;

    const printWindow: Window | null = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Cover Letter - ${application.jobTitle} at ${application.company}</title>
        <style>
          body {
            font-family: 'Times New Roman', Georgia, serif;
            font-size: 12pt;
            line-height: 1.6;
            margin: 2cm;
          }
          @page {
            size: A4;
            margin: 2cm;
          }
          pre {
            white-space: pre-wrap;
            font-family: 'Times New Roman', Georgia, serif;
          }
        </style>
      </head>
      <body>
        <pre>${application.coverLetter}</pre>
      </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  if (loading) {
    return (
      <Container>
        <Content>
          <LoadingSpinner>Loading application details...</LoadingSpinner>
        </Content>
      </Container>
    );
  }

  if (!application) {
    return (
      <Container>
        <Content>
          <Card>
            <p style={{ textAlign: "center", color: "#6b7280" }}>
              Application not found
            </p>
            <BackButton
              href="/dashboard"
              style={{ display: "inline-flex", marginTop: "1rem" }}
            >
              <ArrowLeft size={18} />
              Back to Applications
            </BackButton>
          </Card>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Content>
        <BackButton href="/dashboard">
          <ArrowLeft size={18} />
          Back to Applications
        </BackButton>

        <Card>
          <Header>
            <TitleSection>
              <JobTitle>{application.jobTitle}</JobTitle>
              <Company>{application.company}</Company>
              {application.location && (
                <Location>
                  <MapPin size={14} /> {application.location}
                </Location>
              )}
            </TitleSection>
            <StatusBadge $status={application.status}>
              {getStatusIcon(application.status)}{" "}
              {getStatusDisplayName(application.status)}
            </StatusBadge>
          </Header>

          {/* Basic Info Grid */}
          <InfoGrid>
            <InfoItem>
              <InfoLabel>Applied Date</InfoLabel>
              <InfoValue>
                {new Date(application.appliedDate).toLocaleDateString()}
              </InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Job Type</InfoLabel>
              <InfoValue>{application.jobType.replace("_", " ")}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Seniority</InfoLabel>
              <InfoValue>{application.seniorityLevel}</InfoValue>
            </InfoItem>
            {application.salaryMin && application.salaryMax && (
              <InfoItem>
                <InfoLabel>Salary Range</InfoLabel>
                <InfoValue>
                  ${application.salaryMin.toLocaleString()} - $
                  {application.salaryMax.toLocaleString()}
                </InfoValue>
              </InfoItem>
            )}
            {application.source && (
              <InfoItem>
                <InfoLabel>Source</InfoLabel>
                <InfoValue>{application.source}</InfoValue>
              </InfoItem>
            )}
            {application.jobUrl && (
              <InfoItem>
                <InfoLabel>Job Posting</InfoLabel>
                <InfoValue>
                  <a
                    href={application.jobUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Posting ↗
                  </a>
                </InfoValue>
              </InfoItem>
            )}
          </InfoGrid>

          {/* Match Score & AI Analysis */}
          {application.matchScore && application.matchScore > 0 && (
            <Section>
              <SectionTitle>
                <CheckCircle size={16} />
                AI Match Analysis
              </SectionTitle>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <MatchScoreCircle $score={application.matchScore}>
                  {application.matchScore}%
                </MatchScoreCircle>
                <div>
                  <InfoValue>
                    {application.matchScore >= 80
                      ? "Great match! Your resume aligns well with this role."
                      : application.matchScore >= 60
                        ? "Good match. Consider highlighting missing skills."
                        : "Low match. Review the recommendations below."}
                  </InfoValue>
                </div>
              </div>

              {application.strengths && (
                <div style={{ marginBottom: "1rem" }}>
                  <InfoLabel>Strengths</InfoLabel>
                  <div>
                    {application.strengths
                      .split(",")
                      .map((s: string, i: number) => (
                        <SkillTag key={i} $type="strength">
                          {s.trim()}
                        </SkillTag>
                      ))}
                  </div>
                </div>
              )}

              {application.missingSkills && (
                <div>
                  <InfoLabel>Skills to Highlight</InfoLabel>
                  <div>
                    {application.missingSkills
                      .split(",")
                      .map((s: string, i: number) => (
                        <SkillTag key={i} $type="missing">
                          {s.trim()}
                        </SkillTag>
                      ))}
                  </div>
                </div>
              )}

              {application.recommendations && (
                <TextBox style={{ marginTop: "1rem" }}>
                  <InfoLabel>Recommendations</InfoLabel>
                  <InfoValue>{application.recommendations}</InfoValue>
                </TextBox>
              )}
            </Section>
          )}

          {/* Cover Letter */}
          {application.coverLetter && (
            <Section>
              <SectionTitle>
                <FileText size={16} />
                Cover Letter
              </SectionTitle>
              <TextBox>{application.coverLetter}</TextBox>
              <Button
                onClick={handlePrintCoverLetter}
                style={{
                  marginTop: "0.75rem",
                  padding: "0.5rem 1rem",
                  fontSize: "0.75rem",
                }}
              >
                🖨️ Print Cover Letter
              </Button>
            </Section>
          )}

          {/* Confirmation */}
          {application.confirmationReceived && (
            <Section>
              <SectionTitle>
                <CheckCircle size={16} />
                Confirmation Received
              </SectionTitle>
              {application.confirmationNotes && (
                <TextBox>{application.confirmationNotes}</TextBox>
              )}
            </Section>
          )}

          {/* Notes */}
          {application.notes && (
            <Section>
              <SectionTitle>
                <AlertCircle size={16} />
                Notes
              </SectionTitle>
              <TextBox>{application.notes}</TextBox>
            </Section>
          )}

          {/* Job Description */}
          {application.jobDescription && (
            <Section>
              <SectionTitle>
                <Briefcase size={16} />
                Job Description
              </SectionTitle>
              <TextBox>{application.jobDescription}</TextBox>
            </Section>
          )}

          {/* Actions */}
          <ButtonGroup>
            <Button
              onClick={() => router.push(`/applications/${params.id}/edit`)}
            >
              ✏️ Edit Application
            </Button>
            <Button $variant="danger" onClick={() => setShowDeleteModal(true)}>
              <Trash2 size={16} />
              Delete Application
            </Button>
          </ButtonGroup>
        </Card>
      </Content>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <ModalOverlay onClick={() => setShowDeleteModal(false)}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>
                <Trash2 size={18} />
                Delete Application
              </ModalTitle>
              <CloseButton onClick={() => setShowDeleteModal(false)}>
                <X size={18} />
              </CloseButton>
            </ModalHeader>
            <ModalBody>
              <ModalMessage>
                Are you sure you want to delete this application?
              </ModalMessage>
              <ModalJobInfo>
                <div className="job-title">{application.jobTitle}</div>
                <div className="company">{application.company}</div>
              </ModalJobInfo>
              <ModalMessage style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                This action cannot be undone.
              </ModalMessage>
              <ModalButtons>
                <ModalButton
                  $variant="secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </ModalButton>
                <ModalButton
                  $variant="danger"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Yes, Delete"}
                </ModalButton>
              </ModalButtons>
            </ModalBody>
          </ModalContainer>
        </ModalOverlay>
      )}
    </Container>
  );
}
