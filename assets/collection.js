
$(document).ready(function(){
  let language = theme.locale
  adjustMoreVariantCount()
  setCollectionPageTitle()
  selectFirstAvailableVariant()
  fixHiddenImages()

  document.addEventListener("onurlchanged",function(){
    setTimeout(function(){
      adjustMoreVariantCount()
      setCollectionPageTitle()
      selectFirstAvailableVariant()
      fixHiddenImages()
    },2000)
  })  

  //
  function adjustMoreVariantCount(){
    let language = theme.locale
    $(".product-block-options__inner").each(function(_elementIndex,_element){
      let available_color_count = $(_element).find('.product-block-options__item:not(.product-block-options__item--unavailable)').length
      let more_count = available_color_count - 3;
      if(more_count > 0){
        let _html = language == 'en' ? `+ ${more_count} more` : `+ ${more_count} de plus`
        $(_element).find('.product-block-options__more-label').first().html(_html) 
      }else{
        $(_element).find('.product-block-options__more-label').first().html(``)
      }
    })
  } 

  //
  function setCollectionPageTitle(){
    let $body = $('body');
    let page_title = '';
    let $page_title = $body.find('.pagetitle');
    if($page_title.length > 0){
      page_title = $page_title.html().trim()
    }
    let params = new URLSearchParams(location.search)
    let color = params.get('filter.v.option.color')
    let size = params.get('filter.v.option.size')
    if(language == 'en'){
      if($page_title.length > 0) {
        $page_title.html(`${page_title}${color ? ` in ${color}` : ''}${size ? ` Size ${size}` : ''}`)
      }
    }else{
      if(color){
        let tcolor = app_settings.color_translations.find(function(_color){
          return _color.color_en.toLowerCase() == color.toLowerCase()
        }) 
        if(tcolor){
          color = tcolor.color_fr.toLowerCase()
        }
      }
      if($page_title.length > 0) {
        $page_title.html(`${page_title}${color ? ` en ${color}` : ''}${size ? ` pointure ${size}` : ''}`)
      }
    }
  }

  //
  function selectFirstAvailableVariant(){
    $(".product-block-options__inner").each(function(_elementIndex,_element){
      let element = $(_element).find('.product-block-options__item:not(.product-block-options__item--unavailable)').first();
      let media = element.data('media');
      //console.log(media)
      let block = $(_element).closest('.block-inner-inner');
      //console.log(block.find('.product-block__image').length);
      block.find('.product-block__image').each(function(_imageIndex,_imageElement){
        if($(_imageElement).data('hover') != 1){
          $(_imageElement).removeClass('product-block__image--show-on-hover');  
        }
        if($(_imageElement).data('media-id') == media){
          $(_imageElement).addClass('product-block__image--active');
          $(_imageElement).removeClass('product-block__image--inactivated');
          $(block.find('.product-block__image')[_imageIndex+1]).removeClass('product-block__image--inactivated')
          $(block.find('.product-block__image')[_imageIndex+1]).addClass('product-block__image--show-on-hover')
          $(block.find('.product-block__image')[_imageIndex+1]).data('hover',1);
          //console.log(block.find('.product-block__image')[_imageIndex+1])
        }
      })

    });
  }

  //
  function fixHiddenImages(){
    //console.log('fixhiddenimages')
    setTimeout(function(){
          $(".product-block__image").each(function(_elementIndex,_element){
      //console.log('element',_element)
      let image_conatiner = $(_element).find('.img-ar--contain').first()
      let imgs = image_conatiner.find('img')
      if(imgs.length == 1){
        imgs.each(function(_imgIndex,_img){
          let data_manual = $(_img).data('manual-src');
          if(data_manual){
            $(_img).attr('src',data_manual)
          }
        })
      }
    })
    },2000)
  }
});

