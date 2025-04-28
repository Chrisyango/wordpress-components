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
				sizeSlug: '340px',
				url: 'https://placehold.co/200x200?text=profile-image',
			}
		],
		[
			'core/group',
			{
				className: blockClass + '__text',
				metadata: {
					name: 'Text Group'
				}
			},
			[
				[
					'core/heading',
					{
						className: blockClass + '__name',
						content: 'Lorem ipsum dolor sit amet',
						placeholder: 'Add Name',
						level: 4
					}
				],
				[
					'core/heading',
					{
						className: blockClass + '__title',
						content: 'consectetur adipiscing elit',
						placeholder: 'Add Title',
						level: 5
					}
				],
				[
					'core/paragraph',
					{
						className: blockClass + '__description',
						content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
						placeholder: 'Add Description',
						keepPlaceholderOnFocus: true
					}
				],
				[
					'core/button',
					{
						className: blockClass + '__button',
						text: 'Contact',
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
