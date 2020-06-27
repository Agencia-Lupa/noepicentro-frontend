const app = {

  initialize : function() {

    console.log( 'initialized' )

  }

}

app.initialize()


var swiper = new Swiper('.swiper-container', {
  pagination: {
    el: '.swiper-pagination',
    type: 'progressbar',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
