$(document).ready(function(){
    var swiper = new Swiper('.top-slider', {
        autoplay: 3000,
        speed: 500,
        pagination: '.top-slider-pagination',
        paginationClickable: true,
        paginationBulletRender: function (swiper, index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        }
    });
    var swiper = new Swiper('.news-slider', {
        slidesPerView: 3,
        width: 900,
        spaceBetween: 22,
        nextButton: '.news-button-next',
        prevButton: '.news-button-prev',
    });
    var swiper = new Swiper('.foto-video-slider', {
        slidesPerView: 1,
        width: 900,
        nextButton: '.foto-video-button-next',
        prevButton: '.foto-video-button-prev',
    });
    var swiper = new Swiper('.insta-slider', {
        slidesPerView: 1,
        width: 908,
        nextButton: '.insta-button-next',
        prevButton: '.insta-button-prev',
    });

    //show&play video
    $('.js-play-video').click(function(){
       /* var w=window.innerWidth;
        var h=(w/16)*9;*/
        var h=window.innerHeight;
        var w=(h/9)*16;
        $('.video iframe')[0].src += "&autoplay=1";
        $('.video-prod').css({"background": "#000"});
        function showVideo() {
            $('.video-cover').hide();
            $('.video').show("slow");
            $('html, body').animate({ scrollTop: $(".video-prod").offset().top }, 500);
            $('.video iframe').css({"width": w, "height": h});
            $('.video-prod').animate({height: h}, 1000);

        }
        setTimeout(showVideo,1000);
        return false;
    });

    //фиксируем шапку при скролле
    var $header = $("header");
    $(window).scroll(function(){
        if ( $(this).scrollTop() > 97 && $header.hasClass("default") ){
            $header.fadeOut('fast',function(){
                $(this).removeClass("default")
                    .addClass("sticky")
                    .fadeIn('slow');
                $('.wrapper').addClass("sticky");
            });
        } else if($(this).scrollTop() <= 97 && $header.hasClass("sticky")) {
            $header.removeClass("sticky").addClass("default");
            $(".sticky-logo").fadeOut('slow');
            $('.wrapper').removeClass("sticky");
        }
    });//scroll

    //аккордеон
    $(".accordeon-ttl").click(function(){
        $(this).parent().find(".accordeon-body").slideToggle();
        if($(this).parent().hasClass("close")){
            $(this).parent().removeClass("close").addClass("open");
        }
        else if ($(this).parent().hasClass("open")){
            $(this).parent().removeClass("open").addClass("close");
        }
    });



});

//карты
ymaps.ready(init);
function init () {
    var myMap1 = new ymaps.Map("map-1", {
        center: [64.538600, 40.518259],
        zoom: 16
    });
    var myMap2 = new ymaps.Map("map-2", {
        center: [55.76, 37.64],
        zoom: 16
    });
    var myPlacemark = new ymaps.Placemark([64.538600, 40.518259], {
        balloonContent: '164417, Россия, Архангельская область, Приморский район, вахтовый поселок Светлый, строение 100',
    }, {
        iconImageHref: 'images/baloon.png',
        iconImageSize: [58, 64],
        iconImageOffset: [-30,-54]
    });
    var myPlacemark2 = new ymaps.Placemark([55.76, 37.64], {
        balloonContent: '163430 Россия, Архангельская область, Приморский р-н, д. Ижма',
    }, {
        iconImageHref: 'images/baloon.png',
        iconImageSize: [58, 64],
        iconImageOffset: [-30,-54]
    });
    myMap1.geoObjects.add(myPlacemark);
    myMap2.geoObjects.add(myPlacemark2);
}