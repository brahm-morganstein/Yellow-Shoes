$(document).ready(function() {
  let $body = $('body');
  setTimeout(function(){
let $btn_selected = $body.find('.opt-btn.is-unavailable:checked+.opt-label');
let $btn_not_selected = $body.find('.opt-btn:not(:checked)+.opt-label');
if($btn_selected.length){

  if($btn_not_selected.length){
    $btn_not_selected[0].click();
  }
  setTimeout(function(){
    $btn_selected[0].click();
  }, 100);
}
  }, 100);
  hideOptionWithNoImage();

  //Notify me when available
  document.addEventListener('on:variant:change', (event) => {
    let language           = theme.locale;
    let detail             = event.detail;
    let form               = detail.form;
    let add_to_cart_button = $(form).find('.quantity-submit-row__submit').first();
    let variant            = detail.variant;

    let submit_btn = `
    <button class="btn btn--large add-to-cart w-full" type="submit" name="add" data-add-to-cart-text="Add to cart">
      ${language == 'en' ? 'ADD TO CART' : 'AJOUTER AU PANIER'}
    </button>
  `;

    let availability_btn = `
   <div id="availability-btn" class="availability-btn btn btn--large w-full" data-options='{"touch" : false}' data-fancybox data-src="#availability-reminder-modal" >
      ${language == 'en' ? 'Notify me when available' : 'M\'AVERTIR LORSQUE DISPONIBLE'}
    </div>
  `;

    if (variant.inventory_quantity < 1) {
      $(add_to_cart_button).html(availability_btn);
    } else {
      $(add_to_cart_button).html(submit_btn);
    }
    $body.on('click', '#availability-reminder-submit-btn', function(e){
      e.preventDefault();
      console.log('here')
      $body.find('.availability-reminder-input').removeClass('border-danger');
      $body.find('#availability-reminder-error').attr('style', 'opacity:0;').text('');
      $body.find('[data-target="#agree-to-get-sms"]').removeClass('border-danger');
      $body.find('[data-target="#agree-to-get-sms"]').closest('.custom-checkbox-container').find('.custom-checkbox-label').removeClass('text-danger');
      $.ajax({
               url:      'https://app.yellowshoes.com/api/availability-reminders',
               method:   'POST',
               data:     {
                 action:           'record email',
                 variant_id:       variant.id,
                 email:            $body.find('#availability-reminder-email').val().trim(),
                 phone:            $body.find('#availability-reminder-phone').val().trim(),
                 postal_code:      $body.find('#availability-reminder-zip').val().trim(),
                 signup_for_sms:   $body.find('#agree-to-get-sms')[0].checked ? '1' : '0',
                 signup_for_email: $body.find('#agree-to-get-email')[0].checked ? '1' : '0',

                 language: theme.locale,
               },
               dataType: 'json',
               success:  function(response_data) {
                 if (response_data.success) {
                   $body.find('.fancybox-button').trigger('click');
                   $body.find('.availability-reminder-input:not(#availability-reminder-variant-id)').val('');
                   setTimeout(function() {
                     new Swal({
                                title: '',
                                text:  '',
                                icon:  'success',
                              });
                   }, 250);
                   // $('.fancybox-button')[0].click();
                 } else {
                   if (response_data.fields !== undefined) {
                     for (let el of response_data.fields) {
                       $(el).addClass('border-danger');
                       $('#availability-reminder-error').
                           html(response_data.message).
                           attr('style', 'opacity:1;');
                       if (el == '#availability-reminder-phone-checkbox') {
                         $('[data-target="#agree-to-get-sms"]').addClass('border-danger');
                         $('[data-target="#agree-to-get-sms"]').closest('.custom-checkbox-container').find('.custom-checkbox-label').addClass('text-danger');
                       }
                     }
                   }
                 }
               },
               error:    function(response_data) {
               },
             });
    });


  });

  //Hide Out of Stock Color
  document.addEventListener('on:quickbuy:after-open', (event) => {
    //hideOptionWithNoImage();
    hideOutOfStockColor(event);
  });

  function hideOptionWithNoImage() {
    $('.opt-label--image').each(function(_elementIndex, _element) {
      if ($(_element).find('img').length == 0) {
        $(_element).hide();
      }
    });
  }

  function hideOutOfStockColor(event) {
    let data   = JSON.parse($(event.target).find('product-form').find('script[type="application/ld+json"]').html());
    console.log('DATA',data)
    const is_coming_soon = data.tags.includes('coming-soon');
    let colors = [];
    if (data.offers !== undefined && data.offers) {
      colors = data.offers.map(function(_offer) {
        return _offer.additionalProperty[0].value;
      });
    }
    colors = new Set(colors);
    colors.forEach(function(color) {
      let qty = 0;
      data.offers.forEach(function(offer) {
        if (offer.additionalProperty[0].value == color && offer.availability.includes('InStock')) {
          qty++;
        }
      });
      if (qty == 0 && !is_coming_soon) {
        $(event.target).find('product-form').find('.opt-label--image').each(function(_elementIndex, _element) {
          if ($(_element).html().includes(color)) {
            $(_element).hide();
          }
        });
      }
    });
  }
});