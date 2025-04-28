/**
 * Package imports
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * Editor styles
 */
import './editor.scss';

export default function Edit() {
	const blockProps = useBlockProps({
		className: 'general-text'
	});

	// Block Template
	const myTemplate = [
		[
			'core/heading',
			{
				className: 'general-text__heading',
				content: 'Consectetur Adipiscing Elit',
				placeholder: 'Add Heading',
				level: 2
			}
		],
		[
			'core/group',
			{
				className: 'general-text__content',
				metadata: {
					name: 'Content'
				}
			},
			[
				[
					'core/paragraph',
					{
						content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.',
						placeholder: 'Add Description',
						className: 'general-text__description'
					}
				],
				[
					'core/buttons',
					{
						className: 'general-text__buttons'
					},
					[
						[
							'core/button',
							{
								text: 'Learn More',
								url: '#',
								className: 'general-text__button is-style-outline'
							}
						]
					]
				]
			]
		]
	];

	return (
		<section {...blockProps}>
			<div className='general-text__wrapper'>
				<InnerBlocks
					template={myTemplate}
				/>
			</div>
		</section>
	);
}
