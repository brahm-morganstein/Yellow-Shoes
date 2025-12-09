$(document).ready(function(){
  if(!window.location.href.includes('/products/')){       
    
    function setProductSizes(){
      //set sizes
      $('fieldset').each(function(){
        let option = $(this).data('option')
        if(option == 'size'){
          let label = $(this).find('legend')
          let html = $(label).html();
          let value = $(".opt-label").first().find('span').html().trim();
          html += `<span class="option-selector__label-value js-size-text">${value}</span>`
          $(label).html(html)
        }    
      }); 
    }
  
    function updateProductSizes(currentVariant){
      //Update Size option
      $('fieldset').each(function(){
        let option = $(this).data('option')
        if(option == 'size'){
          let label = $(this).find('legend')
          let span = $(label).find('span');
          $(span).html(`${currentVariant.option1}`)
        }    
      }); 
    }

    function setOnVariantChangeListener(){
     document.addEventListener('on:variant:change', (event) => {
        let currentVariant = event.detail.variant;
        updateProductSizes(currentVariant)
     
      }); 
    }
    
    document.addEventListener('on:quickbuy:after-open', (event) => {
        //console.log(event)   
        setProductSizes()
        setOnVariantChangeListener()
    });
    
    
  }
})