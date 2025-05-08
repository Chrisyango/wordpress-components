/**
 * Package imports
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Editor styles
 */
import './editor.scss';

export default function Save() {
	const blockProps = useBlockProps.save({
		className: 'contrast-checker-component',
	});

	return (
		<section {...blockProps}>
			<div class="contrast-checker-component__wrapper">
				Contrast Checker Component
			</div>
		</section>
	);
}
