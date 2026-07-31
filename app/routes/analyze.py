from fastapi import APIRouter, HTTPException
from app.services.resource_service import add_learning_resources
from app.schemas.request import AnalyzeRequest
from app.schemas.response import AnalyzeResponse

from app.services.onecompiler import execute_code
from app.services.ai_services import analyze_code

router = APIRouter()


@router.post("/analyze", response_model=AnalyzeResponse)
def analyze(request: AnalyzeRequest):

    try:

        execution = execute_code(
            source_code=request.code,
            language=request.language,
            stdin=request.stdin
        )

        print("\n========== ONECOMPILER RESPONSE ==========")
        print(execution)
        print("==========================================\n")

        analysis = analyze_code(
            code=request.code,
            language=request.language,
            compiler_output=execution.get("compile_output") or "",
            execution_output=execution.get("stdout") or "",
            runtime_error=execution.get("stderr") or "",
            execution_time=str(execution.get("time") or ""),
            memory_used=str(execution.get("memory") or "")
        )

        return {
            "execution": execution,
            "analysis": analysis
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
        