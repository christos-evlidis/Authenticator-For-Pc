from utils.auth import create_auth_key, hash_auth_key
from utils.db import get_connection


def create_session():
    conn = get_connection()
    auth_key = create_auth_key()
    auth_hash = hash_auth_key(auth_key)
    conn.execute("INSERT INTO sessions (auth_hash) VALUES (?)", (auth_hash,))
    conn.commit()
    conn.close()
    return auth_key

def verify_session(auth_hash):
    conn = get_connection()
    row = conn.execute("SELECT 1 FROM sessions WHERE auth_hash = ?", (auth_hash,)).fetchone()
    conn.close()
    return row is not None

def delete_session(auth_hash):
    conn = get_connection()
    conn.execute("DELETE FROM sessions WHERE auth_hash = ?", (auth_hash,))
    conn.commit()
    conn.close()
