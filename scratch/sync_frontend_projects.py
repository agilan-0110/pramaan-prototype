import json
import re
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
PROJECTS_FILE = BASE_DIR / "backend" / "app" / "data" / "mockProjects.json"
DASHBOARD_DATA_FILE = BASE_DIR / "frontend" / "src" / "pages" / "dashboardData.js"
PROJECT_DETAIL_FILE = BASE_DIR / "frontend" / "src" / "pages" / "projectDetailData.js"

with open(PROJECTS_FILE, "r", encoding="utf-8") as f:
    projects = json.load(f)

projects_json_str = json.dumps(projects, indent=2)

# 1. Update dashboardData.js
with open(DASHBOARD_DATA_FILE, "r", encoding="utf-8") as f:
    dash_content = f.read()

pattern = r"const FALLBACK_PROJECTS = \[[\s\S]*?\n\];"
new_dash_content = re.sub(pattern, lambda m: f"const FALLBACK_PROJECTS = {projects_json_str};", dash_content, count=1)

with open(DASHBOARD_DATA_FILE, "w", encoding="utf-8") as f:
    f.write(new_dash_content)

print(f"[OK] Updated dashboardData.js with {len(projects)} mock projects.")

# 2. Update projectDetailData.js if it contains FALLBACK_PROJECTS or mockProjects
with open(PROJECT_DETAIL_FILE, "r", encoding="utf-8") as f:
    detail_content = f.read()

if "const FALLBACK_PROJECTS =" in detail_content:
    new_detail_content = re.sub(pattern, lambda m: f"const FALLBACK_PROJECTS = {projects_json_str};", detail_content, count=1)
    with open(PROJECT_DETAIL_FILE, "w", encoding="utf-8") as f:
        f.write(new_detail_content)
    print(f"[OK] Updated projectDetailData.js with {len(projects)} mock projects.")
elif "const mockProjects =" in detail_content or "export const mockProjects =" in detail_content:
    pattern2 = r"(export\s+const\s+mockProjects\s*=\s*\[|const\s+mockProjects\s*=\s*\[)[\s\S]*?\n\];"
    new_detail_content = re.sub(pattern2, lambda m: f"export const mockProjects = {projects_json_str};", detail_content, count=1)
    with open(PROJECT_DETAIL_FILE, "w", encoding="utf-8") as f:
        f.write(new_detail_content)
    print(f"[OK] Updated projectDetailData.js with {len(projects)} mock projects.")
