const toggle=document.querySelector('.nav-toggle');
const links=document.querySelector('.nav-links');
if(toggle&&links){toggle.addEventListener('click',()=>{const open=links.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});}

document.querySelectorAll('[data-zip-form]').forEach(form=>{
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const input=form.querySelector('input');
    const status=form.querySelector('.status');
    const zip=(input?.value||'').trim();
    const core=['48150','48152','48154','48170','48187','48188','48167','48168','48374','48375','48377','48331','48334','48335','48336','48239','48135','48127','48075','48076'];
    if(!/^\d{5}$/.test(zip)){status.textContent='Enter a 5-digit ZIP code.';status.style.color='#b83d3d';return;}
    if(core.includes(zip)){status.textContent='Yes — this demo ZIP is inside Northstar’s core service area.';status.style.color='#356554';}
    else {status.textContent='This ZIP would receive an availability check in a real client implementation.';status.style.color='#647985';}
  });
});

document.querySelectorAll('[data-demo-form]').forEach(form=>{
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const output=form.querySelector('[data-form-status]');
    if(output){output.hidden=false;output.textContent='Demo request captured. In a real client build, this form would send to the client’s approved inbox or booking system.';}
    form.querySelector('button[type="submit"]')?.focus();
  });
});
