from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import debate
import uvicorn
from dotenv import load_dotenv
load_dotenv()

app = FastAPI(title="Zero Shot AI Debate Bot")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can change * to ["http://localhost:5173"] for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(debate.router)

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)