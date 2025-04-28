<?php
/**
 * Functionality relating to loading assets
 *
 * - Load editor scripts and stylesheets
 * - Load universal styles and template styles
 */

namespace Child_Theme\Asset_Loader;

/**
 * Load editor scripts and stylesheets
 */
function theme_editor_scripts_styles() {

	// Grab the theme transient
	$theme = (array) get_transient( 'child_theme' );

	// Ensure the necessary values are present
	$build = array_key_exists( 'build', $theme ) ? $theme['build'] : get_stylesheet() . '/build';
	$build_uri = array_key_exists( 'build-uri', $theme ) ? $theme['build-uri'] : get_stylesheet_uri() . '/build';

	// Load editor styles, if present.
	if( file_exists( $build . '/child-theme-editor.css' ) )
		add_editor_style( 'build/child-theme-editor.css' );

	// Load editor scripts, if present.
	if( file_exists( $build . '/child-theme-editor.js' ) )
		wp_enqueue_script( 'child-theme-editor', $build_uri . '/child-theme-editor.js', array( 'wp-block-editor' ), null, true );
}
add_action( 'after_setup_theme', __NAMESPACE__ . '\\theme_editor_scripts_styles' );

/**
 * Load universal styles and template styles
 */
function enqueue_theme_styles() {

	// Grab the theme transient
	$theme = (array) get_transient( 'child_theme' );

	// Ensure the necessary values are present
	$build = array_key_exists( 'build', $theme ) ? $theme['build'] : get_stylesheet() . '/build';
	$build_uri = array_key_exists( 'build-uri', $theme ) ? $theme['build-uri'] : get_stylesheet_uri() . '/build';
	$page_types = array_key_exists( 'page_types', $theme ) ? $theme['page_types'] : array();
	$version = array_key_exists( 'version', $theme ) ? $theme['version'] : wp_get_theme()->get( 'Version' );

	// Check if version is a string
	$version_string = is_string( $version ) ? $version : false;

	// Enqueue theme stylesheet.
	wp_register_style(
		'child-theme-style',
		$build_uri . '/child-theme-universal.css',
		array( 'theme-style' ),
		$version_string
	);
	wp_enqueue_style( 'child-theme-style' );

	// Get current page template and load that stylesheet, if present.
	$template = get_page_template_slug( get_the_ID() );
	if( $template && file_exists( $build_uri . '/' . $template ) )
		wp_enqueue_style(
			'theme-template-' . $template,
			$build_uri . '/' . $template,
			array( 'child-theme-style' ),
			$version_string
		);

	// Load predefined stylesheets based on page type.
	foreach( $page_types as $type ) {
		if( call_user_func('is_' . $type) && file_exists( $build . '/' . $type . '.css' ) )
			wp_enqueue_style(
				'theme-' . $type,
				$build_uri . '/' . $type . '.css',
				array( 'child-theme-style' ),
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
	$theme = (array) get_transient( 'child_theme' );

	// Ensure the necessary values are present
	$build = array_key_exists( 'build', $theme ) ? $theme['build'] : get_stylesheet() . '/build';
	$build_uri = array_key_exists( 'build-uri', $theme ) ? $theme['build-uri'] : get_stylesheet_uri() . '/build';
	$page_types = array_key_exists( 'page_types', $theme ) ? $theme['page_types'] : array();
	$version = array_key_exists( 'version', $theme ) ? $theme['version'] : wp_get_theme()->get( 'Version' );

	// Check if version is a string
	$version_string = is_string( $version ) ? $version : false;

	// Enqueue universal scripts.
	wp_enqueue_script(
		'child-theme-scripts',
		$build_uri . '/child-theme-universal.js',
		array( 'theme-scripts' ),
		$version_string
	);

	// Get current page template and load their scripts, if present.
	$template = get_page_template_slug( get_the_ID() );
	if( $template && file_exists( $build . '/' . $template ) )
		wp_enqueue_script(
			'theme-template-' . $template,
			get_template_directory_uri() . '/build/' . $template,
			array( 'child-theme-scripts' ),
			$version_string
		);

	// Load predefined scripts based on page type.
	foreach( $page_types as $type ) {
		if( call_user_func('is_' . $type) && file_exists( $build . '/' . $type . '.js' ) )
			wp_enqueue_script(
				'theme-' . $type,
				$build_uri . '/' . $type . '.js',
				array( 'child-theme-scripts' ),
				$version_string
			);
	}
}
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\enqueue_theme_scripts' );
