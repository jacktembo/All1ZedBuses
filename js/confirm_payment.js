let firstName = sessionStorage.getItem('firstName')
let lastName = sessionStorage.getItem('lastName')
let phoneNumber = sessionStorage.getItem('phoneNumber')
let seatNumber = sessionStorage.getItem('seatNumber')
let insuranceType = sessionStorage.getItem('insuranceType')
let routeId = sessionStorage.getItem('routeId')
let departureDate = sessionStorage.getItem('departureDate')
let token = "b1136fb60f5b0484cac2827b8642b55b6f2e517a";
const interval = 15000; // 15 seconds
const timeout = 60000; // 1 minutes

  setInterval(function() {
    if (sessionStorage.getItem('paymentComplete') !== null) {
      // Hide loader if the value is available
      document.querySelector('.container').style.display = 'none';
      document.location = '../payment_status.html'
    }
  }, interval);


 
  
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
      console.log(data);
  
      if (data.status === 'successful') {
        sessionStorage.setItem('paymentComplete', true)
        console.log('Payment successful');
        document.location = '../payment_status.html'
        clearInterval(intervalId);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  const intervalId = setInterval(makeRequest, interval);
  setTimeout(() => clearInterval(intervalId), timeout);
  setTimeout(() => {
    document.querySelector('.container').style.display = 'none';
    document.location = '../payment_failed.html'
  }, timeout)

