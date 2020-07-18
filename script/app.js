let map;
let first_47; // temp



let app = {

  api : 'https://caco.app/', // https://api.noepicentro.com/

  element : document.querySelector( '.app' ),

  color : function( name ) {

    let style = getComputedStyle( document.documentElement )
    let value = style.getPropertyValue( '--' + name )
    return value

  },

  variables : {

    elements : document.querySelectorAll( '[data-var]' ),

    initial : undefined,
    result : undefined,

    get : {

      "Death count" : function() {

        let deaths = app.variables.initial.deaths
        deaths = new Intl.NumberFormat( 'pt-BR' ).format( deaths )
        return deaths

      },

      "Death count rounded" : function() {

        let deaths = app.variables.initial.deaths
        let value = Math.round( deaths / 1000 )
        return value + ' mil'

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

        let city = app.variables.result

        let km = turf.distance(
          turf.point( city.radius.inner_point ),
          turf.point( city.radius.outer_point )
        )

        if ( km < 1 )
          return Math.round( km * 1000 ) + 'm'

        let value = Math.round( km * 10 ) / 10
        value = new Intl.NumberFormat( 'pt-BR' ).format( value )
        return  value + 'km'

      },

      "Featured city 1" : function() {

        let city = app.variables.result.capitals_to_highlight[ 0 ]
        return city.name_muni + ' (' + city.name_state + ')'

      },

      "Featured city 1 location" : function() {

        let city = app.variables.result.capitals_to_highlight[ 0 ]
        return city.display_text.preffix + ' ' + city.display_text.place

      },

      "Featured city 1 location description" : function() {

        let city = app.variables.result.capitals_to_highlight[ 0 ]
        return city.complement || ''

      },

      "Featured city 1 radius" : function() {

        let city = app.variables.result.capitals_to_highlight[ 0 ]
        let km = turf.distance(
          turf.point( city.radius.inner_point ),
          turf.point( city.radius.outer_point )
        )

        if ( km < 1 )
          return Math.round( km * 1000 ) + 'm'

        let value = Math.round( km * 10 ) / 10
        value = new Intl.NumberFormat( 'pt-BR' ).format( value )
        return  value + 'km'

      },

      "Featured city 2" : function() {

        let city = app.variables.result.capitals_to_highlight[ 1 ]
        return city.name_muni + ' (' + city.name_state + ')'

      },

      "Featured city 2 location" : function() {

        let city = app.variables.result.capitals_to_highlight[ 1 ]
        return city.display_text.preffix + ' ' + city.display_text.place

      },

      "Featured city 2 location description" : function() {

        let city = app.variables.result.capitals_to_highlight[ 1 ]
        return city.complement || ''

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
        let population = city.pop_2019
        let deaths = app.variables.initial.deaths
        let difference = deaths - population

        if ( difference < 1000 )
          return difference

        let value = Math.round( difference / 1000 )
        return value + ' mil'

      },

      "Vanished cities" : function() {

        let value = app.variables.initial.vanishing_cities
        value = new Intl.NumberFormat( 'pt-BR' ).format( value )
        return value

      },

      "Update" : function() {

        let timestamp = app.variables.initial.date
        let noon = 'T12:00:00-03:00'
        let date =  new Date( timestamp + noon )

        let options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }

        let text = date.toLocaleDateString( 'pt-BR', options )
        let markup = '<time datetime="' + timestamp + '">' + text + '</time>'

        return markup

      }

    },

    update : function( list ) {

      list = list || Object.keys( app.variables.get )

      for ( let variable of list ) {

        for ( let element of app.variables.elements ) {

          if ( element.dataset.var == variable ) {

            let text = app.variables.get[ variable ]()
            element.innerHTML = text

          }

        }

      }

    },

    initialize : function() {

      let url = app.api + 'count'
      let options = { mode: 'cors' }

      fetch( url, options )
        .then( response => response.json() )
        .then( data => {

          app.variables.initial = data
          app.variables.update(
            [
              'Death count',
              'Update',
              'Vanished cities'
            ]
          )

        } )
        .catch( error => console.log( error ) )

    }

  },

  pages : {

    previous : 'main',

    open : function( name ) {

      app.pages.previous = JSON.parse( JSON.stringify( app.element.dataset.page ) )
      app.element.dataset.page = name

      if ( name == 'poster' ) {
        app.poster.initialize(
          app.variables.result.radius.inner_point,
          app.variables.result.radius.outer_point
        )
      }

      // if name == poster || main
        // disable swiper keyboard controls

    },

    close : function() {

      app.element.dataset.page = app.pages.previous

    },

    initialize : function() {

      app.element.dataset.page = 'main'

      // if name == poster || main
        // disable swiper keyboard controls

    }

  },

  cover : {

    element : document.querySelector( '.cover' ),

    locations : [
    	{
    		"center":[
    			-30.0341319,
    			-51.2432707
    		],
    		"name_muni":"Porto Alegre",
    		"name_state":"RS"
    	},
    	{
    		"center":[
    			-25.4251957,
    			-49.2675855
    		],
    		"name_muni":"Curitiba",
    		"name_state":"PR"
    	},
    	{
    		"center":[
    			-23.5628876,
    			-46.6504141
    		],
    		"name_muni":"São Paulo",
    		"name_state":"SP"
    	},
    	{
    		"center":[
    			-22.9120302,
    			-43.2319878
    		],
    		"name_muni":"Rio de Janeiro",
    		"name_state":"RJ"
    	},
    	{
    		"center":[
    			-15.7986852,
    			-47.8757942
    		],
    		"name_muni":"Brasília",
    		"name_state":"DF"
    	},
    	{
    		"center":[
    			-16.6798512,
    			-49.2558648
    		],
    		"name_muni":"Goiânia",
    		"name_state":"GO"
    	},
    	{
    		"center":[
    			-12.9744658,
    			-38.5131887
    		],
    		"name_muni":"Salvador",
    		"name_state":"BA"
    	},
    	{
    		"center":[
    			-3.7277894,
    			-38.5276207
    		],
    		"name_muni":"Fortaleza",
    		"name_state":"CE"
    	},
    	{
    		"center":[
    			-3.1301977,
    			-60.0232912
    		],
    		"name_muni":"Manaus",
    		"name_state":"AM"
    	},
    	{
    		"center":[
    			-1.4525862,
    			-48.5038115
    		],
    		"name_muni":"Belém",
    		"name_state":"PA"
    	}
    ],

    initialize : function() {

      for ( let location of app.cover.locations ) {

        console.log( location.center )

      }

    }

  },

  main : {

    element : document.querySelector( '.main' ),

    background : function() {

      if ( window.innerWidth >= 800 )
        return false

      document.querySelector( '.background' ).style.height = '0'

      setTimeout( function() {

        let height = ( app.main.element.scrollHeight - app.main.element.offsetHeight ) + 'px'
        document.querySelector( '.background' ).style.height = height

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
          url += app.story.map.token

          fetch( url )
            .then( response => response.json() )
            .then( data => app.search.suggestions.handle( data ) )
            .catch( error => console.error( error ) )

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

      options : {
        enableHighAccuracy : false,
        maximumAge : 1000 * 60,
        timeout : 10000
      },

      success : function( position ) {

        if ( position.coords ) {

          let center = [
            position.coords.longitude,
            position.coords.latitude
          ]

          app.story.begin( center )

        }

      },

      error : function( error ) {

        console.error( error.code, error.message )

        alert( 'Ops! Não conseguimos usar sua localização… Que tal digitar seu endereço?' )

      },

      get : function() {

        if ( navigator.geolocation ) {

          // dummy one, which will result in a working next statement
          navigator.geolocation.getCurrentPosition(
            function () {},
            function () {},
            {}
          )

          navigator.geolocation.getCurrentPosition(
            app.search.geolocation.success,
            app.search.geolocation.error,
            app.search.geolocation.options
          )

        }

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

          map.flyTo( {
            center : app.story.map.user,
            speed  : .1,
            zoom   : 15.5,
            pitch  : 0
          } )

          app.poster.button.toggle( false )
          app.story.map.controls.labels.toggle( true )
          app.story.map.controls.bubble.toggle( false )


          for ( let index of Array( 3 ).keys() ) {

            let location, center, label;

            if ( index === 0 ) {

              center = app.story.map.user
              label = 'Você está aqui'

            } else {

              location = app.variables.result.capitals_to_highlight[ index - 1 ]
              center = location.radius.inner_point
              label = location.display_text.place

            }

            app.story.map.controls.marker.initialize(
              center,
              index,
              label
            )

            app.story.map.controls.marker.toggle( index > 0 ? false : true, index )
            app.story.map.controls.marker.toggleLabel( index > 0 ? false : true, index )

          }


          delete app.story.map.monitoring

          app.story.map.monitoring = setInterval( function() {

            if ( map.isStyleLoaded() /* && app.variables.result */ ) {

              (function() {

                app.story.map.controls.people.initialize()
                app.story.map.controls.people.toggle( { opacity: 1, radius: 1.5, color: '#555' } )
                app.story.map.controls.people.highlight.someInsideCircle.initialize( 1, 'first-death' )
                app.story.map.controls.people.highlight.someInsideCircle.initialize( 46, 'first-deaths' )
                app.story.map.controls.people.highlight.someInsideCircle.toggle( false, 'first-death' )
                app.story.map.controls.people.highlight.someInsideCircle.toggle( false, 'first-deaths' )

                for ( let index of Array( 3 ).keys() ) {

                  let radius = app.variables.result.radius

                  if ( index > 0 )
                    radius = app.variables.result.capitals_to_highlight[ index - 1 ].radius

                  app.story.map.controls.people.highlight.insideCircle.initialize(
                    radius.inner_point,
                    radius.outer_point,
                    index
                  )
                  app.story.map.controls.people.highlight.insideCircle.toggle( false, index )

                  app.story.map.controls.circle.initialize(
                    radius.inner_point,
                    radius.outer_point,
                    index
                  )
                  app.story.map.controls.circle.toggle( false, index )

                }

                app.story.map.controls.location.highlight( false )

                app.element.dataset.loaded = true
                clearInterval( app.story.map.monitoring )

                // delete app.story.map.monitoring

              })()

            }

          }, 200 )

        },
        "First death" : function() {

          map.flyTo( {
            center : app.story.map.user,
            speed  : .1,
            zoom   : 17,
            pitch  : 60,
          } )

          app.story.map.controls.marker.toggle( true, 0 )
          app.story.map.controls.marker.toggleLabel( false, 0 )
          app.story.map.controls.marker.toggle( false, 1 )
          app.story.map.controls.marker.toggleLabel( false, 1 )
          app.story.map.controls.marker.toggle( false, 2 )
          app.story.map.controls.marker.toggleLabel( false, 2 )

          app.poster.button.toggle( false )
          app.story.map.controls.labels.toggle( false )
          app.story.map.controls.bubble.toggle( false )
          app.story.map.controls.people.toggle( { opacity: 1, radius: 1, color: '#555' } )
          app.story.map.controls.people.highlight.someInsideCircle.toggle( true, 'first-death' )
          app.story.map.controls.people.highlight.someInsideCircle.toggle( false, 'first-deaths' )
          app.story.map.controls.people.highlight.insideCircle.toggle( false, 0 )
          app.story.map.controls.people.highlight.insideCircle.toggle( false, 1 )
          app.story.map.controls.people.highlight.insideCircle.toggle( false, 2 )
          app.story.map.controls.circle.toggle( false, 0 )
          app.story.map.controls.circle.toggle( false, 1 )
          app.story.map.controls.circle.toggle( false, 2 )
          app.story.map.controls.location.highlight( false )
          // app.story.map.controls.location.vanishAllBelow( false )

          // app.story.map.controls.tooltip( app.story.map.user, 0 )

        },
        "Following deaths" : function() {

          map.flyTo( {
            center : app.story.map.user,
            speed  : .1,
            zoom   : 16.75,
            pitch  : 60
          } )

          app.story.map.controls.marker.toggle( true, 0 )
          app.story.map.controls.marker.toggleLabel( false, 0 )
          app.story.map.controls.marker.toggle( false, 1 )
          app.story.map.controls.marker.toggleLabel( false, 1 )
          app.story.map.controls.marker.toggle( false, 2 )
          app.story.map.controls.marker.toggleLabel( false, 2 )

          app.poster.button.toggle( false )
          app.story.map.controls.labels.toggle( false )
          app.story.map.controls.bubble.toggle( false )
          app.story.map.controls.people.toggle( { opacity: 1, radius: 1, color: '#555' } )
          app.story.map.controls.people.highlight.someInsideCircle.toggle( true, 'first-death' )
          app.story.map.controls.people.highlight.someInsideCircle.toggle( true, 'first-deaths' )
          app.story.map.controls.people.highlight.insideCircle.toggle( false, 0 )
          app.story.map.controls.people.highlight.insideCircle.toggle( false, 1 )
          app.story.map.controls.people.highlight.insideCircle.toggle( false, 2 )
          app.story.map.controls.circle.toggle( false, 0 )
          app.story.map.controls.circle.toggle( false, 1 )
          app.story.map.controls.circle.toggle( false, 2 )
          app.story.map.controls.location.highlight( false )
          // app.story.map.controls.location.vanishAllBelow( false )

        },
        "All deaths" : function() {

          app.story.map.controls.marker.toggle( true, 0 )
          app.story.map.controls.marker.toggleLabel( false, 0 )
          app.story.map.controls.marker.toggle( false, 1 )
          app.story.map.controls.marker.toggleLabel( false, 1 )
          app.story.map.controls.marker.toggle( false, 2 )
          app.story.map.controls.marker.toggleLabel( false, 2 )

          app.poster.button.toggle( false )
          app.story.map.controls.labels.toggle( false )
          app.story.map.controls.bubble.toggle( false )
          app.story.map.controls.people.toggle( { opacity: 1, radius: 1, color: '#fff' } )
          app.story.map.controls.people.highlight.someInsideCircle.toggle( false, 'first-death' )
          app.story.map.controls.people.highlight.someInsideCircle.toggle( false, 'first-deaths' )
          app.story.map.controls.people.highlight.insideCircle.toggle( true, 0 )
          app.story.map.controls.people.highlight.insideCircle.toggle( false, 1 )
          app.story.map.controls.people.highlight.insideCircle.toggle( false, 2 )
          app.story.map.controls.circle.toggle( false, 0 )
          app.story.map.controls.circle.toggle( false, 1 )
          app.story.map.controls.circle.toggle( false, 2 )
          app.story.map.controls.circle.fitOnScreen( 0, 60 )
          app.story.map.controls.location.highlight( false )
          // app.story.map.controls.location.vanishAllBelow( false )

        },
        "All deaths with outline" : function() {

          app.story.map.controls.marker.toggle( true, 0 )
          app.story.map.controls.marker.toggleLabel( false, 0 )
          app.story.map.controls.marker.toggle( false, 1 )
          app.story.map.controls.marker.toggleLabel( false, 1 )
          app.story.map.controls.marker.toggle( false, 2 )
          app.story.map.controls.marker.toggleLabel( false, 2 )

          app.poster.button.toggle( true )
          app.story.map.controls.labels.toggle( false )
          app.story.map.controls.bubble.toggle( false )
          app.story.map.controls.people.toggle( { opacity: 1, radius: 1, color: '#fff' } )
          app.story.map.controls.people.highlight.someInsideCircle.toggle( false, 'first-death' )
          app.story.map.controls.people.highlight.someInsideCircle.toggle( false, 'first-deaths' )
          app.story.map.controls.people.highlight.insideCircle.toggle( true, 0 )
          app.story.map.controls.people.highlight.insideCircle.toggle( false, 1 )
          app.story.map.controls.people.highlight.insideCircle.toggle( false, 2 )
          app.story.map.controls.circle.toggle( true, 0 )
          app.story.map.controls.circle.toggle( false, 1 )
          app.story.map.controls.circle.toggle( false, 2 )
          app.story.map.controls.circle.fitOnScreen( 0 )
          app.story.map.controls.location.highlight( false )
          // app.story.map.controls.location.vanishAllBelow( false )

        },
        "City that would have vanished" : function() {

          // centerHighlightAndFit
          // fitOnScreen
          // highlight
          // fill

          let city = app.variables.result.neighboring_city

          app.story.map.controls.marker.toggle( false, 0 )
          app.story.map.controls.marker.toggleLabel( false, 0 )
          app.story.map.controls.marker.toggle( false, 1 )
          app.story.map.controls.marker.toggleLabel( false, 1 )
          app.story.map.controls.marker.toggle( false, 2 )
          app.story.map.controls.marker.toggleLabel( false, 2 )

          app.poster.button.toggle( false )
          app.story.map.controls.labels.toggle( true )
          app.story.map.controls.bubble.toggle( false )
          app.story.map.controls.people.toggle( { opacity: 1, radius: 1, color: '#555' } )
          app.story.map.controls.people.highlight.someInsideCircle.toggle( false, 'first-death' )
          app.story.map.controls.people.highlight.someInsideCircle.toggle( false, 'first-deaths' )
          app.story.map.controls.people.highlight.insideCircle.toggle( false, 0 )
          app.story.map.controls.people.highlight.insideCircle.toggle( false, 1 )
          app.story.map.controls.people.highlight.insideCircle.toggle( false, 2 )
          app.story.map.controls.circle.toggle( false, 0 )
          app.story.map.controls.circle.toggle( false, 1 )
          app.story.map.controls.circle.toggle( false, 2 )
          app.story.map.controls.location.centerHighlightAndFit(
            city.bbox,
            city.code_muni,
            true
          )
          // // app.story.map.controls.location.vanishAllBelow( false )
          // app.story.map.controls.location.highlight( '' )

        },
        "City vanished" : function() {

          let city = app.variables.result.neighboring_city

          app.story.map.controls.marker.toggle( false, 0 )
          app.story.map.controls.marker.toggleLabel( false, 0 )
          app.story.map.controls.marker.toggle( false, 1 )
          app.story.map.controls.marker.toggleLabel( false, 1 )
          app.story.map.controls.marker.toggle( false, 2 )
          app.story.map.controls.marker.toggleLabel( false, 2 )

          app.poster.button.toggle( false )
          app.story.map.controls.labels.toggle( false )
          app.story.map.controls.bubble.initialize()
          app.story.map.controls.bubble.toggle( false )
          app.story.map.controls.people.toggle( { opacity: 1, radius: 1, color: '#555' } )
          app.story.map.controls.people.highlight.someInsideCircle.toggle( false, 'first-death' )
          app.story.map.controls.people.highlight.someInsideCircle.toggle( false, 'first-deaths' )
          app.story.map.controls.people.highlight.insideCircle.toggle( false, 0 )
          app.story.map.controls.people.highlight.insideCircle.toggle( false, 1 )
          app.story.map.controls.people.highlight.insideCircle.toggle( false, 2 )
          app.story.map.controls.circle.toggle( false, 0 )
          app.story.map.controls.circle.toggle( false, 1 )
          app.story.map.controls.circle.toggle( false, 2 )
          app.story.map.controls.location.fitOnScreen(
            city.bbox
          )
          // app.story.map.controls.location.vanish()
          // app.story.map.controls.location.vanishAllBelow( false )

        },

        /*

        "Cities that would have vanished" : function() {

          app.story.map.controls.marker.toggle( false, 0 )
          app.story.map.controls.marker.toggleLabel( false, 0 )
          app.story.map.controls.marker.toggle( false, 1 )
          app.story.map.controls.marker.toggleLabel( false, 1 )
          app.story.map.controls.marker.toggle( false, 2 )
          app.story.map.controls.marker.toggleLabel( false, 2 )

          app.poster.button.toggle( false )
          app.story.map.controls.labels.toggle( false )
          app.story.map.controls.people.toggle( true )
          app.story.map.controls.people.highlight.someInsideCircle.toggle( false, 'first-death' )
          app.story.map.controls.people.highlight.someInsideCircle.toggle( false, 'first-deaths' )
          app.story.map.controls.people.highlight.insideCircle.toggle( false, 0 )
          app.story.map.controls.people.highlight.insideCircle.toggle( false, 1 )
          app.story.map.controls.people.highlight.insideCircle.toggle( false, 2 )
          app.story.map.controls.circle.toggle( false, 0 )
          app.story.map.controls.circle.toggle( false, 1 )
          app.story.map.controls.circle.toggle( false, 2 )
          app.story.map.controls.location.highlight( false )
          // app.story.map.controls.location.vanishAllBelow( false )
          app.story.map.controls.location.fitOnScreen( 'br' )

        },
        "Cities vanished" : function() {

          app.story.map.controls.marker.toggle( false, 0 )
          app.story.map.controls.marker.toggleLabel( false, 0 )
          app.story.map.controls.marker.toggle( false, 1 )
          app.story.map.controls.marker.toggleLabel( false, 1 )
          app.story.map.controls.marker.toggle( false, 2 )
          app.story.map.controls.marker.toggleLabel( false, 2 )

          app.poster.button.toggle( false )
          app.story.map.controls.labels.toggle( false )
          app.story.map.controls.people.toggle( true )
          app.story.map.controls.people.highlight.someInsideCircle.toggle( false, 'first-death' )
          app.story.map.controls.people.highlight.someInsideCircle.toggle( false, 'first-deaths' )
          app.story.map.controls.people.highlight.insideCircle.toggle( false, 0 )
          app.story.map.controls.people.highlight.insideCircle.toggle( false, 1 )
          app.story.map.controls.people.highlight.insideCircle.toggle( false, 2 )
          app.story.map.controls.circle.toggle( false, 0 )
          app.story.map.controls.circle.toggle( false, 1 )
          app.story.map.controls.circle.toggle( false, 2 )
          app.story.map.controls.location.highlight( false )
          app.story.map.controls.location.vanishAllBelow( app.variables.initial.deaths )
          app.story.map.controls.location.fitOnScreen( 'br' )

        },

        */

        "Real distribution" : function() {

          app.story.map.controls.marker.toggle( false, 0 )
          app.story.map.controls.marker.toggleLabel( false, 0 )
          app.story.map.controls.marker.toggle( false, 1 )
          app.story.map.controls.marker.toggleLabel( false, 1 )
          app.story.map.controls.marker.toggle( false, 2 )
          app.story.map.controls.marker.toggleLabel( false, 2 )

          app.poster.button.toggle( false )
          app.story.map.controls.labels.toggle( true )
          app.story.map.controls.bubble.initialize()
          app.story.map.controls.bubble.toggle( true )
          app.story.map.controls.people.toggle( { opacity: 0, radius: 1, color: '#555' } )
          app.story.map.controls.people.highlight.someInsideCircle.toggle( false, 'first-death' )
          app.story.map.controls.people.highlight.someInsideCircle.toggle( false, 'first-deaths' )
          app.story.map.controls.people.highlight.insideCircle.toggle( false, 0 )
          app.story.map.controls.people.highlight.insideCircle.toggle( false, 1 )
          app.story.map.controls.people.highlight.insideCircle.toggle( false, 2 )
          app.story.map.controls.circle.toggle( false, 0 )
          app.story.map.controls.circle.toggle( false, 1 )
          app.story.map.controls.circle.toggle( false, 2 )
          app.story.map.controls.location.highlight( false )
          // app.story.map.controls.location.vanishAllBelow( false )
          app.story.map.controls.location.fitOnScreen( app.story.map.bbox.br )
          app.story.map.controls.bubble.initialize()

        },

        "Featured city 1" : function() {

          let city = app.variables.result.capitals_to_highlight[ 0 ]

          app.story.map.controls.location.fitOnScreen(
            city.bbox,
            true
          )

          app.story.map.controls.marker.toggle( false, 0 )
          app.story.map.controls.marker.toggleLabel( false, 0 )
          app.story.map.controls.marker.toggle( true, 1 )
          app.story.map.controls.marker.toggleLabel( false, 1 )
          app.story.map.controls.marker.toggle( false, 2 )
          app.story.map.controls.marker.toggleLabel( false, 2 )

          app.poster.button.toggle( false )
          app.story.map.controls.labels.toggle( true )
          app.story.map.controls.people.toggle( { opacity: 1, radius: 1, color: '#555' } )
          app.story.map.controls.people.highlight.someInsideCircle.toggle( false, 'first-death' )
          app.story.map.controls.people.highlight.someInsideCircle.toggle( false, 'first-deaths' )
          app.story.map.controls.people.highlight.insideCircle.toggle( false, 0 )
          app.story.map.controls.people.highlight.insideCircle.toggle( false, 1 )
          app.story.map.controls.people.highlight.insideCircle.toggle( false, 2 )
          app.story.map.controls.circle.toggle( false, 0 )
          app.story.map.controls.circle.toggle( false, 1 )
          app.story.map.controls.circle.toggle( false, 2 )
          app.story.map.controls.location.highlight( false )
          // app.story.map.controls.location.vanishAllBelow( false )

        },
        "Featured city 1 location" : function() {

          let city = app.variables.result.capitals_to_highlight[ 0 ]

          // // draw circle around area
          // map.flyTo( {
          //   center : city.radius.inner_point,
          //   speed  : .4,
          //   zoom   : 14
          // } )

          app.story.map.controls.marker.toggle( false, 0 )
          app.story.map.controls.marker.toggleLabel( false, 0 )
          app.story.map.controls.marker.toggle( true, 1 )
          app.story.map.controls.marker.toggleLabel( true, 1 )
          app.story.map.controls.marker.toggle( false, 2 )
          app.story.map.controls.marker.toggleLabel( false, 2 )

          app.poster.button.toggle( false )
          app.story.map.controls.labels.toggle( false )
          app.story.map.controls.people.toggle( { opacity: 1, radius: 1, color: '#fff' } )
          app.story.map.controls.people.highlight.someInsideCircle.toggle( false, 'first-death' )
          app.story.map.controls.people.highlight.someInsideCircle.toggle( false, 'first-deaths' )
          app.story.map.controls.people.highlight.insideCircle.toggle( false, 0 )
          app.story.map.controls.people.highlight.insideCircle.toggle( true, 1 )
          app.story.map.controls.people.highlight.insideCircle.toggle( false, 2 )
          app.story.map.controls.circle.toggle( false, 0 )
          app.story.map.controls.circle.toggle( true, 1 )
          app.story.map.controls.circle.toggle( false, 2 )
          app.story.map.controls.circle.fitOnScreen( 1, 60 )
          app.story.map.controls.location.highlight( false )
          // app.story.map.controls.location.vanishAllBelow( false )

        },

        /*

        "Featured city 2" : function() {


        },
        "Featured city 2 location" : function() {

          let city = app.variables.result.capitals_to_highlight[ 1 ]

          // draw circle around area
          // map.flyTo( {
          //   center : city.radius.inner_point,
          //   speed  : .4,
          //   zoom   : 15
          // } )

          app.story.map.controls.marker.toggle( false, 0 )
          app.story.map.controls.marker.toggleLabel( false, 0 )
          app.story.map.controls.marker.toggle( false, 1 )
          app.story.map.controls.marker.toggleLabel( false, 1 )
          app.story.map.controls.marker.toggle( true, 2 )
          app.story.map.controls.marker.toggleLabel( true, 2 )

          app.poster.button.toggle( false )
          app.story.map.controls.labels.toggle( false )
          app.story.map.controls.people.toggle( true )
          app.story.map.controls.people.highlight.someInsideCircle.toggle( false, 'first-death' )
          app.story.map.controls.people.highlight.someInsideCircle.toggle( false, 'first-deaths' )
          app.story.map.controls.people.highlight.insideCircle.toggle( false, 0 )
          app.story.map.controls.people.highlight.insideCircle.toggle( false, 1 )
          app.story.map.controls.people.highlight.insideCircle.toggle( true, 2 )
          app.story.map.controls.circle.toggle( false, 0 )
          app.story.map.controls.circle.toggle( false, 1 )
          app.story.map.controls.circle.toggle( true, 2 )
          app.story.map.controls.circle.fitOnScreen( 2 )

          app.story.map.controls.location.highlight( false )
          // app.story.map.controls.location.vanishAllBelow( false )

        },

        */

        "Share me" : function() {

          app.story.map.controls.marker.toggle( true, 0 )
          app.story.map.controls.marker.toggleLabel( true, 0 )
          app.story.map.controls.marker.toggle( false, 1 )
          app.story.map.controls.marker.toggleLabel( false, 1 )
          app.story.map.controls.marker.toggle( false, 2 )
          app.story.map.controls.marker.toggleLabel( false, 2 )

          app.poster.button.toggle( true )
          app.story.map.controls.labels.toggle( false )
          app.story.map.controls.bubble.toggle( false )
          app.story.map.controls.people.toggle( { opacity: 1, radius: 1, color: '#fff' } )
          app.story.map.controls.people.highlight.someInsideCircle.toggle( false, 'first-death' )
          app.story.map.controls.people.highlight.someInsideCircle.toggle( false, 'first-deaths' )
          app.story.map.controls.people.highlight.insideCircle.toggle( true, 0 )
          app.story.map.controls.people.highlight.insideCircle.toggle( false, 1 )
          app.story.map.controls.people.highlight.insideCircle.toggle( false, 2 )
          app.story.map.controls.circle.toggle( true, 0 )
          app.story.map.controls.circle.toggle( false, 1 )
          app.story.map.controls.circle.toggle( false, 2 )
          app.story.map.controls.circle.fitOnScreen( 0 )
          app.story.map.controls.location.highlight( false )
          // app.story.map.controls.location.vanishAllBelow( false )

        },

      },

      handle : function() {

        let active = document.querySelector( '.swiper-slide-active' )

        if ( !active )
          active = document.querySelector( '.swiper-slide' )

        let step = active.dataset.step

        app.element.dataset.step = step
        app.story.steps.show[ step ]()

      }

    },

    map : {

      id : 'map',
      style : 'mapbox://styles/tiagombp/ckbz4zcsb2x3w1iqyc3y2eilr?optimize=true',
      token : 'pk.eyJ1IjoidGlhZ29tYnAiLCJhIjoiY2thdjJmajYzMHR1YzJ5b2huM2pscjdreCJ9.oT7nAiasQnIMjhUB-VFvmw',
      user : undefined,
      element : document.getElementById( 'map' ),

      bbox : {

        br : [
          [ -73.9872354804, -33.7683777809 ],
          [ -34.7299934555,  5.24448639569 ]
        ]

      },

      radius : function( inner, outer ) {

        let feature = {}

        feature.inner = turf.point( inner )
        feature.outer = turf.point( outer)

        // calculate radius in km
        feature.radius = turf.distance(
          feature.inner,
          feature.outer
        )

        return {
          center : feature.inner,
          km : feature.radius
        }

      },

      reset : function() {

        if ( map ) {

          let layers = [
            'first-death',
            'first-deaths',
            'mask0',
            'mask1',
            'mask2',
            'circle0',
            'circle1',
            'circle2',
          ]

          for ( let layer of layers ) {

            if ( map.getLayer(  layer ) ) map.removeLayer(  layer )
            if ( map.getSource( layer ) ) map.removeSource( layer )

          }

          first_47 = undefined

          map.remove()

        }

      },

      padding : function() {

        let distance   = 8
        let base       = 100
        let width      = window.innerWidth
        let multiplier = width / base
        let pad        = distance * multiplier
        let nav        = document.querySelector( '.story nav' ).offsetHeight


        return {
          top:    Math.max( pad, nav ) + app.story.map.offset.value,
          bottom: pad                  + app.story.map.offset.value,
          left:   pad,
          right:  pad
        }

      },

      offset : {

        value : undefined,

        update : function() {

          let container = document.querySelector( '.steps-container' )
          let padding = parseFloat( window.getComputedStyle( container ).getPropertyValue( 'padding-bottom' ) )

          let steps = document.querySelector( '.steps' )
          let height = steps.offsetHeight

          let offset = Math.round( padding + height )

          if ( window.innerWidth >= 800 )
            offset = 0

          if ( app.story.map.offset.value !== offset ) {

            app.story.map.element.style.top = ( offset * -1 ) + 'px'
            app.story.map.offset.value = offset
            map.resize()

          }

        },

        initialize : function() {

          window.addEventListener( 'resize', function() {
            app.story.map.offset.update()
          } )

        }

      },

      initialize : function( center ) {

        mapboxgl.accessToken = app.story.map.token
        app.story.map.user = center

        app.story.map.reset()

        map = new mapboxgl.Map( {
          container: app.story.map.id,
          style:     app.story.map.style,
          center:    app.story.map.user,
          zoom:      19,
          pitch:     0,
          // preserveDrawingBuffer: true
        } )

        map.setMinZoom( 2 )
        map.setMaxZoom( 19 )
        map.keyboard.disable()
        map.dragRotate.disable()
        map.touchZoomRotate.disableRotation()

        let url = app.api

        url += 'coords'
        url += '?'
        url += 'lat=' + app.story.map.user[ 1 ]
        url += '&'
        url += 'lon=' + app.story.map.user[ 0 ]

        let options = { mode : 'cors' }

        fetch( url, options )
          .then( response => response.json() )
          .then( data => {

            if ( app.variables.result )
              delete app.variables.result

            app.variables.result = data
            app.element.dataset.wouldVanish = data.user_city.would_vanish

            app.variables.update()
            app.story.steps.handle()
            app.story.map.offset.initialize()

          } )
          .catch( error => console.log( error ) )

      },

      controls : {

        bubble : {

          toggle : function( option ) {

            let opacity = option ? .8 : 0;

            if ( map.getLayer( 'actual_deaths' ) )
              map.setPaintProperty( 'actual_deaths', 'circle-opacity', opacity )

          },

          initialize : function() {

            if ( map.getLayer( 'actual_deaths' ) || map.getSource( 'mun_deaths' ) )
              return false

            fetch("data/deaths.geojson")
            	.then(response => response.json())
            	.then(function(data_deaths_centroids) {

            		let max_deaths = data_deaths_centroids.features
            			.map(d => d.properties.deaths)
            			.reduce((max, current_value) =>
            				max >= current_value ?
            				max :
            				current_value
            			);

                if ( !map.getSource( 'mun_deaths' ) ) {

              		map.addSource('mun_deaths', {
              			'type': 'geojson',
              			'data': data_deaths_centroids
              		});

                }

                if ( !map.getLayer( 'actual_deaths' ) ) {

              		map.addLayer({
              			'id': 'actual_deaths',
              			'type': 'circle',
              			'source': 'mun_deaths',
              			'paint': {
              				'circle-color': app.color( 'light-100' ),
              				'circle-opacity': 0,
              				'circle-radius': [
              					'let',
              					'sqrt_deaths',
              					['sqrt', ['get', 'deaths']],

              					[
              						'interpolate',
              						['linear'],
              						['var', 'sqrt_deaths'],
              						1, 1,
              						Math.sqrt(max_deaths), 20,
              					]
              				]
              			}
              		})
                }

            	});
          }

        },

        marker : {

          list : [],

          toggle : function( option, index ) {

            let opacity = option ? 1 : 0;

            let marker = app.story.map.controls.marker.list[ index ]

            if ( marker )
              marker.style.opacity = opacity

          },

          toggleLabel : function( option, index ) {

            let marker = app.story.map.controls.marker.list[ index ]

            if ( marker )
              marker.dataset.label = option

          },

          initialize : function( center, index, label = '' ) {

            if ( app.story.map.controls.marker.list[ index ] )
              return false

            let marker = document.createElement( 'div' )
            marker.classList.add( 'marker' )
            marker.dataset.labelIndex = index
            marker.dataset.labelContent = label
            marker.dataset.label = false

            new mapboxgl.Marker(
              {
                element : marker,
                anchor: index === 0 ? 'center' : 'bottom'
              }
            )
            .setLngLat( center )
            .addTo( map )

            app.story.map.controls.marker.list[ index ] = marker

          }

        },

        labels : {

          element : document.querySelector( '[name="labels"][type="checkbox"]' ),

          opacity : function( option ) {

            const layers = [
              'country-label',
              'state-label',
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

            for ( layer of layers ) {

              if ( map.getLayer( layer ) )
                map.setPaintProperty( layer, 'text-opacity', opacity )

            }

            map.setPaintProperty( 'airport-label', 'icon-opacity', opacity )

          },

          toggle : function( option ) {

            app.story.map.controls.labels.element.checked = option
            app.story.map.controls.labels.opacity( option )

            // let input = app.story.map.controls.labels.element
            //
            // if ( boolean === input.checked )
            //   return false
            //
            // if ( boolean === undefined )
            //   input.checked = !input.checked
            // else
            //   input.checked = boolean
            //
            // input.dispatchEvent( new Event( 'change' ) )

          },

          initialize : function() {

            app.story.map.controls.labels.element.addEventListener( 'change', function() {

              app.story.map.controls.labels.opacity( this.checked )

            } )

          }

        },

        circle : {

          list : [],

          reset : function () {

            let list = app.story.map.controls.circle.list

            for ( let index of list.keys() )
              app.story.map.controls.circle.toggle( false, index )

            // if ( map.getLayer(  'circle' ) ) map.removeLayer(  'circle' )
            // if ( map.getSource( 'circle' ) ) map.removeSource( 'circle' )

          },

          toggle : function( option, index ) {

            let opacity = option ? 1 : 0;
            let name = 'circle' + index

            if ( map.getLayer( name ) )
              map.setPaintProperty( name, 'fill-opacity', opacity )

          },

          initialize : function( inner, outer, index ) {

            app.story.map.controls.circle.reset()

            let name = 'circle' + index

            if ( map.getLayer( name ) )
              return false

            let radius = app.story.map.radius(
              inner,
              outer
            )

            let circle = turf.circle(
              radius.center,
              radius.km
            )

            map.addSource(
            	name,
              {
            		'type': 'geojson',
            		'data': circle
            	}
            )

            map.addLayer(
              {
              	'id': name,
              	'type': 'fill',
              	'source': name,
              	'layout': {},
              	'paint': {
              		'fill-outline-color': app.color( 'highlight' ),
              		'fill-color': 'transparent',
              		'fill-opacity': 0
              	}
              }
            )

            app.story.map.controls.circle.list[ index ] = circle

          },

          fitOnScreen : function( index, pitch = 0 ) {

            let circle = app.story.map.controls.circle.list[ index ]
          	let bbox = turf.bbox( circle )

          	map.fitBounds(
              bbox,
              {
                padding: app.story.map.padding(),
                duration: 6000,
                pitch: pitch
          	  }
            )

          }

        },

        people : {

          toggle : function( options ) {

            for ( let [ property, value ] of Object.entries( options ) ) {

              map.setPaintProperty(
                'people',
                'circle-' + property,
                value
              )

            }

          },

          initialize : function() {
            map.setPaintProperty(
              'people',
              'circle-opacity',
              1
            )
            map.setPaintProperty(
              'people',
              'circle-radius',
              1
            )
            map.setPaintProperty(
              'people',
              'circle-color',
              '#555'
            )

            map.moveLayer("people", "national-park")

          },

          highlight : {

            insideCircle : {

              list : [],

              reset : function() {

                let list = app.story.map.controls.people.highlight.insideCircle.list

                for ( let index of list.keys() )
                  app.story.map.controls.people.highlight.insideCircle.toggle( false, index )

                // if (map.getLayer('mask0')) map.removeLayer('mask0');
                // if (map.getSource('mask0')) map.removeSource('mask0');
                //
                // if (map.getLayer('mask1')) map.removeLayer('mask1');
                // if (map.getSource('mask1')) map.removeSource('mask1');
                //
                // if (map.getLayer('mask2')) map.removeLayer('mask2');
                // if (map.getSource('mask2')) map.removeSource('mask2');

              },

              toggle : function( option, index ) {

                let opacity = option ? .66 : 0
                let name = 'mask' + index

                if ( map.getLayer( name ) )
                  map.setPaintProperty( name, 'fill-opacity', opacity )

              },

              initialize : function( inner, outer, index ) {

                app.story.map.controls.people.highlight.insideCircle.reset()

                let name = 'mask' + index

                if ( map.getLayer( name ) )
                  return false

                let radius = app.story.map.radius( inner, outer )

                let circle = turf.circle(
                  radius.center,
                  radius.km
                )

                let mask = turf.mask( circle )

                map.addSource( name, {
                  'type': 'geojson',
                  'data': mask
                });

                map.addLayer({
                  'id': name,
                  'type': 'fill',
                  'source': name,
                  'paint': {
                    'fill-color': app.color( 'dark-100' ),
                    'fill-opacity': 0
                  }
                });

                map.moveLayer( name, 'road-label')

              }

            },

            someInsideCircle : {

              zoomToHighlight : function( center ) {

                center = center || app.story.map.user

              	// map.zoomTo(18);

              	let center_pt = turf.point(center);
              	// spreading the first deaths in a 100m radius around user location
              	let mini_circle = turf.circle(center_pt, .1);
              	let mini_circle_bbox = turf.bbox(mini_circle);

              	// map.fitBounds(
              	// 	mini_circle_bbox, {
              	// 		padding: {
              	// 			top: 0,
              	// 			left: 0,
              	// 			right: 0,
              	// 			bottom: 0 // 200
              	// 		}
              	// 	});

              	return mini_circle;
              },

              // remove :  function() {
              // 	if (map.getLayer('first-deaths')) {
              // 		// this will sort of make a small shrinking transition, before removing
              // 		map.setPaintProperty('first-deaths', 'circle-radius', 0);
              // 		map.removeLayer('first-deaths');
              // 		map.removeSource('first-deaths');
              // 		first_47 = undefined; // resets first_47
              // 	}
              // },

              toggle : function( option, name ) {

                let opacity = option ? 1 : 0;
                map.setPaintProperty( name, 'circle-opacity', opacity );


                // map.getLayer( name )

              },

              initialize : function( amount, name ) {

                if ( map.getLayer( name ) )
                  return false

                let circle = app.story.map.controls.people.highlight.someInsideCircle.zoomToHighlight()

              	let features_to_avoid = map.queryRenderedFeatures({
              		layers: ["water", "landuse", "national-park"]
              	});

              	let circle_livable;

              	if (features_to_avoid.length > 1) {
              		let poly_features_to_avoid = turf.union(...features_to_avoid);
              		circle_livable = turf.difference(circle, poly_features_to_avoid);
              	} else circle_livable = circle;

              	let bboxCircle = turf.bbox(circle);

              	let random_points = turf.randomPoint(amount, {
              		bbox: bboxCircle
              	});

              	let inside_points = turf.pointsWithinPolygon(random_points, circle_livable);

              	if (inside_points) {
              		if (first_47) {
              			first_47.features = [...first_47.features, ...inside_points.features]
              		} else first_47 = inside_points;
              	}
              	let nof_inside_points = first_47.features.length;
              	let tries = 0;

              	//test if points are inside livable area of circle
              	while (nof_inside_points < amount) {
              		let extra_point = turf.randomPoint(1, {
              			bbox: bboxCircle
              		});
              		let extra_point_within = turf.pointsWithinPolygon(extra_point, circle_livable);
              		if (extra_point_within) {
              			if (first_47) first_47.features = [...first_47.features, ...extra_point_within.features];
              			else first_47 = extra_point_within;
              			nof_inside_points++;
              		}
              		tries++
              		if (tries >= 10000) break;
              	};

              	if (!map.getLayer( name )) {
              		map.addSource( name , {
              			'type': 'geojson',
              			'data': first_47
              		});

              		map.addLayer({
              			'id': name,
              			'type': 'circle',
              			'source': name,
              			'paint': {
              				'circle-radius': amount === 1 ? 5 : 3,
              				'circle-color': 'white',
                      'circle-opacity': 0
              			}
              		});

                  map.moveLayer(name, 'road-label')

              	} else {
              		map.getSource(name).setData(first_47);
              	}
              }

            }

          }

        },

        location : {

          load : function() {

            if ( !map.getSource( 'mun' ) ) {

              map.addSource(
                'mun',
                {
                  'type' : 'vector',
                  'url' : 'mapbox://tiagombp.79ib2kza'
                }
              )

            }

            if ( !map.getLayer ( 'municipalities' ) ) {

              map.addLayer({
                  'id': 'municipalities',
                  'type': 'fill',
                  'source': 'mun',
                  'source-layer': 'municipalities', //
                  'paint': {
                      'fill-opacity' : 0,
                      'fill-outline-color' : 'transparent',
                      'fill-color' : 'transparent'
                  }
              },
              'road-label');

            }

          },

          centerHighlightAndFit : function( bbox, code, animation ) {

            app.story.map.controls.location.fitOnScreen( bbox, animation )

            app.story.map.controls.location.highlight( code )

            // map.once('idle', function() { // makes sure there's no more camera movement and that all tilesets are loaded
            // 	app.story.map.controls.location.fitOnScreen(code)
            // })

          },

          fitOnScreen : function( bbox, animation = true ) {

            map.fitBounds(
              bbox, {
                animate: animation,
                linear: false, // false means the map transitions using map.flyTo()
                speed: 1,
                padding: app.story.map.padding(),
                pitch: 0
              });

          },

          reset : function() {

            if ( map.getLayer(  'highlighted_city' ) ) map.removeLayer(  'highlighted_city' )
            if ( map.getSource( 'highlighted_city' ) ) map.removeSource( 'highlighted_city' )
            if ( map.getLayer( 'city-mask' ) ) map.removeLayer( 'city-mask' )
            if ( map.getSource( 'city-mask' ) ) map.removeSource( 'city-mask' )

          },

          highlight : function(code) {

            app.story.map.controls.location.reset()

            if ( !code )
              return false

            // pass city code to highlight, or
            // "" to remove any existing highlights
            // color is hard-coded in 'fill-outline-color'

            app.story.map.controls.location.load()

          	map.addLayer( {
          			'id': 'highlighted_city',
          			'type': 'fill',
          			'source': 'mun', //'composite',
          			'source-layer': 'municipalities', //
          			'paint': {
          				'fill-opacity': .33,
          				// 'fill-outline-color': app.color( 'highlight' ),
          				'fill-color': app.color( 'highlight' )
          			},
          			'filter': ['==', 'code_muni', '']
          		},
          		'road-label');


            map.setFilter(
            	'highlighted_city', [
            		'==',
            		['get', 'code_muni'],
            		code
              ]);

            // mask map beyond city boundaries
            map.once('idle', function() {

              let municipalities = map.querySourceFeatures('mun', {sourceLayer: 'municipalities'});

              let features = municipalities.filter(d => d.properties.code_muni == code)

              let city_polygon = turf.union(...features);

              let city_mask = turf.mask( city_polygon );

              if (!map.getSource('city-mask')) {
                map.addSource('city-mask', {
                    'type': 'geojson',
                    'data': city_mask
                });

                map.addLayer({
                    'id': 'city-mask',
                    'type': 'fill',
                    'source': 'city-mask',
                    'paint': {
                        'fill-color': 'black',
                        'fill-opacity': 0.55,
                        'fill-outline-color': 'transparent'
                    }
                },
                'highlighted_city');
              } else {
                  // if a city-mask is already loaded, no need to remove, just update its data to the new city_mask polygon
                  map.getSource('city-mask').setData(city_mask);
              }

            })

          },

          /*

          vanish : function(code) {

            map.setPaintProperty(
            	'highlighted_city',
            	'fill-color',
            	app.color( 'dark-100' )
            )

            map.setPaintProperty(
            	'highlighted_city',
            	'fill-opacity',
            	1
            )

            // map.setPaintProperty(
            // 	'other_cities',
            // 	'fill-color',
            // 	'transparent'
            // )

          },

          vanishAllBelow : function( count ) {

            if ( count === false ) {
              if ( map.getLayer( 'vanishable' ) ) map.removeLayer( 'vanishable' )
              return false
            }

            app.story.map.controls.location.load()

            if (map.getLayer("highlighted_city")) map.removeLayer("highlighted_city");
            // if (map.getLayer("other_cities")) map.removeLayer("other_cities");

            if (!map.getLayer("vanishable")) {
            	map.addLayer({
            			'id': 'vanishable',
            			'type': 'fill',
            			'source': 'mun',
            			'source-layer': 'municipalities',
            			'paint': {
            				'fill-opacity': 1,
            				'fill-outline-color': 'transparent',
            				'fill-color': app.color( 'dark-100' )
            			},
            			'filter': ['<=', 'pop_2019', '']
            		},
            		'admin-1-boundary-bg');
            }

            map.setFilter(
            	'vanishable', [
            		'<=',
            		[
            			'number',
            			['get', 'pop_2019']
            		],
            		count
            	]);

          }

          */

        }

      }

    },

    begin : function( center ) {

      if ( app.story.carousel.instance )
        app.story.carousel.instance.destroy()

      app.story.carousel.initialize()

      app.pages.open( 'story' )
      app.story.map.initialize( center )

      app.search.suggestions.clear()
      app.search.form.element.reset()
      app.search.input.element.blur()

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

          init : function () {
            setTimeout( app.story.map.offset.update, 100 )
          },

          slideChangeTransitionEnd: function () {
            app.story.steps.handle()
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

    image : {

      size : 800,

      element : document.getElementById( 'poster' ),

      type : 'image/jpeg',

      url : undefined,

      get : {

        url : function ( img ) {

          const canvas = document.createElement( 'canvas' )
          const ctx = canvas.getContext( '2d' )

          canvas.width = app.poster.image.size
          canvas.height = app.poster.image.size

          ctx.drawImage( img, 0, 0 )
          return canvas.toDataURL( app.poster.image.type )

        },

        blob : function ( b64Data, contentType='', sliceSize=512 ) {

          let prefix = 'data:image/jpeg;base64,'
          b64Data = b64Data.slice( prefix.length )

          console.log( b64Data )

          const byteCharacters = atob(b64Data);
          const byteArrays = [];

          for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
          }

          const blob = new Blob(byteArrays, {type: contentType});
          return blob;

        }

      }

    },

    button : {

      element : document.getElementById( 'download' ),

      toggle : function( option ) {

        option = option !== undefined ? option : false
        app.element.dataset.poster = option

      }

    },

    create : function( inner, outer ) {

      let radius = app.story.map.radius(
        inner,
        outer
      )

      let circle = turf.circle(
        radius.center,
        radius.km
      )

      let offset = turf.circle(
        radius.center,
        radius.km * 1.2
      )

      let bbox = turf.bbox( offset )
      let bounds = turf.bboxPolygon( bbox )

      let mask = turf.mask( circle, bounds )

      mask.properties = {
      	'fill': 'black',
      	'fill-opacity': 0.66,
      	'fill-outline-color': '%23d7a565'
      }

      let overlay = JSON.stringify( mask )

      let layers = [
        {
          "id" : "people-overlay",
          "type" : "circle",
          "source" : "composite",
          "source-layer" : "people",
          "paint": {
            "circle-color" :"white",
            "circle-radius" :1 }
          }
      ]

      // generates the static map url
      let url = 'https://api.mapbox.com/styles/v1/tiagombp/ckbz4zcsb2x3w1iqyc3y2eilr/static/'

      url += 'geojson(' + overlay + ')'
      url += '/auto/'
      url += app.poster.image.size + 'x' + app.poster.image.size
      url += '?'
      url += 'access_token=' + app.story.map.token
      url += '&'
      url += 'addlayer=' + encodeURI( JSON.stringify( layers[ 0 ] ) )
      url += '&'
      url += 'before_layer=national-park'

      url = encodeURI( url )

      app.poster.image.element.crossOrigin = 'anonymous';
      app.poster.image.element.src = url;


      // promise and async function to wait for the image to load, and then convert it to dataurl
      function retrieveData() {

      	return new Promise( resolve => {

      		app.poster.image.element.addEventListener( 'load', function( event ) {

            const blob = app.poster.image.get.blob(
              app.poster.image.get.url( event.currentTarget ),
              app.poster.image.type
            )

            console.log( blob )

            app.poster.button.element.href = URL.createObjectURL( blob )

            console.log( URL.createObjectURL( blob ) )

          } )

      		resolve()

      	})

      }

      async function asyncExport() {
      	await retrieveData()
      	return ( app.poster.img )
      }

      return ( asyncExport() )

    },

    initialize : function( inner, outer ) {

      if ( !app.poster.image.url )
        app.poster.create( inner, outer )

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

      document.querySelector( '.next' ).addEventListener( 'click', function() {

        if ( this.classList.contains( 'swiper-button-disabled' ) )
          app.pages.open('poster')

      } )

    }

  },

  initialize : function() {

    app.variables.initialize()
    app.pages.initialize()
    app.cover.initialize()
    app.main.initialize()
    app.search.initialize()
    app.story.initialize()
    app.triggers.initialize()

  }

}

app.initialize()
