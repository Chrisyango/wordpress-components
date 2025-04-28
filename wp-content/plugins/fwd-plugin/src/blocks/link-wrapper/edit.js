/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * WordPress dependencies
 * 
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 * 
 * 
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/dashicon/
 * @see https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/link-control/README.md
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/popover/
 */
import { __experimentalLinkControl as LinkControl, BlockControls, InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { Dashicon, Popover, ToolbarButton } from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({
	attributes: { opensInNewTab, url },
	setAttributes,
	isSelected
}) {
	const blockProps = useBlockProps({
		className: 'link-wrapper',
	});
	
	/**
	 * Block Template
	 */
	const myTemplate = [
		[
			"core/heading",
			{
				"className": "link-wrapper__heading",
			}
		],
		[
			"core/paragraph",
			{
				"className": "link-wrapper__content",
			}
		]
	];

	if (url) {
		setAttributes({
			tagName: 'a'
		});
	} else {
		setAttributes({
			tagName: 'div'
		});
	}

	/**
	 * Creates and returns block controls that enable the user to 
	 * input a URL that ties the block to it
	 * @returns BlockControls
	 */
	const URLPicker = () => {
		// Use internal state instead of a ref to make sure that the component
    	// re-renders when the popover's anchor updates.
		const [ popoverAnchor, setPopoverAnchor ] = useState();
		const [ isVisible, setIsVisible ] = useState( false );
		const toggleVisible = () => {
			setIsVisible( ( state ) => ! state );
		};

		const urlIsSet = url;
	
		return (
			<BlockControls>
				{ !urlIsSet && (
					<ToolbarButton
						name="link"
						icon={ <Dashicon icon="admin-links" /> }
						title={ __( 'Link' ) }
						onClick={ () => {
							toggleVisible();
							setPopoverAnchor();
						} }
					/>
				) }

				{ urlIsSet && (
					<ToolbarButton
					className="is-pressed"
					name="link"
					icon={ <Dashicon icon="editor-unlink" /> }
					title={ __( 'Unlink' ) }
					onClick={ () => {
						setAttributes( {
							url: undefined,
							opensInNewTab: undefined
						} );

						toggleVisible();
					} }
				/>
				) }

				{ (isVisible || (urlIsSet && isSelected)) && (
					<Popover>
						<LinkControl
							value={ { opensInNewTab, url } }
							onChange={ updateURL }
							anchor={ popoverAnchor }
						/>
					</Popover>
				) }
			</BlockControls>
		);
	}

	/**
	 * Sets new url to the block for use
	 * @param {*} newValue 
	 */
	function updateURL(newValue) {
		const {
			opensInNewTab,
			url
		} = newValue;

		setAttributes({
			opensInNewTab,
			url
		});
	}

	return (
		<>
			<URLPicker />
			<div { ...blockProps }>
				<InnerBlocks
					template={ myTemplate }
				/>
			</div>
		</>
	);
}
