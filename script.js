var pagina = 1; // número da página a ser carregada
var carregando = false; // indica se uma requisição Ajax está em andamento

// função para carregar mais imagens
function carregarImagens() {
  if (carregando) {
    return;
  }
  carregando = true;
  var url = "imagens.json";
  var ajax = new XMLHttpRequest();
  ajax.open("GET", url, true);
  showLoadingIcon();
  ajax.onreadystatechange = function () {
    if (ajax.readyState == 4 && ajax.status == 200) {
      var divImagens = document.getElementById("images");
      var imagens = JSON.parse(ajax.responseText);
      imagens = shuffle(imagens); // embaralha as imagens
      imagens.forEach(function (imagem) {
        var img = document.createElement("img");
        img.src = imagem.url;
        divImagens.appendChild(img);
      });
      carregando = false;
      pagina++;
    }
  };
  ajax.send();
}

// detecta quando o usuário chegou no final da página e carrega mais imagens
window.onscroll = function (ev) {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight &&
    !carregando
  ) {
    carregarImagens();
  }
};

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function showLoadingIcon() {
  const loadingIcon = document.createElement("div");
  loadingIcon.classList.add("loading-icon");

  const spinner = document.createElement("div");
  spinner.classList.add("spinner");

  loadingIcon.appendChild(spinner);
  document.body.appendChild(loadingIcon);

  setTimeout(function () {
    loadingIcon.remove();
  }, 1000);
}

// carrega as primeiras imagens ao carregar a página
carregarImagens();
