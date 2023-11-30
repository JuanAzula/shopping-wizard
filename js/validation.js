//EVENT LISTENERS FOR INPUTS/SHIPPING/GIFT

$inputs = document.querySelectorAll(".validable");
$inputs.forEach((input) => {
  input.setAttribute("autocomplete","off");
  input.addEventListener('keyup',validation);
  input.addEventListener('focusout',validation);
  input.addEventListener('click',validation);
});

$shipping_type = document.querySelectorAll(".shipping-time");
$shipping_type.forEach((type) => {
  type.setAttribute("autocomplete","off");
  type.addEventListener('click',shippingCheck);
})

$gift = document.querySelector("#gift");
$gift.setAttribute("autocomplete","off");
$gift.addEventListener('click',giftChecked);



//CLIENT OBJECT

let client = {
  username: "",
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  birthday: "",
  address1: "",
  address2: "",
  postalCode: "",
  country: "",
  phoneCode: "",
  phone: "",
  regularAddress: "",
  shipping: "",
  shippingEstimate: "",
  shippingPrice: "",
  gift: "",
  gMessage: "",
  gImage: "",
  terms: ""
};


//VARS FOR VALIDATION FORM
//###PROFILE
var valid_username
var valid_email
var valid_confirm_password


//###ADDRESS
var valid_first_name
var valid_last_name
var valid_birthday
var valid_address1
var valid_address2
var valid_postal_code
var valid_phone

//###SHIPPING
var valid_shipping




//VALIDATION FUNCTION

function validation(event){
  let target = event.target;
  let valid = false;

  //check if is condition terms is false
  validConditions(target)

  switch(event.target.id){
    
    //profile
    case "username":
      valid = validUsername(event,target);
      if (valid == true){client.username = event.target.value;valid_username = true;}else{valid_username = false;};
      break;
    case "email":
      valid = validEmail(target);
      if (valid == true){client.email = event.target.value;valid_email = true;}else{valid_email = false;};
      break;
    case "password":
      valid = validPassword(target);
      break;
    case "confirm-password":
      valid = validConfirmPassword(target);
      if (valid == true){client.password = event.target.value;valid_confirm_password = true;}else{valid_confirm_password = false;};
      break;

    //address
    case "first-name":
      valid = validFirstLastName(event,target);
      if (valid == true){client.firstName = event.target.value;valid_first_name = true;}else{valid_first_name = false;};
      break;
    case "last-name":
      valid = validFirstLastName(event,target);
      if (valid == true){client.lastName = event.target.value;valid_last_name = true;}else{valid_last_name = false;};
      break;
    case "birthday":
      valid = validBirthday(target);
      if (valid == true){client.birthday = event.target.value;valid_birthday = true;}else{valid_birthday = false;};
      break;
    case "address-one":
      valid = validAddress(target);
      if (valid == true){client.address1 = event.target.value;valid_address1 = true;}else{valid_address1 = false;};
      break;
    case "address-two":
      valid = validAddress(target);
      if (valid == true){client.address2 = event.target.value;valid_address2 = true;}else{valid_address2 = false;};
      break;
    case "postal-code":
      valid = validPostalCode(target);
      if (valid == true){client.postalCode = event.target.value;valid_postal_code = true;}else{valid_postal_code = false;};
      break;
    case "country":
      valid = true;
      client.country = event.target.value;
      break;
    case "phone-prefix":
      valid = true;
      client.phoneCode = event.target.value;
      break;
    case "add-phone":
      valid = validPhone(target);
      if (valid == true){client.phone = event.target.value;valid_phone = true;}else{valid_phone = false;};
      break;
    case "regular-address":
      //TODO: Pendiente de que al guardar en el objeto sea true o false. Se queda siempre en On.
      valid = true;
      if (valid == true){client.regularAddress = event.target.checked;};
      break;

    //shipping
    case "gift-title":
      valid = validGiftTitle(target);
      if (valid == true){client.gift = event.target.value;};
      break;
    case "gift-message":
      valid = validGiftMessage(target);
      if (valid == true){client.gMessage = event.target.value;};
      break;
    case "conditions":
      valid = validConditions(target);
      if (valid == true){client.terms = valid;};
      break;
    default:
      console.log("default");
      valid = false;
  }
  if (valid === true){
    target.style.backgroundColor = "rgb(166, 253, 192)";
  }else{
    target.style.backgroundColor = "rgb(253, 166, 166)";
  };

  // confirmProfileForm(valid_username,valid_email,valid_confirm_password);
};

// VALIDATION REQUIREMENTS

function validUsername(event,target){
  return (target.value.length >= 4 && target.value.length <= 13);
}

function validEmail(target){
  let pattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return pattern.test(String(target.value).toLowerCase());
}

function validPassword(target){
  //let pattern = /^[a-zA-Z0-9_*!¡"·$%&/()=?¿+-]+$/;
  let pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]).{8,}/;

  return (pattern.test(target.value) && target.value.length >= 8 && target.value.length <= 20);
}

function validConfirmPassword(target){
  let password = document.querySelector("#password");
  return (validPassword(target) && target.value == password.value);
}

function validFirstLastName(event,target){
  return !(target.value.length < 3 || target.value.length >= 20 || parseInt(event.key) >= 0);
}

function validBirthday(target){
  let pattern = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/
  return (pattern.test(target.value));
}

function validAddress(target){
  return (target.value.length >= 4 && target.value.length <= 50);
}

function validPostalCode(target){
  return (target.value.length == 5 && parseInt(target.value) >= 0);
}

function validPhone(target){
  return (target.value.length == 9 && parseInt(target.value) >= 0);
}

function validGiftTitle(target){
  return (target.value.length >= 5 && target.value.length <= 20);
}

function validGiftMessage(target){
  return (target.value.length >= 5 && target.value.length <= 100);
}

function validConditions(target){
  if(target.checked == true){
    document.querySelector('#terms').style.backgroundColor = "rgb(166, 253, 192)";
    document.querySelector('#finishBttn').style.display = 'block';
  }else{
    document.querySelector('#terms').style.backgroundColor = "rgb(253, 166, 166)";
    document.querySelector('#finishBttn').style.display = 'none';
  }
}

//SHIPPING SELECTION

function shippingCheck(event){
  let arrival = document.querySelector("#shipping-date");
  arrival.style.display = "block";

  let shipping_date = new Date()
  switch(event.target.id){
    case "free-shipping":
      shipping_date.setDate(shipping_date.getDate() + 5);
      client.shippingEstimate = shipping_date;
      client.shippingPrice = event.target.dataset.price;
      valid = true;
      break;
    case "extra-shipping":
      shipping_date.setDate(shipping_date.getDate() + 2);
      client.shippingEstimate = shipping_date;
      client.shippingPrice = event.target.dataset.price;
      valid = true;
      break;
    case "premium-shipping":
      shipping_date.setDate(shipping_date.getDate() + 1);
      client.shippingEstimate = shipping_date;
      client.shippingPrice = event.target.dataset.price;
      valid = true;
      break;
  }
  if(valid == true){valid_shipping = true;}else{valid_shipping = false};
  document.getElementById("shipping-estimate").innerHTML = shipping_date.toLocaleDateString();
  client.shipping = event.target.value;
  client.shippingEstimate = shipping_date.toLocaleDateString();
}


//GIFT BOX/TITLE & MESSAGE

function giftChecked(event){
  if(event.target.checked == true){
    document.querySelector(".gift-message").style.display = "block";
    return true;
  }else{
    document.querySelector(".gift-message").style.display = "none";
    return false;
  };
}

document.getElementById('gift-message').onkeyup = function () {
  document.getElementById('gift-message-count').innerHTML = (100 - this.value.length);
};


// CONFIRM FORMS

function confirmProfileForm(valid_username,valid_email,valid_confirm_password){
  if(valid_username == true && valid_email == true &&  valid_confirm_password == true){
    return true
  }else{
    return false
  }
}

function confirmAddressForm(valid_first_name,valid_last_name,valid_birthday,valid_address1,valid_address2,valid_postal_code,valid_phone){
  if(valid_first_name == true && valid_last_name == true &&  valid_birthday == true &&  valid_address1 == true &&  valid_address2 == true &&  valid_postal_code == true &&  valid_phone == true){
    return true
  }else{
    return false
  }
}

function confirmShippingForm(valid_shipping){
  if(valid_shipping == true){
    return true
  }else{
    return false
  }
}