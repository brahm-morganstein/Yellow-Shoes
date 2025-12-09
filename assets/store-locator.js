$(document).ready(function(){
  let language = Shopify.locale
  //store-locator
  var path = window.location.pathname;
  if(path.includes("/fr/apps/store-locator")){
    let params = new URLSearchParams(document.location.search);
    let store_name = params.get("store");
    if(store_name){
      $(".name").each(function(_index,_el){
        if($(_el).html().includes(store_name)){
          setTimeout(function(){
            $(_el).parent().trigger('click');
          },1000);
        }
      });
    }
  
    
    if(language=='fr'){
      $("#address_search").val('');
      $("#address_search").attr('placeholder','Code postal ou ville');
      $('#store-locator-title').html('TROUVEZ UN MAGASIN YELLOW PRÈS DE VOUS ');
      $(".main_search_label").first().html('AVEC PLUS DE 90 MAGASINS, IL Y EN A CERTAINEMENT UN PRÈS DE VOUS');
      $(".search_limit_label").first().html('Résultats');
      $('#submitBtn').html('RECHERCHER');
    }
  
  }
})