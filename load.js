function loadData() {
  //expanding skills information
  if (
    $(".pv-profile-section__card-action-bar")
      .text()
      .indexOf("View") != -1
  )
    $("[data-control-name='skill_details']").trigger("click");
  //expandinf profile information
  $("[data-control-name='contact_see_more']").trigger("click");
  var obj = ParseJsonInformation();
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

  callApp();
}

function callApp() {
  var fullname = globalObj["sourceKeys"]["full Name"];
  if (typeof fullname != "undefined") {
    var fn = fullname.substr(
      0,
      globalObj["sourceKeys"]["full Name"].indexOf(" ")
    );
    var ln = fullname.substr(
      globalObj["sourceKeys"]["full Name"].indexOf(" ") + 1
    );
  }
  var ph = globalObj["sourceKeys"]["phone"];
  var em = globalObj["sourceKeys"]["email"];
  var bd = globalObj["sourceKeys"]["birth Date"];
  if (typeof bd != "undefined")
    if (bd.indexOf("Edit") != -1) bd = bd.replace("Edit", "");
  var lid = globalObj["sourceKeys"]["linkedInId"];
  if (typeof lid != "undefined")
    if (lid.indexOf("https://www.") == -1) {
      lid = lid.trim();
      lid = "https://www." + lid;
    }
  var placeToLive = globalObj["sourceKeys"]["place To Live"];
  if (typeof placeToLive != "undefined") var plc = placeToLive.split(",")[0];
  var csd = globalObj["sourceKeys"]["career Start"];
  var skillSet = globalObj["sourceKeys"]["skills"];
  if (typeof skillSet != "undefined") var sk = skillSet.replace(/,\s*$/, "");
  var add = globalObj["sourceKeys"]["address"];
  var cprof = globalObj["sourceKeys"]["current Profession"];
  var ccn = globalObj["sourceKeys"]["current Company"];
  if (typeof ccn != "undefined") ccn = ccn.replace(/,/g, "");
  var pfpic = globalObj["sourceKeys"]["profile Picture"];
  var edus = globalObj["sourceKeys"]["education Summary"];
  var mst = globalObj["sourceKeys"]["marital Status"];
  if (typeof mst != "undefined")
    if (mst.indexOf("Edit") != -1) mst = mst.replace("Edit", "");

  fn = checkUndefined(fn);
  ln = checkUndefined(ln);
  ph = checkUndefined(ph);
  em = checkUndefined(em);
  bd = checkUndefined(bd);
  lid = checkUndefined(lid);
  plc = checkUndefined(plc);
  csd = checkUndefined(csd);
  pfpic = checkUndefined(pfpic);
  cprof = checkUndefined(cprof);
  ccn = checkUndefined(ccn);
  add = checkUndefined(add);
  edus = checkUndefined(edus);
  mst = checkUndefined(mst);
  sk = checkUndefined(sk);

  if (bd) {
    var month = bd.split(" ")[0];
    var day = bd.split(" ")[1];
    month = month.toLowerCase();
    var months = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december"
    ];
    month = months.indexOf(month) + 1;
    var bd = month + "/" + day;
  }
  if (csd) {
    if (csd.split(" ").length == 1) csd = "Mar " + csd;
    var month = csd.split(" ")[0];
    var year = csd.split(" ")[1];
    //month = month.toLowerCase();
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    month = months.indexOf(month) + 1;
    var csd = month ? month + "/1/" + year : "";
  }

  var url =
    siteUrl +
    "/Lists/candidate/ChromeExtention.aspx?Source=" +
    siteUrl +
    "/HTML/OperationSuccess.html&isdlg=1&fn=" +
    fn +
    "&ln=" +
    ln +
    "&mst=" +
    mst +
    "&edus=" +
    edus +
    "&pfpic=" +
    pfpic +
    "&ph=" +
    ph +
    "&bd=" +
    bd +
    "&cprof=" +
    cprof +
    "&ccn=" +
    ccn +
    "&csd=" +
    csd +
    "&em=" +
    em +
    "&plc=" +
    plc +
    "&add=" +
    add +
    "&sk=" +
    sk +
    "&lid=" +
    lid +
    "";
  console.log(url);
  PopupCenter(url, "SharePoint Window", 410, 664);
}

function PopupCenter(url, title, w, h) {
  // Fixes dual-screen position                         Most browsers      Firefox
  var dualScreenLeft =
    window.screenLeft != undefined ? window.screenLeft : screen.left;
  var dualScreenTop =
    window.screenTop != undefined ? window.screenTop : screen.top;

  var width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width;
  var height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen.height;

  var left = width / 2 - w / 2 + dualScreenLeft;
  var top = height / 2 - h / 2 + dualScreenTop;

  var newWindow = window.open(
    url,
    title,
    "resizable =yes,scrollbars=no,width=" +
      w +
      ", height=" +
      h +
      ", top=" +
      top +
      ", left=" +
      left
  );
  newWindow.focus();
  newWindow.document.title = title;
  if (window.focus) {
    newWindow.focus();
  }
}

function checkUndefined(str) {
  return typeof str == "undefined" ? "" : str.trim();
}
