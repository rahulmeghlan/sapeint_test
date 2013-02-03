$(document).ready(function(){
  insertHeader();
  insertCarousalNavigation();
  $('#carousal_items').tinycarousel();
  navigateCarousal();
  checkEnrollmentInfo();
  validateForm();
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

function validateForm(){
  var isEmpty = false;
  var emptyEls = [];
  $("form").submit(function(){
//    if(!$(".course_name").html().trim()) {
//      alert("Please select a course to enroll");
//      return false;
//    }
    _.each($(".form_input_h"), function(item, index){
      if(!$(item).val().trim()){
        isEmpty = true;
        emptyEls.push(index);
      }
    });
    if(isEmpty){
      showErrorMsg(emptyEls);
      return false;
    }

    if($(".form_input_h").attr("email").trim()) checkEmail();
  });
}

function showErrorMsg(index){
  removeErrorMessages();
  _.each(index, function(val){
    if(val == 0) $("form .name").append("<span class='error_msg'>* Please enter your full name</span>")
    if(val == 2) $("form .email").append("<span class='error_msg'>* Please enter your email</span>")
    if(val == 3) $("form .confirm_email").append("<span class='error_msg'>* Please re-enter your email</span>")
    if(val == 4) $("form .mobile_number").append("<span class='error_msg'>* Please enter your mobile number</span>")
  });
}

function removeErrorMessages(){
  $(".error_msg").remove();
}

function checkEmail(){
  var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9\_]+\.)+[a-zA-Z]{2,}))$/;
  if(pattern.test($(".form_input_h[name='email']").val())) alert("valid");
}