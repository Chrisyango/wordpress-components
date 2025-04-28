"use strict";

// Load styles, for Webpack CSS Tree Shaking.
import "./style.scss";

document.addEventListener("DOMContentLoaded", () => {
    const blobs = Array.from(document.querySelectorAll('.background-circle__blob'));
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Blobs bounce around the screen
    blobs.forEach(blob => {
        let elementWidth = blob.offsetWidth;
        let elementHeight = blob.offsetHeight;
    
        let x = Math.random() * (windowWidth - elementWidth);
        let y = Math.random() * (windowHeight - elementHeight);
      
        let dx = (Math.random() > 0.5 ? 1 : -1) * 1.25; // Horizontal velocity
        let dy = (Math.random() > 0.5 ? 1 : -1) * 1.25; // Vertical velocity
      
        blob.style.left = x + "px";
        blob.style.top = y + "px";
    
        function animate() {
            x += dx;
            y += dy;
        
            // Bounce off the walls
            if (x + elementWidth > windowWidth || x < 0) {
              dx = -dx;
            }
            if (y + elementHeight > windowHeight || y < 0) {
              dy = -dy;
            }
        
            blob.style.left = x + (elementWidth / 2) + "px";
            blob.style.top = y + (elementHeight / 2) + "px";
    
            requestAnimationFrame(animate);
        }
        animate();
    });

    // Blob Follows Cursor
    // document.onpointermove = event => {
    //     const { clientX, clientY } = event;

    //     blob.animate({
    //         left: `${clientX}px`,
    //         top: `${clientY}px`
    //     }, {
    //         duration: 20000,
    //         fill: 'forwards'
    //     });
    // }
});
