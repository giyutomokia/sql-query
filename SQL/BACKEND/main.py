from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict
import sqlite3
from pathlib import Path
from fastapi.middleware.cors import CORSMiddleware

DB_PATH = Path(__file__).parent / "sample.db"

app = FastAPI(title="SQL Runner API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    query: str

def get_conn():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

@app.get("/api/tables")
def list_tables():
    if not DB_PATH.exists():
        raise HTTPException(status_code=500, detail="Database not initialized. Run init_db.py")
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name;")
    rows = cur.fetchall()
    conn.close()
    return {"tables": [r[0] for r in rows]}

@app.get("/api/table/{table_name}")
def table_info(table_name: str, limit: int = 5):
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("SELECT name FROM sqlite_master WHERE type='table' AND name=?", (table_name,))
    if not cur.fetchone():
        conn.close()
        raise HTTPException(status_code=404, detail="Table not found")

    cur.execute(f"PRAGMA table_info('{table_name}')")
    schema = [{"name": c[1], "type": c[2]} for c in cur.fetchall()]

    cur.execute(f"SELECT * FROM '{table_name}' LIMIT ?", (limit,))
    rows = [dict(r) for r in cur.fetchall()]
    conn.close()
    return {"schema": schema, "samples": rows}

@app.post("/api/run")
def run_query(payload: QueryRequest):
    sql = payload.query.strip()
    if not sql:
        raise HTTPException(status_code=400, detail="Empty query")

    first_token = sql.split()[0].lower()
    if first_token not in ["select", "with"]:
        raise HTTPException(status_code=400, detail="Only SELECT/WITH queries allowed")

    conn = get_conn()
    cur = conn.cursor()
    try:
        cur.execute(sql)
        columns = [desc[0] for desc in cur.description] if cur.description else []
        rows = [list(r) for r in cur.fetchall()] if cur.description else []
    except sqlite3.Error as e:
        conn.close()
        raise HTTPException(status_code=400, detail=str(e))
    conn.close()
    return {"columns": columns, "rows": rows}
