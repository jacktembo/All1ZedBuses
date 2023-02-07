var company_name = sessionStorage.getItem("company_name");
var company_id = sessionStorage.getItem("company_id");
var company_image_url = sessionStorage.getItem("company_image_url");
var banner_img = document.querySelector(".banner-img");
banner_img.src = company_image_url;
var token = "b1136fb60f5b0484cac2827b8642b55b6f2e517a";
document.querySelector("h1 span").innerHTML = company_name;
var journeyForm = document.querySelector(".journey");
var startingPlace = journeyForm.querySelector("#starting-place");
var destination = document.querySelector("#destination");
var departure_date = document.querySelector("#departure-date");
var FindBusButton = document.querySelector(".find-bus");
var towns;
var townSelect = document.getElementById("starting-place");
var destinationSelect = document.getElementById("destination");
fetch("https://buses.pridezm.com/api/routes?bus-company=".concat(company_id), {
  method: "GET",
  headers: {
    Authorization: "Token ".concat(token)
  }
}).then(function (response) {
  return response.json();
}).then(function (data) {
  var arr = data.filter(function (obj, index) {
    return data.map(function (mapObj) {
      return mapObj["starting_place"];
    }).indexOf(obj["starting_place"]) === index;
  });
  arr.forEach(function (town) {
    var option = document.createElement("option");
    option.value = town.starting_place;
    option.text = town.starting_place;
    townSelect.add(option);
  });

  //   .catch((err) => console.log(err))
});

townSelect.addEventListener("change", function () {
  while (destinationSelect.options.length) {
    destinationSelect.remove(0);
  }
  var emptyOption = document.createElement("option");
  emptyOption.innerHTML = "Chooose Destination";
  emptyOption.selected = true;
  emptyOption.disabled = true;
  destinationSelect.add(emptyOption);
  console.log(townSelect.value);
  var selectedValue = townSelect.value;
  fetch("https://buses.pridezm.com/api/routes?bus-company=".concat(company_id, "&starting_place=").concat(selectedValue), {
    method: "GET",
    headers: {
      Authorization: "Token ".concat(token)
    }
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    var arr = data.filter(function (obj, index) {
      return data.map(function (mapObj) {
        return mapObj["destination"];
      }).indexOf(obj["destination"]) === index;
    });
    console.log(arr);
    arr.forEach(function (town) {
      var option = document.createElement("option");
      option.value = town.destination;
      option.text = town.destination;
      destinationSelect.add(option);
    });
  });
});
var form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  var formData = new FormData(form);
  var departureTown = formData.get("starting-place");
  var destination = formData.get("destination");
  var departureDate = formData.get('departure-date');
  sessionStorage.setItem('departureTown', departureTown);
  sessionStorage.setItem('destination', destination);
  sessionStorage.setItem('departureDate', departureDate);
  document.location = '../choose_bus.html';
});