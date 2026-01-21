---
description: Deploy Application to Vercel
---

# Deploying to Vercel

This application uses Next.js, Postgres (Prisma), and NextAuth. Follow these steps to deploy it to Vercel.

## 1. Prerequisites
- **GitHub Account**: Your code must be pushed to a GitHub repository.
- **Vercel Account**: Sign up at [vercel.com](https://vercel.com) using GitHub.
- **Production Database**: You need a hosted PostgreSQL database. Vercel Storage (Neon) or Supabase are excellent choices.

## 2. Push Code to GitHub
If you haven't already:
1. Create a new repository on GitHub.
2. Push your local code to the repository.
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

## 3. Set Up Production Database
You cannot use a local database (like localhost) for a deployed app.
1. Go to **[Supabase](https://supabase.com)** or **[Vercel Storage](https://vercel.com/dashboard/storage)** and create a new project.
2. Get the **Connection String** (Transaction Mode/Session Mode usually works, but Transaction PGBouncer is safer for Serverless).
3. If using Supabase, you might need the "Direct Connection" string for migrations and "Pooled" for the app.
   For now, just get the standard connection string: `postgres://user:password@host:5432/db`

## 4. Deploy on Vercel
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **"Add New..."** -> **"Project"**.
3. Import your GitHub repository.
4. **Configure Project**:
   - **Framework Preset**: Next.js (should be auto-detected).
   - **Root Directory**: `application_tracker` (Since your app is inside a subfolder, **this is crucial**).
   - **Environment Variables**: Add the following:
     - `DATABASE_URL`: Your hosted PostgreSQL connection string.
     - `AUTH_SECRET`: A random string (generate with `openssl rand -base64 32` or just type a long random string).
     - `AUTH_TRUST_HOST`: `true` (or set `NEXTAUTH_URL` to your vercel app domain after deployment, but `AUTH_TRUST_HOST` is easier).
     - Any Google/GitHub OAuth Client IDs/Secrets you used in `.env`.

5. Click **Deploy**.

## 5. Post-Deployment Steps
Once Vercel finishes building:
1. Your app might fail initially if the database schema isn't pushed.
2. Go to Vercel Settings -> **Build & Development Settings**.
3. Change the **Build Command** to:
   ```bash
   npx prisma generate && npx prisma db push && next build
   ```
   *Alternatively*, run migration locally against production DB:
   ```bash
   # In your local terminal
   export DATABASE_URL="your-production-connection-string"
   npx prisma db push
   ```
4. Redeploy if needed.
