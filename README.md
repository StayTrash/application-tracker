# LinearFlow Tracker

A premium, issue-tracking style job application tracker built with Next.js 15, MongoDB, and Tailwind CSS. Validated by the "Linear" aesthetic, it helps you manage your job search pipeline with speed and precision.

## ✨ Features

- **Kanban Board**: Drag-and-drop interface to move applications between stages (Applied, Screening, Interview, Offer, Rejected).
- **Interactive Auto-Scroll**: Smooth horizontal scrolling when dragging cards to the edge of the board.
- **Application Velocity**: Area charts visualizing your application frequency over time.
- **Pipeline Metrics**: Real-time stats on interviews, offers, and total applications with trend indicators.
- **Keyboard First**: Optimized for quick navigation and management.
- **Dark Mode by Default**: Sleek, high-contrast dark theme with subtle noise textures and gradients.
- **Authentication**: Secure Google Login via NextAuth.js.
- **Responsive**: Fully responsive design for mobile and desktop.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Directory)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, CSS Modules (for custom textures)
- **Database**: MongoDB (via Mongoose)
- **Auth**: NextAuth.js (Google Provider)
- **Animation**: Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Handling**: date-fns, react-day-picker

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB URI (Local or Atlas)
- Google Cloud Console Credentials (Client ID & Secret)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/linearflow-tracker.git
    cd linearflow-tracker
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env.local` file in the root directory and add the following:

    ```env
    # Database
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/job-tracker

    # Authentication (NextAuth.js)
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your_generated_secret_here

    # Google OAuth
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
├── app/                      # Next.js App Directory (Routes)
│   ├── api/                  # API Routes
│   │   ├── applications/     # Job applications CRUD
│   │   ├── auth/             # NextAuth.js authentication
│   │   └── documents/        # Documents CRUD
│   ├── dashboard/            # Dashboard pages
│   │   ├── documents/        # Documents view
│   │   ├── kanban/           # Kanban board view
│   │   ├── list/             # List view
│   │   ├── layout.tsx        # Dashboard layout with shell
│   │   └── page.tsx          # Dashboard overview
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Landing page
│
├── components/               # React Components (organized by feature)
│   ├── dashboard/            # Dashboard-specific components
│   │   └── DashboardView.tsx # Main dashboard with charts
│   ├── documents/            # Document management
│   │   └── DocumentsView.tsx # Document editor
│   ├── jobs/                 # Job-related components
│   │   ├── JobCard.tsx       # Individual job card
│   │   ├── JobModal.tsx      # Add/edit job modal
│   │   ├── JobsList.tsx      # Table list view
│   │   └── KanbanBoard.tsx   # Drag-and-drop board
│   ├── landing/              # Landing page components
│   │   ├── animations/       # Animated counters & effects
│   │   ├── FeaturesGrid.tsx  # Bento grid features
│   │   ├── Footer.tsx        # Site footer
│   │   ├── HeroSection.tsx   # Hero with CTAs
│   │   ├── LandingPage.tsx   # Main landing composition
│   │   ├── Navbar.tsx        # Navigation bar
│   │   └── PreviewSection.tsx# 3D app preview
│   ├── layout/               # Layout components
│   │   └── Shell.tsx         # Dashboard shell with sidebar
│   ├── providers/            # Context providers
│   │   └── SessionProvider.tsx
│   ├── skeletons/            # Loading skeletons
│   │   ├── DashboardSkeleton.tsx
│   │   ├── KanbanSkeleton.tsx
│   │   ├── ListSkeleton.tsx
│   │   └── Skeleton.tsx      # Base skeleton component
│   └── ui/                   # Shared UI components
│       ├── calendar.tsx      # Date picker
│       ├── popover.tsx       # Popover component
│       └── Toast.tsx         # Toast notifications
│
├── constants/                # App constants
│   └── index.ts              # Columns, status colors
│
├── lib/                      # Utilities & state
│   ├── context/              # React contexts
│   │   └── DashboardContext.tsx
│   ├── hooks/                # Custom hooks
│   │   └── useDebounce.ts
│   ├── store/                # Redux store
│   │   ├── features/         # Feature slices
│   │   │   ├── documents/
│   │   │   ├── jobs/
│   │   │   └── ui/
│   │   ├── hooks.ts          # Typed hooks
│   │   ├── store.ts          # Store configuration
│   │   └── StoreProvider.tsx
│   ├── db.ts                 # MongoDB connection
│   └── utils.ts              # Utility functions
│
├── models/                   # Mongoose models
│   ├── Document.ts
│   ├── JobApplication.ts
│   └── User.ts
│
├── types/                    # TypeScript types
│   ├── document.ts           # Document types
│   ├── job.ts                # Job & status types
│   ├── ui.ts                 # Toast & UI types
│   └── index.ts              # Re-exports all types
│
└── public/                   # Static assets
```

## 🔒 Deployment

Easily deploy to **Vercel**:

1.  Push your code to GitHub.
2.  Import the project into Vercel.
3.  Add the environment variables (`MONGODB_URI`, `GOOGLE_CLIENT_ID`, etc.) in the Vercel Project Settings.
4.  Deploy!

**Note:** Ensure your Google Cloud Console "Authorized JavaScript origins" and "Redirect URIs" include your Vercel deployment domain.

