import urllib.request
import json

BASE_URL = "http://127.0.0.1:8000"

USERS = [
    ("Auditor / CAG", "ADM-CAG-AUD-TN-CHN-003", "CAGAudit#Pass2026"),
    ("Central Nodal / MoSPI", "ADM-CNA-MOSPI-HQ-002", "CentralApex#Pass2026"),
    ("State Nodal (TN)", "ADM-SNA-TN-CHN-005", "StateNodal#Pass2026"),
    ("District Authority (Chennai)", "ADM-DA-TN-CHN-001", "DistAdmin#Pass2026"),
    ("MP Office (Chennai Central)", "ADM-MP-TN-CHN-021", "MPOffice#Pass2026"),
    ("Implementing Agency (PWD Chennai)", "ADM-IA-PWD-TN-CHN-008", "PWDWorks#Pass2026")
]

def login(user_id, pwd):
    req = urllib.request.Request(
        f"{BASE_URL}/auth/login",
        data=json.dumps({"username": user_id, "password": pwd}).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode("utf-8"))

def fetch_alerts(token, project_id=None):
    url = f"{BASE_URL}/alerts"
    if project_id:
        url += f"?project_id={project_id}"
    req = urllib.request.Request(url, headers={"Authorization": f"Bearer {token}"})
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode("utf-8"))

def fetch_summary(token):
    req = urllib.request.Request(f"{BASE_URL}/alerts/summary", headers={"Authorization": f"Bearer {token}"})
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode("utf-8"))

def main():
    print("=== LIVE HTTP RBAC & TIERED ALERTS VERIFICATION ===")
    for label, user_id, pwd in USERS:
        auth_data = login(user_id, pwd)
        token = auth_data["access_token"]
        role = auth_data["role"]
        
        alerts_resp = fetch_alerts(token)
        alerts = alerts_resp if isinstance(alerts_resp, list) else alerts_resp.get("alerts", [])
        total_in_resp = len(alerts)
        
        summary_resp = fetch_summary(token)
        pending_count = summary_resp.get("totalAlerts", 0)
        
        severities = {}
        for a in alerts:
            sev = a.get("severity", "UNKNOWN")
            severities[sev] = severities.get(sev, 0) + 1
            
        print(f"\n[{label}] Role: {role} (ID: {user_id})")
        print(f"  Total Alerts Returned: {total_in_resp}")
        print(f"  Severity Distribution: {severities}")
        print(f"  Summary totalAlerts (Pending Alerts Stat): {pending_count}")
        
        if "Auditor" in label:
            assert total_in_resp > 100, "Auditor should see all nationwide alerts"
            assert "CRITICAL" in severities and "HIGH" in severities
            print("  [PASS] Auditor statutory unrestricted access confirmed")
            
        elif "MoSPI" in label:
            assert all(a["severity"] == "CRITICAL" for a in alerts), "MoSPI must only see CRITICAL"
            assert total_in_resp == pending_count
            print("  [PASS] MoSPI CRITICAL-only national feed confirmed")
            
        elif "State Nodal" in label:
            # Should have CRITICAL alerts and aggregate cards for HIGH
            agg_cards = [a for a in alerts if a.get("projectId") == "AGGREGATE"]
            crit_alerts = [a for a in alerts if a.get("severity") == "CRITICAL"]
            assert len(agg_cards) > 0, "State Nodal must receive district aggregate cards for HIGH"
            assert len(crit_alerts) > 0, "State Nodal must receive full CRITICAL cases"
            agg_high_sum = sum(int(a["title"].split()[0]) for a in agg_cards)
            assert pending_count == len(crit_alerts) + agg_high_sum
            print(f"  [PASS] State Nodal tiered feed confirmed: {len(crit_alerts)} CRITICAL + {len(agg_cards)} District Aggregates (Pending Total: {pending_count})")
            
            # Test drilldown
            drilldown = fetch_alerts(token, project_id="PRJ-IND-TN-107")
            assert len(drilldown) > 0
            assert drilldown[0]["projectId"] == "PRJ-IND-TN-107"
            print("  [PASS] State Nodal project drilldown returns full case detail")
            
        elif "District Authority" in label:
            # Chennai DA: all severities for Chennai only
            assert total_in_resp == pending_count
            assert all(a.get("district") == "Chennai" or "Chennai" in a.get("title", "") or a.get("projectId", "").startswith("PRJ-IND-TN-") for a in alerts)
            print(f"  [PASS] District Authority sees full Chennai alerts ({total_in_resp})")
            
        elif "MP Office" in label:
            assert total_in_resp == 0
            assert pending_count == 0
            print("  [PASS] MP Office receives 0 alerts from alerts endpoint (passive badge only)")
            
        elif "Implementing Agency" in label:
            assert total_in_resp == 0
            assert pending_count == 0
            print("  [PASS] Implementing Agency excluded from risk/compliance/citizen-contradiction alerts")

    print("\nALL HTTP TESTS PASSED SUCCESSFULLY!")

if __name__ == "__main__":
    main()
