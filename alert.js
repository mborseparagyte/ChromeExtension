var obj = {
  sourceUrl: "LinkedIn",
  sourceKeys: {
    "profile Picture": ".pv-top-card-section__photo",
    "full Name": "h1.pv-top-card-section__name",
    "current Profession": "h2.pv-top-card-section__headline",
    "current Company": "h3.pv-top-card-section__company",
    address: "h3.pv-top-card-section__location",
    "place To Live":
      ".pv-profile-section__section-info .ci-address  .pv-contact-info__ci-container",
    industry: ".industry",
    "career Summary": ".pv-top-card-section__summary-text",
    interest: ".interests-listing ",
    // "birth Date":
    //   ".pv-profile-section__section-info .ci-birthday .pv-contact-info__contact-item",
    "marital Status": ".additional-info-listing tr:nth-child(2) td",
    skills: ".pv-skill-category-entity__name span",
    "linkedIn Id":
      ".pv-profile-section__section-info .ci-vanity-url .pv-contact-info__contact-link",
    email:
      ".pv-profile-section__section-info .ci-email .pv-contact-info__contact-link",
    phone:
      ".pv-profile-section__section-info .ci-phone .pv-contact-info__ci-container span:first-child",
    resume: ".connect-menu dd:nth-child(7) a",
    "career Start":
      ".experience-section li:last .pv-entity__date-range span:last"
  },
  destination: {
    type: "SharePoint",
    destinationUrl: "",
    list: "Candidate"
  },
  sourceMapping: {
    "profile Picture": "ProfilePic",
    "full Name": "Title",
    "current Profession": "CurrentProfession_x0026_Company",
    "current Company": "CurrentCompany",
    address: "Address",
    "place To Live": "PlaceToLive",
    industry: "Industry",
    "career Summary": "EducationSummary",
    interest: "Interest",
    // "birth Date": "BirthDate",
    "marital Status": "MaritalStatus",
    skills: "Skills",
    "linkedIn Id": "linkedInId",
    email: "Email",
    phone: "Phone",
    resume: "Resume",
    "career Start": "CareerStart"
  }
};

function ParseJsonInformation() {
  var dobj = { sourceKeys: {}, destination: {}, sourceMapping: {} },
    pagetitle;
  var localStorageObj = localStorage.getItem("updatedQueries");
  if (localStorageObj) {
    obj = JSON.parse(localStorageObj);
  }
  pagetitle = $("title").text();
  if (pagetitle.indexOf(obj["sourceUrl"]) != -1) {
    for (var item in obj["sourceKeys"]) {
      if ($(obj["sourceKeys"][item]).length == 1) {
        dobj["sourceKeys"][item] = $(obj["sourceKeys"][item]).text();
        if ($(obj["sourceKeys"][item]).css("background-image") != "none")
          dobj["sourceKeys"][item] = $(obj["sourceKeys"][item])
            .css("background-image")
            .split('"')[1];
        if ($(obj["sourceKeys"][item]).attr("href")) {
          var pagetitle = window.location.protocol;
          if (
            $(obj["sourceKeys"][item])
              .attr("href")
              .indexOf("mailto") != -1
          )
            dobj["sourceKeys"][item] = $(obj["sourceKeys"][item])
              .attr("href")
              .split("mailto:")[1];
          else {
            if (
              $(obj["sourceKeys"][item])
                .attr("href")
                .indexOf(pagetitle) == -1
            )
              dobj["sourceKeys"][item] =
                window.location.origin +
                $(obj["sourceKeys"][item]).attr("href");
          }
        }
      } else if ($(obj["sourceKeys"][item]).length > 1) {
        var temp = "";
        $(obj["sourceKeys"][item]).each(function() {
          temp = temp + $(this).text() + ",";
          dobj["sourceKeys"][item] = temp;
        });
      }
    }
    dobj["destination"] = obj["destination"];
    dobj["sourceMapping"] = obj["sourceMapping"];
  }
  return dobj;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.greeting == "reqForQueries") {
    sendResponse({ queries: obj });
  }
});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.greeting == "setNewQueriesData") {
    obj["sourceKeys"] = request.updatedQueries;
    localStorage.setItem("updatedQueries", JSON.stringify(obj));
  }
});
