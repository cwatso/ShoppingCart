import {products} from '../js/products.js';

// Utility functions

// Gives the location of an item in an array if found using id. Returns false if item id not present.
export function findItem(id, array) {
    let itemCheck = array.find(item => item.id == id);
    if(itemCheck !== undefined){
        return itemCheck;
    } else {
        return false;
    }
}

// Extracts product id from cart id
export function getItemId(id){
    let itemId = parseInt(id.split('-')[0]);
    return itemId;
}

// Extracts product size from cart id
export function getItemSize(id){
    let itemSize = parseInt(id.split('-')[1]);
    return itemSize;
}

export function toggleWindow(window) {

    if(window.classList.contains("show")){
        window.classList.remove("show");
    }
    else {
        window.classList.add("show");
    }
}

// ----------------------------------------------


// Cart functionality

// Layout variables for cart
export const cartBtn = document.getElementById("cart-btn");
export const cartCounterContainer = document.getElementById("cart-counter");
export const cartContainer = document.getElementById("cart-container");
export const cartTable = document.getElementById("cart-table");
export const cartTotalContainer = document.getElementById("cart-total");
export const cartClearBtn = document.getElementById("cart-clear");

// Setting up cart storage
export let cart = [];

if(localStorage.getItem('cart')){
    let storageCart = localStorage.getItem('cart');
    cart = JSON.parse(storageCart);
}

// Functions specifically for Cart

// Checks to see if more stock available. If yes, increases item qty in cart by 1. If no more available, gives alert message.
export function addItem(id) {

    let cartCheck = findItem(id, cart);

    if(cartCheck !== false){
        let stock = stockCheck(id, cartCheck);
        if(stock > 0){
        cartCheck.qty += 1;
        displayCart();
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
        displayCart();
    }
}

// Clears cart
export function clearCart(){
    if(confirm("Are you sure you want to clear the cart?") == true){
        cart.splice(0, cart.length);
        displayCart();
    }
}

// Deletes item from cart regardless of qty.
export function deleteItem(id) {
    if(confirm("Are you sure you want to remove this item?") == true){
        let item = cart.indexOf(id);
        cart.splice(item, 1);
        displayCart();
    }
}

// Updates cart table and values displayed
export function displayCart(){
    
    cartTable.innerHTML = "";
    let cartCounter = 0; 
    let cartTotal = 0;

    if(cart.length == 0){
        cartTable.innerHTML = "<p>Your cart is empty.</p>";
    } else {


        cart.forEach(item => {

            let itemId = getItemId(item.id);
            let itemDetails = findItem(itemId, products);
            let itemImg = itemDetails.imgSrc[0];
            let itemTitle = itemDetails.name;
            let itemSize = getItemSize(item.id);
            let itemPrice = itemDetails.price;

            let itemRow = document.createElement("div");
            itemRow.className = "cart-row"
            itemRow.innerHTML = `
                                <img src= "img/products/${itemImg}">
                                <div>
                                    <h4>${itemTitle}</h4>
                                    <span>Size: ${itemSize}</span>
                                </div>
                                <div class="cart-price">
                                    <span>&pound;${itemPrice}</span>
                                </div>
                                <div class="cart-quantity">
                                    <button class="add-item"><i class="fas fa-angle-up"></i></button>
                                    <span>${item.qty}</span>
                                    <button class="remove-item"><i class="fas fa-angle-down"></i></button>
                                </div>
                                <div class="cart-trash">
                                    <button class="delete-item"><i class="fa fa-trash" aria-hidden="true"></i></button>
                                </div>
            `

            itemRow.querySelector(".add-item").addEventListener("click", () => {addItem(item.id)});
            itemRow.querySelector(".remove-item").addEventListener("click", () => {removeItem(item.id)});
            itemRow.querySelector(".delete-item").addEventListener("click", () => {deleteItem(item.id)});

            cartTable.appendChild(itemRow);
            cartCounter += item.qty;
            cartTotal += itemPrice * item.qty;

        })
    }

    cartTotalContainer.innerText = "?? " + cartTotal.toFixed(2);
    cartCounterContainer.innerText = cartCounter;

    localStorage.setItem('cart', JSON.stringify(cart));
}

// Checks if item is in cart. If item is not in cart, throws error. If item is found, decreases item qty by 1. If qty is then 0, removes item from cart.
export function removeItem(id) {

    let cartCheck = findItem(id, cart);

    if(cartCheck !== false){
        cartCheck.qty -= 1;
        if(cartCheck.qty === 0){
            let emptyItem = cart.findIndex(item => item.id == id);
            console.log(emptyItem);
            cart.splice(emptyItem, 1);
        }
        displayCart();
    } else {
        throw new Error('Reducing quantity of missing item'); 
    }
}

// This sets up the cart on page load
export function setupCart(){

    cartBtn.addEventListener("click", () => {toggleWindow(cartContainer);})
    cartClearBtn.addEventListener("click", () => {clearCart();})

    displayCart();

}

// Sorts cart into numerical order by cart Id
export function sortCart() {

    cart.sort((a,b)=>{

        let a1 = getItemId(a.id);
        let b1 = getItemId(b.id);
        let a2 = getItemSize(a.id);
        let b2 = getItemSize(b.id);

        return a1 - b1 || a2 - b2;
    })  
    
}

// Checks if further stock available to be added to cart
export function stockCheck(id, cartItem) {
    let productId = getItemId(id);
    let size = getItemSize(id);

    let product = findItem(productId, products);
    let stock = product.stock[size];
    let inCart = cartItem.qty;

    return stock - inCart;
}


// Navbar Functionality

export const navBtn = document.getElementById("nav-btn");
export const navLinks = document.getElementById("nav-links");

export function setupNavbar(){
    navBtn.addEventListener("click", () => {toggleWindow(navLinks)});
}