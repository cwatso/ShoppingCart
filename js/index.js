// Code for index page only

// Import cart and utility codes
import * as main from '../js/main.js';

main.setupCart();

// Layout Variables
const productGrid = document.getElementById("product-grid");

// The product grid will only work if products.js is linked prior. If no products are found it will show an error instead of the product grid.

if (typeof products == 'undefined') {
    productGrid.parentElement.innerHTML = `<h2>Error</h2><p>No products found</p>`;
}

// Creates a card div for each product and then adds to grid.

function setupProductGrid(){

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
}

main.setupCart();
setupProductGrid();


