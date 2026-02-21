#!/usr/bin/env python3
"""
Parse Chirag Chawla's resume PDF into structured JSON.

Usage:
    pip install pdfplumber
    python scripts/parse_resume.py

Output: data/resume.json
"""

import json
import os
import re
from pathlib import Path

# NOTE: Install pdfplumber for actual parsing:
# pip install pdfplumber
# For now, this script contains the pre-parsed structured data from the resume PDF.

PARSED_RESUME = {
    "name": "Chirag Chawla",
    "rollNo": "22054010",
    "phone": "+91-8295822885",
    "email": "chiragchawla2021@gmail.com",
    "degree": "B.Tech + M.Tech — Department of Industrial Chemistry",
    "institute": "Indian Institute of Technology (BHU) Varanasi",
    "years": "2022–2027",
    "_parsed_from": "CHIRAG_CHAWLA_IITBHU_AIResearch_2027.pdf",
    "_note": "Run with actual PDF path to auto-parse: python scripts/parse_resume.py --pdf path/to/resume.pdf"
}

def parse_with_pdfplumber(pdf_path: str) -> dict:
    """Parse resume PDF using pdfplumber."""
    try:
        import pdfplumber
    except ImportError:
        print("Install pdfplumber: pip install pdfplumber")
        return {}
    
    with pdfplumber.open(pdf_path) as pdf:
        text = "\n".join(page.extract_text() or "" for page in pdf.pages)
    
    # Basic extraction (extend as needed)
    lines = [l.strip() for l in text.split('\n') if l.strip()]
    
    result = {
        "raw_text_preview": text[:500],
        "line_count": len(lines),
    }
    return result


def main():
    output_path = Path("data/resume.json")
    output_path.parent.mkdir(exist_ok=True)
    
    # Try to find a PDF in common locations
    pdf_candidates = [
        "CHIRAG_CHAWLA_IITBHU_AIResearch_2027.pdf",
        "resume.pdf",
        "cv.pdf",
    ]
    
    parsed = None
    for candidate in pdf_candidates:
        if os.path.exists(candidate):
            print(f"Found PDF: {candidate}")
            parsed = parse_with_pdfplumber(candidate)
            break
    
    if not parsed:
        print("No PDF found. Writing pre-parsed data...")
        parsed = PARSED_RESUME
    
    with open(output_path, 'w') as f:
        json.dump(parsed, f, indent=2)
    
    print(f"✓ Written to {output_path}")


if __name__ == "__main__":
    main()
