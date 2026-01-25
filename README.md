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
- **Animation**: Framer Motion
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
├── app/                  # Next.js App Directory (Routes)
│   ├── api/              # API Routes (Auth, Applications)
│   ├── dashboard/        # Dashboard Page & Logic
│   ├── layout.tsx        # Root Layout
│   └── page.tsx          # Landing Page
├── components/           # React Components
│   ├── linear/           # Specific Logic (Kanban, Dashboard, JobCard)
│   ├── ui/               # Reusable UI (Buttons, Inputs, Calendar)
│   └── providers/        # Context Providers (Session)
├── lib/                  # Utilities (DB Connection)
├── models/               # Mongoose Models (User, JobApplication)
└── public/               # Static Assets
```

## 🔒 Deployment

Easily deploy to **Vercel**:

1.  Push your code to GitHub.
2.  Import the project into Vercel.
3.  Add the environment variables (`MONGODB_URI`, `GOOGLE_CLIENT_ID`, etc.) in the Vercel Project Settings.
4.  Deploy!

**Note:** Ensure your Google Cloud Console "Authorized JavaScript origins" and "Redirect URIs" include your Vercel deployment domain.

## 📄 License

MIT License. Free to use for personal and commercial projects.
