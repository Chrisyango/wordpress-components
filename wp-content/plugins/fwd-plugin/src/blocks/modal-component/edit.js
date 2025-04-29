/**
 * Package imports
 */
import { __ } from '@wordpress/i18n';
import { __experimentalBlockPatternsList as BlockPatternsList, store as modalComponentStore, useBlockProps } from '@wordpress/block-editor';
import { Button, Modal } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useState } from 'react';

/**
 * Editor styles
 */
import './editor.scss';

export default function Edit() {
	const blockProps = useBlockProps({
		className: 'modal-component'
	});
	const [ isOpen, setOpen ] = useState( false );
    const openModal = () => setOpen( true );
    const closeModal = () => setOpen( false );
	const { insertBlocks } = useDispatch( modalComponentStore );
	/**
	 * Get 'core/group' patterns with the 'fwd-content' category
	 * @returns array
	*/
	const patterns = useSelect( ( select ) => {
		const allPatterns = select( modalComponentStore ).getPatternsByBlockTypes('core/group');
		const fwdContentPatterns = allPatterns.filter(pattern => {
			if (!pattern.categories) {
				return;
			}
			return pattern.categories.includes('fwd-content');
		});
		return fwdContentPatterns;
	} );

	function insertPattern(pattern) {
		insertBlocks(pattern);
	}
	
	return (
		<section {...blockProps}>
			<div className='modal-component__wrapper'>
				<Button variant="secondary" onClick={ openModal }>
					Open Modal
				</Button>
				{ isOpen && (
					<Modal title="This is my modal" onRequestClose={ closeModal }>
						<BlockPatternsList
							blockPatterns={patterns}
							label="Block patterns story"
							onClickPattern={(pattern) => {
								insertPattern(pattern.blocks[0]);
								closeModal();
							}}
							onHover={() => {}}
							category={"fwd-content"}
						>
						</BlockPatternsList>
					</Modal>
				) }
			</div>
		</section>
	);
}
