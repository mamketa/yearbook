// Login Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginModal = document.getElementById('loginModal');
    const closeBtn = document.querySelector('.close');
    const loginForm = document.getElementById('loginForm');
    
    // Check login status
    checkLoginStatus();
    
    // Show login modal
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            loginModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Logout functionality
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            sessionStorage.removeItem('isLoggedIn');
            checkLoginStatus();
            alert('Anda telah logout.');
        });
    }
    
    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Simple validation (in a real app, this would be a server-side check)
            if (username === 'admin' && password === 'admin123') {
                // Successful login
                sessionStorage.setItem('isLoggedIn', 'true');
                checkLoginStatus();
                loginModal.style.display = 'none';
                document.body.style.overflow = 'auto';
                alert('Login berhasil! Sekarang Anda dapat mengedit konten.');
            } else {
                alert('Username atau password salah!');
            }
        });
    }
});

function checkLoginStatus() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const adminControls = document.querySelectorAll('.admin-controls');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (isLoggedIn === 'true') {
        // Show admin controls
        document.body.classList.add('logged-in');
        adminControls.forEach(control => {
            control.style.display = 'block';
        });
        
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'block';
    } else {
        // Hide admin controls
        document.body.classList.remove('logged-in');
        adminControls.forEach(control => {
            control.style.display = 'none';
        });
        
        if (loginBtn) loginBtn.style.display = 'block';
        if (logoutBtn) logoutBtn.style.display = 'none';
    }
}