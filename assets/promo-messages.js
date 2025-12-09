function setProductBlockPromoMessage(){
  let language = theme.locale;
  $('.product-block').each(function(_pbIndex,_pbElement){
    let show    = true;
    let parents = $(this).parents();
    //dont show icons in "shop the look" block
    parents.each(function(index, element) {
      if ($(element).attr('class') &&
          $(element).attr('class').includes('section-shop-the-look')) {
        show = false;
      }
    });
    
    let tags = $(this).data('tags')?.toLowerCase();
    if(tags){
      app_settings.promo_messages.forEach(function(_promo){
        let promo_tags = _promo.tags.toLowerCase().split(',')
        promo_tags.forEach(function(promo_tag){
          if(_promo.enabled && tags.includes(promo_tag.trim())){
            console.log('tags',tags)
            console.log('promo_tag',promo_tag.trim())
            let message = language == 'en' ? _promo.message : _promo.message_fr;
            let _html = `<div class="_promo" style="color:${_promo.fg_color};">${message}</div>`
            if($(_pbElement).find('.product-block__detail').find('.product-link').first().find('._promo').length == 0){
             $(_pbElement).find('.product-block__detail').find('.product-link').first().append(_html) 
            }
          }          
        })
      }) 
    }
  })
}

function setProductPromoMessage(){
  let language = theme.locale;
  let tags      = $('product-form').data('tags').toLowerCase();
  // console.log('Tags below')
  // console.log(tags)
  let already = [];
  app_settings.promo_messages.forEach(function(_promo){
    // console.log('Promo below')
    // console.log(_promo);
    let promo_tags = _promo.tags.toLowerCase().split(',')
    promo_tags.forEach(function(promo_tag){
      if(_promo.enabled && tags.includes(promo_tag.trim()) && !already.includes(_promo.id)){
        // console.log('Promo found below')
        // console.log(_promo)
        // console.log(promo_tag)
        already.push(_promo.id)
        let message = language == 'en' ? _promo.message : _promo.message_fr;
        let _html = `<div style="color:${_promo.fg_color};">${message}</div>`
        $('product-form').find('.price-container').first().after(_html)
      }          
    })
  })  
}

$(document).ready(function(){
  setProductBlockPromoMessage()

    //Products Page
  if (window.location.href.includes('/products/')) {
    setProductPromoMessage();
    setTimeout(function(){
      setProductBlockPromoMessage();
    },1000)
  }

  document.addEventListener("onurlchanged",function(){
    setProductBlockPromoMessage()
  })  
})