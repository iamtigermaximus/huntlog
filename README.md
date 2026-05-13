# 🎯 HuntLog - Job Application Tracker

A modern job application tracking platform that helps you manage your job search, track applications, and get AI-powered insights to land your dream job.

## ✨ Features

- **🔐 Authentication** - Secure login with email/password using NextAuth.js
- **📊 Dashboard** - Overview of your job search with key metrics
- **📝 Application Tracking** - Track job applications with status updates
- **🎨 Modern UI** - Beautiful, responsive design with styled-components
- **📱 Mobile Friendly** - Fully responsive navigation and layouts
- **🔔 Notifications** - Real-time feedback with react-hot-toast
- **📄 Resume Parsing** - Extract data from PDF resumes (server-side)
- **💾 PostgreSQL** - Persistent data storage with Prisma ORM

## 🛠️ Tech Stack

- **Framework**: Next.js 16.2.6 with Turbopack
- **Language**: TypeScript
- **Authentication**: NextAuth.js (v4)
- **Database**: PostgreSQL with Prisma ORM (v7)
- **Styling**: Styled-components
- **Icons**: Lucide React
- **UI Components**: Custom components with modern CSS
- **File Upload**: react-dropzone
- **PDF Processing**: pdf-parse (server-side)
- **Notifications**: react-hot-toast

## 📋 Prerequisites

- Node.js (v18 or later)
- PostgreSQL database (local or cloud)
- npm or yarn package manager

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd huntlog
2. Install Dependencies
bash
npm install
3. Set Up Environment Variables
Create a .env file in the root directory:

env
DATABASE_URL="postgresql://username:password@localhost:5432/huntlog"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
Generate a secure NEXTAUTH_SECRET:

bash
openssl rand -base64 32
4. Set Up the Database
bash
# Push the schema to your database
npx prisma db push

# Generate Prisma Client
npx prisma generate
5. Run the Development Server
bash
npm run dev
Open http://localhost:3000 to see the app.

📦 Available Scripts
Command	Description
npm run dev	Start development server with Turbopack
npm run build	Create production build
npm start	Start production server
npm run lint	Run ESLint for code quality
npx prisma studio	Open Prisma Studio to view/edit data
npx prisma db push	Update database schema
🗄️ Database Schema
User Model
id - Unique identifier

name - User's full name

email - Unique email address

password - Hashed password (bcryptjs)

Application Model (Planned)
id - Unique identifier

jobTitle - Position applied for

company - Company name

status - Application status (APPLIED, PHONE_SCREEN, TECHNICAL, ONSITE, OFFER, REJECTED)

appliedDate - Date of application

confirmationReceived - Whether receipt was confirmed

matchScore - AI-powered match percentage

jobExpirationDate - Optional expiration date

🎨 Application Status Flow
APPLIED - Initial submission

PHONE_SCREEN - Initial phone interview

TECHNICAL - Technical assessment

ONSITE - Final interview round

OFFER - Job offer received

REJECTED - Application unsuccessful

📁 Project Structure
text
huntlog/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.ts  # NextAuth configuration
│   │   │   ├── applications/                # Application CRUD endpoints
│   │   │   └── register/route.ts            # User registration
│   │   ├── dashboard/page.tsx               # Main dashboard
│   │   ├── login/page.tsx                   # Login page
│   │   ├── register/page.tsx                # Registration page
│   │   ├── applications/
│   │   │   └── new/page.tsx                 # Add new application
│   │   └── layout.tsx                       # Root layout with providers
│   ├── lib/
│   │   ├── prisma.ts                        # Prisma client instance
│   │   ├── auth.ts                          # Authentication helpers
│   │   └── registry.tsx                     # Styled-components registry
│   └── types/
│       └── next-auth.d.ts                   # NextAuth type extensions
├── prisma/
│   └── schema.prisma                        # Database schema
├── prisma.config.ts                         # Prisma ORM v7 config
├── .env                                     # Environment variables
└── package.json                             # Dependencies
🔧 Configuration Details
Prisma 7 Setup
This app uses Prisma ORM v7, which requires the database URL in prisma.config.ts instead of schema.prisma:

typescript
// prisma.config.ts
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  datasource: {
    url: env("DATABASE_URL"),
  },
})
NextAuth Configuration
Extended session types to include user ID:

typescript
// src/types/next-auth.d.ts
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
🚧 Upcoming Features
AI-powered resume matching with Groq

Application analytics and charts

Email notifications for deadlines

Interview scheduling calendar

Export data to CSV/PDF

Company insights and reviews

Salary comparison tool

Chrome extension for auto-tracking

🤝 Contributing
Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit changes (git commit -m 'Add amazing feature')

Push to branch (git push origin feature/amazing-feature)

Open a Pull Request
```
