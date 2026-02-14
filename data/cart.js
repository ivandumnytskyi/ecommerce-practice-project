export let cart = JSON.parse(localStorage.getItem('cart'))

if(!cart){
  cart = []
}

/*updating items in cart by eventlistener 
on buttons*/
export function addToCart(id){
  let matchItem;
  const quantityBuId = Number(document.querySelector(`.js-selector-${id}`).value)
  cart.forEach((cartProduct) =>{
    if (id === cartProduct.productId){
      matchItem = cartProduct;
  }});

  if (matchItem){
    matchItem.quantity += quantityBuId
  }else{
    cart.push({
      productId : id,
      quantity : quantityBuId,
      deliveryId: '1'
    });
  }
  saveToStorage()

}

export function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function removeFromCart (id) {
  let newCart = [];
  cart.forEach(item =>{
    if (item.productId !==id){
      newCart.push(item)
    }
  })

  cart = newCart
  saveToStorage()
}

export function changeDeliveryOption(prudictId, deliveryOptionId){
  let matchItem;

  cart.forEach((cartProduct) =>{
    if (prudictId === cartProduct.productId){
      matchItem = cartProduct;
    }
  });
  matchItem.deliveryId = deliveryOptionId
  saveToStorage()
}

export function updateQuantity (){
  let cartQuantity = 0;
  cart.forEach(item => cartQuantity += item.quantity)
  document.querySelector('.cart-quantity')
    .innerHTML = `${cartQuantity || ''} `;
}