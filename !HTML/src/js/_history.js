$(document).ready(function() {
    //masonry
    $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: 460,
        gutter: 19,
    });

    //фиксируем timeline
    var $timeline = $(".timeline");
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300 && $timeline.hasClass("default")) {
            $timeline.removeClass("default")
                .addClass("fix");
            //.fadeIn('slow');
            $(".timeline-inv").show();
        } else if ($(this).scrollTop() <= 300 && $timeline.hasClass("fix")) {
            $timeline.removeClass("fix").addClass("default");
            $(".timeline-inv").hide();
        }
    });//end timeline


    //timeline change active
    var menu_selector = ".dates";

    function onScroll() {
        var scroll_top = $(document).scrollTop();
        $(menu_selector + " a").each(function () {
            var hash = $(this).attr("href");
            var target = $(hash);
            if ((target.position().top - 135) <= scroll_top && (target.position().top - 135) + target.outerHeight() > scroll_top) {
                $(menu_selector + " a.active").removeClass("active");
                $(this).addClass("active");
                var lineWidth = ($(this).position().left + $(this).outerWidth());
                $(".blueline").width(lineWidth);
            } else {
                $(this).removeClass("active");
            }
            if($(".one-date.active").length==0){
                $(".blueline").width(0);
            }
        });
    }

    $(document).on("scroll", onScroll);

    $(".one-date").click(function (e) {
        e.preventDefault();

        $(document).off("scroll");
        $(menu_selector + " a.active").removeClass("active");
        $(this).addClass("active");
        var hash = $(this).attr("href");
        var target = $(hash);

        $("html, body").animate({
            scrollTop: (target.offset().top - 135)
        }, 500, function () {
            //window.location.hash = hash;
            $(document).on("scroll", onScroll);

        });

    });

    //end timeline change active

});