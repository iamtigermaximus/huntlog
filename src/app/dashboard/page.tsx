// "use client";

// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import styled from "styled-components";
// import { signOut } from "next-auth/react";
// import {
//   Briefcase,
//   Calendar,
//   TrendingUp,
//   LogOut,
//   Plus,
//   CheckCircle,
//   Clock,
//   XCircle,
//   FileText,
//   Award,
//   AlertCircle,
//   Menu,
//   X,
//   Search,
//   Filter,
//   ChevronDown,
// } from "lucide-react";
// import Link from "next/link";
// import toast from "react-hot-toast";

// const Container = styled.div`
//   min-height: 100vh;
//   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
// `;

// const Navbar = styled.nav`
//   background: white;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//   position: sticky;
//   top: 0;
//   z-index: 50;
// `;

// const NavContent = styled.div`
//   max-width: 1400px;
//   margin: 0 auto;
//   padding: 1rem 2rem;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;

//   @media (max-width: 768px) {
//     padding: 0.75rem 1rem;
//   }
// `;

// const Logo = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;

//   h1 {
//     font-size: 1.5rem;
//     font-weight: bold;
//     background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     background-clip: text;
//   }
// `;

// const MobileMenuButton = styled.button`
//   display: none;
//   background: none;
//   border: none;
//   cursor: pointer;
//   padding: 0.5rem;

//   @media (max-width: 768px) {
//     display: block;
//   }
// `;

// const NavLinks = styled.div<{ $isOpen: boolean }>`
//   display: flex;
//   align-items: center;
//   gap: 1.5rem;

//   @media (max-width: 768px) {
//     position: fixed;
//     top: 60px;
//     left: 0;
//     right: 0;
//     background: white;
//     flex-direction: column;
//     padding: 1rem;
//     gap: 1rem;
//     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//     transform: ${(props) =>
//       props.$isOpen ? "translateY(0)" : "translateY(-100%)"};
//     opacity: ${(props) => (props.$isOpen ? "1" : "0")};
//     visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
//     transition: all 0.3s ease;
//     z-index: 40;
//   }
// `;

// const UserInfo = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 1rem;

//   @media (max-width: 768px) {
//     width: 100%;
//     justify-content: center;
//   }
// `;

// const UserName = styled.span`
//   font-weight: 600;
//   color: #374151;
//   font-size: 0.875rem;
// `;

// const LogoutButton = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   color: #6b7280;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   padding: 0.5rem 0.75rem;
//   border-radius: 0.5rem;
//   transition: all 0.2s;

//   &:hover {
//     background: #f3f4f6;
//     color: #ef4444;
//   }
// `;

// const MainContent = styled.main`
//   max-width: 1400px;
//   margin: 0 auto;
//   padding: 2rem;

//   @media (max-width: 768px) {
//     padding: 1rem;
//   }
// `;

// const WelcomeSection = styled.div`
//   margin-bottom: 2rem;

//   h2 {
//     color: white;
//     font-size: 1.875rem;
//     font-weight: bold;
//     margin-bottom: 0.5rem;
//   }

//   p {
//     color: rgba(255, 255, 255, 0.9);
//   }

//   @media (max-width: 768px) {
//     h2 {
//       font-size: 1.5rem;
//     }
//   }
// `;

// const StatsGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
//   gap: 1.5rem;
//   margin-bottom: 2rem;

//   @media (max-width: 640px) {
//     grid-template-columns: 1fr;
//     gap: 1rem;
//   }
// `;

// const StatCard = styled.div<{ $color: string }>`
//   background: white;
//   border-radius: 1rem;
//   padding: 1.5rem;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   transition: all 0.3s;
//   border-bottom: 4px solid ${(props) => props.$color};

//   &:hover {
//     transform: translateY(-4px);
//     box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
//   }
// `;

// const StatHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 0.75rem;
// `;

// const StatTitle = styled.h3`
//   color: #6b7280;
//   font-size: 0.875rem;
//   font-weight: 600;
//   text-transform: uppercase;
//   letter-spacing: 0.05em;
// `;

// const StatIcon = styled.div`
//   color: #9ca3af;
// `;

// const StatValue = styled.div`
//   font-size: 2.5rem;
//   font-weight: bold;
//   color: #1f2937;

//   @media (max-width: 640px) {
//     font-size: 2rem;
//   }
// `;

// const StatSubtext = styled.p`
//   color: #9ca3af;
//   font-size: 0.75rem;
//   margin-top: 0.5rem;
// `;

// // Search & Filter Bar
// const SearchBar = styled.div`
//   display: flex;
//   gap: 1rem;
//   margin-bottom: 1.5rem;
//   flex-wrap: wrap;
// `;

// const SearchInput = styled.div`
//   flex: 1;
//   display: flex;
//   align-items: center;
//   background: white;
//   border-radius: 0.75rem;
//   padding: 0.6rem 1rem;
//   gap: 0.5rem;
//   max-width: 350px;

//   input {
//     flex: 1;
//     border: none;
//     outline: none;
//     font-size: 0.875rem;
//     background: transparent;
//   }
// `;

// const FilterSelect = styled.select`
//   padding: 0.6rem 1rem;
//   border-radius: 0.75rem;
//   border: none;
//   background: white;
//   cursor: pointer;
//   font-size: 0.875rem;
//   min-width: 140px;
// `;

// const SortButton = styled.button`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   padding: 0.6rem 1rem;
//   border-radius: 0.75rem;
//   border: none;
//   background: white;
//   cursor: pointer;
//   font-size: 0.875rem;
//   transition: all 0.2s;

//   &:hover {
//     background: #f3f4f6;
//   }
// `;

// const ResultsCount = styled.div`
//   color: white;
//   font-size: 0.875rem;
//   margin-bottom: 1rem;
//   opacity: 0.8;
// `;

// const SectionHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 1.5rem;
//   flex-wrap: wrap;
//   gap: 1rem;

//   h3 {
//     color: white;
//     font-size: 1.25rem;
//     font-weight: 600;
//   }
// `;

// const AddButton = styled(Link)`
//   background: white;
//   color: #667eea;
//   padding: 0.625rem 1.25rem;
//   border-radius: 0.5rem;
//   text-decoration: none;
//   font-weight: 600;
//   font-size: 0.875rem;
//   display: inline-flex;
//   align-items: center;
//   gap: 0.5rem;
//   transition: all 0.2s;

//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
//   }
// `;

// const ApplicationsGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
//   gap: 1.5rem;

//   @media (max-width: 640px) {
//     grid-template-columns: 1fr;
//     gap: 1rem;
//   }
// `;

// const ApplicationCard = styled.div`
//   background: white;
//   border-radius: 1rem;
//   padding: 1.25rem;
//   cursor: pointer;
//   transition: all 0.2s;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//   border: 1px solid #e5e7eb;

//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
//     border-color: #667eea;
//   }
// `;

// const CardHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: flex-start;
//   margin-bottom: 0.75rem;
// `;

// const JobTitle = styled.h4`
//   font-size: 1rem;
//   font-weight: 600;
//   color: #1f2937;
//   margin-bottom: 0.25rem;
// `;

// const Company = styled.p`
//   color: #667eea;
//   font-weight: 500;
//   font-size: 0.875rem;
// `;

// const StatusBadge = styled.span<{ $status: string }>`
//   display: inline-flex;
//   align-items: center;
//   gap: 0.25rem;
//   padding: 0.25rem 0.75rem;
//   border-radius: 9999px;
//   font-size: 0.7rem;
//   font-weight: 600;
//   background: ${(props) => {
//     switch (props.$status) {
//       case "APPLIED":
//         return "#e3f2fd";
//       case "PHONE_SCREEN":
//         return "#fff3e0";
//       case "TECHNICAL":
//         return "#f3e5f5";
//       case "ONSITE":
//         return "#e8eaf6";
//       case "OFFER":
//         return "#e8f5e9";
//       case "REJECTED":
//         return "#ffebee";
//       default:
//         return "#f5f5f5";
//     }
//   }};
//   color: ${(props) => {
//     switch (props.$status) {
//       case "APPLIED":
//         return "#1976d2";
//       case "PHONE_SCREEN":
//         return "#f57c00";
//       case "TECHNICAL":
//         return "#7b1fa2";
//       case "ONSITE":
//         return "#3949ab";
//       case "OFFER":
//         return "#388e3c";
//       case "REJECTED":
//         return "#d32f2f";
//       default:
//         return "#666";
//     }
//   }};
// `;

// const CardDetails = styled.div`
//   margin-top: 0.75rem;
//   padding-top: 0.75rem;
//   border-top: 1px solid #f0f0f0;
// `;

// const MatchScore = styled.div<{ $score: number }>`
//   display: inline-flex;
//   align-items: center;
//   gap: 0.25rem;
//   font-size: 0.7rem;
//   padding: 0.2rem 0.5rem;
//   border-radius: 0.25rem;
//   background: ${(props) => {
//     if (props.$score >= 80) return "#e8f5e9";
//     if (props.$score >= 60) return "#fff3e0";
//     return "#ffebee";
//   }};
//   color: ${(props) => {
//     if (props.$score >= 80) return "#388e3c";
//     if (props.$score >= 60) return "#f57c00";
//     return "#d32f2f";
//   }};
// `;

// const ReceiptStatus = styled.div<{ $received: boolean }>`
//   display: inline-flex;
//   align-items: center;
//   gap: 0.25rem;
//   font-size: 0.7rem;
//   color: ${(props) => (props.$received ? "#388e3c" : "#f57c00")};
// `;

// const DateText = styled.p`
//   color: #9ca3af;
//   font-size: 0.7rem;
//   margin-top: 0.5rem;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   flex-wrap: wrap;
// `;

// const EmptyState = styled.div`
//   text-align: center;
//   padding: 4rem 2rem;
//   background: rgba(255, 255, 255, 0.1);
//   border-radius: 1rem;
//   backdrop-filter: blur(10px);

//   p {
//     color: white;
//     margin-bottom: 1rem;
//   }
// `;

// interface Application {
//   id: string;
//   jobTitle: string;
//   company: string;
//   status: string;
//   appliedDate: string;
//   confirmationReceived: boolean;
//   matchScore?: number;
//   jobExpirationDate?: string;
// }

// type SortOrder = "latest" | "oldest";

// export default function DashboardPage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [applications, setApplications] = useState<Application[]>([]);
//   const [filteredApplications, setFilteredApplications] = useState<
//     Application[]
//   >([]);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [statusFilter, setStatusFilter] = useState<string>("ALL");
//   const [sortOrder, setSortOrder] = useState<SortOrder>("latest");
//   const [showSortMenu, setShowSortMenu] = useState<boolean>(false);
//   const [stats, setStats] = useState({
//     total: 0,
//     interviewing: 0,
//     offers: 0,
//     pendingConfirmation: 0,
//     avgMatchScore: 0,
//   });
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const fetchApplications = async () => {
//     try {
//       const response = await fetch("/api/applications");
//       const data = await response.json();
//       setApplications(data);
//       setFilteredApplications(data);

//       const interviewing = data.filter((app: Application) =>
//         ["PHONE_SCREEN", "TECHNICAL", "ONSITE"].includes(app.status),
//       ).length;
//       const offers = data.filter(
//         (app: Application) => app.status === "OFFER",
//       ).length;
//       const pendingConfirmation = data.filter(
//         (app: Application) =>
//           app.status === "APPLIED" && !app.confirmationReceived,
//       ).length;
//       const avgMatchScore =
//         data.length > 0
//           ? Math.round(
//               data.reduce(
//                 (sum: number, app: Application) => sum + (app.matchScore || 0),
//                 0,
//               ) / data.length,
//             )
//           : 0;

//       setStats({
//         total: data.length,
//         interviewing,
//         offers,
//         pendingConfirmation,
//         avgMatchScore,
//       });
//     } catch (error) {
//       toast.error("Failed to load applications");
//     }
//   };

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/login");
//     } else if (status === "authenticated") {
//       fetchApplications();
//     }
//   }, [status, router]);

//   // Filter and sort applications whenever search, filter, or applications change
//   useEffect(() => {
//     let filtered = [...applications];

//     // Filter by status
//     if (statusFilter !== "ALL") {
//       filtered = filtered.filter((app) => app.status === statusFilter);
//     }

//     // Filter by search term
//     if (searchTerm.trim() !== "") {
//       const term = searchTerm.toLowerCase();
//       filtered = filtered.filter(
//         (app) =>
//           app.jobTitle.toLowerCase().includes(term) ||
//           app.company.toLowerCase().includes(term),
//       );
//     }

//     // Sort by date
//     filtered.sort((a, b) => {
//       const dateA = new Date(a.appliedDate).getTime();
//       const dateB = new Date(b.appliedDate).getTime();
//       return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
//     });
//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     setFilteredApplications(filtered);
//   }, [applications, searchTerm, statusFilter, sortOrder]);

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "APPLIED":
//         return <Clock size={12} />;
//       case "OFFER":
//         return <Award size={12} />;
//       case "REJECTED":
//         return <XCircle size={12} />;
//       default:
//         return <Briefcase size={12} />;
//     }
//   };

//   const isExpiringSoon = (date?: string) => {
//     if (!date) return false;
//     const daysLeft = Math.ceil(
//       (new Date(date).getTime() - new Date().getTime()) / (1000 * 3600 * 24),
//     );
//     return daysLeft <= 7 && daysLeft > 0;
//   };

//   if (status === "loading") {
//     return (
//       <Container>
//         <MainContent>
//           <div
//             style={{ color: "white", textAlign: "center", paddingTop: "3rem" }}
//           >
//             Loading your dashboard...
//           </div>
//         </MainContent>
//       </Container>
//     );
//   }

//   return (
//     <Container>
//       {/* <Navbar>
//         <NavContent>
//           <Logo>
//             <Briefcase size={28} color="#667eea" />
//             <h1>HuntLog</h1>
//           </Logo>

//           <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
//             {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </MobileMenuButton>

//           <NavLinks $isOpen={mobileMenuOpen}>
//             <UserInfo>
//               <UserName>
//                 👋 {session?.user?.name || session?.user?.email?.split("@")[0]}
//               </UserName>
//               <LogoutButton onClick={() => signOut()}>
//                 <LogOut size={18} />
//                 <span>Logout</span>
//               </LogoutButton>
//             </UserInfo>
//           </NavLinks>
//         </NavContent>
//       </Navbar> */}

//       <MainContent>
//         <WelcomeSection>
//           <h2>
//             Welcome back, {session?.user?.name?.split(" ")[0] || "Job Seeker"}!
//           </h2>
//           <p>
//             Track your job applications, get AI-powered insights, and land your
//             dream job.
//           </p>
//         </WelcomeSection>

//         <StatsGrid>
//           <StatCard $color="#667eea">
//             <StatHeader>
//               <StatTitle>Total Applications</StatTitle>
//               <StatIcon>
//                 <Briefcase size={18} />
//               </StatIcon>
//             </StatHeader>
//             <StatValue>{stats.total}</StatValue>
//             <StatSubtext>Applications submitted</StatSubtext>
//           </StatCard>

//           <StatCard $color="#f59e0b">
//             <StatHeader>
//               <StatTitle>In Interviewing</StatTitle>
//               <StatIcon>
//                 <Calendar size={18} />
//               </StatIcon>
//             </StatHeader>
//             <StatValue>{stats.interviewing}</StatValue>
//             <StatSubtext>Active interview processes</StatSubtext>
//           </StatCard>

//           <StatCard $color="#10b981">
//             <StatHeader>
//               <StatTitle>Offers Received</StatTitle>
//               <StatIcon>
//                 <Award size={18} />
//               </StatIcon>
//             </StatHeader>
//             <StatValue>{stats.offers}</StatValue>
//             <StatSubtext>Job offers</StatSubtext>
//           </StatCard>

//           <StatCard $color="#ef4444">
//             <StatHeader>
//               <StatTitle>Need Confirmation</StatTitle>
//               <StatIcon>
//                 <AlertCircle size={18} />
//               </StatIcon>
//             </StatHeader>
//             <StatValue>{stats.pendingConfirmation}</StatValue>
//             <StatSubtext>Awaiting receipt confirmation</StatSubtext>
//           </StatCard>
//         </StatsGrid>

//         <SectionHeader>
//           <h3>Your Applications</h3>
//           <AddButton href="/applications/new">
//             <Plus size={18} />
//             Add New Application
//           </AddButton>
//         </SectionHeader>

//         {/* Search and Filter Bar */}
//         <SearchBar>
//           <SearchInput>
//             <Search size={16} color="#9ca3af" />
//             <input
//               type="text"
//               placeholder="Search by job title or company..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </SearchInput>

//           <FilterSelect
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//           >
//             <option value="ALL">All Status</option>
//             <option value="APPLIED">Applied</option>
//             <option value="PHONE_SCREEN">Phone Screen</option>
//             <option value="TECHNICAL">Technical</option>
//             <option value="ONSITE">Onsite</option>
//             <option value="OFFER">Offer</option>
//             <option value="REJECTED">Rejected</option>
//           </FilterSelect>

//           <SortButton onClick={() => setShowSortMenu(!showSortMenu)}>
//             <Filter size={14} />
//             {sortOrder === "latest" ? "Latest First" : "Oldest First"}
//             <ChevronDown size={14} />
//           </SortButton>
//         </SearchBar>

//         {/* Hidden sort menu (simple inline options) */}
//         {showSortMenu && (
//           <div
//             style={{
//               position: "absolute",
//               background: "white",
//               borderRadius: "0.5rem",
//               boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//               marginTop: "2.5rem",
//               zIndex: 10,
//             }}
//           >
//             <button
//               onClick={() => {
//                 setSortOrder("latest");
//                 setShowSortMenu(false);
//               }}
//               style={{
//                 display: "block",
//                 width: "100%",
//                 padding: "0.5rem 1rem",
//                 border: "none",
//                 background: "none",
//                 cursor: "pointer",
//                 textAlign: "left",
//                 borderRadius: "0.5rem",
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.background = "#f3f4f6")
//               }
//               onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
//             >
//               Latest First
//             </button>
//             <button
//               onClick={() => {
//                 setSortOrder("oldest");
//                 setShowSortMenu(false);
//               }}
//               style={{
//                 display: "block",
//                 width: "100%",
//                 padding: "0.5rem 1rem",
//                 border: "none",
//                 background: "none",
//                 cursor: "pointer",
//                 textAlign: "left",
//                 borderRadius: "0.5rem",
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.background = "#f3f4f6")
//               }
//               onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
//             >
//               Oldest First
//             </button>
//           </div>
//         )}

//         <ResultsCount>
//           Showing {filteredApplications.length} of {applications.length}{" "}
//           applications
//         </ResultsCount>

//         <ApplicationsGrid>
//           {filteredApplications.map((app) => (
//             <ApplicationCard
//               key={app.id}
//               onClick={() => router.push(`/applications/${app.id}`)}
//             >
//               <CardHeader>
//                 <div>
//                   <JobTitle>{app.jobTitle}</JobTitle>
//                   <Company>{app.company}</Company>
//                 </div>
//                 <StatusBadge $status={app.status}>
//                   {getStatusIcon(app.status)} {app.status.replace("_", " ")}
//                 </StatusBadge>
//               </CardHeader>

//               <CardDetails>
//                 <div
//                   style={{
//                     display: "flex",
//                     gap: "0.5rem",
//                     flexWrap: "wrap",
//                     marginBottom: "0.5rem",
//                   }}
//                 >
//                   {app.matchScore && (
//                     <MatchScore $score={app.matchScore}>
//                       📊 Match: {app.matchScore}%
//                     </MatchScore>
//                   )}
//                   <ReceiptStatus $received={app.confirmationReceived}>
//                     {app.confirmationReceived ? (
//                       <>
//                         <CheckCircle size={12} /> Confirmed
//                       </>
//                     ) : (
//                       <>
//                         <Clock size={12} /> Pending confirmation
//                       </>
//                     )}
//                   </ReceiptStatus>
//                   {isExpiringSoon(app.jobExpirationDate) && (
//                     <MatchScore $score={0}>⚠️ Expires soon</MatchScore>
//                   )}
//                 </div>
//                 <DateText>
//                   <span>
//                     📅 Applied: {new Date(app.appliedDate).toLocaleDateString()}
//                   </span>
//                   {app.jobExpirationDate && (
//                     <span>
//                       ⏰ Expires:{" "}
//                       {new Date(app.jobExpirationDate).toLocaleDateString()}
//                     </span>
//                   )}
//                 </DateText>
//               </CardDetails>
//             </ApplicationCard>
//           ))}

//           {filteredApplications.length === 0 && (
//             <EmptyState>
//               <FileText
//                 size={48}
//                 style={{ marginBottom: "1rem", color: "rgba(255,255,255,0.5)" }}
//               />
//               <p>
//                 {searchTerm || statusFilter !== "ALL"
//                   ? "No matching applications found. Try adjusting your search or filter."
//                   : "No applications yet. Start tracking your job hunt!"}
//               </p>
//               <AddButton
//                 href="/applications/new"
//                 style={{ background: "white" }}
//               >
//                 <Plus size={18} />
//                 Add Your First Application
//               </AddButton>
//             </EmptyState>
//           )}
//         </ApplicationsGrid>
//       </MainContent>
//     </Container>
//   );
// }
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { signOut } from "next-auth/react";
import {
  Briefcase,
  Calendar,
  TrendingUp,
  LogOut,
  Plus,
  CheckCircle,
  Clock,
  XCircle,
  FileText,
  Award,
  AlertCircle,
  Menu,
  X,
  Search,
  Filter,
  ChevronDown,
  StickyNote,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const Navbar = styled.nav`
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

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

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

const MainContent = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const WelcomeSection = styled.div`
  margin-bottom: 2rem;

  h2 {
    color: white;
    font-size: 1.875rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  p {
    color: rgba(255, 255, 255, 0.9);
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 1.5rem;
    }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const StatCard = styled.div<{ $color: string }>`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  border-bottom: 4px solid ${(props) => props.$color};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;

const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const StatTitle = styled.h3`
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const StatIcon = styled.div`
  color: #9ca3af;
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #1f2937;

  @media (max-width: 640px) {
    font-size: 2rem;
  }
`;

const StatSubtext = styled.p`
  color: #9ca3af;
  font-size: 0.75rem;
  margin-top: 0.5rem;
`;

const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const SearchInput = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 0.75rem;
  padding: 0.6rem 1rem;
  gap: 0.5rem;
  max-width: 350px;

  input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 0.875rem;
    background: transparent;
  }
`;

const FilterSelect = styled.select`
  padding: 0.6rem 1rem;
  border-radius: 0.75rem;
  border: none;
  background: white;
  cursor: pointer;
  font-size: 0.875rem;
  min-width: 140px;
`;

const SortButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: 0.75rem;
  border: none;
  background: white;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
  }
`;

const ResultsCount = styled.div`
  color: white;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  opacity: 0.8;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;

  h3 {
    color: white;
    font-size: 1.25rem;
    font-weight: 600;
  }
`;

const AddButton = styled(Link)`
  background: white;
  color: #667eea;
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.875rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ApplicationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 1.5rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const ApplicationCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    border-color: #667eea;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
`;

const JobTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
`;

const Company = styled.p`
  color: #667eea;
  font-weight: 500;
  font-size: 0.875rem;
`;

const StatusBadge = styled.span<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 600;
  background: ${(props) => {
    switch (props.$status) {
      case "APPLIED":
        return "#e3f2fd";
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

const CardDetails = styled.div`
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid #f0f0f0;
`;

const MatchScore = styled.div<{ $score: number }>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
  background: ${(props) => {
    if (props.$score >= 80) return "#e8f5e9";
    if (props.$score >= 60) return "#fff3e0";
    return "#ffebee";
  }};
  color: ${(props) => {
    if (props.$score >= 80) return "#388e3c";
    if (props.$score >= 60) return "#f57c00";
    return "#d32f2f";
  }};
`;

const ReceiptStatus = styled.div<{ $received: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.7rem;
  color: ${(props) => (props.$received ? "#388e3c" : "#f57c00")};
`;

const NotesPreview = styled.div`
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  font-size: 0.7rem;
  color: #6b7280;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  width: 100%;

  span {
    white-space: normal;
    word-break: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex: 1;
  }
`;

const DateText = styled.p`
  color: #9ca3af;
  font-size: 0.7rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  backdrop-filter: blur(10px);

  p {
    color: white;
    margin-bottom: 1rem;
  }
`;

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  status: string;
  appliedDate: string;
  confirmationReceived: boolean;
  matchScore?: number;
  jobExpirationDate?: string;
  notes?: string;
}

type SortOrder = "latest" | "oldest";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<
    Application[]
  >([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [sortOrder, setSortOrder] = useState<SortOrder>("latest");
  const [showSortMenu, setShowSortMenu] = useState<boolean>(false);
  const [stats, setStats] = useState({
    total: 0,
    interviewing: 0,
    offers: 0,
    pendingConfirmation: 0,
    avgMatchScore: 0,
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fetchApplications = async () => {
    try {
      const response = await fetch("/api/applications");
      const data = await response.json();
      setApplications(data);
      setFilteredApplications(data);

      const interviewing = data.filter((app: Application) =>
        ["PHONE_SCREEN", "TECHNICAL", "ONSITE"].includes(app.status),
      ).length;
      const offers = data.filter(
        (app: Application) => app.status === "OFFER",
      ).length;
      const pendingConfirmation = data.filter(
        (app: Application) =>
          app.status === "APPLIED" && !app.confirmationReceived,
      ).length;
      const avgMatchScore =
        data.length > 0
          ? Math.round(
              data.reduce(
                (sum: number, app: Application) => sum + (app.matchScore || 0),
                0,
              ) / data.length,
            )
          : 0;

      setStats({
        total: data.length,
        interviewing,
        offers,
        pendingConfirmation,
        avgMatchScore,
      });
    } catch (error) {
      toast.error("Failed to load applications");
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      fetchApplications();
    }
  }, [status, router]);

  useEffect(() => {
    let filtered = [...applications];

    if (statusFilter !== "ALL") {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }

    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (app) =>
          app.jobTitle.toLowerCase().includes(term) ||
          app.company.toLowerCase().includes(term),
      );
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.appliedDate).getTime();
      const dateB = new Date(b.appliedDate).getTime();
      return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
    });
    setFilteredApplications(filtered);
  }, [applications, searchTerm, statusFilter, sortOrder]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "APPLIED":
        return <Clock size={12} />;
      case "OFFER":
        return <Award size={12} />;
      case "REJECTED":
        return <XCircle size={12} />;
      default:
        return <Briefcase size={12} />;
    }
  };

  const isExpiringSoon = (date?: string) => {
    if (!date) return false;
    const daysLeft = Math.ceil(
      (new Date(date).getTime() - new Date().getTime()) / (1000 * 3600 * 24),
    );
    return daysLeft <= 7 && daysLeft > 0;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid date";
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return "Invalid date";
    }
  };

  if (status === "loading") {
    return (
      <Container>
        <MainContent>
          <div
            style={{ color: "white", textAlign: "center", paddingTop: "3rem" }}
          >
            Loading your dashboard...
          </div>
        </MainContent>
      </Container>
    );
  }

  return (
    <Container>
      <MainContent>
        <WelcomeSection>
          <h2>
            Welcome back, {session?.user?.name?.split(" ")[0] || "Job Seeker"}!
          </h2>
          <p>
            Track your job applications, get AI-powered insights, and land your
            dream job.
          </p>
        </WelcomeSection>

        <StatsGrid>
          <StatCard $color="#667eea">
            <StatHeader>
              <StatTitle>Total Applications</StatTitle>
              <StatIcon>
                <Briefcase size={18} />
              </StatIcon>
            </StatHeader>
            <StatValue>{stats.total}</StatValue>
            <StatSubtext>Applications submitted</StatSubtext>
          </StatCard>

          <StatCard $color="#f59e0b">
            <StatHeader>
              <StatTitle>In Interviewing</StatTitle>
              <StatIcon>
                <Calendar size={18} />
              </StatIcon>
            </StatHeader>
            <StatValue>{stats.interviewing}</StatValue>
            <StatSubtext>Active interview processes</StatSubtext>
          </StatCard>

          <StatCard $color="#10b981">
            <StatHeader>
              <StatTitle>Offers Received</StatTitle>
              <StatIcon>
                <Award size={18} />
              </StatIcon>
            </StatHeader>
            <StatValue>{stats.offers}</StatValue>
            <StatSubtext>Job offers</StatSubtext>
          </StatCard>

          <StatCard $color="#ef4444">
            <StatHeader>
              <StatTitle>Need Confirmation</StatTitle>
              <StatIcon>
                <AlertCircle size={18} />
              </StatIcon>
            </StatHeader>
            <StatValue>{stats.pendingConfirmation}</StatValue>
            <StatSubtext>Awaiting receipt confirmation</StatSubtext>
          </StatCard>
        </StatsGrid>

        <SectionHeader>
          <h3>Your Applications</h3>
          <AddButton href="/applications/new">
            <Plus size={18} />
            Add New Application
          </AddButton>
        </SectionHeader>

        <SearchBar>
          <SearchInput>
            <Search size={16} color="#9ca3af" />
            <input
              type="text"
              placeholder="Search by job title or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchInput>

          <FilterSelect
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="APPLIED">Applied</option>
            <option value="PHONE_SCREEN">Phone Screen</option>
            <option value="TECHNICAL">Technical</option>
            <option value="ONSITE">Onsite</option>
            <option value="OFFER">Offer</option>
            <option value="REJECTED">Rejected</option>
          </FilterSelect>

          <SortButton onClick={() => setShowSortMenu(!showSortMenu)}>
            <Filter size={14} />
            {sortOrder === "latest" ? "Latest First" : "Oldest First"}
            <ChevronDown size={14} />
          </SortButton>
        </SearchBar>

        {showSortMenu && (
          <div
            style={{
              position: "absolute",
              background: "white",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              marginTop: "2.5rem",
              zIndex: 10,
            }}
          >
            <button
              onClick={() => {
                setSortOrder("latest");
                setShowSortMenu(false);
              }}
              style={{
                display: "block",
                width: "100%",
                padding: "0.5rem 1rem",
                border: "none",
                background: "none",
                cursor: "pointer",
                textAlign: "left",
                borderRadius: "0.5rem",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#f3f4f6")
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
            >
              Latest First
            </button>
            <button
              onClick={() => {
                setSortOrder("oldest");
                setShowSortMenu(false);
              }}
              style={{
                display: "block",
                width: "100%",
                padding: "0.5rem 1rem",
                border: "none",
                background: "none",
                cursor: "pointer",
                textAlign: "left",
                borderRadius: "0.5rem",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#f3f4f6")
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
            >
              Oldest First
            </button>
          </div>
        )}

        <ResultsCount>
          Showing {filteredApplications.length} of {applications.length}{" "}
          applications
        </ResultsCount>

        <ApplicationsGrid>
          {filteredApplications.map((app) => (
            <ApplicationCard
              key={app.id}
              onClick={() => router.push(`/applications/${app.id}`)}
            >
              <CardHeader>
                <div>
                  <JobTitle>{app.jobTitle}</JobTitle>
                  <Company>{app.company}</Company>
                </div>
                <StatusBadge $status={app.status}>
                  {getStatusIcon(app.status)} {app.status.replace("_", " ")}
                </StatusBadge>
              </CardHeader>

              <CardDetails>
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    flexWrap: "wrap",
                    marginBottom: "0.5rem",
                  }}
                >
                  {app.matchScore && (
                    <MatchScore $score={app.matchScore}>
                      📊 Match: {app.matchScore}%
                    </MatchScore>
                  )}
                  <ReceiptStatus $received={app.confirmationReceived}>
                    {app.confirmationReceived ? (
                      <>
                        <CheckCircle size={12} /> Confirmed
                      </>
                    ) : (
                      <>
                        <Clock size={12} /> Pending confirmation
                      </>
                    )}
                  </ReceiptStatus>
                  {isExpiringSoon(app.jobExpirationDate) && (
                    <MatchScore $score={0}>⚠️ Expires soon</MatchScore>
                  )}
                </div>

                {/* Display Notes Preview */}
                {app.notes && app.notes.trim() !== "" && (
                  <NotesPreview>
                    <StickyNote size={12} />
                    <span>{app.notes}</span>
                  </NotesPreview>
                )}

                <DateText>
                  <span>📅 Applied: {formatDate(app.appliedDate)}</span>
                  {app.jobExpirationDate && (
                    <span>⏰ Expires: {formatDate(app.jobExpirationDate)}</span>
                  )}
                </DateText>
              </CardDetails>
            </ApplicationCard>
          ))}

          {filteredApplications.length === 0 && (
            <EmptyState>
              <FileText
                size={48}
                style={{ marginBottom: "1rem", color: "rgba(255,255,255,0.5)" }}
              />
              <p>
                {searchTerm || statusFilter !== "ALL"
                  ? "No matching applications found. Try adjusting your search or filter."
                  : "No applications yet. Start tracking your job hunt!"}
              </p>
              <AddButton
                href="/applications/new"
                style={{ background: "white" }}
              >
                <Plus size={18} />
                Add Your First Application
              </AddButton>
            </EmptyState>
          )}
        </ApplicationsGrid>
      </MainContent>
    </Container>
  );
}
