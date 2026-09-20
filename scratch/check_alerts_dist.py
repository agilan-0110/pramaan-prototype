import json
from collections import Counter

with open('backend/app/data/mockAlerts.json', 'r', encoding='utf-8') as f:
    alerts = json.load(f)

print(f"Total alerts in mockAlerts.json: {len(alerts)}")
dist_counts = Counter(a.get('district') for a in alerts)
for d, count in sorted(dist_counts.items()):
    print(f"  {d}: {count} alerts")
