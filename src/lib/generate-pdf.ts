import { jsPDF } from "jspdf";
import type { StructuredResume } from "@/lib/ai/resume-structure";

const MARGIN = 22;
const PAGE_W = 210; // A4 width in mm
const MAX_W = PAGE_W - MARGIN * 2;
const LINE_H = 5.5;

function checkPage(doc: jsPDF, y: number, needed = 15): number {
  if (y + needed > 287) {
    doc.addPage();
    return MARGIN;
  }
  return y;
}

function sectionHeader(doc: jsPDF, y: number, text: string): number {
  y = checkPage(doc, y, 12);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(text.toUpperCase(), MARGIN, y);
  y += 5;
  // Horizontal rule
  doc.setDrawColor(209, 213, 219);
  doc.setLineWidth(0.3);
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  return y + 4;
}

// ── Plain cover letter (unchanged) ──────────────────
export function generatePDF(content: string, filename: string, title?: string): void {
  const doc = new jsPDF();
  let y = MARGIN;

  if (title) {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(title, MARGIN, y);
    y += 8;
  }

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  for (const para of content.split("\n")) {
    y = checkPage(doc, y, 6);
    const trimmed = para.trim();
    if (!trimmed) { y += 4; continue; }
    const lines = doc.splitTextToSize(trimmed, MAX_W);
    for (const line of lines) {
      y = checkPage(doc, y, LINE_H);
      doc.text(line, MARGIN, y);
      y += LINE_H;
    }
  }
  doc.save(filename);
}

export function generateCoverLetterPDF(content: string, company?: string): void {
  const title = company ? `Cover Letter — ${company}` : "Cover Letter";
  generatePDF(content, `cover-letter-${company || ""}.pdf`.replace(/\s+/g, "-").toLowerCase(), title);
}

// ── Formatted resume PDF ─────────────────────────────
export function generateFormattedResumePDF(resume: StructuredResume, filename?: string): void {
  const doc = new jsPDF();
  let y = MARGIN;

  // Name
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(resume.name || "Resume", MARGIN, y);
  y += 8;

  // Title
  if (resume.title && resume.title !== "null") {
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(75, 85, 99);
    doc.text(resume.title, MARGIN, y);
    y += 5;
  }

  // Contact line
  const contactParts: string[] = [];
  if (resume.contact?.email) contactParts.push(resume.contact.email);
  if (resume.contact?.phone) contactParts.push(resume.contact.phone);
  if (resume.contact?.location) contactParts.push(resume.contact.location);
  if (contactParts.length > 0) {
    doc.setFontSize(8.5);
    doc.setTextColor(107, 114, 128);
    doc.text(contactParts.join("  |  "), MARGIN, y);
    y += 4;
  }

  // Horizontal rule
  y += 2;
  doc.setDrawColor(209, 213, 219);
  doc.setLineWidth(0.5);
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  y += 6;

  doc.setTextColor(26, 26, 26);

  // Summary
  if (resume.summary && resume.summary !== "null") {
    y = sectionHeader(doc, y, "Summary");
    doc.setFontSize(9.5);
    doc.setFont("helvetica", "normal");
    const summaryLines = doc.splitTextToSize(resume.summary, MAX_W);
    for (const line of summaryLines) {
      y = checkPage(doc, y, LINE_H);
      doc.text(line, MARGIN, y);
      y += LINE_H;
    }
    y += 3;
  }

  // Experience
  if (resume.experience.length > 0) {
    y = sectionHeader(doc, y, "Experience");
    for (const exp of resume.experience) {
      y = checkPage(doc, y, 20);

      // Title + company
      doc.setFontSize(10.5);
      doc.setFont("helvetica", "bold");
      const roleLine = exp.company && exp.company !== "null"
        ? `${exp.title} — ${exp.company}`
        : exp.title;
      doc.text(roleLine, MARGIN, y);

      // Dates (right-aligned)
      if (exp.dates && exp.dates !== "null") {
        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(107, 114, 128);
        doc.text(exp.dates, PAGE_W - MARGIN, y, { align: "right" });
        doc.setTextColor(26, 26, 26);
      }
      y += LINE_H + 1;

      // Bullets
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      for (const bullet of exp.bullets) {
        if (bullet === "null") continue;
        y = checkPage(doc, y, LINE_H);
        doc.text("•", MARGIN + 3, y);
        const bulletLines = doc.splitTextToSize(bullet, MAX_W - 6);
        for (let i = 0; i < bulletLines.length; i++) {
          y = checkPage(doc, y, LINE_H);
          doc.text(bulletLines[i], MARGIN + 8, y);
          y += LINE_H;
        }
      }
      y += 2;
    }
  }

  // Education
  if (resume.education.length > 0) {
    y = sectionHeader(doc, y, "Education");
    for (const edu of resume.education) {
      y = checkPage(doc, y, 10);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      const eduLine = edu.school && edu.school !== "null"
        ? `${edu.degree} — ${edu.school}`
        : edu.degree;
      doc.text(eduLine, MARGIN, y);

      if (edu.year && edu.year !== "null") {
        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(107, 114, 128);
        doc.text(edu.year, PAGE_W - MARGIN, y, { align: "right" });
        doc.setTextColor(26, 26, 26);
      }
      y += LINE_H;
    }
    y += 2;
  }

  // Skills
  if (resume.skills.length > 0) {
    y = sectionHeader(doc, y, "Skills");
    const skillsText = resume.skills.filter(s => s !== "null").join("  •  ");
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    const skillLines = doc.splitTextToSize(skillsText, MAX_W);
    for (const line of skillLines) {
      y = checkPage(doc, y, LINE_H);
      doc.text(line, MARGIN, y);
      y += LINE_H;
    }
  }

  doc.save(filename || "resume.pdf");
}

// Legacy alias kept for backward compat
export function generateResumePDF(content: string, jobTitle?: string): void {
  generatePDF(content, `resume-${(jobTitle || "optimized").replace(/\s+/g, "-").toLowerCase()}.pdf`);
}
