$(document).ready(function(){
  insertHeader();
  insertCarousalNavigation();
  $('#carousal_items').tinycarousel();
  navigateCarousal();
  checkEnrollmentInfo();
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
  getCourseDetails(navigateTo);
  if(navigateTo == 0) navigateTo = 1;
  $("#carousal_items").tinycarousel_move(navigateTo);
}

function checkEnrollmentInfo(){
  $(".enroll_now_h").click(function(e){
    fillForm($(e.target).attr("item_info"))
  })
}

function fillForm(enrollment_type){
  var courseName;
  switch(enrollment_type){
    case "1":
        courseName = "Distinguished Technologies";
      break;
    case "2":
      courseName = "Mobile Solutions";
      break;
    case "3":
      courseName = "HTML-5 Canvas";
      break;
    case "4":
      courseName = "Domain Expertise";
      break;
    default :
      break;
  }
  $(".course_name").html(courseName);
}

function getCourseDetails(courseID){
//  var url = "";
//  switch(courseID){
//    case "1":
//      break
//    case "2":
//      break
//    case "3":
//      break
//    case "4":
//      break
//    default :
//      break
//  }
//  $.ajax({
//    url : url,
//    success:function(response){
//      console.log(">>>> Checking the response in the success state : ");
//      console.log(response);
//      $(".carousal_text_area").html(info.text);
//    },
//    error:function(response){
//      console.log(">>>> Checking the response in the error state : ");
//      console.log(response);
//    }
//  });
  $(".carousal_text_area").html(info.text);

}