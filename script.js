const toggle=document.querySelector('.nav-toggle');
const links=document.querySelector('.nav-links');
function closeNav(){if(!toggle||!links)return;links.classList.remove('open');toggle.setAttribute('aria-expanded','false');}
if(toggle&&links){
  toggle.addEventListener('click',()=>{const open=links.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
  links.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeNav));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeNav();});
  document.addEventListener('click',e=>{if(links.classList.contains('open')&&!links.contains(e.target)&&!toggle.contains(e.target))closeNav();});
}

const coreZips=new Set([
  '48150','48152','48154','48170','48187','48188','48167','48168',
  '48374','48375','48377','48331','48334','48335','48336',
  '48239','48240','48135','48125','48127','48033','48034','48075','48076',
  '48185','48186'
]);
const extendedZips=new Set([
  '48120','48124','48126','48128','48067','48073','48072','48009',
  '48083','48084','48085','48098','48382','48390'
]);

document.querySelectorAll('[data-zip-form]').forEach(form=>{
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const input=form.querySelector('input');
    const status=form.querySelector('.status');
    const zip=(input?.value||'').trim();
    if(!status)return;
    if(!/^\d{5}$/.test(zip)){status.textContent='Enter a 5-digit ZIP code.';status.style.color='#b83d3d';return;}
    if(coreZips.has(zip)){status.textContent='Yes — this ZIP is in Northstar’s sample core service area.';status.style.color='#356554';return;}
    if(extendedZips.has(zip)){status.textContent='This ZIP is in Northstar’s sample extended area. Availability would be confirmed when you request service.';status.style.color='#356554';return;}
    status.textContent='This ZIP is outside the sample coverage list. Contact Northstar to check availability.';
    status.style.color='#647985';
  });
});

const params=new URLSearchParams(window.location.search);
const service=params.get('service');
const issue=params.get('issue');
const serviceForm=document.querySelector('[data-demo-form]');
if(serviceForm){
  const select=serviceForm.querySelector('#need');
  const details=serviceForm.querySelector('#details');
  const prefill=serviceForm.querySelector('[data-prefill-note]');
  const date=serviceForm.querySelector('#when');
  if(date){const today=new Date();const local=new Date(today.getTime()-today.getTimezoneOffset()*60000).toISOString().slice(0,10);date.min=local;}
  if(service&&select&&[...select.options].some(o=>o.value===service)){select.value=service;if(prefill)prefill.hidden=false;}
  if(issue&&details&&!details.value){details.value=issue;if(prefill)prefill.hidden=false;}
  serviceForm.addEventListener('submit',e=>{
    e.preventDefault();
    if(!serviceForm.reportValidity())return;
    const output=serviceForm.querySelector('[data-form-status]');
    const chosen=select?.options[select.selectedIndex]?.text||'service';
    if(output){
      output.hidden=false;
      output.textContent=`Demo request ready for ${chosen}. In a real client deployment, this would now be sent to the approved inbox, booking platform or CRM.`;
      output.focus();
    }
  });
}

document.querySelectorAll('[data-repair-quiz]').forEach(form=>{
  const result=form.querySelector('[data-quiz-result]');
  const title=form.querySelector('[data-quiz-title]');
  const copy=form.querySelector('[data-quiz-copy]');
  const cta=form.querySelector('[data-quiz-cta]');
  form.addEventListener('submit',e=>{
    e.preventDefault();
    if(!form.reportValidity())return;
    const score=[...new FormData(form).values()].reduce((sum,v)=>sum+(Number(v)||0),0);
    let heading,body,href,label;
    if(score<=4){
      heading='Repair may still make sense.';
      body='Your answers suggest the system may still have useful life left, especially if the problem is isolated and the repair is reasonable. A system evaluation can confirm the condition.';
      href='request-service.html?service=other&issue=Repair-or-replace%20system%20evaluation#service-form';
      label='Request a System Evaluation →';
    }else if(score<=8){
      heading='Compare repair and replacement side by side.';
      body='You have a mix of factors. Ask for both the repair path and replacement path so you can compare cost, comfort, remaining equipment life and long-term value.';
      href='request-service.html?service=replacement&issue=Repair-or-replace%20comparison#service-form';
      label='Compare My Options →';
    }else{
      heading='A replacement consultation may be worth considering.';
      body='Age, repair frequency, cost or comfort concerns are stacking up. That does not automatically mean replacement, but it is reasonable to price the replacement option before spending more on the current system.';
      href='request-service.html?service=replacement&issue=Replacement%20estimate%20after%20repair-or-replace%20quiz#service-form';
      label='Get a Replacement Estimate →';
    }
    if(title)title.textContent=heading;
    if(copy)copy.textContent=body;
    if(cta){cta.href=href;cta.textContent=label;}
    if(result){result.hidden=false;result.focus();result.scrollIntoView({behavior:'smooth',block:'nearest'});}
  });
  form.addEventListener('reset',()=>{if(result)result.hidden=true;});
});
