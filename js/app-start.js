$(document).ready(function(){
  insertHeader();
  insertCarousalNavigation();
  $('#carousal_items').tinycarousel();
  navigateCarousal();
});
function insertHeader(){
  var content;
  content = "<table class='tablesorter' id='userTable'>";
  content += "<thead>";
  content += "<tr>";
  content += "<th>Name</th>";
  content += "<th>Age</th>";
  content += "</tr>";
  content += "</thead>";
  content += "<tbody class='info_placeholder'>";
  _.each(user_list, function(user_info) {
    content += "<tr>";
    content += "<td>"+user_info.name+"</td>";
    content += "<td>"+user_info.age+"</td>";
    content += "</tr>";
    $(".info_placeholder").append(content);
  });
  content += "</tbody>";
  content += "</table>";
  $(".user_list").html(content);
  $("#userTable").tablesorter();
}
function insertCarousalNavigation(){
  var content;
  _.each(carousal_items, function(item_info, index) {
    content = "<div class='carousal_text_items carousal_navigation_item_h' item_index='"+index+"' style='text-decoration: underline; cursor: pointer'>" + item_info.name + "</div>"
    $(".carousal_navigation").append(content);
  });
}

function navigateCarousal(){
  $(".carousal_navigation_item_h").click(function(e){
     callCarousal($(e.target).attr("item_index"));
  });
}

function callCarousal(navigateTo){
  if(navigateTo == 0) navigateTo = 1;
  $("#carousal_items").tinycarousel_move(navigateTo);
}
