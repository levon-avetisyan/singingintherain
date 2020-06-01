$(document).ready(function () {
    let navListItem = $('.navbar-nav>li');
    let navLink = $('.navbar-nav>li>a');
    let urlLocation = window.location.href;
    let page = window.location.pathname;
    let stickyNavTop = $('.navbar').offset().top;

    // Add active class on page change and section change
    $.each(navLink, function (key, value) {
        let currentLink = $(this);
        let href = currentLink.attr('href');
        if (urlLocation.indexOf(href) > -1) {
            $(this).parent().addClass('active')
        } else {
            $(this).parent().removeClass('active');
        }
    });

    // Close nav on link click
    navLink.on('click', function () {
        navListItem.removeClass('active');
        $(this).parent().addClass('active');
        if ($('.navbar-collapse').hasClass('show')) {
            $('.navbar-collapse').collapse('hide');
        }
    });
    $('.navbar-brand').on('click', function () {
        if ($('.navbar-collapse').hasClass('show')) {
            $('.navbar-collapse').collapse('hide');
            $("html, body").animate({scrollTop: 0}, 850);
        }
        if (page == '/' || page == '') {
            $("html, body").animate({scrollTop: 0}, 850);
        } else {
            $(location).attr('href', '/');
            $("html, body").animate({scrollTop: 0}, 850);
        }
    });

    //Nav click slick smooth scroll custom
    $('a.nav-link').on('click', function () {
        let target = $(this.hash);
        $('html,body').animate({
            scrollTop: target.offset().top
        }, 850)
    });

    // Assign active class to nav links while scrolling
    $('body').scrollspy({target: '#siteNav', offset: 60});

    // Hamburger click
    $('.navbar-toggler').on("click", function () {
        $('.toggle').toggleClass('clicked');
    });

    // Animate on page change
    $('body').addClass('animated');

    // Illumination effect
    let box = $('.box');
    let originalBg = box.css("background-color");
    let lightColor = "rgba(255,255,255,0.85)";
    let gradientSize = 250;
    box.each(function () {
        $(this).on('mousemove', function (e) {
            let x = e.pageX - this.offsetLeft;
            let y = e.pageY - this.offsetTop;
            let xy = x + " " + y;
            let bgWebKit = "-webkit-gradient(radial, " + xy + ", 0, " + xy + ", " + gradientSize + ", from(" + lightColor + "), to(rgba(255,255,255,0.0))), " + originalBg;
            let bgMoz = "-moz-radial-gradient(" + x + "px " + y + "px 45deg, circle, " + lightColor + " 0%, " + originalBg + " " + gradientSize + "px)";
            $(this)
                .css({background: bgWebKit})
                .css({background: bgMoz});
        }).mouseleave(function () {
            $(this).css({background: originalBg});
        });
    });

    // Sticky nav
    let stickyNav = function () {
        let scrollTop = $(window).scrollTop();
        if (scrollTop > stickyNavTop) {
            $('.navbar').addClass('sticky');
            $('body').addClass('nav-fixed');
        } else {
            $('.navbar').removeClass('sticky');
            $('body').removeClass('nav-fixed');
        }
    };
    stickyNav();

    $(window).scroll(function () {
        stickyNav();
    });
});

