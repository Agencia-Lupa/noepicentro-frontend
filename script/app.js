const app = {

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

    initialize : function() {

    }

  },

  story : {

    carousel : {

      instance : undefined,

      container : '.swiper-container',

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
          app.story.carousel.container,
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

  initialize : function() {

    app.pages.initialize()
    app.cover.initialize()
    app.main.initialize()
    app.search.initialize()
    app.story.initialize()
    app.poster.initialize()

  }

}

app.initialize()
