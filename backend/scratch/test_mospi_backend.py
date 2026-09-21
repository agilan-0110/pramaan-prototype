import urllib.request
import json

BASE_URL = "http://127.0.0.1:8000"

def test_mospi():
    # 1. Authenticate as MoSPI
    login_data = json.dumps({
        "username": "ADM-CNA-MOSPI-HQ-002",
        "password": "CentralApex#Pass2026"
    }).encode("utf-8")
    
    req = urllib.request.Request(
        f"{BASE_URL}/auth/login",
        data=login_data,
        headers={"Content-Type": "application/json"}
    )
    res = urllib.request.urlopen(req)
    auth_resp = json.loads(res.read().decode())
    token = auth_resp["access_token"]
    print(f"Logged in as: {auth_resp['officialName']} ({auth_resp['role']}) - Scope: {auth_resp['accessScope']}")
    assert auth_resp['accessScope'] == 'national_all', "MoSPI scope must be national_all"
    
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    # 2. Check total projects nationwide (must be all 124 projects)
    req = urllib.request.Request(f"{BASE_URL}/projects", headers=headers)
    res = urllib.request.urlopen(req)
    projects = json.loads(res.read().decode())
    print(f"Total projects visible to MoSPI: {len(projects)}")
    assert len(projects) == 124, f"Expected 124 projects nationally, got {len(projects)}"

    # 3. Check directives: Task Auditor
    task_data = json.dumps({
        "scopeNotes": "Conduct comprehensive forensic audit into repeated civil milestone delays and contractor billing anomalies.",
        "priority": "HIGH"
    }).encode("utf-8")
    req = urllib.request.Request(f"{BASE_URL}/projects/PRJ-IND-2013/task-auditor", data=task_data, headers=headers)
    res = urllib.request.urlopen(req)
    task_resp = json.loads(res.read().decode())
    print(f"Task Auditor Response: {task_resp['success']} - Task ID: {task_resp['task']['taskId']}")

    # 4. Check directives: Direct State Action
    dir_data = json.dumps({
        "directiveText": "Direct State PWD to issue show-cause notice and freeze contractor bank guarantees within 14 days.",
        "targetState": "Maharashtra",
        "responseDeadlineDays": 14
    }).encode("utf-8")
    req = urllib.request.Request(f"{BASE_URL}/projects/PRJ-IND-2013/direct-state-action", data=dir_data, headers=headers)
    res = urllib.request.urlopen(req)
    dir_resp = json.loads(res.read().decode())
    print(f"Direct State Action Response: {dir_resp['success']} - Directive ID: {dir_resp['directive']['directiveId']}")

    # 5. Check directives: Initiate State Performance Review
    rev_data = json.dumps({
        "state": "Maharashtra",
        "reason": "Systemic delay pattern and chronic non-utilization of carry-forward grants.",
        "directiveNotes": "Initiate comprehensive institutional review by MoSPI Central Directorate."
    }).encode("utf-8")
    req = urllib.request.Request(f"{BASE_URL}/projects/states/Maharashtra/initiate-review", data=rev_data, headers=headers)
    res = urllib.request.urlopen(req)
    rev_resp = json.loads(res.read().decode())
    print(f"State Review Response: {rev_resp['success']} - Review ID: {rev_resp['review']['reviewId']}")

    # 6. Check MoSPI Directives Registry
    req = urllib.request.Request(f"{BASE_URL}/projects/mospi/directives", headers=headers)
    res = urllib.request.urlopen(req)
    directives = json.loads(res.read().decode())
    print(f"Total Directives in Registry: {len(directives)}")
    assert len(directives) >= 3, "Expected at least 3 directives logged"

    # 7. Check Alerts for MoSPI
    req = urllib.request.Request(f"{BASE_URL}/alerts", headers=headers)
    res = urllib.request.urlopen(req)
    alerts = json.loads(res.read().decode())
    print(f"Total Alerts visible to MoSPI: {len(alerts)}")
    
    # 8. Check duplicate pairs for cross-state matches
    req = urllib.request.Request(f"{BASE_URL}/projects/duplicates/pairs", headers=headers)
    res = urllib.request.urlopen(req)
    pairs = json.loads(res.read().decode())
    cross_state = [p for p in pairs if p.get('isCrossState')]
    print(f"Total Duplicate Pairs: {len(pairs)}, Cross-State Pairs: {len(cross_state)}")

    print("\nALL MOSPI BACKEND ENDPOINTS PASSED SUCCESSFULLY!")

if __name__ == "__main__":
    test_mospi()
