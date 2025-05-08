/**
 * Package imports
 */
import { __ } from '@wordpress/i18n';
import { ContrastChecker, RichText, useBlockProps } from '@wordpress/block-editor';


/**
 * Editor styles
 */
import './editor.scss';

export default function Edit({
	attributes: { backgroundColor, content, textColor },
	setAttributes
}) {
	const blockProps = useBlockProps({
		className: 'modal-component'
	});

	const baseBackgroundColor = 'base-2';
	const baseTextColor = '#00636C';

	return (
		<section {...blockProps}>
			<ContrastChecker
				backgroundColor={'#FCEFED'}
				textColor={'#00636C'}
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
