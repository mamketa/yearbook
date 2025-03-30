// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function() {
            // Toggle class active pada mobile menu dan nav links
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Toggle overflow pada body untuk mencegah scroll saat menu terbuka
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
        });
        
        // Tutup menu saat mengklik link navigasi
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Pada desktop, pastikan nav-links selalu terlihat
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        } else {
            // Pada mobile, sembunyikan nav-links jika tidak aktif
            if (!mobileMenu.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
    
    // Check if user is logged in
    checkLoginStatus();
});

// Check login status from sessionStorage
function checkLoginStatus() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        document.body.classList.add('logged-in');
    }
}