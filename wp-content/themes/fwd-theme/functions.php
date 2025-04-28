<?php
/**
 * Theme functions and definitions
 */

namespace Theme;

/**
 * Sets up theme defaults and registers support for various WordPress
 * features. This runs before the init hook, during the after_setup_theme
 * hook.
 */
function theme_setup() {
	/**
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 */
	$text_domain = wp_get_theme()->get( 'TextDomain' );
	load_theme_textdomain( $text_domain . '-theme', get_template_directory() . '/languages' );

	/**
	 * Add additional image sizes
	 */
	add_image_size( 'small', 300, 300 );
}
add_action( 'after_setup_theme', __NAMESPACE__ . '\\theme_setup' );

/**
 * Create a transient object for theme values
 */
function set_theme_transient() {

	// Name the transient
	$transient_name = 'theme';

	// Uncomment the line below to reset the transient
	// delete_transient( $transient_name );

	// Get the transient
	$theme_transient = get_transient( $transient_name );

	// If the transient does not exist, create it
	if ( false === $theme_transient ) {

		// Get the theme values
		$theme_values = array(
			'acf-json' => get_stylesheet_directory() . '/assets/acf-json',
			'assets' => get_template_directory() . '/assets',
			'assets-uri' => get_template_directory_uri() . '/assets',
			'build' => get_template_directory() . '/build',
			'build-uri' => get_template_directory_uri() . '/build',
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

/**
 * Load each of the PHP files in the includes folder
 */
foreach ( glob( get_template_directory() . '/inc/*.php' ) as $file )
	require_once $file;

// Register REST route that returns Theme Options ACF fields
add_action("rest_api_init", function () {
	register_rest_route("wp/v2/acf/options", "/all", [
		"methods" => "GET",
		"callback" => __NAMESPACE__ . "\\acf_options_route",
	]);
});
function acf_options_route() {
	return get_fields('options');
}
function add_excerpt_support_for_pages() {
	add_post_type_support('page', 'excerpt');
}
add_action( 'init', __NAMESPACE__ . '\\add_excerpt_support_for_pages' );

/**
 * Add additional image sizes to content editor
 */
function fwd_custom_image_sizes( $size_names ) {
	/**
	 * Add Small image size option after thumbnail
	 */
	$new_sizes = array_slice($size_names, 0, 1, true) +
    array( 'small' => 'Small' ) +
    array_slice($size_names, 1, count($size_names) - 1, true) ;

    return $new_sizes;
}
add_filter( 'image_size_names_choose', __NAMESPACE__ . '\\fwd_custom_image_sizes' );