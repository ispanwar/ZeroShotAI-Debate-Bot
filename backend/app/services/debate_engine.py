from app.services.openai import get_openai_response
from app.services.wiki import search_wikipedia

def generate_debate(topic: str, style: str = "default"):
    wiki_data = search_wikipedia(topic)
    evidence_snippets = "\n".join([f"{w['title']}:{w['summary']}" for w in wiki_data])

    prompt = f"""Topic: {topic}

Use the following evidence from Wikipedia:
{evidence_snippets}

Generate a structured debate with the two sides: **Pro** and **Con**.

### Format:
**Pro:**

*Opening Statement:*
...

*Rebuttal:*
...

*Closing Statement:*
...

**Con:**

*Opening Statement:*
...

*Rebuttal:*
...

*Closing Statement:*
...

Use clear section headers, markdown-style formatting, and include points from the evidence. Respond in markdown exactly as above.
style: {style}
"""

    raw_output = get_openai_response(prompt)
    return raw_output
