document.addEventListener('DOMContentLoaded', function() {
    // Get the product container and navigation buttons
    const productContainer = document.querySelector('.d-flex.flex-nowrap.overflow-x-auto.gap-4');
    const leftArrow = document.querySelector('.button .bi-arrow-left').closest('button');
    const rightArrow = document.querySelector('.button .bi-arrow-right').closest('button');
    const viewAllBtn = document.querySelector('.btn-danger.btn-lg');
    
    // Track current view state
    let isGridView = false;
    
    // Function to toggle between scroll and grid view
    function toggleView() {
        if (isGridView) {
            // Switch back to horizontal scroll view
            productContainer.className = 'd-flex flex-nowrap overflow-x-auto gap-4 pb-3';
            
            // Restore fixed widths on product cards
            document.querySelectorAll('.col-auto').forEach(card => {
                card.style.minWidth = '280px';
                card.style.maxWidth = '280px';
                card.style.width = '';
                card.style.marginBottom = '';
            });
            
            // Update button text
            viewAllBtn.textContent = 'View All Products';
            
            // Show navigation arrows
            leftArrow.style.display = '';
            rightArrow.style.display = '';
        } else {
            // Switch to grid view
            productContainer.className = 'overflow-auto row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4';
            
            // Adjust card styles for grid layout
            document.querySelectorAll('.col-auto').forEach(card => {
                card.style.minWidth = '';
                card.style.maxWidth = '';
                card.style.width = '';
                card.style.marginBottom = '1rem';
            });
            
            // Update button text
            viewAllBtn.textContent = 'Show Less';
            
            // Hide navigation arrows as they're not needed in grid view
            leftArrow.style.display = 'none';
            rightArrow.style.display = 'none';
        }
        
        // Toggle state
        isGridView = !isGridView;
    }
    
    // Add click event to left and right arrows
    leftArrow.addEventListener('click', function(e) {
        if (!isGridView) {
            // Scroll left when in scroll view
            productContainer.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        }
    });
    
    rightArrow.addEventListener('click', function(e) {
        if (!isGridView) {
            // Scroll right when in scroll view
            productContainer.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        }
    });
    
    // Add click event to View All Products button
    viewAllBtn.addEventListener('click', toggleView);
    
    // Optional: Add smooth scrolling to the product container
    productContainer.style.scrollBehavior = 'smooth';
    
    // Add hover effect to product cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Add "Add to Cart" overlay functionality to all products
    document.querySelectorAll('.position-relative').forEach(productImage => {
        // Skip if it already has an overlay
        if (productImage.querySelector('.card-img-overlay')) return;
        
        // Create the overlay
        const overlay = document.createElement('div');
        overlay.className = 'card-img-overlay d-flex flex-column justify-content-end p-0';
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.3s ease';
        
        const addToCartBtn = document.createElement('button');
        addToCartBtn.className = 'btn btn-dark w-100 rounded-0';
        addToCartBtn.textContent = 'Add To Cart';
        
        overlay.appendChild(addToCartBtn);
        productImage.appendChild(overlay);
        
        // Show/hide on hover
        productImage.addEventListener('mouseenter', () => {
            overlay.style.opacity = '1';
        });
        
        productImage.addEventListener('mouseleave', () => {
            overlay.style.opacity = '0';
        });
    });
});