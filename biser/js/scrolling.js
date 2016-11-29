// Плавная прокрутка

//add-nav

$(document).ready(function(){
   $(".add-nav__btn-link").bind("click", function(e){
      var anchor = $(this);
      $('html, body').stop().animate({
         scrollTop: $(anchor.attr('href')).offset().top
      }, 1000);
      e.preventDefault();
   });
   return false;
});


//main-nav 

$(document).ready(function(){
   $(".inner-nav__link").bind("click", function(e){
      var anchor = $(this);
      $('html, body').stop().animate({
         scrollTop: $(anchor.attr('href')).offset().top
      }, 1000);
      e.preventDefault();
   });
   return false;
});

//duplicate-nav

$(document).ready(function(){
   $(".duplicate-nav__link").bind("click", function(e){
      var anchor = $(this);
      $('html, body').stop().animate({
         scrollTop: $(anchor.attr('href')).offset().top
      }, 1000);
      e.preventDefault();
   });
   return false;
});