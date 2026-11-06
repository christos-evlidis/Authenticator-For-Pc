import logging

from flask import Flask
from domains.auth.routes import register_auth
from domains.vault.routes import register_vault
from services.limits import register_limits
from utils.cors import register_cors
from utils.db import init_db


def create_app():
    app = Flask(__name__)
    init_db()
    register_cors(app)
    register_limits(app)
    register_auth(app)
    register_vault(app)
    return app

app = create_app()

if __name__ == "__main__":
    logging.basicConfig(level=logging.DEBUG)
    app.run(debug=True, port=5000)