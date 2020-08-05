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

Na prática, toda a interação com o site é orquestrada pelo `script/app.js`. Todos os métodos são propriedades de um único objeto global `app`.

A técnica narrativa utilizada no aplicativo é o "stepper". Assim, a narrativa é composta de passos, ou etapas, e o usuário interage com a visualização avançando ou recuando por essas etapas. As diversas ações que compõem essa interação estão encapsuladas em funções / métodos, que são convenientemente chamadas a cada etapa, conforme a necessidade narrativa. Assim, as complexidades da implementação de cada interação, cálculo ou efeito visual são abstraídas da estrutura do programa responsável por controlar a narrativa (`app.story.show.steps`).

A tabela abaixo demonstra as principais etapas da experiência, e como essas etapas foram implementadas, em linhas gerais, com o Mapbox GL JS e o turf.js.

É importante destacar que o mapa faz uso de duas camadas carregadas previamente no Mapbox, uma chamada "municipalities", com os contornos dos municípios brasileiros, e outra "people", que representa, por pontos, cada habitante do Brasil em cada setor censitário do censo de 2010. Além disso, o cálculo do raio que envolve uma determinada quantidade de pessoas ao redor do ponto central do usuário é feito remotamente em um servidor executando o código que se encontra no repositório [back](https://github.com/noepicentro/back), acessível por meio de uma API. Os métodos `map.algumaCoisa()` são métodos do Mapbox GL JS, os `turf.algumaCoisa()`, do turf.js.

| Passo | Implementação |
| ----- | ------------- |
| 1. Determina as coordenadas geográficas do endereço do usuário | [Mapbox Geocoding API](https://docs.mapbox.com/api/search/#geocoding) |
| 2. "Voa" até as coordenadas do usuário | [`map.flyTo()`](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#flyto), do Mapbox GL JS |
| 3. Simula a primeira morte com um ponto próximo ao usuário | i. A partir da localização do usuário, procura _features_ desabitados no mapa, usando `map.queryRenderedFeatures()` em camadas como `water`, `landuse` e `national-park`. Esses features são unidos em um único objeto usando `turf.union()`. <br> ii. Um círculo com raio pequeno é calculado a partir da localização do usuário, usando `turf.circle()`. A área habitável dentro desses círculos é obtida com `turf.difference()` entre o objeto do círculo e o objeto das _features_ a serem evitadas. <br> iii. Pontos aleatórios dentro da _bounding box_ do círculo (obtida com `turf.bbox()`) são gerados, e obtém-se o subconjunto desses pontos que estão efetivamente dentro da área habitável com `turf.pointsWithinPolygon()`. Repete-se o processo com raios incrementalmente maiores até obterem-se 47 pontos. <br> iv. Cria-se uma fonte de dados e uma camada de círculos no mapa com o primeiro dos 47 pontos obtidos, com `map.addSource()` e `map.addLayer()`. |
| 4. Simula as próximas 46 mortes com pontos próximos ao usuário | Cria-se mais uma fonte de dados e uma camada de círculos no mapa com os 46 pontos restantes, mais uma vez com `map.addSource()` e `map.addLayer()`.
| 5. Destaca todos os pontos dentro do círculo | O backend devolve as coordenadas do centro e de um ponto no círculo que envolve uma população equivalente ao número atualizado de mortos. Calcula-se então a distância entre esses pontos com `turf.distance()`, e um polígono em forma de círculo com `turf.circle()`. Com esse polígono:  <br> i. Ajusta-se o mapa para que o círculo fique totalmente visível na tela, com `map.fitBounds()`. <br> ii. Calcula-se um polígono de máscara, com `turf.mask()`, para cobrir todo o mapa, com exceção do círculo. Adiciona-se esse polígono ao mapa, com `map.addSource()` e `map.addLayer()`, do tipo `fill`, esmaecendo dessa forma os pontos fora do círculo.|
| 6. Mostra o raio das mortes | Com o polígono do círculo calculado na etapa anterior, adiciona-se o círculo propriamente dito ao mapa, criando uma camada do tipo `fill` com `map.addSource()` e `map.addLayer()`. |
| 7. Mostra cidade próxima que desapareceria | A cidade próxima que será destacada é calculada pelo backend, que retorna o _bounding box_ da cidade. Com esse _bounding box_ usa-se `map.fitBounds()` para voar até a cidade e enquadrar os limites da cidade inteiramente na tela. O polígono da cidade é então buscado da camada de contornos dos municípios, previamente carregada no Mapbox (na forma de um tileset), e chamada no aplicativo com `map.addSource()`. Com esse polígono: <br> i. Desenha-se a área do município no mapa, usando `map.addLayer()`. As propriedades visuais dessa área são modificadas com `map.setPaintProperty()`. <br> ii. Calcula-se uma nova máscara, com `turf.mask()`, para destacar o município e atenuar o restante do mapa. |
| 8. Mostra raio ao redor de atração turística de uma capital próxima | Semelhante aos itens 5 e 6. |
| 9. Mostra gráfico que representa o números de mortes nos municípios em que de fato elas ocorreram | Os dados das mortes por municípios (e as coordenadas de seus respectivos centroides) são carregados, esses dados são utilizados como fonte (`map.addSource()`) para se criar uma camada com `map.addLayer()` do tipo `circle`. Os raios dos círculos são determinados usando a funcionalidade de [expressões do Mapbox](https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/).
| 10. Retorna para a localização do usuário, exibe a opção de compartilhar | Obtém-se a versão estática do mapa por meio da [API de imagens estáticas do Mapbox](https://docs.mapbox.com/api/maps/#static-images). Converte-se a imagem para base64, e utiliza-se a biblioteca `html2canvas` para gerar a imagem do poster estilizado.

Para ver o resultado de todo esse código, acesse
[noepicentro.com](https://noepicentro.com/).
