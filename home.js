document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const searchBar = document.getElementById('search-bar');
    const categoryFilter = document.getElementById('category-filter');

    let allProducts = [];

    const createProductCard = (product) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title || product.name}">
            <h2>${product.title || product.name}</h2>
            <p>Price: $${product.price}</p>
            <p>Category: ${product.category}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        
        productList.appendChild(productCard);
    };

    const displayProducts = (products) => {
        productList.innerHTML = '';
        products.forEach(product => createProductCard(product));
    };

    Promise.all([
        fetch('https://fakestoreapi.com/products').then(response => response.json()),
        fetch('https://dummyjson.com/products').then(response => response.json())
    ])
    .then(results => {
        const [fakeStoreProducts, dummyJsonProducts] = results;

        allProducts = [...fakeStoreProducts, ...dummyJsonProducts.products];

        displayProducts(allProducts);
    })
    .catch(error => console.error('Error fetching products:', error));

    searchBar.addEventListener('input', (e) => {
        const searchQuery = e.target.value.toLowerCase();
        const filteredProducts = allProducts.filter(product =>
            (product.title || product.name).toLowerCase().includes(searchQuery)
        );
        displayProducts(filteredProducts);
    });

    categoryFilter.addEventListener('change', (e) => {
        const selectedCategory = e.target.value.toLowerCase();
        const filteredProducts = selectedCategory ?
            allProducts.filter(product => product.category.toLowerCase() === selectedCategory) :
            allProducts;
        displayProducts(filteredProducts);
    });

    window.addToCart = (productId) => {
        const product = allProducts.find(p => p.id === productId);
        if (!product) return;

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProductIndex = cart.findIndex(item => item.id === productId);

        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Product added to cart');
    };
});