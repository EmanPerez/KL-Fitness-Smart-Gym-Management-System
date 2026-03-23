import { useState, useEffect } from 'react';
import { C, T } from '../../../theme';
import { SectionLabel, NotifCard } from '../../shared';

function TopBar({ onNotif }) {
  return (
    <div style={{ background:C.bgPrimary, padding:'12px 20px 10px', borderBottom:`0.5px solid ${C.border}`, flexShrink:0 }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span style={{ fontFamily:T.display, color:C.gold, fontSize:22, letterSpacing:2 }}>KL FITNESS</span>
        <button onClick={onNotif} style={{ width:32, height:32, background:'#1a1a1a', border:`0.5px solid ${C.borderMid}`,
          borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', position:'relative' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill={C.textMuted}>
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6V11c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>
          <div style={{ position:'absolute', top:4, right:4, width:8, height:8, background:C.gold, borderRadius:'50%' }} />
        </button>
      </div>
      <div style={{ color:C.textMuted, fontSize:12, marginTop:4 }}>Good morning,</div>
      <div style={{ color:C.textPrimary, fontWeight:500, fontSize:15 }}>Alex Santos 👋</div>
    </div>
  );
}

function ClockWidget() {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const id = setInterval(()=>setNow(new Date()),1000); return ()=>clearInterval(id); }, []);
  const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const h = String(now.getHours()).padStart(2,'0');
  const m = String(now.getMinutes()).padStart(2,'0');
  const s = String(now.getSeconds()).padStart(2,'0');
  return (
    <div style={{ background:C.bgSecondary, border:`0.5px solid ${C.border}`, borderRadius:14,
      padding:'14px 16px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
      <div>
        <div style={{ fontFamily:T.display, fontSize:38, color:C.gold, letterSpacing:2, lineHeight:1 }}>
          {h}:{m}<span style={{ fontSize:22, opacity:0.6 }}>{s}</span>
        </div>
        <div style={{ color:C.textMuted, fontSize:11, marginTop:4 }}>Live Time</div>
      </div>
      <div style={{ textAlign:'right' }}>
        <div style={{ color:C.textPrimary, fontWeight:500, fontSize:14 }}>{DAYS[now.getDay()]}</div>
        <div style={{ color:C.textMuted, fontSize:12 }}>{MONTHS[now.getMonth()]} {now.getDate()}, {now.getFullYear()}</div>
      </div>
    </div>
  );
}

function MembershipCard() {
  const daysLeft=29, pct=Math.round((29/30)*100);
  return (
    <div style={{ background:'linear-gradient(135deg,#1a1a00 0%,#2a2000 100%)', border:`1px solid ${C.gold}`,
      borderRadius:16, padding:16, position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', right:-20, top:-20, width:80, height:80, border:'1px solid rgba(240,192,64,0.2)', borderRadius:'50%' }} />
      <div style={{ color:C.textMuted, fontSize:10, letterSpacing:1, textTransform:'uppercase' }}>Active Plan</div>
      <div style={{ color:C.gold, fontSize:18, fontWeight:600, margin:'2px 0' }}>Premium Monthly</div>
      <div style={{ color:C.textPrimary, fontWeight:500, fontSize:14 }}>Alex Santos</div>
      <div style={{ color:C.textMuted, fontSize:12, marginTop:8 }}>Expires on <span style={{ color:C.gold }}>April 15, 2026</span></div>
      <div style={{ background:'#1e1e1e', height:4, borderRadius:4, marginTop:10 }}>
        <div style={{ background:C.gold, height:4, borderRadius:4, width:`${pct}%` }} />
      </div>
      <div style={{ color:C.gold, fontSize:11, textAlign:'right', marginTop:4 }}>{daysLeft} days left</div>
    </div>
  );
}

function WeekCalendar() {
  const DN = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const today = new Date();
  const days = Array.from({length:7},(_,i)=>{ const d=new Date(today); d.setDate(today.getDate()+(i-1)); return d; });
  const hasDot = [false,true,false,true,false,true,false];
  return (
    <div style={{ display:'flex', gap:8, overflowX:'auto', paddingBottom:4 }}>
      {days.map((d,i)=>{
        const isToday = i===1;
        return (
          <div key={i} style={{ flexShrink:0, width:44, background:isToday?C.goldBg:C.bgSecondary,
            border:`0.5px solid ${isToday?C.gold:C.border}`, borderRadius:10, padding:'8px 4px', textAlign:'center', cursor:'pointer' }}>
            <div style={{ color:C.textMuted, fontSize:10 }}>{DN[d.getDay()]}</div>
            <div style={{ color:isToday?C.gold:C.textPrimary, fontSize:16, fontWeight:500 }}>{d.getDate()}</div>
            <div style={{ height:7, display:'flex', justifyContent:'center', marginTop:2 }}>
              {hasDot[i] && <div style={{ width:4, height:4, background:C.gold, borderRadius:'50%' }} />}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function QuickStats() {
  const stats = [
    { label:'Sessions This Month', value:'14', color:C.gold  },
    { label:'Upcoming Classes',    value:'3',  color:C.gold  },
    { label:'Current Weight',      value:'72kg', color:C.green },
    { label:'Goal Weight',         value:'68kg', color:C.blue  },
  ];
  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
      {stats.map((s,i)=>(
        <div key={i} style={{ background:C.bgSecondary, border:`0.5px solid ${C.border}`, borderRadius:12, padding:12 }}>
          <div style={{ color:s.color, fontSize:22, fontWeight:600 }}>{s.value}</div>
          <div style={{ color:C.textMuted, fontSize:11, marginTop:2 }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function NotifModal({ onClose }) {
  const items = [
    'Your membership plan expires on April 15, 2026.',
    'Next Zumba class is March 20, 7:00 AM.',
    '20% membership promo starts March 25.',
    'Training session with Coach Marco – March 19, 6:00 PM.',
  ];
  return (
    <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)', zIndex:100, display:'flex', alignItems:'flex-end' }}>
      <div style={{ width:'100%', background:'#111', borderRadius:'16px 16px 0 0', padding:'16px 20px 32px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
          <span style={{ color:C.textPrimary, fontWeight:600, fontSize:15 }}>Notifications</span>
          <button onClick={onClose} style={{ background:'none', border:'none', color:C.textMuted, cursor:'pointer', fontSize:18 }}>✕</button>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {items.map((n,i)=>(
            <NotifCard key={i}><span style={{ color:C.gold, fontWeight:500 }}>Alert: </span>{n}</NotifCard>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomeTab() {
  const [showNotif, setShowNotif] = useState(false);
  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', position:'relative' }}>
      <TopBar onNotif={()=>setShowNotif(true)} />
      <div style={{ flex:1, overflowY:'auto', padding:'16px 20px 0' }}>
        <ClockWidget />
        <SectionLabel>My Membership</SectionLabel>
        <MembershipCard />
        <div style={{ marginTop:8 }}>
          <NotifCard><strong style={{ color:C.gold }}>Reminder:</strong> Your membership plan expires on April 15, 2026. Renew now!</NotifCard>
        </div>
        <SectionLabel>This Week</SectionLabel>
        <WeekCalendar />
        <SectionLabel>Quick Stats</SectionLabel>
        <QuickStats />
        <div style={{ height:20 }} />
      </div>
      {showNotif && <NotifModal onClose={()=>setShowNotif(false)} />}
    </div>
  );
}