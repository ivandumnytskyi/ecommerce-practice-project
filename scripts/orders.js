import {orders} from '../data/ordersdata.js'
import { products,loadPage } from '../data/products.js'
import { updateQuantity } from '../data/cart.js'

function createOrdersHTML(){
  updateQuantity()
  
  let ordershtml = '';
  orders.forEach(order => {
    let detailsHTML = '';
    order.products.forEach(item =>{
      let matchProduct;
      products.forEach(fullInfo =>{
        if (fullInfo.id === item.productId){
          matchProduct = fullInfo;
        }
      })
      detailsHTML += `
        <div class="product-image-container">
                <img src="${matchProduct.image}">
              </div>

              <div class="product-details">
                <div class="product-name">
                  ${matchProduct.name}
                </div>
                <div class="product-delivery-date">
                  ${new Date(item.estimatedDeliveryTime)
                  .toLocaleDateString("en-US", 
                    { month: "long", day: "numeric" }
                  )}
                </div>
                <div class="product-quantity">
                  Quantity: ${item.quantity}
                </div>
                <button class="buy-again-button button-primary">
                  <img class="buy-again-icon" src="images/icons/buy-again.png">
                  <span class="buy-again-message">Buy it again</span>
                </button>
              </div>

              <div class="product-actions">
                <a href="tracking.html?order=${order.id}&product=${matchProduct.id}">
                  <button class="track-package-button button-secondary">
                    Track package
                  </button>
                </a>
              </div>

      `
    })
    let html = `
          <div class="order-container">
            
            <div class="order-header">
              <div class="order-header-left-section">
                <div class="order-date">
                  <div class="order-header-label">Order Placed:</div>
                  <div>${new Date(order.orderTime)
                  .toLocaleDateString("en-US", 
                    { month: "long", day: "numeric" }
                  )}</div>
                </div>
                <div class="order-total">
                  <div class="order-header-label">Total:</div>
                  <div>$${(order.totalCostCents/100).toFixed(2)}</div>
                </div>
              </div>

              <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>${order.id}</div>
              </div>
            </div>

            <div class="order-details-grid">
              ${detailsHTML}
            </div>
          </div>

  `
  ordershtml+=html
  });
  if (ordershtml !== ''){
  document.querySelector('.orders-grid')
  .innerHTML = ordershtml
  }
}
loadPage(createOrdersHTML)
