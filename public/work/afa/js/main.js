
$(document).ready(function(){

  $('.card').on('click', function(e){

    var $this = $(this);
    var targetId = $this.attr('data-content');

    console.log(targetId);

    $this.siblings().removeClass('active').end().addClass('active');

    $('.card-content').hide();

    $('.card-content#' + targetId).show();

    e.preventDefault();

  });


  $('.hexagon').on('click', function(){

    $(this).siblings().removeClass('active').end().addClass('active');

  });

});
