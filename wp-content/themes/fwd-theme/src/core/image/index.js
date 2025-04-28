document.addEventListener("DOMContentLoaded", function () {
    const blockImages = Array.from(document.querySelectorAll('main .wp-block-image'));

    if (blockImages.length > 0) {
        blockImages.forEach(blockImage => {
            /**
             * Create image container, border, and wrapper
             * Add class to each element
             * Add element to page
             */
            const blockLink = blockImage.querySelector('a');

            if (blockLink) {
                const imageContainer = document.createElement('div');
                const imageBorder = document.createElement('div');
                const imageWrapper = document.createElement('div');
                const image = blockImage.querySelector('img');
                imageContainer.classList.add('wp-block-image-container');
                imageWrapper.classList.add('wp-block-image-wrapper');
                imageBorder.classList.add('wp-block-image-border');
                setBorderRadius(image, imageContainer);
                setBorderRadius(image, imageWrapper);
                setBorderRadius(image, imageBorder);
                blockImage.querySelector('a').prepend(imageContainer);
                imageContainer.prepend(imageBorder);
                imageContainer.prepend(imageWrapper);
                imageWrapper.prepend(image);
    
                /**
                 * On image hover, update border radiuses
                 */
                blockImage.addEventListener('mouseenter', event => {
                    setBorderRadius(image, imageContainer, true);
                    setBorderRadius(image, imageWrapper, true);
                    setBorderRadius(image, imageBorder, true);
                });
                blockImage.addEventListener('mouseleave', event => {
                    setBorderRadius(image, imageContainer);
                    setBorderRadius(image, imageWrapper);
                    setBorderRadius(image, imageBorder);
                });
            };
        });
    }

    /**
     * Set border radius for image container, wrapper, and colored border
     */
    function setBorderRadius(image, element, hover = false) {
        // Set default values
        const padding = 4;
        let imageBorderTopLeftRadius = 10;
        let imageBorderTopRightRadius = 10;
        let imageBorderBottomLeftRadius = 10;
        let imageBorderBottomRightRadius = 10;

        if (image.style.borderRadius.length != 0) {
            const style = image.style;
            imageBorderTopLeftRadius = parseInt(style.borderTopLeftRadius);
            imageBorderTopRightRadius = parseInt(style.borderTopRightRadius);
            imageBorderBottomLeftRadius = parseInt(style.borderBottomLeftRadius);
            imageBorderBottomRightRadius = parseInt(style.borderBottomRightRadius);
        }

        element.style.borderRadius = hover ? `${imageBorderBottomRightRadius - padding}px ${imageBorderBottomLeftRadius - padding}px ${imageBorderTopLeftRadius - padding}px ${imageBorderTopRightRadius - padding}px` : `${imageBorderTopLeftRadius}px ${imageBorderTopRightRadius}px ${imageBorderBottomRightRadius}px ${imageBorderBottomLeftRadius}px`;
    }
});