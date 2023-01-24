let token = 'b1136fb60f5b0484cac2827b8642b55b6f2e517a'
let response;
let companyList = document.querySelector('.companies-cards')

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
        item.id = element.id
        item.innerHTML = `
        <a href="" class="company-link">
        <div class="company-card" style="flex: 1 1 50%;">
            <img src="${element.image}" alt="" class="top-img">
            <div class="company-name"> ${element.company_name} </div>
        </div>
      </div>
        </a>
        
        `
        companyList.appendChild(item);
    });
})
.catch(error => console.error(error))

