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
		className: 'modal-component',
	});

	return (
		<section {...blockProps}>
			<div class="modal-component__wrapper">
				Modal Component
			</div>
		</section>
	);
}
