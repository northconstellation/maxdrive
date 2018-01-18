jQuery(document).ready(function($) {
    var $menu = $('#navigation');
    $(window).scroll(function(){
        if ( $(this).scrollTop() > $menu.height() && $menu.hasClass("default") ){
            $menu.removeClass("default").addClass("fixed");
        } else if($(this).scrollTop() <= $menu.height() && $menu.hasClass("fixed")) {
            $menu.removeClass("fixed").addClass("default");
        }
    });

    $('body').on('click', '[data-href]', function(){
        var target = $(this).data('href');
        $('html, body').animate({scrollTop: $(target).offset().top - 30}, 1200);

        var navList = $(this).parents('.navigation').find('.navigation__links');
        if(navList.data('visible') == 1){
            navList.removeClass('is-visible').addClass('is-hidden').data('visible', 0)
        } else if(navList.data('visible') == 0) {
            navList.removeClass('is-hidden').addClass('is-visible').data('visible', 1);
        };

        return false;
    });


    $('.navigation__bar__btn').click(function(){
        var navList = $(this).parents('.navigation').find('.navigation__links');
        if(navList.data('visible') == 1){
            navList.removeClass('is-visible').addClass('is-hidden').data('visible', 0)
        } else if(navList.data('visible') == 0) {
            navList.removeClass('is-hidden').addClass('is-visible').data('visible', 1);
        };
    });
});