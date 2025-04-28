<?php
/**
 * Updates the query on the front end based on custom query attributes.
 */
add_filter( 'pre_render_block', function( $pre_render, $parsed_block ) {
	if ( isset( $parsed_block['blockName'] ) && $parsed_block['blockName'] === 'fwd/featured-post' ) {
		$custom_query = $parsed_block['attrs']['query'];

		// If Featured Post Block is on a category page, get the latest post with that category
		if ( is_category() ):
			add_filter( 'query_loop_block_query_vars', function( $query ) use ( $custom_query ) {
				$query_args = array(
					'cat' => get_queried_object()->term_id,
				);

				// Return the merged query.
				return array_merge(
					$query,
					$query_args
				);
			} );
		// If Featured Post Block is on a tag page, get the latest post with that tag
		elseif ( is_tag() ):
			add_filter( 'query_loop_block_query_vars', function( $query ) use ( $custom_query ) {
				$query_args = array(
					'tag_id' => get_queried_object()->term_id,
				);

				// Return the merged query.
				return array_merge(
					$query,
					$query_args
				);
			} );
		elseif ( array_key_exists( 'include', $custom_query ) ):
			add_filter( 'query_loop_block_query_vars', function( $query ) use ( $custom_query ) {
				$query_args = array(
					'post__in' => $custom_query['include']
				);

				// Return the merged query.
				return array_merge(
					$query,
					$query_args
				);
			} );
		endif;

		return $pre_render;
	}
}, 10, 2);
