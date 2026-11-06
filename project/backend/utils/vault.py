VAULT_PAYLOAD_PREFIX = "U2FsdGVkX1"
MAX_PAYLOAD_BYTES = 1024 * 1024


def vault_payload_check(payload):
    if not isinstance(payload, str) or not payload:
        return False
    if not payload.startswith(VAULT_PAYLOAD_PREFIX):
        return False
    if len(payload.encode("utf-8")) > MAX_PAYLOAD_BYTES:
        return False
    return True
