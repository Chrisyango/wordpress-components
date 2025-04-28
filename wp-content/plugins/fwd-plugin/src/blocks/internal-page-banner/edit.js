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
export default function Edit({}) {

	// Block text-domain is used as the block-level class name
	const blockClass = metadata.textdomain;

	const blockProps = useBlockProps({
		className: blockClass
	});

	// Block Template
	const myTemplate = [
		[
			'core/image',
			{
				className: blockClass + '__image',
				url: 'https://via.placeholder.com/1440x1440?text=banner+image',
			}
		],
		[
			'core/group',
			{
				className: blockClass + '__content',
			},
			[
				[
					'yoast-seo/breadcrumbs',
					{
						className: blockClass + '__breadcrumbs'
					}
				],
				[
					'core/heading',
					{
						placeholder: 'Add Subheading',
						level: 5,
						className: blockClass + '__subheading',
					}
				],
				[
					'core/heading',
					{
						content: 'Lorem Ipsum Dolor Sit Amet',
						placeholder: 'Add Heading',
						level: 1,
						className: blockClass + '__heading'
					}
				],
				[
					'core/buttons',
					{
						className: blockClass + '__buttons',
						layout: {
							type: 'flex',
							justifyContent: 'flex-start'
						}
					},
					[
						[
							'core/button',
							{
								className: blockClass + '__button',
								placeholder: 'Button Text Here',
								url: '#'
							},
						]
					]
				]
			]
		]
	];

	return (
		<section { ...blockProps }>
			<div className={ blockClass + '__wrapper' }>
				<InnerBlocks
					template={ myTemplate }
				/>
			</div>
		</section>
	);
}
