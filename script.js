// MouseOver and MouseOut in menu bar( Prdocuts And Deals)  

let timeOutValue = 100;      // SET TIMEOUT (IN MILISECONDS).
     let setTimeToHide_ID, mItem;

     function showmenu(obj) {
         if (mItem) mItem.style.display = 'none';

         mItem = document.getElementById(obj);
         mItem.style.display = 'block';
    }
//     // SET TIME TO HIDE MENU LIST.
     function setTimeToHide() {
         setTimeToHide_ID = window.setTimeout(HideMenu, timeOutValue);
     }

     function HideMenu() {
        if (mItem) mItem.style.display = 'none';
     }       // HIDE THE MENU LIST AFTER A SPECIFIED TIME.

     function ReSetTimer() {
         if (setTimeToHide_ID) {
             window.clearTimeout(setTimeToHide_ID);
             setTimeToHide_ID = 0;
         }
};
//cart 

 
//Automatic Image Changes 

 let images = ["images/organicfood.png",
               "images/grocery2.webp",
               "images/nuts.jpeg",
               "images/discountimg.jpeg",
                "images/organic.jpeg",
                "images/basket1.jpeg"
                ];
let time = 2000;
 let i = 0;

let slides = document.querySelector(".slide");
function changeImage() {
     slides.src = images[i];
     if (i < images.length - 1) {
                   i++;
      }
    else {
        i = 0;
     }
     setTimeout("changeImage()",time)
  }
  window.onload = changeImage;




//vegetable products display

 const productDisplay = document.querySelector(".vegetable-section");
 const vegetableDisplay=document.querySelector(".vegetable-display")

 const products = [
     {
         imgUrl:"images/Lady_Finger.jpeg",
         name: "Okra",
         price: "60 Dkk",
         btnAdd: "Add to Cart",
       
       
    
    },

    {
        imgUrl: "images/tamotoes.jpeg",
         name: "Tomato",
        price: "50 Dkk",
        btnAdd: "Add to Cart",
        
       
         },
     {
         imgUrl: "images/cali.webp",
        name: "Capsicum",
        price: "40 Dkk",
         btnAdd:"Add to Cart",
        
    
     
    },
    {
        imgUrl: "images/brinjal.jpeg",
         name: "Brinjal",
        price: "30 Dkk",
        btnAdd: "Add to Cart",
        
       
    
    },
     {
           imgUrl: "images/potatoes.jpeg",
         name: "potatoes",
         price: "20 Dkk",
         btnAdd: "Add to Cart",
     },
       {
           imgUrl: "images/brocoli.jpeg",
         name: "Brocoli",
         price: "10 Dkk",
        btnAdd: "Add to Cart",
     },


 ];

 for (let i = 0; i < products.length; i++){
     const itemElement = document.createElement("div");
     itemElement.className = "item";
   

     const imageElement = document.createElement("img");
     imageElement.src = products[i].imgUrl;

     imageElement.style.width = "160px";
     imageElement.style.height = "100px";
    

     const nameElement = document.createElement("p");
     nameElement.textContent = products[i].name;
     nameElement.style.color = "green";
     nameElement.className = "name";

     const priceElement = document.createElement("p");
     priceElement.textContent = products[i].price;
     priceElement.style.color = "red";

     const buttonAdd = document.createElement("button");
     buttonAdd.textContent = products[i]. btnAdd;
     buttonAdd.className = "addCart";
     buttonAdd.addEventListener('click',function(){
         
         let name = products[i].name;
         let price = products[i].price;
         let img = products[i].imgUrl;
         addProductToCart(name, price, img);
    
        updateTotal();
     });
     

    
     
   
    
     itemElement.appendChild(imageElement);
     itemElement.appendChild(nameElement);
     itemElement.appendChild(priceElement);
     itemElement.appendChild(buttonAdd);
    
    vegetableDisplay.appendChild(itemElement);
    
 }


 //cart 
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');
cartIcon.onclick = () => {
    cart.classList.add("active");

}
closeCart.onclick = () => {
    cart.classList.remove('active');
}

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoded', ready);
} else {
    ready();
}

function ready() {
    let removeCartButtons = document.getElementsByClassName('cart-remove');
    for (let i = 0; i < removeCartButtons.length; i++){
        let buttons = removeCartButtons[i];
        buttons.addEventListener('click',removeCartItem)
    }
    let quantityInputs = document.getElementsByClassName('cart-quantity');
    for (let i = 0; i < quantityInputs.length; i++){
        let input = quantityInputs[i];
        input.addEventListener('click', quantityChanged);
    }
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
   
}

function buyButtonClicked() {
    alert('Your Order Is Placed');
    let cartContent = document.getElementsByClassName('cart-content')[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);

    }
    updateTotal();
}

function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
    
}
function quantityChanged(event) {
    let input = event.target;
    if (input.value <= 0||isNaN(input.value) ){
        input.value = 1;
    }
    updateTotal();
}




function addProductToCart(name, price, img) {
    let cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    let cartItems = document.getElementsByClassName('cart-content')[0];
    let cartItemesNames = document.getElementsByClassName('cart-product-title');
    for (let i = 0; i < cartItemesNames.length; i++) {
        if (cartItemesNames[i].textContent==name) {
            alert("You have already Add this item to cart");
            return;
       }
    }


    let cartBoxContent = `  <img src="${img}" class="cart-img">
                         <div class="detail-box">
                            <div class="cart-product-title">${name}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                            <i class="fa fa-trash cart-remove"></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);

}

//update the total

function updateTotal() {
    let cartContent = document.getElementsByClassName("cart-content")[0];
    let cartBoxes = cartContent.getElementsByClassName("cart-box");
    let total = 0;
    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName('cart-price')[0];
        let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        let price = parseFloat(priceElement.innerText.replace(" ", 'Dkk'));
        let quantity = quantityElement.value;
        total = total + (price * quantity);
        total = Math.round(total * 100) / 100
    }
        document.getElementsByClassName('total-price')[0].innerText = total+'Dkk';
    
}
 



 const fruitsproDisplay = document.querySelector(".fruit-section");
 const fruitDisplay=document.querySelector(".fruit-display")

 const productsFruit = [
     {
         imgUrl:"images/apple.jpeg",
         name: "Apples",
         price: "20 Dkk",
        btnAdd: "Add to Cart",
       
       
    
     },

     {
         imgUrl: "images/banana.jpeg",
         name: "Banana",
         price: "25 Dkk",
         btnAdd: "Add to Cart",
        
       
    
    },
     {
         imgUrl: "images/guava.jpeg",
         name: "Guava",
         price: "60 Dkk",
          btnAdd:"Add to Cart",
     },
     {
         imgUrl: "images/mangoes.jpeg",
         name: "Mangoes",
         price: "120 Dkk",
         btnAdd: "Add to Cart", 
    
     },
    {
           imgUrl: "images/strawberry.jpeg",
         name: "Strawberry",
         price: "30 Dkk",
         btnAdd: "Add to Cart",
     },
       {
           imgUrl: "images/watermelon.jpeg",
         name: "Watermelon",
         price: "30 Dkk",
         btnAdd: "Add to Cart",
     },


 ];

 for (let i = 0; i < productsFruit.length; i++){
     const itemElementOne = document.createElement("div");
     itemElementOne.className = "item";
   

     const imageElementOne = document.createElement("img");
     imageElementOne.src = productsFruit[i].imgUrl;
     imageElementOne.style.width = "160px";
     imageElementOne.style.height = "100px";
     

     const nameElementOne = document.createElement("p");
     nameElementOne.textContent = productsFruit[i].name;
      nameElementOne.style.color = "green";

     const priceElementOne = document.createElement("p");
     priceElementOne.textContent = productsFruit[i].price;
     priceElementOne.style.color = "red";

     const buttonAddOne = document.createElement("button");
     buttonAddOne.textContent = productsFruit[i]. btnAdd;
     buttonAddOne.className = "addCart";
     buttonAddOne.addEventListener('click',function(){
         
         let name = productsFruit[i].name;
         let price = productsFruit[i].price;
         let img = productsFruit[i].imgUrl;
         addProductToCart(name, price, img);
    
        updateTotal();
     });
     

    
    

     itemElementOne.appendChild(imageElementOne);
     itemElementOne.appendChild(nameElementOne);
     itemElementOne.appendChild(priceElementOne);
     itemElementOne.appendChild(buttonAddOne);
    
     fruitDisplay.appendChild(itemElementOne);
    
 }


 const dryfruitsproDisplay = document.querySelector(".dryfruit-section");
 const dryfruitDisplay = document.querySelector(".dryfruit-display");

 const productsdryFruit = [
     {
         imgUrl:"images/kaju.jpeg",
         name: "Kaju",
         price: "120 Dkk",
         btnAdd: "Add to Cart",
       
       
    
     },

     {
         imgUrl: "images/almond.jpeg",
         name: "Almond",
         price: "150 Dkk",
         btnAdd: "Add to Cart",
        
       
    
    },
     {
         imgUrl: "images/dates.webp",
         name: "Dates",
         price: "60 Dkk",
          btnAdd:"Add to Cart",
        
    
     
    },
     {
         imgUrl: "images/Raisins.jpeg",
         name: "Raisins",
         price: "120 Dkk",
         btnAdd: "Add to Cart",
        
       
    
     },
     {
           imgUrl: "images/pista.jpg",
         name: "Pista",
         price: "190 Dkk",
         btnAdd: "Add to Cart",
     },
       {
           imgUrl: "images/walnut.jpg",
         name: "Walnut",
         price: "70 Dkk",
           btnAdd: "Add to Cart",
    },


 ];

 for (let i = 0; i < productsdryFruit.length; i++){
     const itemElementtwo = document.createElement("div");
     itemElementtwo.className = "item";
   

     const imageElementtwo = document.createElement("img");
     imageElementtwo.src = productsdryFruit[i].imgUrl;
     imageElementtwo.style.width = "160px";
     imageElementtwo.style.height = "100px";
  

     const nameElementtwo = document.createElement("p");
     nameElementtwo.textContent = productsdryFruit[i].name;
      nameElementtwo.style.color = "green";

     const priceElementtwo = document.createElement("p");
     priceElementtwo.textContent = productsdryFruit[i].price;
     priceElementtwo.style.color = "red";

    const buttonAddtwo = document.createElement("button");
     buttonAddtwo.textContent = productsdryFruit[i]. btnAdd;
     buttonAddtwo.className = "addCart";
     buttonAddtwo.addEventListener('click',function(){
         
         let name = productsdryFruit[i].name;
         let price = productsdryFruit[i].price;
         let img = productsdryFruit[i].imgUrl;
         addProductToCart(name, price, img);
    
        updateTotal();
     });
    
    

     itemElementtwo.appendChild(imageElementtwo);
     itemElementtwo.appendChild(nameElementtwo);
     itemElementtwo.appendChild(priceElementtwo);
     itemElementtwo.appendChild(buttonAddtwo);
    
    dryfruitDisplay.appendChild(itemElementtwo);
    
 }

//Deal Section Date JS
let countDate = new Date('june 20,2022 00:00:00').getTime();

function CountDown() {
    let now = new Date().getTime();
    let gap = countDate-now;

    let second = 1000;
    let minute = second * 60;
    let hour = minute * 60;
    let day = hour * 24;

    let d = Math.floor(gap / (day));
    let h = Math.floor((gap % (day)) / (hour));
    let m = Math.floor((gap % (hour)) / (minute));
    let s= Math.floor((gap % (minute))/(second));
 

    document.getElementById('day').innerText = d;
     document.getElementById('hour').innerText = h;

     document.getElementById('minute').innerText = m;

     document.getElementById('second').innerText = s;


}

setInterval(function () {
    CountDown();
}, 1000);

//toggle button

//   const navToggle = document.querySelector(".navbar_toggle");
//   const links = document.querySelector(".nav-links");

//   navToggle.onclick = () => {
//     links.classList.add("active");

// };
//   navToggle.addEventListener('click', function(){
//      links.classList.toggle("show-nav");
//   })

//  cartIcon.onclick = () => {
//     cart.classList.add("active");

// }
// closeCart.onclick = () => {
//     cart.classList.remove('active');
// }