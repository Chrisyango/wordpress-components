/**
 * Package imports
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import metadata from './block.json';

/**
 * Editor styles
 */
import './editor.scss';

export default function Save() {

	const blockClass = metadata.textdomain;

	const blockProps = useBlockProps.save({
		className: blockClass,
	});

	return (
		<div {...blockProps}>
			<div class={ blockClass + '__wrapper' }>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
