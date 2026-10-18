(function () {
  const d = PORTFOLIO;

  // Nav logo
  const logo = document.getElementById('navLogo');
  const firstName = d.nome.trim().split(/\s+/)[0].toLowerCase();
  logo.innerHTML = firstName + '<span class="accent">.dev</span>';

  // Hero
  document.getElementById('heroName').textContent = d.nome;
  document.getElementById('heroRole').textContent = d.role;
  document.getElementById('heroDesc').textContent = d.descricao;

  const heroLinks = document.getElementById('heroLinks');
  d.links.forEach(l => {
    const a = document.createElement('a');
    a.href = l.url; a.target = '_blank'; a.rel = 'noopener';
    a.textContent = l.label;
    heroLinks.appendChild(a);
  });

  // Sobre
  const sobre = document.getElementById('sobreText');
  d.sobre.forEach(p => {
    const el = document.createElement('p');
    el.textContent = p;
    sobre.appendChild(el);
  });

  // Habilidades
  const skills = document.getElementById('skillsGrid');
  d.habilidades.forEach(h => {
    const el = document.createElement('div');
    el.className = 'skill';
    el.textContent = h;
    skills.appendChild(el);
  });

  // Projetos
  const projects = document.getElementById('projectsGrid');
  d.projetos.forEach(p => {
    const card = document.createElement('article');
    card.className = 'project';

    const header = document.createElement('div');
    header.className = 'project__header';
    const icon = document.createElement('span');
    icon.className = 'project__icon'; icon.textContent = p.icone;
    const title = document.createElement('h3');
    title.className = 'project__title'; title.textContent = p.titulo;
    header.appendChild(icon); header.appendChild(title);

    const desc = document.createElement('p');
    desc.className = 'project__desc'; desc.textContent = p.descricao;

    const tags = document.createElement('div');
    tags.className = 'project__tags';
    p.tags.forEach(t => {
      const s = document.createElement('span');
      s.className = 'tag'; s.textContent = t;
      tags.appendChild(s);
    });

    const links = document.createElement('div');
    links.className = 'project__links';
    if (p.repo) {
      const a = document.createElement('a');
      a.href = p.repo; a.target = '_blank'; a.rel = 'noopener'; a.textContent = 'Código';
      links.appendChild(a);
    }
    if (p.demo) {
      const a = document.createElement('a');
      a.href = p.demo; a.target = '_blank'; a.rel = 'noopener'; a.textContent = 'Demo';
      links.appendChild(a);
    }

    card.appendChild(header); card.appendChild(desc);
    card.appendChild(tags);
    if (links.children.length) card.appendChild(links);
    projects.appendChild(card);
  });

  // Contato
  document.getElementById('contatoLead').textContent = d.contatoLead;
  const contatoLinks = document.getElementById('contatoLinks');
  d.links.forEach(l => {
    const a = document.createElement('a');
    a.href = l.url; a.target = '_blank'; a.rel = 'noopener';
    a.textContent = (l.icon ? l.icon + ' ' : '') + l.label;
    contatoLinks.appendChild(a);
  });

  // Footer
  const year = new Date().getFullYear();
  document.getElementById('footerText').innerHTML =
    '© ' + year + ' <span class="code">' + d.nome + '</span> — Feito com ❤️';

  // Nav toggle (mobile)
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
})();
