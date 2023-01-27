let token = "b1136fb60f5b0484cac2827b8642b55b6f2e517a";
let response;
let companyList = document.querySelector(".companies-cards");
let baseURL = "https://buses.pridezm.com/api/"
fetch(`${baseURL}bus-companies`, {
  method: "GET",
  headers: {
    Authorization: `Token ${token}`,
  },
})
  .then((res) => res.json())

  .then((data) => {
    response = data;
    console.log(response);
    response.forEach((element) => {
      let item = document.createElement("div");
      item.id = element.id;
      item.innerHTML = `
        <a href="ticket_details.html" class="company-link" id="${item.id}">
        <div class="company-card" style="flex: 1 1 50%;">
            <img src="${element.image}" alt="" class="top-img">
            <div class="company-name"> ${element.company_name} </div>
        </div>
      </div>
        </a>
        `;
      companyList.appendChild(item);
      item.addEventListener('click', function() {
        sessionStorage.setItem('company_id', element.id)
        sessionStorage.setItem('company_name', element.company_name)
        sessionStorage.setItem('company_image_url', element.image)

      })

    });
  })
  .catch((error) => console.error(error));
let footer = document.querySelector("footer");
companyList.after(footer);
footer.style.display = "block";
