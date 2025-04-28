/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InnerBlocks, InspectorControls, useBlockProps } from '@wordpress/block-editor';

/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { PanelBody, PanelRow, SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
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
	clientId,
	setAttributes
}) {
	const blockProps = useBlockProps({
		className: 'featured-post',
	});

	/**
	 * Block Template
	 */
	const myTemplate = [
		[
			"core/post-template",
			{
				"className": "featured-post__wrapper"
			},
			[
				[
					"core/post-featured-image",
					{
						"className": "featured-post__image",
						"isLink": false
					}
				],
				[
					"core/group",
					{
						"className": "featured-post__content"
					},
					[
						[
							"core/post-title",
							{
								"className": "featured-post__title",
								"isLink": true,
								"level": 3
							}
						],
						[
							"core/group",
							{
								"className": "featured-post__date-tags",
								"layout": {
									"type": "flex",
									"flexWrap":"nowrap"
								}
							},
							[
								[
									"core/post-date",
									{
										"className": "featured-post__date"
									}
								],
								[
									"core/post-terms",
									{
										"className": "featured-post__tags",
										"term": "post_tag"
									}
								],
							]
						],
						[
							"core/post-excerpt",
							{
								"className": "featured-post__excerpt"
							}
						],
						[
							"core/post-terms",
							{
								"className": "featured-post__categories",
								"term": "category"
							}
						],
						[
							"core/read-more",
							{
								className: "featured-post__button",
								content: "Learn More"
							}
						]
					]
				]
			]
		]
	];

	/**
	 * Creates options for the Post Types select field
	 * @param {*} postTypes
	 * @returns
	 */
	function buildPostTypesSelect(postTypes) {
		let options = [];
		postTypes.forEach(postType => {
			if (!postType.includes('wp')) {
				let label = postType.charAt(0).toUpperCase() + postType.slice(1);

				// Rename tribe_events to Events
				if (postType == 'tribe_events') {
					label = 'Events';
				}

				options.push({
					value: postType,
					label
				});
			}
		});

		return options;
	}

	/**
	 * Updates Post Type for the Query when a new value is selected
	 * @param {*} postType
	 */
	function selectPostType(postType) {
		delete query.include;
		setAttributes({
			className: postType == 'tribe_events' ? 'featured-post featured-event' : 'featured-post',
			query: {
				...query,
				postType: postType
			}
		});
	}

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
			if (posts.length > 0) {
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
						label: post.title.raw
					});
				});
			}
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

	/**
	 * Get all Post Types for use in the select field
	 */
	const [postTypes, setPostTypes] = useState([]);
	if (postTypes && postTypes.length == 0) {
		apiFetch( { path: `/wp/v2/types` } ).then( ( data ) => {
			// Remove unnecessary post types
			const removePostTypes = [
				'attachment',
				'nav_menu_item',
				'tribe_venue',
				'tribe_organizer',
				'wp_block',
				'wp_font_face',
				'wp_font_family',
				'wp_global_styles',
				'wp_navigation',
				'wp_template',
				'wp_template_part'
			];
			let postTypes = Object.keys(data);

			removePostTypes.forEach(removePostType => {
				const index = postTypes.indexOf(removePostType);

				postTypes.splice(index, 1);
			});

			setPostTypes(postTypes);
		})
	}

	return (
		<>
			<InspectorControls>
				<PanelRow>
					<PanelBody title={ __( 'Settings' ) } initialOpen={ true }>
						<SelectControl
							label="Post Type"
							value={ query.postType }
							options={ buildPostTypesSelect(postTypes) }
							onChange={ selectPostType }
							help={ 'WordPress contains different types of content and they are divided into collections called "Post types". By default there are a few different ones such as blog posts and pages, but plugins could add more.' }
						/>
						<SelectControl
							label={ "Select " + (query.postType != 'tribe_events' ? query.postType : 'events')}
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
