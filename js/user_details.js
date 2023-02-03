let departureDate = sessionStorage.getItem("departureDate");
let company_id = sessionStorage.getItem("company_id");
let routeId = sessionStorage.getItem("routeId");
let token = "b1136fb60f5b0484cac2827b8642b55b6f2e517a";

async function getSeats() {
  const response = await fetch(
    `https://buses.pridezm.com/api/seats?route-id=${routeId}&departure-date=${departureDate}`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  const seatData = await response.json();

  const selectElement = document.querySelector(".seat-select");

  Object.entries(seatData).forEach(([seatNum, availability]) => {
    const optionElement = document.createElement("option");
    optionElement.value = seatNum;
    optionElement.text = function () {
      if (availability === "taken") return `${seatNum} - Taken`;
      else {
        return `${seatNum} - Available`
      }
    }(); // Have defined and called the function at the same time.
    optionElement.disabled = availability === "taken";
    selectElement.appendChild(optionElement);
  });
}

getSeats();