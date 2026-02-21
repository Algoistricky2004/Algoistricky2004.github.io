#!/usr/bin/env python3
"""
Sync publications from Google Scholar.
Requires: pip install scholarly

Environment variables:
    SCHOLAR_USER_ID: Google Scholar user ID (default: TtyaWYAAAAAJ)
"""

import json
import os
import time
from pathlib import Path

SCHOLAR_USER_ID = os.getenv("SCHOLAR_USER_ID", "TtyaWYAAAAAJ")

def sync():
    try:
        from scholarly import scholarly
    except ImportError:
        print("Install scholarly: pip install scholarly")
        return
    
    print(f"Fetching publications for user: {SCHOLAR_USER_ID}")
    
    author = scholarly.search_author_id(SCHOLAR_USER_ID)
    scholarly.fill(author, sections=['publications'])
    
    publications = []
    for pub in author.get('publications', []):
        bib = pub.get('bib', {})
        # Rate limit to be respectful
        time.sleep(2)
        
        entry = {
            "id": pub.get('author_pub_id', '').replace('/', '-'),
            "title": bib.get('title', ''),
            "authors": bib.get('author', '').split(' and '),
            "venue": bib.get('journal') or bib.get('booktitle') or bib.get('venue') or '',
            "year": int(bib.get('pub_year', 0)) if bib.get('pub_year') else None,
            "citations": pub.get('num_citations', 0),
            "url": pub.get('pub_url', ''),
            "tags": [],  # Add tags manually in publications.json
            "abstract": bib.get('abstract', '')[:500],
        }
        publications.append(entry)
        print(f"  ✓ {entry['title'][:60]}...")
    
    output = Path("data/publications.json")
    with open(output, 'w') as f:
        json.dump(publications, f, indent=2, ensure_ascii=False)
    
    print(f"\n✓ Synced {len(publications)} publications to {output}")

if __name__ == "__main__":
    sync()
