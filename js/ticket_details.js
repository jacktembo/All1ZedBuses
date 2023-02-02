let company_name = sessionStorage.getItem("company_name");
let company_id = sessionStorage.getItem("company_id");
let company_image_url = sessionStorage.getItem("company_image_url");
let banner_img = document.querySelector(".banner-img");
banner_img.src = company_image_url;
let token = "b1136fb60f5b0484cac2827b8642b55b6f2e517a";
document.querySelector("h1 span").innerHTML = company_name;
let journeyForm = document.querySelector(".journey");
let startingPlace = journeyForm.querySelector("#starting-place");
let destination = document.querySelector("#destination");
let departure_date = document.querySelector("#departure-date");
let FindBusButton = document.querySelector(".find-bus");
let towns;
let townSelect = document.getElementById("starting-place");
let destinationSelect = document.getElementById("destination");

fetch(`https://buses.pridezm.com/api/routes?bus-company=${company_id}`, {
  method: "GET",
  headers: {
    Authorization: `Token ${token}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    let arr = data.filter((obj, index) => {
      return (
        data
          .map((mapObj) => mapObj["starting_place"])
          .indexOf(obj["starting_place"]) === index
      );
    });
    arr.forEach((town) => {
      const option = document.createElement("option");
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
  let emptyOption = document.createElement("option");
  emptyOption.innerHTML = "Chooose Destination";
  emptyOption.selected = true;
  emptyOption.disabled = true;
  destinationSelect.add(emptyOption);
  console.log(townSelect.value);
  let selectedValue = townSelect.value;
  fetch(
    `https://buses.pridezm.com/api/routes?bus-company=${company_id}&starting_place=${selectedValue}`,
    {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      let arr = data.filter((obj, index) => {
        return (
          data
            .map((mapObj) => mapObj["destination"])
            .indexOf(obj["destination"]) === index
        );
      });
      console.log(arr);
      arr.forEach((town) => {
        let option = document.createElement("option");
        option.value = town.destination;
        option.text = town.destination;
        destinationSelect.add(option);
      });
    });
});

const form = document.querySelector("form");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const departureTown = formData.get("starting-place");
  const destination = formData.get("destination");
  const departureDate = formData.get('departure-date')
  sessionStorage.setItem('departureTown', departureTown)
  sessionStorage.setItem('destination', destination)
  sessionStorage.setItem('departureDate', departureDate)
  document.location = '../choose_bus.html'

});
