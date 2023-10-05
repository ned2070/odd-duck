// initialise array
const allProducts = [];

// Constructor for Product objects
function Product(name, src, views, clicks) {
  this.name = name;
  this.src = src;
  this.views = views;
  this.clicks = clicks;
  //fill allProducts array
  allProducts.push(this);
}

function checkLocal() {
  // get the characters from local storage and parse it so it's not a string
  const charsFromLS = JSON.parse(localStorage.getItem("allProducts"));

  // if Products exists in local storage:
  if (charsFromLS !== null) {
    //console log for debugging
    //console.log("storage");

    // reinstantiate stored array of objects one by one
    for (let i = 0; i < charsFromLS.length; i++) {
      const newProduct = new Product(
        charsFromLS[i].name,
        charsFromLS[i].src,
        charsFromLS[i].views,
        charsFromLS[i].clicks
      );
      allProducts.push(newProduct);
    }
  } else {
    // if it doesn't exist:

    // console log for debugging
    console.log("array");

    // instantiate the products

    new Product("bag", "/img/bag.jpg", 0, 0),
      new Product("bathroom", "/img/bathroom.jpg", 0, 0),
      new Product("boots", "/img/boots.jpg", 0, 0),
      new Product("breakfast", "/img/breakfast.jpg", 0, 0),
      new Product("bubblegum", "/img/bubblegum.jpg", 0, 0),
      new Product("chair", "/img/chair.jpg", 0, 0),
      new Product("cthulhu", "/img/cthulhu.jpg", 0, 0),
      new Product("dog-duck", "/img/dog-duck.jpg", 0, 0),
      new Product("dragon", "/img/dragon.jpg", 0, 0),
      new Product("pen", "/img/pen.jpg", 0, 0),
      new Product("pet-sweep", "/img/pet-sweep.jpg", 0, 0),
      new Product("scissors", "/img/scissors.jpg", 0, 0),
      new Product("shark", "/img/shark.jpg", 0, 0),
      new Product("sweep", "/img/sweep.png", 0, 0),
      new Product("tauntaun", "/img/tauntaun.jpg", 0, 0),
      new Product("unicorn", "/img/unicorn.jpg", 0, 0),
      new Product("water-can", "/img/water-can.jpg", 0, 0),
      new Product("wine-glass", "/img/wine-glass.jpg", 0, 0);
  }
}

// put allProducts into local storage
function putIntoLocalStorage() {
  // convert to string
  const allProductsStringified = JSON.stringify(allProducts);
  // store
  localStorage.setItem("allProducts", allProductsStringified);
}

const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");

// make sure the user only has 25 clicks
let userClicks = 0;
//let maxClicks = 25;
let maxClicks = 5; // for debugging purposes

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
  while (
    product1Index === product2Index ||
    product2Index === product3Index ||
    product1Index === Product3Index
  ) {
    product2Index = getRandomIndex();
    product3Index = getRandomIndex();
  }

  // change the src of the images
  image1.src = allProducts[product1Index].src;
  image2.src = allProducts[product2Index].src;
  image3.src = allProducts[product3Index].src;

  // chage the names of the images
  image1.alt = allProducts[product1Index].name;
  image2.alt = allProducts[product2Index].name;
  image3.alt = allProducts[product3Index].name;

  // increase the products views
  allProducts[product1Index].views++;
  allProducts[product2Index].views++;
  allProducts[product3Index].views++;
}

// handle what happens when click the image
// render 3 new images
function handleImgClick(event) {
  // check if the user has run out of clicks
  if (userClicks === maxClicks) {
    alert("You have run out of votes");
    // store results
    putIntoLocalStorage();
    return;
  }

  // increase the number of times the user has clicked
  userClicks++;

  // get the name of the clicked product
  let clickedProduct = event.target.alt;

  // increase the clicks of the product
  for (let i = 0; i < allProducts.length; i++) {
    if (clickedProduct === allProducts[i].name) {
      allProducts[i].clicks++;
      break;
    }
  }

  // render 3 more images
  renderProducts();
}

image1.addEventListener("click", handleImgClick);
image2.addEventListener("click", handleImgClick);
image3.addEventListener("click", handleImgClick);

//function showResults() {
// put items into a ul
//const showResults = document.getElementById("viewResults");

// loop through our products and make an li for each one
//for (let i = 0; i < allProducts.length; i++) {
//const li = document.createElement("li");
//const product = allProducts[i];
//li.textContent = `${product.name} was viewed ${product.views} times, and clicked ${product.clicks} times`;
// console log for debugging
//console.log(li.textContent);
//viewResults.appendChild(li);
//} //end loop
//} //end function

// check local storage
checkLocal();
// show initial products
renderProducts();
