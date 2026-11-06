import logging

from flask import request
from domains.auth.actions import verify_session
from domains.vault.actions import fetch_vault, store_vault
from utils.auth import verify_auth_key
from utils.responses import fail, ok
from utils.vault import vault_payload_check


def register_vault(app):
    @app.route("/v1/vault", methods=["GET"])
    def vault_fetch():
        try:
            auth_hash, error = verify_auth_key()
            if error:
                code, message, status = error
                return fail(code, message, status)
            if not verify_session(auth_hash):
                return fail("AUTH_KEY_INVALID", "Auth key is invalid or not found.", 401)
            return ok(fetch_vault(auth_hash))
        except Exception:
            logging.exception("[vault_fetch] Error:")
            return fail("INTERNAL_ERROR", "Internal server error", 500)

    @app.route("/v1/vault", methods=["PUT"])
    def vault_store():
        try:
            auth_hash, error = verify_auth_key()
            if error:
                code, message, status = error
                return fail(code, message, status)
            if not verify_session(auth_hash):
                return fail("AUTH_KEY_INVALID", "Auth key is invalid or not found.", 401)
            body = request.get_json(silent=True) or {}
            payload = body.get("payload")
            if not vault_payload_check(payload):
                return fail("PAYLOAD_INVALID", "Vault payload is invalid.", 400)
            data = store_vault(auth_hash, payload)
            if not data:
                return fail("AUTH_KEY_INVALID", "Auth key is invalid or not found.", 401)
            return ok(data)
        except Exception:
            logging.exception("[vault_store] Error:")
            return fail("INTERNAL_ERROR", "Internal server error", 500)
