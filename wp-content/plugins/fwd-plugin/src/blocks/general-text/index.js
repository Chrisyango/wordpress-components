/**
 * Package imports
 */
import { registerBlockStyle, registerBlockType } from '@wordpress/blocks';
import domReady from '@wordpress/dom-ready';

/**
 * Block styles
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import Save from './save';
import metadata from './block.json';

domReady( () => {
	registerBlockType( metadata.name, {
		/**
		 * @see ./edit.js
		 */
		edit: Edit,
		save: Save
	});

	// Register block styles
	registerBlockStyle( metadata.name, {
		name: 'centered',
		label: 'Centered'
	});
	registerBlockStyle( metadata.name, {
		name: 'left',
		label: 'Left'
	});
	registerBlockStyle( metadata.name, {
		name: 'right',
		label: 'Right'
	});
});
