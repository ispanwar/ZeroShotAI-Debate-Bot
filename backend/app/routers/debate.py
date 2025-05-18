# from fastapi import APIRouter
# from app.schema.debate import DebateRequest, DebateResponse, Argument
# from app.services.debate_engine import generate_debate
# from pydantic import BaseModel
# import re

# router = APIRouter(prefix='/debate',tags=['Debate'])

# # @router.post("/",response_model=dict)
# # def debate_topic(request: DebateRequest):
# #     debate_result = generate_debate(request.topic, request.style)
# #     return {
# #         "topic": request.topic,
# #         "raw_debate": debate_result
# #     }
# class DebateRequest(BaseModel):
#     topic: str

# def generate_raw_debate(topic: str) -> str:
#     return f"""Pro:
# Opening Statement:
# {topic} should be supported because it leads to progress and opportunity.
# Rebuttal:
# While there are risks associated with {topic}, they can be managed with regulation and education.
# Conclusion:
# Overall, {topic} has more benefits than drawbacks and should be embraced.

# Con:
# Opening Statement:
# {topic} presents serious risks that outweigh its benefits.
# Rebuttal:
# Supporters of {topic} ignore its unintended consequences and the harm it can cause.
# Conclusion:
# Therefore, {topic} should be approached cautiously or even restricted for the public good.
# """

# def extract_side(text: str, side: str):
#     pattern = rf"{side}:\s*Opening Statement:\s*(.*?)\s*Rebuttal:\s*(.*?)\s*Conclusion:\s*(.*?)(?:\n\n|$)"
#     match = re.search(pattern, text, re.DOTALL)
#     if match:
#         return {
#             "opening": match.group(1).strip(),
#             "rebuttal": match.group(2).strip(),
#             "closing": match.group(3).strip()
#         }
#     return {"opening": "", "rebuttal": "", "closing": ""}

# @router.post("/")
# def debate_handler(request: DebateRequest):
#     raw = generate_raw_debate(request.topic)
#     return {
#         "pro": extract_side(raw, "Pro"),
#         "con": extract_side(raw, "Con")
#     }

# from fastapi import APIRouter
# from app.schema.debate import DebateRequest
# from app.services.debate_engine import generate_debate
# from pydantic import BaseModel
# import re

# router = APIRouter(prefix='/debate', tags=['Debate'])

# class DebateRequest(BaseModel):
#     topic: str

# import re

# def extract_side(text: str, side: str):
#     pattern = (
#         rf"\*\*{side}:\*\*\s*"                        # Matches **Pro:** or **Con:**
#         rf"\*Opening Statement:\*\s*(.*?)\s*"         # Matches *Opening Statement:*
#         rf"\*Rebuttal:\*\s*(.*?)\s*"                  # Matches *Rebuttal:*
#         rf"\*Closing Statement:\*\s*(.*?)(?=\n\n|\Z)" # Matches *Closing Statement:* until end
#     )
#     match = re.search(pattern, text, re.DOTALL | re.IGNORECASE)
#     if match:
#         return {
#             "opening": match.group(1).strip(),
#             "rebuttal": match.group(2).strip(),
#             "closing": match.group(3).strip()
#         }
#     return {"opening": "N/A", "rebuttal": "N/A", "closing": "N/A"}



# @router.post("/")
# def debate_handler(request: DebateRequest):
#     raw = generate_debate(request.topic)
#     print("======== RAW DEBATE OUTPUT ========")
#     print(raw)  # <- SEE what OpenAI actually generated

#     return {
#         "topic": request.topic,
#         "pro": extract_side(raw, "Pro"),
#         "con": extract_side(raw, "Con")
#     }



from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import re
from app.schema.debate import DebateRequest
from app.services.debate_engine import generate_debate
from app.services.sambanova_api import get_similar_fact, get_new_argument  # 🧠 Add this

router = APIRouter(prefix='/debate', tags=['Debate'])


def extract_side(text: str, side: str):
    pattern = (
        rf"\*\*{side}:\*\*\s*"
        rf"\*Opening Statement:\*\s*(.*?)\s*"
        rf"\*Rebuttal:\*\s*(.*?)\s*"
        rf"\*Closing Statement:\*\s*(.*?)(?=\n\n|\Z)"
    )
    match = re.search(pattern, text, re.DOTALL | re.IGNORECASE)
    if match:
        return {
            "opening": match.group(1).strip(),
            "rebuttal": match.group(2).strip(),
            "closing": match.group(3).strip()
        }
    return {"opening": "N/A", "rebuttal": "N/A", "closing": "N/A"}


@router.post("/")
def debate_handler(request: DebateRequest):
    raw = generate_debate(request.topic)
    print("======== RAW DEBATE OUTPUT ========")
    print(raw)

    return {
        "topic": request.topic,
        "pro": extract_side(raw, "Pro"),
        "con": extract_side(raw, "Con")
    }

# 🆕 Feedback Request schema
class FeedbackRequest(BaseModel):
    topic: str
    side: str       # "pro" or "con"
    section: str    # "opening", "rebuttal", "closing"
    action: str     # "like" or "dislike"

# 🧠 Feedback endpoint
@router.post("/feedback")
def feedback_handler(request: FeedbackRequest):
    topic = request.topic
    side = request.side
    section = request.section
    action = request.action

    if side not in ["pro", "con"]:
        raise HTTPException(status_code=400, detail="Invalid side")

    if section not in ["opening", "rebuttal", "closing"]:
        raise HTTPException(status_code=400, detail="Invalid section")

    if action == "like":
        updated = get_similar_fact(topic, side, section)
    elif action == "dislike":
        updated = get_new_argument(topic, side, section)
    else:
        raise HTTPException(status_code=400, detail="Invalid action")

    return {"updated": updated}

class CounterRequest(BaseModel):
    topic: str
    user_point: str
    user_side: str  # "pro" or "con"

@router.post("/counterpoint")
def generate_counter(request: CounterRequest):
    from app.services.sambanova_api import call_sambanova

    topic = request.topic
    user_point = request.user_point
    user_side = request.user_side.lower()

    if user_side not in ["pro", "con"]:
        raise HTTPException(status_code=400, detail="Invalid side")

    # Side that will generate the counter
    counter_side = "Con" if user_side == "pro" else "Pro"

    prompt = (
        f"The debate topic is: '{topic}'.\n"
        f"The {user_side.upper()} side presented this point:\n"
        f"\"{user_point}\"\n"
        f"Now write a logical and factual {counter_side} rebuttal."
    )

    counterpoint = call_sambanova(prompt)

    return {"counter": counterpoint}
