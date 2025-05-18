from openai import OpenAI
import os
from app.config import OPENAI_API_KEY, OPENROUTER_BASE_URL
api_key = os.getenv("OPENAI_API_KEY")
base_url = os.getenv("OPENROUTER_BASE_URL")

client = OpenAI(
    api_key=OPENAI_API_KEY,
    base_url=OPENROUTER_BASE_URL,
)

def get_openai_response(prompt: str, model="openai/gpt-3.5-turbo"):
    try:
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": "You are a skilled debater who always uses facts."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
        )
        return response.choices[0].message.content
    except Exception as e:
        print("❌ OpenRouter API Error:", e)
        return "❌ Failed to get response from OpenRouter"