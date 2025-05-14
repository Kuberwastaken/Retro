// Dark mode functionality for RetroNotes

// Check for saved dark mode preference
function loadDarkModePreference() {
    try {
        return localStorage.getItem('retronotes-dark-mode') === 'true';
    } catch (e) {
        return false;
    }
}

// Save dark mode preference
function saveDarkModePreference(isDarkMode) {
    try {
        localStorage.setItem('retronotes-dark-mode', isDarkMode);
    } catch (e) {
        console.error("Could not save dark mode preference to localStorage", e);
    }
}

// Toggle dark mode
function toggleDarkMode() {
    const isDarkMode = $('body').hasClass('dark-mode');
    const newState = !isDarkMode;
    
    if (newState) {
        $('body').addClass('dark-mode');
    } else {
        $('body').removeClass('dark-mode');
    }
    
    saveDarkModePreference(newState);
    
    // Update menu checkmark
    updateDarkModeCheckmark(newState);
}

// Update menu checkmark
function updateDarkModeCheckmark(isDarkMode) {
    if (window.MenuBar && window.menus) {
        // This function might need to be called after menus are initialized
        try {
            // The menu system will automatically update the checkbox based on the check function
            // So we don't need to manually update it here
            
            // Force menu refresh if needed
            if (window.menu_bar && window.menu_bar.menuItems) {
                const viewMenuItem = window.menu_bar.menuItems.find(item => 
                    item.menu_button && item.menu_button.textContent.includes("View"));
                
                if (viewMenuItem && viewMenuItem.menu_popup) {
                    viewMenuItem.menu_popup.update();
                }
            }
        } catch (e) {
            console.error("Error updating dark mode menu item", e);
        }
    }
}

// Apply dark mode if saved preference exists
function initDarkMode() {
    const isDarkMode = loadDarkModePreference();
    if (isDarkMode) {
        $('body').addClass('dark-mode');
    }
    
    // Menu item will be checked when menus.js adds the View menu
}

// Initialize on document ready
$(document).ready(function() {
    initDarkMode();
}); 