"use client";

import { useState } from "react";
import styled from "styled-components";
import {
  Mail, Phone, MapPin, Link, Briefcase, GraduationCap,
  Wrench, ChevronDown, ChevronUp,
} from "lucide-react";
import type { StructuredResume } from "@/lib/ai/resume-structure";

// ── Outer container ──────────────────────────────────
const Wrapper = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Page = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2.5rem 3rem;
  font-family: Georgia, "Times New Roman", serif;
  color: #1a1a1a;
  line-height: 1.6;

  @media (max-width: 600px) {
    padding: 1.5rem 1.25rem;
  }
`;

// ── Header ───────────────────────────────────────────
const Name = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  margin: 0 0 0.15rem;
  color: #111827;
`;

const JobTitle = styled.p`
  font-size: 1rem;
  color: #4b5563;
  margin: 0 0 0.75rem;
`;

const ContactBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.78rem;
  color: #6b7280;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #e5e7eb;
  margin-bottom: 1rem;

  span {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
  }
`;

// ── Sections ─────────────────────────────────────────
const SectionWrap = styled.section`
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #374151;
  border-bottom: 1.5px solid #d1d5db;
  padding-bottom: 0.3rem;
  margin: 0 0 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const Summary = styled.p`
  font-size: 0.85rem;
  color: #374151;
  margin: 0;
  line-height: 1.7;
`;

// ── Experience ───────────────────────────────────────
const ExpBlock = styled.div`
  margin-bottom: 0.75rem;
`;

const ExpHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  margin-bottom: 0.15rem;
`;

const ExpTitle = styled.span`
  font-weight: 700;
  font-size: 0.88rem;
  color: #111827;
`;

const ExpCompany = styled.span`
  font-weight: 600;
  font-size: 0.85rem;
  color: #374151;
`;

const ExpDates = styled.span`
  font-size: 0.78rem;
  color: #6b7280;
`;

const BulletList = styled.ul`
  margin: 0.25rem 0 0;
  padding-left: 1.1rem;
  list-style: disc;

  li {
    font-size: 0.82rem;
    color: #4b5563;
    margin-bottom: 0.15rem;
    line-height: 1.55;
  }
`;

// ── Education ────────────────────────────────────────
const EduBlock = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
  font-size: 0.85rem;
`;

const EduMain = styled.span`
  font-weight: 600;
  color: #111827;
`;

const EduSchool = styled.span`
  color: #374151;
`;

const EduYear = styled.span`
  color: #6b7280;
  font-size: 0.8rem;
`;

// ── Skills ───────────────────────────────────────────
const SkillCloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const SkillPill = styled.span`
  background: #f3f4f6;
  color: #374151;
  padding: 0.2rem 0.65rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
`;

// ── Expand / collapse ────────────────────────────────
const ExpandButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background: none;
  border: none;
  color: #667eea;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.4rem;
`;

// ── Fallback (unparsed text) ─────────────────────────
const FallbackPre = styled.pre`
  font-family: Georgia, "Times New Roman", serif;
  font-size: 0.85rem;
  white-space: pre-wrap;
  color: #374151;
  line-height: 1.7;
  margin: 0;
`;

// ── Props & component ────────────────────────────────
interface ResumePreviewProps {
  resume: StructuredResume;
  compact?: boolean;
}

export default function ResumePreview({ resume, compact = false }: ResumePreviewProps) {
  const { name, title, contact, summary, experience, education, skills } = resume;

  // Show only first role by default in compact mode
  const [expanded, setExpanded] = useState(!compact);
  const visibleExp = expanded ? experience : experience.slice(0, 1);

  return (
    <Wrapper>
      <Page>
        {/* ── Name & Contact ── */}
        <Name>{name || "Your Name"}</Name>
        {title && <JobTitle>{title}</JobTitle>}

        {(contact?.email || contact?.phone || contact?.location || contact?.linkedin) && (
          <ContactBar>
            {contact.email && (
              <span><Mail size={12} /> {contact.email}</span>
            )}
            {contact.phone && (
              <span><Phone size={12} /> {contact.phone}</span>
            )}
            {contact.location && (
              <span><MapPin size={12} /> {contact.location}</span>
            )}
            {contact.linkedin && (
              <span><Link size={12} /> {contact.linkedin.replace(/^https?:\/\//, "").replace(/^www\./, "")}</span>
            )}
          </ContactBar>
        )}

        {/* ── Summary ── */}
        {summary && summary !== "null" && (
          <SectionWrap>
            <SectionTitle><Briefcase size={14} /> Summary</SectionTitle>
            <Summary>{summary}</Summary>
          </SectionWrap>
        )}

        {/* ── Experience ── */}
        {experience.length > 0 && (
          <SectionWrap>
            <SectionTitle><Briefcase size={14} /> Experience</SectionTitle>
            {visibleExp.map((exp, i) => (
              <ExpBlock key={i}>
                <ExpHeader>
                  <div>
                    <ExpTitle>{exp.title}</ExpTitle>
                    {exp.company && exp.company !== "null" && (
                      <>{" — "}<ExpCompany>{exp.company}</ExpCompany></>
                    )}
                  </div>
                  {exp.dates && exp.dates !== "null" && (
                    <ExpDates>{exp.dates}</ExpDates>
                  )}
                </ExpHeader>
                {exp.bullets.length > 0 && (
                  <BulletList>
                    {exp.bullets.filter(b => b !== "null").map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </BulletList>
                )}
              </ExpBlock>
            ))}
            {compact && experience.length > 1 && (
              <ExpandButton onClick={() => setExpanded(!expanded)}>
                {expanded ? (
                  <><ChevronUp size={14} /> Show Less</>
                ) : (
                  <><ChevronDown size={14} /> Show All {experience.length} Roles</>
                )}
              </ExpandButton>
            )}
          </SectionWrap>
        )}

        {/* ── Education ── */}
        {education.length > 0 && (
          <SectionWrap>
            <SectionTitle><GraduationCap size={14} /> Education</SectionTitle>
            {education.map((edu, i) => (
              <EduBlock key={i}>
                <div>
                  {edu.degree !== "null" && <EduMain>{edu.degree}</EduMain>}
                  {edu.school !== "null" && (
                    <EduSchool> — {edu.school}</EduSchool>
                  )}
                </div>
                {edu.year !== "null" && <EduYear>{edu.year}</EduYear>}
              </EduBlock>
            ))}
          </SectionWrap>
        )}

        {/* ── Skills ── */}
        {skills.length > 0 && (
          <SectionWrap>
            <SectionTitle><Wrench size={14} /> Skills</SectionTitle>
            <SkillCloud>
              {skills.filter(s => s !== "null").map((s, i) => (
                <SkillPill key={i}>{s}</SkillPill>
              ))}
            </SkillCloud>
          </SectionWrap>
        )}
      </Page>
    </Wrapper>
  );
}
