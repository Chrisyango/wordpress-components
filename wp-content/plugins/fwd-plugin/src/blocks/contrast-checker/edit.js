/**
 * Package imports
 */
import { __ } from '@wordpress/i18n';
import {
	ContrastChecker,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * Editor styles
 */
import './editor.scss';

export default function Edit( {
	attributes: { backgroundColor, content, textColor },
	setAttributes,
} ) {
	const blockProps = useBlockProps( {
		className: 'contrast-checker-component',
	} );

	// Retrieve the themes color settings from the block editors' data
	const colors = useSelect( 'core/block-editor' ).getSettings().colors;

	let bgColorObj = colors.find( ( color ) => color.slug === backgroundColor );
	let textColorObj = colors.find( ( color ) => color.slug === textColor );

	const baseBackgroundColor = '#FCEFED';
	const baseTextColor = '#00636C';

	return (
		<section { ...blockProps }>
			<ContrastChecker
				backgroundColor={
					backgroundColor ? bgColorObj.color : baseBackgroundColor
				}
				textColor={ textColor ? textColorObj.color : baseTextColor }
			/>
			<RichText
				{ ...blockProps }
				tagName="h2" // The tag here is the element output and editable in the admin
				value={ content } // Any existing content, either from the database or an attribute default
				allowedFormats={ [ 'core/bold', 'core/italic' ] } // Allow the content to be made bold or italic, but do not allow other formatting options
				onChange={ ( content ) => setAttributes( content ) } // Store updated content as a block attribute
				placeholder={ __( 'Heading...' ) } // Display this text before any content has been added by the user
			/>
		</section>
	);
}
