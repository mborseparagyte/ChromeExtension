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
    //$("#setting").toggle();
    getExtractionQueries();
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

function getExtractionQueries() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { greeting: "reqForQueries" }, function(
      response
    ) {
      $("#querySection").empty();
      var queries = response.queries["sourceKeys"],
        queryDivs =
          ' <b style="font-size: 17px;color: #14147C;margin-top: 15px;margin-bottom: 5px;">Settings : </b>';
      Object.keys(queries).forEach((currentQueryKey, index) => {
        var currentQueryVal = queries[currentQueryKey];
        // <div class=""> </div>;
        queryDivs +=
          '<div class ="quesriesParent"> \
                  <div class ="singleQueryparent"> \
                    <div class ="querylable">' +
          toTitleCase(currentQueryKey) +
          ' </div>\
                    <div class ="queryInput"> <input class="textHandler" type="text" value="' +
          currentQueryVal +
          '"  data-key="' +
          currentQueryKey +
          '"></input> </div>\
                  </div>\
                </div>';
      });
      $("#querySection").append(queryDivs);
      $(".textHandler").on("input", function(a, b, c) {
        var queryKey = $(this).attr("data-key"),
          queryVal = $(this).val();
        queries[queryKey] = queryVal;
        setNewQueries(queries);
      });
    });
  });
}

function setNewQueries(updatedQueries) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { greeting: "setNewQueriesData", updatedQueries: updatedQueries },
      function(response) {
        //getExtractionQueries();
      }
    );
  });
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
