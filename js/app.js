function scrollThree() {
    let pageThree = document.getElementById('three');
    pageThree.scrollIntoView();
}

function scrollFour() {
    let pageFour = document.getElementById('four');
    pageFour.scrollIntoView();
}

function scrollFive() {
    let pageFive = document.getElementById('five');
    pageFive.scrollIntoView();
}


// CLIENT CONTENT RESET

function resetClient() {
    //We set the client data again to empty it
    client = {
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
        gift: "",
        gMessage: "",
        gImage: ""
    };

    //We set the product again to empty it
    buyers = {
        price: "",
        colors: "",
        hoodie: "",
        sizes: ""
    };

    document.querySelector("#profile-info").innerHTML = "";
    document.querySelector("#address-info").innerHTML = "";
    document.querySelector("#shipping-info").innerHTML = "";
    document.querySelector("#product-info").innerHTML = "";
    document.querySelector("#finish-info").innerHTML = "";

    //Removing all content and color from the input fields
    let phoneCoun = document.getElementById('phone-prefix');
    let country = document.getElementById('country');
    $inputs.forEach((input) => {
        if (input == phoneCoun) {
            input.value = 'AND-376';
            input.style.backgroundColor = 'rgb(255, 255, 255)';
        } else if (input == country) {
            input.value = 'Andorra';
            input.style.backgroundColor = 'rgb(255, 255, 255)';
        } else {
        input.value = "";
        input.style.backgroundColor = 'rgb(255, 255, 255)';
        }
    });

    //Removing the selected checkboxes and radio buttons
    let checksArr = ["regular-address", "free-shipping", "extra-shipping", "premium-shipping", "gift", "conditions"];
    checksArr.forEach((id) => {
        document.getElementById(id).checked = false;
    });

    //Removing the estimate shipping date div
    let arrival = document.querySelector("#shipping-date");
    arrival.style.display = "none";

    //Hidding the gift menu
    document.querySelector(".gift-message").style.display = "none";

    //Getting the size selector to default
    document.getElementById("sizes").value = "size";
}

//  END POPUP

function endPopup(totalTime) {
    //We create a shaded layer that covers all the viewport
    let endShade = document.createElement('div');
    endShade.className = 'popupShade';
    document.querySelector('body').appendChild(endShade);

    //Main element (pop up) where the 'Purchase ended' data is shown
    let endPopup = document.createElement('div');
    endPopup.id = 'endPopup';

    //Spent time counter
    let finalTimer = document.createElement('div');
    finalTimer.id = 'finalTimer';
    finalTimer.innerHTML= totalTime;


    //Product section with info and the product image
    let endProduct = document.createElement('div');
    endProduct.id = 'endProduct';

    //Product image
    let endImg = document.createElement('div');
    let imgUrl = 'url("' + OurBuyersData[0].hoodie + '")';

    //Product info
    let finalPrice = eval(OurBuyersData[0].price) + eval(client.shippingPrice);
    let endInfo = document.createElement('div');
    endInfo.innerHTML = '<h2>Hoodie</h2></br><p><strong>Size: </strong>' + OurBuyersData[0].sizes + '</p></br><p><strong>Color: </strong>' + OurBuyersData[0].colors + '</p></br><p><strong>Total price: </strong>'  + finalPrice.toFixed(2) + '€</p>';

    //Client and shipping info
    let clientInfo = document.createElement('div');
    clientInfo.id = 'clientInfo';
    let completeName = client.firstName + ' ' + client.lastName;
    let completeAddress = client.address1 + ', ' + client.address2 + ' ';
    clientInfo.innerHTML = '<p><strong>Name: </strong>' + completeName + '</p></br><p><strong>Address:</strong></p></br><p>' + completeAddress + '</p></br><p> ' + client.postalCode + ', ' + client.country + '</p></br><p><strong>Shipping: </strong>' + client.shipping + '</p></br><p><strong>Estimated delivery: </strong>' + client.shippingEstimate + '</p>';

    //Button
    let restart = document.createElement('button');
    restart.id = 'restart';
    restart.innerHTML = 'FINISH';

    //Appending all the elements
    endProduct.appendChild(endImg);
    endProduct.appendChild(endInfo);
    endPopup.appendChild(finalTimer);
    endPopup.appendChild(endProduct);
    endPopup.appendChild(clientInfo);
    endPopup.appendChild(restart);
    document.querySelector('body').appendChild(endPopup);
    document.querySelector('#endProduct div:first-child').style.backgroundImage = imgUrl;

    //EVENT LISTENER TO RESTART AND CLEAR THE OJECTS
    restart.addEventListener('click', () => {
        let pageOne = document.getElementById('one');
        pageOne.scrollIntoView();
        endPopup.remove();
        endShade.remove();
        resetClient();
        OurBuyersData = [];
        document.getElementById("sizes").value = "size";
    });
}

//################    TIMER

//Function to calculate the purchase time in minutes and seconds
function timeCalculus(totalMls) {
    let min = (totalMls / 1000) / 60;
    if (min < 1) {
        min = 0;
    }
    let secs = Math.round((totalMls / 1000) % 60);
    return Math.round(min) + ' minutes and ' + secs + ' seconds.';
}

function minuteAlerts() {
    let startTime = new Date();
    let finished = false;

    //Event listener that ends the purchase and shows the total time spent
    document.getElementById('finishBttn').addEventListener('click', () =>{
        let endTime = new Date();
        let totalMls = endTime - startTime;
        let totalTime = timeCalculus(totalMls);
        endPopup(totalTime);
        finished = true;
        return finished;
    });

    let counter = 0;
    let timerArr = document.querySelectorAll('.timer');

    let t = setInterval(() => {
        //Shows the timer popup every minute before reaching 5 minutes
        if (counter < 4 && finished == false) {
            console.log(counter);
            counter++;
            for (let x = 0; x < timerArr.length; x++ ) {
                timerArr[x].innerHTML = '<legend><h2>Timer</h2></legend>';
                timerArr[x].innerHTML += 'You started shopping ' + counter + ' minutes ago';
                timerArr[x].classList.toggle('off');
                setTimeout(() => {
                    timerArr[x].classList.toggle('off');
                }, 5000);
            }

        //Creates a popup to block the site and returns to the main page
        } else if (counter == 4 && finished == false) {
            console.log(counter);
            let shade = document.createElement('div');
            shade.className = 'popupShade';
            document.querySelector('body').appendChild(shade);
            let popup = document.createElement('div');
            popup.id = 'popup';
            popup.innerHTML = "<p>We are sorry but you've spent the maximum time allowed for the purchase.</p><p>You will be redirected to the main page in 5 seconds.</p>"
            document.querySelector('body').appendChild(popup);
            setTimeout(() => {
                popup.remove();
                shade.remove();
                let startPage = document.getElementById('one');
                startPage.scrollIntoView();
                resetClient();
                OurBuyersData = [];
            }, 5000);
            clearInterval(t);

        //Ends the interval if the customer finishes the purchase
        } else if (finished == true) {
            clearInterval(t);
        }
    },60000); //60000
}

document.getElementById('productBttn').addEventListener('click', minuteAlerts);
