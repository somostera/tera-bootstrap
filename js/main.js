jQuery(document).ready(function($) {

  $('ul.nav > li > a').click(function (e) {
    e.preventDefault();
    var curLink = $(this);
    var scrollPoint = $(curLink.attr('href')).position().top;

    $('body,html').animate({
      scrollTop: scrollPoint
    }, 1000);
  })
  $(window).scroll(function () {
    onScrollHandle();
  });

  function onScrollHandle() {
    var currentScrollPos = $(document).scrollTop();

    $('ul.nav > li > a').each(function () {
      var curLink = $(this);
      var refElem = $(curLink.attr('href'));

      if (refElem.position().top <= currentScrollPos && refElem.position().top + refElem.height() > currentScrollPos) {

        $('ul.nav > li').removeClass("active");

        curLink.parent().addClass("active");
      }
      else {
        curLink.parent().removeClass("active");
      }
    });
  }

});