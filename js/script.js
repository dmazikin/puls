$(document).ready(function () {
  $(".carousel__inner").slick({
    speed: 300,
    prevArrow: `<button type="button" class="slick-prev">
        <img src="img/icons/arrow-left.svg" alt="" />
      </button>`,
    nextArrow: `<button type="button" class="slick-next">
        <img src="img/icons/arrow_right.svg" alt="" />
      </button>`,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
  $("ul.catalog__tabs").on("click", "li:not(.catalog__tab_active)", function () {
    $(this)
      .addClass("catalog__tab_active")
      .siblings()
      .removeClass("catalog__tab_active")
      .closest("div.container")
      .find("div.catalog__content")
      .removeClass("catalog__content_active")
      .eq($(this).index())
      .addClass("catalog__content_active");
  });
  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".catalog-item__content").eq(i).toggleClass(". catalog-item__content_active");
        $(".catalog-item__list").eq(i).toggleClass(". catalog-item__list_active");
      });
    });
  }
  toggleSlide(".catalog-item__link");
  toggleSlide(".catalog-item__back");
  //modal
  $("[data-modal=consultation]").on("click", function () {
    $(".overlay,#consultation").fadeIn("slow");
  });
  $(".modal__close").on("click", function () {
    $(".overlay,#consultation,#thanks,#order").fadeOut("slow");
  });
  $(".button_mini").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__desc").text($(".catalog-item__subtitle").eq(i).text());
      $(".overlay,#order").fadeIn("slow");
    });
  });

  //функция валидации форм
  function validateForm(forms) {
    $(forms).validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
        },
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: {
          required: "Пожалуйста, введите свое имя",
          minlength: jQuery.validator.format("Введите {0} символа!"),
        },
        phone: "Пожалуйста, введите свой номер телефона",
        email: {
          required: "Пожалуйста, введите свою почту",
          email: "Неправильно введен адрес почты",
        },
      },
    });
  }
  //Вызов функции валидации
  validateForm("#order form");
  validateForm("#consultation-form");
  validateForm("#consultation form");
  //маска инпутов
  $("input[name=phone]").mask("+7 (999) 999-99-99");
  //отправка формы
  $("form").submit(function (e) {
    e.preventDefault();
    if (!$(this).valid()) {
      return;
    }
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");
      $("#consultation,#order").fadeOut();
      $(".overlay,#thanks").fadeIn("slow");
      $("form").trigger("reset");
    });
    return false;
  });
  //скролл вверх
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1600) {
      $(".pageup").fadeIn();
    } else {
      $(".pageup").fadeOut();
    }
  });
  $("a").on("click", function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      event.preventDefault();

      const hash = this.hash;

      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        1600,
        function () {
          window.location.hash = hash;
        }
      );
    }
  });
});
