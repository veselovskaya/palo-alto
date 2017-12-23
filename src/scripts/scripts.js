$(document).ready(function () {

  if($("#js-index-check").length) {



    $.ajax({
      url: "./mockapi/articles.json",
      success: function(data, status) {
        $.ajax({
          url: "./partials/includes/article.hbs",
          success: function(source, status) {
            var template = Handlebars.compile(source);
            $.each(data, function() {
              $('.container').append(template(this));
            })
            $('.post').last().addClass('last-post');
            $('.post').last().find('.post__header-category').addClass('last-post__header-category')
            $('.post').last().find('.post__header-date').addClass('last-post__header-date')
          }
        })
      },
      error: function(xhr, status, error) {

        console.log(error);
  }
    });
}

$('.header__menu-icon').click(function() {
  if($(this).hasClass("clicked")) {
    $(this).removeClass("clicked");
    $('.slide-menu').animate({
      right: "-240px"
    }, 200);

    $('body').animate({
      right: "0px"
    }, 200);

  }
  else {
    $(this).addClass("clicked");
    $('.slide-menu').animate({
      right: "0px"
    }, 200);

    $('body').animate({
      right: "240px"
    }, 200);
  }
  });
});
