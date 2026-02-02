<p align="center">
  <img src="public/logo.png" alt="Vocaply Logo" width="120" height="120">
</p>

<h1 align="center">🎯 Vocaply</h1>

<p align="center">
  <strong>Master Your Vocabulary, One Word at a Time</strong>
</p>

<p align="center">
  <a href="https://vocaply.web.app/">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-vocaply.web.app-4285F4?style=for-the-badge" alt="Live Demo">
  </a>
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge" alt="License">
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-live-demo">Live Demo</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-project-structure">Structure</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

## 🌟 Overview

**Vocaply** is a modern, feature-rich vocabulary learning application designed to help users expand their English vocabulary through personalized daily word selections, progress tracking, and interactive learning experiences. Built with React and Firebase, it offers a seamless, responsive experience across all devices.

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black" alt="Firebase">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind">
</p>

---

## 🌐 Live Demo

Experience Vocaply now! No installation required.

### **👉 [https://vocaply.web.app/](https://vocaply.web.app/)**

| Feature | Description |
|---------|-------------|
| 🔐 **Authentication** | Sign up/Login with Email or Google |
| 📚 **Word Learning** | Daily personalized vocabulary selections |
| 📊 **Progress Tracking** | Track your learning journey with stats |
| ⭐ **Favorites** | Save words you want to remember |
| 📱 **Responsive** | Works perfectly on mobile, tablet & desktop |

---

## ✨ Features

### 🎯 Core Features

| Feature | Description |
|---------|-------------|
| **Daily Words** | Get personalized word selections every day |
| **Smart Progress Tracking** | Visual stats showing your learning journey |
| **Favorites System** | Star and save words for quick review |
| **Streak Counter** | Stay motivated with daily learning streaks |
| **Word Details** | Meanings, examples, and pronunciations |

### 🔐 Authentication & Security

| Feature | Description |
|---------|-------------|
| **Email/Password** | Traditional secure authentication |
| **Google Sign-In** | One-click Google authentication |
| **Protected Routes** | Secure access to user-specific data |
| **Firestore Rules** | Server-side data protection |

### 🎨 User Experience

| Feature | Description |
|---------|-------------|
| **Modern UI** | Clean, premium glassmorphism design |
| **Dark Mode Ready** | Easy on the eyes |
| **Micro-animations** | Smooth, engaging interactions |
| **Responsive Design** | Perfect on any screen size |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI Component Library |
| **Vite** | Build Tool & Dev Server |
| **Tailwind CSS** | Utility-First Styling |
| **Framer Motion** | Animations & Transitions |
| **React Router v6** | Client-Side Routing |
| **Lucide React** | Modern Icon Library |

### Backend & Services
| Technology | Purpose |
|------------|---------|
| **Firebase Auth** | User Authentication |
| **Cloud Firestore** | NoSQL Database |
| **Firebase Hosting** | Production Deployment |
| **Cloud Functions** | Serverless Backend Logic |

### Development Tools
| Tool | Purpose |
|------|---------|
| **ESLint** | Code Linting |
| **Prettier** | Code Formatting |
| **Git** | Version Control |

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

| Requirement | Version | Check Command |
|-------------|---------|---------------|
| **Node.js** | 18.x or higher | `node --version` |
| **npm** | 9.x or higher | `npm --version` |
| **Git** | Latest | `git --version` |

### Installation

#### Step 1: Clone the Repository

```bash
git clone https://github.com/mdjameee400/vocaply.git
cd vocaply
```

#### Step 2: Install Dependencies

```bash
npm install
```

#### Step 3: Environment Setup

Create your environment file by copying the example:

```bash
# Windows (Command Prompt)
copy .env.example .env

# Windows (PowerShell)
Copy-Item .env.example .env

# macOS / Linux
cp .env.example .env
```

#### Step 4: Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable **Authentication** (Email/Password & Google)
4. Create a **Firestore Database**
5. Go to Project Settings → General → Your Apps → Web App
6. Copy the config values to your `.env` file:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

#### Step 5: Run Development Server

```bash
npm run dev
```

🎉 **Open [http://localhost:5173](http://localhost:5173) in your browser!**

---

## 📁 Project Structure

```
vocaply/
├── 📂 public/                    # Static assets
│   ├── logo.png                  # App logo
│   └── ...
│
├── 📂 src/                       # Source code
│   ├── 📂 components/            # Reusable UI components
│   │   ├── 📂 Dashboard/         # Dashboard-specific components
│   │   │   ├── TodaysWords.jsx   # Daily word display
│   │   │   ├── WordList.jsx      # Word listing
│   │   │   └── ...
│   │   ├── 📂 Layout/            # Layout components
│   │   │   ├── Navbar.jsx        # Navigation bar
│   │   │   ├── Sidebar.jsx       # Side navigation
│   │   │   └── ...
│   │   └── 📂 ui/                # Base UI components
│   │
│   ├── 📂 context/               # React Context providers
│   │   └── AuthContext.jsx       # Authentication state
│   │
│   ├── 📂 firebase/              # Firebase configuration
│   │   └── config.js             # Firebase initialization
│   │
│   ├── 📂 hooks/                 # Custom React hooks
│   │   └── useVocabulary.js      # Vocabulary data hook
│   │
│   ├── 📂 pages/                 # Page components
│   │   ├── Home.jsx              # Landing page
│   │   ├── Dashboard.jsx         # User dashboard
│   │   ├── Login.jsx             # Authentication page
│   │   ├── Progress.jsx          # Progress tracking
│   │   └── ...
│   │
│   ├── App.jsx                   # Main app component
│   ├── main.jsx                  # App entry point
│   └── index.css                 # Global styles
│
├── 📂 functions/                 # Firebase Cloud Functions
│   └── index.js                  # Serverless functions
│
├── 📄 .env.example               # Environment template
├── 📄 .gitignore                 # Git ignore rules
├── 📄 firebase.json              # Firebase config
├── 📄 firestore.rules            # Database security rules
├── 📄 package.json               # Dependencies
├── 📄 tailwind.config.js         # Tailwind configuration
├── 📄 vite.config.js             # Vite configuration
└── 📄 README.md                  # This file
```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at `localhost:5173` |
| `npm run build` | Create production build in `dist/` folder |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |

### Firebase Commands

| Command | Description |
|---------|-------------|
| `firebase login` | Authenticate with Firebase CLI |
| `firebase deploy` | Deploy to Firebase Hosting |
| `firebase deploy --only hosting` | Deploy only hosting |
| `firebase deploy --only firestore:rules` | Deploy Firestore rules |
| `firebase deploy --only functions` | Deploy Cloud Functions |

---

## 🔐 Security

### Environment Variables

All sensitive credentials are stored in `.env` files which are **NOT** committed to the repository.

| File | Purpose | Git Status |
|------|---------|------------|
| `.env` | Your actual credentials | 🔐 Ignored |
| `.env.example` | Template for others | ✅ Committed |

### Firestore Security Rules

Our database is protected with security rules that ensure:

- ✅ Users can only access their own data
- ✅ Authentication is required for all operations
- ✅ Data validation on write operations

```javascript
// Example rule structure
match /users/{userId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Step 1: Fork the Repository

Click the "Fork" button at the top right of this page.

### Step 2: Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/vocaply.git
cd vocaply
```

### Step 3: Create a Branch

```bash
git checkout -b feature/your-feature-name
```

### Step 4: Make Changes

Make your changes and test them locally.

### Step 5: Commit & Push

```bash
git add .
git commit -m "Add: your feature description"
git push origin feature/your-feature-name
```

### Step 6: Open a Pull Request

Go to the original repository and click "New Pull Request".

---

## 📋 Roadmap

| Feature | Status |
|---------|--------|
| ✅ User Authentication | Complete |
| ✅ Daily Word Selection | Complete |
| ✅ Progress Tracking | Complete |
| ✅ Favorites System | Complete |
| 🔄 Chrome Extension | In Progress |
| 📋 Spaced Repetition | Planned |
| 📋 AI Word Recommendations | Planned |
| 📋 Multi-language Support | Planned |

---

## 🐛 Troubleshooting

### Common Issues

<details>
<summary><strong>❌ "Firebase API Key is missing or invalid"</strong></summary>

1. Check if `.env` file exists in root directory
2. Verify all `VITE_FIREBASE_*` variables have values
3. Restart the development server: `npm run dev`
4. Make sure there are no extra spaces in your `.env` file

</details>

<details>
<summary><strong>❌ "npm install" fails</strong></summary>

1. Delete `node_modules` folder and `package-lock.json`
2. Clear npm cache: `npm cache clean --force`
3. Run `npm install` again

</details>

<details>
<summary><strong>❌ Page shows blank after login</strong></summary>

1. Check browser console for errors (F12)
2. Verify Firestore rules are deployed
3. Check if user document exists in Firestore

</details>

<details>
<summary><strong>❌ Environment variables not working</strong></summary>

1. Variables must start with `VITE_` for Vite
2. Restart dev server after changing `.env`
3. Check for typos in variable names

</details>

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 Vocaply

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## 👨‍💻 Author

<p align="center">
  <strong>MD Jamee</strong>
</p>

<p align="center">
  <a href="https://github.com/mdjameee400">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
</p>

---

## 🙏 Acknowledgments

- [Firebase](https://firebase.google.com/) - Backend services
- [React](https://reactjs.org/) - UI framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide Icons](https://lucide.dev/) - Beautiful icons
- [Framer Motion](https://www.framer.com/motion/) - Animations

---

<p align="center">
  <strong>⭐ If you found this project helpful, please give it a star!</strong>
</p>

<p align="center">
  Made with ❤️ for vocabulary learners everywhere
</p>

<p align="center">
  <a href="https://vocaply.web.app/">
    <img src="https://img.shields.io/badge/🚀_Try_Vocaply_Now-vocaply.web.app-FF6B6B?style=for-the-badge" alt="Try Now">
  </a>
</p>
