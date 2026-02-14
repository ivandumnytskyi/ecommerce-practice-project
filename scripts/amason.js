import { cart, addToCart } from '../data/cart.js';
import { products, loadProducts } from '../data/products.js'

loadProducts(renderProdGrid);
function renderProdGrid(){
  function updateQuantity (){let cartQuantity = 0;
  cart.forEach(item => cartQuantity += item.quantity)
        document.querySelector('.cart-quantity')
          .innerHTML = `${cartQuantity}`;}
  updateQuantity()
  /* ganerating our main content 
  and adding it to grid*/
  let prodHTML = '';
  products.forEach((product)=>{
    prodHTML += `
    <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              $${(product.priceCents / 100).toFixed(2)}
            </div>

            <div class="product-quantity-container">
              <select class='js-selector-${product.id}'>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary
            js-add-to-cart"
            data-product-id = "${product.id}"}>
              Add to Cart
            </button>
          </div>`
  })

  document.querySelector('.products-grid')
    .innerHTML = prodHTML;

  document.querySelectorAll('.js-add-to-cart')
    .forEach((button)=>{
      button.addEventListener('click',()=>{

        // adding product to cart
        const id = button.dataset.productId
        addToCart(id)

        /* changing quantity on the page 
        after adding to cart products*/
        updateQuantity()
        
        //litle animation of "added" message
        const addedMassege = document.querySelector(`.js-added-${id}`)
        addedMassege.style.opacity = 1
        setTimeout(()=>addedMassege.style.opacity = 0, 700)
        })
    })

}
