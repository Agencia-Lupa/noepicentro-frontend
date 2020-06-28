const app = {

  selector : '.app',

  pages : {

    current : '',

    open : function( name ) {

    },

    close : function( name ) {

    },

    initialize : function() {

    }

  },

  cover : {

    initialize : function() {

    }

  },

  main : {

    initialize : function() {

    }

  },

  search : {

    geolocation : {

      send : function( position ) {

        console.log( position )
        alert( position.coords.latitude + ', ' + position.coords.longitude )

      },

      get : function() {

        if ( navigator.geolocation )
          navigator.geolocation.getCurrentPosition( app.search.geolocation.send )

      },

      initialize : function() {

        if ( navigator.geolocation )
          app.element.dataset.geolocation = true
        else
          app.element.dataset.geolocation = false

      }

    },

    initialize : function() {

      app.search.geolocation.initialize()

    }

  },

  story : {

    carousel : {

      instance : undefined,

      selector : '.swiper-container',

      options : {

        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar',
        },

        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
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

      app.story.carousel.initialize()

    }

  },

  poster : {

    initialize : function() {


    }

  },

  triggers : {

    selector : '[data-trigger]',

    initialize : function() {

      let triggers = document.querySelectorAll( app.triggers.selector )

      for ( let trigger of triggers ) {

        trigger.addEventListener( 'click', function() {

          let instructions = this.dataset.trigger

          let f = new Function( instructions )

          return( f() )

        } )

      }

    }

  },

  initialize : function() {

    app.element = document.querySelector( app.selector )

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
