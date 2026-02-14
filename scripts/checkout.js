import { cart, removeFromCart, changeDeliveryOption } from "../data/cart.js"
import { products, loadPage } from "../data/products.js"
import {deliveryOptions} from "../data/deliveryObj.js"
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import {addOrder} from '../data/orders.js'


loadPage(renderPage)

 function renderPage (){let orderSummuryHTML = '';

  function orderSummery(productInfo,cartProduct){
    const deliveryOptionId = cartProduct.deliveryId
    let deliveryOption;
    deliveryOptions.forEach((option)=>{
      if (option.id === deliveryOptionId){
        deliveryOption = option 
      }
    })
    const today = dayjs()
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'day')
    const dateStr = deliveryDate.format('dddd, MMMM D')
    let oneOrderHTML = `
    <div class="cart-item-container
    js-cart-item-container-${productInfo.id}">
      <div class="delivery-date">
        Delivery date: ${dateStr}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${productInfo.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${productInfo.name}
          </div>
          <div class="product-price">
            $${(productInfo.priceCents/100).toFixed(2)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartProduct.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary
            js-delete-quantity" data-product-id='${productInfo.id}'>
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${createDeliveryOptin(productInfo,cartProduct)}
          
        </div>
      </div>
    </div>
    `
    orderSummuryHTML += oneOrderHTML;
  }

  function createDeliveryOptin(productInfo,cartProduct){
    let optionsHTML = '';
    const today = dayjs()
    deliveryOptions.forEach((option)=>{
      const deliveryDate = today.add(option.deliveryDays, 'day')
      const dateStr = deliveryDate.format('dddd, MMMM D')
      const same = option.id === cartProduct.deliveryId;
      let html = `
      <div class="delivery-option
      js-delivery-option"
      data-option-id = '${option.id}' 
      data-product-id = '${productInfo.id}'>
        <input type="radio" 
        ${same? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${productInfo.id}">
        <div>
          <div class="delivery-option-date">
            ${dateStr}
          </div>
          <div class="delivery-option-price">
            $${option.priceCents === 0? 'FREE' : (option.priceCents/100).toFixed(2)} - Shipping
          </div>
        </div>
      </div>`
      optionsHTML+= html
    })
    return optionsHTML
  }

  function summury (){
    let countItems = 0;
    let fullPrise = 0;

    cart.forEach((cartProduct) =>{

    // getting full info about product
    let productInfo;
    products.forEach((fullProduct)=>{
      if (fullProduct.id === cartProduct.productId){
        productInfo = fullProduct
      }
    })
    countItems += cartProduct.quantity;
    fullPrise += (cartProduct.quantity * productInfo.priceCents)
    })

    
    let shipping = 0;
    cart.forEach(cartItem =>{
      deliveryOptions.forEach(option =>{
        if(option.id === cartItem.deliveryId){
          shipping +=option.priceCents
        }
      }) 

    })
    let paymantSummaryHTML =`
    <div class="payment-summary-title">
                Order Summary
              </div>

              <div class="payment-summary-row">
                <div>Items (${countItems}):</div>
                <div class="payment-summary-money">$${(fullPrise/100).toFixed(2)}</div>
              </div>

              <div class="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div class="payment-summary-money">$${(shipping/100).toFixed(2)}</div>
              </div>

              <div class="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div class="payment-summary-money">$${((fullPrise+shipping)/100).toFixed(2)}</div>
              </div>

              <div class="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div class="payment-summary-money">$${(((fullPrise+shipping)/1000).toFixed(2))}</div>
              </div>

              <div class="payment-summary-row total-row">
                <div>Order total:</div>
                <div class="payment-summary-money">$
                ${((fullPrise+shipping+Number(((fullPrise+shipping)/10).toFixed()))/100).toFixed(2)}
                </div>
              </div>

              <button class="place-order-button button-primary
              js-place-order">
                Place your order
              </button>`


    document.querySelector('.payment-summary')
      .innerHTML = paymantSummaryHTML

    document.querySelector('.return-to-home-link')
      .innerHTML = `${countItems} items`}





  cart.forEach((cartProduct) =>{

    // getting full info about product
    let productInfo;
    products.forEach((fullProduct)=>{
      if (fullProduct.id === cartProduct.productId){
        productInfo = fullProduct
      }
    })

    orderSummery(productInfo,cartProduct)
    document.querySelector('.order-summary')
    .innerHTML = orderSummuryHTML
  })

  document.querySelectorAll('.js-delete-quantity')
    .forEach((link) => {
      link.addEventListener('click',()=>{
        const prodId = link.dataset.productId;
        removeFromCart(prodId)


        document.querySelector(`.js-cart-item-container-${prodId}`).remove()
        summury()   
      })
  })

  document.querySelectorAll('.js-delivery-option')
    .forEach((element)=>{
      element.addEventListener('click', ()=>{
        const {optionId, productId } = element.dataset
        changeDeliveryOption(productId, optionId)
        renderPage()
      })
    })

  summury()

  document.querySelector('.js-place-order')
    .addEventListener('click', async ()=>{
      try{
        const response = await fetch('https://supersimplebackend.dev/orders',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cart: cart
          })
        })
        
        const order = await response.json()
        addOrder(order)
      }catch (error){
        alert('Unexpected eror. Try again later.')
      }
      
      window.location.href = 'orders.html'
    });
}