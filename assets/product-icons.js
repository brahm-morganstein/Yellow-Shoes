function setProductBlockIcons() {
  let $body    = $('body');

  $body.find('.product-block').each(function() {
    let show    = true;
    let parents = $(this).parents();
    //dont show icons in "shop the look" block
    parents.each(function(index, element) {
      if ($(element).attr('class') &&
          $(element).attr('class').includes('section-shop-the-look')) {
        show = false;
      }
    });
    let tags = $(this).data('tags');
    if (tags && show) {
      let icon = app_settings.product_icons.find(function(icon) {
        return tags.includes(icon.tags) && icon.active_card;
      });
      console.log('ICON',icon)
      if (icon) {
        let html = '';
        let st = ''
        // if($(window).width() > 900){
        if(icon.position == "top-left"){
          st = `position:absolute;top:30px;left:2%;width:${icon.width}px;height:${icon.width}`;
        }
        if(icon.position == "bottom-left"){
          st = `position:absolute;bottom:2px;left:-16px;width:${icon.width}px;height:${icon.width}px`;
        }   

        if(icon.position == "top-right"){
          st = `position:absolute;top:30px;right:2%;width:${icon.width}px;height:${icon.width}`;
        }
        if(icon.position == "bottom-right"){
          st = `position:absolute;bottom:2px;right:-16px;width:${icon.width}px;height:${icon.width}px`;
        }        
        
        html     = `
            <img class="product-icon" src="https://app.yellowshoes.com/storage/icons/${language == 'en' ? icon.path : icon.path_fr}" style="${st}"/>
          `;
        // }else{
        //   html = `
        //   <img class="product-icon" src="https://app.yellowshoes.com/storage/icons/${language == 'en' ? icon.path : icon.path_fr}" style="position:absolute;top:6px;right:20%;width:48px;height:48px;"/>
        // `
        // }
        if ($(this).find('.image-label-wrap').first().find('.product-icon').first().length == 0) {
          $(this).find('.image-label-wrap').first().append(html);
        }

      }
    }
  });
}

function setProductPageIcons() {
  let $body    = $('body');

  let tags      = $('product-form').data('tags');
  let container = `<div class="product-icon-container" style="display:flex;"></div>`;
  if(! $body.find('#product-icons-container').find('.product-icon-container').length){
    $body.find('#product-icons-container').first().append(container);
  }
  if (tags) {
    let icons = [];
    let html = '';
    let icon_ids = [];
    for(let icon of  app_settings.product_icons){
      let icon_tags = icon.tags.split(',');
      for(let icon_tag of icon_tags){
        if(tags.includes(icon_tag.trim()) && !icon_ids.includes(icon.id) && icon.active_page){
          icon_ids.push(icon.id);
          html += `          
          <div class="product-icon">
          <div class="product-icon-desc">${language == 'en' ? icon.description : icon.description_fr}</div>
          <img src="https://app.yellowshoes.com/storage/icons/${language == 'en' ? icon.path : icon.path_fr}" style="width:60px;height:60px;"/>
          </div>
        `;
        }
      }
    }


    setTimeout(function(){
      if(html != ''){
        $("#product-icons-container-title").show();
      }
      $body.find('#product-icons-container').first().find('.product-icon-container').first().append(html);
    }, 200);

    // let icon = app_settings.product_icons.find(function(icon) {
    //     return tags.includes(icon.tags);
    // });

    // if (icon) {
    //     let html = `
    //   <div class="product-icon">
    //   <div class="product-icon-desc">${language == 'en' ? icon.description : icon.description_fr}</div>
    //   <img src="https://app.yellowshoes.com/storage/icons/${language == 'en' ? icon.path : icon.path_fr}" style="width:60px;height:60px;"/>
    //   </div>
    // `;
    // }
  }
}

$(document).ready(function() {
  let language = Shopify.locale;
  let $body    = $('body');
  //Product Blocks
  setTimeout(function() {
     setProductBlockIcons()
  }, 1500);

  //Products Page
  if (window.location.href.includes('/products/')) {
    setProductPageIcons();
  }

  document.addEventListener('onurlchanged', function() {
    setTimeout(function() {
      setProductBlockIcons()
    }, 1500);
  });



});
