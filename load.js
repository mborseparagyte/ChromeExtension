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
            padding-bottom: 10px;\
            ">\
            <div class="formValues"></div>\
            <div class="formActions"><button id="cancel" type="button" class="btn btn-default btn-sm">Cancel</button><button type="button" class="btn btn-primary btn-sm">Add</button></div>\
      </div>\
    </div>';
}
function renderDataToForm() {
  let wrapper = getWrapperDiv();
  $("body").append(wrapper);
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
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
