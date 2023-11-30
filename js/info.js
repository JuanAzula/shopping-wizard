$profile_list = document.querySelector("#profile-info");
$address_list = document.querySelector("#address-info");
$shipping_list = document.querySelector("#shipping-info");
$finish_list = document.querySelector("#finish-info");
$inputs = document.querySelectorAll(".validable");
$inputs.forEach((input) => {
  input.setAttribute("autocomplete","off");
  input.addEventListener('focusout',printInfo);
  input.addEventListener('click',printInfo);
});

$shipping_type = document.querySelectorAll(".shipping-time");
$shipping_type.forEach((type) => {
  type.addEventListener('click',printInfo);
})

$gift = document.querySelector("#gift");
$gift.addEventListener('click',printInfo);

$gift = document.querySelector("#conditions");
$gift.addEventListener('click',printInfo);


//PRINT CLIENT INFO

function printInfo(){

  var li = document.createElement("li");

  //PROFILE
  $profile_list.innerHTML = '<li>Username: ' + client.username + '</li>';
  $profile_list.innerHTML += '<li>Email: ' + client.email + '</li>';

  //ADDRESS
  $address_list.innerHTML = '<li>First name: ' + client.firstName + '</li>';
  $address_list.innerHTML += '<li>Last name: ' + client.lastName + '</li>';
  $address_list.innerHTML += '<li>Birthday: ' + client.birthday + '</li>';
  $address_list.innerHTML += '<li>Address: ' + client.address1 + ' ' + client.address2 + '</li>';
  $address_list.innerHTML += '<li>Postal code: ' + client.postalCode + '</li>';
  $address_list.innerHTML += '<li>Country: ' + client.country + '</li>';
  $address_list.innerHTML += '<li>Phone: ' + client.phoneCode + ' ' + client.phone + '</li>';
  $address_list.innerHTML += '<li>Regular address: ' + client.regularAddress + '</li>';

  //SHIPPING
  $shipping_list.innerHTML = '<li>Shipping type: ' + client.shipping + '</li>';
  $shipping_list.innerHTML += '<li>Stimated arrival: ' + client.shippingEstimate + '</li>';
  $shipping_list.innerHTML += '<li>Gift message: ' + client.gift + "<br>" + client.gMessage + '</li>';

  //FINISH
  $finish_list.innerHTML = '<li>Hoodie : ' + OurBuyersData[0].price + '€</li>';
  $finish_list.innerHTML += '<li>' + client.shipping + ': ' + client.shippingPrice + '€</li>';
  console.log(eval(OurBuyersData[0].price));
  console.log(eval(client.shippingPrice));
  let finishPrice = eval(OurBuyersData[0].price) + eval(client.shippingPrice);
  $finish_list.innerHTML += '<li>Total price: ' + finishPrice.toFixed(2) + '€</li>';
}

