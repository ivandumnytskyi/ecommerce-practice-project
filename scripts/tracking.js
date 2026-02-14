import {updateQuantity} from '../data/cart.js'
import { products,loadPage } from '../data/products.js'
import {orders} from '../data/ordersdata.js'


function renderPage(){
  updateQuantity()

  const parameters = Object.fromEntries((new URLSearchParams(window.location.search).entries()))

  let matchProduct;
  let thisQuantity;
  let deliveryDate;
  orders.forEach(order =>{
    if (order.id=== parameters.order){
      order.products.forEach(product =>{
        if (product.productId === parameters.product){
          thisQuantity = product.quantity;
          deliveryDate = new Date(product.estimatedDeliveryTime)
            .toLocaleDateString("en-US", 
              { month: "long", day: "numeric" }
            )
        }
      })
    }
  })


  products.forEach(fullInfo =>{
    if (fullInfo.id === parameters.product){
      matchProduct = fullInfo;
    }
  })
  const html = `
  <div class="order-tracking">
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${deliveryDate}
    </div>

    <div class="product-info">
      ${matchProduct.name}
    </div>

    <div class="product-info">
      Quantity: ${thisQuantity}
    </div>

    <img class="product-image" src="${matchProduct.image}">

    <div class="progress-labels-container">
      <div class="progress-label">
        Preparing
      </div>
      <div class="progress-label current-status">
        Shipped
      </div>
      <div class="progress-label">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar"></div>
    </div>
  </div>`

  document.querySelector('.main')
    .innerHTML = html
}

loadPage(renderPage)