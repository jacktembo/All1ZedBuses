var startingPlace = sessionStorage.getItem('departureTown');
var destination = sessionStorage.getItem('destination');
var departureDate = sessionStorage.getItem('departureDate');
var token = "b1136fb60f5b0484cac2827b8642b55b6f2e517a";
var company_image_url = sessionStorage.getItem("company_image_url");
var selectBus = document.querySelector('.select-bus');
var company_id = sessionStorage.getItem('company_id');
var banner_img = document.querySelector('.banner-img');
banner_img.src = company_image_url;
fetch("https://buses.pridezm.com/api/routes?bus-company=".concat(company_id, "&starting_place=").concat(startingPlace, "&destination=").concat(destination), {
  method: "GET",
  headers: {
    Authorization: "Token ".concat(token)
  }
}).then(function (response) {
  return response.json();
}).then(function (data) {
  var arr = data;
  console.log(arr);
  arr.forEach(function (bus) {
    var option = document.createElement("div");
    option.classList.add('bus-item');
    option.id = bus.id;
    option.innerHTML = "<a class=\"btn btn-primary\" href=\"../user_details.html\" role=\"button\"><div class=\"starting-destination\">".concat(bus.starting_place, " --> ").concat(bus.destination, "</div> <div class=\"time-price\">").concat(bus.time, " hrs - ZMW").concat(bus.price, "</div></a>      ");
    selectBus.append(option);
  });
  document.querySelector('.bus-item').addEventListener('click', function () {
    sessionStorage.setItem('routeId', this.id);
  });
  //   .catch((err) => console.log(err))
});