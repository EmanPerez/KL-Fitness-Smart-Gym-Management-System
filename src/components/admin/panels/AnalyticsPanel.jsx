import { C, MEMBERS_DATA } from '../../../theme';
import { MetricCard, StatusPill, PanelCard, AdminTable } from '../../shared';

function AttendancePattern() {
  const days=[{label:'Mon',pct:72},{label:'Tue',pct:60},{label:'Wed',pct:65},{label:'Thu',pct:55},{label:'Fri',pct:80},{label:'Sat',pct:95},{label:'Sun',pct:40}];
  return (
    <PanelCard title="Attendance Pattern" badge="30 Days">
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {days.map(d=>(
          <div key={d.label} style={{ display:'flex', alignItems:'center', gap:10 }}>
            <span style={{ color:C.textMuted, fontSize:11, width:28 }}>{d.label}</span>
            <div style={{ flex:1, background:'#1e1e1e', height:6, borderRadius:3 }}>
              <div style={{ background:d.pct===95?C.green:C.gold, height:6, borderRadius:3, width:`${d.pct}%`, transition:'width 0.5s' }} />
            </div>
            <span style={{ color:d.pct===95?C.green:C.textSecondary, fontSize:11, width:32, textAlign:'right' }}>{d.pct}%</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop:12, padding:'10px 12px', background:C.goldBg, border:'0.5px solid rgba(240,192,64,0.3)', borderRadius:8 }}>
        <div style={{ color:C.gold, fontSize:12, fontWeight:500 }}>Peak Day: Saturday (95% capacity)</div>
        <div style={{ color:C.textMuted, fontSize:11, marginTop:3 }}>Consider adding an extra trainer or class on Saturdays.</div>
      </div>
    </PanelCard>
  );
}

function DropoutRisk() {
  const atRisk = MEMBERS_DATA.filter(m=>m.risk>=40).sort((a,b)=>b.risk-a.risk);
  const rc = pct => pct>=75?C.orange:pct>=50?C.gold:C.green;
  return (
    <PanelCard title="Dropout Risk" badge="AI Flagged">
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12, padding:'6px 10px',
        background:'#1a0a00', borderRadius:6, border:`0.5px solid ${C.orangeBorder}` }}>
        <span style={{ fontSize:14 }}>⚠️</span>
        <span style={{ color:C.textSecondary, fontSize:11 }}>{atRisk.length} members flagged as potential dropouts</span>
      </div>
      {atRisk.map(m=>(
        <div key={m.id} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 0', borderBottom:'0.5px solid #131313' }}>
          <span style={{ color:C.textSecondary, fontSize:12, flex:1 }}>{m.name}</span>
          <div style={{ flex:2, background:'#1e1e1e', height:4, borderRadius:3 }}>
            <div style={{ background:rc(m.risk), height:4, borderRadius:3, width:`${m.risk}%` }} />
          </div>
          <span style={{ color:rc(m.risk), fontSize:11, width:30, textAlign:'right', fontWeight:600 }}>{m.risk}%</span>
        </div>
      ))}
    </PanelCard>
  );
}

export default function AnalyticsPanel() {
  const metrics = [
    { label:'Avg. Sessions / Week',  value:'38',       delta:'+5 vs last week',     deltaType:'up',   accent:C.gold   },
    { label:'Dropout Risk Members',  value:'14',       delta:'Needs attention',      deltaType:'down', accent:C.orange },
    { label:'Top Performing Day',    value:'Saturday', delta:'Avg 52 check-ins',     deltaType:'neutral' },
    { label:'Equipment Reports',     value:'7',        delta:'3 pending resolution', deltaType:'down' },
  ];
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,minmax(0,1fr))', gap:12 }}>
        {metrics.map((m,i)=><MetricCard key={i} {...m} />)}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
        <AttendancePattern />
        <DropoutRisk />
      </div>
      <PanelCard title="Session Trend" badge="6 Months">
        <div style={{ display:'flex', alignItems:'flex-end', gap:10, height:80 }}>
          {[['Oct',28],['Nov',34],['Dec',31],['Jan',40],['Feb',37],['Mar',44]].map(([m,v],i,a)=>(
            <div key={m} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4, height:'100%', justifyContent:'flex-end' }}>
              <div style={{ color:C.textMuted, fontSize:10 }}>{v}</div>
              <div style={{ width:'100%', height:`${Math.round((v/Math.max(...a.map(x=>x[1])))*100)}%`,
                background:i===a.length-1?C.gold:'rgba(240,192,64,0.3)', borderRadius:'3px 3px 0 0', minHeight:4 }} />
              <span style={{ color:C.textMuted, fontSize:10 }}>{m}</span>
            </div>
          ))}
        </div>
      </PanelCard>
      <PanelCard title="Equipment Reports" badge="Pending">
        <AdminTable
          headers={['Equipment','Issue','Reporter','Date','Status']}
          rows={[
            ['Cable Machine #2','Faulty cable','Alex Santos','Mar 14',<StatusPill status="In Review"/>],
            ['Treadmill #4','Belt slipping','Maria S.','Mar 15',<StatusPill status="In Review"/>],
            ['Bench Press #1','Missing bolt','Diego R.','Mar 10',<StatusPill status="Resolved"/>],
          ]}
        />
      </PanelCard>
    </div>
  );
}