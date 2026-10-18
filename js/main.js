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


  // Formação Acadêmica
  var formacaoGrid = document.getElementById('formacaoGrid');
  if (formacaoGrid && d.formacao) {
    d.formacao.forEach(function (f) {
      var card = document.createElement('article');
      card.className = 'formacao-item';

      var header = document.createElement('div');
      header.className = 'formacao__header';
      var icon = document.createElement('span');
      icon.className = 'formacao__icon'; icon.textContent = f.icone || '🎓';
      var title = document.createElement('h3');
      title.className = 'formacao__title'; title.textContent = f.titulo;
      header.appendChild(icon); header.appendChild(title);

      var grau = document.createElement('div');
      grau.className = 'formacao__grau'; grau.textContent = f.grau || '';

      var inst = document.createElement('div');
      inst.className = 'formacao__inst'; inst.textContent = f.instituicao || '';

      var periodo = document.createElement('div');
      periodo.className = 'formacao__periodo'; periodo.textContent = f.periodo || '';

      card.appendChild(header);
      if (f.grau) card.appendChild(grau);
      if (f.instituicao) card.appendChild(inst);
      if (f.periodo) card.appendChild(periodo);

      if (f.diploma) {
        var a = document.createElement('a');
        a.className = 'formacao__diploma'; a.href = f.diploma; a.target = '_blank'; a.rel = 'noopener';
        a.textContent = 'Ver diploma digital ↗';
        card.appendChild(a);
      }

      formacaoGrid.appendChild(card);
    });
  }

  // Cursos
  var cursosGrid = document.getElementById('cursosGrid');
  if (cursosGrid && d.cursos) {
    d.cursos.forEach(function (c) {
      var card = document.createElement('article');
      card.className = 'curso';

      var header = document.createElement('div');
      header.className = 'curso__header';
      var icon = document.createElement('span');
      icon.className = 'curso__icon'; icon.textContent = c.icone || '📜';
      var title = document.createElement('h3');
      title.className = 'curso__title'; title.textContent = c.titulo;
      header.appendChild(icon); header.appendChild(title);

      var meta = document.createElement('div');
      meta.className = 'curso__meta';
      if (c.instituicao) {
        var inst = document.createElement('span');
        inst.textContent = c.instituicao;
        meta.appendChild(inst);
      }
      if (c.cargaHoraria) {
        var ch = document.createElement('span');
        ch.className = 'curso__ch'; ch.textContent = c.cargaHoraria;
        meta.appendChild(ch);
      }
      if (c.ano) {
        var ano = document.createElement('span');
        ano.className = 'curso__ano'; ano.textContent = c.ano;
        meta.appendChild(ano);
      }

      card.appendChild(header); card.appendChild(meta);

      if (c.certificado) {
        var a = document.createElement('a');
        a.className = 'curso__cert'; a.href = c.certificado; a.target = '_blank'; a.rel = 'noopener';
        a.textContent = 'Ver certificado ↗';
        card.appendChild(a);
      }

      cursosGrid.appendChild(card);
    });
  }

  // Contato
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
