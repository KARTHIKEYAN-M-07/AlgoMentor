import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from app.services.ai_services import analyze_code

result = analyze_code(
    code="""
a = int(input())
b = int(input())
print(a+b)
""",
    language="Python",
    compiler_output="",
    execution_output="10",
    runtime_error="",
    execution_time="0.01 sec",
    memory_used="8 MB"
)
print("\n========== FINAL OUTPUT ==========\n")
print(result)