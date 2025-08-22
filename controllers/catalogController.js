class CatalogController {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.currentPage = 1;
        this.productsPerPage = 12;
        this.currentCategory = 'all';
        this.currentPriceRange = 'all';
        this.availabilityFilters = ['in-stock'];
        this.init();
    }

    async init() {
        try {
            await this.loadProducts();
            this.setupEventListeners();
            this.renderCatalog();
        } catch (error) {
            console.error('Error initializing catalog:', error);
        }
    }

    async loadProducts() {
        try {
            // Show loading state
            this.showLoadingState();
            
            const response = await fetch('models/products.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.products = data.products;
            this.filteredProducts = [...this.products];
            
            // Hide loading state
            this.hideLoadingState();
        } catch (error) {
            console.error('Error loading products:', error);
            // Fallback to sample data if fetch fails
            this.products = this.getSampleProducts();
            this.filteredProducts = [...this.products];
            
            // Hide loading state
            this.hideLoadingState();
            
            // Show error message
            this.showErrorMessage('Failed to load products. Showing sample data.');
        }
    }

    showLoadingState() {
        const productsGrid = document.querySelector('.products-grid');
        if (productsGrid) {
            productsGrid.classList.add('loading');
            productsGrid.innerHTML = `
                <div class="loading-state" style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem;">
                    <div class="loading-spinner"></div>
                    <p style="margin-top: 1rem; color: var(--color-muted);">Loading products...</p>
                </div>
            `;
        }
    }

    hideLoadingState() {
        const productsGrid = document.querySelector('.products-grid');
        if (productsGrid) {
            productsGrid.classList.remove('loading');
        }
    }

    showErrorMessage(message) {
        const filterSummary = document.querySelector('.filter-summary');
        if (filterSummary) {
            filterSummary.innerHTML = `<span style="color: #dc2626;">⚠️ ${message}</span>`;
        }
    }

    getSampleProducts() {
        // Fallback sample data if JSON loading fails
        return [
            {
                id: "classic-beige-kurta-pant",
                name: "ORVANO Classic Beige Kurta Pant",
                price: 999,
                originalPrice: 1999,
                currency: "INR",
                categoryId: "combos",
                rating: 5,
                reviews: 8,
                badges: ["discount"],
                discountAmount: 1000,
                images: ["assets/images/product-1.jpg"],
                status: "available"
            },
            {
                id: "classic-black-pants",
                name: "ORVANO Classic Black Pants",
                price: 999,
                originalPrice: 1999,
                currency: "INR",
                categoryId: "pants",
                rating: 4,
                reviews: 12,
                badges: ["discount"],
                discountAmount: 1000,
                images: ["assets/images/product-2.jpg"],
                status: "available"
            },
            {
                id: "gurkha-heritage-pants",
                name: "ORVANO Gurkha Heritage Pants (Beige)",
                price: 1499,
                originalPrice: 3290,
                currency: "INR",
                categoryId: "pants",
                rating: 5,
                reviews: 15,
                badges: ["discount"],
                discountAmount: 1791,
                images: ["assets/images/product-4.jpg"],
                status: "available"
            },
            {
                id: "classic-combo-brown-beige",
                name: "ORVANO Classic Combo (Brown & Beige)",
                price: 1999,
                originalPrice: 2999,
                currency: "INR",
                categoryId: "combos",
                rating: 5,
                reviews: 12,
                badges: ["discount"],
                discountAmount: 1000,
                images: ["assets/images/product-13.jpg"],
                status: "available"
            }
        ];
    }

    setupEventListeners() {
        // Filter button
        const filterBtn = document.querySelector('.filter-btn');
        if (filterBtn) {
            filterBtn.addEventListener('click', () => this.toggleFilterSidebar());
        }

        // Category filters
        const categoryFilters = document.querySelectorAll('.category-filter');
        categoryFilters.forEach(filter => {
            filter.addEventListener('change', (e) => this.handleCategoryFilter(e));
        });

        // Price filters
        const priceFilters = document.querySelectorAll('input[name="price"]');
        priceFilters.forEach(filter => {
            filter.addEventListener('change', (e) => this.handlePriceFilter(e));
        });

        // Availability filters
        const availabilityFilters = document.querySelectorAll('input[name="availability"]');
        availabilityFilters.forEach(filter => {
            filter.addEventListener('change', (e) => this.handleAvailabilityFilter(e));
        });

        // Search functionality
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }

        // Sort functionality
        const sortSelect = document.querySelector('#sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => this.handleSort(e.target.value));
        }
    }

    handleCategoryFilter(event) {
        this.currentCategory = event.target.value;
        this.currentPage = 1;
        this.filterProducts();
        this.renderCatalog();
    }

    handlePriceFilter(event) {
        this.currentPriceRange = event.target.value;
        this.currentPage = 1;
        this.filterProducts();
        this.renderCatalog();
    }

    handleAvailabilityFilter(event) {
        const value = event.target.value;
        if (event.target.checked) {
            if (!this.availabilityFilters.includes(value)) {
                this.availabilityFilters.push(value);
            }
        } else {
            this.availabilityFilters = this.availabilityFilters.filter(filter => filter !== value);
        }
        
        // Ensure at least one availability filter is selected
        if (this.availabilityFilters.length === 0) {
            this.availabilityFilters = ['in-stock'];
            event.target.checked = true;
        }
        
        this.currentPage = 1;
        this.filterProducts();
        this.renderCatalog();
    }

    handleSearch(searchTerm) {
        this.currentPage = 1;
        this.filterProducts(searchTerm);
        this.renderCatalog();
    }

    handleSort(sortBy) {
        this.currentPage = 1;
        this.sortProducts(sortBy);
        this.renderCatalog();
    }

    sortProducts(sortBy) {
        switch (sortBy) {
            case 'price-low':
                this.filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                this.filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                this.filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                // For demo purposes, sort by ID (you can add a date field later)
                this.filteredProducts.sort((a, b) => a.id.localeCompare(b.id));
                break;
            default:
                // Featured - keep original order
                break;
        }
    }

    filterProducts(searchTerm = '') {
        this.filteredProducts = this.products.filter(product => {
            // Category filter
            const matchesCategory = this.currentCategory === 'all' || product.categoryId === this.currentCategory;
            
            // Search filter
            const matchesSearch = searchTerm === '' || 
                product.name.toLowerCase().includes(searchTerm.toLowerCase());
            
            // Price range filter
            let matchesPrice = true;
            switch (this.currentPriceRange) {
                case 'under-1000':
                    matchesPrice = product.price < 1000;
                    break;
                case '1000-2000':
                    matchesPrice = product.price >= 1000 && product.price <= 2000;
                    break;
                case 'over-2000':
                    matchesPrice = product.price > 2000;
                    break;
                default:
                    matchesPrice = true;
            }
            
            // Availability filter
            const matchesAvailability = this.availabilityFilters.includes(product.status === 'sold-out' ? 'sold-out' : 'in-stock');
            
            return matchesCategory && matchesSearch && matchesPrice && matchesAvailability;
        });
    }

    renderCatalog() {
        this.renderProducts();
        this.renderPagination();
        this.renderFilterSummary();
    }

    renderProducts() {
        const productsContainer = document.querySelector('.products-grid');
        if (!productsContainer) return;

        const startIndex = (this.currentPage - 1) * this.productsPerPage;
        const endIndex = startIndex + this.productsPerPage;
        const productsToShow = this.filteredProducts.slice(startIndex, endIndex);

        if (productsToShow.length === 0) {
            productsContainer.innerHTML = `
                <div class="no-products">
                    <h3>No products found</h3>
                    <p>Try adjusting your filters or search terms.</p>
                </div>
            `;
            return;
        }

        productsContainer.innerHTML = productsToShow.map(product => this.renderProductCard(product)).join('');
    }

    renderProductCard(product) {
        const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
        const isSoldOut = product.status === 'sold-out';
        
        return `
            <div class="product-card ${isSoldOut ? 'sold-out' : ''}" data-product-id="${product.id}">
                <div class="product-image-container">
                    <img src="${product.images[0]}" alt="${product.name}" class="product-image" 
                         onerror="this.src='assets/images/placeholder.jpg'">
                    
                    ${product.badges.includes('discount') ? `
                        <div class="discount-badge">
                            SAVE ₹${product.discountAmount}
                        </div>
                    ` : ''}
                    
                    ${isSoldOut ? `
                        <div class="sold-out-overlay">
                            <span>SOLD OUT</span>
                        </div>
                    ` : ''}
                    
                    <div class="product-actions">
                        <button class="quick-view-btn" onclick="catalogController.quickView('${product.id}')" title="Quick View">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                        <button class="wishlist-btn" onclick="catalogController.toggleWishlist('${product.id}')" title="Add to Wishlist">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    
                    <div class="product-rating">
                        ${this.renderStars(product.rating)}
                        <span class="review-count">(${product.reviews} Reviews)</span>
                    </div>
                    
                    <div class="product-pricing">
                        <span class="current-price">₹${product.price.toLocaleString()}</span>
                        <span class="original-price">₹${product.originalPrice.toLocaleString()}</span>
                        <span class="discount-percentage">${discountPercentage}% OFF</span>
                    </div>
                </div>
                
                ${!isSoldOut ? `
                    <button class="add-to-cart-btn" onclick="catalogController.addToCart('${product.id}')">
                        Add to Cart
                    </button>
                ` : ''}
            </div>
        `;
    }

    renderStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let starsHTML = '';
        
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<span class="star full">★</span>';
        }
        
        if (hasHalfStar) {
            starsHTML += '<span class="star half">★</span>';
        }
        
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<span class="star empty">☆</span>';
        }
        
        return starsHTML;
    }

    renderPagination() {
        const paginationContainer = document.querySelector('.pagination');
        if (!paginationContainer) return;

        const totalPages = Math.ceil(this.filteredProducts.length / this.productsPerPage);
        
        if (totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }

        let paginationHTML = `
            <button class="pagination-btn prev-btn" ${this.currentPage === 1 ? 'disabled' : ''} 
                    onclick="catalogController.goToPage(${this.currentPage - 1})">
                ← Previous
            </button>
        `;

        // Show first page
        if (this.currentPage > 3) {
            paginationHTML += `
                <button class="pagination-btn page-btn" onclick="catalogController.goToPage(1)">
                    1
                </button>
                <span class="pagination-ellipsis">...</span>
            `;
        }

        // Show pages around current page
        const startPage = Math.max(1, this.currentPage - 1);
        const endPage = Math.min(totalPages, this.currentPage + 1);
        
        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `
                <button class="pagination-btn page-btn ${i === this.currentPage ? 'active' : ''}" 
                        onclick="catalogController.goToPage(${i})">
                    ${i}
                </button>
            `;
        }

        // Show last page
        if (this.currentPage < totalPages - 2) {
            paginationHTML += `
                <span class="pagination-ellipsis">...</span>
                <button class="pagination-btn page-btn" onclick="catalogController.goToPage(${totalPages})">
                    ${totalPages}
                </button>
            `;
        }

        paginationHTML += `
            <button class="pagination-btn next-btn" ${this.currentPage === totalPages ? 'disabled' : ''} 
                    onclick="catalogController.goToPage(${this.currentPage + 1})">
                Next →
            </button>
        `;

        // Add page info
        paginationHTML += `
            <div class="pagination-info">
                <span>Page ${this.currentPage} of ${totalPages}</span>
            </div>
        `;

        paginationContainer.innerHTML = paginationHTML;
    }

    renderFilterSummary() {
        const filterSummary = document.querySelector('.filter-summary');
        if (!filterSummary) return;

        const totalProducts = this.filteredProducts.length;
        const startIndex = (this.currentPage - 1) * this.productsPerPage + 1;
        const endIndex = Math.min(this.currentPage * this.productsPerPage, totalProducts);

        let summaryText = `Showing ${startIndex}-${endIndex} of ${totalProducts} products`;
        
        if (this.currentCategory !== 'all') {
            summaryText += ` • ${this.getCategoryName(this.currentCategory)}`;
        }
        
        if (this.currentPriceRange !== 'all') {
            summaryText += ` • ${this.getPriceRangeName(this.currentPriceRange)}`;
        }

        filterSummary.innerHTML = `<span>${summaryText}</span>`;
    }

    getCategoryName(categoryId) {
        const categories = {
            'kurtas': 'Traditional Kurtas',
            'pants': 'Traditional Pants',
            'combos': 'Complete Combos',
            'shirts': 'Cuban Collar Shirts'
        };
        return categories[categoryId] || categoryId;
    }

    getPriceRangeName(priceRange) {
        const priceRanges = {
            'under-1000': 'Under ₹1,000',
            '1000-2000': '₹1,000 - ₹2,000',
            'over-2000': 'Over ₹2,000'
        };
        return priceRanges[priceRange] || priceRange;
    }

    goToPage(page) {
        const totalPages = Math.ceil(this.filteredProducts.length / this.productsPerPage);
        if (page < 1 || page > totalPages) return;
        
        this.currentPage = page;
        this.renderCatalog();
        
        // Scroll to top of products
        const productsSection = document.querySelector('.catalog-content');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    toggleFilterSidebar() {
        const filterSidebar = document.querySelector('.filter-sidebar');
        if (filterSidebar) {
            filterSidebar.classList.toggle('active');
        }
    }

    addToCart(productId) {
        // Placeholder for cart functionality
        console.log(`Adding product ${productId} to cart`);
        // This would integrate with a cart system
        alert('Product added to cart! (Demo functionality)');
    }

    quickView(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            // Show quick view modal or navigate to product detail
            console.log(`Quick view for product: ${product.name}`);
            alert(`Quick View: ${product.name}\nPrice: ₹${product.price}\nRating: ${product.rating}/5 stars`);
        }
    }

    toggleWishlist(productId) {
        // Placeholder for wishlist functionality
        console.log(`Toggling wishlist for product ${productId}`);
        // This would integrate with a wishlist system
        alert('Added to wishlist! (Demo functionality)');
    }

    // Utility method to get products for external use
    getProducts() {
        return this.filteredProducts;
    }

    // Method to refresh catalog (useful for backend integration)
    refreshCatalog() {
        this.loadProducts().then(() => {
            this.filterProducts();
            this.renderCatalog();
        });
    }

    // Method to clear all filters
    clearFilters() {
        this.currentCategory = 'all';
        this.currentPriceRange = 'all';
        this.availabilityFilters = ['in-stock'];
        
        // Reset form elements
        document.querySelectorAll('.category-filter').forEach(filter => {
            filter.checked = filter.value === 'all';
        });
        
        document.querySelectorAll('input[name="price"]').forEach(filter => {
            filter.checked = filter.value === 'all';
        });
        
        document.querySelectorAll('input[name="availability"]').forEach(filter => {
            filter.checked = filter.value === 'in-stock';
        });
        
        this.currentPage = 1;
        this.filterProducts();
        this.renderCatalog();
    }
}

// Initialize catalog when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.catalogController = new CatalogController();
});
