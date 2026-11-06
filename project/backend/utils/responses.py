from flask import jsonify


def ok(data=None, status=200):
    return jsonify({"ok": True, "data": data if data is not None else {}}), status

def fail(code, message, status):
    return jsonify({"ok": False, "error": {"code": code, "message": message}}), status
