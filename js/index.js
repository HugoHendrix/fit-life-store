$(window).scroll(function() {
    var scrollTop = $(this).scrollTop();
    $('.parallax-bg').css('background-position', 'center ' + scrollTop * 0.5 + 'px');
  });
  