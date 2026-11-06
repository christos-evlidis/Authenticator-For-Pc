from flask_cors import CORS


def register_cors(app):
    CORS(
        app,
        resources={r"/*": {
            "origins": "*",
            "methods": "*",
            "allow_headers": "*",
            "expose_headers": "*",
        }},
    )
