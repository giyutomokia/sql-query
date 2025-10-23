# backend/init_db.py
# Creates a sample SQLite database with Customers, Orders, and Shippings tables.

import sqlite3
from pathlib import Path

DB_FILE = Path(__file__).parent / "sample.db"

schema_statements = [
    """
    CREATE TABLE IF NOT EXISTS Customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        country TEXT
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS Orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_id INTEGER,
        product TEXT,
        amount REAL,
        order_date TEXT,
        FOREIGN KEY(customer_id) REFERENCES Customers(id)
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS Shippings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER,
        address TEXT,
        shipped_date TEXT,
        status TEXT,
        FOREIGN KEY(order_id) REFERENCES Orders(id)
    );
    """,
]

sample_inserts = [
    "INSERT INTO Customers (name, email, country) VALUES ('Alice Johnson', 'alice@example.com', 'USA');",
    "INSERT INTO Customers (name, email, country) VALUES ('Bob Smith', 'bob@example.com', 'UK');",
    "INSERT INTO Customers (name, email, country) VALUES ('Carla Gomez', 'carla@example.com', 'Spain');",

    "INSERT INTO Orders (customer_id, product, amount, order_date) VALUES (1, 'Laptop', 1200.50, '2024-05-10');",
    "INSERT INTO Orders (customer_id, product, amount, order_date) VALUES (1, 'Mouse', 25.00, '2024-05-11');",
    "INSERT INTO Orders (customer_id, product, amount, order_date) VALUES (2, 'Keyboard', 75.99, '2024-06-01');",

    "INSERT INTO Shippings (order_id, address, shipped_date, status) VALUES (1, '123 Maple St, Anytown, USA', '2024-05-12', 'Delivered');",
    "INSERT INTO Shippings (order_id, address, shipped_date, status) VALUES (2, '123 Maple St, Anytown, USA', '2024-05-13', 'In Transit');",
    "INSERT INTO Shippings (order_id, address, shipped_date, status) VALUES (3, '45 High St, London, UK', '2024-06-02', 'Delivered');",
]


def main():
    """Initialize the SQLite database with sample schema and data."""
    if DB_FILE.exists():
        print(f"Removing existing DB at {DB_FILE} for a clean start.")
        DB_FILE.unlink()

    conn = sqlite3.connect(DB_FILE)
    cur = conn.cursor()

    for stmt in schema_statements:
        cur.executescript(stmt)

    for ins in sample_inserts:
        cur.execute(ins)

    conn.commit()
    conn.close()
    print(f"Sample SQLite DB created at: {DB_FILE}")


if __name__ == "__main__":
    main()
