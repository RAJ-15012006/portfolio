// small interactive behaviors: typing, skill animation, smooth scroll, contact handling, theme toggle

document.addEventListener('DOMContentLoaded', () => {
  // Year
  document.getElementById('year')?.textContent = new Date().getFullYear();

  // Typing effect
  const roles = ['Data Scientist', 'ML Engineer', 'Data Analyst'];
  let roleI = 0, charI = 0, deleting = false;
  const typingEl = document.getElementById('typing');
  function tick(){
    const current = roles[roleI];
    if(!deleting){
      typingEl.textContent = current.slice(0, ++charI);
      if(charI === current.length){ deleting = true; setTimeout(tick, 900); return; }
    } else {
      typingEl.textContent = current.slice(0, --charI);
      if(charI === 0){ deleting = false; roleI = (roleI+1) % roles.length; }
    }
    setTimeout(tick, deleting ? 40 : 120);
  }
  if(typingEl) tick();

  // Smooth scroll for nav & CTAs
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const href = a.getAttribute('href');
      if(href && href.startsWith('#')){
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // Skill bars animate when visible
  const skillFills = document.querySelectorAll('.progress-fill');
  if('IntersectionObserver' in window){
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const el = entry.target;
          const p = el.getAttribute('data-percent') || '0';
          el.style.width = p + '%';   // triggers gradient line growth
          obs.unobserve(el);
        }
      });
    },{threshold:0.4});
    skillFills.forEach(f=> obs.observe(f));
  } else {
    // fallback
    skillFills.forEach(f => f.style.width = f.getAttribute('data-percent') + '%');
  }

  // Contact form
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', e=>{
      e.preventDefault();
      const form = e.target;
      const name = encodeURIComponent(form.name?.value || '');
      const email = encodeURIComponent(form.email?.value || '');
      const message = encodeURIComponent(form.message?.value || '');
      const subject = encodeURIComponent('Portfolio message from ' + (name || email));
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:rajkumar20053773@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  // Theme toggle
  const themeBtn = document.getElementById('themeToggle');
  themeBtn?.addEventListener('click', () => {
    document.documentElement.classList.toggle('light-mode');
    const icon = themeBtn.querySelector('i');
    if(document.documentElement.classList.contains('light-mode')) icon.className = 'fas fa-sun';
    else icon.className = 'fas fa-moon';
  });

  // Lazy-load images
  document.querySelectorAll('img').forEach(img=>{
    if(!img.complete){ img.loading = 'lazy'; }
  });
});

// Reveal sections on scroll
const sections = document.querySelectorAll('.section');
window.addEventListener('scroll', () => {
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      sec.classList.add('show');
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const fills = document.querySelectorAll(".progress-fill");
  fills.forEach(fill => {
    const percent = fill.getAttribute("data-percent");
    fill.style.width = percent + "%";
  });
});
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".progress-fill").forEach(bar => {
    const percent = bar.getAttribute("data-percent");
    bar.style.width = percent + "%";
  });
});
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".progress-fill").forEach(bar => {
    const percent = bar.getAttribute("data-percent");
    bar.style.width = percent + "%";
  });
});
// Toggle Certificate Viewer
const showCertBtn = document.getElementById('showCertificateBtn');
const certViewer = document.getElementById('certificateViewer');
if(showCertBtn && certViewer){
  showCertBtn.addEventListener('click', () => {
    if(certViewer.style.display === 'none'){
      certViewer.style.display = 'block';
      showCertBtn.textContent = 'Hide Certificate';
      certViewer.scrollIntoView({ behavior: 'smooth' });
    } else {
      certViewer.style.display = 'none';
      showCertBtn.textContent = 'View Certificate';
    }
  });
}
