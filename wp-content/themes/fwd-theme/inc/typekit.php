<?php
/**
 * Functionality related to Typekit
 */

namespace Theme\TypeKit;

/**
 * Load Typekit fonts on the front end and in the editor.
 *
 * Replace the $typekit_id variable with your Typekit ID. It's left blank
 * intentionally to avoid accidental use and to allow simple copy-pasting.
 */
function theme_typekit_fonts() {
	$typekit_id = '';

	if( $typekit_id !== '' )
		echo "<link rel=\"stylesheet\" href=\"https://use.typekit.net/{$typekit_id}.css\">\n";
}
add_action( 'wp_head', __NAMESPACE__ . '\\theme_typekit_fonts' );
add_action( 'admin_head', __NAMESPACE__ . '\\theme_typekit_fonts' );

