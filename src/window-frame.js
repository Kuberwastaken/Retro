// Create the Windows 98-style title bar
$(function() {
    // Create title bar HTML
    const titleBar = $('<div class="win98-title-bar">');
    const titleArea = $('<div class="win98-title">');
    const titleIcon = $('<img src="images/icons/retronote-16x16.png" alt="RetroNotes" class="win98-title-icon">');
    const titleText = $('<span id="window-title">Untitled - RetroNotes</span>');
    const buttons = $('<div class="win98-buttons">');
    const minimizeBtn = $('<div class="win98-button win98-minimize-btn" id="minimize-btn">');
    const maximizeBtn = $('<div class="win98-button win98-maximize-btn" id="maximize-btn">');
    const closeBtn = $('<div class="win98-button win98-close-btn" id="close-btn">');
    
    // Assemble title bar components
    titleArea.append(titleIcon, titleText);
    buttons.append(minimizeBtn, maximizeBtn, closeBtn);
    titleBar.append(titleArea, buttons);
    
    // Add title bar to the app container at the very top
    $("#app").prepend(titleBar);
    
    // Close button functionality
    closeBtn.on("click", function() {
        if (typeof are_you_sure === "function") {
            are_you_sure(function() {
                window.close();
            });
        } else {
            window.close();
        }
    });

    // Maximize button - toggle fullscreen
    let isMaximized = false;
    maximizeBtn.on("click", function() {
        if (isMaximized) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        } else {
            const element = document.documentElement;
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        }
        isMaximized = !isMaximized;
    });

    // Minimize button (just a visual effect)
    minimizeBtn.on("click", function() {
        $("#app").fadeOut(100).fadeIn(100);
    });
}); 