const header = document.querySelector("header");
const cartIcon = header.lastElementChild;
const cart = document.querySelector(".cart");

cartIcon.addEventListener("click", () =>{
    cart.classList.toggle("show");
});

const menuIcon = header.firstElementChild;
const menu = document.querySelector(".header__menuNavegacion");

menuIcon.addEventListener("click", () =>{
    menu.classList.toggle("show");
});


const closeIcon = menu.firstElementChild;

closeIcon.addEventListener("click", () =>{
    menu.classList.toggle("show");
})


//CARIITO DE COMPRAS
let shopCart = [];
const buttons = document.querySelectorAll(".products__card--button");
const listCart = document.getElementById("list-cart");
const finaltotal = document.getElementById("total");
const counter = document.getElementById("counter");
const deleteAll = document.getElementById("emptyCart");

document.addEventListener("DOMContentLoaded", () =>{
    const cartSaved = localStorage.getItem("shopCart");
    if(cartSaved){
        shopCart = JSON.parse(cartSaved);
        showCart();
    }
})


buttons.forEach(buutton => {
    buutton.addEventListener("click", () => {
        const name = buutton.getAttribute("data-name");
        const price = parseFloat(buutton.getAttribute("data-price"));

        const existsProduct = shopCart.find(item => item.name === name);

        if(existsProduct){
            existsProduct.amount += 1;
        }else{
            shopCart.push({name, price, amount: 1});
        }

        deleteAll.hidden = false;

        showCart();
    });
});

function showCart(){
    listCart.innerHTML = "";
    let total = 0;
    let totalAmount = 0;

    shopCart.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${item.name} - $${item.price} x ${item.amount} = $${item.price * item.amount}
            <span class="delete" data-index="${index}">X</span>`;
        listCart.appendChild(li);
        
        total += item.price * item.amount;
        totalAmount += item.amount;
    });

    finaltotal.textContent = total;
    counter.textContent = totalAmount;

    localStorage.setItem("shopCart", JSON.stringify(shopCart));

    const deleteButtons = document.querySelectorAll(".delete")
    deleteButtons.forEach(button => {
        button.addEventListener("click", (e) =>{
            const index = e.target.getAttribute("data-index");

            if(shopCart[index].amount > 1){
                shopCart[index].amount -= 1;
            }else{
                shopCart.splice(index, 1)
            }

            showCart();
        });
    });
};


deleteAll.addEventListener("click", () =>{
    const confirmation = confirm("¿Estás seguro de que deseas vaciar el carrito?")
    if(confirmation){
        shopCart = [];
        localStorage.removeItem("shopCart");
        deleteAll.hidden = true;
        showCart();
    }
});