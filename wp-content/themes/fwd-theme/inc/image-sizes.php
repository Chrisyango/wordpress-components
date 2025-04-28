<?php
/**
 * Register custom image sizes.
 */

namespace Theme\Image_Sizes;

function set_up_image_sizes() {
	$image_widths = array(
		'120px' => 120,
		'240px' => 240,
		'480px' => 480
	);

	foreach ( $image_widths as $name => $width ) {
		add_image_size( $name, $width );
	}

	// Add custom image sizes to media library
	add_filter( 'image_size_names_choose', function( $sizes ) use ( $image_widths ) {
		return array_merge( $sizes, array_combine( array_keys( $image_widths ), array_keys( $image_widths ) ) );
	} );
}
add_action( 'after_setup_theme', __NAMESPACE__ . '\\set_up_image_sizes' );
