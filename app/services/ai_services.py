import json
import os
from pathlib import Path

import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("OPENROUTER_API_KEY")
MODEL = os.getenv("MODEL", "qwen/qwen-2.5-7b-instruct")

API_URL = "https://openrouter.ai/api/v1/chat/completions"

PROMPT_FILE = Path(__file__).parent.parent / "prompts" / "analysis.txt"

if not API_KEY:
    raise ValueError("OPENROUTER_API_KEY not found in .env")


def load_prompt():

    if not PROMPT_FILE.exists():
        raise FileNotFoundError(f"Prompt file not found: {PROMPT_FILE}")

    with open(PROMPT_FILE, "r", encoding="utf-8") as file:
        return file.read()


def analyze_code(
    code: str,
    language: str,
    compiler_output: str = "",
    execution_output: str = "",
    runtime_error: str = "",
    execution_time: str = "",
    memory_used: str = ""
):

    # Convert None → string
    code = str(code or "")
    language = str(language or "")
    compiler_output = str(compiler_output or "")
    execution_output = str(execution_output or "")
    runtime_error = str(runtime_error or "")
    execution_time = str(execution_time or "")
    memory_used = str(memory_used or "")

    prompt = (
        load_prompt()
        .replace("<<LANGUAGE>>", language)
        .replace("<<CODE>>", code)
        .replace("<<COMPILER_OUTPUT>>", compiler_output)
        .replace("<<EXECUTION_OUTPUT>>", execution_output)
        .replace("<<RUNTIME_ERROR>>", runtime_error)
        .replace("<<EXECUTION_TIME>>", execution_time)
        .replace("<<MEMORY_USED>>", memory_used)
    )

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Personalized Coding Mentor"
    }

    payload = {
        "model": MODEL,
        "messages": [
            {
                "role": "system",
                "content": (
                    "You are an expert programming mentor. "
                    "Return ONLY valid JSON. "
                    "Never return markdown."
                )
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        "temperature": 0.2
    }

    try:

        response = requests.post(
            API_URL,
            headers=headers,
            json=payload,
            timeout=120
        )

        response.raise_for_status()

        result = response.json()

        ai_response = (
            result.get("choices", [{}])[0]
            .get("message", {})
            .get("content", "")
            .strip()
        )

        if ai_response.startswith("```"):
            ai_response = (
                ai_response
                .replace("```json", "")
                .replace("```", "")
                .strip()
            )

        return json.loads(ai_response)

    except json.JSONDecodeError:

        return {
            "status": "error",
            "message": "Model returned invalid JSON.",
            "raw_response": ai_response
        }

    except requests.exceptions.HTTPError:

        return {
            "status": "error",
            "message": response.text
        }

    except requests.exceptions.RequestException as e:

        return {
            "status": "error",
            "message": str(e)
        }

    except Exception as e:

        return {
            "status": "error",
            "message": str(e)
        }