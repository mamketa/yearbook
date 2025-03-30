// Admin Editing Functions
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedIn) {
        // Show admin controls
        document.body.classList.add('logged-in');
        
        // Initialize admin functionality
        initAdminControls();
    }
});

function initAdminControls() {
    // Memories Page Controls
    if (document.getElementById('addMemory')) {
        const addMemoryBtn = document.getElementById('addMemory');
        const memoryModal = document.getElementById('memoryModal');
        const memoryForm = document.getElementById('memoryForm');
        const closeMemoryModal = memoryModal.querySelector('.close');
        
        addMemoryBtn.addEventListener('click', function() {
            document.getElementById('memoryModalTitle').textContent = 'Tambah Kenangan';
            document.getElementById('memoryForm').reset();
            document.getElementById('memoryId').value = '';
            document.getElementById('currentImageContainer').style.display = 'none';
            memoryModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        
        closeMemoryModal.addEventListener('click', function() {
            memoryModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        window.addEventListener('click', function(event) {
            if (event.target === memoryModal) {
                memoryModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        memoryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const memoryId = document.getElementById('memoryId').value;
            const memoryDate = document.getElementById('memoryDate').value;
            const memoryTitle = document.getElementById('memoryTitle').value;
            const memoryCaption = document.getElementById('memoryCaption').value;
            const memoryYear = document.getElementById('memoryYear').value;
            const memoryImage = document.getElementById('memoryImage').files[0];
            
            if (memoryId) {
                // Edit existing memory
                const existingMemory = memories.find(m => m.id == memoryId);
                if (existingMemory) {
                    existingMemory.date = memoryDate;
                    existingMemory.title = memoryTitle;
                    existingMemory.caption = memoryCaption;
                    existingMemory.year = memoryYear;
                    
                    if (memoryImage) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            existingMemory.image = e.target.result;
                            renderMemories();
                        };
                        reader.readAsDataURL(memoryImage);
                    } else {
                        renderMemories();
                    }
                }
            } else {
                // Add new memory
                const newId = memories.length > 0 ? Math.max(...memories.map(m => m.id)) + 1 : 1;
                
                if (memoryImage) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const newMemory = {
                            id: newId,
                            date: memoryDate,
                            title: memoryTitle,
                            caption: memoryCaption,
                            image: e.target.result,
                            year: memoryYear
                        };
                        
                        memories.push(newMemory);
                        renderMemories();
                    };
                    reader.readAsDataURL(memoryImage);
                } else {
                    const newMemory = {
                        id: newId,
                        date: memoryDate,
                        title: memoryTitle,
                        caption: memoryCaption,
                        image: 'https://via.placeholder.com/400x300',
                        year: memoryYear
                    };
                    
                    memories.push(newMemory);
                    renderMemories();
                }
            }
            
            // Reset form and close modal
            memoryForm.reset();
            memoryModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Other admin controls (building, etc.) can be added here
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}