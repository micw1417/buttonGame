import sqlite3
import os
from flask import Flask, request, jsonify, send_from_directory, g


app = Flask(__name__, static_folder="dist", static_url_path="")

DB_FILE = "scores.db"


# creates db if it does not exist
def init_db() -> None:
    conn = sqlite3.connect(DB_FILE)
    cur = conn.cursor()

    cur.execute("""
    CREATE TABLE IF NOT EXISTS highscores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        score INTEGER NOT NULL
    )
    """)

    conn.commit()
    conn.close()


def get_db():
    if "db" not in g:
        g.db = sqlite3.connect(DB_FILE, timeout=5)
        g.db.row_factory = sqlite3.Row
    return g.db

def query_db(query, args=()) -> list[dict]:
    """Query the database and return the results.

    Args:
        query (str): The SQL query to execute.
        args (tuple, optional): The arguments to pass to the query. Defaults to ().

    Returns:
        list[dict]: The rows returned by the query.
    """
    conn = get_db()
    cur = conn.cursor()

    cur.execute(query, args)
    rows = cur.fetchall()

    conn.commit()
    conn.close()

    return rows


# initialize database on startup
init_db()

@app.route("/api/submit", methods=["POST"])
def submit_score():
    data = request.json

    name = data.get("name")
    score = data.get("score")

    query_db(
        "INSERT INTO highscores (name, score) VALUES (?, ?)",
        (name, score)
    )

    return {"status": "ok"}


@app.route("/api/leaderboard")
def leaderboard():
    rows = query_db(
        "SELECT name, score FROM highscores ORDER BY score DESC LIMIT 10"
    )

    scores = [
        {"name": r[0], "score": r[1]}
        for r in rows
    ]
    return jsonify(scores)

# ---------------------------
# Serve React App
# ---------------------------

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):

    if path != "" and os.path.exists("dist/" + path):
        return send_from_directory("dist", path)

    return send_from_directory("dist", "index.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)