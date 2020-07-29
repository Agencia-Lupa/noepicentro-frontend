<? $version = '?v=1.0.2'; ?>
<!DOCTYPE html>
<html lang="en" translate="no">
  <head>

    <title>What if all the Covid&#8209;19 deaths in Brazil happened in your neighborhood? | Agência Lupa</title>

    <meta charset="UTF-8">

    <meta name="viewport"                     content="width=device-width, initial-scale=1">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="mobile-web-app-capable"       content="yes">

    <meta property="og:title"                 content="What if all the Covid&#8209;19 deaths in Brazil happened in your neighborhood? | Agência Lupa">
    <meta property="og:description"           content="Find out what would happen to your neighborhood if the epicenter of the Covid-19 epidemic in Brazil was your home.">
    <meta property="og:image"                 content="https://piaui.folha.uol.com.br/lupa/epicentro/1200x1200.png">

    <link rel="icon"                          href="https://piaui.folha.uol.com.br/lupa/epicentro/favicon-32x32.png"    type="image/png" sizes="32x32">
    <link rel="icon"                          href="https://piaui.folha.uol.com.br/lupa/epicentro/favicon-16x16.png"    type="image/png" sizes="16x16">
    <link rel="apple-touch-icon"              href="https://piaui.folha.uol.com.br/lupa/epicentro/apple-touch-icon.png" type="image/png" sizes="180x180">
    <link rel="manifest"                      href="https://piaui.folha.uol.com.br/lupa/epicentro/site.webmanifest">
    <link rel="canonical"                     href="https://piaui.folha.uol.com.br/lupa/epicentro/">

    <link rel="stylesheet" href="https://unpkg.com/normalize.css@8/normalize.css">
    <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v1.11.0/mapbox-gl.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Material+Icons&display=swap">
    <link rel="stylesheet" href="https://unpkg.com/swiper@6/swiper-bundle.min.css">
    <link rel="stylesheet" href="style/app.css<?= $version ?>">

    <link rel="alternate" hreflang="en" href="https://piaui.folha.uol.com.br/lupa/epicentro/en/">
    <link rel="alternate" hreflang="pt" href="https://piaui.folha.uol.com.br/lupa/epicentro/">

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-172954415-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-172954415-1');
    </script>

  </head>
  <body>

    <div

      class="app"

      data-page="(main|story|poster)"
      data-geolocation="(true|false)"
      data-search="(blur|focus|suggestions|done)"
      data-would-vanish="(name)"
      data-step="(name)"
      data-step-index="(int)"
      data-loaded="false"
      data-poster="(true|false)"

    >

      <div class="cover">

        <figure>
          <img src="media/cover/cover-1-b.png" alt="">
        </figure>

      </div>

      <div class="main">

        <article>

          <header class="above-the-fold">

            <div class="brands-wrapper">
              <div class="brands">
                <a href="https://lupa.news/" target="_blank"><img src="media/brand/lupa.png" alt="Logotipo da Agência Lupa"></a>
                <a href="https://newsinitiative.withgoogle.com/" target="_blank"><div class="pipe"></div><img src="media/brand/google.svg" alt="Logotipo da Google News Initiative"></a>
              </div>
            </div>

            <div class="intro">
              <h1>
                <span class="kicker">At The Epicenter<span class="screen-reader">: </span></span>
                <span>What if all the Covid&#8209;19 deaths in Brazil happened in your neighborhood?</span>
              </h1>

              <p class="lead">Find out what would happen to your neighborhood if the epicenter of the Covid&#8209;19 epidemic in Brazil was your home.</p>

              <p class="dates">
                <small class="notes">
                  Published on <time datetime="2020-07-06">July 24, 2020</time>.<br>
                  Data updated on <em data-var="Update">..</em>.</time>
                </small>
              </p>

            </div>

          </header>

          <p>Up until yesterday, <em data-var="Death count">thousands of</em> people had died due to Covid&#8209;19 in Brazil.</p>
          <p>These deaths are spread over more than half of Brazilian cities, in all of the 27 states in the country.</p>
          <p>What if they had happened near you?</p>
          <p>Since the major Covid&#8209;19 outbreaks happened in a few metropolitan areas, many Brazilians don't see the effects of the disease in their daily lives.</p>
          <p>In order to make the dimension of our losses easier to understand, this simulation shows what would happen if all the confirmed Covid&#8209;19 deaths in the country happened around your address.</p>
          <p>After you start this experience, you will see a circle drawn around your location: in such a scenario, everyone who lives in that area would have died.</p>
          <p>How far would this emptiness go?</p>

          <footer>
            <p><small class="notes">Data protection: Lupa and Google do not store the addresses you provide. Lupa recommends caution when sharing personal data.</small></p>
            <p><small class="notes">You can know more by reading our <a href="privacy" target="_blank" rel="nofollow">Privacy Policy</a>.</small>
          </footer>

          <section>

            <header>
              <h2>How does the simulation work?</h2>
            </header>

            <p>The death radius displayed around you depends on your location and the number of people who live near you.</p>
            <p>In order to determine the size of the radius, we use data from the Brazilian census tracts. The tracts are small territorial blocks which were drawn by IBGE — the Brazilian Institute of Geography and Statistics.</p>
            <p>Some tracts are buildings in a city. Others, blocks or neighborhoods. We know exactly how many people lived in each of these areas in 2010, when the last census was done.</p>
            <p>The simulation sums the population of all the tracts around around you until it reaches a total that is close to the total Covid&#8209;19 deaths in the country.</p>
            <p>For this calculation, we use the death count as reported by <a href="https://brasil.io/dataset/covid19/caso_full/" target="_blank">Brasil.io</a>, a group of volunteers that has been gathering data from epidemiological reports since the beginning of the pandemic.</p>
            <p>The full <a href="https://github.com/noepicentro/back" target="_blank"> methodology</a> involves drawing increasing radiuses, calculating intersections and making statistical estimates.</p>
            <p>The source code is available in <a href="https://github.com/noepicentro/" target="_blank"> GitHub</a>, along with a more detailed description of all the math behind this piece.</p>

          </section>

          <section>

            <header>
              <h2>Team</h2>
            </header>

            <p>This project was made in partnership by Agência Lupa and Google News Initiative. All the professionals involved worked remotely.</p>

            <p><a href="https://medium.com/@rodrigomenegat/4ce949a9183b" target="_blank">Making of →</a></p>

            <dl>
              <div>
                <dt>Art direction</dt>
                <dd><a href="https://twitter.com/albertocairo" target="_blank">Alberto Cairo</a></dd>
              </div>
              <div>
                <dt>Data and storytelling</dt>
                <dd><a href="https://meneg.at/" target="_blank">Rodrigo Menegat</a></dd>
              </div>
              <div>
                <dt>Design and development</dt>
                <dd><a href="https://vsueiro.com/" target="_blank">Vinicius Sueiro</a></dd>
              </div>
              <div>
                <dt>Development</dt>
                <dd><a href="https://twitter.com/tiagombp" target="_blank">Tiago Maranhão</a></dd>
              </div>
              <div>
                <dt>Distribution strategy</dt>
                <dd><a href="https://piaui.folha.uol.com.br/lupa/colaborador/gilberto-scofield/" target="_blank">Gilberto Scofield Jr.</a></dd>
              </div>
              <div>
              <dt>Editing</dt>
                <dd><a href="https://piaui.folha.uol.com.br/lupa/colaborador/natalia-leal/" target="_blank">Natália Leal</a></dd>
              </div>
              <div>
                <dt>Google News Initiative</dt>
                <dd><a href="https://twitter.com/smfrogers" target="_blank">Simon Rogers</a>, <a href="https://twitter.com/mtrpires" target="_blank">Marco Túlio Pires</a></dd>
              </div>
            </dl>

          </section>

        </article>

        <nav>
          <span class="button">English <span class="screen-reader"> version</span></span>
          <a class="button" rel="alternate" href="./" hreflang="pt" lang="pt"><span class="screen-reader">Versão em </span>Português</a>
        </nav>

        <footer>
          <p><small><a href="privacy" target="_blank" rel="nofollow">Privacy Policy</a></small></p>
        </footer>

        <div class="background"></div>

      </div>

      <div class="search">

        <form autocomplete="off" spellcheck="false">

          <fieldset>

            <legend class="screen-reader">Try the simulation in your neighborhood:</legend>

            <div class="input">

              <label>

                <span class="screen-reader">Where do you live?</span>
                <input type="search" placeholder="Enter your address" name="address" autocorrect="off">

                <div>

                  <div class="line"></div>

                  <div class="icon">
                    <span class="material-icons" aria-hidden="true">search</span>
                  </div>

                  <button type="reset" class="button">
                    <span class="material-icons" aria-hidden="true">close</span>
                    <span class="screen-reader">Erase</span>
                  </button>

                </div>

              </label>

            </div>

            <div class="suggestions">
              <ol></ol>
            </div>

            <div class="geolocation">

              <button type="button" class="button" data-trigger="app.search.geolocation.get()">
                <span class="material-icons" aria-hidden="true">gps_fixed</span>
                <span>Use my location</span>
              </button>

            </div>

          </fieldset>

        </form>

      </div>

      <div class="story">

        <article>

          <div class="canvas">

            <div id="map"></div>

            <aside class="hints">

              <header class="screen-reader">
                <h2>How to read the map</h2>
              </header>

              <div class="hint">
                <img src="media/hints/hint-gray.svg">
                <p><small>Each point is a person that lives here</small></p>
              </div>

              <div class="hint">
                <img src="media/hints/hint-white.svg">
                <p><small>White points represent deaths by Covid&#8209;19</small></p>
              </div>

              <div class="hint">
                <img src="media/hints/hint-circle.svg">
                <p><small>Around <em data-var="Death count rounded"></em> people live inside the circle</small></p>
              </div>

              <div class="hint">
                <img src="media/hints/hint-bubble.svg">
                <p><small>The bigger the bubble, the higher is the death count in a city</small></p>
              </div>

            </aside>

          </div>

          <nav>

            <button type="button" class="button close" data-trigger="app.pages.open('main')">
              <span class="material-icons" aria-hidden="true">close</span>
              <span class="screen-reader">End simulation</span>
            </button>

            <button type="button" class="button share" data-trigger="app.pages.open('poster')">
              <!-- <span class="material-icons" aria-hidden="true">save_alt</span> -->
              <span>Share my map</span>
            </button>

            <span class="button filler"></span>

          </nav>

          <header>
            <h1 class="screen-reader">Simulation</h1>
          </header>

          <div class="steps-container">

            <div class="controls">

              <label>
                <input type="checkbox" name="labels" class="screen-reader" checked>
                <div>
                  <div class="switch"></div>
                  <span class="outline">Show street names</span>
                </div>
              </label>

            </div>

            <div class="steps">

              <div class="swiper-container">

                <div class="swiper-wrapper">

                  <div data-step="You are here" class="swiper-slide">
                    <p>
                      This is <strong> your neighborhood </strong> on March 16. On this day, Brazil confirmed its first death due to the novel coronavirus.
                    </p>
                  </div>

                  <div data-step="First death" class="swiper-slide">
                    <p>
                      The victim was Manoel Messias Freitas Filho, 62, who lived in the city of São Paulo. In the map, however, <strong>we pretend</strong> that <strong>one of your neighbors</strong> died instead.
                    </p>
                  </div>

                  <div data-step="Following deaths" class="swiper-slide">
                    <p>
                      A week later, on March 24, another 46 people had died due to Covid&#8209;19 in Brazil. Again, <strong>let's pretend</strong> that they lived <strong>in your neighborhood</strong>.
                    </p>
                  </div>

                  <div data-step="All deaths" class="swiper-slide">
                    <p>
                      Today,
                      <em data-var="Time since first death"></em>
                      after the first death was confirmed, the death toll reaches <strong><em data-var="Death count">61.314</em></strong> in the whole country.
                    </p>
                  </div>

                  <div data-step="All deaths with outline" class="swiper-slide">
                    <p>
                      Let's imagine that they all lived around you: <strong>everyone in this circle would have died</strong>. It has a radius of <strong><in data-var="User radius"></em></strong>, centered in your location.
                    </p>
                  </div>

                  <div data-step="City that would have vanished" class="swiper-slide">
                    <p data-would-vanish="false">
                      If all the <strong><em data-var="Death count">61.314</em> deaths</strong> had happened in <strong><em data-var="Vanished city"></em></strong>, a city near you, it would be enough to erase it from the map. No one would be left alive.
                    </p>
                    <p data-would-vanish="true">
                      If all the <strong><em data-var="Death count">61.314</em> deaths</strong> had happened in your city, it would have been erased from the map. No one would be left alive.
                    </p>
                  </div>

                  <div data-step="City vanished" class="swiper-slide">
                    <p data-would-vanish="false">
                      According to 2019 estimates, around
                      <em data-var="Vanished city population"></em>
                      people live there. That is
                      <em data-var="Vanished city population difference"></em>
                      <strong>less than the total confirmed deaths</strong> in the country.
                    </p>
                    <p data-would-vanish="true">
                      According to 2019 estimates, around
                      <em data-var="Vanished city population"></em>
                      people live there. That is
                      <em data-var="Vanished city population difference"></em>
                      <strong>less than the total confirmed deaths</strong> in the country.
                    </p>
                  </div>

                  <div data-step="Featured city 1" class="swiper-slide">
                    <p>
                      Now let's see how big would the death radius be in a large city not far from where you are: <strong><em data-var="Featured city 1"></em></strong>.
                    </p>
                  </div>

                  <div data-step="Featured city 1 location" class="swiper-slide">
                    <p>
                      Here you can see how the <strong>area near <em data-var="Featured city 1 location"></em></strong>, <em data-var="Featured city 1 location description"></em>, would be if all the deaths were scattered around it. Everyone in a radius of <strong><em data-var="Featured city 1 radius"></em></strong> would be dead.
                    </p>
                  </div>

                  <div data-step="Real distribution" class="swiper-slide">
                    <p>In real life, however, the Covid&#8209;19 deaths aren't clustered in a single place. Now, the map shows were the <strong><em data-var="Death count">61.314</em> Brazilians that died</strong> due to the disease actually lived.</p>
                  </div>

                  <div data-step="Share me" class="swiper-slide">
                    <p>Since these people weren't near you, it may be that you <strong>don't get to see</strong> the scale of those losses in your daily life. Nevertheless, even if unnoticed, <strong>they all existed</strong>.</p>
                  </div>

                </div>

                <div class="swiper-pagination"></div>

              </div>

              <div class="arrows">
                <button type="button" class="prev">
                  <span class="material-icons" aria-hidden="true">chevron_left</span>
                  <span class="screen-reader">Go one step back</span>
                </button>
                <button type="button" class="next">
                  <span class="material-icons" aria-hidden="true">chevron_right</span>
                  <span class="material-icons" aria-hidden="true">camera_alt</span>
                  <div class="spinner"></div>
                  <div class="pulse"></div>
                  <span class="screen-reader">Go one step forward</span>
                </button>
              </div>

            </div>

          </div>

        </article>

      </div>

      <div class="poster">

        <div class="atelie" aria-hidden="true">
          <div class="poster-html">

            <div class="poster-location">
              <h1>
                <em data-var="User city"></em>
                <span>noepicentro.com</span>
              </h1>
            </div>

            <figure class="poster-figure">
              <img class="poster-map" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">
              <figcaption>
                <p>
                  <img src="media/poster/radius.svg">
                  <em data-var="User radius"></em>
                </p>
                <p>
                  <em data-var="Update short"></em>
                </p>
              </figcaption>
              <div class="marker"></div>
            </figure>

            <div class="poster-content">
              <p>If all the <strong><em data-var="Death count">thousands of</em></strong> <strong>Covid&#8209;19 deaths</strong> had happened around me, no one in this radius would be left alive.</p>
              <div class="brands">
                <a><img src="media/brand/lupa.png"></a>
                <a><div class="pipe"></div><img src="media/brand/google.svg"></a>
                <img src="media/brand/mapbox.svg">
              </div>
            </div>

          </div>
        </div>

        <article>

          <div class="header-container">

            <nav>

              <button type="button" class="button close" data-trigger="app.pages.open('story')">
                <span class="material-icons" aria-hidden="true">undo</span>
                <span class="screen-reader">Go back to the story</span>
              </button>

            </nav>

            <header>
              <h1 class="kicker">Share my map</h1>
            </header>

            <span class="button filler"></span>

          </div>

          <div class="scroll">

            <figure>
              <div class="poster-canvas">
                <img class="poster-preview" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">
              </div>
            </figure>

            <div>

              <a id="download" class="button" download="no-epicentro.jpeg">
                <span class="material-icons" aria-hidden="true">save_alt</span>
                <span>Save image</span>
              </a>

              <p>This image shows how far would your neighborhood vanish if all the <em data-var="Death count"></em> in Brazil had happened around you.</p>

              <small class="notes">The results displayed in the map are an approximation.</small>
              </p>

            </div>

          </div>

        </article>

      </div>


    </div>

    <script src="https://api.mapbox.com/mapbox-gl-js/v1.11.0/mapbox-gl.js"></script>
    <script src="https://unpkg.com/swiper@6/swiper-bundle.min.js"></script>

    <script src="script/turf.min.js"></script>
    <!-- turf modules is breaking on “turf.point()” -->
    <script src="script/app.js<?= $version ?>"></script>

    <script src="https://unpkg.com/prefixfree/prefixfree.min.js" async></script>
    <script src="script/html2canvas.min.js" async></script>

  </body>
</html>
