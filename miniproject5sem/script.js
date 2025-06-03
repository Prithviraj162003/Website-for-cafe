
function openModal(title, price, imgSrc) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalPrice').textContent = price;
    document.getElementById('modalImage').src = imgSrc;
    document.getElementById('menuModal').style.display = 'block'; 
    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.classList.add('cta-button');
    addToCartButton.onclick = function () {
        addToCart(title, price, imgSrc); 
        closeModal(); 
    };
    document.querySelector('.modal-content').appendChild(addToCartButton);
}

function closeModal() {
    document.getElementById('menuModal').style.display = 'none';
    const addToCartButton = document.querySelector('.modal-content button');
    if (addToCartButton) {
        addToCartButton.remove();
    }
}

let cart = [];
let totalPrice = 0;

function openModal(title, price, imgSrc) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalPrice').textContent = price;
    document.getElementById('modalImage').src = imgSrc;
    document.getElementById('menuModal').style.display = 'block'; 

    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.classList.add('cta-button');
    addToCartButton.onclick = function () {
        addToCart(title, price, imgSrc); 
        closeModal(); 
    };
    document.querySelector('.modal-content').appendChild(addToCartButton);
}

function closeModal() {
    document.getElementById('menuModal').style.display = 'none';
    const addToCartButton = document.querySelector('.modal-content button');
    if (addToCartButton) {
        addToCartButton.remove();
    }
}

function addToCart(title, price, imgSrc) {
    const priceInt = parseInt(price.replace('₹ ', '').replace(',', ''));

    const item = {
        title: title,
        price: priceInt,
        imgSrc: imgSrc
    };

    cart.push(item);
    totalPrice += item.price;

    document.getElementById('cartCount').textContent = cart.length;
    updateCart();
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';
    
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = function() {
            deleteFromCart(index);
        };

        cartItem.innerHTML = `
            <img src="${item.imgSrc}" alt="${item.title}">
            <span>${item.title}</span>
            <span>₹${item.price}</span>
        `;
        
        cartItem.appendChild(deleteButton);
        cartItemsContainer.appendChild(cartItem);
    });

    document.getElementById('totalPrice').textContent = `₹${totalPrice.toLocaleString()}`;
}

function deleteFromCart(index) {
    const item = cart.splice(index, 1)[0];
    totalPrice -= item.price;
    document.getElementById('cartCount').textContent = cart.length;
    updateCart();
}

document.getElementById('cartLink').addEventListener('click', function() {
    document.getElementById('cartModal').style.display = 'block';
});

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items to your cart first.");
    } else {
        alert("Proceeding to checkout. Total Price: ₹" + totalPrice);
    }
}

window.onclick = function(event) {
    var menuModal = document.getElementById('menuModal');
    var cartModal = document.getElementById('cartModal');
    
    if (event.target === menuModal) {
        closeModal();
    } else if (event.target === cartModal) {
        closeCart();
    }
};

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.getElementById('contactForm').addEventListener('submit', function (e) {
    const name = this.name.value;
    const email = this.email.value;
    const message = this.message.value;

    const fields = [this.name, this.email, this.message];
    fields.forEach(field => field.classList.remove('error'));

    if (!name || !email || !message) {
        e.preventDefault();
        alert("Please fill out all fields before submitting!");

        if (!name) this.name.classList.add('error');
        if (!email) this.email.classList.add('error');
        if (!message) this.message.classList.add('error');

        return false;
    }

    alert("Thank you for your message!");
});
