// =====================================================
// ZUHUR - MAIN JAVASCRIPT
// =====================================================


// =====================================================
// PRODUCT DATA
// =====================================================

const productData = {

    "arabian-tonka": {
        name: "Arabian Tonka",
        price: 2499,
        size: "20 ml",
        category: "MEN",
        image: "images/Arabian Tonka.jpeg",
        description:
            "A rich and elegant fragrance combining tonka bean, sugar cane, saffron, oud and rose. Perfect for making a bold and memorable impression.",
        top: "Saffron",
        heart: "Rose",
        base: "Oud & Tonka"
    },

    "mitti": {
        name: "Mitti",
        price: 2299,
        size: "20 ml",
        category: "UNISEX",
        image: "images/Mitti.jpeg",
        description:
            "A unique earthy fragrance inspired by the beautiful smell of fresh soil after rain.",
        top: "Earthy Notes",
        heart: "Woody Notes",
        base: "Musk"
    },

    "purple-elixer": {
        name: "Purple Elixer",
        price: 2799,
        size: "20 ml",
        category: "WOMEN",
        image: "images/Purple Elixer.jpeg",
        description:
            "A beautiful and elegant fragrance with a rich, feminine and luxurious character.",
        top: "Fruity Notes",
        heart: "Floral Notes",
        base: "Vanilla"
    },

    "envy": {
        name: "Envy",
        price: 2199,
        size: "20 ml",
        category: "UNISEX",
        image: "images/Envy.jpeg",
        description:
            "A modern fragrance created for those who want to stand out with confidence and style.",
        top: "Fresh Notes",
        heart: "Floral Notes",
        base: "Woody Musk"
    },

    "ard-al-zafraan": {
        name: "Ard Al Zafraan",
        price: 2599,
        size: "20 ml",
        category: "UNISEX",
        image: "images/Ard Al Zafraan.jpeg",
        description:
            "A luxurious oriental fragrance with a warm and captivating character.",
        top: "Saffron",
        heart: "Floral Notes",
        base: "Oud & Amber"
    },

    "bombshell": {
        name: "Bombshell",
        price: 2699,
        size: "20 ml",
        category: "WOMEN",
        image: "images/Bombshell.jpeg",
        description:
            "A glamorous and refreshing fragrance designed to create a confident and unforgettable presence.",
        top: "Fruity Notes",
        heart: "Peony",
        base: "Musk"
    }

};


// =====================================================
// CART
// =====================================================

let cart =
    JSON.parse(localStorage.getItem("zuhurCart")) || [];


// =====================================================
// GET SELECTED PRODUCT
// =====================================================

function getSelectedProduct() {

    const urlParams =
        new URLSearchParams(window.location.search);

    const productId =
        urlParams.get("product");

    return productData[productId];

}


// =====================================================
// PRODUCT DETAILS PAGE
// =====================================================

const productNameElement =
    document.getElementById("productName");


if (productNameElement) {

    const product =
        getSelectedProduct();


    if (product) {

        document.getElementById("productName").textContent =
            product.name;

        document.getElementById("productPrice").textContent =
            "₹" + product.price.toLocaleString("en-IN");

        document.getElementById("productSize").textContent =
            "Size: " + product.size;

        document.getElementById("productCategory").textContent =
            product.category;


        const productImage =
            document.getElementById("productImage");

        productImage.src =
            product.image;

        productImage.alt =
            product.name;


        document.getElementById("productDescription").textContent =
            product.description;

        document.getElementById("topNote").textContent =
            product.top;

        document.getElementById("heartNote").textContent =
            product.heart;

        document.getElementById("baseNote").textContent =
            product.base;

    }

    else {

        document.getElementById("productName").textContent =
            "Product Not Found";

        document.getElementById("productPrice").textContent =
            "";

        document.getElementById("productSize").textContent =
            "";

        document.getElementById("productDescription").textContent =
            "The selected perfume could not be found.";

    }

}


// =====================================================
// ADD TO CART
// =====================================================

const addToCartButton =
    document.getElementById("addToCartBtn");


if (addToCartButton) {

    addToCartButton.addEventListener("click", function () {

        const product =
            getSelectedProduct();


        if (!product) {
            return;
        }


        const quantityElement =
            document.getElementById("quantity");


        const quantity =
            quantityElement
                ? parseInt(quantityElement.value)
                : 1;


        const existingProduct =
            cart.find(function (item) {

                return item.name === product.name;

            });


        if (existingProduct) {

            existingProduct.quantity += quantity;

        }

        else {

            cart.push({

                name: product.name,

                price: product.price,

                size: product.size,

                category: product.category,

                image: product.image,

                quantity: quantity

            });

        }


        saveCart();


        showNotification(
            "Added to Cart",
            product.name + " has been added to your cart."
        );


        setTimeout(function () {

            window.location.href =
                "cart.html";

        }, 900);

    });

}


// =====================================================
// BUY NOW
// =====================================================

const buyNowButton =
    document.getElementById("buyNowBtn");


if (buyNowButton) {

    buyNowButton.addEventListener("click", function () {

        const product =
            getSelectedProduct();


        if (!product) {
            return;
        }


        const quantityElement =
            document.getElementById("quantity");


        const quantity =
            quantityElement
                ? parseInt(quantityElement.value)
                : 1;


        const existingProduct =
            cart.find(function (item) {

                return item.name === product.name;

            });


        if (existingProduct) {

            existingProduct.quantity += quantity;

        }

        else {

            cart.push({

                name: product.name,

                price: product.price,

                size: product.size,

                category: product.category,

                image: product.image,

                quantity: quantity

            });

        }


        saveCart();


        window.location.href =
            "checkout.html";

    });

}


// =====================================================
// SAVE CART
// =====================================================

function saveCart() {

    localStorage.setItem(
        "zuhurCart",
        JSON.stringify(cart)
    );

}


// =====================================================
// CART PAGE
// =====================================================

const cartItemsContainer =
    document.getElementById("cartItems");


if (cartItemsContainer) {

    displayCart();

}


// =====================================================
// DISPLAY CART
// =====================================================

function displayCart() {

    cartItemsContainer.innerHTML = "";


    if (cart.length === 0) {

        cartItemsContainer.innerHTML = `

            <div class="empty-cart">

                <h2>
                    Your Cart is Empty
                </h2>

                <p>
                    Discover a fragrance that defines your presence.
                </p>

                <a href="products.html">
                    Explore Perfumes
                </a>

            </div>

        `;


        updateCartTotal();

        return;

    }


    cart.forEach(function (product, index) {

        const item =
            document.createElement("div");


        item.className =
            "cart-item";


        item.innerHTML = `

            <div class="cart-item-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>


            <div class="cart-item-info">

                <span class="cart-item-category">
                    ${product.category}
                </span>

                <h2>
                    ${product.name}
                </h2>

                <p class="cart-item-price">
                    ₹${product.price.toLocaleString("en-IN")}
                </p>

                <small>
                    Size: ${product.size || "20 ml"}
                </small>

            </div>


            <div class="cart-quantity">

                <button
                    onclick="decreaseQuantity(${index})">
                    −
                </button>

                <span>
                    ${product.quantity}
                </span>

                <button
                    onclick="increaseQuantity(${index})">
                    +
                </button>

            </div>


            <button
                class="remove-cart"
                onclick="removeFromCart(${index})">

                Remove

            </button>

        `;


        cartItemsContainer.appendChild(item);

    });


    updateCartTotal();

}


// =====================================================
// INCREASE QUANTITY
// =====================================================

function increaseQuantity(index) {

    cart[index].quantity++;

    saveCart();

    displayCart();

}


// =====================================================
// DECREASE QUANTITY
// =====================================================

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    }

    else {

        cart.splice(index, 1);

    }


    saveCart();

    displayCart();

}


// =====================================================
// REMOVE FROM CART
// =====================================================

function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();

    displayCart();

}


// =====================================================
// UPDATE CART TOTAL
// =====================================================

function updateCartTotal() {

    const subtotalElement =
        document.getElementById("cartSubtotal");


    const totalElement =
        document.getElementById("cartTotal");


    let total = 0;


    cart.forEach(function (product) {

        total +=
            product.price * product.quantity;

    });


    if (subtotalElement) {

        subtotalElement.textContent =
            "₹" + total.toLocaleString("en-IN");

    }


    if (totalElement) {

        totalElement.textContent =
            "₹" + total.toLocaleString("en-IN");

    }

}


// =====================================================
// CHECKOUT BUTTON
// =====================================================

const checkoutButton =
    document.getElementById("checkoutBtn");


if (checkoutButton) {

    checkoutButton.addEventListener("click", function () {

        if (cart.length === 0) {

            return;

        }


        window.location.href =
            "checkout.html";

    });

}


// =====================================================
// CONTACT FORM
// =====================================================

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value;


        contactForm.reset();


        showNotification(

            "Message Sent",

            "Thank you, " +
            name +
            ". We'll get back to you soon."

        );

    });

}


// =====================================================
// NOTIFICATION
// =====================================================

function showNotification(title, message) {

    const oldNotification =
        document.querySelector(".zuhur-notification");


    if (oldNotification) {

        oldNotification.remove();

    }


    const notification =
        document.createElement("div");


    notification.className =
        "zuhur-notification";


    notification.innerHTML = `

        <span class="notification-icon">
            ✓
        </span>

        <div>

            <strong>
                ${title}
            </strong>

            <p>
                ${message}
            </p>

        </div>

    `;


    document.body.appendChild(notification);


    setTimeout(function () {

        notification.classList.add("hide");


        setTimeout(function () {

            notification.remove();

        }, 400);

    }, 3000);

}


// =====================================================
// CHECKOUT PAGE
// =====================================================

const checkoutItems =
    document.getElementById("checkoutItems");


if (checkoutItems) {

    displayCheckout();

}


function displayCheckout() {

    checkoutItems.innerHTML = "";


    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <p style="color:#aaa;">
                Your cart is empty.
            </p>
        `;


        const checkoutTotal =
            document.getElementById("checkoutTotal");


        if (checkoutTotal) {

            checkoutTotal.textContent =
                "₹0";

        }

        return;

    }


    let total = 0;


    cart.forEach(function (product) {

        const itemTotal =
            product.price * product.quantity;


        total += itemTotal;


        const item =
            document.createElement("div");


        item.className =
            "checkout-summary-item";


        item.innerHTML = `

            <div class="checkout-summary-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>


            <div class="checkout-summary-info">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    Size: ${product.size || "20 ml"}
                </p>

                <p>
                    Quantity: ${product.quantity}
                </p>

                <p class="checkout-summary-price">
                    ₹${itemTotal.toLocaleString("en-IN")}
                </p>

            </div>

        `;


        checkoutItems.appendChild(item);

    });


    const checkoutTotal =
        document.getElementById("checkoutTotal");


    if (checkoutTotal) {

        checkoutTotal.textContent =
            "₹" + total.toLocaleString("en-IN");

    }

}


// =====================================================
// PLACE ORDER
// =====================================================

const checkoutForm =
    document.getElementById("checkoutForm");


if (checkoutForm) {

    checkoutForm.addEventListener("submit", async function (event) {

        event.preventDefault();


        if (cart.length === 0) {

            showNotification(
                "Cart Empty",
                "Please add a perfume before placing your order."
            );

            return;

        }


        const fullName =
            document.getElementById("fullName").value.trim();

        const mobile =
            document.getElementById("mobile").value.trim();

        const address =
            document.getElementById("address").value.trim();

        const city =
            document.getElementById("city").value.trim();

        const pincode =
            document.getElementById("pincode").value.trim();


        // =================================================
        // MOBILE VALIDATION
        // =================================================

        if (!/^[0-9]{10}$/.test(mobile)) {

            showNotification(
                "Invalid Mobile Number",
                "Please enter a valid 10-digit mobile number."
            );

            return;

        }


        // =================================================
        // PINCODE VALIDATION
        // =================================================

        if (!/^[0-9]{6}$/.test(pincode)) {

            showNotification(
                "Invalid Pincode",
                "Please enter a valid 6-digit pincode."
            );

            return;

        }


        // =================================================
        // CALCULATE TOTAL
        // =================================================

        const total =
            cart.reduce(function (sum, product) {

                return sum +
                    product.price * product.quantity;

            }, 0);


        // =================================================
        // CREATE ORDER
        // =================================================

        const order = {

            orderId:
                "ZUHUR" + Date.now(),

            customerName:
                fullName,

            mobile:
                mobile,

            address:
                address,

            city:
                city,

            pincode:
                pincode,

            paymentMethod:
                "Cash on Delivery",

            products:
                cart,

            total:
                total,

            orderDate:
                new Date().toLocaleString()

        };


        // =================================================
        // SAVE ORDER TO MONGODB
        // =================================================

        try {

            const response =
                await fetch("/api/orders", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body:
                        JSON.stringify(order)

                });


            const data =
                await response.json();


            if (!response.ok || !data.success) {

                throw new Error(
                    data.message ||
                    "Failed to place order"
                );

            }


            // =================================================
            // SAVE LAST ORDER LOCALLY
            // =================================================

            localStorage.setItem(
                "zuhurLastOrder",
                JSON.stringify(data.order)
            );


            // =================================================
            // CLEAR CART
            // =================================================

            localStorage.removeItem("zuhurCart");

            cart = [];


            // =================================================
            // ORDER CONFIRMATION
            // =================================================

            showNotification(
                "Order Confirmed",
                "Thank you for your order! Your ZUHUR perfume will be delivered soon."
            );


            // =================================================
            // OPEN PERFUMES PAGE
            // =================================================

            setTimeout(function () {

                window.location.href =
                    "products.html";

            }, 1800);


        } catch (error) {

            console.log(
                "Order Error:",
                error
            );

            showNotification(
                "Order Failed",
                "Unable to place your order. Please try again."
            );

        }

    });

}