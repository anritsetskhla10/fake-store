
// menu

const menu = document.getElementById('menu');
const nav = Array.from(document.getElementsByTagName('nav'))[0];


menu.addEventListener('click', () => {
    if(!nav.classList.contains('navActive')){
        nav.classList.add('navActive');
    }else{
        nav.classList.remove('navActive');
    }
});


// fetch data


 const getdata = async function(){
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const cardContainer = Array.from(document.getElementsByClassName('card-section'))[0];
  
        data.map((item) => {
          const card = document.createElement('div');
          card.classList.add('card');
      
          const image = document.createElement('img');
          image.classList.add("img");
          image.src = item.image;

          const title = document.createElement('h2');
          title.classList.add('title')
          title.textContent = item.title;

          // const description = document.createElement('p');
          // description.classList.add('description')
          // description.textContent = item.description;

          const price = document.createElement('span');
          price.classList.add('price')
          price.textContent = `$${item.price}`;

          const category = document.createElement('span');
          category.classList.add('category')
          category.textContent = `Category: ${item.category}`;

          const rating = document.createElement('div');
          rating.classList.add('rating')

          const rateContainer = document.createElement('div');
          rateContainer.classList.add('rate-container')

          const rate = document.createElement('span');
          rate.classList.add('rate')
          rate.textContent = `rating: ${item.rating.rate}`;

          const starImg = document.createElement('img');
          starImg.src = './images/star-svgrepo-com.svg';

          const count = document.createElement('span');
          count.classList.add('count')
          count.textContent = item.rating.count;

          const addButton = document.createElement('button');
          addButton.textContent = 'Add to cart'

          rateContainer.append(rate , starImg)
          rating.append(rateContainer, count);
          card.append(image, title, /* description  ,*/ category, rating, price, addButton);
      
          cardContainer.appendChild(card);
        });
      
        console.log(cardContainer);




      } catch (error) {
        console.error("Failed to fetch data: ", error);
      }
 } 

getdata()