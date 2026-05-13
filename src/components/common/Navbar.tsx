"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import {
  Briefcase,
  LogOut,
  Menu,
  X,
  FileEdit,
  Home,
  Briefcase as BriefcaseIcon,
} from "lucide-react";
import { useState } from "react";

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
  gap: 1.5rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
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
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s;

  &:hover {
    color: #667eea;
    background: #f3f4f6;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const UserName = styled.span`
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
    color: #ef4444;
  }
`;

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

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
          >
            <Home size={18} />
            Dashboard
          </NavLink>

          <NavLink
            href="/cover-letter-generator"
            style={{
              color: isActive("/cover-letter-generator")
                ? "#667eea"
                : "#6b7280",
            }}
          >
            <FileEdit size={18} />
            Cover Letter
          </NavLink>

          <UserInfo>
            <UserName>
              👋 {session?.user?.name || session?.user?.email?.split("@")[0]}
            </UserName>
            <LogoutButton onClick={() => signOut()}>
              <LogOut size={18} />
              <span>Logout</span>
            </LogoutButton>
          </UserInfo>
        </NavLinks>
      </NavContent>
    </NavbarStyled>
  );
}
