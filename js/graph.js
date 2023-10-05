//declare array
const allProducts = [];
const Products = [];

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
  const charsFromLS = JSON.parse(localStorage.getItem("Products"));

  // reinstantiate stored array of objects one by one
  for (let i = 0; i < charsFromLS.length; i++) {
    const newProduct = new Product(
      charsFromLS[i].name,
      charsFromLS[i].src,
      charsFromLS[i].views,
      charsFromLS[i].clicks
    );
    allProducts.push(newProduct);
    console.log(allProducts[i]);
  }
  console.log("storage");
}

// Make chart

function chartRender() {
  //context
  const ctx = document.getElementById("productChart");
  //product names for chart
  const labels = [];
  //product views for chart
  const views = [];
  //product clicks for chart
  const clicks = [];

  // Fill arrays for chart from arrays for products
  for (let i = 0; i < Products.length; i++) {
    labels.push(Products[i].name);
    views.push(Products[i].views);
    clicks.push(Products[i].clicks);
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
          type: "bar",
          label: "# of clicks",
          data: clicks,
          borderWidth: 1,
        },
      ],
    },
  });
} // end function

checkLocal();

chartRender();
