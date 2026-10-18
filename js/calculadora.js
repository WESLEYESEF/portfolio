(function () {
  var DIARIA = 150, HORA = 15;
  var diasEl = document.getElementById('calcDias');
  var horasEl = document.getElementById('calcHoras');
  var totalEl = document.getElementById('calcTotal');
  var breakdownEl = document.getElementById('calcBreakdown');

  function fmt(v) {
    return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function calc() {
    var dias = parseInt(diasEl.value) || 0;
    var horas = parseInt(horasEl.value) || 0;
    var subDiaria = dias * DIARIA;
    var subHoras = horas * HORA;
    var total = subDiaria + subHoras;
    totalEl.textContent = fmt(total);
    breakdownEl.innerHTML = '<span>' + fmt(subDiaria) + '</span> (diárias) + <span>' + fmt(subHoras) + '</span> (horas)';
  }

  diasEl.addEventListener('input', calc);
  horasEl.addEventListener('input', calc);
  calc();
})();
