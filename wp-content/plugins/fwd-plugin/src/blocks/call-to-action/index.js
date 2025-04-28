/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-dom-ready/
 */
import { getBlockType, registerBlockVariation } from '@wordpress/blocks';
import domReady from '@wordpress/dom-ready';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */

/**
 * Internal dependencies
 */
import variations from './variations.js';
import './editor.scss';
import './style.scss';

domReady(function () {
	if ( getBlockType('fwd/link-wrapper') ) {
		variations.forEach(variation => {
			registerBlockVariation( 'fwd/link-wrapper', variation );
		});
	}
});
