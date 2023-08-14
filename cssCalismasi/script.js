var List=[].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
var PopovertipList=List.map(function(x){
  return new bootstrap.Popover(x,{
    container:'body',
    html: true,
  });
})
    var carouselWidth = $(".carousel-inner")[0].scrollWidth;
    var cardWidth = $(".carousel-item").width();
    var scrollPosition = 0;
    $(".carousel-control-next").on("click", function () {
    if (scrollPosition < (carouselWidth - cardWidth * 4)) {
       scrollPosition += cardWidth; 
       $(".carousel-inner").animate({ scrollLeft: scrollPosition },600); 
     }
    });
    var multipleCardCarousel = document.querySelector(
       "#carouselExampleControls"
        );
    if (window.matchMedia("(min-width: 798px)").matches) {

      var carousel = new bootstrap.Carousel(multipleCardCarousel, {
          interval: false,
          wrap: false,
       });
    } else {
    $(multipleCardCarousel).addClass("slide");
    }
$(".carousel-control-prev").on("click", function () {
  if (scrollPosition > 0) {
    scrollPosition -= cardWidth;
    $(".carousel-inner").animate({ scrollLeft: scrollPosition },600);
  }
});
$(document).ready(function(){
  $('[data-toggle="popover"]').popover();   
});
$(function () {
  $('.example-popover').popover({
    container: 'body'
  })
});
