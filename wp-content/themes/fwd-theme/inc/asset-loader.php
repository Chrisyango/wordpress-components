<?php
/**
 * Functionality relating to loading assets
 *
 * - Load editor scripts and stylesheets
 * - Load universal styles and template styles
 */

namespace Theme\Asset_Loader;

/**
 * Load editor scripts and stylesheets
 */
function theme_editor_scripts_styles() {

	// Grab the theme transient
	$theme = (array) get_transient( 'theme' );

	// Ensure the necessary values are present
	$build = array_key_exists( 'build', $theme ) ? $theme['build'] : get_stylesheet() . '/build';
	$build_uri = array_key_exists( 'build-uri', $theme ) ? $theme['build-uri'] : get_stylesheet_uri() . '/build';

	// Load editor styles, if present.
	if( file_exists( $build . '/editor.css' ) )
		add_editor_style( 'build/editor.css' );

	// Load editor scripts, if present.
	if( file_exists( $build . '/editor.js' ) )
		wp_enqueue_script( 'theme-editor', $build_uri . '/editor.js', array( 'wp-block-editor' ), null, true );
}
add_action( 'after_setup_theme', __NAMESPACE__ . '\\theme_editor_scripts_styles' );

/**
 * Load universal styles and template styles
 */
function enqueue_theme_styles() {

	// Grab the theme transient
	$theme = (array) get_transient( 'theme' );

	// Ensure the necessary values are present
	$build = array_key_exists( 'build', $theme ) ? $theme['build'] : get_stylesheet() . '/build';
	$build_uri = array_key_exists( 'build-uri', $theme ) ? $theme['build-uri'] : get_stylesheet_uri() . '/build';
	$page_types = array_key_exists( 'page_types', $theme ) ? $theme['page_types'] : array();
	$version = array_key_exists( 'version', $theme ) ? $theme['version'] : wp_get_theme()->get( 'Version' );

	// Check if version is a string
	$version_string = is_string( $version ) ? $version : false;

	// Enqueue theme stylesheet.
	wp_register_style(
		'theme-style',
		$build_uri . '/universal.css',
		array(),
		$version_string
	);
	wp_enqueue_style( 'theme-style' );

	// Get current page template and load that stylesheet, if present.
	$template = get_page_template_slug( get_the_ID() );
	if( $template && file_exists( $build_uri . '/' . $template ) )
		wp_enqueue_style(
			'theme-template-' . $template,
			$build_uri . '/' . $template,
			array( 'theme-style' ),
			$version_string
		);

	// Load predefined stylesheets based on page type.
	foreach( $page_types as $type ) {
		if( call_user_func('is_' . $type) && file_exists( $build . '/' . $type . '.css' ) )
			wp_enqueue_style(
				'theme-' . $type,
				$build_uri . '/' . $type . '.css',
				array( 'theme-style' ),
				$version_string
			);
	}
}
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\enqueue_theme_styles' );

/**
 * Load universal scripts and template scripts
 */
function enqueue_theme_scripts() {

	// Grab the theme transient
	$theme = (array) get_transient( 'theme' );

	// Ensure the necessary values are present
	$build = array_key_exists( 'build', $theme ) ? $theme['build'] : get_stylesheet() . '/build';
	$build_uri = array_key_exists( 'build-uri', $theme ) ? $theme['build-uri'] : get_stylesheet_uri() . '/build';
	$page_types = array_key_exists( 'page_types', $theme ) ? $theme['page_types'] : array();
	$version = array_key_exists( 'version', $theme ) ? $theme['version'] : wp_get_theme()->get( 'Version' );

	// Check if version is a string
	$version_string = is_string( $version ) ? $version : false;

	// Enqueue universal scripts.
	wp_enqueue_script(
		'theme-scripts',
		$build_uri . '/universal.js',
		array(),
		$version_string
	);

	// Get current page template and load their scripts, if present.
	$template = get_page_template_slug( get_the_ID() );
	if( $template && file_exists( $build . '/' . $template ) )
		wp_enqueue_script(
			'theme-template-' . $template,
			get_template_directory_uri() . '/build/' . $template,
			array( 'theme-scripts' ),
			$version_string
		);

	// Load predefined scripts based on page type.
	foreach( $page_types as $type ) {
		if( call_user_func('is_' . $type) && file_exists( $build . '/' . $type . '.js' ) )
			wp_enqueue_script(
				'theme-' . $type,
				$build_uri . '/' . $type . '.js',
				array( 'theme-scripts' ),
				$version_string
			);
	}
}
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\enqueue_theme_scripts' );

/**
 * Load pattern styles
 */
function load_pattern_styles( $block_content, $block ) {
	// Traverse block attributes to get patternName
	$attrs = $block['attrs'];
	if (array_key_exists('metadata', $attrs)) {
		$metadata = $attrs['metadata'];

		if (array_key_exists('patternName', $metadata)) {
			$pattern_name = substr($metadata['patternName'], 4);
			
			if ( $pattern_name ) {
				// Grab the theme transient
				$theme = get_transient( 'theme' );

				// Ensure the necessary values are present
				$build = array_key_exists( 'build', $theme ) ? $theme['build'] : get_stylesheet() . '/build';
				$build_uri = array_key_exists( 'build-uri', $theme ) ? $theme['build-uri'] : get_stylesheet_uri() . '/build';
				$page_types = array_key_exists( 'page_types', $theme ) ? $theme['page_types'] : array();
				$version = array_key_exists( 'version', $theme ) ? $theme['version'] : wp_get_theme()->get( 'Version' );

				// Check if version is a string
				$version_string = is_string( $version ) ? $version : false;

				// Load pattern style and scripts if pattern is present
				if ( file_exists( $build . '/' . $pattern_name . '.css' ) )
					wp_enqueue_style(
						'pattern-' . $pattern_name,
						$build_uri . '/' . $pattern_name . '.css',
						array( 'theme-style' ),
						$version_string
					);
				if ( file_exists( $build . '/' . $pattern_name . '.js' ) )
					wp_enqueue_script(
						'pattern-' . $pattern_name,
						$build_uri . '/' . $pattern_name . '.js',
						array( 'theme-scripts' ),
						$version_string
					);
			}
		}
	}

	return $block_content;
}
add_filter( 'render_block', __NAMESPACE__ . '\\load_pattern_styles', 10, 2 );