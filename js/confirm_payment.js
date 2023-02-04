let firstName = sessionStorage.getItem('firstName')
let lastName = sessionStorage.getItem('lastName')
let phoneNumber = sessionStorage.getItem('phoneNumber')
let seatNumber = sessionStorage.getItem('seatNumber')
let insuranceType = sessionStorage.getItem('insuranceType')
let routeId = sessionStorage.getItem('routeId')
let departureDate = sessionStorage.getItem('departureDate')

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return await response.json();
  }
  
  async function makePayment() {
    const data = {
      "route_id": routeId,
      "first_name": firstName,
      "last_name": lastName,
      "phone_number": phoneNumber,
      "seat_number": seatNumber,
      "insurance_type": insuranceType,
      "departure_date": departureDate
    };
  
    const response = await postData('https://buses.pridezm.com/api/pay', data);
  
    if (response.status && response.reference_number) {
      sessionStorage.setItem('status', response.status);
      sessionStorage.setItem('reference_number', response.reference_number);
      console.log(response.status)
      console.log(response.reference_number)
    }
  }
  
  makePayment();
  