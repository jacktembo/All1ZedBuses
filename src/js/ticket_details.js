let company_name = sessionStorage.getItem('company_name')
let company_id = sessionStorage.getItem('company_id')
let company_image_url = sessionStorage.getItem('company_image_url')
let banner_img = document.querySelector('.banner-img')
banner_img.src = company_image_url
document.querySelector('h1 span').innerHTML = company_name
let journeyForm = document.querySelector('.journey')
let startingPlace = journeyForm.querySelector('#starting-place')
let destination = document.querySelector('#destination')
let departure_date = document.querySelector('#departure-date')
let FindBusButton = document.querySelector('.find-bus')
