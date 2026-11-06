import time

from flask import request
from config import RATE_LIMIT_AMOUNT, RATE_LIMIT_WINDOW
from utils.db import get_connection
from utils.responses import fail


def register_limits(app):
    @app.before_request
    def enforce_rate_limit():
        if request.method == "OPTIONS":
            return None
        if not request.path.startswith("/v1/"):
            return None
        forwarded = request.headers.get("X-Forwarded-For", "")
        if forwarded:
            ip = forwarded.split(",")[0].strip()
        else:
            ip = request.remote_addr or "unknown"
        endpoint = request.path
        now = int(time.time())
        window_start = now - RATE_LIMIT_WINDOW
        conn = get_connection()
        conn.execute("DELETE FROM rate_limit_events WHERE created_at < ?", (window_start,))
        row = conn.execute(
            "SELECT COUNT(*), MIN(created_at) FROM rate_limit_events WHERE ip = ? AND endpoint = ? AND created_at >= ?",
            (ip, endpoint, window_start),
        ).fetchone()
        count = row[0]
        oldest = row[1]
        if count >= RATE_LIMIT_AMOUNT:
            retry_after = max(1, (oldest + RATE_LIMIT_WINDOW) - now) if oldest else RATE_LIMIT_WINDOW
            conn.close()
            response, _ = fail("RATE_LIMITED", "Too many requests. Try again later.", 429)
            response.headers["Retry-After"] = str(retry_after)
            return response
        conn.execute(
            "INSERT INTO rate_limit_events (ip, endpoint, created_at) VALUES (?, ?, ?)",
            (ip, endpoint, now),
        )
        conn.commit()
        conn.close()
        return None
