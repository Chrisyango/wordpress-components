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

export default function Edit() {

	const blockClass = metadata.textdomain;

	const blockProps = useBlockProps({
		className: blockClass,
	});

	// Block Template
	const myTemplate = [
		[
			'core/image',
			{
				className: blockClass + '__image',
				sizeSlug: '360px',
				url: 'https://placehold.co/500x500?text=statistic+block'
			}
		],
		[
			'core/group',
			{
				className: blockClass + '__tile',
				metadata: {
					name: 'Tile'
				}
			},
			[
				[
					'core/heading',
					{
						className: blockClass + '__text',
						content: 'Lorem ipsum dolor sit amet',
						placeholder: 'Add Subheading',
						level: 4
					}
				]
			]
		],
		[
			'core/group',
			{
				className: blockClass + '__tile',
				metadata: {
					name: 'Tile'
				}
			},
			[
				[
					'core/heading',
					{
						className: blockClass + '__text',
						content: 'Lorem ipsum dolor sit amet',
						placeholder: 'Add Subheading',
						level: 4
					}
				]
			]
		]
	];

	return (
		<div {...blockProps}>
			<div class={ blockClass + '__wrapper' }>
				<InnerBlocks
					template={myTemplate}
				/>
			</div>
		</div>
	);
}
