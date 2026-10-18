// ============================================================
//  BUSCADOR DE FILMES — API TMDB
//  Coloque sua chave gratuita abaixo (https://www.themoviedb.org)
// ============================================================
var API_KEY = "SUA_CHAVE_AQUI";
var BASE_URL = "https://api.themoviedb.org/3";
var IMG_URL = "https://image.tmdb.org/t/p/w500";

var form = document.getElementById('buscaForm');
var campo = document.getElementById('campoBusca');
var statusEl = document.getElementById('status');
var grid = document.getElementById('resultados');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  var termo = campo.value.trim();
  if (!termo) return;
  buscar(termo);
});

function buscar(termo) {
  statusEl.textContent = "Buscando...";
  grid.innerHTML = "";

  var url = BASE_URL + "/search/movie?api_key=" + API_KEY + "&language=pt-BR&query=" + encodeURIComponent(termo);

  fetch(url)
    .then(function (r) { return r.json(); })
    .then(function (dados) {
      if (!dados.results || dados.results.length === 0) {
        statusEl.textContent = "Nenhum filme encontrado para \"" + termo + "\".";
        return;
      }
      statusEl.textContent = dados.results.length + " resultado(s) encontrado(s).";
      renderizar(dados.results);
    })
    .catch(function (erro) {
      statusEl.textContent = "Erro ao buscar. Verifique sua chave da API.";
      console.error(erro);
    });
}

function renderizar(filmes) {
  filmes.forEach(function (f) {
    var card = document.createElement('article');
    card.className = 'card';

    if (f.poster_path) {
      var img = document.createElement('img');
      img.src = IMG_URL + f.poster_path;
      img.alt = f.title;
      img.loading = 'lazy';
      card.appendChild(img);
    } else {
      var semPoster = document.createElement('div');
      semPoster.className = 'sem-poster';
      semPoster.textContent = '🎬';
      card.appendChild(semPoster);
    }

    var info = document.createElement('div');
    info.className = 'info';

    var titulo = document.createElement('div');
    titulo.className = 'titulo';
    titulo.textContent = f.title;

    var meta = document.createElement('div');
    meta.className = 'meta';

    var ano = document.createElement('span');
    ano.textContent = f.release_date ? f.release_date.slice(0, 4) : "—";

    var nota = document.createElement('span');
    nota.className = 'nota';
    nota.textContent = "★ " + (f.vote_average ? f.vote_average.toFixed(1) : "—");

    meta.appendChild(ano);
    meta.appendChild(nota);

    info.appendChild(titulo);
    info.appendChild(meta);
    card.appendChild(info);

    card.addEventListener('click', function () {
      window.open("https://www.themoviedb.org/movie/" + f.id, "_blank");
    });

    grid.appendChild(card);
  });
}
