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

const blockIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
		<path d="M488 96h-96c-13.3 0-24 10.7-24 24v96c0 13.3 10.8 24 24 24h96c13.3 0 24-10.8 24-24v-96c0-13.3-10.8-24-24-24zm-24 96h-48v-48h48v48zm24 80h-96c-13.3 0-24 10.7-24 24v96c0 13.3 10.8 24 24 24h96c13.3 0 24-10.8 24-24v-96c0-13.3-10.8-24-24-24zm-24 96h-48v-48h48v48zM120 96H24c-13.3 0-24 10.7-24 24v96c0 13.3 10.8 24 24 24h96c13.3 0 24-10.8 24-24v-96c0-13.3-10.8-24-24-24zm-24 96H48v-48h48v48zm24 80H24c-13.3 0-24 10.7-24 24v96c0 13.3 10.8 24 24 24h96c13.3 0 24-10.8 24-24v-96c0-13.3-10.8-24-24-24zm-24 96H48v-48h48v48zM304 96h-96c-13.3 0-24 10.7-24 24v96c0 13.3 10.8 24 24 24h96c13.3 0 24-10.8 24-24v-96c0-13.3-10.8-24-24-24zm-24 96h-48v-48h48v48zm24 80h-96c-13.3 0-24 10.7-24 24v96c0 13.3 10.8 24 24 24h96c13.3 0 24-10.8 24-24v-96c0-13.3-10.8-24-24-24zm-24 96h-48v-48h48v48z"/>
	</svg>
)

domReady( () => {
	registerBlockType( metadata.name, {
		/**
		 * @see ./edit.js
		 */
		edit: Edit,
		icon: blockIcon,
		save: Save
	});
});
