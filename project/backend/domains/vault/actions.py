from utils.db import get_connection


def fetch_vault(auth_hash):
    conn = get_connection()
    row = conn.execute(
        """
        SELECT v.payload, v.updated_at
        FROM vaults v
        INNER JOIN sessions s ON s.id = v.session_id
        WHERE s.auth_hash = ?
        """,
        (auth_hash,),
    ).fetchone()
    conn.close()
    if not row:
        return {"payload": None}
    return {"payload": row["payload"], "updated_at": row["updated_at"]}

def store_vault(auth_hash, payload):
    conn = get_connection()
    row = conn.execute("SELECT id FROM sessions WHERE auth_hash = ?", (auth_hash,)).fetchone()
    if not row:
        conn.close()
        return None
    session_id = row["id"]
    conn.execute(
        """
        INSERT INTO vaults (session_id, payload, updated_at)
        VALUES (?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(session_id) DO UPDATE SET
            payload = excluded.payload,
            updated_at = CURRENT_TIMESTAMP
        """,
        (session_id, payload),
    )
    updated = conn.execute(
        "SELECT updated_at FROM vaults WHERE session_id = ?",
        (session_id,),
    ).fetchone()
    conn.commit()
    conn.close()
    return {"updated_at": updated["updated_at"]}
