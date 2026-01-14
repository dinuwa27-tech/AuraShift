/* ========================================
   JAVASCRIPT FOR AuraShift
   Sri Lankan E-Commerce Website with WhatsApp Integration
   ======================================== */

/* ============ CONFIGURATION ============ */

// IMPORTANT: Replace with your actual WhatsApp number (with country code, no + or spaces)
const WHATSAPP_NUMBER = '94719270390';

/* ============ PRODUCT DATA ============ */

// Product database with multilingual support
const productsData = [
    {
        id: 1,
        name: {
            en: 'Handmade Coconut Oil Soap',
        },
        price: 600,
        image: 'https://images.unsplash.com/photo-1600857062241-98e5dba60f2f?w=400&h=400&fit=crop',
        shortDesc: {
            en: 'Natural coconut oil soap for healthy skin',
        },
        fullDesc: {
            en: 'Premium handmade soap crafted with pure coconut oil from Sri Lankan coconuts. Rich in natural moisturizers, this soap cleanses gently while nourishing your skin. Perfect for daily use, suitable for all skin types.',
        }
    },
    {
        id: 2,
        name: {
            en: 'Ceylon Cinnamon Powder',
        },
        price: 850,
        image: 'https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=400&h=400&fit=crop',
        shortDesc: {
            en: 'Pure Ceylon cinnamon powder - 100g',

        },
        fullDesc: {
            en: 'Authentic Ceylon cinnamon powder sourced from Sri Lankan plantations. Known for its sweet, delicate flavor and numerous health benefits. Perfect for baking, cooking, and beverages. 100g pack.',
           
        }
    },
    {
        id: 3,
        name: {
            en: 'Herbal Hair Oil',
           
        },
        price: 1200,
        image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop',
        shortDesc: {
            en: 'Traditional herbal hair oil - 100ml',
           
        },
        fullDesc: {
            en: 'Traditional Sri Lankan herbal hair oil made with coconut oil and indigenous herbs. Promotes hair growth, reduces hair fall, and adds natural shine. Made following ancient Ayurvedic recipes. 100ml bottle.',
        }
    },
    {
        id: 4,
        name: {
            en: 'King Coconut Water Powder',
        },
        price: 750,
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
        shortDesc: {
            en: 'Natural king coconut water powder - 200g',
        },
        fullDesc: {
            en: 'Pure king coconut water powder made from fresh Sri Lankan king coconuts. Rich in electrolytes and minerals. Just add water for instant refreshment. Perfect for post-workout hydration. 200g pack.',
        }
    },
    {
        id: 5,
        name: {
            en: 'Traditional Jaggery',
        },
        price: 450,
        image: 'https://images.unsplash.com/photo-1606383260722-b559c3a279c7?w=400&h=400&fit=crop',
        shortDesc: {
            en: 'Pure palm jaggery - 500g',
        },
        fullDesc: {
            en: 'Traditional palm jaggery made from pure kitul palm sap. Natural sweetener rich in iron and minerals. Perfect replacement for refined sugar. Great for desserts and beverages. 500g pack.',
        }
    },
    {
        id: 6,
        name: {
            en: 'Ayurvedic Face Cream',
        },
        price: 950,
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
        shortDesc: {
            en: 'Natural Ayurvedic face cream - 50g',
        },
        fullDesc: {
            en: 'Ayurvedic face cream made with natural herbs and sandalwood. Provides deep moisturization, reduces dark spots, and gives radiant glow. Suitable for all skin types. Chemical-free formula. 50g jar.',
        }
    }
];

/* ============ TRANSLATIONS ============ */

// Translation object for all text content
const translations = {
    en: {
        businessName: 'AuraShift',
        tagline: 'Quality tech Products Delivered to Your Doorstep',
        orderWhatsApp: 'Order via WhatsApp',
        home: 'Home',
        products: 'Products',
        contact: 'Contact',
        featuredProducts: 'Featured Products',
        allProducts: 'All Products',
        viewDetails: 'View Details',
        addQuantity: 'Quantity',
        orderNow: 'Order Now',
        price: 'Price',
        description: 'Description',
        productDetails: 'Product Details',
        backToProducts: 'Back to Products',
        contactUs: 'Contact Us',
        phoneNumber: 'Phone Number',
        whatsappChat: 'WhatsApp Chat',
        businessAddress: 'Business Address',
        addressLine: '123, Galle Road, Colombo 03, Sri Lanka',
        deliveryInfo: 'Delivery Information',
        deliveryText: 'Island-wide delivery available. Cash on Delivery (COD) accepted.',
        openingHours: 'Opening Hours',
        hoursText: '24 Hours service',
        whatsappMessage: 'Hello,\nI would like to order:\n\nProduct: {product}\nQuantity: {quantity}\nPrice: Rs. {price}\nTotal: Rs. {total}\n\nPlease confirm availability. Thank you!',
        heroTitle: 'Discover Tech Products',
        heroSubtitle: 'High quality BrandNew and used products',
        whyChoose: 'Why Choose Us',
        feature1: '100% Quality',
        feature2: 'Island-wide Delivery',
        feature3: 'Cash on Delivery',
        feature1Desc: 'Used items are fully inspected before being sold',
        feature2Desc: 'We deliver to all areas of Sri Lanka',
        feature3Desc: 'Pay when you receive your order'
    },
   
    };

/* ============ STATE MANAGEMENT ============ */

// Application state
let currentLanguage = 'en';
let productQuantities = {}; // Stores quantities for each product

/* ============ UTILITY FUNCTIONS ============ */

/**
 * Get translation for current language
 * @param {string} key - Translation key
 * @returns {string} Translated text
 */
function t(key) {
    return translations[currentLanguage][key] || key;
}

/**
 * Format number as LKR currency
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount) {
    return `Rs. ${amount.toLocaleString()}`;
}

/**
 * Get quantity for a product
 * @param {number} productId - Product ID
 * @returns {number} Current quantity
 */
function getQuantity(productId) {
    return productQuantities[productId] || 1;
}

/**
 * Update quantity for a product
 * @param {number} productId - Product ID
 * @param {number} change - Change amount (+1 or -1)
 */
function updateQuantity(productId, change) {
    const current = getQuantity(productId);
    const newQuantity = Math.max(1, current + change);
    productQuantities[productId] = newQuantity;
    
    // Update display if element exists
    const qtyElement = document.querySelector(`[data-qty-display="${productId}"]`);
    if (qtyElement) {
        qtyElement.textContent = newQuantity;
    }
}

/**
 * Generate WhatsApp order link
 * @param {object} product - Product object
 * @param {number} quantity - Order quantity
 * @returns {string} WhatsApp URL with pre-filled message
 */
function generateWhatsAppLink(product, quantity) {
    const total = product.price * quantity;
    const message = t('whatsappMessage')
        .replace('{product}', product.name[currentLanguage])
        .replace('{quantity}', quantity)
        .replace('{price}', product.price.toLocaleString())
        .replace('{total}', total.toLocaleString());
    
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Save selected product to session for product detail page
 * @param {number} productId - Product ID
 */
function saveSelectedProduct(productId) {
    // Using JavaScript variable instead of localStorage
    window.selectedProductId = productId;
}

/**
 * Get selected product from session
 * @returns {object|null} Product object or null
 */
function getSelectedProduct() {
    const productId = window.selectedProductId;
    if (!productId) {
        // Try to get from URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const urlProductId = parseInt(urlParams.get('id'));
        if (urlProductId) {
            return productsData.find(p => p.id === urlProductId);
        }
        return null;
    }
    return productsData.find(p => p.id === productId);
}

/* ============ LANGUAGE MANAGEMENT ============ */

/**
 * Change application language
 * @param {string} lang - Language code ('en', 'si', 'ta')
 */
function changeLanguage(lang) {
    currentLanguage = lang;
    
    // Update language button states
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update all text content
    updatePageContent();
}

/**
 * Update all text content on page based on current language
 */
function updatePageContent() {
    // Update all elements with translation IDs
    Object.keys(translations[currentLanguage]).forEach(key => {
        const elements = document.querySelectorAll(`#${key}`);
        elements.forEach(el => {
            el.textContent = t(key);
        });
    });
    
    // Reload products with new language
    const featuredGrid = document.getElementById('featuredProductsGrid');
    const allProductsGrid = document.getElementById('allProductsGrid');
    const productDetailCard = document.getElementById('productDetailCard');
    
    if (featuredGrid) loadFeaturedProducts();
    if (allProductsGrid) loadAllProducts();
    if (productDetailCard) loadProductDetail();
    
    // Update WhatsApp buttons
    updateWhatsAppButtons();
}

/* ============ PRODUCT RENDERING ============ */

/**
 * Create HTML for product card
 * @param {object} product - Product object
 * @param {boolean} showQuantity - Whether to show quantity selector
 * @returns {string} HTML string
 */
function createProductCard(product, showQuantity = false) {
    const quantity = getQuantity(product.id);
    
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name[currentLanguage]}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name[currentLanguage]}</h3>
                <p class="product-description">${product.shortDesc[currentLanguage]}</p>
                <div class="product-price">${formatCurrency(product.price)}</div>
                
                ${showQuantity ? `
                <div class="quantity-selector">
                    <span>${t('addQuantity')}:</span>
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="updateQuantity(${product.id}, -1)">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </button>
                        <span class="quantity-value" data-qty-display="${product.id}">${quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${product.id}, 1)">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </button>
                    </div>
                </div>
                ` : ''}
                
                <div class="product-actions">
                    ${showQuantity ? `
                    <a href="${generateWhatsAppLink(product, quantity)}" 
                       class="btn-order" 
                       target="_blank" 
                       rel="noopener noreferrer">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        ${t('orderNow')}
                    </a>
                    ` : ''}
                    <button class="btn-details" onclick="viewProductDetail(${product.id})">
                        ${t('viewDetails')}
                    </button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Load featured products on home page
 */
function loadFeaturedProducts() {
    const grid = document.getElementById('featuredProductsGrid');
    if (!grid) return;
    
    // Show first 3 products
    const featuredProducts = productsData.slice(0, 3);
    grid.innerHTML = featuredProducts.map(product => createProductCard(product, false)).join('');
}

/**
 * Load all products on products page
 */
function loadAllProducts() {
    const grid = document.getElementById('allProductsGrid');
    if (!grid) return;
    
    grid.innerHTML = productsData.map(product => createProductCard(product, true)).join('');
}

/**
 * Navigate to product detail page
 * @param {number} productId - Product ID
 */
function viewProductDetail(productId) {
    saveSelectedProduct(productId);
    window.location.href = `product.html?id=${productId}`;
}

/**
 * Load product detail page
 */
function loadProductDetail() {
    const container = document.getElementById('productDetailCard');
    if (!container) return;
    
    const product = getSelectedProduct();
    
    if (!product) {
        container.innerHTML = `
            <div class="loading-message">
                <p>Product not found.</p>
                <p style="margin-top: 10px;">Please select a product from the <a href="products.html">Products page</a>.</p>
            </div>
        `;
        return;
    }
    
    const quantity = getQuantity(product.id);
    const total = product.price * quantity;
    
    container.innerHTML = `
        <div class="product-detail-grid">
            <div class="product-detail-image">
                <img src="${product.image}" alt="${product.name[currentLanguage]}">
            </div>
            
            <div class="product-detail-info">
                <h1 class="product-detail-title">${product.name[currentLanguage]}</h1>
                
                <div class="product-detail-price">${formatCurrency(product.price)}</div>
                
                <div class="product-detail-description">
                    <h3>${t('description')}</h3>
                    <p>${product.fullDesc[currentLanguage]}</p>
                </div>
                
                <div class="quantity-selector-large">
                    <span>${t('addQuantity')}:</span>
                    <div class="quantity-controls-large">
                        <button class="qty-btn-large" onclick="updateProductDetailQuantity(${product.id}, -1)">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </button>
                        <span class="quantity-value-large" id="detailQuantity">${quantity}</span>
                        <button class="qty-btn-large" onclick="updateProductDetailQuantity(${product.id}, 1)">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div class="total-card">
                    <div class="total-row">
                        <span class="total-label">Total:</span>
                        <span class="total-amount" id="detailTotal">${formatCurrency(total)}</span>
                    </div>
                </div>
                
                <a href="${generateWhatsAppLink(product, quantity)}" 
                   id="detailWhatsAppBtn"
                   class="btn-order-large" 
                   target="_blank" 
                   rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    ${t('orderWhatsApp')}
                </a>
            </div>
        </div>
    `;
}

/**
 * Update quantity on product detail page
 * @param {number} productId - Product ID
 * @param {number} change - Change amount
 */
function updateProductDetailQuantity(productId, change) {
    updateQuantity(productId, change);
    
    const product = getSelectedProduct();
    const quantity = getQuantity(productId);
    const total = product.price * quantity;
    
    // Update quantity display
    document.getElementById('detailQuantity').textContent = quantity;
    
    // Update total
    document.getElementById('detailTotal').textContent = formatCurrency(total);
    
    // Update WhatsApp link
    document.getElementById('detailWhatsAppBtn').href = generateWhatsAppLink(product, quantity);
}

/* ============ WHATSAPP BUTTON MANAGEMENT ============ */

/**
 * Update all WhatsApp buttons with current language
 */
function updateWhatsAppButtons() {
    // Update floating WhatsApp button
    const floatingBtn = document.getElementById('floatingWhatsApp');
    if (floatingBtn) {
        floatingBtn.href = `https://wa.me/${WHATSAPP_NUMBER}`;
    }
    
    // Update hero WhatsApp button
    const heroBtn = document.getElementById('heroWhatsAppBtn');
    if (heroBtn) {
        heroBtn.href = `https://wa.me/${WHATSAPP_NUMBER}`;
    }
    
    // Update contact page WhatsApp button
    const contactBtn = document.getElementById('whatsappChatBtn');
    if (contactBtn) {
        contactBtn.href = `https://wa.me/${WHATSAPP_NUMBER}`;
    }
    
    // Update footer phone link
    const footerPhone = document.getElementById('footerPhone');
    if (footerPhone) {
        footerPhone.href = `tel:+${WHATSAPP_NUMBER}`;
    }
}

/* ============ INITIALIZATION ============ */

/**
 * Initialize the application
 */
function init() {
    // Set default language (could load from localStorage in real implementation)
    currentLanguage = 'en';
    
    // Set up language switcher buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            changeLanguage(btn.dataset.lang);
        });
    });
    
    // Load content based on current page
    const featuredGrid = document.getElementById('featuredProductsGrid');
    const allProductsGrid = document.getElementById('allProductsGrid');
    const productDetailCard = document.getElementById('productDetailCard');
    
    if (featuredGrid) {
        loadFeaturedProducts();
    }
    
    if (allProductsGrid) {
        loadAllProducts();
    }
    
    if (productDetailCard) {
        loadProductDetail();
    }
    
    // Update WhatsApp buttons
    updateWhatsAppButtons();
    
    // Initial content update
    updatePageContent();
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

/* ============ GLOBAL FUNCTION EXPOSURE ============ */

// Expose functions to global scope for inline event handlers
window.updateQuantity = updateQuantity;
window.viewProductDetail = viewProductDetail;
window.updateProductDetailQuantity = updateProductDetailQuantity;
window.changeLanguage = changeLanguage;