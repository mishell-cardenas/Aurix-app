# Aurix

Aurix is an online digital aura scanner that uses AI to generate personalized mystical aura readings based on your name, zodiac sign, and emotional state.

## 🎯 Project Objective

Aurix is a full-stack web application that gives users a personalized spiritual "aura reading" powered by the Claude AI API. The user enters their screen name, zodiac sign, emotional state, and an optional Spotify username. The app then conducts a theatrical webcam scan before generating a unique aura reading — including an aura type, color palette, personal reading, prophecy, and angel number — all tailored to the individual. The result is rendered as a fully themed results page with a matching background color, ASCII angel wing art, and curated music. All readings are generated in real time by Claude and are unique to each user.

## 🌐 Deployed Website

## How to use Aurix

### Getting Started

1. Open the app and click **enter** on the landing page.

### Fill in your information

1. Enter your screen name.
2. Select your zodiac sign from the dropdown.
3. Select your current emotional state from the dropdown.
4. Optionally enter your Spotify username.
5. Click **conduct face scan**.

### The Scan

1. Allow camera access when prompted.
2. Wait while the spectral analysis runs — the angels are working.

### Your Reading

1. Your personalized aura type, reading, prophecy, and angel number will appear on a fully themed results page.
2. Click **back to start** to run a new reading.

## 📸 Screenshots

<img width="1511" height="808" alt="Screenshot 2026-06-01 at 20 25 15" src="https://github.com/user-attachments/assets/471d2c84-1cec-4e89-b114-84054937385a" />

<img width="1511" height="808" alt="Screenshot 2026-06-01 at 20 25 43" src="https://github.com/user-attachments/assets/3d90d616-bd3e-49a8-90f0-e7d02acd6277" />

<img width="1511" height="808" alt="Screenshot 2026-06-01 at 20 30 31" src="https://github.com/user-attachments/assets/1989d9ce-46ad-44af-8abe-f3d70c432dff" />

<img width="1511" height="808" alt="Screenshot 2026-06-01 at 20 32 01" src="https://github.com/user-attachments/assets/13a61a2d-184c-48eb-acd0-a8012a3686ec" />

## 🎨 About Design

Aurix draws visual inspiration from early internet mysticism and angel aesthetics. The design uses soft pastel backgrounds dynamically generated per reading, monospace typography throughout, and ASCII braille angel wing art. Each results page is fully themed to the aura color returned by the AI — no two readings look the same.

## 🛠️ Tech Stack

Frontend

- React.js (Vite)
- Tailwind CSS
- react-router-dom
- react-webcam

Backend

- Vercel Serverless Functions (Node.js)
- Anthropic Claude API (claude-sonnet-4-6)

Development

- Git & GitHub
- ESLint
- Vercel CLI

Deployment

- Vercel
