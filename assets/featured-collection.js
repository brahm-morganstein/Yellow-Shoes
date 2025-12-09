//featured-collection.liquid sections code

$(document).ready(function() {
  let $body = $('body');
  $body.on('click', '.small-feature-link', function() {
    let $this = this;
    $(this).closest('.megint-slider').find('.small-feature-link').removeClass('selected-featured-link');
    $(this).addClass('selected-featured-link');
    //
    let tag            = $(this).attr('data-tag');
    if(!tag){
      return
    }
    let amountFeatItem = 0;
    $(this).closest('.megint-slider').find('.featured-product-block').each(function(_index) {
      var element_tags = $(this).data('tags');
      if (element_tags.includes(tag)) {
        $(this).parent().removeClass('hidden');
        amountFeatItem++;
      } else {
        $(this).parent().addClass('hidden');
      }
    });
    setTimeout(function() {
      for (let i = 0; i < 100; i++) {
        if ($($this).closest('carousel-slider').find('button[name=prev]').length) {
          $($this).closest('carousel-slider').find('button[name=prev]')[0].removeAttribute('disabled');
          $($this).closest('carousel-slider').find('button[name=prev]')[0].click();
        } else {
          i = i > 0 ? i-- : i;
        }
      }
    }, 600);
  });

});

