function loadData() {
  //expanding skills information
  if (
    $("[aria-controls='top-card-summary-treasury']")
      .text()
      .indexOf("Show more") != -1
  )
    $("[aria-controls='top-card-summary-treasury']").trigger("click");
  //expandinf profile information
  $("[data-control-name='contact_see_more']").trigger("click");
  //var obj = ParseJsonInformation();

  $(".pv-top-card-v2-section__contact-info").trigger("click");
  this.setTimeout(() => {
    var obj = ParseJsonInformation();
    $("artdeco-modal .artdeco-dismiss").trigger("click");
    getLoadedData(obj);
  }, 2000);
}
function getLoadedData(obj) {
  var str = "";
  var imageFound = 0;
  for (var dobj in obj["sourceKeys"]) {
    var tempString = obj["sourceKeys"][dobj].toString();
    if (tempString.indexOf("media") != -1) {
      imageFound = 1;
      str +=
        '<div class = "imgClass" ><center><img src = "' +
        tempString +
        '" height="142" width="142" style="margin-left: 27px;border:2px solid #454580"></center></div>';
    } else if (
      tempString.indexOf("(Mobile)") != -1 ||
      tempString.indexOf("(Home)") != -1 ||
      tempString.indexOf("(Work)") != -1
    ) {
      tempString = tempString.match(/[0-9-]/g).join("");
      obj["sourceKeys"][dobj] = tempString;
      str +=
        '<div class = "containerClass"><span class = "spanClass" style= "display: inline-block; width: 100%; text-transform: capitalize;"><b>' +
        dobj +
        '</b></span> <input type = "text" class = "textClass" value = "' +
        tempString +
        '" readonly = "true" style= "width: 303px;"></div><br/>';
    } else if (tempString) {
      if (tempString[0] == ",") tempString = tempString.replace(/,/g, "");
      else if (tempString.indexOf("Edit") != -1)
        tempString = tempString.replace("Edit", "");
      str +=
        '<div class = "containerClass"><span class = "spanClass" style= "display: inline-block; width: 100%; text-transform: capitalize;"><b>' +
        dobj +
        '</b></span> <input type = "text" class = "textClass" value = "' +
        tempString +
        '" readonly = "true" style= "width:100%;"></div><br/>';
    }
  }
  if (!imageFound) {
    tempString =
      "https://static.licdn.com/scds/common/u/images/themes/katy/ghosts/person/ghost_person_180x180_v1.png";
    str =
      '<div class = "imgClass" ><center><img src = "' +
      tempString +
      '" height="142" width="142" style="margin-left: 27px;border:2px solid #454580"></center></div>' +
      str;
  }
  siteUrl = localStorage.getItem("sharepointURL");
  accessKey = localStorage.getItem("accessKey");
  obj["destination"]["destinationUrl"] = siteUrl;
  listName = obj["destination"]["list"];
  loadedSite = obj["sourceUrl"];
  globalObj = obj;
  renderDataToForm();
}
function getWrapperDiv() {
  return '<div\
      class="wrapperDiv"\
      style="\
            position: absolute;\
            top: 0;\
            left: 0;\
            width:  100%;\
            height:  1000%;\
            background: #808080a3;\
            z-index:  9;\
            display: flex;\
            justify-content: center;\
            "\
      >\
      <div class="innerContents" >\
            <div class="closeParent">\
                <img class="closeButton" src="data:image/png;base64,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"/>\
            </div>\
            <div class="candidateform" style="height:100%;">\
            <div class="formTitle">Here are the details:</div>\
              <div class="formValues"></div>\
              <div class="formActions">\
                <button type="button" class="btn btn-primary btn-sm saveAction">Import</button>\
                <div class="loaderParent" > \
                  <div class="loader">\
                    <div class="spinner"></div>\
                    <span class="loaderText">Importing details</span> \
                  </div>\
                  </div>\
              </div>\
              <div class="errorText"></div>\
            </div>\
            <div class="successDivParent">\
              <div class ="successDiv">\
                <div class ="successIcon"> \
                  <img id="successProfile" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAMAAADDpiTIAAAC8VBMVEUAAAAA/wCA/wBVqgCAvwBmzABV1QBttgBgvwBxxgBmzABduQBqvwBixABtyABmuwBgvwBpwwBjxgBrvABmvwBhwgBoxQBkvABqvwBmwgBixABovQBkvwBqwQBmxABrvQBovwBkwQBpwwBmvQBqvwBnwQBlwwBpxABmvwBqwQBnwgBlxABovwBmwQBpwgBnwwBlvwBowQBmwgBpwwBnvwBlwABowgBmwwBnwABlwQBowgBmvwBpwABnwQBlwgBovwBmwABowQBnwgBlvwBnwABmwQBowgBnvwBlwABnwQBmwgBowwBnwABlwQBnwgBmwgBowABnwQBowgBnwgBowQBnwQBowgBnwABmwQBowQBnwgBowABnwQBmwQBowgBnwABowQBnwQBmwgBowABnwQBowQBnwgBmwABnwABmwQBowgBnwABmwABnwQBowgBnwABmwQBnwQBmwgBowABnwQBmwQBnwgBmwABowQBnwQBmwgBnwABmwQBowQBnwgBmwABnwQBmwQBowgBnwABowQBnwQBmwgBnwABnwQBowQBnwgBmwABnwQBnwQBowQBnwABmwQBnwQBnwQBowgBnwQBmwQBnwQBnwgBowABnwQBmwQBnwgBnwABowQBnwQBmwgBnwABnwQBnwgBmwABnwQBnwQBowgBnwABmwQBnwQBnwQBnwABnwQBmwQBnwQBnwABnwQBnwQBmwQBnwABnwQBnwQBowgBnwQBnwQBnwQBnwgBowQBnwQBnwQBnwgBnwQBowQBnwQBnwQBnwQBnwQBowQBnwQBnwQBnwQBnwQBnwQBnwABmwQBnwQBnwQBnwABnwQBmwQBnwQBnwABnwQBnwQBmwQBnwgBnwQBnwQBnwQBmwgBnwQBnwQBnwQBnwQBmwQBnwQBnwQBnwQBnwQBmwQBnwQBnwQBnwQBnwQBnwQBnwQBnwQBnwQBnwQBnwQBnwQBnwQBnwQBnwQBnwQBnwQBnwQBnwQBnwQBnwQBnwQArO7VoAAAA+nRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiMkJSYnKCkqKywtLi8wMTIzNDU2Nzk6Ozw9Pj9AQUJDREVGR0hJSktMTU5PUFFSU1RWV1hZWltcXV5f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" style="\
                  height:  100px;\
                  width: 100px;\
                  "/>\
                </div>\
              <div class ="successText"> </div>\
              </div>\
            </div>\
      </div>\
    </div>';
}
function renderDataToForm() {
  let wrapper = getWrapperDiv();

  $("body").append(wrapper);
  $(".loaderParent").css("display", "none");
  $(".errorText").css("display", "none");
  $(".successDivParent").css("display", "none");

  var data = globalObj["sourceKeys"];
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      //console.log(key + " -> " + data[key].toString().trim());
      $(".formValues").append(
        '\
     <div class ="fieldParent" > \
        <div class ="fieldLabel">' +
          toTitleCase(key) +
          '  </div>\
        <div class ="fieldInput"><textarea class ="textValues">' +
          data[key].toString().trim() +
          "</textarea> </div>\
      </div>\
     "
      );
    }
  }
  $(".closeButton").click(function() {
    $(".wrapperDiv").remove();
  });
  $(".saveAction").click(function() {
    $(this).css("display", "none");
    $(".loaderParent").css("display", "block");
    $(".errorText").css("display", "none");

    var data = globalObj["sourceKeys"];
    var profilePicture = nullCheck(data["profile Picture"]),
      fullName = nullCheck(data["full Name"]),
      currentProfession = nullCheck(data["current Profession"]),
      currentCompany = nullCheck(data["current Company"]),
      address = nullCheck(data["address"]),
      placeToLive = nullCheck(data["place To Live"]),
      industry = nullCheck(data["industry"]),
      educationSummary = nullCheck(data["education Summary"]),
      interest = nullCheck(data["interest"]),
      maritalStatus = nullCheck(data["marital Status"]),
      skills = nullCheck(data["skills"]),
      linkedInId = nullCheck(data["linkedIn Id"]),
      email = nullCheck(data["email"]),
      phone = nullCheck(data["phone"]),
      resume = nullCheck(data["resume"]),
      careerStart = nullCheck(data["career Start"]),
      firstName = "",
      lastName = "";
    (createdDate = new Date().toISOString()), (modifiedDate = createdDate);
    if (fullName) {
      firstName = toTitleCase(fullName.split(" ")[0]);
      lastName = toTitleCase(fullName.split(" ")[1]);
    }
    if (careerStart) {
      careerStart = new Date(careerStart.split("–")[0]).toISOString();
    }
    var data = {
      FirstName: firstName,
      Email: email,
      CurrentDesignation: currentProfession,
      LinkedIn: linkedInId,
      LastName: lastName,
      EducationalNotes: educationSummary,
      Phone: phone,
      CareerStartDate: careerStart,
      ProfilePicture: profilePicture,
      createdDate: createdDate,
      modifiedDate: modifiedDate,
      _CurrentAddress: {
        AddressLine: placeToLive || address
      },
      Source: "LinkedIn profile",
      createdBy: "HR - Paragyte"
    };
    //console.log(data);
    var userLinkedInId = data.LinkedIn;

    if (!userLinkedInId) {
      $(".loaderParent").css("display", "none");
      $(".errorText").text("LinkedIn id not found, please try again!");
      $(".errorText").css("display", "flex");
    } else {
      $.ajax({
        type: "GET",
        url: siteUrl,
        data: {
          filter: { where: { LinkedIn: userLinkedInId } },
          fields: ["id"]
        },
        headers: {
          accesskey: accessKey
        },
        success: function(result) {
          if (result.length) {
            $(".saveAction").css("display", "block");
            $(".loaderParent").css("display", "none");
            $(".errorText").text("Already added!");
            $(".errorText").css("display", "flex");
          } else {
            addCandidateToPortal(siteUrl, data);
          }
        },
        error: function(err) {
          if (err.status == 401) {
            $(".errorText").text("Authentication failed, Access key required!");
          } else {
            $(".errorText").text("Something went wrong! Please try again.");
          }
          $(".saveAction").css("display", "block");
          $(".loaderParent").css("display", "none");
          $(".errorText").css("display", "flex");
        }
      });
    }
  });
}
function addCandidateToPortal(siteUrl, data) {
  var userProfilePicture = data.ProfilePicture;
  $.ajax({
    type: "POST",
    url: siteUrl,
    data: data,
    headers: {
      accesskey: accessKey
    },
    success: function(data) {
      $(".saveAction").css("display", "block");
      $(".loaderParent").css("display", "none");
      $(".errorText").css("display", "none");

      $(".candidateform").css("display", "none");
      if (userProfilePicture) {
        $("#successProfile").attr("src", userProfilePicture);
        $("#successProfile").css("border-radius", "50px");
      }
      $(".successText").text(
        data.FirstName + " details imported successfully! "
      );
      $(".successDivParent").css("display", "flex");
      $(".doneAction").click(function() {
        $(".wrapperDiv").remove();
      });
    },
    error: function(err) {
      if (err.status == 401) {
        $(".errorText").text("Authentication failed, Access key required!");
      } else {
        $(".errorText").text("Something went wrong! Please try again.");
      }
      $(".saveAction").css("display", "block");
      $(".loaderParent").css("display", "none");
      $(".errorText").css("display", "flex");
    }
  });
}
function nullCheck(val) {
  return val == "" || val == "undefined" ? "" : $.trim(val);
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
