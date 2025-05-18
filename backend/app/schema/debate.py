from pydantic import BaseModel
from typing import Optional, List

class DebateRequest(BaseModel):
    topic: str
    style: Optional[str] = "default"
    
class Argument(BaseModel):
    stance: str
    opening: str
    rebuttal: str
    closing: str
    sources: List[str]
    
class DebateResponse(BaseModel):
    topic: str
    arguments: List[Argument] 