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
        
        // Tutup menu saat mengklik tombol admin/logout
        document.querySelectorAll('.nav-links button').forEach(button => {
            button.addEventListener('click', () => {
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
            if (navLinks) navLinks.classList.remove('active');
            if (mobileMenu) mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        } else {
            // Pada mobile, sembunyikan nav-links jika tidak aktif
            if (mobileMenu && !mobileMenu.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
    
    // Check login status and initialize admin controls
    checkLoginStatus();
});

// Check login status from sessionStorage
function checkLoginStatus() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const adminControls = document.querySelectorAll('.admin-controls');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (isLoggedIn === 'true') {
        // Show admin controls
        document.body.classList.add('logged-in');
        adminControls.forEach(control => {
            if (control) control.style.display = 'block';
        });
        
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'block';
        
        // Show edit/delete buttons for memories
        document.querySelectorAll('.memory-actions').forEach(action => {
            if (action) action.style.display = 'block';
        });
        
        // Show delete buttons for gallery items
        document.querySelectorAll('.gallery-actions').forEach(action => {
            if (action) action.style.display = 'block';
        });
    } else {
        // Hide admin controls
        document.body.classList.remove('logged-in');
        adminControls.forEach(control => {
            if (control) control.style.display = 'none';
        });
        
        if (loginBtn) loginBtn.style.display = 'block';
        if (logoutBtn) logoutBtn.style.display = 'none';
        
        // Hide edit/delete buttons for memories
        document.querySelectorAll('.memory-actions').forEach(action => {
            if (action) action.style.display = 'none';
        });
        
        // Hide delete buttons for gallery items
        document.querySelectorAll('.gallery-actions').forEach(action => {
            if (action) action.style.display = 'none';
        });
    }
}

// Format date function for use across the application
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}