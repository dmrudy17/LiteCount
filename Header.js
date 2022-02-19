(function ($) {
    "use strict";

    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });
})(jQuery);

// In HTML file should include 
// <body data-spy="scroll" data-target=".navbar" data-offset="51" oncontextmenu="return false;">