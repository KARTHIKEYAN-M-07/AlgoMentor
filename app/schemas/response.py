from pydantic import BaseModel
from typing import Any, Dict


class AnalyzeResponse(BaseModel):
    execution: Dict[str, Any]
    analysis: Dict[str, Any]