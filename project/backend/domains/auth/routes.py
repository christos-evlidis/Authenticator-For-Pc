import logging

from flask import request
from domains.auth.actions import create_session, delete_session, verify_session
from utils.auth import verify_auth_key
from utils.responses import fail, ok


def register_auth(app):
    @app.route("/v1/auth/sessions", methods=["POST"])
    def session_create():
        try:
            auth_key = create_session()
            return ok({"auth_key": auth_key}, 201)
        except Exception:
            logging.exception("[session_create] Error:")
            return fail("INTERNAL_ERROR", "Internal Server Error", 500)

    @app.route("/v1/auth/sessions", methods=["GET"])
    def session_verify():
        try:
            auth_hash, error = verify_auth_key(request.args.get("auth_key"))
            if error:
                code, message, status = error
                return fail(code, message, status)
            if not verify_session(auth_hash):
                return fail("AUTH_KEY_INVALID", "Auth key is invalid or not found.", 401)
            return ok({"valid": True})
        except Exception:
            logging.exception("[session_verify] Error:")
            return fail("INTERNAL_ERROR", "Internal Server Error", 500)

    @app.route("/v1/auth/sessions", methods=["DELETE"])
    def session_delete():
        try:
            auth_hash, error = verify_auth_key()
            if error:
                code, message, status = error
                return fail(code, message, status)
            if not verify_session(auth_hash):
                return fail("AUTH_KEY_INVALID", "Auth key is invalid or not found.", 401)
            delete_session(auth_hash)
            return ok()
        except Exception:
            logging.exception("[session_delete] Error:")
            return fail("INTERNAL_ERROR", "Internal Server Error", 500)
