
$( document ).ready(function() {

	var $grid = $('.grid').imagesLoaded( function() {
  $grid.masonry({
    itemSelector: '.grid-item',
    percentPosition: true,
    columnWidth: '.grid-sizer'
  }); 
});


});

$(window).scroll(init);

	
function init(){


				
}
