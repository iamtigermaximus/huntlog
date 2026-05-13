// This file only runs on the client side
export async function parseResumeFile(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());

  if (file.type === "text/plain") {
    return buffer.toString("utf-8");
  } else if (file.type === "application/pdf") {
    // For PDFs, we'll use a simple approach - just return a message
    // The AI can still work with job description alone
    console.warn("PDF parsing is disabled for build compatibility");
    return "PDF content. For best results, please paste your resume text manually or use a TXT file.";
  } else {
    throw new Error("Please upload PDF or TXT file");
  }
}
