// ---- API are loaded here 
const loadProducts = () => {
  fetch('./js/data.json')
    .then((response) => response.json())
    .then((data) => showProducts(data))
    .catch(err=> console.log(err))
};


//-----  All product are Showing in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: <b> ${product.category} </b></p>
      <h4>Rating:<b> ${product.rating.rate}</b></h4>
      <h4> <b> ${product.rating.count}</b> Person rated this product</h4>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-primary">add to cart</button>
      <button id="details-btn" class="btn btn-warning">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
//-------New Details are Adding in Cart Details 
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};
//---- Get All Old cart details and Convert it
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element) ;
  return converted;
};

//-------- Main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice =  parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText =  parseFloat(total).toFixed(2);
};

//------ Set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value);
};

//-------- Update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", (priceConverted * 0.2).toFixed(2));
    updateTotal()
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", (priceConverted * 0.3).toFixed(2));
    updateTotal()
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", (priceConverted * 0.4).toFixed(2));
    updateTotal()
  }
  else{
    updateTotal();
  }
};

//---------------GrandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = parseFloat(grandTotal).toFixed(2);
};
// --- Api's Function are called here
loadProducts();