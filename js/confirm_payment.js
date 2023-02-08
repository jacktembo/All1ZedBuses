let firstName = sessionStorage.getItem("firstName");
let lastName = sessionStorage.getItem("lastName");
let phoneNumber = sessionStorage.getItem("phoneNumber");
let seatNumber = sessionStorage.getItem("seatNumber");
let insuranceType = sessionStorage.getItem("insuranceType");
let routeId = sessionStorage.getItem("routeId");
let departureDate = sessionStorage.getItem("departureDate");
let token = "b1136fb60f5b0484cac2827b8642b55b6f2e517a";
const timeout = 60000; // 1 minutes
async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

async function makePayment() {
  const data = {
    route_id: routeId,
    first_name: firstName,
    last_name: lastName,
    phone_number: phoneNumber,
    seat_number: seatNumber,
    insurance_type: insuranceType,
    departure_date: departureDate,
  };

  const response = await postData("https://buses.pridezm.com/api/pay", data);

  if (response.status && response.reference_number) {
    sessionStorage.setItem("status", response.status);
    sessionStorage.setItem("reference_number", response.reference_number);
    sessionStorage.setItem("pendingId", response.pending_id);
  }
}

makePayment();

const interval = 15000; // 15 seconds
const maxAttempts = 4;
let attempts = 0;

async function makeRequest() {
  try {
    const response = await fetch('https://buses.pridezm.com/api/pay-query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
      body: JSON.stringify({ pending_id: sessionStorage.getItem('pendingId') }),
    });
    const data = await response.json();

    if (data.status === 'successful') {
      console.log('Payment successful');
      clearInterval(intervalId);
      document.location = '../payment_status.html'
    } else {
      attempts++;
      if (attempts === maxAttempts) {
        console.log('Payment failed');
        clearInterval(intervalId);
        document.location = '../payment_failed.html'
      }
    }
  } catch (error) {
    console.error(error);
  }
}

const intervalId = setInterval(makeRequest, interval);
