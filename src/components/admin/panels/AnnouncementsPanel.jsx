import { useState } from 'react';
import { C, T, ANNOUNCEMENTS_DATA } from '../../../theme';
import { GoldButton, OutlineButton, PanelCard, FormInput, FormSelect } from '../../shared';

const ANN_TYPES=['Promo','Class','Event','General','New Trainer'];
const TYPE_META={
  Promo:       {bg:'#1a1a00',color:'#F0C040',icon:'🏷️'},
  Class:       {bg:'#0f1a2a',color:'#4a9af0',icon:'🏋️'},
  Event:       {bg:'#1a0f2a',color:'#aa4af0',icon:'📅'},
  General:     {bg:'#1a1a1a',color:'#888',   icon:'📢'},
  'New Trainer':{bg:'#0f1f0f',color:'#5aaa5a',icon:'👤'},
};

function AnnouncementForm({ initial, onSave, onCancel }) {
  const [form,setForm]=useState(initial||{title:'',body:'',type:'General',startDate:'',endDate:''});
  const [error,setError]=useState('');
  const up=(k,v)=>setForm(f=>({...f,[k]:v}));
  function submit() {
    if(!form.title.trim()||!form.body.trim()){setError('Title and body are required.');return;}
    // TODO: initial ? await updateDoc(doc(db,'announcements',initial.id),form) : await addDoc(collection(db,'announcements'),{...form,createdAt:serverTimestamp()});
    onSave({...form,id:initial?.id||Date.now(),date:'Just now'}); setError('');
  }
  const dateStyle={width:'100%',background:'#0f0f0f',border:`0.5px solid #2a2a2a`,color:'#fff',padding:'9px 12px',borderRadius:8,fontSize:13,fontFamily:T.body,colorScheme:'dark'};
  return (
    <PanelCard title={initial?'Edit Announcement':'Create Announcement'}>
      {error&&<div style={{ background:'#1f0f0f',border:'0.5px solid #5a2a2a',borderRadius:6,padding:'8px 12px',marginBottom:12,color:'#aa5a5a',fontSize:12 }}>{error}</div>}
      <div style={{ display:'flex',gap:10,marginBottom:12 }}>
        <div style={{ flex:3 }}>
          <div style={{ color:'#555',fontSize:11,marginBottom:5 }}>Title *</div>
          <FormInput placeholder="Announcement title" value={form.title} onChange={e=>up('title',e.target.value)} style={{ width:'100%' }} />
        </div>
        <div style={{ flex:1 }}>
          <div style={{ color:'#555',fontSize:11,marginBottom:5 }}>Type</div>
          <FormSelect value={form.type} onChange={e=>up('type',e.target.value)} style={{ width:'100%' }}>
            {ANN_TYPES.map(t=><option key={t}>{t}</option>)}
          </FormSelect>
        </div>
      </div>
      <div style={{ marginBottom:12 }}>
        <div style={{ color:'#555',fontSize:11,marginBottom:5 }}>Message Body *</div>
        <textarea value={form.body} onChange={e=>up('body',e.target.value)} rows={3}
          placeholder="Write the announcement message here..."
          style={{ width:'100%',background:'#0f0f0f',border:`0.5px solid #2a2a2a`,color:'#fff',
            padding:'10px 12px',borderRadius:8,fontSize:13,fontFamily:T.body,resize:'vertical' }} />
      </div>
      <div style={{ display:'flex',gap:10,alignItems:'flex-end' }}>
        <div style={{ flex:1 }}>
          <div style={{ color:'#555',fontSize:11,marginBottom:5 }}>Valid From</div>
          <input type="date" value={form.startDate} onChange={e=>up('startDate',e.target.value)} style={dateStyle} />
        </div>
        <div style={{ flex:1 }}>
          <div style={{ color:'#555',fontSize:11,marginBottom:5 }}>Valid Until</div>
          <input type="date" value={form.endDate} onChange={e=>up('endDate',e.target.value)} style={dateStyle} />
        </div>
        <div style={{ display:'flex',gap:8 }}>
          {onCancel&&<OutlineButton onClick={onCancel}>Cancel</OutlineButton>}
          <GoldButton onClick={submit}>{initial?'Save Changes':'Post Announcement'}</GoldButton>
        </div>
      </div>
    </PanelCard>
  );
}

function AnnouncementCard({ ann, onEdit, onDelete }) {
  const meta=TYPE_META[ann.type]||TYPE_META['General'];
  return (
    <div style={{ background:'#0f0f0f',border:`0.5px solid ${C.border}`,borderRadius:10,padding:14,display:'flex',gap:12,alignItems:'flex-start' }}>
      <div style={{ width:38,height:38,background:meta.bg,border:'0.5px solid rgba(255,255,255,0.06)',borderRadius:8,
        display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,flexShrink:0 }}>{meta.icon}</div>
      <div style={{ flex:1,minWidth:0 }}>
        <div style={{ display:'flex',alignItems:'center',gap:8,marginBottom:4 }}>
          <span style={{ color:'#fff',fontWeight:500,fontSize:14 }}>{ann.title}</span>
          <span style={{ fontSize:10,fontWeight:600,padding:'2px 8px',borderRadius:999,background:meta.bg,color:meta.color }}>{ann.type}</span>
        </div>
        <div style={{ color:'#555',fontSize:12,lineHeight:1.6,marginBottom:6 }}>{ann.body}</div>
        <div style={{ color:'#333',fontSize:11 }}>{ann.date}</div>
      </div>
      <div style={{ display:'flex',gap:6,flexShrink:0 }}>
        <OutlineButton onClick={()=>onEdit(ann)}>Edit</OutlineButton>
        <OutlineButton danger onClick={()=>onDelete(ann.id)}>Delete</OutlineButton>
      </div>
    </div>
  );
}

export default function AnnouncementsPanel() {
  // TODO: Replace with Firebase announcements collection
  const [announcements,setAnnouncements]=useState(ANNOUNCEMENTS_DATA);
  const [editing,setEditing]=useState(null);
  function handleSave(ann) {
    if(editing){setAnnouncements(p=>p.map(a=>a.id===ann.id?ann:a));setEditing(null);}
    else setAnnouncements(p=>[ann,...p]);
  }
  function handleDelete(id) {
    if(!window.confirm('Delete this announcement?'))return;
    // TODO: await deleteDoc(doc(db,'announcements',id));
    setAnnouncements(p=>p.filter(a=>a.id!==id));
  }
  const stats=[
    {label:'Total Posts', value:announcements.length,                                  accent:'#F0C040'},
    {label:'Promos',      value:announcements.filter(a=>a.type==='Promo').length,       accent:'#F0C040'},
    {label:'Classes',     value:announcements.filter(a=>a.type==='Class').length,       accent:'#4a9af0'},
    {label:'Events',      value:announcements.filter(a=>a.type==='Event').length,       accent:'#aa4af0'},
  ];
  return (
    <div style={{ display:'flex',flexDirection:'column',gap:16 }}>
      <div style={{ display:'grid',gridTemplateColumns:'repeat(4,minmax(0,1fr))',gap:12 }}>
        {stats.map((s,i)=>(
          <div key={i} style={{ background:C.bgSecondary,border:`0.5px solid ${C.border}`,borderRadius:10,padding:'14px 16px' }}>
            <div style={{ color:'#555',fontSize:11,marginBottom:6 }}>{s.label}</div>
            <div style={{ color:s.accent,fontSize:26,fontWeight:600 }}>{s.value}</div>
          </div>
        ))}
      </div>
      {editing ? <AnnouncementForm initial={editing} onSave={handleSave} onCancel={()=>setEditing(null)} />
               : <AnnouncementForm onSave={handleSave} />}
      <div>
        <div style={{ color:'#555',fontSize:12,textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:12 }}>
          Posted Announcements ({announcements.length})
        </div>
        <div style={{ display:'flex',flexDirection:'column',gap:10 }}>
          {announcements.map(a=><AnnouncementCard key={a.id} ann={a} onEdit={setEditing} onDelete={handleDelete} />)}
          {announcements.length===0&&<div style={{ color:'#555',textAlign:'center',padding:'40px 0',fontSize:13 }}>No announcements yet.</div>}
        </div>
      </div>
    </div>
  );
}