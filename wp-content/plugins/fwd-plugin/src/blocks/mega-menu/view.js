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
import {
	store,
	getContext,
} from '@wordpress/interactivity';

// eslint-disable-next-line no-unused-vars
document.addEventListener("DOMContentLoaded", function () {
    const { actions } = store( 'fwd/mega-menu', {
        actions: {
            toggleMenu() {
                const context = getContext();
    
                if ( context.isMenuOpen ) {
                    actions.closeMenu();
                } else {
                    context.isMenuOpen = true;
                }
            },
            closeMenu() {
                            const context = getContext();
                context.isMenuOpen = false;
            },
        }
    } );
});
/* eslint-enable no-console */
