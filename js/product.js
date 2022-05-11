
const urlString = new URLSearchParams(window.location.search);
const prodId = urlString.get('id');

// Gives the location of an item in an array if found using id. Returns false if item id not present.
function findItem(id, array) {
    let itemCheck = array.find(item => item.id == id);
    if(itemCheck !== undefined){
        return itemCheck;
    } else {
        return false;
    }
}

let cart = [];

// Variables for product
var product = findItem(prodId, products);
var productImgs = product.imgSrc;
var productTitle = product.name;
var productPrice = product.price;
var productDesc = product.description;
var productSizes = product.stock;
var imgSelected = 0;
var sizeSelected;

// Variables for layout
productThumbnailContainer = document.getElementById("product-thumbnails");
productImgContainer = document.getElementById("product-img");
productTitleContainer = document.getElementById("product-title");
productPriceContainer = document.getElementById("product-price");
productDescContainer = document.getElementById("product-desc");
productSizesContainer = document.getElementById("product-sizes");

// Carrys out initial setup of product page
function setupProductPage() {
    productTitleContainer.innerText = productTitle;
    productImgContainer.alt = productTitle;
    productPriceContainer.innerText = "£" + productPrice;
    productDescContainer.innerText = productDesc;
    setupThumbnails();
    generateSizes();
}

// Setup product image thumbnails. Sets first image to active on page load.
function setupThumbnails() {
for(let i=0; i < productImgs.length; i++){
    let thumbnail = document.createElement("img");
    thumbnail.dataset.thumbnail = i;
    thumbnail.alt = productTitle;
    thumbnail.src = "img/products/" + productImgs[i];
    if(i == 0){
        thumbnail.dataset.active = true;
    }
    productThumbnailContainer.appendChild(thumbnail);
}
    updateProductImg();
}

// Updates the main product image
function updateProductImg(){
    productImgContainer.src = "img/products/" + productImgs[imgSelected];
}


// Generates buttons for each size available.
function generateSizes() {
    Object.keys(productSizes).forEach(size => {
        let sizeCircle = document.createElement("button");
        sizeCircle.className = "product-size-circle";
        sizeCircle.innerText = size;

        //Sets out of stock sizes to disabled.
        if (productSizes[size] == 0){
            sizeCircle.disabled = true;
        }

        //Adds event listener for size selection
        sizeCircle.addEventListener("click", (evt) => {
            selectedCircle = evt.target;
            let circleArray = document.querySelectorAll("button.product-size-circle");
            circleArray.forEach(button => {
                button.dataset.active = "false";
            })

            selectedCircle.dataset.active = "true";
            sizeSelected = selectedCircle.innerText;
        });

        productSizesContainer.appendChild(sizeCircle);
    });
}


// Sorts cart into numerical order by cart Id
function sortCart() {

    cart.sort((a,b)=>{

        let a1 = parseInt(a.id.split('-')[0]);
        let b1 = parseInt(b.id.split('-')[0]);
        let a2 = parseInt(a.id.split('-')[1]);
        let b2 = parseInt(b.id.split('-')[1]);

        return a1 - b1 || a2 - b2;
    })  
    
}

function stockCheck(id, cartItem) {
    let productId = parseInt(id.split('-')[0]);
    let size = parseInt(id.split('-')[1]);

    let product = findItem(productId, products);
    let stock = product.stock[size];
    let inCart = cartItem.qty;

    return stock - inCart;
}

// Adds current size selected to the cart.
function addToCart() {
    if(sizeSelected === undefined) {alert("Please select a size")}
    else {
        let id = prodId + "-" + sizeSelected;
        addItem(id);
    }
}


// Checks to see if more stock available. If yes, increases item qty in cart by 1. If no more available, gives alert message.
function addItem(id) {

    let cartCheck = findItem(id, cart);

    if(cartCheck !== false){
        let stock = stockCheck(id, cartCheck);
        if(stock > 0){
        cartCheck.qty += 1;
        } else if(stock < 0){
            throw new Error('Stock is negative'); 
        } 
        else {
            alert("No more stock available for this size");
        }
    } else {
        let item = {};
        item.id = id;
        item.qty = 1;
        cart.push(item);
        sortCart();
    }
}

// Checks if item is in cart. If item is not in cart, throws error. If item is found, decreases item qty by 1. If qty is then 0, removes item from cart.
function removeItem(id) {

    let cartCheck = findItem(id, cart);

    if(cartCheck !== false){
        cartCheck.qty -= 1;
        if(cartCheck.qty === 0){
            emptyItem = cart.indexOf(id);
            cart.splice(emptyItem, 1);
        }
    } else {
        throw new Error('Reducing quantity of missing item'); 
    }
}

setupProductPage();
