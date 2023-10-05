function chartRender() {
  // get the characters from local storage and parse it so it's not a string
  const chartProducts = JSON.parse(localStorage.getItem("allProducts"));

  //Make chart

  //context
  const ctx = document.getElementById("productChart");
  //product names for chart
  const labels = [];
  //product views for chart
  const views = [];
  //product clicks for chart
  const clicks = [];

  // Fill arrays for chart from arrays for products
  for (let i = 0; i < chartProducts.length; i++) {
    labels.push(chartProducts[i].name);
    views.push(chartProducts[i].views);
    clicks.push(chartProducts[i].clicks);
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

chartRender();
