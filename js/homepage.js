"use strict";

var token = 'b1136fb60f5b0484cac2827b8642b55b6f2e517a';
var response;
var companyList = document.querySelector('.companies-cards');
fetch('https://buses.pridezm.com/api/bus-companies', {
  method: 'GET',
  headers: {
    'Authorization': "Token ".concat(token)
  }
}).then(function (res) {
  return res.json();
}).then(function (data) {
  response = data;
  console.log(response);
  response.forEach(function (element) {
    var item = document.createElement("div");
    item.id = element.id;
    item.innerHTML = "\n        <a href=\"\" class=\"company-link\">\n        <div class=\"company-card\" style=\"flex: 1 1 50%;\">\n            <img src=\"".concat(element.image, "\" alt=\"\" class=\"top-img\">\n            <div class=\"company-name\"> ").concat(element.company_name, " </div>\n        </div>\n      </div>\n        </a>\n        ");
    companyList.appendChild(item);
  });
})["catch"](function (error) {
  return console.error(error);
});
var footer = document.querySelector('footer');
companyList.after(footer);
footer.style.display = 'block';