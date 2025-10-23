 🌸 SQL Runner — Full Stack App  
*A simple web app to run SQL queries on a sample database!*  

Built with:
- ⚡ **Next.js (React)** — modern, fast frontend  
- 🐍 **FastAPI (Python)** — lightweight backend  
- 💾 **SQLite** — preloaded local database  

---

## 🌿 Features
✨ Type and run SQL queries (read-only)  
📊 View formatted query results  
📋 See all available tables and their schemas  
🪄 Preview sample rows from each table  

---

## 🗂️ Folder Structure
sql-runner-project/
├─ backend/ ← FastAPI server
│ ├─ main.py
│ ├─ init_db.py
│ └─ requirements.txt
└─ frontend/ ← Next.js app
├─ pages/
├─ components/
├─ package.json
└─ next.config.js

yaml
Copy code

---

## 🚀 Quick Start

### 1️⃣ Backend Setup
Open a terminal inside the **backend/** folder:

```bash
# (Optional) Create a virtual environment
python -m venv .venv
source .venv/bin/activate    # or .venv\Scripts\activate on Windows

# Install dependencies
pip install -r requirements.txt

# Initialize the sample SQLite database
python init_db.py

# Run FastAPI server
uvicorn main:app --reload --port 8000
🟢 The backend runs on → http://localhost:8000

2️⃣ Frontend Setup
Open a new terminal inside the frontend/ folder:

bash
Copy code
npm install
npm run dev
💻 Then open → http://localhost:3000
