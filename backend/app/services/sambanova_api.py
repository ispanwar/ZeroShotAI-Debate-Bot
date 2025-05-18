# app/services/sambanova_api.py

import os
import requests
from dotenv import load_dotenv

load_dotenv()  # Load .env variables

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")  # Use OpenRouter's key
OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"
MODEL_NAME = "openai/gpt-3.5-turbo"

def build_prompt(topic: str, side: str, section: str, action: str) -> str:
    if action == "like":
        return f"Provide a similar {side.upper()} {section} statement for the debate topic: '{topic}'. Make it factual, clear, and persuasive."
    else:
        return f"Generate a new {side.upper()} {section} argument for the debate topic: '{topic}'. Make it logical, well-structured, and fact-based."

def call_sambanova(prompt: str) -> str:
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",  # Update this if deployed
        "X-Title": "ZeroShot Debate Bot"
    }

    data = {
        "model": MODEL_NAME,
        "messages": [
            {"role": "system", "content": "You are a helpful AI that generates structured debate arguments."},
            {"role": "user", "content": prompt}
        ]
    }

    response = requests.post(OPENROUTER_API_URL, headers=headers, json=data)

    try:
        response.raise_for_status()
        result = response.json()
        return result["choices"][0]["message"]["content"].strip()
    except Exception as e:
        print("❌ OpenRouter API Error:")
        print("Status:", response.status_code)
        print("Response:", response.text)
        raise e

def get_similar_fact(topic: str, side: str, section: str) -> str:
    prompt = build_prompt(topic, side, section, "like")
    return call_sambanova(prompt)

def get_new_argument(topic: str, side: str, section: str) -> str:
    prompt = build_prompt(topic, side, section, "dislike")
    return call_sambanova(prompt)
