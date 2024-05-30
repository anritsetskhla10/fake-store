// Menu functionality

const menu = document.getElementById('menu');
const nav = Array.from(document.getElementsByTagName('nav'))[0];

menu.addEventListener('click', () => {
  if (!nav.classList.contains('navActive')) {
    nav.classList.add('navActive');
  } else {
    nav.classList.remove('navActive');
  }
});

// Cart functionality
const cardCount = document.getElementById('cardcount');
let cart = [];

// Function to save cart to localStorage
const saveCartToLocalStorage = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Function to load cart from localStorage
const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cart = JSON.parse(storedCart);
  }
};

// Add item to cart
const addToCart = (item) => {
  cart.push(item);
  saveCartToLocalStorage();
  updateCart();
};

// Update cart

const popupCount = document.querySelector('.popup-count');

const itemDiv = document.getElementById('cart-item');

const updateCart = () => {
  itemDiv.innerHTML = '';

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
    image.classList.add("img");
    image.src = item.image;

    const cartTitle = document.createElement('h5');
    cartTitle.textContent = item.title;
    
    const cartPrice = document.createElement('span');
    cartPrice.textContent = `$${item.price}`;

    const itemCount = document.createElement('span');
    itemCount.textContent = `1`;
    
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
      removeFromCart(index); 
      card.remove(); 
    });

    itemInfo.append(cartTitle, cartPrice)
    cardInfo.append(image, itemInfo)
    cardQuantity.append(itemCount,removeButton)
    card.append(cardInfo, cardQuantity);
    itemDiv.append(card);
    
  });

  cardCount.textContent = cart.length;
  popupCount.textContent = `Cart (${cart.length})`

};

// Remove item from cart
const removeFromCart = (index) => {
  cart.splice(index, 1);
  saveCartToLocalStorage();
  updateCart();
};

loadCartFromLocalStorage();
updateCart();

// Fetch and display product data
const getdata = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const cardContainer = Array.from(document.getElementsByClassName('card-section'))[0];

    data.forEach((item) => {
      const card = document.createElement('div');
      card.classList.add('card');

      const image = document.createElement('img');
      image.classList.add("img");
      image.src = item.image;

      const title = document.createElement('h2');
      title.classList.add('title');
      title.textContent = item.title;

      const price = document.createElement('span');
      price.classList.add('price');
      price.textContent = `$${item.price}`;

      const category = document.createElement('span');
      category.classList.add('category');
      category.textContent = `Category: ${item.category}`;

      const rating = document.createElement('div');
      rating.classList.add('rating');

      const rate = document.createElement('span');
      rate.classList.add('rate');
      rate.textContent = `Rating: ${item.rating.rate}`;

      const starImg = document.createElement('img');
      starImg.src = './images/star-svgrepo-com.svg';

      const buttons = document.createElement('div');
      buttons.classList.add('buttons');

      const seeButton = document.createElement('button');
      seeButton.textContent = 'See Product';

      const addButton = document.createElement('button');
      addButton.textContent = 'Add to cart';
      addButton.addEventListener('click', () => addToCart(item));

      buttons.append(seeButton, addButton);

      rating.append(rate, starImg);
      card.append(image, title, category, rating, price, buttons);

      cardContainer.appendChild(card);
    });

  } catch (error) {
    console.error("Failed to fetch data: ", error);
  }
};

getdata();