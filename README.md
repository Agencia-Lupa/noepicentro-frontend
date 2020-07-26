# Front end

Esse repositório contém o JavaScript que alimenta o [aplicativo](https://noepicentro.com/), além do conteúdo (em HTML) e do estilo visual (em CSS).

Foram utilizados HTML, CSS e JavaScript puros.<br>Contudo, algumas bibliotecas externas foram utilizadas:

| Bibliotecas JavaScript|Objetivo|
|:-|:-|
|[Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/)|Apresentar e interagir com o mapa|
|[Turf](https://turfjs.org/)|Calcular raios em km, obter _bounding boxes_ e criar máscaras a partir do polígono de um município ou de um círculo|
|[Swiper](https://swiperjs.com/)|Navegar entre as etapas da narrativa e ativar transições no mapa|
|[html2canvas](http://html2canvas.hertzen.com/)|Gerar uma imagem `jpeg` personalizada para _download_ |
|[Prefix Free](https://leaverou.github.io/prefixfree/)|Tornar o CSS compatível com todos os navegadores|



Na prática, toda a interação com o site é orquestrada pelo `script/app.js`.<br>Todos os métodos e são propriedades de um único objeto global `app`.

Para ver o resultado de todo esse código, acesse
[noepicentro.com](https://noepicentro.com/).
