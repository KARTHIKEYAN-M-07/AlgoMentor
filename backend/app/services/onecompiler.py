import os
import time
import requests
from dotenv import load_dotenv

load_dotenv()

# ==========================
# Environment Variables
# ==========================

API_URL = os.getenv("ONECOMPILER_API_URL")
API_KEY = os.getenv("ONECOMPILER_API_KEY")

if not API_URL:
    raise ValueError("ONECOMPILER_API_URL not found in .env")

if not API_KEY:
    raise ValueError("ONECOMPILER_API_KEY not found in .env")


# ==========================
# Supported Languages
# ==========================

FILE_NAMES = {
    "python": "main.py",
    "java": "Main.java",
    "cpp": "main.cpp",
    "c": "main.c",
    "javascript": "main.js"
}


# ==========================
# Execute Code
# ==========================

def execute_code(source_code: str, language: str, stdin: str = ""):

    language = language.lower()

    if language not in FILE_NAMES:
        raise ValueError(f"Unsupported language: {language}")

    payload = {
        "language": language,
        "stdin": stdin,
        "files": [
            {
                "name": FILE_NAMES[language],
                "content": source_code
            }
        ]
    }

    headers = {
        "Content-Type": "application/json",
        "X-API-Key": API_KEY,
        "User-Agent": "Mozilla/5.0"
    }

    last_error = None

    for attempt in range(3):

        try:

            response = requests.post(
                API_URL,
                headers=headers,
                json=payload,
                timeout=30
            )

            # Retry if Cloudflare blocks
            if response.status_code == 403:
                time.sleep(2)
                continue

            response.raise_for_status()

            result = response.json()

            return {
                "stdout": result.get("stdout", ""),
                "stderr": result.get("stderr", ""),
                "compile_output": result.get("exception", ""),
                "status": result.get("status", ""),
                "time": result.get("executionTime", 0),
                "memory": result.get("memoryUsed", 0),
                "credits_remaining": result.get("creditsRemaining", 0)
            }

        except requests.exceptions.RequestException as e:

            last_error = str(e)
            time.sleep(2)

    return {
    "stdout": result.get("stdout") or "",
    "stderr": result.get("stderr") or "",
    "compile_output": result.get("exception") or "",
    "status": result.get("status") or "",
    "time": result.get("executionTime") or 0,
    "memory": result.get("memoryUsed") or 0
    }