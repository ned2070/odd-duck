const allProducts = [];

// Constructor for Product objects
function Product(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.clicks = 0;
  //fill allProducts array
  allProducts.push(this);
}

function checkLocal() {
  // get the characters from local storage and parse it so it's not a string
  const charsFromLS = JSON.parse(localStorage.getItem("allProducts"));

  // if that exists:
  if (charsFromLS) {
    // reinstantiate my array of objects one by one
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

    // instantiate the products

    new Product("bag", "img/bag.jpg"),
      new Product("bathroom", "img/bathroom.jpg"),
      new Product("boots", "img/boots.jpg"),
      new Product("breakfast", "img/breakfast.jpg"),
      new Product("bubblegum", "img/bubblegum.jpg"),
      new Product("chair", "img/chair.jpg"),
      new Product("cthulhu", "img/cthulhu.jpg"),
      new Product("dog-duck", "img/dog-duck.jpg"),
      new Product("dragon", "img/dragon.jpg"),
      new Product("pen", "img/pen.jpg"),
      new Product("pet-sweep", "img/pet-sweep.jpg"),
      new Product("scissors", "img/scissors.jpg"),
      new Product("shark", "img/shark.jpg"),
      new Product("sweep", "img/sweep.png"),
      new Product("tauntaun", "img/tauntaun.jpg"),
      new Product("unicorn", "img/unicorn.jpg"),
      new Product("water-can", "img/water-can.jpg"),
      new Product("wine-glass", "img/wine-glass.jpg");
  }
}

// put allProducts into local storage
function putIntoLocalStorage() {
  const productsStringified = JSON.stringify(allProducts);
  localStorage.setItem("Products", productsStringified);
}
// Get container to be used to check that an image has been click
//const productContainer = document.getElementByID("viewReults");

const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");

// make sure the user only has 25 clicks
let userClicks = 0;
let maxClicks = 25;

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
// End of function

// check if the click is on an image
//if (event.target === imageContainer) {
//alert("Please click on an image");
//} else {
// render more products
//renderProducts();
//}

// handle what happens when click the image
// render 3 new images
function handleImgClick(event) {
  // check if the user has run out of clicks
  if (userClicks === maxClicks) {
    alert("You have run out of votes");
    // put our characters array into local storage
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

// a button to view the results
function showResults() {
  // put a bunch of lis into a ul
  const showResults = document.getElementById("viewResults");

  // loop through our products and make an li for each one
  for (let i = 0; i < allProducts.length; i++) {
    const li = document.createElement("li");
    const product = allProducts[i];
    li.textContent = `${product.name} was viewed ${product.views} times, and clicked ${product.clicks} times`;
    // console log for debugging
    //console.log(li.textContent);
    viewResults.appendChild(li);
  } //end loop
} //end function

// make the button show the results
const viewResults = document.getElementById("showResults");
// console log for debugging
// console.log("pressed");
viewResults.addEventListener("click", showResults);

// render the results
// when the user clicks the view results button
// render a ul full of lis that tell the user how many tiems each product has been clicked

// add the event listener to the products
//productContainer.addEventListener("click", handleProductClick);

checkLocal();
renderProducts();

// Make chart

function chartRender() {
  //context
  const ctx = document.getElementByID("productChart");
  //product names for chart
  const labels = [];
  //product views for chart
  const views = [];
  //product clicks for chart
  const clicks = [];

  // Fill arrays for chart from arrays for products
  for (let i = 0; i < allProducts.length; i++) {
    labels.push(allProducts[i].name);
    views.push(allProducts[i].views);
    clicks.push(allProducts[i].clicks);
  }

  // render chart
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "# of views",
          data: views,
          borderWidth: 1,
        },
        {
          type: "line",
          label: "# of clicks",
          data: clicks,
          borderWidth: 1,
        },
      ],
    },
  });
} // end function
