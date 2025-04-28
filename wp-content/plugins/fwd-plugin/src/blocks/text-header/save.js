/**
 * Package imports
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * Editor styles
 */
import './editor.scss';

export default function Save() {
	const blockProps = useBlockProps.save({
		className: 'text-header',
	});

	return (
		<section {...blockProps}>
			<div class="text-header__wrapper">
				<InnerBlocks.Content />
			</div>
		</section>
	);
}
