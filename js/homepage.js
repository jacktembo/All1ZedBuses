let token = 'b1136fb60f5b0484cac2827b8642b55b6f2e517a'
let response;
let companyList = document.querySelector('.company-list')

fetch('https://buses.pridezm.com/api/bus-companies', {
  method: 'GET',
  headers: {
    'Authorization': `Token ${token}`
  }
})
.then(res => res.json())
.then(data => {
    response = data;
    console.log(response)
    response.forEach(element => {
        let item = document.createElement("div");
        item.innerHTML = `
        <div class="col">
              <div class="card h-100">
                <img src="${element.image}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${element.company_name}</h5>
                </div>
              </div>
            </div>
        `
        companyList.appendChild(item);
    });
    // document.body.appendChild(list);
})
.catch(error => console.error(error))
