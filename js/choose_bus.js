let startingPlace = sessionStorage.getItem('departureTown')
let destination = sessionStorage.getItem('destination')
let departureDate = sessionStorage.getItem('departureDate')
let token = "b1136fb60f5b0484cac2827b8642b55b6f2e517a";
let company_image_url = sessionStorage.getItem("company_image_url");
let selectBus = document.querySelector('.select-bus')
let company_id = sessionStorage.getItem('company_id')
let banner_img = document.querySelector('.banner-img')
banner_img.src = company_image_url

fetch(`https://buses.pridezm.com/api/routes?bus-company=${company_id}&starting_place=${startingPlace}&destination=${destination}`, {
  method: "GET",
  headers: {
    Authorization: `Token ${token}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    let arr = data
    console.log(arr)
    arr.forEach((bus) => {
      const option = document.createElement("div");
      option.classList.add('bus-item')
      option.id = bus.id
      option.innerHTML = `<a class="btn btn-primary" href="../user_details.html" role="button"><div class="starting-destination">${bus.starting_place} --> ${bus.destination}</div> <div class="time-price">${bus.time} hrs - ZMW${bus.price}</div></a>      `
      selectBus.append(option);
      
    });
    document.querySelector('.bus-item').addEventListener('click', function() {
      sessionStorage.setItem('routeId', this.id)
    })
    //   .catch((err) => console.log(err))
  });
