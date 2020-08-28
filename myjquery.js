$(document).ready(function () {
  var ul = "<ul></ul>";

  $(".content h1").after(ul);
  var id = 1;

  $("h2").each(function (index, element) {
    var h2Text = $(this).text();
    var valueId = "heading" + id.toString();

    $(element).attr("id", valueId);
    id += 1;

    $("ul").append(
      "<li><a href=" + "#" + valueId + ">" + "<h2>" + h2Text + "</h2></a></li>"
    );
  });
  $("ul").css({ "padding-bottom": "40px" });
});


