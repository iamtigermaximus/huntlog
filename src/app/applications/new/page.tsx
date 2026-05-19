// "use client";

// import { useState, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import styled from "styled-components";
// import {
//   Wand2,
//   Save,
//   ArrowLeft,
//   Upload,
//   X,
//   FileText,
//   AlertCircle,
//   CheckCircle,
//   TrendingUp,
//   Loader2,
//   Calendar,
//   DollarSign,
//   MapPin,
//   Link as LinkIcon,
// } from "lucide-react";
// import toast from "react-hot-toast";
// import Link from "next/link";
// import { useDropzone } from "react-dropzone";

// const Container = styled.div`
//   min-height: 100vh;
//   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//   padding: 2rem;

//   @media (max-width: 768px) {
//     padding: 1rem;
//   }
// `;

// const Content = styled.div`
//   max-width: 900px;
//   margin: 0 auto;
// `;

// const BackButton = styled(Link)`
//   display: inline-flex;
//   align-items: center;
//   gap: 0.5rem;
//   color: white;
//   text-decoration: none;
//   margin-bottom: 1.5rem;
//   padding: 0.5rem 1rem;
//   background: rgba(255, 255, 255, 0.2);
//   border-radius: 0.5rem;
//   transition: all 0.2s;

//   &:hover {
//     background: rgba(255, 255, 255, 0.3);
//   }
// `;

// const FormCard = styled.div`
//   background: white;
//   border-radius: 1.5rem;
//   padding: 2rem;
//   box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

//   @media (max-width: 768px) {
//     padding: 1.25rem;
//     border-radius: 1rem;
//   }
// `;

// const Title = styled.h1`
//   font-size: 1.5rem;
//   font-weight: bold;
//   color: #1f2937;
//   margin-bottom: 0.5rem;
// `;

// const Subtitle = styled.p`
//   color: #6b7280;
//   margin-bottom: 1.5rem;
//   font-size: 0.875rem;
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: 1.25rem;
// `;

// const FormRow = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 1rem;

//   @media (max-width: 640px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const FormGroup = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
// `;

// const Label = styled.label`
//   font-weight: 600;
//   color: #374151;
//   font-size: 0.875rem;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
// `;

// const Input = styled.input`
//   padding: 0.75rem;
//   border: 1.5px solid #e5e7eb;
//   border-radius: 0.75rem;
//   font-size: 0.875rem;
//   transition: all 0.2s;

//   &:focus {
//     outline: none;
//     border-color: #667eea;
//     box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
//   }
// `;

// const TextArea = styled.textarea`
//   padding: 0.75rem;
//   border: 1.5px solid #e5e7eb;
//   border-radius: 0.75rem;
//   font-size: 0.875rem;
//   min-height: 150px;
//   font-family: inherit;
//   resize: vertical;

//   &:focus {
//     outline: none;
//     border-color: #667eea;
//     box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
//   }
// `;

// const Select = styled.select`
//   padding: 0.75rem;
//   border: 1.5px solid #e5e7eb;
//   border-radius: 0.75rem;
//   font-size: 0.875rem;
//   background: white;
//   cursor: pointer;

//   &:focus {
//     outline: none;
//     border-color: #667eea;
//   }
// `;

// const CheckboxGroup = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.75rem;
//   padding: 0.5rem 0;
// `;

// const Checkbox = styled.input`
//   width: 1.125rem;
//   height: 1.125rem;
//   cursor: pointer;
// `;

// const DropzoneContainer = styled.div<{ $isDragActive: boolean }>`
//   border: 2px dashed ${(props) => (props.$isDragActive ? "#667eea" : "#e5e7eb")};
//   border-radius: 0.75rem;
//   padding: 1.5rem;
//   text-align: center;
//   cursor: pointer;
//   transition: all 0.2s;
//   background: ${(props) => (props.$isDragActive ? "#f3f4f6" : "white")};

//   &:hover {
//     border-color: #667eea;
//     background: #f9fafb;
//   }
// `;

// const ResumeInfo = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   background: #f3f4f6;
//   padding: 0.75rem;
//   border-radius: 0.75rem;
//   margin-top: 0.5rem;
// `;

// const RemoveResumeButton = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   color: #ef4444;
//   padding: 0.25rem;
// `;

// const ButtonGroup = styled.div`
//   display: flex;
//   gap: 1rem;
//   margin-top: 1rem;
//   flex-wrap: wrap;
// `;

// const Button = styled.button<{
//   $variant?: "primary" | "secondary" | "success";
// }>`
//   padding: 0.75rem 1.5rem;
//   border: none;
//   border-radius: 0.75rem;
//   font-weight: 600;
//   font-size: 0.875rem;
//   cursor: pointer;
//   display: inline-flex;
//   align-items: center;
//   gap: 0.5rem;
//   transition: all 0.2s;

//   background: ${(props) => {
//     if (props.$variant === "secondary") return "#f3f4f6";
//     if (props.$variant === "success") return "#10b981";
//     return "#667eea";
//   }};
//   color: ${(props) => {
//     if (props.$variant === "secondary") return "#374151";
//     return "white";
//   }};

//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
//     background: ${(props) => {
//       if (props.$variant === "secondary") return "#e5e7eb";
//       if (props.$variant === "success") return "#059669";
//       return "#5a67d8";
//     }};
//   }

//   &:disabled {
//     opacity: 0.5;
//     cursor: not-allowed;
//     transform: none;
//   }
// `;

// const AnalysisCard = styled.div`
//   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//   color: white;
//   padding: 1.25rem;
//   border-radius: 1rem;
//   margin-top: 1rem;
// `;

// const MatchScoreDisplay = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-bottom: 1rem;
//   flex-wrap: wrap;
//   gap: 1rem;
// `;

// const ScoreCircle = styled.div<{ $score: number }>`
//   width: 80px;
//   height: 80px;
//   border-radius: 50%;
//   background: rgba(255, 255, 255, 0.2);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 2rem;
//   font-weight: bold;
//   border: 3px solid
//     ${(props) => {
//       if (props.$score >= 80) return "#10b981";
//       if (props.$score >= 60) return "#f59e0b";
//       return "#ef4444";
//     }};
// `;

// const SkillsList = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 0.5rem;
//   margin-top: 0.5rem;
// `;

// const SkillTag = styled.span<{ $type: "missing" | "strength" }>`
//   padding: 0.25rem 0.75rem;
//   border-radius: 9999px;
//   font-size: 0.7rem;
//   background: ${(props) =>
//     props.$type === "missing" ? "rgba(239,68,68,0.2)" : "rgba(16,185,129,0.2)"};
//   color: white;
// `;

// const CoverLetterSection = styled.div`
//   margin-top: 1rem;
//   padding: 1rem;
//   background: #f7f9fc;
//   border-radius: 0.75rem;
//   border-left: 4px solid #10b981;
// `;

// export default function NewApplicationPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [generating, setGenerating] = useState(false);
//   const [analyzing, setAnalyzing] = useState(false);
//   const [coverLetter, setCoverLetter] = useState("");
//   const [analysis, setAnalysis] = useState<null | {
//     matchScore: number;
//     missingSkills: string[];
//     recommendations: string[];
//     strengths: string[];
//   }>(null);
//   const [resumeFile, setResumeFile] = useState<File | null>(null);
//   const [resumeContent, setResumeContent] = useState("");

//   const [formData, setFormData] = useState({
//     jobTitle: "",
//     company: "",
//     location: "",
//     jobDescription: "",
//     jobUrl: "",
//     salaryMin: "",
//     salaryMax: "",
//     jobType: "FULL_TIME",
//     seniorityLevel: "MID",
//     jobExpirationDate: "",
//     source: "",
//     confirmationReceived: false,
//     confirmationNotes: "",
//     notes: "",
//     status: "APPLIED",
//   });

//   const onDrop = useCallback(async (acceptedFiles: File[]) => {
//     const file = acceptedFiles[0];
//     if (!file) return;

//     try {
//       if (file.type === "text/plain") {
//         const text = await file.text();
//         setResumeFile(file);
//         setResumeContent(text);
//         toast.success("Resume uploaded successfully!");
//       } else if (file.type === "application/pdf") {
//         // Send to server for parsing
//         const formData = new FormData();
//         formData.append("file", file);

//         const response = await fetch("/api/parse-pdf", {
//           method: "POST",
//           body: formData,
//         });

//         const data = await response.json();
//         if (data.text) {
//           setResumeFile(file);
//           setResumeContent(data.text);
//           toast.success("Resume uploaded and parsed!");
//         } else {
//           throw new Error("Failed to parse PDF");
//         }
//       } else {
//         toast.error("Please upload PDF or TXT file");
//       }
//     } catch (error) {
//       console.error("Upload error:", error);
//       toast.error("Failed to parse resume");
//     }
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       "application/pdf": [".pdf"],
//       "text/plain": [".txt"],
//     },
//     maxFiles: 1,
//   });

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >,
//   ) => {
//     const { name, value, type } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]:
//         type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
//     }));
//   };

//   const analyzeResume = async () => {
//     if (!formData.jobDescription || !resumeContent) {
//       toast.error("Please provide job description and upload your resume");
//       return;
//     }

//     setAnalyzing(true);
//     try {
//       const response = await fetch("/api/resume-match", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           jobDescription: formData.jobDescription,
//           resumeContent: resumeContent,
//         }),
//       });

//       const data = await response.json();
//       if (data.matchScore !== undefined) {
//         setAnalysis({
//           matchScore: data.matchScore,
//           missingSkills: data.missingSkills || [],
//           recommendations: data.recommendations || [],
//           strengths: data.strengths || [],
//         });
//         toast.success(`Match score: ${data.matchScore}%`);
//       }
//     } catch (error) {
//       toast.error("Failed to analyze resume");
//     } finally {
//       setAnalyzing(false);
//     }
//   };

//   const generateAICoverLetter = async () => {
//     if (!formData.jobDescription || !resumeContent) {
//       toast.error("Please provide job description and upload your resume");
//       return;
//     }

//     setGenerating(true);
//     try {
//       const response = await fetch("/api/coverletter", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           jobDescription: formData.jobDescription,
//           resumeContent: resumeContent,
//           company: formData.company,
//           jobTitle: formData.jobTitle,
//           strengths: analysis?.strengths || [],
//         }),
//       });

//       const data = await response.json();
//       if (data.coverLetter) {
//         setCoverLetter(data.coverLetter);
//         toast.success("Cover letter generated!");
//       }
//     } catch (error) {
//       toast.error("Failed to generate cover letter");
//     } finally {
//       setGenerating(false);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch("/api/applications", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...formData,
//           coverLetter,
//           matchScore: analysis?.matchScore,
//           missingSkills: analysis?.missingSkills.join(", "),
//           recommendations: analysis?.recommendations.join(", "),
//           strengths: analysis?.strengths.join(", "),
//         }),
//       });

//       if (response.ok) {
//         toast.success("Application saved successfully!");
//         router.push("/dashboard");
//       } else {
//         throw new Error("Failed to save");
//       }
//     } catch (error) {
//       toast.error("Failed to save application");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container>
//       <Content>
//         <BackButton href="/dashboard">
//           <ArrowLeft size={18} />
//           Back to Dashboard
//         </BackButton>

//         <FormCard>
//           <Title>Add New Application</Title>
//           <Subtitle>
//             Track your job application and get AI-powered insights
//           </Subtitle>

//           <Form onSubmit={handleSubmit}>
//             <FormRow>
//               <FormGroup>
//                 <Label>Job Title *</Label>
//                 <Input
//                   name="jobTitle"
//                   value={formData.jobTitle}
//                   onChange={handleChange}
//                   required
//                   placeholder="e.g., Senior Frontend Developer"
//                 />
//               </FormGroup>

//               <FormGroup>
//                 <Label>Company *</Label>
//                 <Input
//                   name="company"
//                   value={formData.company}
//                   onChange={handleChange}
//                   required
//                   placeholder="e.g., TechCorp"
//                 />
//               </FormGroup>
//             </FormRow>

//             <FormRow>
//               <FormGroup>
//                 <Label>
//                   <MapPin size={14} /> Location
//                 </Label>
//                 <Input
//                   name="location"
//                   value={formData.location}
//                   onChange={handleChange}
//                   placeholder="Remote / New York, NY"
//                 />
//               </FormGroup>

//               <FormGroup>
//                 <Label>
//                   <LinkIcon size={14} /> Job URL
//                 </Label>
//                 <Input
//                   name="jobUrl"
//                   value={formData.jobUrl}
//                   onChange={handleChange}
//                   placeholder="https://..."
//                 />
//               </FormGroup>
//             </FormRow>

//             <FormRow>
//               <FormGroup>
//                 <Label>
//                   <DollarSign size={14} /> Salary Range
//                 </Label>
//                 <div style={{ display: "flex", gap: "0.5rem" }}>
//                   <Input
//                     name="salaryMin"
//                     value={formData.salaryMin}
//                     onChange={handleChange}
//                     placeholder="Min"
//                     type="number"
//                   />
//                   <Input
//                     name="salaryMax"
//                     value={formData.salaryMax}
//                     onChange={handleChange}
//                     placeholder="Max"
//                     type="number"
//                   />
//                 </div>
//               </FormGroup>

//               <FormGroup>
//                 <Label>
//                   <Calendar size={14} /> Job Expiration Date
//                 </Label>
//                 <Input
//                   name="jobExpirationDate"
//                   value={formData.jobExpirationDate}
//                   onChange={handleChange}
//                   type="date"
//                 />
//               </FormGroup>
//             </FormRow>

//             <FormRow>
//               <FormGroup>
//                 <Label>Job Type</Label>
//                 <Select
//                   name="jobType"
//                   value={formData.jobType}
//                   onChange={handleChange}
//                 >
//                   <option value="FULL_TIME">Full Time</option>
//                   <option value="CONTRACT">Contract</option>
//                   <option value="REMOTE">Remote</option>
//                   <option value="HYBRID">Hybrid</option>
//                   <option value="ONSITE">Onsite</option>
//                 </Select>
//               </FormGroup>

//               <FormGroup>
//                 <Label>Seniority Level</Label>
//                 <Select
//                   name="seniorityLevel"
//                   value={formData.seniorityLevel}
//                   onChange={handleChange}
//                 >
//                   <option value="ENTRY">Entry Level</option>
//                   <option value="JUNIOR">Junior</option>
//                   <option value="MID">Mid Level</option>
//                   <option value="SENIOR">Senior</option>
//                   <option value="LEAD">Lead</option>
//                 </Select>
//               </FormGroup>
//             </FormRow>

//             <FormGroup>
//               <Label>Upload Resume (PDF/TXT)</Label>
//               <div {...getRootProps()}>
//                 <input {...getInputProps()} />
//                 <DropzoneContainer $isDragActive={isDragActive}>
//                   <Upload
//                     size={32}
//                     style={{ marginBottom: "0.5rem", color: "#9ca3af" }}
//                   />
//                   {isDragActive ? (
//                     <p>Drop your resume here...</p>
//                   ) : (
//                     <p>Drag & drop your resume, or click to select</p>
//                   )}
//                   <p
//                     style={{
//                       fontSize: "0.7rem",
//                       color: "#9ca3af",
//                       marginTop: "0.5rem",
//                     }}
//                   >
//                     Supports PDF, TXT
//                   </p>
//                 </DropzoneContainer>
//               </div>
//               {resumeFile && (
//                 <ResumeInfo>
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "0.5rem",
//                     }}
//                   >
//                     <FileText size={16} />
//                     <span style={{ fontSize: "0.875rem" }}>
//                       {resumeFile.name}
//                     </span>
//                   </div>
//                   <RemoveResumeButton
//                     onClick={() => {
//                       setResumeFile(null);
//                       setResumeContent("");
//                     }}
//                   >
//                     <X size={16} />
//                   </RemoveResumeButton>
//                 </ResumeInfo>
//               )}
//             </FormGroup>

//             <FormGroup>
//               <Label>Job Description *</Label>
//               <TextArea
//                 name="jobDescription"
//                 value={formData.jobDescription}
//                 onChange={handleChange}
//                 required
//                 placeholder="Paste the full job description here..."
//                 rows={8}
//               />
//             </FormGroup>

//             {formData.jobDescription && resumeContent && (
//               <ButtonGroup>
//                 <Button
//                   type="button"
//                   onClick={analyzeResume}
//                   disabled={analyzing}
//                 >
//                   {analyzing ? (
//                     <Loader2 size={18} className="spinner" />
//                   ) : (
//                     <TrendingUp size={18} />
//                   )}
//                   {analyzing ? "Analyzing..." : "Analyze Resume Match"}
//                 </Button>
//                 <Button
//                   type="button"
//                   $variant="success"
//                   onClick={generateAICoverLetter}
//                   disabled={generating}
//                 >
//                   {generating ? (
//                     <Loader2 size={18} className="spinner" />
//                   ) : (
//                     <Wand2 size={18} />
//                   )}
//                   {generating ? "Generating..." : "Generate Cover Letter"}
//                 </Button>
//               </ButtonGroup>
//             )}

//             {analysis && (
//               <AnalysisCard>
//                 <MatchScoreDisplay>
//                   <div>
//                     <div style={{ fontSize: "0.875rem", opacity: 0.9 }}>
//                       Match Score
//                     </div>
//                     <ScoreCircle $score={analysis.matchScore}>
//                       {analysis.matchScore}%
//                     </ScoreCircle>
//                   </div>
//                   <div style={{ flex: 1 }}>
//                     <div
//                       style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}
//                     >
//                       <CheckCircle
//                         size={14}
//                         style={{ display: "inline", marginRight: "0.25rem" }}
//                       />
//                       Strengths
//                     </div>
//                     <SkillsList>
//                       {analysis.strengths.slice(0, 3).map((s, i) => (
//                         <SkillTag key={i} $type="strength">
//                           {s}
//                         </SkillTag>
//                       ))}
//                     </SkillsList>
//                   </div>
//                 </MatchScoreDisplay>

//                 <div style={{ marginTop: "1rem" }}>
//                   <div style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
//                     <AlertCircle
//                       size={14}
//                       style={{ display: "inline", marginRight: "0.25rem" }}
//                     />
//                     Missing Skills to Add
//                   </div>
//                   <SkillsList>
//                     {analysis.missingSkills.map((s, i) => (
//                       <SkillTag key={i} $type="missing">
//                         {s}
//                       </SkillTag>
//                     ))}
//                   </SkillsList>
//                 </div>
//               </AnalysisCard>
//             )}

//             {coverLetter && (
//               <CoverLetterSection>
//                 <Label>Generated Cover Letter</Label>
//                 <TextArea
//                   value={coverLetter}
//                   onChange={(e) => setCoverLetter(e.target.value)}
//                   rows={10}
//                   style={{ marginTop: "0.5rem" }}
//                 />
//               </CoverLetterSection>
//             )}

//             <FormGroup>
//               <CheckboxGroup>
//                 <Checkbox
//                   type="checkbox"
//                   name="confirmationReceived"
//                   checked={formData.confirmationReceived}
//                   onChange={handleChange}
//                 />
//                 <Label>✓ I received application confirmation email</Label>
//               </CheckboxGroup>
//             </FormGroup>

//             {formData.confirmationReceived && (
//               <FormGroup>
//                 <Label>
//                   Confirmation Notes (confirmation #, recruiter name, etc.)
//                 </Label>
//                 <TextArea
//                   name="confirmationNotes"
//                   value={formData.confirmationNotes}
//                   onChange={handleChange}
//                   placeholder="e.g., Confirmation #12345, Recruiter: John, Application ID: REQ-001"
//                   rows={2}
//                 />
//               </FormGroup>
//             )}

//             <FormRow>
//               <FormGroup>
//                 <Label>Source</Label>
//                 <Select
//                   name="source"
//                   value={formData.source}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select source</option>
//                   <option value="LINKEDIN">LinkedIn</option>
//                   <option value="INDEED">Indeed</option>
//                   <option value="COMPANY_WEBSITE">Company Website</option>
//                   <option value="REFERRAL">Referral</option>
//                   <option value="OTHER">Other</option>
//                 </Select>
//               </FormGroup>

//               <FormGroup>
//                 <Label>Status</Label>
//                 <Select
//                   name="status"
//                   value={formData.status}
//                   onChange={handleChange}
//                 >
//                   <option value="WISHLIST">Wishlist</option>
//                   <option value="APPLIED">Applied</option>
//                   <option value="REVIEWING">Reviewing</option>
//                   <option value="PHONE_SCREEN">Phone Screen</option>
//                   <option value="TECHNICAL">Technical</option>
//                   <option value="ONSITE">Onsite</option>
//                   <option value="OFFER">Offer</option>
//                   <option value="REJECTED">Rejected</option>
//                 </Select>
//               </FormGroup>
//             </FormRow>

//             <FormGroup>
//               <Label>Notes</Label>
//               <TextArea
//                 name="notes"
//                 value={formData.notes}
//                 onChange={handleChange}
//                 placeholder="Interview notes, follow-up reminders, etc..."
//                 rows={3}
//               />
//             </FormGroup>

//             <ButtonGroup>
//               <Button type="submit" disabled={loading}>
//                 <Save size={18} />
//                 {loading ? "Saving..." : "Save Application"}
//               </Button>
//             </ButtonGroup>
//           </Form>
//         </FormCard>
//       </Content>
//     </Container>
//   );
// }
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import {
  Save,
  ArrowLeft,
  Calendar,
  DollarSign,
  MapPin,
  Link as LinkIcon,
  Briefcase,
  Building,
  StickyNote,
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

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

const Button = styled.button`
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
  background: #667eea;
  color: white;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    background: #5a67d8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const Divider = styled.hr`
  margin: 0.5rem 0;
  border: none;
  border-top: 1px solid #e5e7eb;
`;

export default function NewApplicationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
    appliedDate: new Date().toISOString().split("T")[0],
    status: "APPLIED",
    source: "",
    notes: "",
  });

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
    setLoading(true);

    if (!formData.jobTitle || !formData.company) {
      toast.error("Job Title and Company are required");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          salaryMin: formData.salaryMin ? parseInt(formData.salaryMin) : null,
          salaryMax: formData.salaryMax ? parseInt(formData.salaryMax) : null,
        }),
      });

      if (response.ok) {
        toast.success("Application saved!");
        router.push("/dashboard");
      } else {
        const error = await response.json();
        throw new Error(error.error || "Failed to save");
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Content>
        <BackButton href="/dashboard">
          <ArrowLeft size={18} />
          Back to Dashboard
        </BackButton>

        <FormCard>
          <Title>Add New Application</Title>
          <Subtitle>Enter the details of the job you applied for</Subtitle>

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

            <Divider />

            <FormGroup>
              <Label>Job Description</Label>
              <TextArea
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                placeholder="Paste the job description here (optional)"
                rows={5}
              />
            </FormGroup>

            <FormGroup>
              <Label>
                <StickyNote size={14} />
                Notes
              </Label>
              <TextArea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Interview notes, follow-up reminders, recruiter contact info, etc..."
                rows={3}
              />
            </FormGroup>

            <ButtonGroup>
              <Button type="submit" disabled={loading}>
                <Save size={18} />
                {loading ? "Saving..." : "Save Application"}
              </Button>
            </ButtonGroup>
          </Form>
        </FormCard>
      </Content>
    </Container>
  );
}
