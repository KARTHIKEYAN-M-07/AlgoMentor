import sys
from pathlib import Path

import requests

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from app.services.onecompiler import API_KEY

headers = {
    "X-API-Key": API_KEY,
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0"
}

payload = {
    "language": "python",
    "stdin": "",
    "files": [
        {
            "name": "main.py",
            "content": "print('Hello')"
        }
    ]
}

r = requests.post(
    "https://api.onecompiler.com/v1/run",
    headers=headers,
    json=payload,
)

print(r.status_code)
print(r.headers)
print(r.text[:300])