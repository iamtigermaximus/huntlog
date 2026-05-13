// // "use client";

// // import { useState, useRef } from "react";
// // import styled from "styled-components";
// // import {
// //   Sparkles,
// //   Download,
// //   Printer,
// //   Copy,
// //   RefreshCw,
// //   Upload,
// //   FileText,
// // } from "lucide-react";
// // import toast from "react-hot-toast";

// // // Styled Components
// // const Container = styled.div`
// //   min-height: 100vh;
// //   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
// //   padding: 2rem;
// // `;

// // const Header = styled.div`
// //   max-width: 1400px;
// //   margin: 0 auto;
// //   text-align: center;
// //   color: white;
// //   margin-bottom: 2rem;

// //   h1 {
// //     font-size: 2.5rem;
// //     font-weight: bold;
// //     margin-bottom: 0.5rem;
// //   }

// //   p {
// //     opacity: 0.9;
// //   }
// // `;

// // const MainContent = styled.div`
// //   max-width: 1400px;
// //   margin: 0 auto;
// //   display: grid;
// //   grid-template-columns: 1fr 1fr;
// //   gap: 2rem;

// //   @media (max-width: 1024px) {
// //     grid-template-columns: 1fr;
// //     gap: 1.5rem;
// //   }
// // `;

// // const InputPanel = styled.div`
// //   background: white;
// //   border-radius: 1rem;
// //   padding: 1.5rem;
// //   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
// // `;

// // const OutputPanel = styled.div`
// //   background: white;
// //   border-radius: 1rem;
// //   padding: 1.5rem;
// //   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
// // `;

// // const Section = styled.div`
// //   margin-bottom: 1.5rem;
// // `;

// // const Label = styled.label`
// //   display: block;
// //   font-weight: 600;
// //   margin-bottom: 0.5rem;
// //   color: #374151;
// // `;

// // const Input = styled.input`
// //   width: 100%;
// //   padding: 0.75rem;
// //   border: 1px solid #e5e7eb;
// //   border-radius: 0.5rem;
// //   font-size: 0.875rem;

// //   &:focus {
// //     outline: none;
// //     border-color: #667eea;
// //     ring: 2px solid #667eea;
// //   }
// // `;

// // const TextArea = styled.textarea`
// //   width: 100%;
// //   padding: 0.75rem;
// //   border: 1px solid #e5e7eb;
// //   border-radius: 0.5rem;
// //   min-height: 150px;
// //   font-family: monospace;
// //   font-size: 0.875rem;

// //   &:focus {
// //     outline: none;
// //     border-color: #667eea;
// //   }
// // `;

// // const FileUpload = styled.div`
// //   border: 2px dashed #e5e7eb;
// //   border-radius: 0.5rem;
// //   padding: 1.5rem;
// //   text-align: center;
// //   cursor: pointer;
// //   transition: all 0.2s;

// //   &:hover {
// //     border-color: #667eea;
// //     background: #f9fafb;
// //   }
// // `;

// // const GenerateButton = styled.button`
// //   width: 100%;
// //   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
// //   color: white;
// //   padding: 0.875rem;
// //   border: none;
// //   border-radius: 0.5rem;
// //   font-weight: 600;
// //   font-size: 1rem;
// //   cursor: pointer;
// //   display: flex;
// //   align-items: center;
// //   justify-content: center;
// //   gap: 0.5rem;
// //   transition: all 0.2s;

// //   &:hover {
// //     transform: translateY(-2px);
// //     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
// //   }

// //   &:disabled {
// //     opacity: 0.6;
// //     cursor: not-allowed;
// //     transform: none;
// //   }
// // `;

// // const ButtonGroup = styled.div`
// //   display: flex;
// //   gap: 1rem;
// //   margin-top: 1rem;
// // `;

// // const ActionButton = styled.button`
// //   flex: 1;
// //   padding: 0.5rem;
// //   border: 1px solid #e5e7eb;
// //   background: white;
// //   border-radius: 0.5rem;
// //   cursor: pointer;
// //   display: flex;
// //   align-items: center;
// //   justify-content: center;
// //   gap: 0.5rem;
// //   font-size: 0.875rem;
// //   transition: all 0.2s;

// //   &:hover {
// //     border-color: #667eea;
// //     color: #667eea;
// //   }
// // `;

// // const CoverLetterPreview = styled.div`
// //   min-height: 500px;
// //   padding: 2rem;
// //   background: white;
// //   border: 1px solid #e5e7eb;
// //   border-radius: 0.5rem;
// //   font-family: "Times New Roman", Georgia, serif;
// //   font-size: 12pt;
// //   line-height: 1.6;
// //   color: #1a1a1a;
// //   white-space: pre-wrap;

// //   @media print {
// //     padding: 0;
// //     border: none;
// //   }
// // `;

// // const LoadingIndicator = styled.div`
// //   text-align: center;
// //   padding: 3rem;
// //   color: #6b7280;
// // `;

// // export default function CoverLetterGenerator() {
// //   const [formData, setFormData] = useState({
// //     jobTitle: "",
// //     companyName: "",
// //     jobDescription: "",
// //     cvContent: "",
// //     additionalInstructions: "",
// //   });

// //   const [generatedLetter, setGeneratedLetter] = useState("");
// //   const [isGenerating, setIsGenerating] = useState(false);
// //   const previewRef = useRef<HTMLDivElement>(null);

// //   const handleFileUpload = async (
// //     e: React.ChangeEvent<HTMLInputElement>,
// //     type: "cv",
// //   ) => {
// //     const file = e.target.files?.[0];
// //     if (!file) return;

// //     toast.loading(`Reading ${type === "cv" ? "CV" : "file"}...`, {
// //       id: "upload",
// //     });

// //     try {
// //       const text = await file.text();
// //       if (type === "cv") {
// //         setFormData((prev) => ({ ...prev, cvContent: text }));
// //         toast.success("CV loaded successfully!", { id: "upload" });
// //       }
// //     } catch (error) {
// //       toast.error("Failed to read file", { id: "upload" });
// //     }
// //   };

// //   const generateCoverLetter = async () => {
// //     if (!formData.jobTitle || !formData.companyName) {
// //       toast.error("Please provide at least the job title and company name");
// //       return;
// //     }

// //     setIsGenerating(true);
// //     toast.loading("Generating cover letter...", { id: "generate" });

// //     try {
// //       const response = await fetch("/api/generate-coverletter", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(formData),
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         setGeneratedLetter(data.coverLetter);
// //         toast.success("Cover letter generated!", { id: "generate" });
// //       } else {
// //         throw new Error(data.error);
// //       }
// //     } catch (error) {
// //       toast.error("Failed to generate cover letter", { id: "generate" });
// //     } finally {
// //       setIsGenerating(false);
// //     }
// //   };

// //   const handleCopy = () => {
// //     navigator.clipboard.writeText(generatedLetter);
// //     toast.success("Copied to clipboard!");
// //   };

// //   const handleDownload = () => {
// //     const element = previewRef.current;
// //     if (!element) return;

// //     const htmlContent = `
// //       <!DOCTYPE html>
// //       <html>
// //       <head>
// //         <title>Cover Letter - ${formData.jobTitle} at ${formData.companyName}</title>
// //         <style>
// //           body {
// //             font-family: 'Times New Roman', Georgia, serif;
// //             font-size: 12pt;
// //             line-height: 1.6;
// //             margin: 2cm;
// //             color: #000;
// //           }
// //           @page {
// //             size: A4;
// //             margin: 2cm;
// //           }
// //           .content {
// //             max-width: 100%;
// //             white-space: pre-wrap;
// //           }
// //         </style>
// //       </head>
// //       <body>
// //         <div class="content">${generatedLetter.replace(/\n/g, "<br/>")}</div>
// //       </body>
// //       </html>
// //     `;

// //     const blob = new Blob([htmlContent], { type: "text/html" });
// //     const url = URL.createObjectURL(blob);
// //     const a = document.createElement("a");
// //     a.href = url;
// //     a.download = `Cover_Letter_${formData.companyName}_${Date.now()}.html`;
// //     document.body.appendChild(a);
// //     a.click();
// //     document.body.removeChild(a);
// //     URL.revokeObjectURL(url);

// //     toast.success("Download started!");
// //   };

// //   const handlePrint = () => {
// //     const printWindow = window.open("", "_blank");
// //     if (!printWindow) return;

// //     printWindow.document.write(`
// //       <!DOCTYPE html>
// //       <html>
// //       <head>
// //         <title>Cover Letter - ${formData.jobTitle} at ${formData.companyName}</title>
// //         <style>
// //           body {
// //             font-family: 'Times New Roman', Georgia, serif;
// //             font-size: 12pt;
// //             line-height: 1.6;
// //             margin: 2cm;
// //           }
// //           @page {
// //             size: A4;
// //             margin: 2cm;
// //           }
// //           pre {
// //             white-space: pre-wrap;
// //             font-family: 'Times New Roman', Georgia, serif;
// //           }
// //         </style>
// //       </head>
// //       <body>
// //         <pre>${generatedLetter}</pre>
// //       </body>
// //       </html>
// //     `);

// //     printWindow.document.close();
// //     printWindow.print();
// //     printWindow.close();
// //   };

// //   return (
// //     <Container>
// //       <Header>
// //         <h1>📝 AI Cover Letter Generator</h1>
// //         <p>Create professional cover letters tailored to any job in seconds</p>
// //       </Header>

// //       <MainContent>
// //         {/* Input Panel */}
// //         <InputPanel>
// //           <Section>
// //             <Label>Job Title *</Label>
// //             <Input
// //               type="text"
// //               placeholder="e.g., Senior Frontend Developer"
// //               value={formData.jobTitle}
// //               onChange={(e) =>
// //                 setFormData((prev) => ({ ...prev, jobTitle: e.target.value }))
// //               }
// //             />
// //           </Section>

// //           <Section>
// //             <Label>Company Name *</Label>
// //             <Input
// //               type="text"
// //               placeholder="e.g., Google, Microsoft, Startup Inc."
// //               value={formData.companyName}
// //               onChange={(e) =>
// //                 setFormData((prev) => ({
// //                   ...prev,
// //                   companyName: e.target.value,
// //                 }))
// //               }
// //             />
// //           </Section>

// //           <Section>
// //             <Label>Job Description</Label>
// //             <TextArea
// //               placeholder="Paste the job description here..."
// //               value={formData.jobDescription}
// //               onChange={(e) =>
// //                 setFormData((prev) => ({
// //                   ...prev,
// //                   jobDescription: e.target.value,
// //                 }))
// //               }
// //             />
// //           </Section>

// //           <Section>
// //             <Label>Your CV/Resume</Label>
// //             <FileUpload
// //               onClick={() => document.getElementById("cv-upload")?.click()}
// //             >
// //               <Upload size={24} color="#667eea" />
// //               <p style={{ marginTop: "0.5rem", fontSize: "0.875rem" }}>
// //                 Click to upload your CV (TXT, PDF, or DOCX)
// //               </p>
// //               <p
// //                 style={{
// //                   fontSize: "0.75rem",
// //                   color: "#6b7280",
// //                   marginTop: "0.25rem",
// //                 }}
// //               >
// //                 Or paste the content below
// //               </p>
// //             </FileUpload>
// //             <input
// //               id="cv-upload"
// //               type="file"
// //               accept=".txt,.pdf,.docx"
// //               style={{ display: "none" }}
// //               onChange={(e) => handleFileUpload(e, "cv")}
// //             />
// //             <TextArea
// //               placeholder="Or paste your CV content here..."
// //               value={formData.cvContent}
// //               onChange={(e) =>
// //                 setFormData((prev) => ({ ...prev, cvContent: e.target.value }))
// //               }
// //               style={{ marginTop: "1rem", minHeight: "150px" }}
// //             />
// //           </Section>

// //           <Section>
// //             <Label>Additional Instructions (Optional)</Label>
// //             <TextArea
// //               placeholder="e.g., Emphasize my leadership experience, mention my passion for AI, etc."
// //               value={formData.additionalInstructions}
// //               onChange={(e) =>
// //                 setFormData((prev) => ({
// //                   ...prev,
// //                   additionalInstructions: e.target.value,
// //                 }))
// //               }
// //               style={{ minHeight: "80px" }}
// //             />
// //           </Section>

// //           <GenerateButton onClick={generateCoverLetter} disabled={isGenerating}>
// //             {isGenerating ? (
// //               <>⏳ Generating...</>
// //             ) : (
// //               <>
// //                 <Sparkles size={18} />
// //                 Generate Cover Letter
// //               </>
// //             )}
// //           </GenerateButton>
// //         </InputPanel>

// //         {/* Output Panel */}
// //         <OutputPanel>
// //           <div
// //             style={{
// //               display: "flex",
// //               justifyContent: "space-between",
// //               alignItems: "center",
// //               marginBottom: "1rem",
// //             }}
// //           >
// //             <h3 style={{ fontWeight: "bold" }}>Generated Cover Letter</h3>
// //             {generatedLetter && (
// //               <ButtonGroup>
// //                 <ActionButton onClick={handleCopy}>
// //                   <Copy size={16} />
// //                   Copy
// //                 </ActionButton>
// //                 <ActionButton onClick={handleDownload}>
// //                   <Download size={16} />
// //                   Save
// //                 </ActionButton>
// //                 <ActionButton onClick={handlePrint}>
// //                   <Printer size={16} />
// //                   Print
// //                 </ActionButton>
// //               </ButtonGroup>
// //             )}
// //           </div>

// //           <CoverLetterPreview ref={previewRef}>
// //             {isGenerating ? (
// //               <LoadingIndicator>
// //                 <RefreshCw
// //                   size={32}
// //                   style={{ animation: "spin 1s linear infinite" }}
// //                 />
// //                 <p style={{ marginTop: "1rem" }}>
// //                   AI is writing your cover letter...
// //                 </p>
// //               </LoadingIndicator>
// //             ) : generatedLetter ? (
// //               <div style={{ whiteSpace: "pre-wrap" }}>{generatedLetter}</div>
// //             ) : (
// //               <div
// //                 style={{
// //                   textAlign: "center",
// //                   color: "#9ca3af",
// //                   padding: "3rem",
// //                 }}
// //               >
// //                 <FileText size={48} style={{ marginBottom: "1rem" }} />
// //                 <p>Your generated cover letter will appear here</p>
// //                 <p style={{ fontSize: "0.875rem", marginTop: "0.5rem" }}>
// //                   Fill in the details and click "Generate Cover Letter"
// //                 </p>
// //               </div>
// //             )}
// //           </CoverLetterPreview>
// //         </OutputPanel>
// //       </MainContent>
// //     </Container>
// //   );
// // }
// "use client";

// import { useState } from "react";
// import styled from "styled-components";
// import {
//   Sparkles,
//   Download,
//   Printer,
//   Copy,
//   Upload,
//   FileText,
//   TrendingUp,
//   CheckCircle,
//   AlertCircle,
//   Loader2,
//   X,
//   Briefcase,
//   Building,
//   Mail,
//   Phone,
// } from "lucide-react";
// import toast from "react-hot-toast";
// import { useDropzone } from "react-dropzone";

// // ============ Styled Components ============
// const Container = styled.div`
//   min-height: 100vh;
//   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//   padding: 2rem;

//   @media (max-width: 768px) {
//     padding: 1rem;
//   }
// `;

// const Header = styled.div`
//   max-width: 1400px;
//   margin: 0 auto;
//   text-align: center;
//   color: white;
//   margin-bottom: 2rem;

//   h1 {
//     font-size: 2.5rem;
//     font-weight: bold;
//     margin-bottom: 0.5rem;
//   }

//   p {
//     opacity: 0.9;
//   }
// `;

// const MainContent = styled.div`
//   max-width: 1400px;
//   margin: 0 auto;
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 2rem;

//   @media (max-width: 1024px) {
//     grid-template-columns: 1fr;
//     gap: 1.5rem;
//   }
// `;

// const InputPanel = styled.div`
//   background: white;
//   border-radius: 1rem;
//   padding: 1.5rem;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
// `;

// const OutputPanel = styled.div`
//   background: white;
//   border-radius: 1rem;
//   padding: 1.5rem;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
// `;

// const Section = styled.div`
//   margin-bottom: 1.5rem;
// `;

// const Label = styled.label`
//   display: block;
//   font-weight: 600;
//   margin-bottom: 0.5rem;
//   color: #374151;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 0.75rem;
//   border: 1px solid #e5e7eb;
//   border-radius: 0.5rem;
//   font-size: 0.875rem;

//   &:focus {
//     outline: none;
//     border-color: #667eea;
//     box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
//   }
// `;

// const TextArea = styled.textarea`
//   width: 100%;
//   padding: 0.75rem;
//   border: 1px solid #e5e7eb;
//   border-radius: 0.5rem;
//   min-height: 150px;
//   font-family: monospace;
//   font-size: 0.875rem;

//   &:focus {
//     outline: none;
//     border-color: #667eea;
//   }
// `;

// const DropzoneContainer = styled.div<{ $isDragActive: boolean }>`
//   border: 2px dashed ${(props) => (props.$isDragActive ? "#667eea" : "#e5e7eb")};
//   border-radius: 0.5rem;
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
//   border-radius: 0.5rem;
//   margin-top: 0.5rem;
// `;

// const RemoveButton = styled.button`
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
//   border-radius: 0.5rem;
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
//   color: ${(props) => (props.$variant === "secondary" ? "#374151" : "white")};

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
//   padding: 1rem;
//   border-radius: 0.75rem;
//   margin-top: 1rem;
// `;

// const ScoreCircle = styled.div<{ $score: number }>`
//   width: 60px;
//   height: 60px;
//   border-radius: 50%;
//   background: rgba(255, 255, 255, 0.2);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 1.5rem;
//   font-weight: bold;
//   border: 3px solid
//     ${(props) => {
//       if (props.$score >= 80) return "#10b981";
//       if (props.$score >= 60) return "#f59e0b";
//       return "#ef4444";
//     }};
// `;

// const SkillTag = styled.span<{ $type?: "missing" | "strength" }>`
//   display: inline-block;
//   padding: 0.25rem 0.75rem;
//   border-radius: 9999px;
//   font-size: 0.7rem;
//   margin: 0.25rem;
//   background: ${(props) => {
//     if (props.$type === "missing") return "rgba(239, 68, 68, 0.2)";
//     if (props.$type === "strength") return "rgba(16, 185, 129, 0.2)";
//     return "#e5e7eb";
//   }};
//   color: ${(props) => (props.$type ? "white" : "#374151")};
// `;

// const CoverLetterPreview = styled.div`
//   min-height: 500px;
//   padding: 1.5rem;
//   background: #f9fafb;
//   border-radius: 0.5rem;
//   font-family: "Times New Roman", Georgia, serif;
//   font-size: 12pt;
//   line-height: 1.6;
//   color: #1a1a1a;
//   white-space: pre-wrap;

//   @media print {
//     padding: 0;
//     background: white;
//   }
// `;

// const LoadingSpinner = styled.div`
//   text-align: center;
//   padding: 3rem;
//   color: #6b7280;
// `;

// const NoteText = styled.p`
//   font-size: 0.7rem;
//   color: #6b7280;
//   margin-top: 0.25rem;
// `;

// // ============ Component ============
// export default function CoverLetterGenerator() {
//   const [formData, setFormData] = useState({
//     jobTitle: "",
//     company: "",
//     jobDescription: "",
//     additionalInstructions: "",
//   });

//   const [resumeContent, setResumeContent] = useState("");
//   const [resumeFile, setResumeFile] = useState<File | null>(null);
//   const [generatedLetter, setGeneratedLetter] = useState("");
//   const [analysis, setAnalysis] = useState<null | {
//     matchScore: number;
//     missingSkills: string[];
//     recommendations: string[];
//     strengths: string[];
//   }>(null);

//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [isGenerating, setIsGenerating] = useState(false);

//   // Handle file upload
//   const onDrop = async (acceptedFiles: File[]) => {
//     const file = acceptedFiles[0];
//     if (!file) return;

//     try {
//       if (file.type === "text/plain") {
//         const text = await file.text();
//         setResumeFile(file);
//         setResumeContent(text);
//         toast.success("Resume loaded successfully!");
//       } else if (file.type === "application/pdf") {
//         setResumeFile(file);
//         setResumeContent(
//           "PDF uploaded. For best results, paste your resume text below.",
//         );
//         toast.success(
//           "PDF uploaded. Note: TXT files work better for AI matching.",
//         );
//       } else {
//         toast.error("Please upload PDF or TXT file");
//       }
//     } catch (error) {
//       console.error("Upload error:", error);
//       toast.error("Failed to process file");
//     }
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: { "application/pdf": [".pdf"], "text/plain": [".txt"] },
//     maxFiles: 1,
//   });

//   // Analyze resume against job description
//   const analyzeMatch = async () => {
//     if (!formData.jobDescription || !resumeContent) {
//       toast.error("Please provide job description and your resume");
//       return;
//     }

//     setIsAnalyzing(true);
//     toast.loading("Analyzing your resume...", { id: "analyze" });

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
//         toast.success(`Match score: ${data.matchScore}%`, { id: "analyze" });
//       } else {
//         toast.error(data.error || "Failed to analyze", { id: "analyze" });
//       }
//     } catch (error) {
//       console.error("Analysis error:", error);
//       toast.error("Failed to analyze resume", { id: "analyze" });
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   // Generate cover letter
//   const generateCoverLetter = async () => {
//     if (!formData.jobDescription || !resumeContent) {
//       toast.error("Please provide job description and your resume");
//       return;
//     }

//     if (!formData.jobTitle || !formData.company) {
//       toast.error("Please provide job title and company name");
//       return;
//     }

//     setIsGenerating(true);
//     toast.loading("Generating your cover letter...", { id: "generate" });

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
//         setGeneratedLetter(data.coverLetter);
//         toast.success("Cover letter generated!", { id: "generate" });
//       } else {
//         toast.error(data.error || "Failed to generate", { id: "generate" });
//       }
//     } catch (error) {
//       console.error("Generation error:", error);
//       toast.error("Failed to generate cover letter", { id: "generate" });
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   // Copy to clipboard
//   const handleCopy = () => {
//     navigator.clipboard.writeText(generatedLetter);
//     toast.success("Copied to clipboard!");
//   };

//   // Download as HTML
//   const handleDownload = () => {
//     const htmlContent = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <title>Cover Letter - ${formData.jobTitle} at ${formData.company}</title>
//         <style>
//           body {
//             font-family: 'Times New Roman', Georgia, serif;
//             font-size: 12pt;
//             line-height: 1.6;
//             margin: 2cm;
//           }
//           @page {
//             size: A4;
//             margin: 2cm;
//           }
//           .content {
//             white-space: pre-wrap;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="content">${generatedLetter.replace(/\n/g, "<br/>")}</div>
//       </body>
//       </html>
//     `;

//     const blob = new Blob([htmlContent], { type: "text/html" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `Cover_Letter_${formData.company}_${Date.now()}.html`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);

//     toast.success("Download started!");
//   };

//   // Print
//   const handlePrint = () => {
//     const printWindow = window.open("", "_blank");
//     if (!printWindow) return;

//     printWindow.document.write(`
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <title>Cover Letter - ${formData.jobTitle} at ${formData.company}</title>
//         <style>
//           body {
//             font-family: 'Times New Roman', Georgia, serif;
//             font-size: 12pt;
//             line-height: 1.6;
//             margin: 2cm;
//           }
//           @page {
//             size: A4;
//             margin: 2cm;
//           }
//           pre {
//             white-space: pre-wrap;
//             font-family: 'Times New Roman', Georgia, serif;
//           }
//         </style>
//       </head>
//       <body>
//         <pre>${generatedLetter}</pre>
//       </body>
//       </html>
//     `);

//     printWindow.document.close();
//     printWindow.print();
//     printWindow.close();
//   };

//   return (
//     <Container>
//       <Header>
//         <h1>📝 AI Cover Letter Generator</h1>
//         <p>Analyze your resume match and generate personalized cover letters</p>
//       </Header>

//       <MainContent>
//         {/* Input Panel */}
//         <InputPanel>
//           <Section>
//             <Label>Job Title *</Label>
//             <Input
//               placeholder="e.g., Senior Frontend Developer"
//               value={formData.jobTitle}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, jobTitle: e.target.value }))
//               }
//             />
//           </Section>

//           <Section>
//             <Label>Company Name *</Label>
//             <Input
//               placeholder="e.g., Google, Microsoft, Startup Inc."
//               value={formData.company}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, company: e.target.value }))
//               }
//             />
//           </Section>

//           <Section>
//             <Label>Job Description *</Label>
//             <TextArea
//               placeholder="Paste the job description here..."
//               value={formData.jobDescription}
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   jobDescription: e.target.value,
//                 }))
//               }
//               rows={8}
//             />
//           </Section>

//           <Section>
//             <Label>Your Resume/CV</Label>
//             <div {...getRootProps()}>
//               <input {...getInputProps()} />
//               <DropzoneContainer $isDragActive={isDragActive}>
//                 <Upload
//                   size={32}
//                   style={{ marginBottom: "0.5rem", color: "#9ca3af" }}
//                 />
//                 {isDragActive ? (
//                   <p>Drop your resume here...</p>
//                 ) : (
//                   <p>Drag & drop your resume, or click to select</p>
//                 )}
//                 <NoteText>Supports PDF, TXT (TXT works best)</NoteText>
//               </DropzoneContainer>
//             </div>
//             {resumeFile && (
//               <ResumeInfo>
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "0.5rem",
//                   }}
//                 >
//                   <FileText size={16} />
//                   <span style={{ fontSize: "0.875rem" }}>
//                     {resumeFile.name}
//                   </span>
//                 </div>
//                 <RemoveButton
//                   onClick={() => {
//                     setResumeFile(null);
//                     setResumeContent("");
//                   }}
//                 >
//                   <X size={16} />
//                 </RemoveButton>
//               </ResumeInfo>
//             )}
//             <NoteText>💡 Or paste your resume text below</NoteText>
//             <TextArea
//               placeholder="Paste your resume text here..."
//               value={resumeContent}
//               onChange={(e) => setResumeContent(e.target.value)}
//               rows={6}
//               style={{ marginTop: "0.5rem" }}
//             />
//           </Section>

//           <Section>
//             <Label>Additional Instructions (Optional)</Label>
//             <TextArea
//               placeholder="e.g., Emphasize my leadership experience, mention my passion for AI..."
//               value={formData.additionalInstructions}
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   additionalInstructions: e.target.value,
//                 }))
//               }
//               rows={3}
//             />
//           </Section>

//           {/* Action Buttons */}
//           <ButtonGroup>
//             <Button
//               onClick={analyzeMatch}
//               disabled={
//                 isAnalyzing || !formData.jobDescription || !resumeContent
//               }
//             >
//               {isAnalyzing ? (
//                 <Loader2 size={18} className="spinner" />
//               ) : (
//                 <TrendingUp size={18} />
//               )}
//               {isAnalyzing ? "Analyzing..." : "Analyze Match"}
//             </Button>
//             <Button
//               $variant="success"
//               onClick={generateCoverLetter}
//               disabled={
//                 isGenerating ||
//                 !formData.jobDescription ||
//                 !resumeContent ||
//                 !formData.jobTitle ||
//                 !formData.company
//               }
//             >
//               {isGenerating ? (
//                 <Loader2 size={18} className="spinner" />
//               ) : (
//                 <Sparkles size={18} />
//               )}
//               {isGenerating ? "Generating..." : "Generate Cover Letter"}
//             </Button>
//           </ButtonGroup>

//           {/* Analysis Results */}
//           {analysis && (
//             <AnalysisCard>
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "1rem",
//                   marginBottom: "1rem",
//                 }}
//               >
//                 <ScoreCircle $score={analysis.matchScore}>
//                   {analysis.matchScore}%
//                 </ScoreCircle>
//                 <div>
//                   <div style={{ fontWeight: "bold" }}>
//                     {analysis.matchScore >= 80
//                       ? "Great Match! 🎯"
//                       : analysis.matchScore >= 60
//                         ? "Good Match 📈"
//                         : "Needs Improvement 📝"}
//                   </div>
//                   <div style={{ fontSize: "0.75rem", opacity: 0.9 }}>
//                     Resume match score
//                   </div>
//                 </div>
//               </div>

//               <div style={{ marginBottom: "0.75rem" }}>
//                 <div style={{ fontSize: "0.75rem", marginBottom: "0.25rem" }}>
//                   <CheckCircle
//                     size={12}
//                     style={{ display: "inline", marginRight: "0.25rem" }}
//                   />
//                   Strengths
//                 </div>
//                 <div>
//                   {analysis.strengths.slice(0, 3).map((s, i) => (
//                     <SkillTag key={i} $type="strength">
//                       {s}
//                     </SkillTag>
//                   ))}
//                 </div>
//               </div>

//               {analysis.missingSkills.length > 0 && (
//                 <div>
//                   <div style={{ fontSize: "0.75rem", marginBottom: "0.25rem" }}>
//                     <AlertCircle
//                       size={12}
//                       style={{ display: "inline", marginRight: "0.25rem" }}
//                     />
//                     Skills to Highlight
//                   </div>
//                   <div>
//                     {analysis.missingSkills.slice(0, 5).map((s, i) => (
//                       <SkillTag key={i} $type="missing">
//                         {s}
//                       </SkillTag>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </AnalysisCard>
//           )}
//         </InputPanel>

//         {/* Output Panel */}
//         <OutputPanel>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginBottom: "1rem",
//               flexWrap: "wrap",
//               gap: "0.5rem",
//             }}
//           >
//             <Label style={{ marginBottom: 0 }}>Generated Cover Letter</Label>
//             {generatedLetter && (
//               <ButtonGroup style={{ marginTop: 0 }}>
//                 <Button $variant="secondary" onClick={handleCopy}>
//                   <Copy size={16} />
//                   Copy
//                 </Button>
//                 <Button $variant="secondary" onClick={handleDownload}>
//                   <Download size={16} />
//                   Save
//                 </Button>
//                 <Button $variant="secondary" onClick={handlePrint}>
//                   <Printer size={16} />
//                   Print
//                 </Button>
//               </ButtonGroup>
//             )}
//           </div>

//           <CoverLetterPreview>
//             {isGenerating ? (
//               <LoadingSpinner>
//                 <Loader2
//                   size={32}
//                   style={{ animation: "spin 1s linear infinite" }}
//                 />
//                 <p style={{ marginTop: "1rem" }}>
//                   AI is writing your cover letter...
//                 </p>
//               </LoadingSpinner>
//             ) : generatedLetter ? (
//               <div style={{ whiteSpace: "pre-wrap" }}>{generatedLetter}</div>
//             ) : (
//               <div
//                 style={{
//                   textAlign: "center",
//                   color: "#9ca3af",
//                   padding: "3rem",
//                 }}
//               >
//                 <FileText size={48} style={{ marginBottom: "1rem" }} />
//                 <p>Your generated cover letter will appear here</p>
//                 <p style={{ fontSize: "0.875rem", marginTop: "0.5rem" }}>
//                   Fill in the job details, paste job description and your resume
//                 </p>
//               </div>
//             )}
//           </CoverLetterPreview>
//         </OutputPanel>
//       </MainContent>
//     </Container>
//   );
// }
"use client";

import { useState, useCallback } from "react";
import styled from "styled-components";
import {
  Sparkles,
  Download,
  Printer,
  Copy,
  Upload,
  FileText,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Loader2,
  X,
  Info,
} from "lucide-react";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";

// ============ Types ============
interface FormData {
  jobTitle: string;
  company: string;
  jobDescription: string;
  additionalInstructions: string;
}

interface AnalysisResult {
  matchScore: number;
  missingSkills: string[];
  recommendations: string[];
  strengths: string[];
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

const Header = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  text-align: center;
  color: white;
  margin-bottom: 2rem;

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  p {
    opacity: 0.9;
  }
`;

const MainContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const InputPanel = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const OutputPanel = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #374151;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  min-height: 150px;
  font-family: monospace;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const DropzoneContainer = styled.div<{ $isDragActive: boolean }>`
  border: 2px dashed ${(props) => (props.$isDragActive ? "#667eea" : "#e5e7eb")};
  border-radius: 0.5rem;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  background: ${(props) => (props.$isDragActive ? "#f3f4f6" : "white")};

  &:hover {
    border-color: #667eea;
    background: #f9fafb;
  }
`;

const ResumeInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f3f4f6;
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #ef4444;
  padding: 0.25rem;

  &:hover {
    color: #dc2626;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

const Button = styled.button<{
  $variant?: "primary" | "secondary" | "success";
}>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;

  background: ${(props) => {
    if (props.$variant === "secondary") return "#f3f4f6";
    if (props.$variant === "success") return "#10b981";
    return "#667eea";
  }};
  color: ${(props) => (props.$variant === "secondary" ? "#374151" : "white")};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    background: ${(props) => {
      if (props.$variant === "secondary") return "#e5e7eb";
      if (props.$variant === "success") return "#059669";
      return "#5a67d8";
    }};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const AnalysisCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem;
  border-radius: 0.75rem;
  margin-top: 1rem;
`;

const ScoreCircle = styled.div<{ $score: number }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  font-weight: bold;
  border: 3px solid
    ${(props) => {
      if (props.$score >= 80) return "#10b981";
      if (props.$score >= 60) return "#f59e0b";
      return "#ef4444";
    }};
`;

const SkillTag = styled.span<{ $type?: "missing" | "strength" }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  margin: 0.25rem;
  background: ${(props) => {
    if (props.$type === "missing") return "rgba(239, 68, 68, 0.2)";
    if (props.$type === "strength") return "rgba(16, 185, 129, 0.2)";
    return "#e5e7eb";
  }};
  color: ${(props) => (props.$type ? "white" : "#374151")};
`;

const CoverLetterPreview = styled.div`
  min-height: 500px;
  padding: 1.5rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  font-family: "Times New Roman", Georgia, serif;
  font-size: 12pt;
  line-height: 1.6;
  color: #1a1a1a;
  white-space: pre-wrap;
  overflow-y: auto;
  max-height: 70vh;

  @media print {
    padding: 0;
    background: white;
  }
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 3rem;
  color: #6b7280;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .spinner {
    animation: spin 1s linear infinite;
  }
`;

const NoteText = styled.p`
  font-size: 0.7rem;
  color: #6b7280;
  margin-top: 0.25rem;
`;

const WordCount = styled.span<{ $isValid: boolean }>`
  font-size: 0.7rem;
  color: ${(props) => (props.$isValid ? "#10b981" : "#ef4444")};
  margin-left: 0.5rem;
`;

const InfoBox = styled.div`
  background: #fef3c7;
  border-left: 4px solid #f59e0b;
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
`;

// ============ Component ============
export default function CoverLetterGenerator() {
  const [formData, setFormData] = useState<FormData>({
    jobTitle: "",
    company: "",
    jobDescription: "",
    additionalInstructions: "",
  });

  const [resumeContent, setResumeContent] = useState<string>("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isExtractingText, setIsExtractingText] = useState<boolean>(false);
  const [generatedLetter, setGeneratedLetter] = useState<string>("");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Function to extract text from PDF using browser's built-in PDF.js
  const extractTextFromPDF = async (file: File): Promise<string> => {
    const pdfjsLib = await import("pdfjs-dist");

    // Use local worker instead of CDN
    pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.mjs",
      import.meta.url,
    ).toString();

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();

      // Safe text extraction
      const textItems: string[] = [];
      for (let j = 0; j < textContent.items.length; j++) {
        const item = textContent.items[j];
        if (item && typeof item === "object" && "str" in item) {
          textItems.push(item.str as string);
        }
      }
      const pageText = textItems.join(" ");
      fullText += pageText + "\n\n";
    }

    return fullText.trim();
  };
  // Handle file upload with PDF text extraction
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsExtractingText(true);
    toast.loading("Reading file...", { id: "upload" });

    try {
      let text = "";

      if (file.type === "text/plain") {
        text = await file.text();
      } else if (file.type === "application/pdf") {
        text = await extractTextFromPDF(file);
        if (!text || text.trim().length < 50) {
          toast.error(
            "PDF text extraction returned very little content. Try copying and pasting the text manually.",
            { id: "upload" },
          );
        }
      } else {
        toast.error("Please upload PDF or TXT file", { id: "upload" });
        setIsExtractingText(false);
        return;
      }

      setResumeFile(file);
      setResumeContent(text);

      const wordCount = text.split(/\s+/).filter((w) => w.length > 0).length;
      toast.success(`Resume loaded! ${wordCount} words extracted.`, {
        id: "upload",
      });

      if (wordCount < 50) {
        toast.error(
          "Very short resume detected. Please paste your full resume text below for accurate analysis.",
          { id: "upload" },
        );
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(
        "Failed to process file. Try pasting your resume text instead.",
        { id: "upload" },
      );
    } finally {
      setIsExtractingText(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
    },
    maxFiles: 1,
  });

  // Get word count
  const getWordCount = (text: string): number => {
    return text.split(/\s+/).filter((w) => w.length > 0).length;
  };

  const resumeWordCount: number = getWordCount(resumeContent);
  const isValidResume: boolean = resumeWordCount >= 50;

  // Analyze resume against job description
  const analyzeMatch = async (): Promise<void> => {
    if (!formData.jobDescription) {
      toast.error("Please paste the job description");
      return;
    }

    if (!resumeContent || resumeWordCount < 50) {
      toast.error(
        `Please provide a valid resume (${resumeWordCount}/50 words minimum). Paste your full resume text above.`,
      );
      return;
    }

    setIsAnalyzing(true);
    toast.loading("Analyzing your resume against the job description...", {
      id: "analyze",
    });

    try {
      const response = await fetch("/api/resume-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobDescription: formData.jobDescription,
          resumeContent: resumeContent,
        }),
      });

      const data: AnalysisResult & { error?: string } = await response.json();

      if (response.ok && data.matchScore !== undefined) {
        setAnalysis({
          matchScore: data.matchScore,
          missingSkills: data.missingSkills || [],
          recommendations: data.recommendations || [],
          strengths: data.strengths || [],
        });
        toast.success(`Match score: ${data.matchScore}%`, { id: "analyze" });
      } else {
        toast.error(data.error || "Failed to analyze", { id: "analyze" });
      }
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error("Failed to analyze resume", { id: "analyze" });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Generate cover letter
  const generateCoverLetter = async (): Promise<void> => {
    if (!formData.jobDescription) {
      toast.error("Please paste the job description");
      return;
    }

    if (!resumeContent || resumeWordCount < 50) {
      toast.error(
        `Please provide a valid resume (${resumeWordCount}/50 words minimum)`,
      );
      return;
    }

    if (!formData.jobTitle || !formData.company) {
      toast.error("Please provide job title and company name");
      return;
    }

    setIsGenerating(true);
    toast.loading("Generating your personalized cover letter...", {
      id: "generate",
    });

    try {
      const response = await fetch("/api/coverletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobDescription: formData.jobDescription,
          resumeContent: resumeContent,
          company: formData.company,
          jobTitle: formData.jobTitle,
          strengths: analysis?.strengths || [],
        }),
      });

      const data: { coverLetter: string; error?: string } =
        await response.json();

      if (response.ok && data.coverLetter) {
        setGeneratedLetter(data.coverLetter);
        toast.success("Cover letter generated!", { id: "generate" });
      } else {
        toast.error(data.error || "Failed to generate", { id: "generate" });
      }
    } catch (error) {
      console.error("Generation error:", error);
      toast.error("Failed to generate cover letter", { id: "generate" });
    } finally {
      setIsGenerating(false);
    }
  };

  // Copy to clipboard
  const handleCopy = async (): Promise<void> => {
    await navigator.clipboard.writeText(generatedLetter);
    toast.success("Copied to clipboard!");
  };

  // Download as HTML
  const handleDownload = (): void => {
    const htmlContent: string = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Cover Letter - ${formData.jobTitle} at ${formData.company}</title>
  <style>
    body {
      font-family: 'Times New Roman', Georgia, serif;
      font-size: 12pt;
      line-height: 1.6;
      margin: 2cm;
      color: #000;
    }
    @page {
      size: A4;
      margin: 2cm;
    }
    .content {
      white-space: pre-wrap;
      max-width: 100%;
    }
  </style>
</head>
<body>
  <div class="content">${generatedLetter.replace(/\n/g, "<br/>")}</div>
</body>
</html>`;

    const blob: Blob = new Blob([htmlContent], { type: "text/html" });
    const url: string = URL.createObjectURL(blob);
    const a: HTMLAnchorElement = document.createElement("a");
    a.href = url;
    a.download = `Cover_Letter_${formData.company}_${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success("Download started!");
  };

  // Print
  const handlePrint = (): void => {
    const printWindow: Window | null = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
  <title>Cover Letter - ${formData.jobTitle} at ${formData.company}</title>
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
      font-size: 12pt;
    }
  </style>
</head>
<body>
  <pre>${generatedLetter}</pre>
</body>
</html>`);

    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  return (
    <Container>
      <Header>
        <h1>📝 AI Cover Letter Generator</h1>
        <p>Analyze your resume match and generate personalized cover letters</p>
      </Header>

      <MainContent>
        {/* Input Panel */}
        <InputPanel>
          <Section>
            <Label>Job Title *</Label>
            <Input
              placeholder="e.g., Senior Frontend Developer"
              value={formData.jobTitle}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, jobTitle: e.target.value }))
              }
            />
          </Section>

          <Section>
            <Label>Company Name *</Label>
            <Input
              placeholder="e.g., Google, Microsoft, Startup Inc."
              value={formData.company}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, company: e.target.value }))
              }
            />
          </Section>

          <Section>
            <Label>Job Description *</Label>
            <TextArea
              placeholder="Paste the full job description here..."
              value={formData.jobDescription}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  jobDescription: e.target.value,
                }))
              }
              rows={8}
            />
          </Section>

          <Section>
            <Label>Your Resume/CV *</Label>

            <InfoBox>
              <Info size={16} color="#f59e0b" />
              <div style={{ fontSize: "0.875rem" }}>
                <strong>Important:</strong> For accurate analysis, paste your
                FULL resume text below (minimum 50 words). PDF upload works but
                text paste is more reliable.
              </div>
            </InfoBox>

            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <DropzoneContainer $isDragActive={isDragActive}>
                {isExtractingText ? (
                  <Loader2
                    size={32}
                    className="spinner"
                    style={{ marginBottom: "0.5rem" }}
                  />
                ) : (
                  <Upload
                    size={32}
                    style={{ marginBottom: "0.5rem", color: "#9ca3af" }}
                  />
                )}
                {isDragActive ? (
                  <p>Drop your resume here...</p>
                ) : (
                  <p>Drag & drop your resume, or click to select</p>
                )}
                <NoteText>Supports PDF, TXT (pasting text works best)</NoteText>
              </DropzoneContainer>
            </div>

            {resumeFile && (
              <ResumeInfo>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <FileText size={16} />
                  <span style={{ fontSize: "0.875rem" }}>
                    {resumeFile.name}
                  </span>
                </div>
                <RemoveButton
                  onClick={() => {
                    setResumeFile(null);
                    setResumeContent("");
                    setAnalysis(null);
                  }}
                >
                  <X size={16} />
                </RemoveButton>
              </ResumeInfo>
            )}

            <Label style={{ marginTop: "0.75rem" }}>
              Or paste your resume text here *
              {resumeContent && (
                <WordCount $isValid={isValidResume}>
                  ({resumeWordCount} words{" "}
                  {isValidResume ? "✓" : "- minimum 50 required"})
                </WordCount>
              )}
            </Label>
            <TextArea
              placeholder="Paste your FULL resume text here. Include your work experience, skills, education, and achievements for best results..."
              value={resumeContent}
              onChange={(e) => {
                setResumeContent(e.target.value);
                setAnalysis(null);
              }}
              rows={12}
            />
          </Section>

          <Section>
            <Label>Additional Instructions (Optional)</Label>
            <TextArea
              placeholder="e.g., Emphasize my leadership experience, mention my passion for AI, highlight my startup background..."
              value={formData.additionalInstructions}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  additionalInstructions: e.target.value,
                }))
              }
              rows={3}
            />
          </Section>

          {/* Action Buttons */}
          <ButtonGroup>
            <Button
              onClick={analyzeMatch}
              disabled={
                isAnalyzing || !formData.jobDescription || !isValidResume
              }
            >
              {isAnalyzing ? (
                <Loader2 size={18} className="spinner" />
              ) : (
                <TrendingUp size={18} />
              )}
              {isAnalyzing ? "Analyzing..." : "Analyze Match"}
            </Button>
            <Button
              $variant="success"
              onClick={generateCoverLetter}
              disabled={
                isGenerating ||
                !formData.jobDescription ||
                !isValidResume ||
                !formData.jobTitle ||
                !formData.company
              }
            >
              {isGenerating ? (
                <Loader2 size={18} className="spinner" />
              ) : (
                <Sparkles size={18} />
              )}
              {isGenerating ? "Generating..." : "Generate Cover Letter"}
            </Button>
          </ButtonGroup>

          {/* Analysis Results */}
          {analysis && (
            <AnalysisCard>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <ScoreCircle $score={analysis.matchScore}>
                  {analysis.matchScore}%
                </ScoreCircle>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "1rem" }}>
                    {analysis.matchScore >= 80
                      ? "🎯 Great Match!"
                      : analysis.matchScore >= 60
                        ? "📈 Good Match"
                        : "📝 Needs Improvement"}
                  </div>
                  <div style={{ fontSize: "0.75rem", opacity: 0.9 }}>
                    Resume match score
                  </div>
                </div>
              </div>

              {analysis.strengths.length > 0 && (
                <div style={{ marginBottom: "0.75rem" }}>
                  <div style={{ fontSize: "0.75rem", marginBottom: "0.25rem" }}>
                    <CheckCircle
                      size={12}
                      style={{ display: "inline", marginRight: "0.25rem" }}
                    />
                    Your Strengths for this Role
                  </div>
                  <div>
                    {analysis.strengths
                      .slice(0, 5)
                      .map((s: string, i: number) => (
                        <SkillTag key={i} $type="strength">
                          {s}
                        </SkillTag>
                      ))}
                  </div>
                </div>
              )}

              {analysis.missingSkills.length > 0 && (
                <div>
                  <div style={{ fontSize: "0.75rem", marginBottom: "0.25rem" }}>
                    <AlertCircle
                      size={12}
                      style={{ display: "inline", marginRight: "0.25rem" }}
                    />
                    Skills to Highlight in Your Application
                  </div>
                  <div>
                    {analysis.missingSkills
                      .slice(0, 8)
                      .map((s: string, i: number) => (
                        <SkillTag key={i} $type="missing">
                          {s}
                        </SkillTag>
                      ))}
                  </div>
                </div>
              )}
            </AnalysisCard>
          )}
        </InputPanel>

        {/* Output Panel */}
        <OutputPanel>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            <Label style={{ marginBottom: 0 }}>Generated Cover Letter</Label>
            {generatedLetter && (
              <ButtonGroup style={{ marginTop: 0 }}>
                <Button $variant="secondary" onClick={handleCopy}>
                  <Copy size={16} />
                  Copy
                </Button>
                <Button $variant="secondary" onClick={handleDownload}>
                  <Download size={16} />
                  Save
                </Button>
                <Button $variant="secondary" onClick={handlePrint}>
                  <Printer size={16} />
                  Print
                </Button>
              </ButtonGroup>
            )}
          </div>

          <CoverLetterPreview>
            {isGenerating ? (
              <LoadingSpinner>
                <Loader2 size={32} className="spinner" />
                <p style={{ marginTop: "1rem" }}>
                  AI is writing your cover letter...
                </p>
                <p style={{ fontSize: "0.75rem", marginTop: "0.5rem" }}>
                  This usually takes 5-10 seconds
                </p>
              </LoadingSpinner>
            ) : generatedLetter ? (
              <div style={{ whiteSpace: "pre-wrap" }}>{generatedLetter}</div>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  color: "#9ca3af",
                  padding: "3rem",
                }}
              >
                <FileText size={48} style={{ marginBottom: "1rem" }} />
                <p>Your generated cover letter will appear here</p>
                <p style={{ fontSize: "0.875rem", marginTop: "0.5rem" }}>
                  1. Fill in job title and company
                  <br />
                  2. Paste job description
                  <br />
                  3. Paste your resume (minimum 50 words)
                  <br />
                  4. Click &quot;Generate Cover Letter&quot;
                </p>
              </div>
            )}
          </CoverLetterPreview>
        </OutputPanel>
      </MainContent>
    </Container>
  );
}
