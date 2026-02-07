
# 🧠 WordSeek Helper

A fast, keyboard-first web application that helps users find valid 5-letter English words based on pattern constraints — ideal for Telegram word games and Wordle-style puzzles.

🌐 **Live App:**  
https://word-seek-helper-tg.vercel.app/

---

## ✨ Overview

WordSeek Helper allows users to:

- Input a 5-letter pattern (e.g. `a__l_`)
- Specify letters that must be included
- Specify letters that must be excluded
- Instantly retrieve all matching valid English words

The application combines a responsive React frontend with a Node.js backend API for efficient dictionary filtering.

---

## 🚀 Features

- 🔤 Pattern-based word matching
- ✅ Included-letter constraints
- ❌ Excluded-letter filtering
- ⚡ Fast server-side word processing
- ⌨️ Keyboard-first UX (arrow navigation, Enter to solve, Esc to clear)
- 🌙 Dark-themed responsive interface
- 📱 Fully mobile compatible
- 🌐 Deployed frontend (Vercel) + backend (Render)

---

## 🧩 Example

Input:

Pattern: a__l_  
Included: al  
Excluded: bcd  

Output:

alarm  
angel  
ample  
...

---

## 🏗️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- JavaScript (ES6+)
- Deployed on Vercel

### Backend
- Node.js
- Express
- REST API architecture
- Hosted on Render

---

## 📂 Project Structure
```
wordseek_tg/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── api.js
│   │   └── ...
│   └── ...
│
├── backend/
│   ├── routes/
│   ├── dictionary/
│   └── ...
│
└── README.md
```
---

## ⚙️ Local Development

### 1️⃣ Clone the Repository

git clone https://github.com/Bineet08/WordSeekHelper  
cd WordSeekHelper  

---

### 2️⃣ Start Backend
```
cd backend  
npm install  
npm start  
```
Backend runs at:  
http://localhost:3000  

---

### 3️⃣ Start Frontend

cd frontend  
npm install  
npm run dev  

Create a `.env` file inside `frontend/`:
```
VITE_API_URL=http://localhost:3000
```
Restart the dev server after adding the environment file.

---

## 🌍 Deployment

### Frontend
- Hosted on **Vercel**
- Build command: `npm run build`
- Output directory: `dist`

### Backend
- Hosted on **Render**
- Service type: Web Service
- Build command: `npm install`
- Start command: `npm start`

Production API URL is configured via environment variables.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|------|--------|
| Arrow Left / Right | Navigate between pattern boxes |
| Arrow Down | Move to Included / Excluded fields |
| Arrow Up | Return to Pattern input |
| Enter | Solve |
| Escape | Clear board |
| Backspace | Smart delete behavior |

---

## 🎯 Design Goals

- Fast word filtering
- Minimal UI friction
- Keyboard-driven workflow
- Clean, distraction-free interface
- Simple deployment architecture

---

## 📈 Future Improvements

- Word frequency ranking
- Wordle-accurate duplicate handling
- Telegram bot integration
- Progressive Web App (PWA)
- Custom dictionary upload
- Search history

---

## 👤 Author

Developed by **Bineet**

A full-stack React + Node.js project built to combine efficient backend filtering with intuitive frontend interaction.

---

## 📜 License

This project is open-source and available under the MIT License.
