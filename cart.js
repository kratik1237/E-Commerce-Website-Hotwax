document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const displayCartItems = (cartItems) => {
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cartItems.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title || item.name}">
                <h2>${item.title || item.name}</h2>
                <p>Price: $${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
            `;
            
            cartItemsContainer.appendChild(cartItem);
            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.textContent = totalPrice.toFixed(2);
    };

    displayCartItems(cart);
});