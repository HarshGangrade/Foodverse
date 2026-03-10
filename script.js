const foods = [

{
name:"Pizza",
price:299,
rating:4.6,
category:"pizza",
img:"https://images.unsplash.com/photo-1513104890138-7c749659a591"
},

{
name:"Burger",
price:199,
rating:4.5,
category:"burger",
img:"https://images.unsplash.com/photo-1550547660-d9450f859349"
},

{
name:"Sandwich",
price:149,
rating:4.3,
category:"sandwich",
img:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af"
},

{
name:"Cold Coffee",
price:129,
rating:4.2,
category:"drink",
img:"https://images.unsplash.com/photo-1509042239860-f550ce710b93"
},

{
name:"Smoothie Bowl",
price:220,
rating:4.5,
category:"healthy",
img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
},

{
name:"Grilled Salmon",
price:420,
rating:4.7,
category:"healthy",
img:"https://images.unsplash.com/photo-1467003909585-2f8a72700288"
},

{
name:"Veggie Sandwich",
price:250,
rating:4.3,
category:"sandwich",
img:"https://hips.hearstapps.com/hmg-prod/images/delish-20210423-ultimate-veggie-sandwich-001-ab-1622826517.jpg"
}

]

const container = document.getElementById("foodCards")

let cart=[]

function renderFoods(list){

container.innerHTML=""

list.forEach((food,index)=>{

const card = document.createElement("div")

card.classList.add("card")

card.innerHTML = `

<div class="img-container">

<img src="${food.img}">
<div class="heart" onclick="toggleFav(this)">❤️</div>

</div>

<h4>${food.name}</h4>

<p>⭐ ${food.rating}</p>

<p>₹${food.price}</p>

<button onclick="addItem('${food.name}',${food.price})">
Add to Cart
</button>

`

container.appendChild(card)

})

}

renderFoods(foods)

function addToCart(index){

const item = foods[index]

addItem(item.name,item.price)

}

function addToCartManual(name,price){

addItem(name,price)

}

function addItem(name,price){

const existing = cart.find(item => item.name === name)

if(existing){

existing.quantity++

}
else{

cart.push({
name:name,
price:price,
quantity:1
})

}

updateCart()

}

function increaseItem(name){

const item = cart.find(i => i.name === name)

item.quantity++

updateCart()

}

function decreaseItem(name){

const item = cart.find(i => i.name === name)

item.quantity--

if(item.quantity <= 0){

cart = cart.filter(i => i.name !== name)

}

updateCart()

}

function updateCart(){

const list = document.getElementById("cartItems")

list.innerHTML=""

let total = 0

cart.forEach(item=>{

total += item.price * item.quantity

const li=document.createElement("li")

li.innerHTML = `
${item.name} ₹${item.price}

<div class="qty">

<button onclick="decreaseItem('${item.name}')">-</button>

<span>${item.quantity}</span>

<button onclick="increaseItem('${item.name}')">+</button>

</div>
`

list.appendChild(li)

})

document.getElementById("cartTotal").innerText = total

document.getElementById("cartCount").innerText =
cart.reduce((sum,item)=>sum+item.quantity,0)

}

function toggleFav(el){

el.classList.toggle("fav")

}
function goToCheckout(){

localStorage.setItem("cartData", JSON.stringify(cart))

window.location.href="checkout.html"

}

function toggleCart(){

document.getElementById("cartDrawer")
.classList.toggle("open")

}
function filterCategory(category){

if(category==="all"){

renderFoods(foods)

return

}

const filtered = foods.filter(food =>
food.category === category
)

renderFoods(filtered)

}
document.addEventListener("click", function(event){

const cart = document.getElementById("cartDrawer")
const cartButton = document.querySelector(".floating-cart")

if(!cart.contains(event.target) && !cartButton.contains(event.target)){

cart.classList.remove("open")

}

})
const searchInput = document.getElementById("searchInput")

searchInput.addEventListener("input", function(){

const value = searchInput.value.toLowerCase()

const filteredFoods = foods.filter(food =>
food.name.toLowerCase().includes(value)
)

renderFoods(filteredFoods)

})

function suggestFood(){

const random = foods[Math.floor(Math.random() * foods.length)]

const result = document.getElementById("suggestedFood")

result.innerHTML = `
🍽 Try this today:<br>
<strong>${random.name}</strong><br>
⭐ ${random.rating} | ₹${random.price}
`

}