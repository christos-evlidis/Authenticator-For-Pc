import os


DB_PATH = os.getenv("DB_PATH")
RATE_LIMIT_AMOUNT = int(os.getenv("RATE_LIMIT_AMOUNT"))
RATE_LIMIT_WINDOW = int(os.getenv("RATE_LIMIT_WINDOW"))