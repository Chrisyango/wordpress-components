document.addEventListener("DOMContentLoaded", function () {
    const buttons = Array.from(document.querySelectorAll('.wp-block-button__link, .gform_button'));

    buttons.forEach(button => {
        /**
        * Add Button Hover Effect depending on mouse position.
        */
        document.addEventListener('mousemove', event => {
            // Get Button Position
            const buttonX = button.getBoundingClientRect().x + (button.clientWidth / 2);
            const buttonY = button.getBoundingClientRect().y + (button.clientHeight / 2);

            /**
             * If Mouse is within 200px of Button, Button gravitates towards mouse
             */
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            if ((Math.abs(mouseX - buttonX) <= 200) && (Math.abs(mouseY - buttonY) <= 150)) {
                const transformX = Math.round((mouseX - buttonX) / 4);
                const transformY = Math.round((mouseY - buttonY) / 4);
                
                button.classList.add('magnetize');
                button.style.transform = `scale(1.05) translate3d(${transformX}px, ${transformY}px, 0px)`;
                
                /**
                * If Mouse is in Button, add a background color
                */
                const newButtonX = button.getBoundingClientRect().x + 50;
                const newButtonY = button.getBoundingClientRect().y + 50;
            } else {
                button.classList.remove('magnetize');
                button.style.removeProperty("transform");
            }
        })
    });
});
/* eslint-enable no-console */
