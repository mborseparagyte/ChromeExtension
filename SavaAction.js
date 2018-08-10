document.addEventListener("DOMContentLoaded", function() {
  var crossBtn = document.getElementById("popupCross");
  var linkbtn = document.getElementById("anchor");
  var settingIcon = document.getElementById("settingIcon");
  var candidateBtn = document.getElementById("addCandidate");
  var linkSet = document.getElementById("linkSetting");

  //--------- Cross button Click ----------------------------------------------------
  crossBtn.addEventListener("click", function() {
    window.close();
  });

  //--------- Setting icon Click ----------------------------------------------------
  settingIcon.addEventListener("click", function() {
    $("#setting").toggle();
  });

  userURL = localStorage.getItem("sharepointURL");
  accessKey = localStorage.getItem("accessKey", accessKey);
  if (userURL) {
    $("#siteURL").val(userURL);
    $("#accessKey").val(accessKey);
  }
  //--------- Link submit button Click ----------------------------------------------
  linkSet.addEventListener("click", function() {
    $("#errorText").hide();
    $("#checkURL").show();
    userURL = $("#siteURL").val();
    accessKey = $("#accessKey").val();
    if (userURL) {
      testURL = userURL;
      // + "/Lists/candidate/ChromeExtention.aspx";
      // UrlExists(testURL, function(status) {
      // if (status == 200) {
      $("#checkURL").hide();
      localStorage.setItem("sharepointURL", userURL);
      localStorage.setItem("accessKey", accessKey);
      $("#errorMsg").css("color", "blue");
      $("#errorMsg").text("Details saved ...!");
      $("#errorText").show();
      if (localStorage.getItem("exist") != null)
        setTimeout(function() {
          window.close();
        }, 1000);
      localStorage.setItem("exist", 1);

      //-----------Set Site URL to Background script -------------------------------
      chrome.runtime.sendMessage(
        { greeting: "setSiteURL", siteURL: userURL, accessKey: accessKey },
        function(response) {
          //console.log(response.farewell);
        }
      );
      // } else if (status == 404 || status == 0) {
      //   $("#checkURL").hide();
      //   //localStorage.setItem("sharepointURL","");
      //   $("#errorMsg").css("color", "red");
      //   $("#errorMsg").text("Invalid Link...!");
      //   $("#errorText").show();
      // } else {
      //   localStorage.setItem("sharepointURL", "");
      // }
      //   });
      // } else {
      //   $("#checkURL").hide();
      //   $("#errorMsg").css("color", "red");
      //   $("#errorMsg").text("Enter URL");
    }
  });
});

function UrlExists(url, cb) {
  jQuery.ajax({
    url: url,
    dataType: "text",
    type: "GET",
    complete: function(xhr) {
      if (typeof cb === "function") cb.apply(this, [xhr.status]);
    }
  });
}
