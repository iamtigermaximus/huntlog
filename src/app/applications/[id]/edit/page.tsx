"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import styled from "styled-components";
import Link from "next/link";
import {
  Save,
  ArrowLeft,
  Calendar,
  DollarSign,
  MapPin,
  Link as LinkIcon,
  Briefcase,
  Building,
} from "lucide-react";
import toast from "react-hot-toast";

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
  max-width: 800px;
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

const FormCard = styled.div`
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  @media (max-width: 768px) {
    padding: 1.25rem;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #6b7280;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1.5px solid #e5e7eb;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1.5px solid #e5e7eb;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  min-height: 100px;
  font-family: inherit;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1.5px solid #e5e7eb;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button<{ $variant?: "secondary" }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
  background: ${(props) =>
    props.$variant === "secondary" ? "#e5e7eb" : "#667eea"};
  color: ${(props) => (props.$variant === "secondary" ? "#374151" : "white")};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    background: ${(props) =>
      props.$variant === "secondary" ? "#d1d5db" : "#5a67d8"};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 3rem;
  color: white;
`;

// ============ Component ============
export default function EditApplicationPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: "",
    company: "",
    location: "",
    jobUrl: "",
    salaryMin: "",
    salaryMax: "",
    jobType: "FULL_TIME",
    seniorityLevel: "MID",
    jobDescription: "",
    appliedDate: "",
    status: "APPLIED",
    source: "",
    notes: "",
  });

  const fetchApplication = async () => {
    try {
      const response = await fetch(`/api/applications/${id}`);
      const data = await response.json();

      setFormData({
        jobTitle: data.jobTitle || "",
        company: data.company || "",
        location: data.location || "",
        jobUrl: data.jobUrl || "",
        salaryMin: data.salaryMin?.toString() || "",
        salaryMax: data.salaryMax?.toString() || "",
        jobType: data.jobType || "FULL_TIME",
        seniorityLevel: data.seniorityLevel || "MID",
        jobDescription: data.jobDescription || "",
        appliedDate: data.appliedDate ? data.appliedDate.split("T")[0] : "",
        status: data.status || "APPLIED",
        source: data.source || "",
        notes: data.notes || "",
      });
    } catch (error) {
      console.error("Error fetching application:", error);
      toast.error("Failed to load application");
      router.push("/applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchApplication();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/applications/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          salaryMin: formData.salaryMin ? parseInt(formData.salaryMin) : null,
          salaryMax: formData.salaryMax ? parseInt(formData.salaryMax) : null,
        }),
      });

      if (response.ok) {
        toast.success("Application updated!");
        // Redirect to dashboard after edit
        router.push("/dashboard");
      } else {
        const error = await response.json();
        throw new Error(error.error || "Failed to update");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update application");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <Content>
          <LoadingSpinner>Loading application...</LoadingSpinner>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Content>
        <BackButton href={`/applications/${params.id}`}>
          <ArrowLeft size={18} />
          Back to Application
        </BackButton>

        <FormCard>
          <Title>Edit Application</Title>
          <Subtitle>Update the details of your job application</Subtitle>

          <Form onSubmit={handleSubmit}>
            <FormRow>
              <FormGroup>
                <Label>
                  <Briefcase size={14} />
                  Job Title *
                </Label>
                <Input
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="e.g., Senior Frontend Developer"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <Building size={14} />
                  Company *
                </Label>
                <Input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g., Google"
                  required
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label>
                  <MapPin size={14} />
                  Location
                </Label>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Remote / New York, NY"
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <LinkIcon size={14} />
                  Job URL
                </Label>
                <Input
                  name="jobUrl"
                  value={formData.jobUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label>
                  <DollarSign size={14} />
                  Min Salary
                </Label>
                <Input
                  name="salaryMin"
                  value={formData.salaryMin}
                  onChange={handleChange}
                  placeholder="120000"
                  type="number"
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <DollarSign size={14} />
                  Max Salary
                </Label>
                <Input
                  name="salaryMax"
                  value={formData.salaryMax}
                  onChange={handleChange}
                  placeholder="160000"
                  type="number"
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label>Job Type</Label>
                <Select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                >
                  <option value="FULL_TIME">Full Time</option>
                  <option value="CONTRACT">Contract</option>
                  <option value="REMOTE">Remote</option>
                  <option value="HYBRID">Hybrid</option>
                  <option value="ONSITE">Onsite</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Seniority Level</Label>
                <Select
                  name="seniorityLevel"
                  value={formData.seniorityLevel}
                  onChange={handleChange}
                >
                  <option value="ENTRY">Entry Level</option>
                  <option value="JUNIOR">Junior</option>
                  <option value="MID">Mid Level</option>
                  <option value="SENIOR">Senior</option>
                  <option value="LEAD">Lead</option>
                </Select>
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label>
                  <Calendar size={14} />
                  Applied Date
                </Label>
                <Input
                  name="appliedDate"
                  value={formData.appliedDate}
                  onChange={handleChange}
                  type="date"
                />
              </FormGroup>

              <FormGroup>
                <Label>Status</Label>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="WISHLIST">Wishlist</option>
                  <option value="APPLIED">Applied</option>
                  <option value="REVIEWING">Reviewing</option>
                  <option value="PHONE_SCREEN">Phone Screen</option>
                  <option value="TECHNICAL">Technical</option>
                  <option value="ONSITE">Onsite</option>
                  <option value="OFFER">Offer</option>
                  <option value="REJECTED">Rejected</option>
                </Select>
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label>Source</Label>
              <Select
                name="source"
                value={formData.source}
                onChange={handleChange}
              >
                <option value="">Select source</option>
                <option value="LINKEDIN">LinkedIn</option>
                <option value="INDEED">Indeed</option>
                <option value="COMPANY_WEBSITE">Company Website</option>
                <option value="REFERRAL">Referral</option>
                <option value="OTHER">Other</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Job Description</Label>
              <TextArea
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                placeholder="Paste the job description here"
                rows={5}
              />
            </FormGroup>

            <FormGroup>
              <Label>Notes</Label>
              <TextArea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Interview notes, follow-up reminders, etc..."
                rows={3}
              />
            </FormGroup>

            <ButtonGroup>
              <Button
                type="button"
                $variant="secondary"
                onClick={() => router.push("/dashboard")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                <Save size={18} />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </ButtonGroup>
          </Form>
        </FormCard>
      </Content>
    </Container>
  );
}
