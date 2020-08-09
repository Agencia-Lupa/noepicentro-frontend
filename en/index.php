<!DOCTYPE html>
<html lang="en" path="../" translate="no" data-mockup="false">
  <head>

    <title>What if all Covid&#8209;19 deaths in Brazil happened in your neighborhood? | Agência Lupa</title>

    <meta charset="UTF-8">

    <meta name="viewport"                     content="width=device-width, initial-scale=1">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="mobile-web-app-capable"       content="yes">

    <meta property="og:title"                 content="What if all Covid&#8209;19 deaths in Brazil happened in your neighborhood? | Agência Lupa">
    <meta property="og:description"           content="Find out what would happen to your neighborhood if the epicenter of the Covid&#8209;19 epidemic in Brazil was your home.">
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
    <link rel="stylesheet" href="../style/app.css?v=1.2.4">

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
      data-search="(blur|focus|done)"
      data-suggestions="(true|null|false)"
      data-would-vanish="(name)"
      data-step="(name)"
      data-step-index="(int)"
      data-loaded="false"
      data-poster="(true|false)"

    >

      <div class="cover" aria-hidden="true">

        <figure>
          <img src="../media/cover/cover-1-b.png" alt="Just as an example, this map shows a metropolitan region with thousands of scattered dots (each dot represents a person who lives there).">
        </figure>

      </div>

      <div class="main">

        <article>

          <header class="above-the-fold">

            <div class="brands-wrapper">
              <div class="brands">
                <a href="https://lupa.news/" target="_blank"><img src="../media/brand/lupa.png" alt="Logotipo da Agência Lupa"></a>
                <a href="https://newsinitiative.withgoogle.com/" target="_blank"><div class="pipe"></div><img src="../media/brand/google.svg" alt="Logotipo da Google News Initiative"></a>
              </div>
            </div>

            <div class="intro">
              <h1>
                <span class="kicker">At The Epicenter<span class="screen-reader">: </span></span>
                <span>What if all Covid&#8209;19 deaths in Brazil happened in your neighborhood?</span>
              </h1>

              <p class="lead">Find out what would happen if your address was the epicenter of the Covid&#8209;19 pandemic in Brazil.</p>

              <p class="dates">
                <small class="notes">
                  Published on <time datetime="2020-07-06">July 24, 2020</time>.<br>
                  Data updated on <em data-var="Update">..</em>.</time>
                </small>
              </p>

            </div>

          </header>

          <p>Up until yesterday, <em data-var="Death count">thousands of</em> people had died due to Covid&#8209;19 in Brazil.</p>
          <p>But it can be difficult to visualize what this means in a country so large. These deaths are spread over all 27 Brazilian states. More than half of all Brazilian cities have been affected.</p>
          <p>What if they had happened near you?</p>
          <p>Since the major Covid&#8209;19 outbreaks happened in a few metropolitan areas, many Brazilians don’t see the effects of the disease in their daily lives.</p>
          <p>In order to make the dimension of our losses easier to understand, this simulation shows what would happen if all confirmed Covid&#8209;19 deaths in the country happened around your address.</p>
          <p>After you start this experience, you will see a circle drawn around your location: in such a scenario, everyone who lives in that area would have died.</p>
          <p>How far would this emptiness go?</p>

          <footer>
            <p><small class="notes">Data protection: Lupa does not store the addresses you provide and recommends caution when sharing personal data.</small></p>
            <p><small class="notes">You can know more by reading our <a href="../privacy.php" target="_blank" rel="nofollow">Privacy Policy</a>.</small>
          </footer>

          <section>

            <header>
              <h2>How does the simulation work?</h2>
            </header>

            <p>The death radius displayed around you depends on your location and on the number of people who live near you.</p>
            <p>In order to determine the size of the radius, we use data from the Brazilian census tracts. The tracts are small territorial blocks which were drawn by IBGE – the Brazilian Institute of Geography and Statistics.</p>
            <p>Some tracts are buildings in a city. Others, blocks or neighborhoods. We know exactly how many people lived in each of these areas in 2010, when the last census was done.</p>
            <p>The simulation sums the population of all the tracts around you until it reaches a total that is close to the total Covid&#8209;19 deaths in the country.</p>
            <p>For this calculation, we use the death count as reported by <a href="https://brasil.io/dataset/covid19/caso_full/" target="_blank">Brasil.io</a>, a group of volunteers that has been gathering data from epidemiological reports since the beginning of the pandemic.</p>
            <p>The full <a href="https://github.com/noepicentro/back" target="_blank"> methodology</a> involves drawing increasing radiuses, calculating intersections and making statistical estimates.</p>
            <p>The source code is available on <a href="https://github.com/noepicentro/" target="_blank"> GitHub</a>, along with a more detailed description of all the math behind this piece.</p>

            <a href="#form" class="screen-reader">Skip to to the the address search field</a>

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
          <a class="button" rel="alternate" href="../" hreflang="pt" lang="pt"><span class="screen-reader">Versão em </span>Português</a>
        </nav>

        <footer>
          <p><small><a href="../privacy.php" target="_blank" rel="nofollow">Privacy Policy</a></small></p>
        </footer>

        <div class="background"></div>

      </div>

      <div class="search">

        <form id="form" autocomplete="off" spellcheck="false" tabindex="0">

          <fieldset>

            <legend class="screen-reader">Try the simulation in your neighborhood:</legend>

            <div class="input">

              <label>

                <span class="screen-reader">Search for your address and then pick one of the suggestions that will appear below</span>
                <input type="search" placeholder="Enter your address in Brazil" name="address" autocorrect="off">

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

      <div id="story" class="story" tabindex="0">

        <article>

          <div class="canvas" aria-hidden="true">

            <div id="map"></div>

            <aside class="hints">

              <header class="screen-reader">
                <h2>How to read the map</h2>
              </header>

              <div class="hint">
                <img src="../media/hints/hint-gray.svg">
                <p><small>Each dot is a person that lives here</small></p>
              </div>

              <div class="hint">
                <img src="../media/hints/hint-white.svg">
                <p><small>White dots represent deaths by Covid&#8209;19</small></p>
              </div>

              <div class="hint">
                <img src="../media/hints/hint-circle.svg">
                <p><small>Around <em data-var="Death count rounded"></em> people live inside the circle</small></p>
              </div>

              <div class="hint">
                <img src="../media/hints/hint-bubble.svg">
                <p><small>The bigger the bubble, the higher is the death count in a city</small></p>
              </div>

            </aside>

          </div>

          <nav>

            <button type="button" class="button close" data-trigger="app.pages.open('main')">
              <span class="material-icons" aria-hidden="true">close</span>
              <span class="screen-reader">Exit simulation</span>
            </button>

            <button type="button" class="button share" data-trigger="app.pages.open('poster')">
              <!-- <span class="material-icons" aria-hidden="true">save_alt</span> -->
              <span>Share my map</span>
            </button>

            <span class="button filler" aria-hidden="true"></span>

          </nav>

          <header>
            <h1 class="screen-reader">Simulation</h1>
          </header>

          <div class="steps-container">

            <div class="controls" aria-hidden="true">

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
                      This is <strong>your neighborhood</strong> on March 16. On this day, Brazil confirmed its first death due to the novel coronavirus.
                    </p>
                  </div>

                  <div data-step="First death" class="swiper-slide">
                    <p>
                      The victim was Manoel Messias Freitas Filho, 62, who lived in the city of São Paulo. On the map, however, <strong>we simulate</strong> that one of <strong>your neighbors</strong> died instead.
                    </p>
                  </div>

                  <div data-step="Following deaths" class="swiper-slide">
                    <p>
                      A week later, on March 24, another 46 people had died due to Covid&#8209;19 in Brazil. Again, <strong>let’s pretend</strong> they lived in <strong>your neighborhood</strong>.
                    </p>
                  </div>

                  <div data-step="All deaths" class="swiper-slide">
                    <p>
                      Today,
                      <em data-var="Time since first death"></em>
                      after the first death was confirmed, the death toll reached <strong><em data-var="Death count"></em></strong> in the whole country.
                    </p>
                  </div>

                  <div data-step="All deaths with outline" class="swiper-slide">
                    <p>
                      Let’s imagine that they all lived around you: <strong>everyone in this circle would have died</strong>. It has a radius of <strong><in data-var="User radius"></em></strong>, centered on your location.
                    </p>
                  </div>

                  <div data-step="City that would have vanished" class="swiper-slide">
                    <p data-would-vanish="false">
                      If all <strong><em data-var="Death count"></em> deaths</strong> had happened in <strong><em data-var="Vanished city"></em></strong>, a city near you, it would be enough to erase it from the map. No one would be left alive.
                    </p>
                    <p data-would-vanish="true">
                      If all <strong><em data-var="Death count"></em> deaths</strong> had happened in your city, it would have been erased from the map. No one would be left alive.
                    </p>
                  </div>

                  <div data-step="City vanished" class="swiper-slide">
                    <p data-would-vanish="false">
                      According to 2019 estimates, around
                      <em data-var="Vanished city population"></em>
                      people live in <em data-var="Vanished city"></em>. That is
                      <em data-var="Vanished city population difference"></em>
                      <strong>less than the total confirmed deaths</strong> in the country.
                    </p>
                    <p data-would-vanish="true">
                      According to 2019 estimates, around
                      <em data-var="Vanished city population"></em>
                      people live in <em data-var="User city"></em>. That is
                      <em data-var="Vanished city population difference"></em>
                      <strong>less than the total confirmed deaths</strong> in the country.
                    </p>
                  </div>

                  <div data-step="Featured city 1" class="swiper-slide">
                    <p>
                      Now let’s see how big the death radius would be in a large city, not far from where you are: <strong><em data-var="Featured city 1"></em></strong>.
                    </p>
                  </div>

                  <div data-step="Featured city 1 location" class="swiper-slide">
                    <p>
                      If all <em data-var="Death count"></em> deaths had happened around
                      <strong><em data-var="Featured city 1 location"></em></strong>,
                      <em data-var="Featured city 1 location description"></em>,
                      the circle around it would have a radius of <strong><em data-var="Featured city 1 radius"></em></strong>.
                    </p>
                  </div>

                  <div data-step="Real distribution" class="swiper-slide">
                    <p>
                      In real life, however, Covid&#8209;19 deaths aren’t clustered in a single place. Now, the map shows where the
                      <strong><em data-var="Death count"></em> Brazilians that died</strong>
                      due to the disease actually lived.
                    </p>
                  </div>

                  <div data-step="Share me" class="swiper-slide">
                    <p>
                      Since these people were not around you, it may be <strong>hard for you to see</strong> the scale of those losses in your daily life. Nevertheless, even if unnoticed, <strong>they all existed</strong>.
                    </p>
                    <button type="button" class="screen-reader" data-trigger="app.pages.open('poster')">
                      <span>Share my map (click to generate poster for download in JPG format)</span>
                    </button>
                    <button type="button" class="screen-reader" data-trigger="app.pages.open('main')">
                      <span class="screen-reader">Exit simulation</span>
                    </button>
                  </div>

                </div>

                <div class="swiper-pagination"></div>

              </div>

              <div class="arrows" aria-hidden="true">
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

      <div id="poster" class="poster" tabindex="0">

        <div class="atelie" aria-hidden="true">
          <div class="poster-html">

            <div class="poster-location">
              <h1>
                <em data-var="User city"></em>
                <span>noepicentro.com</span>
              </h1>
            </div>

            <figure class="poster-figure">
              <img class="poster-map" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="Preview of the poster that shows the devastation radius around your address.">
              <figcaption>
                <p>
                  <img src="../media/poster/radius.svg">
                  <em data-var="User radius"></em>
                </p>
                <p>
                  <em data-var="Update short"></em>
                </p>
              </figcaption>
              <div class="marker"></div>
            </figure>

            <div class="poster-content">
              <p>If all <strong><em data-var="Death count"></em></strong> <strong>Covid&#8209;19 deaths</strong> had happened around me, no one in this radius would be left alive.</p>
              <div class="brands">
                <a><img src="../media/brand/lupa.png"></a>
                <a><div class="pipe"></div><img src="../media/brand/google.svg"></a>
                <img src="../media/brand/mapbox.svg?v=1.2.4">
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

              <p>This image shows how far your neighborhood would vanish if all <em data-var="Death count"></em> deaths in Brazil had happened around you.</p>
              <p>
                <small class="notes">The results displayed on the map are an approximation.</small>
              </p>

            </div>

          </div>

        </article>

      </div>


    </div>

    <script src="https://api.mapbox.com/mapbox-gl-js/v1.11.0/mapbox-gl.js"></script>
    <script src="https://unpkg.com/swiper@6/swiper-bundle.min.js"></script>

    <script src="../script/turf.modules.min.js"></script>
    <script src="../script/app.js?v=1.2.4"></script>

    <script src="https://unpkg.com/prefixfree/prefixfree.min.js" async></script>
    <script src="../script/html2canvas.min.js" async></script>

  </body>
</html>
