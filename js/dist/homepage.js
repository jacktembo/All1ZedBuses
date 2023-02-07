var token = "b1136fb60f5b0484cac2827b8642b55b6f2e517a";
var response;
var companyList = document.querySelector(".companies-cards");
var baseURL = "https://buses.pridezm.com/api/";
fetch("".concat(baseURL, "bus-companies"), {
  method: "GET",
  headers: {
    Authorization: "Token ".concat(token)
  }
}).then(function (res) {
  return res.json();
}).then(function (data) {
  response = data;
  console.log(response);
  response.forEach(function (element) {
    var item = document.createElement("div");
    item.id = element.id;
    item.innerHTML = "\n        <a href=\"ticket_details.html\" class=\"company-link\" id=\"".concat(item.id, "\">\n        <div class=\"company-card\" style=\"flex: 1 1 50%;\">\n            <img src=\"").concat(element.image, "\" alt=\"\" class=\"top-img\">\n            <div class=\"company-name\"> ").concat(element.company_name, " </div>\n        </div>\n      </div>\n        </a>\n        ");
    companyList.appendChild(item);
    item.addEventListener('click', function () {
      sessionStorage.setItem('company_id', element.id);
      sessionStorage.setItem('company_name', element.company_name);
      sessionStorage.setItem('company_image_url', element.image);
    });
  });
})["catch"](function (error) {
  return console.error(error);
});
var footer = document.querySelector("footer");
companyList.after(footer);
footer.style.display = "block";