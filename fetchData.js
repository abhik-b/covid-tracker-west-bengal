var xhttpWB = new XMLHttpRequest();

// fetching data
xhttpWB.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    //   whole india's data
    var jsonData = JSON.parse(xhttpWB.responseText);

    // west bengal's district wise data
    wbJson = jsonData["West Bengal"].districtData;

    for (var district in wbJson) {
      if (wbJson.hasOwnProperty(district)) {
        // creating a new li element
        var output = document.createElement("li");
        output.innerHTML = `<h1>${district}</h1>`;

        // assigning classes based on number of active
        if (wbJson[district].active > 100) {
          output.classList.add("danger");
        } else if (
          wbJson[district].active > 50 &&
          wbJson[district].active < 100
        ) {
          output.classList.add("warning");
        } else if (
          wbJson[district].active > 0 &&
          wbJson[district].active < 50
        ) {
          output.classList.add("medium");
        }

        // assigning onclick handler
        output.onclick = function (event) {
          openDistrict(event.target.innerHTML);
        };

        // appending data to districts ul
        document.getElementById("districts-list").append(output);
      }
    }

    // districtDetail data fetch
    function openDistrict(district) {
      console.log(wbJson[district]);
      const district_detail = document.getElementById("district-detail");

      // adding class based on number of active cases
      district_detail.classList.add("display-details");
      if (wbJson[district].active > 100) {
        district_detail.classList.remove("medium-detail");
        district_detail.classList.remove("warning-detail");
        district_detail.classList.add("danger-detail");
      } else if (
        wbJson[district].active > 50 &&
        wbJson[district].active < 100
      ) {
        district_detail.classList.remove("medium-detail");
        district_detail.classList.remove("danger-detail");
        district_detail.classList.add("warning-detail");
      } else if (wbJson[district].active > 0 && wbJson[district].active < 50) {
        district_detail.classList.remove("danger-detail");
        district_detail.classList.remove("warning-detail");
        district_detail.classList.add("medium-detail");
      } else {
        district_detail.classList.remove("danger-detail");
        district_detail.classList.remove("warning-detail");
        district_detail.classList.remove("medium-detail");
      }
      //for nice rotating animations when district is changed
      district_detail.classList.toggle("rotate");
      setTimeout(() => {
        district_detail.innerHTML = `
        <ul>
        <li>Active:${wbJson[district].active}</li>
        <li>Confirmed:${wbJson[district].confirmed}</li>
        <li>Deceased:${wbJson[district].deceased}</li>
        <li>recovered:${wbJson[district].recovered}</li>
        </ul>
        <h1>${district}</h1>
        `;
      }, 500);
    }
  }
};

xhttpWB.open(
  "GET",
  "https://api.covid19india.org/state_district_wise.json",
  true
);

xhttpWB.send();
