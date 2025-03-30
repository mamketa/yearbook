// Login Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginModal = document.getElementById('loginModal');
    const closeBtn = document.querySelector('#loginModal .close');
    const loginForm = document.getElementById('loginForm');
    
    // Check login status
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        document.body.classList.add('logged-in');
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'inline-block';
    }
    
    // Show login modal
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            loginModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
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
                document.body.classList.add('logged-in');
                loginModal.style.display = 'none';
                document.body.style.overflow = 'auto';
                
                if (loginBtn) loginBtn.style.display = 'none';
                if (logoutBtn) logoutBtn.style.display = 'inline-block';
                
                // Refresh memory actions visibility
                const toggleMemoryActions = window.toggleMemoryActions;
                if (toggleMemoryActions) toggleMemoryActions();
                
                alert('Login berhasil! Sekarang Anda dapat mengedit konten.');
            } else {
                alert('Username atau password salah!');
            }
        });
    }
});