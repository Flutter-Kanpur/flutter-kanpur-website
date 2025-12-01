# Flutter Kanpur Website

This repository contains the official website for the Flutter Kanpur Developer Community.

This README provides complete instructions for:
- Running the project locally  
- Configuring Firebase  
- Setting environment variables  
- Setting up required Firestore collections  
- Understanding the project structure  

This is a full, detailed setup guide intended for contributors and maintainers.

---

# 1. Project Overview

The project powers the official Flutter Kanpur website and includes:

- Homepage statistics  
- Announcements  
- Blogs  
- Upcoming and past events  
- Firebase Admin SDK for server-side Firestore queries  
- Next.js App Router implementation  
- Mobile redirect logic for Play Store  

---

# 2. Tech Stack

- **Next.js 15 (App Router)**
- **React**
- **Material UI**
- **Firebase Web SDK**
- **Firebase Admin SDK**
- **Firestore Database**
- **Vercel Deployment**

---

# 3. Local Setup Guide

## Step 1 — Clone the repository

```bash
git clone https://github.com/<your-username>/flutter-kanpur-website.git
cd flutter-kanpur-website
Replace <your-username> with your GitHub username.

Step 2 — Install dependencies
bash
Copy code
npm install
Step 3 — Create environment variables
Create a file named:

lua
Copy code
.env.local
Paste the following:

makefile
Copy code
# Firebase Web SDK
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

# Firebase Admin SDK
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
We will fill these values in the next section.

4. Firebase – FULL Detailed Setup
Follow each step carefully.
Even beginners can complete this process by following exactly.

Step 4.1 — Create a Firebase Project
Go to: https://console.firebase.google.com

Click Add Project

Enter project name (example: flutter-kanpur-website)

Disable/Enable Google Analytics as you prefer

Click Create Project

Step 4.2 — Add a Web App (Frontend Firebase SDK)
This gives you:

apiKey

authDomain

projectId

etc.

Steps:

Inside Firebase Console → open your project

Go to Project Overview

Click </> Web App

Register app name → click Register App

Firebase will now show this block:

cpp
Copy code
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
  measurementId: "..."
};
Copy each value into:

makefile
Copy code
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
Step 4.3 — Enable Firestore Database
Required.

Steps:

Firebase Console → Firestore Database

Click Create Database

Choose Production Mode

Select region (recommended: asia-south1 or us-central1)

Click Enable

Step 4.4 — Create Firebase Admin SDK Key (Server-side)
This is needed because Next.js uses Firebase Admin for server components.

Steps:

Firebase Console → Project Settings

Open tab Service Accounts

Click Generate New Private Key

A JSON file will download (example: flutter-kanpur-adminsdk.json)

Open that file and copy:

nginx
Copy code
project_id
client_email
private_key
Paste into .env.local:

makefile
Copy code
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
IMPORTANT:
Add private key EXACT like this (including \n):

vbnet
Copy code
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nABC...\n-----END PRIVATE KEY-----\n
5. Required Firestore Collections (IMPORTANT)
The website fetches all homepage data from Firestore.

Create collection:

nginx
Copy code
homescreen_data
Under this collection, create the following documents:

Document: stats_data
css
Copy code
stats: [
  { id: 1, title: "500+", description: "Community Members" },
  { id: 2, title: "50+", description: "Events Hosted" },
  { id: 3, title: "10+", description: "Community Leads" }
]
Document: latest_announcement
css
Copy code
annoucements: [
  { message: "Welcome to Flutter Kanpur!", link: "#" }
]
Document: blogs_data
bash
Copy code
blogs: [
  {
    id: "blog1",
    title: "First Blog",
    date: "2025-01-01",
    imageUrl: "/blog.jpg"
  }
]
Document: events
bash
Copy code
upcoming_events: [
  { id: "event1", title: "Hackathon", date: "2025-02-15", location: "Kanpur" }
]

past_events: [
  { id: "event0", title: "Workshop", date: "2024-12-10", location: "Kanpur" }
]
6. Running the Project
Start development server:

bash
Copy code
npm run dev
Open in browser:

arduino
Copy code
http://localhost:3000
7. Building for Production
bash
Copy code
npm run build
npm start
8. Deployment
The project is deployment-ready for Vercel.

See deployment guide:
https://nextjs.org/docs/app/building-your-application/deploying

9. Contact & Ownership
This project belongs to the Flutter Kanpur Community.
