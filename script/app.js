let map;

let app = {

  element : document.querySelector( '.app' ),

  variables : {

    elements : document.querySelectorAll( '[data-var]' ),

    initial : undefined,
    result : undefined,

    get : {

      "Death count" : function() {

        return ''

      },

      "Cities with deaths" : function() {

        return ''

      },

      "Time since first death" : function() {

        let today = new Date()
        let first = new Date( 2020, 2, 16 )

        let diff = {}

        diff.milliseconds = today - first
        diff.days = Math.floor( diff.milliseconds / (1000*60*60*24) )

        return diff.days + ' dias'

      },

      "User radius" : function() {

        let city = app.variables.result // .user_city ?

        let km = turf.distance(
          turf.point( city.radius.inner_point ),
          turf.point( city.radius.outer_point )
        )

        if ( km < 1 )
          return Math.round( km * 1000 ) + ' m'

        let value = Math.round( km * 10 ) / 10
        value = new Intl.NumberFormat( 'pt-BR' ).format( value )
        return  value + ' km'

      },

      "Featured city 1" : function() {

        let city = app.variables.result.capitals_to_highlight[ 0 ]
        return city.name_muni + ' (' + city.name_state + ')'

      },

      "Featured city 1 location" : function() {

        let city = app.variables.result.capitals_to_highlight[ 0 ]
        return city.display_text

      },

      "Featured city 1 location description" : function() {

        let city = app.variables.result.capitals_to_highlight[ 0 ]
        return city.display_desc || ''

      },

      "Featured city 1 radius" : function() {

        let city = app.variables.result.capitals_to_highlight[ 0 ]
        let km = turf.distance(
          turf.point( city.radius.inner_point ),
          turf.point( city.radius.outer_point )
        )

        if ( km < 1 )
          return Math.round( km * 1000 ) + ' m'

        let value = Math.round( km * 10 ) / 10
        value = new Intl.NumberFormat( 'pt-BR' ).format( value )
        return  value + ' km'

      },

      "Featured city 2" : function() {

        let city = app.variables.result.capitals_to_highlight[ 1 ]
        return city.name_muni + ' (' + city.name_state + ')'

      },

      "Featured city 2 location" : function() {

        let city = app.variables.result.capitals_to_highlight[ 1 ]
        return city.display_text

      },

      "Featured city 2 location description" : function() {

        let city = app.variables.result.capitals_to_highlight[ 1 ]
        return city.display_desc || ''

      },

      "Featured city 2 radius" : function() {

        let city = app.variables.result.capitals_to_highlight[ 1 ]
        let km = turf.distance(
          turf.point( city.radius.inner_point ),
          turf.point( city.radius.outer_point )
        )

        if ( km < 1 )
          return Math.round( km * 1000 ) + ' m'

        let value = Math.round( km * 10 ) / 10
        value = new Intl.NumberFormat( 'pt-BR' ).format( value )
        return  value + ' km'

      },

      "Vanished city" : function() {

        let city = app.variables.result.neighboring_city
        return city.name_muni + ' (' + city.name_state + ')'

      },

      "Vanished city population" : function() {

        let city = app.variables.result.neighboring_city
        let population = city.pop_2019
        let value = Math.round( population / 1000 )
        return value + ' mil'

      },

      "Vanished city population difference" : function() {

        let city = app.variables.result.neighboring_city
        let population = city.pop_2019 // 8
        let deaths = 0 // ???
        let difference = deaths - population

        if ( difference < 1000 )
          return difference

        let value = Math.round( difference / 1000 ) * 1000
        return value + ' mil'

      },

      "Vanished cities" : function() {

        return ''

      }

    },

    update : function( list ) {

      list = list || Object.keys( app.variables.get )

      for ( let variable of list ) {

        for ( let element of app.variables.elements ) {

          if ( element.dataset.var == variable ) {

            let text = app.variables.get[ variable ]()
            element.innerText = text

          }


        }

      }

    },

    initialize : function() {

      app.variables.update(
        [
          'Death count',
          'Cities with deaths'
        ]
      )

    }

  },

  pages : {

    previous : 'main',

    open : function( name ) {

      app.pages.previous = JSON.parse( JSON.stringify( app.element.dataset.page ) )
      app.element.dataset.page = name

    },

    close : function() {

      app.element.dataset.page = app.pages.previous

    },

    initialize : function() {

      app.element.dataset.page = 'main'

    }

  },

  cover : {

    initialize : function() {

    }

  },

  main : {

    element : document.querySelector( '.main' ),

    background : function() {

      document.querySelector( '.background' ).style.height = '0'

      setTimeout( function() {

        document.querySelector( '.background' ).style.height = ( app.main.element.scrollHeight - app.main.element.offsetHeight ) + 'px'

      }, 10 )

    },

    initialize : function() {

      app.main.background()

      window.addEventListener( 'resize', app.main.background )

    }

  },

  search : {

    form : {

      element : document.querySelector( 'form' ),

      initialize : function() {

        app.search.form.element.addEventListener( 'reset', function( event ) {

          app.search.suggestions.clear()

        } )

        app.search.form.element.addEventListener( 'submit', function( event ) {

          let suggestion = document.querySelector( '.suggestions ol li:first-child button' )

          if ( suggestion )
            suggestion.click()
          else
            app.search.input.identify()

          event.preventDefault()

        } )

      }

    },

    input : {

      sanitized : function() {

        return app.search.input.element.value.trim()

      },

      element : document.querySelector( 'input[type="search"]' ),

      debounce : {

        timer : undefined,

        function : function( callback, delay ) {

          delay = delay || 500

          clearTimeout( app.search.input.debounce.timer )

          app.search.input.debounce.timer = setTimeout( callback , delay )

        }

      },

      identify : function() {

        let api = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
        let token = 'pk.eyJ1IjoidGlhZ29tYnAiLCJhIjoiY2thdjJmajYzMHR1YzJ5b2huM2pscjdreCJ9.oT7nAiasQnIMjhUB-VFvmw'

        let address = encodeURIComponent( app.search.input.sanitized() )

        if ( address ) {

          let url = ''

          url += api
          url += address
          url += '.json'
          url += '?'
          url += 'country=br'
          url += '&'
          url += 'language=pt'
          url += '&'
          url += 'limit=3'
          url += '&'
          url += 'access_token='
          url += token

          fetch( url )
            .then( response => response.json() )
            .then( data => app.search.suggestions.handle( data ) )
            .catch( error => console.log( error ) )

        }

      },

      initialize : function() {

        app.search.input.element.addEventListener( 'input', function() {

          let address = app.search.input.sanitized()

          if ( address )
            app.search.input.debounce.function( app.search.input.identify )
          else
            app.search.suggestions.clear()

        } )

        app.search.input.element.addEventListener( 'focus', function() {

          app.element.dataset.search = 'focus'

        } )

        app.search.input.element.addEventListener( 'blur', function() {

          app.element.dataset.search = 'blur'

        } )

      }

    },

    suggestions : {

      // show : function() {
      //
      // },

      // hide : function() {
      //  app.element.dataset.search = 'blur'
      // },

      handle : function( data ) {

        if ( data.features ) {

          for ( let feature of data.features ) {

            feature.primary = ''
            feature.secondary = ''
            feature.postcode = ''

            feature.primary += feature.text
            feature.primary += feature.address ? ', ' + feature.address : ''

            for ( let context of feature.context ) {

              feature.secondary += context.id.includes( 'poi'          ) ? ', ' + context.text : ''
              feature.secondary += context.id.includes( 'neighborhood' ) ? ', ' + context.text : ''
              feature.secondary += context.id.includes( 'locality'     ) ? ', ' + context.text : ''
              feature.secondary += context.id.includes( 'place'        ) ? ', ' + context.text : ''
              feature.secondary += context.id.includes( 'district'     ) ? ', ' + context.text : ''

              // fix Rio de Janeiro addresses (they do not have short_code property)
              if ( context.id.includes( 'region' ) ) {

                if ( 'short_code' in context )
                  feature.secondary += ', ' + context.short_code.replace( 'BR-', '' )
                else
                  feature.secondary += context.text === 'Rio de Janeiro' ? ', RJ' : ''

              }

              if ( !feature.postcode )
                feature.postcode += context.id.includes( 'postcode' ) ? ' – ' + context.text : ''

            }

            feature.secondary = feature.secondary.replace( /(^,\s*)/g, '' )
            feature.secondary += feature.postcode

          }

          app.search.suggestions.fill( data.features )

        }

      },

      fill : function( features ) {

        app.search.suggestions.clear()
        app.element.dataset.search = 'suggestions'

        let ol = document.querySelector( '.suggestions ol' )

        for ( let feature of features ) {

          let item, button, primary, secondary

          item = document.createElement( 'li' )

          button = document.createElement( 'button' )
          button.setAttribute( 'type', 'button' )
          button.value = JSON.stringify( feature.center )

          button.addEventListener( 'click', function() {

            let center = JSON.parse( this.value )
            app.story.begin( center )

          } )

          primary = document.createElement( 'span' )
          primary.innerText = feature.primary

          secondary = document.createElement( 'span' )
          secondary.innerText = feature.secondary

          button.appendChild( primary )
          button.appendChild( secondary )
          item.appendChild( button )
          ol.appendChild( item )

        }

      },

      clear : function() {

        let ol = document.querySelector( '.suggestions ol' )

        let item = ol.lastElementChild

        while ( item ) {
            ol.removeChild(item)
            item = ol.lastElementChild
        }

      },

      initialize : function() {

      },

    },

    geolocation : {

      handle : function( position ) {

        if ( position.coords ) {

          let center = [
            position.coords.longitude,
            position.coords.latitude
          ]

          app.story.begin( center )

        }

      },

      get : function() {

        if ( navigator.geolocation )
          navigator.geolocation.getCurrentPosition( app.search.geolocation.handle )

      },

      initialize : function() {

        if ( navigator.geolocation )
          app.element.dataset.geolocation = true
        else
          app.element.dataset.geolocation = false

      }

    },

    initialize : function() {

      app.search.form.initialize()
      app.search.input.initialize()
      app.search.suggestions.initialize()
      app.search.geolocation.initialize()

    }

  },

  story : {

    steps : {

      show : {

        "You are here" : function() {

          console.log( "You are here" )

        },
        "First death" : function() {

          console.log( "First death" )

        },
        "Following deaths" : function() {

          console.log( "Following deaths" )

        },
        "All deaths" : function() {

          console.log( "All deaths" )

        },
        "All deaths with outline" : function() {

          console.log( "All deaths with outline" )

        },
        "City that would have vanished" : function() {

          console.log( "City that would have vanished" )

        },
        "City vanished" : function() {

          console.log( "City vanished" )

        },
        "Cities that would have vanished" : function() {

          console.log( "Cities that would have vanished" )

        },
        "Cities vanished" : function() {

          console.log( "Cities vanished" )

        },
        "Featured city 1" : function() {

          console.log( "Featured city 1" )

        },
        "Featured city 1 location" : function() {

          console.log( "Featured city 1 location" )

        },
        "Featured city 2" : function() {

          console.log( "Featured city 2" )

        },
        "Featured city 2 location" : function() {

          console.log( "Featured city 2 location" )

        },

      },

      handle : function( carousel ) {

        let active = carousel.slides[ carousel.activeIndex ]

        if ( active === undefined && carousel.activeIndex === 0 )
          active = document.querySelector( '.swiper-slide' )

        console.log( active.dataset.step )

      }

    },

    map : {

      id : 'map',
      style : 'mapbox://styles/tiagombp/ckbz4zcsb2x3w1iqyc3y2eilr',
      token : 'pk.eyJ1IjoidGlhZ29tYnAiLCJhIjoiY2thdjJmajYzMHR1YzJ5b2huM2pscjdreCJ9.oT7nAiasQnIMjhUB-VFvmw',
      user : undefined,

      initialize : function( center ) {

        app.story.map.user = center;

        mapboxgl.accessToken = app.story.map.token;

        map = new mapboxgl.Map( {
            container: app.story.map.id,
            style: app.story.map.style,
            center: center,
            zoom: 14,
            // preserveDrawingBuffer: true
        } )

        // remove existing layers for new search

        if ( map.getLayer(  'people-inside' ) ) map.removeLayer( 'people-inside' )
        if ( map.getLayer(  'circle'        ) ) map.removeLayer( 'circle' )
        if ( map.getSource( 'circle'        ) ) map.removeSource( 'circle' )

        // fly to result (zooming in)

        map.flyTo( {
          'center': center,
          'speed': 0.8,
          'zoom': 16
        } )

        let flying = true;

        // fetch

        let lat = center[1];
        let lon = center[0];

        let url = 'https://caco.app/coords?lat=' + lat + '&lon=' + lon

        let time_before = performance.now()

        fetch(url, {
            mode: 'cors'
          })
          .then(function(response) {
            if (!response.ok) {
              throw Error();
            }
            return response.json();
          })
          .then(function(api_result) {

            console.log( api_result )

            let time_after = performance.now();
            console.log("tempo para fetch", time_after - time_before);

            let circle = app.story.map.draw_circle(
              center = center,
              point_on_circle = api_result.radius.outer_point
            );

            bbox_circle = turf.bbox(circle);

            // wait for the end of fly_to camera movement
            map.on('moveend', function(e) {
              if (flying) {
                flying = false;

                map.fitBounds(bbox_circle, {
                  padding: {
                    top: 20,
                    bottom: 20,
                    left: 10,
                    right: 10
                  },
                  duration: 1000
                });

                let fittingBounds = true;

                // wait for the end of fitBounds camera movement

                map.on('moveend', function(e) {
                  if (fittingBounds) {
                    fittingBounds = false;

                    app.story.map.show_people();
                    app.story.map.highlight_people_inside(
                      center = app.story.map.user,
                      point_on_circle = api_result.radius.outer_point
                    );

                    //toggle_labels(show = false);
                    //toggle_circle(show = false);
                  }
                })

              }
            })

            app.variables.result = api_result
            app.variables.update()

          })

      },

      draw_circle : function(center, point_on_circle) {

      	// remove circle layer, if it already exists
      	if (map.getLayer('circle')) map.removeLayer('circle');
      	if (map.getSource('circle')) map.removeSource('circle');

      	// transform coordinates into features
      	let center_ft = turf.point(center);
      	let point_on_circle_ft = turf.point(point_on_circle);

      	// calculate radius in km
      	let radius = turf.distance(
      		center_ft,
      		point_on_circle_ft
      	);

      	// generates circle as feature
      	let circle = turf.circle(center_ft, radius);

      	map.addSource('circle', {
      		'type': 'geojson',
      		'data': circle
      	});

      	map.addLayer({
      		'id': 'circle',
      		'type': 'fill',
      		'source': 'circle',
      		'layout': {},
      		'paint': {
      			'fill-outline-color': 'tomato',
      			'fill-color': 'transparent',
      			'fill-opacity': 1
      		}
      	}, );

      	return circle;
      },

      show_people : function() {
      	map.setPaintProperty(
      		'people',
      		'circle-opacity',
      		0.25
      	);
      	map.moveLayer("people", "national-park")
      },

      highlight_people_inside : function(center, point_on_circle) {

        if (map.getLayer('mask')) map.removeLayer('mask');
        if (map.getSource('mask')) map.removeSource('mask');

        ///// this could be a helper function. we use this code twice.
        // transform coordinates into features
        let center_ft = turf.point(center);
        let point_on_circle_ft = turf.point(point_on_circle);

        // calculate radius in km
        let radius = turf.distance(
            center_ft,
            point_on_circle_ft
        );
        ///// end of helper function

        let bbox_br = turf.bboxPolygon([-73.9872354804, -33.7683777809, -34.7299934555, 5.24448639569])

        let circles = [];
        let steps = 10;
        for (let i = 1; i<=steps; i++) {
            circles.push(turf.circle(center_ft, radius * i / steps));
        }

        let masks = circles.map(d => turf.mask(d, bbox_br));

        map.addSource('mask', {
            'type': 'geojson',
            'data': masks[0]
        });

        map.addLayer({
            'id': 'mask',
            'type': 'fill',
            'source': 'mask',
            'paint': {
                'fill-color': 'black',
                'fill-opacity': 0.55
            }
        });

        // for each circle/mask, updates the 'data' parameter for the mask source,
        // redrawing it

        let duration = 600;

        for (let i = 0; i<steps; i++) {
            window.setTimeout(function() {
                map.getSource('mask').setData(masks[i])
            }, i * duration);
        }

      },

      toggle_circle : function(show) {

      	let opacity = show ? 1 : 0;

      	map.setPaintProperty("circle", "fill-opacity", opacity);
      },

      controls : {

        labels : {

          element : document.querySelector( '[name="labels"][type="checkbox"]' ),

          reset : function() {

            app.story.map.controls.labels.element.checked = true

          },

          toggle : function( option ) {

            const layers = [
              'settlement-major-label',
              'settlement-minor-label',
              'settlement-subdivision-label',
              'natural-point-label',
              'poi-label',
              'water-point-label',
              'road-label',
              'waterway-label',
              'airport-label',
              'natural-line-label',
            ]

            let opacity = option ? 1 : 0

            for ( layer of layers )
              map.setPaintProperty( layer, 'text-opacity', opacity )

          },

          initialize : function() {

            app.story.map.controls.labels.element.addEventListener( 'change', function() {

              app.story.map.controls.labels.toggle( this.checked )

            } )

          }

        }

      }

    },

    begin : function( center ) {

      if ( app.story.carousel.instance )
        app.story.carousel.instance.destroy()

      app.story.carousel.initialize()

      app.search.suggestions.clear()
      app.search.form.element.reset()
      app.search.input.element.blur()

      app.pages.open( 'story' )

      app.story.map.initialize( center )
      app.story.map.controls.labels.reset()

      app.story.carousel.instance.update()
      app.story.carousel.instance.keyboard.enable()

    },

    carousel : {

      instance : undefined,

      selector : '.swiper-container',

      options : {

        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar',
        },

        navigation: {
          prevEl: '.prev',
          nextEl: '.next',
        },

        grabCursor: true,

        on: {

          init : function ( carousel ) {
            app.story.steps.handle( carousel )
          },

          slideChangeTransitionEnd: function ( carousel ) {
            app.story.steps.handle( carousel )
          }

        }

      },

      initialize : function() {

        app.story.carousel.instance = new Swiper(
          app.story.carousel.selector,
          app.story.carousel.options
        )

      }

    },

    initialize : function() {

      app.story.map.controls.labels.initialize()

    }

  },

  poster : {

    initialize : function() {


    }

  },

  triggers : {

    elements : document.querySelectorAll( '[data-trigger]' ) ,

    initialize : function() {

      for ( let trigger of app.triggers.elements ) {

        trigger.addEventListener( 'click', function() {

          let instructions = this.dataset.trigger

          let f = new Function( instructions )

          return( f() )

        } )

      }

    }

  },

  initialize : function() {

    app.variables.initialize()
    app.pages.initialize()
    app.cover.initialize()
    app.main.initialize()
    app.search.initialize()
    app.story.initialize()
    app.poster.initialize()
    app.triggers.initialize()

  }

}

app.initialize()
