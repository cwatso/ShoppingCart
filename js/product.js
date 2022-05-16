// Import cart and utility codes
import * as main from '../js/main.js';

// Get product Id from url
const urlString = new URLSearchParams(window.location.search);
const prodId = urlString.get('id');

// Variables for product
const product = main.findItem(prodId, products);
const productImgs = product.imgSrc;
const productTitle = product.name;
const productPrice = product.price;
const productDesc = product.description;
const productSizes = product.stock;
const productAttr = product.imgAttr;
var imgSelected = 0;
var sizeSelected;

// Variables for layout
const productThumbnailContainer = document.getElementById("product-thumbnails");
const productImgContainer = document.getElementById("product-img");
const productTitleContainer = document.getElementById("product-title");
const productPriceContainer = document.getElementById("product-price");
const productDescContainer = document.getElementById("product-desc");
const productSizesContainer = document.getElementById("product-sizes");
const productImgAttrContainer = document.getElementById("product-attr");
const addToCartBtn = document.getElementById("add-to-cart-btn");

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
            let selectedCircle = evt.target;
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


// Carrys out initial setup of product page
function setupProductPage() {
    productTitleContainer.innerText = productTitle;
    productImgContainer.alt = productTitle;
    productPriceContainer.innerText = "£" + productPrice;
    productDescContainer.innerText = productDesc;
    productImgAttrContainer.innerText = "* " + productAttr;
    setupThumbnails();
    generateSizes();
    addToCartBtn.addEventListener("click", () => {addToCart();})
    main.setupCart();
}

// Adds current size selected on product page to the cart.
function addToCart() {
    if(sizeSelected === undefined) {alert("Please select a size")}
    else {
        let id = prodId + "-" + sizeSelected;
        main.addItem(id);
    }
}


setupProductPage();