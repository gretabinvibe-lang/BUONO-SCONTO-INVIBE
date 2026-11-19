// Lista province (demo — poi togliamo quelle dei PR)
const province = ["Agrigento","Alessandria","Ancona","Bari","Bergamo","Bologna","Brescia","Cagliari","Catania","Como","Cosenza","Cuneo","Firenze","Foggia","Genova","Lecce","Milano","Modena","Napoli","Padova","Palermo","Parma","Perugia","Pisa","Roma","Salerno","Torino","Treviso","Udine","Varese","Venezia","Verona","Vicenza"];

// Scuole — ABBOZZO. In produzione verranno prese dal gestionale (Supabase),
// in base alla provincia selezionata.
const scuoleDemo = ["Liceo Scientifico","Liceo Classico","Liceo Linguistico","Istituto Tecnico","Istituto Professionale","Altro / non in elenco"];

const selProv = document.getElementById('provincia');
province.forEach(p=>{const o=document.createElement('option');o.value=p;o.textContent=p;selProv.appendChild(o);});

const selScuola = document.getElementById('scuola');
scuoleDemo.forEach(s=>{const o=document.createElement('option');o.value=s;o.textContent=s;selScuola.appendChild(o);});

function toStep2(){
  const nome=document.getElementById('nome').value.trim();
  const tel=document.getElementById('tel').value.trim();
  if(!nome||!tel){alert('Inserisci nome e numero di telefono');return;}
  // >>> QUI in produzione: invio nome+telefono a Supabase / n8n (lead salvato) <<<
  window.__lead={nome,tel};
  show('p2',2);
}
// URL della pagina di atterraggio su invibe.it (cambia qui se serve)
const LANDING_URL='https://invibe.it/test-buono-sconto-dinamico-2027/';

function toResult(){
  const prov=document.getElementById('provincia').value;
  const scuola=document.getElementById('scuola').value;
  if(!prov||!scuola){alert('Seleziona provincia e scuola');return;}

  // >>> ID FINTO per test. In produzione l'ID progressivo arriva da Supabase <<<
  const idFinto=Math.floor(100+Math.random()*900); // 100-999
  const scuolaPulita=scuola.toUpperCase().replace(/[^A-Z0-9]/g,'');
  const code=idFinto+'-'+scuolaPulita;

  // mostra il codice sul coupon
  document.getElementById('codice').textContent=code;

  // collega il bottone finale all'atterraggio, passando il codice nell'URL
  document.getElementById('btnValida').href=LANDING_URL+'?codice='+encodeURIComponent(code);

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
