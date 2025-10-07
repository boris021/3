// Render games function
function renderGames(container, gamesArray) {
    const element = document.getElementById(container);
    if (!element) return;
    
    element.innerHTML = gamesArray.map(game => `
        <div class="game-card">
            <div class="game-image" style="background: linear-gradient(135deg, ${game.color} 0%, ${adjustColor(game.color)} 100%);">
                ${game.emoji}
            </div>
            <div class="game-info">
                <div class="game-provider">${game.provider}</div>
                <div class="game-title">${game.title}</div>
            </div>
        </div>
    `).join('');
}

// Adjust color for gradient
function adjustColor(color) {
    return color + '99';
}

// Switch tabs function
function switchTab(tab) {
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    console.log('Переключено на таб:', tab);
}

// Toggle sidebar menu
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // Prevent body scroll when sidebar is open
    if (sidebar.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Close sidebar when clicking on a link
function closeSidebarOnLinkClick() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            toggleSidebar();
        });
    });
}

// Toggle mobile menu (deprecated, use toggleSidebar instead)
function toggleMenu() {
    toggleSidebar();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Render all game sections
    renderGames('topGames', games);
    renderGames('exclusiveGames', exclusiveGames);
    renderGames('liveGames', liveGames);
    
    // Initialize sidebar link handlers
    closeSidebarOnLinkClick();
    
    // Category filter functionality
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            console.log('Выбрана категория:', this.textContent);
        });
    });
    
    // Arrow buttons functionality
    const arrowButtons = document.querySelectorAll('.arrow-btn');
    arrowButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('Нажата кнопка стрелки');
            // Здесь можно добавить функционал прокрутки
        });
    });
    
    // View all buttons functionality
    const viewAllButtons = document.querySelectorAll('.view-all-btn');
    viewAllButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('Показать все игры');
            // Здесь можно добавить функционал показа всех игр
        });
    });
    
    // Mobile bottom nav functionality
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            // First item (menu) opens sidebar
            if (index === 0) {
                e.preventDefault();
                toggleSidebar();
            }
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    console.log('Сайт инициализирован успешно!');
});

// Slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;
let autoSlideInterval;

// Function to show specific slide
function showSlide(index) {
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    const sliderTrack = document.getElementById('sliderTrack');
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });

    // Update slides
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
    });
}

// Next slide
function nextSlide() {
    showSlide(currentSlide + 1);
    resetAutoSlide();
}

// Previous slide
function prevSlide() {
    showSlide(currentSlide - 1);
    resetAutoSlide();
}

// Go to specific slide
function goToSlide(index) {
    showSlide(index);
    resetAutoSlide();
}

// Auto slide
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        nextSlide();
    }, 5000); // Change slide every 5 seconds
}

// Reset auto slide
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Initialize slider
document.addEventListener('DOMContentLoaded', function() {
    showSlide(0);
    startAutoSlide();

    // Pause auto slide on hover
    const sliderWrapper = document.querySelector('.slider-wrapper');
    sliderWrapper.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    sliderWrapper.addEventListener('mouseleave', () => {
        startAutoSlide();
    });

    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    sliderWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    sliderWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            prevSlide();
        }
    }
});