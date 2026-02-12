export const cart = []

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
            quantity : quantityBuId
          });
        }

}