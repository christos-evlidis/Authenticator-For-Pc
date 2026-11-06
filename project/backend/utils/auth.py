import hashlib
import secrets

from flask import request


def create_auth_key():
    return "".join(secrets.choice("0123456789") for _ in range(24))

def hash_auth_key(key):
    return hashlib.sha256(key.encode()).hexdigest()

def verify_auth_key(auth_key=None):
    if auth_key is not None:
        key = auth_key
    else:
        authorization = request.headers.get("Authorization", "")
        if authorization.startswith("Bearer "):
            key = authorization[7:].strip()
        else:
            header_key = request.headers.get("X-Auth-Key")
            key = header_key.strip() if header_key else None
    if not key:
        return None, ("AUTH_KEY_REQUIRED", "Auth key is required.", 400)
    if not isinstance(key, str) or len(key) != 24 or not key.isdigit():
        return None, ("AUTH_KEY_INVALID", "Auth key format is invalid.", 400)
    return hash_auth_key(key), None
