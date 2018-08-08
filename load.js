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
      <div class="innerContents" \
         style="\
            position: fixed;\
            width: 800px;\
            height: 500px;\
            background:  white;\
            margin-top:  80px;\
            padding: 50px;\
            padding-bottom: 40px;\
            ">\
            <div class="formValues"></div>\
            <div class="formActions">\
              <button id="cancel" type="button" class="btn btn-default btn-sm">Cancel</button>\
              <button type="button" class="btn btn-primary btn-sm saveAction">Add</button>\
              <div class="loaderParent" > \
                <div class="loader">\
                  <div class="spinner"></div>\
                  <span class="loaderText">Adding Candidate to bitpod</span> \
                </div>\
                </div>\
            </div>\
            <div class="errorText">Something went wrong! Please try again.</div>\
      </div>\
    </div>';
}
function renderDataToForm() {
  let wrapper = getWrapperDiv();

  $("body").append(wrapper);
  $(".loaderParent").css("display", "none");
  $(".errorText").css("display", "none");

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
  $("#cancel").click(function() {
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
    console.log(data);

    $.ajax({
      type: "POST",
      url: siteUrl,
      data: data,
      headers: {
        accesskey:
          "64c3813f55aaf42258aa8cac7f4b29e611e918e1c9b4010d8bb3bccfac6ef760d7ddb0db44b158280b62b2fbcb809f72"
      },
      success: function(data) {
        $(".saveAction").css("display", "block");
        $(".loaderParent").css("display", "none");
        $(".errorText").css("display", "none");
        $(".wrapperDiv").remove();
      },
      error: function(err) {
        $(".saveAction").css("display", "block");
        $(".loaderParent").css("display", "none");
        $(".errorText").css("display", "flex");
      }
    });
    // $(".wrapperDiv").remove();
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
