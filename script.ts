interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

let cart: Product[] = [];

function addToCart(productId: number): void {
  fetch('data.json')
    .then(res => res.json())
    .then((products: Product[]) => {
      const product = products.find(p => p.id === productId);
      if (product) {
        cart.push(product);
        alert(`${product.name} added to cart!`);
      }
    });
}
