<?php
namespace Theme\Pattern_Settings;

/**
 * Unregister the core block patterns.
 */
function unregister_core_patterns() {
	remove_theme_support( 'core-block-patterns' );
}
add_action( 'init', __NAMESPACE__ . '\\unregister_core_patterns' );

/**
 * Register a custom category for block patterns with the name of the theme,
 * using the theme text domain for the slug.
 */
function register_pattern_categories() {

	// Grab the theme transient
	$theme = (array) get_transient( 'theme' );

	// Ensure the necessary values are present
	$name = array_key_exists( 'name', $theme ) ? $theme['name'] : wp_get_theme()->get( 'Name' );
	$slug = array_key_exists( 'text-domain', $theme ) ? $theme['text-domain'] : wp_get_theme()->get( 'TextDomain' );

	register_block_pattern_category(
		$slug,
		array(
			'label' => __( $name, $slug ),
			'description' => __( 'Block patterns for the ' . $name . ' theme.', $slug ),
		)
	);
	register_block_pattern_category(
		"{$slug}-content",
		array(
			'label' => __( "{$name} Content", $slug ),
			'description' => __( 'Page block starter templates for the ' . $name . ' theme.', $slug ),
		)
	);
	register_block_pattern_category(
		"{$slug}-images",
		array(
			'label' => __( "{$name} Images", $slug ),
			'description' => __( 'Page block starter templates for the ' . $name . ' theme.', $slug ),
		)
	);
}
add_action( 'init', __NAMESPACE__ . '\\register_pattern_categories' );
