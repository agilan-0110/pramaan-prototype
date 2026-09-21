import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "backend"))

from app.services.trend import get_chronic_non_utilization_report
from app.services.duplicate import get_all_duplicate_pairs
from app.services.alerts import alerts_service

tn_chronic = get_chronic_non_utilization_report('Tamil Nadu')
print('TN Chronic Count:', len(tn_chronic['flaggedProjects']))
for p in tn_chronic['flaggedProjects'][:3]:
    print('  TN Chronic:', p['projectId'], p['projectName'][:40], 'Unspent:', p['unspentBalance'], 'FY:', p['financialYear'])

ka_chronic = get_chronic_non_utilization_report('Karnataka')
print('KA Chronic Count:', len(ka_chronic['flaggedProjects']))

pairs = get_all_duplicate_pairs()
print('Total Duplicate Pairs:', len(pairs))
tn_pairs = [p for p in pairs if p.get('sameState') and p['projectA'].get('state') == 'Tamil Nadu']
print('TN Duplicate Pairs:', len(tn_pairs))
for p in tn_pairs:
    print('  TN Pair:', p['projectA']['id'], '(', p['projectA']['district'], ') vs', p['projectB']['id'], '(', p['projectB']['district'], ') - CrossDistrict:', p['isCrossDistrict'])

alerts = alerts_service.get_all_alerts()
print('Total master alerts:', len(alerts))
tn_alerts = [a for a in alerts if a.get('state') == 'Tamil Nadu']
print('TN master alerts:', len(tn_alerts))
chronic_alerts = [a for a in alerts if a.get('alertType') == 'CHRONIC_NON_UTILIZATION']
print('Chronic alerts in master:', len(chronic_alerts))
owner_roles = {a.get('ownerRole') for a in alerts}
print('Alert Owner Roles in system:', owner_roles)
state_owned = [a for a in tn_alerts if a.get('ownerRole') == 'State Nodal']
print('TN State Nodal Owned Alerts count:', len(state_owned))
for a in state_owned[:4]:
    print('  SNA Alert:', a['id'], a['alertType'], a['severity'], a['title'][:40], 'Reason:', a.get('escalationReason'))
