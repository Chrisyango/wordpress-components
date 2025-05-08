/**
 * Package imports
 */
import { registerBlockType } from '@wordpress/blocks';
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
});
