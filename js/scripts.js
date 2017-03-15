$(document).ready(function(){
    //index page sliders
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
    //end index page sliders

    //news-slider
    var swiper = new Swiper('.detail-news-slider', {
        slidesPerView: 1,
        width: 940,
        pagination: '.news-slider-pagination',
        paginationClickable: true,
        paginationBulletRender: function (swiper, index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        }
    });
    //end news-slider

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

    //show&play video 940
    $('.js-play-video940').click(function(){
        $('.video iframe')[0].src += "&autoplay=1";
        $('.video-prod').css({"background": "#000"});
        function showVideo() {
            $('.video-cover').hide();
            $('.video').show("slow");
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
                    .fadeIn('normal');
                $('.wrapper').addClass("sticky");
            });
        } else if($(this).scrollTop() <= 97 && $header.hasClass("sticky")) {
            $header.removeClass("sticky").addClass("default");
            $(".sticky-logo").fadeOut('normal');
            $('.wrapper').removeClass("sticky");
        }
    });//scroll

    //футер - клик на подписку
    $(".subscribe-button-text").click(function(){
        $(this).parent().addClass("active");
        $(this).hide();
        $(".subscribe-email").show();
        $(".arrow-img").hide();
        $(".subscribe-arrow-img").show();
    });

    $(document).mouseup(function (e){
        var div = $(".subscribe-button");
        if (!div.is(e.target)
            && div.has(e.target).length === 0) {
            div.removeClass("active");
            $(".subscribe-email").hide();
            $(".subscribe-button-text").show();
            $(".subscribe-arrow-img").hide();
            $(".arrow-img").show();
        }
    });
    //end

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

    //forms
    function focusForm($param) {
        $('.'+$param).on('focusin', function () {
            var input = $(this).children($param);
            if($(this).children(".after").length==0){
                var placeholder = input.attr("placeholder");
                input.attr("plc", placeholder);
                input.attr("placeholder","");
                $(this).append('<div class="after" style="display: none;">'+placeholder+'</div>');
                $(this).children(".after").fadeIn("normal");
            }
        });
        $('.'+$param).on('focusout', function () {
            var input = $(this).children($param);
            if(input.val().length==0){
                var placeholder = input.attr("plc");
                input.attr("placeholder", placeholder);
                $(this).children(".after").remove();
            }
        });
    }

    $(".error").click(function () {
        $(this).val("").removeClass("error");
    });


    focusForm("input");
    focusForm("textarea");

    $(".js-close").click(function () {
        $(this).parent().hide();
    });

    //select
    $(".select").click(function () {
        $(this).toggleClass("open")
            .children(".select-ul").slideToggle();
    });
    $(".select-ul li").click(function () {
        var val = $(this).text();
        var prnt = $(this).parent().parent();
        var placeholder = prnt.children(".select-label").attr("label");
        prnt.children("input").val(val);
        prnt.addClass("selected")
            .children(".select-label").text(val);
        if(prnt.children(".after").length==0){
            prnt.append('<div class="after" style="display: none;">'+placeholder+'</div>')
                .children(".after").fadeIn("normal");
        }

    });
    $(".select").each(function () {
        if($(this).children("input").val().length > 0){
            var val = $(this).children("input").val();
            var placeholder = $(this).children(".select-label").attr("label");
            $(this).addClass("selected")
                .children(".select-label").text(val);
            $(this).append('<div class="after">'+placeholder+'</div>');
            console.log(val);
        }
    });

    $(".file-upload input").change(function () {
        var splittedFakePath = $(this).val().split('\\');
        var name = splittedFakePath[splittedFakePath.length - 1];
        $(this).parent().addClass("checkfile")
            .find(".success").children(".inner").text(name);
    });
    $(".file-upload .del").click(function () {
        $(this).parent().parent().parent().removeClass("checkfile")
            .children("input").val("");
    });


});


