/* ---------------- Products ---------------- */
const PRODUCTS = [
  {id:1,name:"Wireless Headphones",category:"Electronics",price:1299,img:"https://images.unsplash.com/photo-1518444022390-7f2d0f3a8a4f?q=80"},
  {id:2,name:"Running Shoes",category:"Footwear",price:2499,img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80"},
  {id:3,name:"Coffee Mug",category:"Home",price:399,img:"https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80"},
  {id:4,name:"Smartwatch",category:"Electronics",price:5999,img:"https://images.unsplash.com/photo-1526378725806-1b6b5c6a7b66?q=80"},
  {id:5,name:"Denim Jacket",category:"Clothing",price:1999,img:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80"}
];

const filter = document.getElementById("filter-category");
const sort = document.getElementById("sort-by");
const search = document.getElementById("search");
const grid = document.getElementById("products-grid");

/* Populate categories */
function populateCategories(){
  const cats = ["all", ...new Set(PRODUCTS.map(p=>p.category))];
  filter.innerHTML = cats.map(c=>`<option value='${c}'>${c}</option>`).join("");
}

/* Render products */
function renderProducts(){
  let list = [...PRODUCTS];
  if(filter.value!=="all") list=list.filter(p=>p.category===filter.value);
  if(search.value.trim()) list=list.filter(p=>p.name.toLowerCase().includes(search.value.toLowerCase()));
  if(sort.value==="price-asc") list.sort((a,b)=>a.price-b.price);
  if(sort.value==="price-desc") list.sort((a,b)=>b.price-a.price);

  grid.innerHTML=list.map(p=>`
    <div class="product">
      <img src="${p.img}" alt="${p.name}" loading="lazy">
      <h4>${p.name}</h4>
      <p>₹${p.price}</p>
      <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `).join("");
}
populateCategories(); renderProducts();
filter.onchange=renderProducts;
sort.onchange=renderProducts;
search.oninput=()=>setTimeout(renderProducts,100);

/* ---------------- Cart ---------------- */
let cart = [];
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

function addToCart(id){
  const item=PRODUCTS.find(p=>p.id===id);
  cart.push(item);
  renderCart();
}
function removeFromCart(i){
  cart.splice(i,1);
  renderCart();
}
function renderCart(){
  if(!cart.length){cartItems.innerHTML="<p class='small'>Cart is empty</p>";cartTotal.textContent=0;return;}
  cartItems.innerHTML=cart.map((c,i)=>`
    <div class="cart-item">
      <span>${c.name} – ₹${c.price}</span>
      <button class="btn danger" onclick="removeFromCart(${i})">X</button>
    </div>
  `).join("");
  cartTotal.textContent = cart.reduce((sum,p)=>sum+p.price,0);
}
document.getElementById("clear-cart").onclick=()=>{cart=[];renderCart();}
