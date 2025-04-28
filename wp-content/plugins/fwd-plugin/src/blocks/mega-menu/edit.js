/**
 * Package imports
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { ComboboxControl, PanelBody, TextControl } from '@wordpress/components';
import { useEntityRecords } from '@wordpress/core-data';

/**
 * Editor styles
 */
import './editor.scss';

export default function Edit({
	attributes: { label, menuSlug },
	setAttributes,
}) {
	const blockProps = useBlockProps({
		className: 'mega-menu'
	});

	// Fetch all template parts.
	const { hasResolved, records } = useEntityRecords(
		'postType',
		'wp_template_part',
		{ per_page: -1 }
	);

	let menuOptions = [];

	// Filter the template parts for those in the 'menu' area.
	if ( hasResolved ) {
		menuOptions = records
			.filter( ( item ) => item.area === 'menu' )
			.map( ( item ) => ( {
				label: item.title.rendered, // Title of the template part.
				value: item.slug,           // Template part slug.
			} ) );
	}

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Settings', 'mega-menu' ) }
					initialOpen={ true }
				>
					<ComboboxControl
						label={ __( 'Menu Template', 'mega-menu' ) }
						value={ menuSlug }
						options={ menuOptions }
						onChange={ ( slugValue ) =>
							setAttributes( { menuSlug: slugValue } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<a className="wp-block-navigation-item__content">
					<RichText
						identifier="label"
						className="wp-block-navigation-item__label"
						value={ label }
						onChange={ ( labelValue ) =>
							setAttributes( {
								label: labelValue,
							} )
						}
						aria-label={ __(
							'Mega menu link text',
							'mega-menu-block'
						) }
						placeholder={ __( 'Add label…', 'mega-menu-block' ) }
						allowedFormats={ [
							'core/bold',
							'core/italic',
							'core/image',
							'core/strikethrough',
						] }
					/>
				</a>
			</div>
		</>
	);
}
