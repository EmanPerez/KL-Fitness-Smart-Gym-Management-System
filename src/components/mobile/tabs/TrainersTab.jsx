import { useState } from 'react';
import { C, T, TRAINERS_DATA } from '../../../theme';
import { Avatar, GoldButton, StatusPill } from '../../shared';

const CATEGORIES = ['All','Strength','Weight Loss','Yoga','Cardio','Nutrition'];

function TrainerCard({ trainer, onBook }) {
  const available = trainer.status === 'Available';
  return (
    <div style={{ background:C.bgSecondary, border:`0.5px solid ${C.border}`, borderRadius:14,
      padding:14, display:'flex', alignItems:'center', gap:12 }}>
      <Avatar initials={trainer.initials} size={48} />
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ color:C.textPrimary, fontWeight:500, fontSize:14 }}>{trainer.name}</div>
        <div style={{ color:C.textMuted, fontSize:12, marginTop:2 }}>{trainer.role}</div>
        <div style={{ marginTop:5 }}><StatusPill status={trainer.status} /></div>
      </div>
      <button onClick={()=>available&&onBook(trainer)} style={{
        background:available?C.gold:'#1e1e1e', color:available?C.bgPrimary:C.textMuted,
        fontSize:11, fontWeight:600, padding:'7px 13px', borderRadius:8, border:'none',
        cursor:available?'pointer':'not-allowed', fontFamily:T.body, flexShrink:0 }}>
        {available?'Book':'Busy'}
      </button>
    </div>
  );
}

function BookingModal({ trainer, onClose }) {
  const [date,setDate] = useState('');
  const [time,setTime] = useState('');
  const [booked,setBooked] = useState(false);
  const inp = { width:'100%', background:'#0f0f0f', border:`0.5px solid ${C.borderMid}`,
    color:C.textPrimary, padding:'10px 12px', borderRadius:8, fontSize:13, fontFamily:T.body, colorScheme:'dark' };
  return (
    <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.8)', zIndex:100, display:'flex', alignItems:'flex-end' }}>
      <div style={{ width:'100%', background:'#111', borderRadius:'16px 16px 0 0', padding:'20px 20px 40px' }}>
        {booked ? (
          <div style={{ textAlign:'center', padding:'20px 0' }}>
            <div style={{ fontSize:40, marginBottom:12 }}>✅</div>
            <div style={{ color:C.textPrimary, fontSize:16, fontWeight:600 }}>Booking Confirmed!</div>
            <div style={{ color:C.textMuted, fontSize:13, marginTop:6 }}>Session with {trainer.name} on {date} at {time}</div>
            <button onClick={onClose} style={{ marginTop:20, background:C.gold, color:C.bgPrimary, border:'none',
              padding:'10px 28px', borderRadius:8, fontWeight:600, cursor:'pointer', fontFamily:T.body }}>Done</button>
          </div>
        ) : (
          <>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
              <div>
                <div style={{ color:C.textPrimary, fontWeight:600, fontSize:15 }}>Book a Session</div>
                <div style={{ color:C.textMuted, fontSize:12 }}>with {trainer.name}</div>
              </div>
              <button onClick={onClose} style={{ background:'none', border:'none', color:C.textMuted, fontSize:18, cursor:'pointer' }}>✕</button>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              <div>
                <div style={{ color:C.textMuted, fontSize:12, marginBottom:6 }}>Select Date</div>
                <input type="date" value={date} onChange={e=>setDate(e.target.value)} style={inp} />
              </div>
              <div>
                <div style={{ color:C.textMuted, fontSize:12, marginBottom:6 }}>Select Time</div>
                <input type="time" value={time} onChange={e=>setTime(e.target.value)} style={inp} />
              </div>
            </div>
            <GoldButton onClick={()=>{if(date&&time)setBooked(true);}} style={{ width:'100%', padding:'12px', marginTop:16, fontSize:14, borderRadius:10 }}>
              Confirm Booking
            </GoldButton>
          </>
        )}
      </div>
    </div>
  );
}

export default function TrainersTab() {
  const [filter,setFilter] = useState('All');
  const [selected,setSelected] = useState(null);
  const filtered = filter==='All' ? TRAINERS_DATA : TRAINERS_DATA.filter(t=>t.role.toLowerCase().includes(filter.toLowerCase()));
  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', position:'relative' }}>
      <div style={{ padding:'14px 20px 0', flexShrink:0 }}>
        <div style={{ color:C.textPrimary, fontSize:18, fontWeight:600 }}>Our Trainers</div>
        <div style={{ color:C.textMuted, fontSize:12, marginTop:2 }}>Book a session with a certified coach</div>
      </div>
      <div style={{ display:'flex', gap:8, padding:'10px 20px 0', overflowX:'auto', flexShrink:0 }}>
        {CATEGORIES.map(cat=>(
          <button key={cat} onClick={()=>setFilter(cat)} style={{ flexShrink:0, padding:'5px 14px', borderRadius:999,
            fontSize:12, fontWeight:500, cursor:'pointer', border:`0.5px solid ${filter===cat?C.gold:C.borderMid}`,
            background:filter===cat?C.gold:C.bgSecondary, color:filter===cat?C.bgPrimary:C.textMuted,
            fontFamily:T.body, whiteSpace:'nowrap', transition:'all 0.15s' }}>{cat}</button>
        ))}
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:'14px 20px 0' }}>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {filtered.map(t=><TrainerCard key={t.id} trainer={t} onBook={setSelected} />)}
        </div>
        <div style={{ height:20 }} />
      </div>
      {selected && <BookingModal trainer={selected} onClose={()=>setSelected(null)} />}
    </div>
  );
}