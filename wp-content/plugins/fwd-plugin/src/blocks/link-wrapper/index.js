/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-dom-ready/
 */
import { registerBlockType } from '@wordpress/blocks';
import domReady from '@wordpress/dom-ready';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import Save from './save';
import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
domReady(function () {
	registerBlockType( metadata.name, {
		/**
		 * @see ./edit.js
		 */
		edit: Edit,

		/**
		 * @see ./save.js
		 */
		save: Save,
	} );
});
