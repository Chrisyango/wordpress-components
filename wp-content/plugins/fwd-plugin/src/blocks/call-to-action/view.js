/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* eslint-disable no-console */
document.addEventListener("DOMContentLoaded", function () {
    const ctas = Array.from(document.querySelectorAll('.cta'));

    // Add fade in stagger effect
    ctas.forEach(cta => {
        // If starting position of CTA is above the fold, remove hidden class
        if ( cta.getBoundingClientRect().top < ( window.innerHeight / 2 ) ) {
            cta.classList.remove("hidden");
        }

        const children = Array.from(cta.children);
        
        children.forEach((child, i) => {
            const transitionDelay = 1.5 + (0.2 * i);
            child.style.transitionDelay = `${transitionDelay}s`
        });
    });

    // Fade content in when elements are in the middle of the page
    const ioConfiguration = {
        /**
         * This rootMargin creates a horizontal line vertically centered
         * that will help trigger an intersection at that the very point.
         */
        rootMargin: "-15% 0% -15% 0%",

        /**
         * This is the default so you could remove it.
         * I just wanted to leave it here to make it more explicit
         * as this threshold is the only one that works with the above
         * rootMargin
         */
        threshold: 0,
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.remove("hidden");
            }
        });
    }, ioConfiguration);

    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach((element) => {
        observer.observe(element);
    });
});
/* eslint-enable no-console */
