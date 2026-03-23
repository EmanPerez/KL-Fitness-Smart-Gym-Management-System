import { useState } from 'react';
import { C, T, TRAINERS_DATA } from '../../../theme';
import { Avatar, StatusPill, GoldButton, OutlineButton, PanelCard, FormInput, FormSelect } from '../../shared';

const ROLES=['Strength Training Coach','Weight Loss Coach','Fitness & Cardio Coach','Yoga Instructor','Nutrition & Lifestyle','Powerlifting Coach','Crossfit Coach'];
const STATUS_OPTIONS=['Available','On Session','Day Off'];

function AddTrainerForm({ onAdd }) {
  const [form,setForm]=useState({ name:'', role:ROLES[0], email:'', status:'Available' });
  const [err,setErr]=useState('');
  const up=(k,v)=>setForm(f=>({...f,[k]:v}));
  function submit() {
    if(!form.name.trim()||!form.email.trim()) { setErr('Name and email are required.'); return; }
    const initials=form.name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2);
    onAdd({...form,id:Date.now(),initials,clients:0});
    setForm({name:'',role:ROLES[0],email:'',status:'Available'});
    setErr('');
  }
  return (
    <PanelCard title="Add New Trainer">
      {err && <div style={{ background:C.redBg, border:`0.5px solid ${C.redBorder}`, borderRadius:6,
        padding:'8px 12px', marginBottom:12, color:C.red, fontSize:12 }}>{err}</div>}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr auto', gap:10, alignItems:'flex-end' }}>
        <div>
          <div style={{ color:C.textMuted, fontSize:11, marginBottom:5 }}>Full Name *</div>
          <FormInput placeholder="Full Name" value={form.name} onChange={e=>up('name',e.target.value)} style={{ width:'100%' }} />
        </div>
        <div>
          <div style={{ color:C.textMuted, fontSize:11, marginBottom:5 }}>Specialization</div>
          <FormSelect value={form.role} onChange={e=>up('role',e.target.value)} style={{ width:'100%' }}>
            {ROLES.map(r=><option key={r}>{r}</option>)}
          </FormSelect>
        </div>
        <div>
          <div style={{ color:C.textMuted, fontSize:11, marginBottom:5 }}>Email *</div>
          <FormInput type="email" placeholder="trainer@ironpeak.com" value={form.email} onChange={e=>up('email',e.target.value)} style={{ width:'100%' }} />
        </div>
        <GoldButton onClick={submit} style={{ alignSelf:'flex-end', padding:'9px 18px' }}>Add Trainer</GoldButton>
      </div>
    </PanelCard>
  );
}

function TrainerRow({ trainer, onEdit, onDelete }) {
  const [editing,setEditing]=useState(false);
  const [form,setForm]=useState({...trainer});
  function save() { onEdit({...trainer,...form}); setEditing(false); }
  if(editing) return (
    <tr><td colSpan={5} style={{ padding:'10px 8px' }}>
      <div style={{ display:'flex', gap:10, alignItems:'center', background:'#0f0f0f', borderRadius:8, padding:'10px 12px' }}>
        <FormInput value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} style={{ flex:2 }} />
        <FormSelect value={form.role} onChange={e=>setForm(f=>({...f,role:e.target.value}))} style={{ flex:3 }}>
          {ROLES.map(r=><option key={r}>{r}</option>)}
        </FormSelect>
        <FormSelect value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))} style={{ flex:2 }}>
          {STATUS_OPTIONS.map(s=><option key={s}>{s}</option>)}
        </FormSelect>
        <GoldButton small onClick={save}>Save</GoldButton>
        <OutlineButton onClick={()=>setEditing(false)}>Cancel</OutlineButton>
      </div>
    </td></tr>
  );
  return (
    <tr>
      <td style={{ padding:'10px 8px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <Avatar initials={trainer.initials} size={34} />
          <div style={{ color:C.textPrimary, fontWeight:500, fontSize:13 }}>{trainer.name}</div>
        </div>
      </td>
      <td style={{ padding:'10px 8px', fontSize:12, color:C.textSecondary }}>{trainer.role}</td>
      <td style={{ padding:'10px 8px', fontSize:12, color:C.textMuted }}>{trainer.email||'—'}</td>
      <td style={{ padding:'10px 8px', fontSize:12, color:C.textMuted }}>{trainer.clients} clients</td>
      <td style={{ padding:'10px 8px' }}><StatusPill status={trainer.status} /></td>
      <td style={{ padding:'10px 8px' }}>
        <div style={{ display:'flex', gap:6 }}>
          <OutlineButton onClick={()=>setEditing(true)}>Edit</OutlineButton>
          <OutlineButton danger onClick={()=>onDelete(trainer.id)}>Remove</OutlineButton>
        </div>
      </td>
    </tr>
  );
}

export default function TrainersPanel() {
  const [trainers,setTrainers]=useState(TRAINERS_DATA);
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,minmax(0,1fr))', gap:12 }}>
        {[
          { label:'Total Trainers',  value:trainers.length, accent:C.gold  },
          { label:'Available Now',   value:trainers.filter(t=>t.status==='Available').length, accent:C.green },
          { label:'On Session',      value:trainers.filter(t=>t.status==='On Session').length, accent:C.gold  },
          { label:'Total Clients',   value:trainers.reduce((s,t)=>s+t.clients,0), accent:C.blue  },
        ].map((s,i)=>(
          <div key={i} style={{ background:C.bgSecondary, border:`0.5px solid ${C.border}`, borderRadius:10, padding:'14px 16px' }}>
            <div style={{ color:C.textMuted, fontSize:11, marginBottom:6 }}>{s.label}</div>
            <div style={{ color:s.accent, fontSize:26, fontWeight:600 }}>{s.value}</div>
          </div>
        ))}
      </div>
      <AddTrainerForm onAdd={t=>setTrainers(p=>[...p,t])} />
      <PanelCard title="Trainer Roster" badge={`${trainers.length} coaches`}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead><tr>{['Trainer','Specialization','Email','Clients','Status','Actions'].map((h,i)=>(
            <th key={i} style={{ color:C.textMuted, fontSize:11, textTransform:'uppercase', letterSpacing:'0.5px',
              fontWeight:500, padding:'6px 8px', textAlign:'left', borderBottom:`0.5px solid ${C.border}` }}>{h}</th>
          ))}</tr></thead>
          <tbody>
            {trainers.map(t=>(
              <TrainerRow key={t.id} trainer={t}
                onEdit={u=>setTrainers(p=>p.map(x=>x.id===u.id?u:x))}
                onDelete={id=>{if(window.confirm('Remove this trainer?'))setTrainers(p=>p.filter(x=>x.id!==id));}} />
            ))}
          </tbody>
        </table>
      </PanelCard>
    </div>
  );
}