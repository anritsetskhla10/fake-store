
const loadCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      return JSON.parse(storedCart);
    }
    return [];
  };
  

  const cart = loadCartFromLocalStorage();
  

console.log(cart)