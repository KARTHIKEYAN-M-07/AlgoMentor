from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional



class Resource(BaseModel):

    title: str = ""

    platform: str = ""

    type: str = ""

    difficulty: str = ""

    url: str = ""



class LearningMaterial(BaseModel):

    topic: str = ""

    reason: str = ""

    difficulty: str = ""

    resources: List[Resource] = Field(
        default_factory=list
    )



class EdgeCase(BaseModel):

    topic: str = ""

    reason: str = ""

    difficulty: str = ""



class CodeReview(BaseModel):

    correctness: str = ""

    readability: str = ""

    maintainability: str = ""

    variable_naming: str = ""

    best_practices: List[str] = Field(
        default_factory=list
    )



class Complexity(BaseModel):

    time: str = ""

    space: str = ""



class Optimization(BaseModel):

    possible: bool = False

    reason: str = ""

    improved_algorithm: str = ""

    suggestions: List[str] = Field(
        default_factory=list
    )



class Analysis(BaseModel):

    status: str = ""

    error_type: str = ""

    error_explanation: str = ""

    why_it_happened: str = ""

    how_to_fix: str = ""

    corrected_code: str = ""


    code_review: Optional[CodeReview] = None


    complexity: Optional[Complexity] = None


    optimization: Optional[Optimization] = None


    edge_cases: List[EdgeCase] = Field(
        default_factory=list
    )


    learning_materials: List[LearningMaterial] = Field(
        default_factory=list
    )


    summary: str = ""



class AnalyzeResponse(BaseModel):

    execution: Dict[str, Any]

    analysis: Analysis