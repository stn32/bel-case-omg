$(document).ready(function () {

    $('form').submit(function () {
        $(this).find('.contacts__btn').attr('disabled', 'disabled')
        if (!$(this).hasClass("header__search") && !$(this).hasClass("search__search")) {
            var id = $(this).attr('id');
            let goal = $(this).attr('data-goal');
            var form = $(this);
            $.ajax({
                type: "POST",
                dataType: 'text',
                url: '/local/templates/acoola/tools/form-handler.php',
                data: $(this).serialize(),

                error: function () {
                    console.log("Error messages");
                },
                success: function (data) {
                    form.find('.contacts__btn').removeAttr('disabled')
                    if (!!goal) {
                        ym(68825455, 'reachGoal', goal);
                    }

                    /* if(data.error == undefined){
                          popup__open('thanks');
                      }*/
                    if (id == "attraction-form") {


                        $(".attraction__step1").slideUp("fast", "linear", function () {
                            $(".attraction__step2").slideDown();
                            var $mq2 = $('.attraction__step2 .popup__close.run-btn .js-run-140').marquee({
                                duration: 10000,
                                startVisible: true,
                                duplicated: true
                            });
                        });

                    } else {
                        $(".popup").hide();
                        var href = "#thanks";
                        var top = $(window).scrollTop() + 100;
                        $('body').addClass("open-popun");
                        $('.mask').each(function (index) {
                            if ($(this).children(".mask__wrap").children(href).length > 0) {
                                $(this).fadeIn("fast", "linear", function () {
                                    $(href).css("top", top);
                                    $(href).fadeIn("fast");

                                });
                            }

                        });

                    }
                    var phone = form.find('input[name="phone"]').val();
                    var fio = form.find('input[name="name"]').val();
                    var sub = 'Отслеживаемая форма обратной связи';
                    var email = form.find('input[name="mail"]').val();
                    var ct_site_id = '54916'; /* ID сайта внутри Calltouch */
                    var ct_data = {
                        fio: fio,
                        phoneNumber: phone,
                        subject: sub,
                        email: email,
                        requestUrl: location.href,
                        sessionId: window.ct('calltracking_params', 'vgxpjhv7').sessionId /* Чтобы определить источник заявки, передаем ID сессии Calltouch sessionId. Вместо wgblo7m9 нужно передавать mod_id скрипта Calltouch. */
                    };

                    /* Выполняем AJAX-запрос */
                    jQuery.ajax({
                        url: 'https://api.calltouch.ru/calls-service/RestAPI/requests/' + ct_site_id + '/register/',
                        dataType: 'json',
                        type: 'POST',
                        data: ct_data,
                        async: false /* Предположим, после отправки формы на сайте настроен редирект на другую страницу, поэтому используем параметр async: false для синхронной отправки запроса */
                    });


                }
            });


            return false;
        }


    });


    if ($(".blog-item2__right").length) {

        var top = $(".blog-item2__right").offset().top;
        var block_height = $(".blog-item2__right-wrap").outerHeight();
        var bottom = $(".blog-item2__right").offset().top + $(".blog-item2__right").outerHeight();
        if ($(window).width() > 768) {
            $(window).scroll(function () {
                var st = $(this).scrollTop();
                if (st > (top - 100) && st < (bottom - block_height - 100) && !$(".blog-item2__right-wrap").hasClass("fixed")) {
                    $(".blog-item2__right-wrap").addClass("fixed");
                    $(".blog-item2__right-wrap").removeClass("bottom");
                }
                if (st > (bottom - block_height)) {
                    $(".blog-item2__right-wrap").addClass("fixed");
                    $(".blog-item2__right-wrap").addClass("bottom");
                } else {
                    $(".blog-item2__right-wrap").removeClass("bottom");
                }
                if (st < (top - 100) && $(".blog-item2__right-wrap").hasClass("fixed")) {
                    $(".blog-item2__right-wrap").removeClass("fixed");
                    $(".blog-item2__right-wrap").removeClass("bottom");
                }

            });
        }

    }


    $(".js-about").click(function () {
        $(this).closest("li").find("span").toggleClass("active");
        $(this).closest("li").find(".header-about").slideToggle();
        return false;
    });


    $(".header__search-open ").click(function () {
        $(".header__search").fadeIn();
        return false;
    });
    $(".header__search-close").click(function () {
        $(".header__search").fadeOut();
        return false;
    });


    $(".js-slidedown").click(function () {
        $(this).toggleClass("active");
        var attr = $(this).attr("href");
        $(attr).slideToggle();
        if ($(this).hasClass("active")) {

            if (attr == "#map") {
                $(this).find("span").html("свернуть карту");
            }
            if (attr == "#rekv") {
                $(this).html("скрыть реквизиты");
            }
        } else {
            if (attr == "#map") {
                $(this).find("span").html("открыть карту");
            }
            if (attr == "#rekv") {
                $(this).html("показать полностью");
            }
        }
        return false;
    });

    $(".case__filter-link").click(function () {
        if (!$(this).hasClass("active")) {
            var attr = $(this).data("name");
            if (attr == "Все проекты") {
                $('.case__block').fadeIn();
            } else {
                $(".case__filter-link").removeClass("active");
                $(this).addClass("active");
                var attr = $(this).data("name");

                $('.case__block').hide();
                $('.case__block').each(function (index, value) {
                    var attr2 = $(this).data("name");

                    if (attr2.includes(attr)) {
                        $(this).fadeIn();
                    }
                });
            }
        }

        return false;

    });


    $(".blog-list2__filter-link").click(function () {
        if (!$(this).hasClass("active")) {
            var attr = $(this).data("name");
            if (attr == "Все") {
                $('.blog-list2__list .blog-list__item').fadeIn();
            } else {
                $(".blog-list2__filter-link").removeClass("active");
                $(this).addClass("active");
                var attr = $(this).data("name");

                $('.blog-list2__list .blog-list__item').hide();
                $('.blog-list2__list .blog-list__item').each(function (index, value) {
                    var attr2 = $(this).data("name");

                    if (attr2.includes(attr)) {
                        $(this).fadeIn();
                    }
                });
            }
        }

        return false;

    });


    $(".burger").click(function () {
        $(this).toggleClass("active");

        $(".header__mobileback").fadeIn("", function () {
            $(".header__mobile").animate({
                right: 0,
            }, 500);
        });


        return false;
    });

    $(".js-burger-close").click(function () {

        $(".burger").toggleClass("active");
        $(".header__mobile").animate({
            right: -800,

        }, 500, function () {
            $(".header__mobileback").fadeOut();
        });


    });

    $(".slidedown__head").click(function () {
        $(this).toggleClass("active");
        $(this).parent(".slidedown").children(".slidedown__body").slideToggle();
    });

    $(".js-scrollto").click(function () {
        var attr = $(this).attr('href');
        if ($(".burger").hasClass("active")) {
            $(".burger").removeClass("active");
            $(".header__mobile").slideUp();
        }

        $('html, body').animate({
            scrollTop: $(attr).offset().top - 100 // РєР»Р°СЃСЃ РѕР±СЉРµРєС‚Р° Рє РєРѕС‚РѕСЂРѕРјСѓ РїСЂРёРµР·Р¶Р°РµРј
        }, 1000); // РЎРєРѕСЂРѕСЃС‚СЊ РїСЂРѕРєСЂСѓС‚РєРё
        return false;
    });


    $(".js-phone_mask").mask("+7(999)999-99-99");

    wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 240,
        mobile: false,
        live: true,
        callback: function (box) {

        },
    })
    wow.init();


    $(window).on('load', function () {
        if ($(".popup-attraction").length) {
            //localStorage.removeItem('showbaraban');
            if (localStorage.getItem("showbaraban") === null) {
                setTimeout(function () {



                    $(".popup").hide();
                    var href = "#popup-attraction";
                    var top = $(window).scrollTop() + 100;
                    $('body').addClass("open-popun");
                    $('.mask').each(function (index) {
                        if ($(this).children(".mask__wrap").children(href).length > 0) {
                            $(this).fadeIn("fast", "linear", function () {
                                $(href).css("top", top);
                                $(href).fadeIn("fast");
                            });
                        }
                    });
                }, 15000);
                localStorage.setItem('showbaraban', 1);
            }
        }



        /*  $('.attraction__form').change(function () {
              if ($(".attraction__form input[name='name']").val() && $(".attraction__form input[name='phone']").val()) {
                  $('.attraction__buttuons .run-btn').addClass("active");
              } else {
                  $('.attraction__buttuons .run-btn').removeClass("active");
              }
          });
          */

        var something = (function () {
            var executed = false;
            return function () {
                if (!executed) {
                    executed = true;
                    var $mq = $('.attraction__buttuons .run-btn.active .js-run-130').marquee({
                        duration: 15000,
                        speed: 100,
                        startVisible: true,
                        duplicated: true
                    });
                }
            };
        })();


        $(".attraction__form input[name='phone']").on('keyup input', function () {
            //alert($(".attraction__form input[name='phone']").val());
            if ($(".attraction__form input[name='name']").val() && $(".attraction__form input[name='phone']").val() && $(".attraction__form input[name='phone']").val().indexOf('_', 1) < 0) {
                $('.attraction__buttuons .run-btn').addClass("active");
                // $('.attraction__buttuons .run-btn .js-run-130').marquee("toggle");


            } else {
                $('.attraction__buttuons .run-btn').removeClass("active");
                // $('.attraction__buttuons .run-btn .js-run-130').marquee("destroy");
                // $mq.marquee('pause');
            }

            if ($('.attraction__buttuons .run-btn').hasClass('active')) {

                something();
            }
        });


        $('.attraction__buttuons .run-btn').click(function () {

            //   ym(52177651, 'reachGoal', 'klik-po-barabanu');
            //$('#popup-attraction .attraction__buttuons button').prop("disabled", false);

            var rand = Math.floor((Math.random() * 1080) + 720);

            $('.baraban img').css('transform', 'rotate(' + rand + 'deg)');

            var number = rand % 360;

            if (number >= 0 && number < 15) {
                prise = "Настройка контекстной рекламы";
            }
            if (number >= 15 && number < 51) {
                prise = "10 000 ₽ на любую услугу";
            }
            if (number >= 51 && number < 87) {
                prise = "15 часов программиста";
            }
            if (number >= 87 && number < 123) {
                prise = "Бесплатная настройка аналитики";
            }
            if (number >= 123 && number < 159) {
                prise = "Разработка нового сайта";
            }
            if (number >= 159 && number < 195) {
                prise = "-50% на любую услугу";
            }
            if (number >= 195 && number < 231) {
                prise = "Аудит для увеличения конверсии";
            }
            if (number >= 231 && number < 267) {
                prise = "Юзабилити аудит сайта";
            }
            if (number >= 267 && number < 303) {
                prise = "-50% на любую услугу";
            }
            if (number >= 303 && number < 339) {
                prise = "Ведение группы в подарок на 1 мес.";
            }
            if (number >= 339 && number < 359) {
                prise = "Настройка контекстной рекламы";
            }

            $(".attraction__form .prise").val(prise);
            $('input.prise').val(prise)

            $(".attraction__step2 .attraction__note").html("<b>Ваш подарок - " + prise + "</b><br /><br />Мы перезвоним вам и расскажем, как забрать подарок!");
            $(".attraction__step2 .prise").html(prise);


        });

    });

    $('.js-popup').click(function () {
        $(".popup").hide();
        var href = $(this).attr("href");
        var data = $(this).attr("data-item");
        var top = $(window).scrollTop() + 100;
        $('body').addClass("open-popun");
        $('.mask').each(function (index) {
            if ($(this).children(".mask__wrap").children(href).length > 0) {
                $(this).fadeIn("fast", "linear", function () {

                    $(href).css("top", top);
                    $(href).fadeIn("fast");
                    $(href + " .form__name").val(data);

                });
            }

        });
        return false;
    });

    $('.js-popup-review').click(function () {
        $(".popup").hide();
        var href = $(this).attr("href");
        var data = $(this).attr("data-item");
        var top = $(window).scrollTop() + 100;
        $('body').addClass("open-popun");
        $(href).fadeIn("fast", "linear", function () {

            $(href + " .mask__wrap").css("top", top);
            $(href + ' .popup').fadeIn("fast");

        });

        return false;
    });

    $('.popup__close').click(function () {
        $(".popup").fadeOut("fast", "linear", function () {
            $(".mask").fadeOut("fast");
            $('body').removeClass("open-popun");

        });
        return false;
    });

    $('.mask__wrap').click(function (event) {
        $(".popup").fadeOut("fast", "linear", function () {
            $(".mask").fadeOut("fast");
            $('body').removeClass("open-popun");

        });
        event.stopPropagation();
        return false;
    });

    $('.popup').click(function (event) {
        event.stopPropagation();
    })

    $('.js-up').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1500);
        return false;
    });


    $('.js-run').marquee({
        duration: 7500,
        startVisible: true,
        duplicated: true
    });


    $('.js-run2').marquee({
        duration: 15000,
        startVisible: true,
        duplicated: true
    });


    $('.js-run3').marquee({
        duration: 10000,
        startVisible: true,
        duplicated: true
    });

    $('.js-run4').marquee({
        duration: 15000,
        startVisible: true,
        duplicated: true
    });

    $('.js-run-120').marquee({
        speed: 120,
        startVisible: true,
        duplicated: true
    });






    $(".services__item").find(".js-run").marquee("toggle");
    $(".services__item").on("mouseover", function (e) {
        $(this).find(".js-run").marquee("toggle");
    });

    $(".services__item").on("mouseleave", function (e) {
        $(this).find(".js-run").marquee("toggle");
    });


    var services_carusel = new Swiper('.js-services-slider .swiper-container', {
        slidesPerView: 1,
        slidesPerColumn: 1,
        spaceBetween: 20,
        loop: false,

        pagination: {
            el: '.js-services-slider .swiper-pagination',
            type: "progressbar",
        },


        navigation: {
            nextEl: '.js-services-slider .swiper-button-next',
            prevEl: '.js-services-slider .swiper-button-prev',
        },


        breakpoints: {
            1280: {
                slidesPerView: 4,
                spaceBetween: 15,
            },
            990: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            580: {
                slidesPerView: 2,
                spaceBetween: 10,
            },

        }
    });

    var blog_special = new Swiper('.js-blog-slider-special .swiper-container', {
        slidesPerView: 1,
        slidesPerColumn: 1,
        spaceBetween: 20,
        loop: false,


        pagination: {
            el: '.js-blog-slider-special .swiper-pagination',
            type: "fraction",
        },


        navigation: {
            nextEl: '.js-blog-slider-special  .swiper-button-next',
            prevEl: '.js-blog-slider-special  .swiper-button-prev',
        },

    });

    var services_carusel_main = new Swiper('.js-services-slider-main .swiper-container', {
        slidesPerView: 1,
        slidesPerColumn: 1,
        spaceBetween: 20,
        loop: false,


        pagination: {
            el: '.main-banner__nav .swiper-pagination',
            type: "fraction",
        },


        navigation: {
            nextEl: '.main-banner__nav  .swiper-button-next',
            prevEl: '.main-banner__nav  .swiper-button-prev',
        },


        breakpoints: {
            1280: {
                slidesPerView: 4,
                spaceBetween: 15,
                pagination: {
                    el: '.main-banner__nav .swiper-pagination',
                    type: "fraction",
                },


                navigation: {
                    nextEl: '.main-banner__nav  .swiper-button-next',
                    prevEl: '.main-banner__nav  .swiper-button-prev',
                },

            },
            990: {
                slidesPerView: 3,
                spaceBetween: 10,
                pagination: {
                    el: '.main-banner__nav .swiper-pagination',
                    type: "fraction",
                },


                navigation: {
                    nextEl: '.main-banner__nav  .swiper-button-next',
                    prevEl: '.main-banner__nav  .swiper-button-prev',
                },
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 10,
                pagination: {
                    el: '.main-banner__nav .swiper-pagination',
                    type: "fraction",
                },


                navigation: {
                    nextEl: '.main-banner__nav  .swiper-button-next',
                    prevEl: '.main-banner__nav  .swiper-button-prev',
                },
            },
            640: {
                slidesPerView: 2.5,
                spaceBetween: 10,
                pagination: {
                    el: '.js-services-slider-main .swiper-pagination',
                    type: "progressbar",
                },
                navigation: {
                    nextEl: '.js-services-slider-main  .swiper-button-next',
                    prevEl: '.js-services-slider-main .swiper-button-prev',
                },
            },
            200: {
                slidesPerView: 1.75,
                spaceBetween: 10,
                pagination: {
                    el: '.js-services-slider-main .swiper-pagination',
                    type: "progressbar",
                },
                navigation: {
                    nextEl: '.js-services-slider-main  .swiper-button-next',
                    prevEl: '.js-services-slider-main .swiper-button-prev',
                },
            },

        }
    });

    var steps_carusel = new Swiper('.js-steps-slider .swiper-container', {
        slidesPerView: 1,
        slidesPerColumn: 1,
        spaceBetween: 20,
        autoHeight: true,
        loop: false,

        pagination: {
            el: '.js-steps-slider .swiper-pagination',
            type: "progressbar",
        },
        navigation: {
            nextEl: '.js-steps-slider .swiper-button-next',
            prevEl: '.js-steps-slider .swiper-button-prev',
        },

        breakpoints: {
            1280: {
                slidesPerView: 4,
                spaceBetween: 15,
            },
            990: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            580: {
                slidesPerView: 1.5,
                spaceBetween: 10,
            },
            30: {
                slidesPerView: 1,
                spaceBetween: 10,
            },

        }
    });


    var team2_carusel = new Swiper('.js-team2-slider .swiper-container', {
        slidesPerView: 1,
        slidesPerColumn: 1,
        spaceBetween: 20,
        autoHeight: true,
        loop: false,

        pagination: {
            el: '.js-team2-slider .swiper-pagination',
            type: "progressbar",
        },
        navigation: {
            nextEl: '.js-team2-slider .swiper-button-next',
            prevEl: '.js-team2-slider .swiper-button-prev',
        },

        breakpoints: {
            1280: {
                slidesPerView: 3,
                spaceBetween: 15,
            },
            990: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            580: {
                slidesPerView: 1.5,
                spaceBetween: 10,
            },
            30: {
                slidesPerView: 1,
                spaceBetween: 10,
            },

        }
    });

    var team2_carusel = new Swiper('.js-vacancies-slider .swiper-container', {
        slidesPerView: 1,
        slidesPerColumn: 1,
        spaceBetween: 20,
        autoHeight: true,
        loop: false,

        pagination: {
            el: '.js-vacancies-slider .swiper-pagination',
            type: "progressbar",
        },
        navigation: {
            nextEl: '.js-vacancies-slider .swiper-button-next',
            prevEl: '.js-vacancies-slider .swiper-button-prev',
        },

        breakpoints: {
            1280: {
                slidesPerView: 3,
                spaceBetween: 15,
            },
            990: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            580: {
                slidesPerView: 1.5,
                spaceBetween: 10,
            },
            30: {
                slidesPerView: 1,
                spaceBetween: 10,
            },

        }
    });


    var cert_carusel = new Swiper('.js-cert-slider .swiper-container', {
        slidesPerView: 1,
        slidesPerColumn: 1,
        spaceBetween: 20,
        autoHeight: true,
        loop: false,

        pagination: {
            el: '.js-cert-slider .swiper-pagination',
            type: "progressbar",
        },
        navigation: {
            nextEl: '.js-cert-slider .swiper-button-next',
            prevEl: '.js-cert-slider .swiper-button-prev',
        },

        breakpoints: {
            1280: {
                slidesPerView: 4,
                spaceBetween: 15,
            },
            990: {
                slidesPerView: 4,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            580: {
                slidesPerView: 1.5,
                spaceBetween: 10,
            },
            30: {
                slidesPerView: 1,
                spaceBetween: 10,
            },

        }
    });


    var why_carusel = new Swiper('.js-why-slider .swiper-container', {
        slidesPerView: 1,
        slidesPerColumn: 1,
        spaceBetween: 20,
        loop: false,

        pagination: {
            el: '.js-why-slider .swiper-pagination',
            type: "progressbar",
        },
        navigation: {
            nextEl: '.js-why-slider .swiper-button-next',
            prevEl: '.js-why-slider .swiper-button-prev',
        },

        breakpoints: {
            1280: {
                slidesPerView: 4,
                spaceBetween: 15,
            },
            990: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            580: {
                slidesPerView: 2,
                spaceBetween: 10,
            },

        }
    });

    var why_carusel3 = new Swiper('.js-why-slider3 .swiper-container', {
        slidesPerView: 1,
        slidesPerColumn: 1,
        spaceBetween: 20,
        loop: false,

        pagination: {
            el: '.js-why-slider3 .swiper-pagination',
            type: "progressbar",
        },
        navigation: {
            nextEl: '.js-why-slider3 .swiper-button-next',
            prevEl: '.js-why-slider3 .swiper-button-prev',
        },

        breakpoints: {
            1280: {
                slidesPerView: 3,
                spaceBetween: 15,
            },
            990: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            580: {
                slidesPerView: 2,
                spaceBetween: 10,
            },

        }
    });

    var why_carusel2 = new Swiper('.js-why-slider2 .swiper-container', {
        slidesPerView: 1,
        slidesPerColumn: 1,
        spaceBetween: 20,
        loop: false,

        pagination: {
            el: '.js-why-slider2 .swiper-pagination',
            type: "progressbar",
        },
        navigation: {
            nextEl: '.js-why-slider2 .swiper-button-next',
            prevEl: '.js-why-slider2 .swiper-button-prev',
        },

        breakpoints: {
            1280: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            990: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            580: {
                slidesPerView: 2,
                spaceBetween: 10,
            },

        }
    });

    var why_carusel1 = new Swiper('.js-why-slider1 .swiper-container', {
        slidesPerView: 1,
        slidesPerColumn: 1,
        spaceBetween: 20,
        loop: false,

        pagination: {
            el: '.js-why-slider1 .swiper-pagination',
            type: "progressbar",
        },
        navigation: {
            nextEl: '.js-why-slider1 .swiper-button-next',
            prevEl: '.js-why-slider1 .swiper-button-prev',
        },

        breakpoints: {
            1280: {
                slidesPerView: 1,
                spaceBetween: 15,
            },
            990: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            580: {
                slidesPerView: 1,
                spaceBetween: 10,
            },

        }
    });


    var cases_carusel = new Swiper('.js-cases-slider .swiper-container', {
        slidesPerView: 1,
        slidesPerColumn: 1,
        spaceBetween: 20,
        loop: false,

        pagination: {
            el: '.js-cases-slider .swiper-pagination',
            type: "progressbar",
        },
        navigation: {
            nextEl: '.js-cases-slider .swiper-button-next',
            prevEl: '.js-cases-slider .swiper-button-prev',
        },

        breakpoints: {
            1280: {
                slidesPerView: 4,
                spaceBetween: 15,
            },
            990: {
                slidesPerView: 4,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            580: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            400: {
                slidesPerView: 1,
                spaceBetween: 10,
            },

        }
    });


    var case_carusel = new Swiper('.js-case-slider .swiper-container', {
        slidesPerView: 1,
        slidesPerColumn: 1,
        spaceBetween: 20,
        loop: false,
        autoHeight: true,
        pagination: {
            el: '.js-case-slider .swiper-pagination',
            type: "progressbar",
        },
        navigation: {
            nextEl: '.js-case-slider .swiper-button-next',
            prevEl: '.js-case-slider .swiper-button-prev',
        },

    });


    var clients_carusel = new Swiper('.js-clients-slider .swiper-container', {
        slidesPerView: 2,
        slidesPerColumn: 1,
        spaceBetween: 20,
        loop: false,

        pagination: {
            el: '.js-clients-slider .swiper-pagination',
            type: "progressbar",
        },
        navigation: {
            nextEl: '.js-clients-slider .swiper-button-next',
            prevEl: '.js-clients-slider .swiper-button-prev',
        },
        breakpoints: {
            990: {
                slidesPerView: 6,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 6,
                spaceBetween: 20,
            },
            640: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            580: {
                slidesPerView: 2,
                spaceBetween: 20,
            },


        }
    });

    var case2_carusel = new Swiper('.js-case-slider2 .swiper-container', {
        slidesPerView: 1,
        slidesPerColumn: 1,
        spaceBetween: 20,
        loop: false,

        pagination: {
            el: '.js-case-slider2 .swiper-pagination',
            type: "progressbar",
        },
        navigation: {
            nextEl: '.js-case-slider2 .swiper-button-next',
            prevEl: '.js-case-slider2 .swiper-button-prev',
        },
        breakpoints: {
            990: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 1.5,
                spaceBetween: 10,
            },
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            580: {
                slidesPerView: 1,
                spaceBetween: 20,
            },


        }
    });


    var reviews_carusel = new Swiper('.js-reviews-slider .swiper-container', {
        slidesPerView: 1,
        slidesPerColumn: 1,
        spaceBetween: 20,
        loop: false,

        pagination: {
            el: '.js-reviews-slider .swiper-pagination',
            type: "progressbar",
        },
        navigation: {
            nextEl: '.js-reviews-slider .swiper-button-next',
            prevEl: '.js-reviews-slider .swiper-button-prev',
        },
        breakpoints: {
            990: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            580: {
                slidesPerView: 1,
                spaceBetween: 20,
            },


        }
    });

    var blog_carusel = new Swiper('.js-blog-slider .swiper-container', {
        slidesPerView: 1,
        slidesPerColumn: 1,
        spaceBetween: 20,
        loop: false,

        pagination: {
            el: '.js-blog-slider .swiper-pagination',
            type: "progressbar",
        },
        navigation: {
            nextEl: '.js-blog-slider .swiper-button-next',
            prevEl: '.js-blog-slider .swiper-button-prev',
        },
        breakpoints: {
            1280: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            990: {
                slidesPerView: 3,
                spaceBetween: 15,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 15,
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            580: {
                slidesPerView: 1,
                spaceBetween: 15,
            },


        }
    });


    var blog_carusel = new Swiper('.js-blog-slider2 .swiper-container', {
        slidesPerView: 1,
        slidesPerColumn: 1,
        spaceBetween: 20,
        loop: false,

        pagination: {
            el: '.js-blog-slider2 .swiper-pagination',
            type: "progressbar",
        },
        navigation: {
            nextEl: '.js-blog-slider2 .swiper-button-next',
            prevEl: '.js-blog-slider2 .swiper-button-prev',
        },
        breakpoints: {
            1280: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            990: {
                slidesPerView: 3,
                spaceBetween: 15,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 15,
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            580: {
                slidesPerView: 1,
                spaceBetween: 15,
            },


        }
    });


    var blog_carusel = new Swiper('.js-blog-slider3 .swiper-container', {
        slidesPerView: 1,
        slidesPerColumn: 1,
        spaceBetween: 20,
        loop: false,

        pagination: {
            el: '.js-blog-slider3 .swiper-pagination',
            type: "progressbar",
        },
        navigation: {
            nextEl: '.js-blog-slider3 .swiper-button-next',
            prevEl: '.js-blog-slider3 .swiper-button-prev',
        },
        breakpoints: {
            1280: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            990: {
                slidesPerView: 3,
                spaceBetween: 15,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            580: {
                slidesPerView: 1,
                spaceBetween: 15,
            },


        }
    });


    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop() / 2;
        if (scrollTop > 10) {
            $("header").addClass("active");
        } else {
            $("header").removeClass("active");
        }

    });

    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop() / 2;
        $(".js-line-1").css("left", scrollTop);


    });


    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop() / 2;
        $(".js-line-2").css("left", -scrollTop);


    });

    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop() / 2;
        $(".clients__decorate").css("transform", "rotate(" + scrollTop + "deg)");


    });


    $(window).scroll(function () {
        var scrollTop = Math.floor($(window).scrollTop() / 400);
        var flag = scrollTop % 2;
        if (flag == 1) {
            $(".steps__item").addClass("active");
        } else {
            $(".steps__item").removeClass("active");
        }

    });

    $(".fancybox").fancybox();


    $('.js-tabb-link').click(function () {
        if (!$(this).hasClass("active")) {

            $(".js-tabb-link").removeClass("active");
            $(this).addClass("active");
            var attr = $(this).attr("href");
            $(".js-tabb-block").hide();
            $(attr).slideDown();
            if ($(window).width() < 768) {

                $('html, body').animate({
                    scrollTop: $(attr).offset().top - 100 // РєР»Р°СЃСЃ РѕР±СЉРµРєС‚Р° Рє РєРѕС‚РѕСЂРѕРјСѓ РїСЂРёРµР·Р¶Р°РµРј
                }, 1000); // РЎРєРѕСЂРѕСЃС‚СЊ РїСЂРѕРєСЂСѓС‚РєРё
            }


        }
        return false;
    });


    $(".js-tabb-block").hide();
    $(".js-tabb .js-tabb-block:first-child").show();

    if ($(".js-fixed").length) {
        var top = $(".js-fixed").offset().top;
        var block_height = $(".js-fixed-block").outerWidth();
        var bottom = $(".js-fixed").offset().top + $(".js-fixed").outerHeight();

        if ($(window).width() > 768) {
            $(window).scroll(function () {
                var st = $(this).scrollTop();

                if (st > top && st < (bottom - block_height)) {
                    $(".js-fixed-block").css("margin-top", st - top);
                }


            });

        }
    }


    if ($(".contacts__right").length) {

        var cont_width = $(".contacts__right").width();

        if ($(window).width() > 768) {
            cont_width = $(".contacts__wrap").width() / 2;
        } else {
            cont_width = $(".contacts__left").width();
        }

        $(".contacts__form-input.--submit button").width(cont_width);

        $(window).resize(function () {
            if ($(window).width() > 768) {
                cont_width = $(".contacts__wrap").width() / 2;
            } else {
                cont_width = $(".contacts__left").width();
            }
            $(".contacts__form-input.--submit button").width(cont_width);
        });
    }


    var total = $(".blog-item2__left .js-Content-title").length;
    if (total > 0) {
        $(window).scroll(function () {
            var wrapper_height = $(".blog-item2__list .js-ProgressBar-wrapper").outerHeight();
            var top = $(this).scrollTop();
            var bottom = top + $(window).height();

            $(".blog-item2__left .js-Content-title").each(function (i) {
                var this_top = $(this).offset().top;
                var next = i + 1;
                var next_top = $(".blog-item2__left .js-Content-title:eq(" + next + ")").offset().top;
                if (next == total) {
                    next_top = $(".blog-item2__left").offset().top + $(".blog-item2__left").outerHeight();
                }
                var height = next_top - this_top;
                var this_bottom = this_top + height;
                var percent = 0;
                if (top >= this_top && top <= this_bottom) {
                    percent = ((top - this_top - 0) / (height - wrapper_height)) * 100;
                } else if (top > this_bottom) {
                    percent = 100;
                    $(".blog-item2__list  .js-ProgressBar-bar:eq(" + i + ") .js-ProgressBar-avancement").css("height", percent + "%");
                }
                if (i == total - 1 && Math.round(this_bottom) <= Math.round(bottom)) {
                    percent = 100;
                }
                $(".blog-item2__list .js-ProgressBar-bar:eq(" + i + ") .js-ProgressBar-avancement").css("height", percent + "%");
                if (percent > 0) {
                    $(".blog-item2__list .js-ProgressBar-bar:eq(" + i + ")").addClass('active');
                    $(".blog-item2__list .js-ProgressBar-bar:eq(" + i + ") .js-ProgressBar-circle").addClass('ProgressBar-circle--active');
                    $(".blog-item2__list .js-ProgressBar-bar:eq(" + i + ") .js-ProgressBar-avancement").addClass('ProgressBar-avancement--active');
                    $(".blog-item2__list .js-ProgressBar-bar:eq(" + i + ") .js-ProgressBar-caption").addClass('ProgressBar-caption--active');
                } else {
                    $(".blog-item2__list .js-ProgressBar-bar:eq(" + i + ")").removeClass('active');
                    $(".blog-item2__list .js-ProgressBar-bar:eq(" + i + ") .js-ProgressBar-circle").removeClass('ProgressBar-circle--active');
                    $(".blog-item2__list .js-ProgressBar-bar:eq(" + i + ") .js-ProgressBar-avancement").removeClass('ProgressBar-avancement--active');
                    $(".blog-item2__list .js-ProgressBar-bar:eq(" + i + ") .js-ProgressBar-caption").removeClass('ProgressBar-caption--active');
                }

            })

        })

    }
    $(document).on('click', '.blog-item2__list .js-ProgressBar-caption', function (e) {
        event.preventDefault();
        $('html,body').animate({
            scrollTop: $(this.hash).offset().top - 100
        }, 240);
    });


    $(".review__filter-link").click(function () {
        if (!$(this).hasClass("active")) {
            var attr = $(this).data("name");
            if (attr == "Все") {
                $('.reviews__item').fadeIn();
            } else {
                $(".review__filter-link").removeClass("active");
                $(this).addClass("active");
                var attr = $(this).data("name");

                $('.reviews__item').hide();
                $('.reviews__item').each(function (index, value) {
                    var attr2 = $(this).data("name");

                    if (attr2.includes(attr)) {
                        $(this).fadeIn();
                    }
                });
            }
        }

        return false;

    });

});
