// https://api.covid19india.org/data.json

var xhttpBengal = new XMLHttpRequest();

xhttpBengal.onreadystatechange = function () {
  if (this.readyState == "4" && this.status == "200") {
    var jsonData = JSON.parse(xhttpBengal.responseText);
    var allStates = jsonData["statewise"];
    var wb = allStates[8];
    const wbdata = document.getElementById("wb-data");
    wbdata.innerHTML = `
    <ul>
    <li>Total Active : ${wb.active}</li>
    <li>Total Confirmed Cases : ${wb.confirmed}</li>
    <li>Total Deaths: ${wb.deaths}</li>
    <li>Last Updated: ${wb.lastupdatedtime}</li>
    </ul>
    `;
  }
};

xhttpBengal.open("GET", "https://api.covid19india.org/data.json", true);
xhttpBengal.send();
