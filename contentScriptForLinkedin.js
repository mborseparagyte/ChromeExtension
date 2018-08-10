var btnOnLinkedIn = document.createElement("Button"); // created a button
btnOnLinkedIn.appendChild(document.createTextNode("Import"));
var style = document.createElement("style");
style.type = "text/css";
style.innerHTML =
  '::-webkit-scrollbar {  width: 5px;}::-webkit-scrollbar-track {  box-shadow: inset 0 0 5px grey;  border-radius: 10px;}::-webkit-scrollbar-thumb {  background: darkgrey;  border-radius: 10px;}::-webkit-scrollbar-thumb:hover {  background: darkgrey;}.ExportButtonCss {  font-weight: bold;  border-width: 1px;  border-style: solid;  cursor: pointer;  margin-left: 5px;  text-decoration: none !important;  width: auto;  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.35);  border-radius: 3px;  padding: 0 13px;  height: 40px;  line-height: 29px;  box-sizing: border-box;  font-size: 17px;  color: #fff;  background-color: #0084bf;  border-color: #1b5480;  white-space: nowrap;  display: inline-block;  zoom: 1;  vertical-align: middle;  margin-top: 8px;}.wrapperDiv {  padding: 20px;}.fieldParent {  display: flex;  margin-bottom: 15px;}.fieldLabel {  flex-basis: 33.33%;  max-width: 33.33%;}.fieldInput {}.textValues {  max-width: 300px;  width: 300px;  height: 35px;  background: white;}.formValues {  overflow: auto;  height: 85%;  margin-bottom: 20px;}.formActions {  height: 50px;  text-align: right;  display: flex;  justify-content: flex-end;}.btn {  margin: 0.2em 0.1em;  font-family: "Open Sans", sans-serif;  font-weight: 700;  font-size: 1em;  -webkit-font-smoothing: antialiased;  -moz-osx-font-smoothing: grayscale;  border: none;  border-bottom: 0.15em solid black;  border-radius: 3px;  padding: 0.65em 1.3em;  margin-right: 10px;  height: 35px;}.btn-lg {  padding: 1em 2em;}.btn-sm,.btn-xs {  font-size: 0.85em;  padding: 0.5em 1em;}.btn-xs {  font-size: 0.85em;  padding: 0.25em 0.75em;}.btn-default {  border-color: #d9d9d9;  background-image: linear-gradient(#ffffff, #f2f2f2);}.btn-default:hover {  background: linear-gradient(#f2f2f2, #e6e6e6);}.btn-primary {  border-color: #2a6496;  background-image: linear-gradient(#428bca, #357ebd);  color: white;}.btn-primary:hover {  background: linear-gradient(#357ebd, #3071a9);}.btn-success {  border-color: #3d8b3d;  background-image: linear-gradient(#5cb85c, #4cae4c);  color: white;}.btn-success:hover {  background: linear-gradient(#4cae4c, #449d44);}.btn-info {  border-color: #28a1c5;  background-image: linear-gradient(#5bc0de, #46b8da);}.btn-info:hover {  background: linear-gradient(#46b8da, #31b0d5);}.btn-warning {  border-color: #df8a13;  background-image: linear-gradient(#f0ad4e, #eea236);}.btn-warning:hover {  background: linear-gradient(#eea236, #ec971f);}.btn-danger {  border-color: #b52b27;  background-image: linear-gradient(#d9534f, #d43f3a);}.btn-danger:hover {  background: linear-gradient(#d43f3a, #c9302c);}.loader {  display: flex !important;  height: inherit;  align-items: center;  margin-top: 10px;}.spinner {  height: 30px;  width: 30px;  border: 4px solid rgba(0, 174, 239, 0.2);  border-top-color: rgba(0, 174, 239, 0.8);  border-radius: 100%;  animation: rotation 0.9s infinite linear 0.25s;  opacity: 0;  margin-right: 10px;}@keyframes rotation {  from {    opacity: 1;    transform: rotate(0deg);  }  to {    opacity: 1;    transform: rotate(359deg);  }}.loaderText {  font-weight: 500;  font-style: italic;  color: #5893a9;}.errorText {  display: flex;  justify-content: center;  font-style: italic;  color: red;}.successIcon {  display: flex;  justify-content: center;}.successDivParent {  display: flex;  align-items: center;  justify-content: center;  margin-top: 22vh;}.doneAction {  display: flex;  align-items: center;  justify-content: center;  margin-top: 10px;  width: 100%;}.successText {  font-style: italic;  font-weight: 500;  margin-bottom: 20px;  color: #67c100;}.innerContents {  position: fixed;  width: 800px;  height: 580px;  background: #f0f0f0;  margin-top: 40px;  padding: 50px;  padding-bottom: 40px;  border-radius: 5px;  padding-right: 10px;  padding-top: 70px;}.closeParent {  position: relative;}.closeButton {  position: absolute;  width: 25px;  height: 25px;  right: -2px;  top: -60px;  cursor: pointer;}.candidateform {  position: relative;}.formTitle {  position: absolute;  top: -45px;  font-size: 120%;  font-weight: 500;  color: green;}';
document.getElementsByTagName("head")[0].appendChild(style);
btnOnLinkedIn.className = "ExportButtonCss";

btnOnLinkedIn.addEventListener("click", function() {
  chrome.runtime.sendMessage({ greeting: "requestForURL" }, function(response) {
    //Request Site URL to Background script
    siteURL = response.replyURL;
    accessKey = response.accessKey;
    if (siteURL) {
      localStorage.setItem("sharepointURL", siteURL);
      localStorage.setItem("accessKey", accessKey);
      loadData();
    } else alert("Enter site URL first");
  });
});

$(document).ready(function() {
  $(".pv-s-profile-actions__overflow").append(btnOnLinkedIn);
});
