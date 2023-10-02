// imageblock div
let imageContainer = document.querySelector("section");
let image1 = document.querySelector("section img:first-child");
let image2 = document.querySelector("section img:nth-child(2)");
let image3 = document.querySelector("section img(nth-child(3)");

// Cnstructor for Product objects
function Product(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.clicks = 0;
}

// function to choose a random product
function getRandomIndex() {
  return Math.floor(Math.random() * allProducts.length);
}

// function to render 3 random products
function renderProducts() {
  // get 3 random indexes from product array
  let product1Index = getRandomIndex();
  let product2Index = getRandomIndex();
  let product3Index = getRandomIndex();

  // prevent the two images being the same product
  while (product1Index === product2Index || product2Index === product3Index) {
    product2Index = getRandomIndex();
  }

  while (product1Index === product3Index) {
    product3Index = getRandomIndex();
  }

  // change the src of the images
  image1.src = allProducts[product11Index].src;
  image2.src = allProducts[product22Index].src;
  image2.src = allProducts[product32Index].src;

  // chage the namesof the images
  image1.alt = allProducts[product1Index].name;
  image2.alt = allProducts[product2Index].name;
  image3.alt = allProducts[product3Index].name;

  // increase the products views
  allProducts[product11Index].views++;
  allProducts[product21Index].views++;
  allProducts[product31Index].views++;
}

// handle the product being clicked
function handleProductClick(event) {
  // get the name of the product just clicked
  let clickedProduct = event.target.alt;

  // check if the click is on an image
  if (event.target === productContainer) {
    alert("Please click on an image");
  } else {
    // render more products
    renderProducts();
  }

  // increase the clicks of the product
  // get this working then try another method
  // loop through allProducts
  for (let i = 0; i < allGoats.length; i++) {
    // check if the name of the product in the array, matches the alt tag of our image
    if (clickedProduct === allProducts[i].name) {
      // increase the number of clicks
      allProducts[i].clicks++;
      // stop the for loop because we found the product
      break;
    }
  }
}

// instantiate the products
const allProducts = [
  new Product("bag", "./img/bag.jpg"),
  new Product("bathroom", "./img/bathroom.jpg"),
  new Product("boots", "./img/boots.jpg"),
  new Product("breakfast", "./img/breakfast.jpg"),
  new Product("bubblegum", "./img/bubblegum.jpg"),
  new Product("chair", "./img/chair.jpg"),
  new Product("cthulhu", "./img/cthulhi.jpg"),
  new Product("dog-duck", "./img/dog-duck.jpg"),
  new Product("dragon", "./img/dragon.jpg"),
  new Product("pen", "./img/pen.jpg"),
  new Product("pet-sweep", "./img/pet-sweep.jpg"),
  new Product("scissors", "./img/scissors.jpg"),
  new Product("shark", "./img/shark.jpg"),
  new Product("sweep", "./img/sweep.jpg"),
  new Product("tauntaun", "./img/tauntaun.jpg"),
  new Product("unicorn", "./img/unicorn.jpg"),
  new Product("water-can", "./img/water-canjpg"),
  new Product("wine-glass", "./img/wine-glass.jpg"),
];

// render the results
// when the user clicks the view results button
// render a ul full of lis that tell the user how many tiems each product has been clicked

// add the event listener to the products
productContainer.addEventListener("click", handleProductClick);

renderProducts();
