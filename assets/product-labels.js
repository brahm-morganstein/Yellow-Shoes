window.setProductBlockLabels = function () {
    let $body = $('body');
    $body.find('product-block').each(function() {
        let tags            = $(this).attr('data-tags');

        let $product_labels = $(this).find('.product-label-container');
        let labels          = '';
        if($(this).closest('#product-crosssell-carousel').length){
        }
        if ($product_labels.length > 1) {
            for (let i = 1; i < $product_labels.length; i++) {
                labels += $product_labels.eq(i).html();
                $product_labels.eq(i).remove();
            }
        }
        if (tags) {
            Object.keys(app_settings.product_labels).forEach(function(key) {
                let l = app_settings.product_labels[key];
                let tags_to_process = l.tags.split(',');
                for(let tag_to_process of tags_to_process){
                    if (tags.includes(tag_to_process.toLowerCase().trim())) {
                        if (!labels.includes('product-label-' + tag_to_process.toLowerCase().trim())) {
                            labels += `
            <span class="product-label product-label--sale product-label-${tag_to_process.toLowerCase().trim()}">
              <span style="background-color:${l.bg_color};color:${l.fg_color};">${language == 'en' ? l.message : l.message_fr}</span>
            </span>
          `;
                        }
                    }
                }

            });
            if(labels != ''){
                $(this).find('.product-label-container').first().html(labels);
            }

            /*
             let label = app_settings.product_labels.find(function(label){
             return tags.includes(label.tags)
             })
             if(label){
             let html = `
             <span class="product-label product-label--sale product-label-${label.tags}">
             <span style="background-color:${label.bg_color};color:${label.fg_color};">${language == 'en' ? label.message : label.message_fr}</span>
             </span>
             `
             if($(this).find('.product-label-container').first().find(`.product-label-${label.tags}`).first().length == 0){
             // $(this).find('.product-label-container').first().append(html)
             }
             }

             */

        }
    });
}

function setProductPageLabels() {
    let $body = $('body');
    let tags  = $body.find('product-form').data('tags');
    if (!$body.find('.main-image').find('variant-content').find('.product-label-container').length) {
        $body.find('.main-image').find('variant-content').append('<div class="product-label-container"></div>');
    }
    if (tags) {

        let $product_labels = $body.find('.main-image').find('variant-content').find('.product-label-container');

        if ($product_labels.length > 1) {
            for (let i = 1; i < $product_labels.length; i++) {
                $product_labels.eq(0).append($product_labels.eq(i).html());
                $product_labels.eq(i).remove();
            }
        }
        let labels = '';
        Object.keys(app_settings.product_labels).forEach(function(key) {
            let l = app_settings.product_labels[key];
            let tags_to_process = l.tags.split(',');
            for(let tag_to_process of tags_to_process){
                if (tags.includes(tag_to_process.toLowerCase().trim())) {
                if (!labels.includes('product-label-' + tag_to_process.toLowerCase().trim())) {
                    labels += `
            <span class="product-label product-label--sale product-label-${tag_to_process.toLowerCase().trim()}">
              <span style="background-color:${l.bg_color};color:${l.fg_color};">${language == 'en' ? l.message : l.message_fr}</span>
            </span>
          `;
                }
            }
            }
        });
        $body.find('.main-image').find('variant-content').find('.product-label-container').first().append(labels);
        /*
         let label = app_settings.product_labels.find(function(label){
         return tags.includes(label.tags)
         })
         if(label){
         let html = `
         <span class="product-label product-label--sale">
         <span style="background-color:${label.bg_color};color:${label.fg_color};">${language == 'en' ? label.message : label.message_fr}</span>
         </span>
         `
         $(".product-label-container").first().append(html)
         }
         */

    }
}

//product-label-container
$(document).ready(function() {
    let language = Shopify.locale;
    let $body    = $('body');

    //Product Blocks
    setTimeout(function() {
        setProductBlockLabels();
        if (window.location.href.includes('/products/')) {
            setProductPageLabels();
        }
    }, 1000);

    let old_href = window.location.href;
    setInterval(function() {
        if (window.location.href !== old_href) {
            old_href = window.location.href;
            setTimeout(function() {
                setProductBlockLabels();

                if (window.location.href.includes('/products/')) {
                    setProductPageLabels();
                }
            }, 500);
        }
    }, 100);

    document.addEventListener('onurlchanged', function() {
        setTimeout(function() {
            setProductBlockLabels();
        }, 1000);
    });
});

