"use client";

import { useState } from "react";
import styled from "styled-components";
import {
  Mail, Phone, MapPin, Link, Briefcase, GraduationCap,
  Wrench, Award, ChevronDown, ChevronUp,
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
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #1a1a1a;
  line-height: 1.55;

  @media (max-width: 600px) {
    padding: 1.5rem 1.25rem;
  }
`;

// ── Header (centered) ────────────────────────────────
const Name = styled.h1`
  font-size: 1.65rem;
  font-weight: 700;
  text-align: center;
  margin: 0 0 0.4rem;
  color: #111827;
  letter-spacing: 0.01em;
`;

const ContactBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.4rem 1.2rem;
  font-size: 0.78rem;
  color: #4b5563;
  padding-bottom: 0.6rem;
  margin-bottom: 0.5rem;

  span {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
  }
`;

const HeaderRule = styled.div`
  border-bottom: 1.5px solid #374151;
  margin-bottom: 1rem;
`;

// ── Sections ─────────────────────────────────────────
const SectionWrap = styled.section`
  margin-bottom: 0.85rem;
`;

const SectionTitle = styled.h2`
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #111827;
  border-bottom: 1.2px solid #374151;
  padding-bottom: 0.25rem;
  margin: 0 0 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const Summary = styled.p`
  font-size: 0.85rem;
  color: #374151;
  margin: 0;
  line-height: 1.6;
`;

// ── Experience ───────────────────────────────────────
const ExpBlock = styled.div`
  margin-bottom: 0.6rem;
`;

const ExpTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
`;

const ExpTitle = styled.span`
  font-weight: 700;
  font-size: 0.9rem;
  color: #111827;
`;

const ExpDates = styled.span`
  font-size: 0.78rem;
  color: #6b7280;
  flex-shrink: 0;
`;

const ExpCompany = styled.span`
  display: block;
  font-style: italic;
  font-size: 0.82rem;
  color: #4b5563;
  margin-bottom: 0.2rem;
`;

const BulletList = styled.ul`
  margin: 0.15rem 0 0;
  padding-left: 1.1rem;
  list-style: disc;

  li {
    font-size: 0.82rem;
    color: #4b5563;
    margin-bottom: 0.1rem;
    line-height: 1.5;
  }
`;

// ── Education ────────────────────────────────────────
const EduBlock = styled.div`
  margin-bottom: 0.2rem;
`;

const EduRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const EduDegree = styled.span`
  font-weight: 700;
  font-size: 0.9rem;
  color: #111827;
`;

const EduYear = styled.span`
  font-size: 0.78rem;
  color: #6b7280;
  flex-shrink: 0;
`;

const EduSchool = styled.span`
  display: block;
  font-style: italic;
  font-size: 0.82rem;
  color: #4b5563;
`;

// ── Certifications ───────────────────────────────────
const CertList = styled.ul`
  margin: 0;
  padding-left: 1.1rem;
  list-style: disc;

  li {
    font-size: 0.85rem;
    color: #374151;
    margin-bottom: 0.1rem;
  }
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
  color: #4f46e5;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.4rem;
`;

// ── Props & component ────────────────────────────────
interface ResumePreviewProps {
  resume: StructuredResume;
  compact?: boolean;
}

export default function ResumePreview({ resume, compact = false }: ResumePreviewProps) {
  const { name, contact, summary, experience, education, certifications, skills } = resume;

  const [expanded, setExpanded] = useState(!compact);
  const visibleExp = expanded ? experience : experience.slice(0, 1);

  return (
    <Wrapper>
      <Page>
        {/* ── Header ── */}
        <Name>{name || "Your Name"}</Name>

        {(contact?.email || contact?.phone || contact?.location || contact?.linkedin) && (
          <ContactBar>
            {contact.phone && (
              <span><Phone size={11} /> {contact.phone}</span>
            )}
            {contact.email && (
              <span><Mail size={11} /> {contact.email}</span>
            )}
            {contact.location && (
              <span><MapPin size={11} /> {contact.location}</span>
            )}
            {contact.linkedin && (
              <span><Link size={11} /> {contact.linkedin.replace(/^https?:\/\//, "").replace(/^www\./, "")}</span>
            )}
          </ContactBar>
        )}

        <HeaderRule />

        {/* ── Summary ── */}
        {summary && summary !== "null" && (
          <SectionWrap>
            <SectionTitle>Summary</SectionTitle>
            <Summary>{summary}</Summary>
          </SectionWrap>
        )}

        {/* ── Experience ── */}
        {experience.length > 0 && (
          <SectionWrap>
            <SectionTitle>Experience</SectionTitle>
            {visibleExp.map((exp, i) => (
              <ExpBlock key={i}>
                <ExpTitleRow>
                  <ExpTitle>{exp.title}</ExpTitle>
                  {exp.dates && exp.dates !== "null" && (
                    <ExpDates>{exp.dates}</ExpDates>
                  )}
                </ExpTitleRow>
                {exp.company && exp.company !== "null" && (
                  <ExpCompany>{exp.company}</ExpCompany>
                )}
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
            <SectionTitle>Education</SectionTitle>
            {education.map((edu, i) => (
              <EduBlock key={i}>
                <EduRow>
                  {edu.degree !== "null" && <EduDegree>{edu.degree}</EduDegree>}
                  {edu.year !== "null" && <EduYear>{edu.year}</EduYear>}
                </EduRow>
                {edu.school !== "null" && (
                  <EduSchool>{edu.school}</EduSchool>
                )}
              </EduBlock>
            ))}
          </SectionWrap>
        )}

        {/* ── Certifications ── */}
        {certifications && certifications.length > 0 && (
          <SectionWrap>
            <SectionTitle><Award size={13} /> Certifications</SectionTitle>
            <CertList>
              {certifications.filter(c => c !== "null").map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </CertList>
          </SectionWrap>
        )}

        {/* ── Skills ── */}
        {skills.length > 0 && (
          <SectionWrap>
            <SectionTitle>Skills</SectionTitle>
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
