<?php
/**
 * Updates the query on the front end based on custom query attributes.
 */
add_filter( 'pre_render_block', function( $pre_render, $parsed_block ) {
	if ( isset( $parsed_block['blockName'] ) && $parsed_block['blockName'] === 'core/query' ) {
		$query_attrs = $parsed_block['attrs'];

		if ( array_key_exists( 'specificMode', $query_attrs ) ) {
			$use_specific_posts = $parsed_block['attrs']['specificMode'];

			if( $use_specific_posts ) {
				add_filter( 'query_loop_block_query_vars', function( $query ) use ( $parsed_block ) {
					$custom_query = $parsed_block['attrs']['query'];

					$query_args = array(
						'post__in' => $custom_query['include'],
						'orderby' => 'post__in'
					);

					// Return the merged query.
					return array_merge(
						$query,
						$query_args
					);
				} );
			}
		} elseif( is_author() ) {
			add_filter( 'query_loop_block_query_vars', function( $query ) use ( $parsed_block ) {
				$custom_query = $parsed_block['attrs']['query'];

				unset($query['post__in']);
				$query_args = array(
					'author' => get_queried_object()->ID,
					'orderby' => $custom_query['orderBy']
				);

				// Return the merged query.
				return array_merge(
					$query,
					$query_args
				);
			} );
		} else {
			add_filter( 'query_loop_block_query_vars', function( $query ) use ( $parsed_block ) {
				$custom_query = $parsed_block['attrs']['query'];

				unset($query['post__in']);
				$query_args = array(
					'orderby' => $custom_query['orderBy']
				);

				// Return the merged query.
				return array_merge(
					$query,
					$query_args
				);
			} );
		}

		return $pre_render;
	}
}, 10, 2);
