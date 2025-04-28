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
		className: 'text-header'
	});

	// Block Template
	const myTemplate = [
		[
			'core/heading',
			{
				className: 'text-header__heading',
				content: 'Consectetur Adipiscing Elit',
				placeholder: 'Add Heading',
				level: 1
			}
		],
		[
			'core/paragraph',
			{
				className: 'text-header__description',
				content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.',
				placeholder: 'Add Description'
			}
		],
		[
			'core/buttons',
			{
				className: 'text-header__buttons',
			},
			[
				[
					'core/button',
					{
						className: 'text-header__button is-style-outline',
						placeholder: 'Button Text Here',
						url: '#'
					}
				]
			]
		]
	];

	return (
		<section {...blockProps}>
			<div class="text-header__wrapper">
				<InnerBlocks
					template={myTemplate}
				/>
			</div>
		</section>
	);
}
