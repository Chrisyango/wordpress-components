/**
 * Package imports
 */
import { __ } from '@wordpress/i18n';
import { RichText, useBlockProps } from '@wordpress/block-editor';

/**
 * Editor styles
 */
import './editor.scss';

export default function Save( { attributes } ) {
	const blockProps = useBlockProps.save( {
		className: 'contrast-checker-component',
	} );

	return (
		<section { ...blockProps }>
			<div class="contrast-checker-component__wrapper">
				<RichText.Content
					{ ...blockProps }
					tagName="h2"
					value={ attributes.content }
				/>
			</div>
		</section>
	);
}
