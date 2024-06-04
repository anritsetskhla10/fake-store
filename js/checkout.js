
const loadCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      return JSON.parse(storedCart);
    }
    return [];
  };
  

  const cart = loadCartFromLocalStorage();
  
  console.log(cart)

// Function to save cart to localStorage
const saveCartToLocalStorage = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
};



  const cards = document.querySelector('.cards')
  const cardCount = document.querySelector('#cardcount');

  
  export const updateCart = () => {
    cards.innerHTML = '';
  
    cart.forEach((item, index) => {
      const card = document.createElement('div');
      card.classList.add('card');
      
      const cardInfo = document.createElement('div');
      cardInfo.classList.add('card-info');
  
      const cardQuantity = document.createElement('div');
      cardQuantity.classList.add('quantity');
      
      const itemInfo = document.createElement('div');
      itemInfo.classList.add('item-info');
      
      const image = document.createElement('img');
      image.classList.add('img');
      image.src = item.image;
  
      const cartTitle = document.createElement('h5');
      cartTitle.textContent = item.title;
      
      const cartPrice = document.createElement('span');
      cartPrice.textContent = `$${item.price}`;
  
      const itemCount = document.createElement('span');
      itemCount.textContent = `${item.quantity}`;
      
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => {
        removeFromCart(index);
      });
  
      itemInfo.append(cartTitle, cartPrice);
      cardInfo.append(image, itemInfo);
      cardQuantity.append(itemCount, removeButton);
      card.append(cardInfo, cardQuantity);
      cards.append(card);
    });
  
    const totalQuantity = cart.reduce((accumulator, item) => accumulator + item.quantity, 0);
    cardCount.textContent = totalQuantity;
    priceCounter();
  };
  
  // Remove item from cart
  const removeFromCart = (index) => {
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
    } else {
      cart.splice(index, 1);
    }
    saveCartToLocalStorage();
    updateCart();
  };

  // price counter 

 function priceCounter(){
  const priceContainer = document.querySelector('.price-container');

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const shippingCost = calculateShippingCost(subtotal);

  const totalPrice = document.getElementById('total');
  totalPrice.textContent = `$${subtotal.toFixed(2)}`

  const shippingPrice = document.getElementById('shipping');
  shippingPrice.textContent = `$${shippingCost.toFixed(2)}`;
  const grandTotal = subtotal + shippingCost;
  const grandToTalPrice = document.getElementById('grand');
  grandToTalPrice.textContent = `$${grandTotal.toFixed(2)}`;
 }


 function calculateShippingCost(subtotal) {
  if (subtotal >= 100) {
    return 5; 
  } else if(subtotal == 0){
    return 0; 
  }else{
    return 10;
  }
}

  
  loadCartFromLocalStorage();
  updateCart();

