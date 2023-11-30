// función para cambiar las imagenes (diferentes colores) en la imagen central

function change(num){
  image = document.querySelectorAll(".clothes-color img")[num].src;
  imageLeft = document.querySelectorAll(".left img");
  imageFinish = document.querySelectorAll(".two-cols img");
  description = document.querySelectorAll(".clothes-color img")[num].alt;
  description2 = document.querySelectorAll(".clothes-color img")[num].dataset.price;
  descriptionOption = document.querySelectorAll(".clothes-color img")[num].dataset.option;
  big = document.images["imageMain"];
  text = document.getElementById("colors");
  text2 = document.getElementById("price");
  big.src = image;
  imageLeft[0].src = image;
  imageLeft[1].src = descriptionOption;
  text.innerHTML = description;
  text2.innerHTML = description2;
}

// función para cambiar las imagenes (diferentes imagenes del mismo producto) en la imagen central

function changeLeft(num){
  imageLeft = document.querySelectorAll(".left img")[num].src;
  big = document.getElementById("imageMain");
  big.src = imageLeft;
}

// función para introducir la imagen de la prenda seleccionada en el finish de compra

function changeFinish(num){
  imageFinish = document.querySelectorAll(".two-cols img");[num].src
  big = document.getElementById("imageMain");
  big.src = imageFinish;
}

// variable donde vamos a guardar los datos de los usuarios

var OurBuyersData = [];

// cazamos el ul vacio donde queremos que se muestre los datos del usuario

var totalData = document.getElementById("product-info");


// metodo constructor para nuestro los parametros que nos interesan de nuestro usuario

class Buyers{
    constructor(price, colors, hoodie, sizes){
        this.price = price;
        this.colors = colors;
        this.hoodie = hoodie;
        this.sizes = sizes;
    }
}

// recorremos el array y los mostramos en un <p> PARA VER SI ALMACENA LOS DATOS O NO

function updateBuyers(){
  totalData.innerHTML = "";

  // foor loop para recorrer los buyers y verlo en el index

  var liProducto = document.createElement("li");

  for (let i = 0; i < OurBuyersData.length; i++){
      totalData.innerHTML = totalData.innerHTML  +
      '<li>Product Name: ' + 'Hoodie' + '</li>' +
      '<li>Price: ' + OurBuyersData[i].price + '€</li>' +
      '<li>Color: ' + OurBuyersData[i].colors + '</li>' +
      '<li>Size: ' + OurBuyersData[i].sizes + '</li>'
  };
}

// creamos una funcion para nuestro usuario (comprador)

function createBuyer(){
    var price = document.getElementById("price").innerText; // obtenemos el precio
    var colors = document.getElementById("colors").innerText; // obtenbemos el color en texto
    var hoodie = document.getElementById("imageMain").src; // obtenemos la imagen
    var sizes = document.getElementById("sizes").value; // obtenemos la talla

    // objeto comprador

    var buyer = new Buyers(price, colors, hoodie, sizes);
    OurBuyersData.push(buyer);  // lo añadimos a nuestra variable de datos []

    console.log(buyer);

    updateBuyers();

}





