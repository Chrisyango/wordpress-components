/**
 * Package imports
 */
import { registerBlockType, registerBlockStyle } from '@wordpress/blocks';
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
import edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
domReady( () => {
	registerBlockType( metadata.name, {
		/**
		 * @see ./edit.js
		 */
		edit: edit,
		save: save
	});

	// Register block styles
	registerBlockStyle( metadata.name, {
		name: 'minimal',
		label: 'Minimal'
	});
	registerBlockStyle( metadata.name, {
		name: 'bg-image',
		label: 'BG Image'
	});
});
