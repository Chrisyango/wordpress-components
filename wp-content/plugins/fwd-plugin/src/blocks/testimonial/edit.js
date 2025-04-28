
/**
 * Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import apiFetch from '@wordpress/api-fetch';
import { PanelBody, PanelRow, SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';

/**
 * Block styles
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
export default function Edit({
	attributes: { query },
	setAttributes
}) {
	const blockProps = useBlockProps({
		className: 'testimonial',
	});

	/**
	 * Block Template
	 */
	const myTemplate = [
		[
			"core/post-template",
			{
				"className": "testimonial__wrapper",
				"lock": {
					"move": true,
					"remove": true
				}
			},
			[
				[
					"core/post-featured-image",
					{
						"className": "testimonial__image",
						"isLink": false,
						"lock": {
							"move": true,
							"remove": true
						}
					}
				],
				[
					"core/group",
					{
						"className": "testimonial__content",
						"lock": {
							"move": true,
							"remove": true
						}
					},
					[
						[
							"core/post-content",
							{
								"className": "testimonial__body",
								"isLink": false,
								"lock": {
									"move": true,
									"remove": true
								}
							}
						],
						[
							"core/post-title",
							{
								"className": "testimonial__title",
								"isLink": false,
								"lock": {
									"move": true,
									"remove": true
								}
							}
						]
					]
				]
			]
		]
	];

	/**
	 * Create options for the Posts in the select field
	 * @param {*} postType
	 * @returns
	 */
	function buildPostsSelect(postType) {
		// querying posts
		const { posts } = useSelect(select => {
			const { getEntityRecords } = select( 'core' );
			// Query args
			const queryArgs = {
				status: 'publish',
				per_page: -1
			}
			return {
				posts: getEntityRecords('postType', postType, queryArgs),
			}
		});
		let suggestions = [];
		if (posts) {
			if (!query.include) {
				setAttributes({
					query: {
						...query,
						include: [posts[0].id]
					}
				});
			}
			// Get post id and post title and set them as value and label
			posts.forEach(post => {
				suggestions.push({
					value: post.id,
					label: post.title.rendered
				});
			});

		}

		return suggestions;
	}

	/**
	 * Updates Post for the Query when a new value is selected
	 * @param {*} post
	 */
	function selectPost(post) {
		setAttributes({
			query: {
				...query,
				include: [post]
			}
		});
	}

	return (
		<>
			<InspectorControls>
				<PanelRow>
					<PanelBody title={ __( 'Settings' ) } initialOpen={ true }>
						<SelectControl
							label={ "Select " + query.postType}
							value={ query.include }
							options={ buildPostsSelect(query.postType) }
							onChange={ selectPost }
						/>
					</PanelBody>
				</PanelRow>
			</InspectorControls>
			<section { ...blockProps }>
				<InnerBlocks
					template={ myTemplate }
				/>
			</section>
		</>
	);
}
