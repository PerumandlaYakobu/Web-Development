/* Smooth scroll nav */
document.querySelectorAll('[data-link]').forEach(link=>{
  link.addEventListener('click', e=>{
    e.preventDefault();
    document.querySelectorAll('nav a').forEach(x=>x.classList.remove('active'));
    link.classList.add('active');
    document.querySelector(link.getAttribute('href'))
      .scrollIntoView({behavior:'smooth'});
  });
});

/* ---------------- To-Do App ---------------- */
const TODO_KEY = "apex_todo_v1";
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const taskList = document.getElementById("task-list");
const tasksCount = document.getElementById("tasks-count");

function loadTodos() {
  return JSON.parse(localStorage.getItem(TODO_KEY) || "[]");
}
function saveTodos(list) {
  localStorage.setItem(TODO_KEY, JSON.stringify(list));
}
function renderTodos() {
  const todos = loadTodos();
  taskList.innerHTML = "";
  if (!todos.length) {
    taskList.innerHTML = "<div class='small'>No tasks yet</div>";
    tasksCount.textContent = "0 tasks";
    return;
  }
  todos.forEach((t,i)=>{
    const div=document.createElement("div");div.className="task";
    const chk=document.createElement("input");chk.type="checkbox";chk.checked=t.done;
    chk.onchange=()=>{t.done=chk.checked;saveTodos(todos);renderTodos();};
    const txt=document.createElement("span");txt.textContent=t.text;
    if(t.done) txt.style.textDecoration="line-through";
    const del=document.createElement("button");del.textContent="Delete";del.className="btn danger";
    del.onclick=()=>{todos.splice(i,1);saveTodos(todos);renderTodos();};
    div.appendChild(chk);div.appendChild(txt);div.appendChild(del);
    taskList.appendChild(div);
  });
  tasksCount.textContent=`${todos.filter(x=>!x.done).length} of ${todos.length} active`;
}
todoForm.onsubmit=e=>{
  e.preventDefault();
  const txt=todoInput.value.trim();
  if(!txt) return;
  const todos=loadTodos();
  todos.push({text:txt,done:false});
  saveTodos(todos);
  todoInput.value="";
  renderTodos();
};
document.getElementById("clear-done").onclick=()=>{
  saveTodos(loadTodos().filter(t=>!t.done));renderTodos();
};
document.getElementById("clear-all").onclick=()=>{
  if(confirm("Clear all tasks?")){localStorage.removeItem(TODO_KEY);renderTodos();}
};
renderTodos();

/* ---------------- Products ---------------- */
const PRODUCTS=[
  {name:"Wireless Headphones",category:"Electronics",price:1299,rating:4.4,img:"https://images.unsplash.com/photo-1518444022390-7f2d0f3a8a4f?q=80"},
  {name:"Running Shoes",category:"Footwear",price:2499,rating:4.6,img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80"},
  {name:"Coffee Mug",category:"Home",price:399,rating:4.1,img:"https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80"},
  {name:"Smartwatch",category:"Electronics",price:5999,rating:4.2,img:"https://images.unsplash.com/photo-1526378725806-1b6b5c6a7b66?q=80"},
  {name:"Denim Jacket",category:"Clothing",price:1999,rating:4.0,img:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80"},
  {name:"Bluetooth Speaker",category:"Electronics",price:1799,rating:4.5,img:"https://images.unsplash.com/photo-1585386959984-a415522e3f7f?q=80"}
];
const filter=document.getElementById("filter-category");
const sort=document.getElementById("sort-by");
const search=document.getElementById("search");
const grid=document.getElementById("products-grid");
function populateCategories(){
  const cats=["all",...new Set(PRODUCTS.map(p=>p.category))];
  filter.innerHTML=cats.map(c=>`<option value='${c}'>${c}</option>`).join('');
}
function renderProducts(){
  let list=[...PRODUCTS];
  if(filter.value!=="all") list=list.filter(p=>p.category===filter.value);
  if(search.value.trim()) list=list.filter(p=>p.name.toLowerCase().includes(search.value.toLowerCase()));
  if(sort.value==="price-asc") list.sort((a,b)=>a.price-b.price);
  if(sort.value==="price-desc") list.sort((a,b)=>b.price-a.price);
  if(sort.value==="rating-desc") list.sort((a,b)=>b.rating-a.rating);
  grid.innerHTML=list.map(p=>`
    <div class='product'>
      <img src='${p.img}' alt='${p.name}'>
      <h4>${p.name}</h4>
      <p>₹${p.price} — ⭐ ${p.rating}</p>
    </div>`).join('');
}
populateCategories();renderProducts();
filter.onchange=renderProducts;
sort.onchange=renderProducts;
search.oninput=()=>setTimeout(renderProducts,100);

/* ---------------- Contact form ---------------- */
const contactForm=document.getElementById("contact-form");
const feedback=document.getElementById("contact-feedback");
contactForm.onsubmit=e=>{
  e.preventDefault();
  feedback.textContent="Thank you! Your message has been recorded (demo).";
  contactForm.reset();
};
