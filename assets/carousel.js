$(document).ready(function(){
  let $body = $('body');
  if(window.innerWidth < 600){
    return;
  }

  //Intersection Observer
  let observerOptions = {
    rootMargin: '0px',
    threshold: 0.5
  }
  var observer = new IntersectionObserver(observerCallback, observerOptions);

  function observerCallback(entries, observer) {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        //do something
        if($(entry.target).attr('inactive') != undefined){
          $(entry.target).find('.carousel-prev-btn').remove()
          $(entry.target).find('.carousel-next-btn').remove()
        }
      }
    });
  };

  let carousels = $body.find("carousel-slider");
  carousels.each(function(indexCarousel,elementCarousel){
    observer.observe(elementCarousel);
    //Hide buttons
    let header = $(elementCarousel).find('.hometitle').first()
    if(header.length ==1){
      let buttons = header.find('button');
      buttons.each(function(indexBtn,elementBtn){
        $(elementBtn).hide()
      })
    }
    //New previous and next (caret) buttons
    let prev = `
      <button style="position:absolute;left:-45px;top:45%;" class="carousel-prev-btn">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left" aria-hidden="true" focusable="false" role="presentation">
          <path d="m15 18-6-6 6-6"></path>
        </svg>      
      </button>
    `

    let next = `
      <button style="position:absolute;right:-45px;top:45%;" class="carousel-next-btn">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right" aria-hidden="true" focusable="false" role="presentation">
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </button>
    `
    //Append new buttons to carousel
     if(!$(this).closest('.key-features-section').length){
      //Append new buttons to carousel
      $(elementCarousel).append(prev)
      $(elementCarousel).append(next)
    }
  })

  setInterval(function(){
    $body.find('carousel-slider').each(function(){
      if($(this).find('button[name=prev]').length){
        $(this).find('button[name=prev]')[0].removeAttribute('disabled');
      }
      if($(this).find('button[name=next]').length){
        $(this).find('button[name=next]')[0].removeAttribute('disabled');
      }

    })
  }, 25)
  $body.on('click', '.carousel-prev-btn', function(){
    let carousel = $(this).closest('carousel-slider');



    carousel.find('button[name=prev]').trigger('click')
  });

  $body.on('click', '.carousel-next-btn', function(){

    let carousel = $(this).closest('carousel-slider');

    carousel.find('button[name=next]').trigger('click')
  });

})