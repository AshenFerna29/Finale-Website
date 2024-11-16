let cart = [];

function addToCart(button) {
    const product = button.closest('.col-4');
    const name = product.querySelector('h4').innerText;
    const price = parseFloat(product.querySelector('p').innerText.replace('LKR ', ''));
    const size = product.querySelector('#Size.selected')?.innerText || 'N/A';
    const quantity = parseInt(product.querySelector('input[type="number"]').value) || 1;

    const item = {
        name: name,
        price: price,
        size: size,
        quantity: quantity
    };

    cart.push(item);
    updateCartCount();
    saveCart();
}

function updateCartCount() {
    const cartIcon = document.querySelector('.fixed-cart');
    cartIcon.setAttribute('data-count', cart.length);
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    loadCart();

    document.querySelectorAll('#Size').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.col-4').querySelectorAll('#Size').forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    document.querySelectorAll('#cart').forEach(button => {
        button.addEventListener('click', function() {
            addToCart(this);
        });
    });

    document.querySelector('.fixed-cart').addEventListener('click', function() {
        window.location.href = 'cart.html';
    });

    document.getElementById("make-payment").addEventListener('click', function(){
        window.location.href = 'End.html'
    })
    document.getElementById("buy").addEventListener('click', function(){
        window.location.href = 'cart.html';
    })
    
        document.addEventListener('DOMContentLoaded', function() {
            const currentLocation = location.href;
            const menuItems = document.querySelectorAll('.nav-links ul li a');
            const menuLength = menuItems.length;
            for (let i = 0; i < menuLength; i++) {
                if (menuItems[i].href === currentLocation) {
                    menuItems[i].className = 'active';
                }
            }
        });
    

});