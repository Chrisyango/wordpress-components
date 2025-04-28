/**
 * Package imports
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * Block metadata
 */
import metadata from './block.json';

/**
 * Editor styles
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
export default function Save(props) {

	// Block text-domain is used as the block-level class name
	const blockClass = metadata.textdomain;

	const blockProps = useBlockProps.save({
		className: blockClass,
	});

	return (
		<section { ...blockProps }>
			<div className={ blockClass + '__wrapper' }>
				<InnerBlocks.Content />
			</div>
		</section>
	);
}
