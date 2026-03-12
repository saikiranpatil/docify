<div align="center">
  <h1>Docify</h1>
  <p><strong>Real-time collaborative document editor — built like Google Docs</strong></p>

  <p>
    <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Quill.js-4299E1?style=for-the-badge&logo=quill&logoColor=white" alt="Quill" />
    <img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white" alt="Socket.io" />
    <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  </p>

  <br/>
  <a href="https://docify.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/Live_Demo-docify.vercel.app-FF5722?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
</div>

---

## ✨ Features

- **Real-time Collaboration** — Multiple users can edit the same document simultaneously
- **Rich Text Editor** — Powered by Quill.js with full formatting toolbar
- **Live Document List** — See all your documents with last modified timestamps
- **Instant Title Editing** — Change document title in real-time
- **One-Click Share** — Copy document link and share with anyone
- **Create & Delete** — Add new documents or permanently delete them
- **Responsive Design** — Clean, modern UI that works on desktop and mobile

---

## 🛠 Tech Stack

| Layer          | Technology                          | Purpose                              |
|----------------|-------------------------------------|--------------------------------------|
| Frontend       | React 18 + Vite + Quill.js          | Fast UI + rich text editing          |
| Real-time      | Socket.io                           | Live collaboration & updates         |
| Backend        | Node.js + Express + Socket.io       | WebSocket server                     |
| Database       | MongoDB + Mongoose                  | Persistent document storage          |
| Routing        | React Router                        | Client-side navigation               |

---

## 📁 Project Structure

```bash
docify/
├── backend/              # Node.js + Socket.io server
│   ├── app.js
│   ├── database.js
│   ├── Document.js
│   └── package.json
├── src/
│   ├── components/       # Home, TextEditor, Card
│   ├── contexts/         # React Context for documents
│   ├── assets/
│   └── App.jsx
├── public/
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- MongoDB (Atlas recommended)

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/docify.git
cd docify
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` in `/backend`:
```env
MONGO_URI=your_mongodb_connection_string
CLIENT_ORIGIN=http://localhost:5173
```

Start backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ..
npm install
npm run dev
```

Open → http://localhost:5173

---

## 📦 Scripts

**Frontend**
```json
"dev": "vite",
"build": "vite build"
```

**Backend**
```json
"dev": "nodemon app.js",
"start": "node app.js"
```

---

## 🌐 Deployment

### Frontend (Vite)
- Deploy on **Vercel** or **Netlify**

### Backend (Socket.io)
- Deploy on **Render**, **Railway**, or **Vercel** (with serverless config)
- Update `CLIENT_ORIGIN` in backend `.env` to your frontend URL

> **Note**: For production, use a proper WebSocket hosting service (Render works best with Socket.io).

---

## 📌 Credits

- Built as a full-stack real-time collaboration project
- Quill.js for the rich text editor
- Socket.io for live multi-user editing

---

## 📄 License

Open source under the **MIT License**.

---

<div align="center">
  <p>Real-time docs made simple • Powered by React & Socket.io</p>
  <p>
    <a href="https://docify.vercel.app">Live Demo</a> • 
    <a href="https://github.com/saikiranpatil/docify/issues">Report Bug</a>
  </p>
</div>
