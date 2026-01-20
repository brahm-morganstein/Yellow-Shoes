document.addEventListener('on:quickbuy:after-open', (event) => {
 // your code here
  $(".product-ratings").hide();

  $('.sezzle-info').click(function() {
    $('.sezzle-overlay').css('display', 'block');
    $('body').addClass('noscroll');
  });  

  console.log(event)

  //hide unavailable option label image
  const productForm = $(event.target).find('product-form')
  const productTags = $(productForm).data("tags")
  console.log('ProductTags',productTags)
  let opt_labels = $(event.target).find('.opt-label--image')
  opt_labels.each(function(opt_label_index,opt_label){
    let img = $(opt_label).find('img').first();
    let src = img.attr('src');
    let variant_id = getVariantFromImageSrc(src);
    $(".product-block-options__item").each(function(option_item_index,option_item){
      let option_img = $(option_item).find('img').first();
      if(src == option_img.attr('src')){
        if($(option_item).attr('class').includes('product-block-options__item--unavailable')){
          $(opt_label).hide();
        }
      }
    });
  })

  let _url = new URL($(event.target).find('.product-title ').find('a').attr('href'))
  let params = new URLSearchParams(_url.search);
  let color = params.get('color');
  if(color){
    $('.opt-btn').each(function(optionIndex,option){
      if(option.value == color){
        $(option).trigger('click')
      }
    })
  }
  
});

document.addEventListener('on:quickbuy:after-close', (event) => {
 // your code here
  $(".product-ratings").show();
});

function getVariantFromImageSrc(src){
  return src.substring(
    src.indexOf("v=") + 2, 
    src.lastIndexOf("&width")
  );
}