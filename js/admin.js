// Admin Editing Functions
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    checkLoginStatus();
    
    // Initialize admin functionality
    initAdminControls();
});

function initAdminControls() {
    // Memories Page Controls
    if (document.getElementById('addMemory')) {
        const addMemoryBtn = document.getElementById('addMemory');
        const memoryModal = document.getElementById('memoryModal');
        const memoryForm = document.getElementById('memoryForm');
        const closeMemoryModal = memoryModal.querySelector('.close');
        const deleteMemoryBtn = document.getElementById('deleteMemoryBtn');
        
        // Add memory button
        addMemoryBtn.addEventListener('click', function() {
            document.getElementById('memoryModalTitle').textContent = 'Tambah Kenangan';
            memoryForm.reset();
            document.getElementById('currentImageContainer').style.display = 'none';
            document.getElementById('deleteMemoryBtn').style.display = 'none';
            memoryModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        
        // Close modal
        closeMemoryModal.addEventListener('click', function() {
            memoryModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === memoryModal) {
                memoryModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Handle form submission
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
                const memoryIndex = memories.findIndex(m => m.id === parseInt(memoryId));
                if (memoryIndex !== -1) {
                    memories[memoryIndex].date = memoryDate;
                    memories[memoryIndex].title = memoryTitle;
                    memories[memoryIndex].caption = memoryCaption;
                    memories[memoryIndex].year = parseInt(memoryYear);
                    
                    if (memoryImage) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            memories[memoryIndex].image = e.target.result;
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
                            year: parseInt(memoryYear)
                        };
                        memories.push(newMemory);
                        renderMemories();
                    };
                    reader.readAsDataURL(memoryImage);
                }
            }
            
            // Reset form and close modal
            memoryForm.reset();
            memoryModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Delete memory
        if (deleteMemoryBtn) {
            deleteMemoryBtn.addEventListener('click', function() {
                const memoryId = parseInt(document.getElementById('memoryId').value);
                if (memoryId) {
                    memories = memories.filter(m => m.id !== memoryId);
                    renderMemories();
                    memoryModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    }
    
    // Building Page Controls
    if (document.getElementById('editBuilding')) {
        const editBuildingBtn = document.getElementById('editBuilding');
        const editBuildingModal = document.getElementById('editBuildingModal');
        const buildingForm = document.getElementById('buildingForm');
        const closeBuildingModal = editBuildingModal.querySelector('.close');
        const buildingDesc = document.getElementById('buildingDescription');
        
        editBuildingBtn.addEventListener('click', function() {
            document.getElementById('buildingDesc').value = buildingDesc.textContent;
            editBuildingModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        
        closeBuildingModal.addEventListener('click', function() {
            editBuildingModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        window.addEventListener('click', function(event) {
            if (event.target === editBuildingModal) {
                editBuildingModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        buildingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newDesc = document.getElementById('buildingDesc').value;
            buildingDesc.textContent = newDesc;
            
            editBuildingModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Change Main Image
    if (document.getElementById('changeMainImage')) {
        const changeImageBtn = document.getElementById('changeMainImage');
        const mainImage = document.getElementById('mainBuildingImage').querySelector('img');
        
        changeImageBtn.addEventListener('click', function() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            
            input.onchange = function(e) {
                const file = e.target.files[0];
                const reader = new FileReader();
                
                reader.onload = function(event) {
                    mainImage.src = event.target.result;
                };
                
                reader.readAsDataURL(file);
            };
            
            input.click();
        });
    }
    
    // Add Gallery Image
    if (document.getElementById('addGalleryImage')) {
        const addGalleryBtn = document.getElementById('addGalleryImage');
        const galleryModal = document.getElementById('galleryModal');
        const galleryForm = document.getElementById('galleryForm');
        const closeGalleryModal = galleryModal.querySelector('.close');
        const galleryGrid = document.getElementById('buildingGallery');
        
        addGalleryBtn.addEventListener('click', function() {
            galleryModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        
        closeGalleryModal.addEventListener('click', function() {
            galleryModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        window.addEventListener('click', function(event) {
            if (event.target === galleryModal) {
                galleryModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        galleryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const galleryImage = document.getElementById('galleryImage').files[0];
            const galleryCaption = document.getElementById('galleryCaption').value;
            
            const reader = new FileReader();
            reader.onload = function(e) {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item glass-card';
                
                galleryItem.innerHTML = `
                    <div class="gallery-image">
                        <img src="${e.target.result}" alt="${galleryCaption}">
                    </div>
                    ${galleryCaption ? `<p class="gallery-caption">${galleryCaption}</p>` : ''}
                    <div class="gallery-actions" style="display: none;">
                        <button class="delete-gallery-item glass-btn small danger">Hapus</button>
                    </div>
                `;
                
                galleryGrid.appendChild(galleryItem);
                
                // Add delete functionality if logged in
                if (sessionStorage.getItem('isLoggedIn')) {
                    const deleteBtn = galleryItem.querySelector('.delete-gallery-item');
                    deleteBtn.style.display = 'block';
                    deleteBtn.addEventListener('click', function() {
                        if (confirm('Apakah Anda yakin ingin menghapus gambar ini?')) {
                            galleryItem.remove();
                        }
                    });
                }
                
                // Reset form
                galleryForm.reset();
                galleryModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            };
            
            if (galleryImage) {
                reader.readAsDataURL(galleryImage);
            }
        });
    }
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}