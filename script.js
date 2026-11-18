// Lista province (demo — poi togliamo quelle dei PR)
const province = ["Agrigento","Alessandria","Ancona","Bari","Bergamo","Bologna","Brescia","Cagliari","Catania","Como","Cosenza","Cuneo","Firenze","Foggia","Genova","Lecce","Milano","Modena","Napoli","Padova","Palermo","Parma","Perugia","Pisa","Roma","Salerno","Torino","Treviso","Udine","Varese","Venezia","Verona","Vicenza"];
const sel = document.getElementById('provincia');
province.forEach(p=>{const o=document.createElement('option');o.value=p;o.textContent=p;sel.appendChild(o);});

function toStep2(){
  const nome=document.getElementById('nome').value.trim();
  const tel=document.getElementById('tel').value.trim();
  if(!nome||!tel){alert('Inserisci nome e numero di telefono');return;}
  // >>> QUI in produzione: invio nome+telefono a Supabase / n8n (lead salvato) <<<
  window.__lead={nome,tel};
  show('p2',2);
}
function toResult(){
  const prov=document.getElementById('provincia').value;
  const scuola=document.getElementById('scuola').value.trim();
  if(!prov||!scuola){alert('Seleziona provincia e scrivi la scuola');return;}
  // >>> QUI in produzione: il codice arriva dalla tabella buoni su Supabase <<<
  const nome=(window.__lead&&window.__lead.nome)||'VIBE';
  const code='BUONO'+nome.toUpperCase().replace(/[^A-Z]/g,'')+Math.floor(1+Math.random()*9);
  document.getElementById('codice').textContent=code;
  show('p3',3);
  confetti();
}
function show(id,n){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  for(let i=1;i<=3;i++)document.getElementById('d'+i).classList.toggle('on',i<=n);
  window.scrollTo(0,0);
}
function confetti(){
  const cols=['#29ABE2','#F7941E','#7ad0f0','#ffd27a','#ffffff'];
  for(let i=0;i<36;i++){
    const c=document.createElement('div');c.className='confetti';
    c.style.left=Math.random()*100+'vw';
    c.style.background=cols[Math.floor(Math.random()*cols.length)];
    c.style.animationDuration=(2.5+Math.random()*2.5)+'s';
    c.style.animationDelay=(Math.random()*.6)+'s';
    document.body.appendChild(c);
    setTimeout(()=>c.remove(),5200);
  }
}
