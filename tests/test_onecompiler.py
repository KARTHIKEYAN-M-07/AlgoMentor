import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from app.services.onecompiler import execute_code

code = """
print("Hello World")
"""

result = execute_code(
    source_code=code,
    language="python"
)

print(result)