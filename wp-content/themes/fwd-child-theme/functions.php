<?php
/**
 * Child theme functions and definitions
 */

namespace Child_Theme;

/**
 * Load each of the PHP files in the includes folder
 */
foreach ( glob( get_stylesheet_directory() . '/inc/*.php' ) as $file )
	require_once $file;

/**
 * Create a transient object for theme values
 */
function set_theme_transient() {

	// Name the transient
	$transient_name = 'child_theme';

	// Uncomment the line below to reset the transient
	// delete_transient( $transient_name );

	// Get the transient
	$theme_transient = get_transient( $transient_name );

	// If the transient does not exist, create it
	if ( false === $theme_transient ) {

		// Get the theme values
		$theme_values = array(
			'acf-json' => get_stylesheet_directory() . '/assets/acf-json',
			'assets' => get_stylesheet_directory() . '/assets',
			'assets-uri' => get_stylesheet_directory_uri() . '/assets',
			'build' => get_stylesheet_directory() . '/build',
			'build-uri' => get_stylesheet_directory_uri() . '/build',
			'name' => wp_get_theme()->get( 'Name' ),
			'page_types' => array(
				'404',
				'archive',
				'home',
				'search',
				'single',
			),
			'text-domain' => wp_get_theme()->get( 'TextDomain' ),
			'version' => wp_get_theme()->get( 'Version' ),
		);

		// Set the transient
		set_transient( $transient_name, $theme_values, 1 * HOUR_IN_SECONDS );
	}

}
add_action( 'init', __NAMESPACE__ . '\\set_theme_transient' );
