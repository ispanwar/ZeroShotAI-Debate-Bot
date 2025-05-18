from dotenv import load_dotenv
import os
load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
WIKI_SEARCH_LIMIT = int(os.getenv("WIKI_SEARCH_LIMIT",5))
OPENROUTER_BASE_URL = os.getenv("OPENROUTER_BASE_URL")