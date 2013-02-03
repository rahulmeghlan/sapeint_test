$(document).ready(function() {
  insertHeader();
  insertCarousalNavigation();
  $('#carousal_items').tinycarousel();
  navigateCarousal();
  checkEnrollmentInfo();
  validateForm();
});
function insertHeader() {
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
    content += "<td>" + user_info.name + "</td>";
    content += "<td>" + user_info.age + "</td>";
    content += "</tr>";
    $(".info_placeholder").append(content);
  });
  content += "</tbody>";
  content += "</table>";
  $(".user_list").html(content);
  $("#userTable").tablesorter();
}
function insertCarousalNavigation() {
  var content;
  _.each(carousal_items, function(item_info, index) {
    content = "<div class='carousal_text_items carousal_navigation_item_h' item_index='" + index + "' style='text-decoration: underline; cursor: pointer'>" + item_info.name + "</div>"
    $(".carousal_navigation").append(content);
  });
}

function navigateCarousal() {
  $(".carousal_navigation_item_h").click(function(e) {
    callCarousal($(e.target).attr("item_index"));
  });
}

function callCarousal(navigateTo) {
  getCourseDetails(navigateTo);
  if (navigateTo == 0) navigateTo = 1;
  if (navigateTo == 3) navigateTo = 2;
  $("#carousal_items").tinycarousel_move(navigateTo);
}

function checkEnrollmentInfo() {
  $(".enroll_now_h").click(function(e) {
    fillForm($(e.target).attr("item_info"))
  })
}

function fillForm(enrollment_type) {
  var courseName;
  switch (enrollment_type) {
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

function getCourseDetails(courseID) {
  var content;
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
  content = "<p style='color: #fff'>" + info.name + "</p>";
  content += "<p>" + info.text + "</p>";
  $(".carousal_text_area").html(content);

}

function validateForm() {
  var isEmpty = false;
  var emptyEls = [];
  $("form").submit(function(e) {
    e.preventDefault();
    clearErrorMessages();
    if (isEmpty) isEmpty = false;
    if (emptyEls.length) emptyEls = [];
//    if(!$(".course_name").html().trim()) {
//      alert("Please select a course to enroll");
//      return false;
//    }
    _.each($(".form_input_h"), function(item, index) {
      if (!$(item).val().trim()) {
        isEmpty = true;
        emptyEls.push(index);
      }
    });
    if (isEmpty) {
      checkErrorMsg(emptyEls);
    }

    if($(".form_input_h[name='mobile']").val().trim() && !isEmpty){
      var isValidMobileNumber = validateMobile($(".form_input_h[name='mobile']").val().trim());
      if(!isValidMobileNumber) showErrorMsg("* Please enter a correct mobile number.");
    }

    if ($(".form_input_h[name='email']").val().trim() && !isEmpty) {
      var isValidEmail = checkValidEmail($(".form_input_h[name='email']").val().trim());
      if(isValidEmail) matchConfirmEmail($(".form_input_h[name='email']").val().trim(), $(".form_input_h[name='confirm_email']").val().trim());
      else showErrorMsg("* Please enter a valid email address.");
    }
  });
}

function checkValidEmail(email) {
  var emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9\_]+\.)+[a-zA-Z]{2,}))$/;
  var isValid = false;
  if (emailPattern.test(email)) isValid = true
  return isValid;

}

function matchConfirmEmail(email, confirm_email){
  if(email.trim() != confirm_email.trim()) showErrorMsg("* Please match email and confirm-email");
}

function validateMobile(mobile_number){
  var pattern = /[0-9]+/g;
  var isValidNumber = false;
  if(mobile_number.length == 10 && pattern.test(mobile_number)) isValidNumber = true;
  return isValidNumber;
}

function checkErrorMsg(index) {
  var msg = "";
  _.each(index, function(val) {
    if (val == 0 || val == 1) msg = "full name, ";
    if (val == 2) msg += "email, ";
    if (val == 4) msg += "mobile number, ";
  });
  msg = msg.slice(0, -2);
  msg += ".";
  showErrorMsg("* Please enter your " + msg);
}

function showErrorMsg(msg) {
  $(".error_msg").html(msg);
}

function clearErrorMessages() {
  $(".error_msg").html("");
}

function checkEmail() {
  var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9\_]+\.)+[a-zA-Z]{2,}))$/;
  if (pattern.test($(".form_input_h[name='email']").val())) alert("valid");
}