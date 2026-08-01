from fastapi import APIRouter, HTTPException

from backend.app.schemas.request import AnalyzeRequest
from backend.app.schemas.response import AnalyzeResponse

from backend.app.services.onecompiler import execute_code
from backend.app.services.ai_services import analyze_code
from backend.app.services.resource_service import attach_resources


router = APIRouter()


@router.post("/analyze", response_model=AnalyzeResponse)
def analyze(request: AnalyzeRequest):

    try:

        # =====================================
        # 1. Execute Code using OneCompiler
        # =====================================

        execution = execute_code(
            source_code=request.code,
            language=request.language,
            stdin=request.stdin
        )


        print("\n========== ONECOMPILER RESPONSE ==========")
        print(execution)
        print("==========================================\n")



        # =====================================
        # 2. AI Code Analysis
        # =====================================

        analysis = analyze_code(

            code=request.code,

            language=request.language,

            compiler_output=
                execution.get("compile_output") or "",

            execution_output=
                execution.get("stdout") or "",

            runtime_error=
                execution.get("stderr") or "",

            execution_time=
                str(execution.get("time") or ""),

            memory_used=
                str(execution.get("memory") or "")
        )


        print("\n========== AI RESPONSE ==========")
        print(analysis)
        print("=================================\n")



        # =====================================
        # 3. Attach Learning Resources
        # =====================================

        analysis = attach_resources(
            analysis
        )


        print("\n====== FINAL RESPONSE WITH RESOURCES ======")
        print(analysis)
        print("===========================================\n")



        # =====================================
        # 4. Return Final Response
        # =====================================

        return AnalyzeResponse(

            execution=execution,

            analysis=analysis

        )


    except Exception as e:

        raise HTTPException(

            status_code=500,

            detail=str(e)

        )