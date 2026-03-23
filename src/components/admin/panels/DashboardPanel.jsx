import { useState } from 'react';
import { C, MEMBERS_DATA } from '../../../theme';
import { MetricCard, StatusPill, OutlineButton, PanelCard, AdminTable } from '../../shared';

function AttendanceChart() {
  const [hov, setHov] = useState(null);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const data = [42, 38, 44, 35, 51, 62, 28];
  const max = Math.max(...data);
  return (
    <PanelCard title="Weekly Attendance" badge="This Month">
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 120 }}>
        {data.map((v, i) => (
          <div
            key={i}
            onMouseEnter={() => setHov(i)}
            onMouseLeave={() => setHov(null)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              height: '100%',
              justifyContent: 'flex-end',
            }}
          >
            {hov === i && (
              <div style={{ color: C.gold, fontSize: 10, fontWeight: 600 }}>{v}</div>
            )}
            <div
              style={{
                width: '100%',
                height: `${Math.round((v / max) * 100)}%`,
                background: hov === i ? C.gold : i === 5 ? 'rgba(240,192,64,0.6)' : '#1e1e1e',
                borderRadius: '3px 3px 0 0',
                cursor: 'pointer',
                transition: 'background 0.15s',
                minHeight: 4,
              }}
            />
            <span style={{ color: hov === i ? C.gold : C.textMuted, fontSize: 10 }}>{days[i]}</span>
          </div>
        ))}
      </div>
    </PanelCard>
  );
}

function MembershipDonut() {
  const gradient = `conic-gradient(${C.gold} 0% 51%, ${C.green} 51% 82%, ${C.red} 82% 100%)`;
  return (
    <PanelCard title="Membership Plans">
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <div style={{ width: 100, height: 100, borderRadius: '50%', background: gradient }} />
          <div
            style={{
              position: 'absolute',
              inset: 12,
              borderRadius: '50%',
              background: C.bgSecondary,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ color: C.textPrimary, fontSize: 16, fontWeight: 600 }}>312</div>
            <div style={{ color: C.textMuted, fontSize: 9 }}>members</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { label: 'Monthly', count: 160, color: C.gold },
            { label: 'Quarterly', count: 98, color: C.green },
            { label: 'Expired', count: 54, color: C.red },
          ].map((s) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color }} />
              <span style={{ color: C.textSecondary, fontSize: 12 }}>{s.label}</span>
              <span
                style={{
                  color: s.color,
                  fontSize: 12,
                  fontWeight: 600,
                  marginLeft: 'auto',
                }}
              >
                {s.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </PanelCard>
  );
}

export default function DashboardPanel() {
  const metrics = [
    { label: 'Active Members', value: '248', delta: '+12 this month', deltaType: 'up', accent: C.gold },
    { label: 'Total Registered', value: '312', delta: 'All time', deltaType: 'neutral' },
    { label: 'Total Earnings', value: '₱84,500', delta: '+8.4% vs last mo', deltaType: 'up', accent: C.green },
    { label: 'Available Trainers', value: '4 / 6', delta: '2 on session', deltaType: 'neutral' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 12 }}>
        {metrics.map((m, i) => (
          <MetricCard key={i} {...m} />
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.6fr) minmax(0,1fr)', gap: 16 }}>
        <AttendanceChart />
        <MembershipDonut />
      </div>
      <PanelCard title="Recent Member Activity" badge="Live">
        <AdminTable
          headers={['Member', 'Plan', 'Status', 'Sessions', 'Action']}
          rows={MEMBERS_DATA.map((m) => [
            <span style={{ color: C.textPrimary, fontWeight: 500 }}>{m.name}</span>,
            m.plan,
            <StatusPill
              status={
                m.status === 'active'
                  ? 'Active'
                  : m.status === 'expiring'
                  ? 'Expiring'
                  : m.status === 'risk'
                  ? 'At Risk'
                  : 'Expired'
              }
            />,
            `${m.sessions} sessions`,
            <OutlineButton>View</OutlineButton>,
          ])}
        />
      </PanelCard>
    </div>
  );
}
