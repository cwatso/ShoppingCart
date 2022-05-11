let cartBtn = document.getElementById("cart-btn");
let cartCounter = document.getElementById("cart-counter");
let cartContainer = document.getElementById("cart-container");
let cartTable = document.getElementById("cart-table");
let cartClearBtn = document.getElementById("cart-clear");
let cartCheckoutBtn = document.getElementById("cart-checkout");
let productGrid = document.getElementById("product-grid");

function toggleWindow(window) {

    if(window.style.display === "flex"){
        window.style.display = "none";
    }
    else {
        window.style.display = "flex";
    }
}


cartBtn.addEventListener("click", () => {toggleWindow(cartContainer);})


//local storage
let cart = [];

// The product grid will only work if products.js is linked prior. If no products are found it will show an error instead of the product grid.

if (typeof products == 'undefined') {
    productGrid.parentElement.innerHTML = `<h2>Error</h2><p>No products found</p>`;
}

// Here we create a card div for each product and then add to grid.

products.forEach(product =>{

    let card = document.createElement("a");
    card.className = "card";
    card.id = `product-${product.id}`;
    card.href = `products.html?id=${product.id}`;

    card.innerHTML = `
        <img class="card-img-top" src="img/products/${product.imgSrc[0]}" alt="${product.name}">
        <div class="card-body">
            <h4 class="card-title">${product.name}</h4>
            <h5 class="card-text">&pound;${product.price}</h5>
        </div>
    `;

    productGrid.appendChild(card);
    
})