# 🔐 Vocaply Security & Credentials Guide

> **⚠️ CRITICAL: This document is for documentation purposes only. NEVER add actual API keys or secrets to this file!**

---

## 📋 Table of Contents

1. [Environment Setup](#1-environment-setup)
2. [Firebase Configuration](#2-firebase-configuration)
3. [Security Checklist](#3-security-checklist)
4. [For Contributors](#4-for-contributors)
5. [Troubleshooting](#5-troubleshooting)

---

## 1. Environment Setup

### Step 1: Create your `.env` file

```bash
# Copy the example file
cp .env.example .env
```

### Step 2: Add your Firebase credentials

Get your credentials from the [Firebase Console](https://console.firebase.google.com/):
1. Go to Project Settings → General
2. Scroll down to "Your apps" → Web app
3. Copy the `firebaseConfig` values

### Step 3: Verify `.env` is ignored

```bash
# This should return nothing (file is ignored)
git status .env
```

---

## 2. Firebase Configuration

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_FIREBASE_API_KEY` | Firebase Web API Key | `AIzaSy...` |
| `VITE_FIREBASE_AUTH_DOMAIN` | Auth domain | `yourapp.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Project identifier | `vocaply` |
| `VITE_FIREBASE_STORAGE_BUCKET` | Storage bucket URL | `yourapp.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Cloud Messaging ID | `123456789` |
| `VITE_FIREBASE_APP_ID` | Firebase App ID | `1:123:web:abc123` |
| `VITE_FIREBASE_MEASUREMENT_ID` | Analytics ID | `G-XXXXXXXX` |

### Firebase Security Rules

Our Firestore rules (`firestore.rules`) enforce:
- ✅ Users can only read/write their own data
- ✅ Authentication required for all operations
- ✅ Dictionary is read-only for users

---

## 3. Security Checklist

### Before Pushing to GitHub ✅

- [x] `.env` is in `.gitignore`
- [x] `.env.local` is in `.gitignore`
- [x] `.env.*` patterns are ignored
- [x] No hardcoded API keys in source code
- [x] `import.meta.env` used for all secrets
- [x] Firebase security rules deployed
- [x] `.firebase/` cache folder is ignored
- [x] `dist/` build folder is ignored
- [x] Private keys (*.pem, *.key) are ignored

### Production Security

- [x] Firestore rules prevent unauthorized access
- [x] Cloud Functions require authentication
- [x] No sensitive data logged to console in production
- [ ] Enable Firebase App Check (recommended)
- [ ] Set up Firebase Security Rules monitoring

---

## 4. For Contributors

### Getting Started

1. **Fork & Clone** the repository
2. **Copy** `.env.example` to `.env`
3. **Create** your own Firebase project for development
4. **Fill in** your Firebase credentials in `.env`
5. **Run** `npm install` and `npm run dev`

### Important Rules

🚫 **NEVER** commit:
- `.env` files with real credentials
- API keys in code comments
- Firebase service account JSONs
- Any private keys or certificates

✅ **ALWAYS**:
- Use environment variables for secrets
- Keep `.env.example` updated
- Review your commits before pushing

---

## 5. Troubleshooting

### "Firebase API Key is missing or invalid"

1. Check if `.env` file exists in the root directory
2. Verify all `VITE_FIREBASE_*` variables have values
3. Restart the development server (`npm run dev`)

### "Permission denied" in Firestore

1. Ensure you're authenticated
2. Check if Firestore rules are deployed: `firebase deploy --only firestore:rules`
3. Verify the user has access to the requested document

### Environment variables not working

1. Variables must start with `VITE_` for Vite projects
2. Restart the dev server after changing `.env`
3. Check for typos in variable names

---

## 📊 Security Status

| Component | Status | Notes |
|-----------|--------|-------|
| API Keys | 🟢 Secured | Using environment variables |
| Firestore | 🟢 Protected | Security rules deployed |
| Authentication | 🟢 Active | Firebase Auth enabled |
| Cloud Functions | 🟢 Secured | Auth-only access |
| Git Repository | 🟢 Safe | Sensitive files ignored |

---

*Last Updated: February 2026*
*Vocaply - Learn Words, Master Language* 🎯
