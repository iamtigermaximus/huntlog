"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styled from "styled-components";
import {
  Briefcase,
  LogOut,
  Menu,
  X,
  Home,
  Sparkles,
  TrendingUp,
  FileText,
  Brain,
  Zap,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const NavbarStyled = styled.nav`
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 50;
`;

const NavContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavLinks = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 1rem;
    gap: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: ${(props) =>
      props.$isOpen ? "translateY(0)" : "translateY(-100%)"};
    opacity: ${(props) => (props.$isOpen ? "1" : "0")};
    visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
    transition: all 0.3s ease;
    z-index: 40;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #6b7280;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.6rem;
  border-radius: 0.5rem;
  transition: all 0.2s;
  font-size: 0.8rem;
  white-space: nowrap;

  &:hover {
    color: #667eea;
    background: #f3f4f6;
  }
`;

const AIBadge = styled.span`
  font-size: 0.55rem;
  font-weight: 700;
  padding: 0.1rem 0.35rem;
  border-radius: 9999px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: 0.5rem;
  padding-left: 0.75rem;
  border-left: 1px solid #e5e7eb;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    border-left: none;
    margin-left: 0;
    padding-left: 0;
    padding-top: 0.5rem;
    border-top: 1px solid #e5e7eb;
  }
`;

const UserName = styled.span`
  font-weight: 600;
  color: #374151;
  font-size: 0.8rem;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
    color: #ef4444;
  }
`;

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const handleLogout = async () => {
    await signOut({ redirect: false });
    toast.success("Logged out successfully!");
    router.push("/login");
    router.refresh();
  };

  if (pathname === "/" || pathname === "/login" || pathname === "/register") {
    return null;
  }

  if (status === "loading") {
    return (
      <NavbarStyled>
        <NavContent>
          <Logo href="/dashboard">
            <Briefcase size={28} color="#667eea" />
            <h1>HuntLog</h1>
          </Logo>
        </NavContent>
      </NavbarStyled>
    );
  }

  return (
    <NavbarStyled>
      <NavContent>
        <Logo href="/dashboard">
          <Briefcase size={28} color="#667eea" />
          <h1>HuntLog</h1>
        </Logo>

        <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </MobileMenuButton>

        <NavLinks $isOpen={mobileMenuOpen}>
          <NavLink
            href="/dashboard"
            style={{ color: isActive("/dashboard") ? "#667eea" : "#6b7280" }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Home size={16} />
            Dashboard
          </NavLink>

          <NavLink
            href="/ai-hub"
            style={{ color: isActive("/ai-hub") ? "#667eea" : "#6b7280" }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Zap size={16} />
            AI Hub
            <AIBadge>AI</AIBadge>
          </NavLink>

          <NavLink
            href="/job-matches"
            style={{ color: isActive("/job-matches") ? "#667eea" : "#6b7280" }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <TrendingUp size={16} />
            Job Matches
          </NavLink>

          <NavLink
            href="/resumes"
            style={{ color: isActive("/resumes") ? "#667eea" : "#6b7280" }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <FileText size={16} />
            Resumes
          </NavLink>

          <NavLink
            href="/cover-letter-generator"
            style={{ color: isActive("/cover-letter-generator") ? "#667eea" : "#6b7280" }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Sparkles size={16} />
            Cover Letter
          </NavLink>

          <NavLink
            href="/interview-prep"
            style={{ color: isActive("/interview-prep") ? "#667eea" : "#6b7280" }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Brain size={16} />
            Interview Prep
          </NavLink>

          <NavLink
            href="/applications/new"
            style={{ color: isActive("/applications/new") ? "#667eea" : "#6b7280" }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Briefcase size={16} />
            Add Job
          </NavLink>

          {session && (
            <UserInfo>
              <UserName>
                {session?.user?.name || session?.user?.email?.split("@")[0]}
              </UserName>
              <LogoutButton onClick={handleLogout}>
                <LogOut size={16} />
                Logout
              </LogoutButton>
            </UserInfo>
          )}
        </NavLinks>
      </NavContent>
    </NavbarStyled>
  );
}
