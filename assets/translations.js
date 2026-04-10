$(document).ready(function(){
    let $body = $('body');
    let language = theme.locale

    setTimeout(function(){
        setTranslation()
        setOnVariantChangeListener()
        formatPricing();

    }, 1000);
    document.addEventListener("onurlchanged",function(){
        setTimeout(function(){
            setTranslation()
            formatPricing()
        },2000)
    })

    function formatPricing(){
        if(language!='en'){
            $(".price__current:not(.price-unchangeable)").each(function(){
                let price = $(this).html().trim();
                price = price.replace('$','')
                price = price.replace('.',',')
                if(price!=''){
                    $(this).html(`${price}$`)
                }
            })
            $(".price__was:not(.price-unchangeable)").each(function(){
                let price = $(this).html().trim();
                price = price.replace('$','')
                price = price.replace('.',',')
                if(price!=''){
                    $(this).html(`${price}$`)
                }
            })
            $(".cart-item__selling-price").each(function(){
                let price = $(this).html().trim();
                price = price.replace('$','')
                price = price.replace('.',',')
                if(price!=''){
                    $(this).html(`${price}$`)
                }
            })
            $(".theme-money:not(.price-unchangeable)").each(function(){
                let price = $(this).html().trim();
                price = price.replace('$','')
                price = price.replace('.',',')
                if(price!=''){
                    $(this).html(`${price}$`)
                }
            })
        }
    }

    function setOnVariantChangeListener(){
        document.addEventListener('on:variant:change', (event) => {
            if(language!='en'){
                //Product page option color on variant change
                let variant = event.detail.variant;
                let text = variant.option2;
                let color = app_settings.color_translations.find(function(_color){
                    return _color.color_en.toLowerCase() == text.toLowerCase()
                })
                if(color){
                    $('.js-color-text').first().html(color[`color_${language}`]);
                    $('#mobile-add-to-cart-color').html(color[`color_${language}`])
                }
            }
        });
    }

    function setTranslation(){
        if(language != 'en'){
            //product-block(section) - type
            $body.find(".product-block__type").each(function(){
                let text = $(this).html();
                let type = app_settings.product_types.find(function(_type){
                    return _type.name.toLowerCase() == text.toLowerCase()
                })
                if(type){
                    $(this).html(type[`name_${language}`]);
                }
            })

            //product-block(section) - color option
            $(".product-block-options__item__text").each(function(){
                let text = $(this).html();
                let color = app_settings.color_translations.find(function(_color){
                    return _color.color_en.toLowerCase() == text.toLowerCase()
                })
                if(color){
                    $(this).html(color[`color_${language}`]);
                }
            })

            //Collection Filters
            $(".filter-group__item").each(function(){
                let input = $(this).find('input')
                let input_name = $(input).attr('name')
                //Colors
                if(input_name.includes('color')){

                    let text = '';
                    if($(this).find('span').length > 0){
                        text = $(this).find('span').html().trim()
                    }
                    let color = app_settings.color_translations.find(function(_color){
                        return _color.color_en.toLowerCase() == text.toLowerCase()
                    })
                    if(color){
                        $(this).find('span').html(color[`color_${language}`]);
                    }
                }
                //Sizes
                if(input_name.includes('size')){
                    let text = '';
                    if($(this).find('span').length > 0){
                        text = $(this).find('span').html().trim()
                    }
                    let size = app_settings.size_translations.find(function(_size){
                        return _size.size_en.toLowerCase() == text.toLowerCase()
                    })
                    if(size){
                        $(this).find('span').html(size[`size_${language}`]);
                    }
                }
                //Style & Heel Height & Heel Type & Gender
                if(input_name.includes('style') ||
                   input_name.includes('heel_height') ||
                   input_name.includes('heel_type') ||
                   input_name.includes('gender') ||
                   input_name.includes('features')
                ){
                    let value = $(this).attr('data-tag').toString().replace('-',' ').trim()
                    let style = app_settings.option_translations.find(function(_option){
                        return _option.name_en.toLowerCase() == value.toLowerCase()
                    })
                    if(style){
                        //let html = $(this).find('span').html().replace(style['name_en'],style[`name_${language}`]);
                        $(this).find('span').first().html(style[`name_${language}`])
                    }
                }

            })
            $(".filter-group__applied-item__text").each(function(){
                let value = $(this).html().trim()

                //Colors
                let color = app_settings.color_translations.find(function(_color){
                    return _color.color_en.toLowerCase() == value.toLowerCase()
                })
                if(color){
                    $(this).html(color[`color_${language}`]);
                }

                //Sizes
                let size = app_settings.size_translations.find(function(_size){
                    return _size.size_en.toLowerCase() == value.toLowerCase()
                })
                if(size){
                    $(this).html(size[`size_${language}`]);
                }

                //Style & Heel Height & Heel Type & Gender
                value = value.replace('-',' ').trim()
                let style = app_settings.option_translations.find(function(_option){
                    return _option.name_en.toLowerCase() == value.toLowerCase()
                })
                if(style){
                    //let html = $(this).find('span').html().replace(style['name_en'],style[`name_${language}`]);
                    $(this).html(style[`name_${language}`])
                }

            })
        }
    }

    function translateProductPageOption(){
        if(language!='en'){
            //Products Page Options
            $('fieldset').each(function(){
                let option = $(this).data('option');
                if(option == 'color'){
                    let html = $(this).html().replace('color:','couleur:');
                    $(this).html(html)
                    let text = '';
                    if($(this).find('span').length > 0){
                        text =  $(this).find('span').html().trim()
                    }
                    let color = app_settings.color_translations.find(function(_color){
                        return _color.color_en.toLowerCase() == text.toLowerCase()
                    })
                    if(color){
                        $(this).find('span').html(color[`color_${language}`]);
                        $('#mobile-add-to-cart-color').html(color[`color_${language}`])
                    }
                }
                if(option == 'size'){
                    let label = $(this).find('legend')
                    let html = $(label).html().replace('size','pointure');
                    $(label).html(html)
                }
            })
        }
    }

    function translateProductPageOptionLabel(){
        if(language!='en'){
            //
            $(".opt-label").each(function(){
                let input_for = $(this).attr('for')
                if(input_for.includes('color')){
                    let text = '';
                    if($(this).find('span').length > 0){
                        text =  $(this).find('span').html().trim()
                    }
                    let color = app_settings.color_translations.find(function(_color){
                        return _color.color_en.toLowerCase() == text.toLowerCase()
                    })
                    if(color){
                        let span =  $(this).find('span');
                        if(span !== undefined && span && $(span) !== undefined && $(span)){
                            $(span).html(color[`color_${language}`]);
                        }
                    }
                }
            })
        }
    }

    function translateProductPageType(){
        if(language!='en'){
            //Products Page Type
            let text = '';
            if($(".type-row").html().length > 0){
                $body.find('.type-row').each(function(){
                    text =  $(this).html().trim()
                    let type = app_settings.product_types.find(function(_type){
                        return _type.name.toLowerCase() == text.toLowerCase()
                    })
                    if(type){
                        $(this).html(type[`name_${language}`]);
                    }
                });
            }

        }
    }

    function setCartDrawerTranslation(){
        if(language != 'en'){
            $(".cart-item__variant-label").each(function(){
                let label = $(this).html();
                if(label.includes('color')){
                    $(this).html(label.replace('color','couleur'))
                }
                if(label.includes('size')){
                    $(this).html(label.replace('size','pointure'))
                }
            })
            $('.cart-item__variant-value').each(function(){
                let text = $(this).html();
                let color = app_settings.color_translations.find(function(_color){
                    return _color.color_en.toLowerCase() == text.toLowerCase()
                })
                if(color){
                    $(this).html(color[`color_${language}`]);
                }
            })
        }
    }

    //Products Page
    if(window.location.href.includes('/products/')){
        if(language != 'en'){
            //
            setTimeout(function(){
                setTranslation()
                translateProductPageOptionLabel()
            },500)

            translateProductPageOption()
            translateProductPageType()
        }
    }

    //Cart Page
    if(window.location.href.includes('/fr/cart')){
        setTimeout(function(){
            setTranslation()
            setCartDrawerTranslation()
        },1000)
    }

    document.addEventListener('on:quickbuy:after-open', (event) => {
        translateProductPageOption()
        translateProductPageType()
        setOnVariantChangeListener()
        formatPricing()
    });

    //on:cart-drawer:after-open
    document.addEventListener('on:cart-drawer:after-open', (event) => {
        //console.log(event)
        setTimeout(function(){
            setTranslation()
            setCartDrawerTranslation()
            formatPricing()
        },1500)
    })

    document.addEventListener('on:cart:after-merge', (event) => {
        setTimeout(function(){
            setTranslation()
            setCartDrawerTranslation()
            formatPricing()
        },1500)
    });

    document.addEventListener('on:variant:change', (event) => {
        formatPricing()
    });

})
