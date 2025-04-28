/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { InspectorControls } from '@wordpress/block-editor';

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

/**
 * Add the attribute needed for default image border radius
 *
 * @since 0.1.0
 * @param {Object} settings
 */
/**
 * Adds background and border support to Image Block.
 *
 * @param {Object} settings - The original block settings.
 * @param {string} name - The name of the block.
 *
 * @returns {Object} The modified block settings with added border support.
 */
function newImageSettings( settings, name ) {
	// Bail early if not the Image Block and does not have supports.
	if ( 'core/image' !== name ) {
		return settings;
	}

	settings.attributes = {
		...settings.attributes,
		style: {
			type: Object,
			default: {
				border: {
					radius: {
						topLeft: "80px",
						topRight: "10px",
						bottomLeft: "10px",
						bottomRight: "10px",
					}
				},
				spacing: {
					margin: {
						top: "100px",
						bottom: "100px"
					}
				}
			}
		}
	}

	return settings;
}

addFilter(
	'blocks.registerBlockType',
	'new-image-settings',
	newImageSettings
);

/**
 * Filter the BlockEdit object and add icon inspector controls to button blocks.
 *
 * @since 0.1.0
 * @param {Object} BlockEdit
 */
function addImageInspectorControls( BlockEdit ) {
	return ( props ) => {
		if ( props.name !== 'core/image' ) {
			return <BlockEdit { ...props } />;
		}

		return (
			<>
				<BlockEdit { ...props } />
				<InspectorControls group="border">
					<p className="image-border__help">Set a custom border radius. The top left input box refers to the top left border radius, top right input box for top right border radius, and so on and so forth.</p>
				</InspectorControls>
			</>
		);
	};
}

addFilter(
	'editor.BlockEdit',
	'add-image-inspector-controls',
	addImageInspectorControls
);
