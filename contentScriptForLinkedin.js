var btnOnLinkedIn = document.createElement("Button"); // created a button
btnOnLinkedIn.appendChild(document.createTextNode("P10 Candidate"));
var style = document.createElement("style");
style.type = "text/css";
style.innerHTML =
  ".ExportButtonCss {  font-weight: bold;  border-width: 1px;  border-style: solid;  cursor: pointer;  margin-left: 5px;  text-decoration: none !important;  width: auto;  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.35);  border-radius: 3px;  padding: 0 13px;  height: 40px;  line-height: 29px;  box-sizing: border-box;  font-size: 17px;  color: #fff;  background-color: #0084bf;  border-color: #1b5480;  white-space: nowrap;  display: inline-block;  zoom: 1;  vertical-align: middle;  margin-top: 8px;}.wrapperDiv{    padding: 20px;}.fieldParent {    display: flex;    margin-bottom: 15px;}.fieldLabel {    flex-basis: 33.33%;    max-width: 33.33%;}.fieldInput{    }.textValues{max-width: 300px;width: 300px;height: 40px;}.formValues {    overflow: auto;    height: 85%;    margin-bottom: 20px;}.formActions {    background: gray;    height: 50px;}";
document.getElementsByTagName("head")[0].appendChild(style);
btnOnLinkedIn.className = "ExportButtonCss";

btnOnLinkedIn.addEventListener("click", function() {
  chrome.runtime.sendMessage({ greeting: "requestForURL" }, function(response) {
    //Request Site URL to Background script
    siteURL = response.replyURL;
    if (siteURL) {
      localStorage.setItem("sharepointURL", siteURL);
      loadData();
    } else alert("Enter Site URL first");
  });
});

$(document).ready(function() {
  $(".pv-s-profile-actions__overflow").append(btnOnLinkedIn);
});
