<?php
/**
 * Enable duotone for Media & Text blocks.
 *
 * @param array  $args       The block arguments for the registered block type.
 * @param string $block_type The block type name, including namespace.
 * @return array             The modified block arguments.
 */
function example_enable_duotone_to_media_text_blocks( $args, $block_type ) {

	// Only add the filter to Media & Text blocks.
	if ( 'core/image' === $block_type ) {
		$args['supports'] ??= [];
		$args['supports']['color'] ??= [];
		$args['supports']['color']['background'] = true;
	}

	return $args;
}
add_filter( 'register_block_type_args', 'example_enable_duotone_to_media_text_blocks', 10, 2 );