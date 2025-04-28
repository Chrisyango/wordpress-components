/**
 * Unregister default block variations and registers new block variations
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-dom-ready/
 */
import { registerBlockVariation } from '@wordpress/blocks';
import domReady from '@wordpress/dom-ready';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import './style.scss';

/**
 * Internal dependencies
 */
import variations from './variations.js';

domReady(function () {
	variations.forEach(variation => {
		registerBlockVariation( 'core/query', variation );
	});
});
