import wikipedia
from app.config import WIKI_SEARCH_LIMIT

def search_wikipedia(query:str):
    results = wikipedia.search(query,results=WIKI_SEARCH_LIMIT)
    summaries = []
    for title in results:
        try:
            summary = wikipedia.summary(title,sentences=3)
            summaries.append({"title":title,"summary":summary})
        except:
            continue
    return summaries
        