/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/display-name */
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { InspectorControls } from '@wordpress/block-editor';
import { FormTokenField, PanelBody, PanelRow, ToggleControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import './style.scss';

/**
 * Internal dependencies
 */

/**
 * Add the attribute needed for choosing specific posts.
 *
 * @since 0.1.0
 * @param {Object} settings
 */
function addAttributes( settings ) {
	if ( 'core/query' !== settings.name ) {
		return settings;
	}

	// Add the attributes.
	const specificModeAttribute = {
		specificMode: {
			type: 'boolean',
			default: false,
		},
	};

	const newSettings = {
		...settings,
		attributes: {
			...settings.attributes,
			...specificModeAttribute
		},
	};

	return newSettings;
}

addFilter(
	'blocks.registerBlockType',
	'custom-query-loop/add-attributes',
	addAttributes
);

/**
 * Shorten string based on characters
 * @param {*} str
 * @param {*} maxLen
 * @param {*} separator
 * @returns
 */
function shorten(str, maxLen = 30, separator = ' ') {
	if (str.length <= maxLen) return str;
	return str.substr(0, str.lastIndexOf(separator, maxLen)) + '...';
}

/**
 * Filter the BlockEdit object and add icon inspector controls to button blocks.
 *
 * @since 0.1.0
 * @param {Object} BlockEdit
 */
function addInspectorControls( BlockEdit ) {
	return ( props ) => {
		if ( props.name !== 'core/query' ) {
			return <BlockEdit { ...props } />;
		}

		const { attributes, setAttributes } = props;
		const { specificMode, query } = attributes;
		const { include, postType } = query;

		// querying posts
		const { posts } = useSelect(select => {
			const { getEntityRecords } = select( 'core' );
			// Query args
			const query = {
				status: 'publish',
				per_page: -1
			}
			return {
				posts: getEntityRecords('postType', postType, query),
			}
		});
		let suggestions = [];
		if (posts) {
			suggestions = posts.map(value => shorten(value.title.rendered));
		}

		// Return all post titles
		function getPostTitles(postIds) {
			if (!postIds || !posts) {
				return;
			}
			let postTitles = [];
			postIds.forEach(postId => {
				let postTitle = posts.find(post => post.id == postId);
				/**
				 * If postTitle returns undefined that means there were
				 * no matching posts with the corresponding ID.
				 * This means the Post Type field was changed and
				 * we have to delete the Include field.
				 */
				if (!postTitle) {
					delete attributes.query.include;
					return [];
				}
				postTitle = postTitle ? shorten(postTitle.title.rendered) : '';
				postTitles.push(postTitle);
			});

			return postTitles;
		}

		function setupBlogPosts(tokens) {
			if (!tokens || !posts) {
				return;
			}

			let blogPosts = [];
			tokens.forEach(token => {
				let postId = posts.find(post => shorten(post.title.rendered) == token).id;

				blogPosts.push(postId);
			});

			setAttributes({query: {
				...query,
				perPage: blogPosts.length,
				include: blogPosts
			}});
		}

		function chooseSpecificPosts() {
			return (
				<PanelRow>
					<FormTokenField
						label='Posts'
						value={ getPostTitles(include) }
						suggestions={ suggestions }
						onChange={(tokens) => {
							setupBlogPosts(tokens);
						}}
						maxLength='6'
					/>
					<p className="autocomplete-tokenfield__help">Begin typing post title, click autocomplete result to select (you can only choose a maximum of 6).</p>
				</PanelRow>
			);
		}

		return (
			<>
				<BlockEdit { ...props } />
				<InspectorControls>
					<PanelBody title="Display Settings" initialOpen={ true }>
						<PanelRow>
							<ToggleControl
								label={ __(
									'Choose Specific Posts',
									'custom-query-loop'
								)}
								help={
									"Toggle this on if you want to select specific posts. If this is toggled on, the posts will sort by the order they're added."
								}
								checked={ specificMode }
								onChange={() => {
									if (specificMode) {
										delete attributes.query.include;
										setAttributes({
											specificMode: !specificMode,
											query: {
												...query,
												orderBy: 'date',
												perPage: 6
											}
										});
									} else {
										setAttributes({
											specificMode: !specificMode,
											query: {
												...query,
												include: [],
												orderBy: 'include'
											}
										});
									}
								}}
							/>
						</PanelRow>
						{specificMode ? chooseSpecificPosts() : ''}
					</PanelBody>
				</InspectorControls>
			</>
		);
	};
}

addFilter(
	'editor.BlockEdit',
	'custom-query-loop/add-inspector-controls',
	addInspectorControls
);
