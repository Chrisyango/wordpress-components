<?php
/**
 * Functionality related to the Advanced Custom Fields plugin
 *
 * - Save ACF JSON files to theme directory
 * - Load ACF JSON files from theme directory
 *
 */

namespace Theme\Advanced_Custom_Fields;

/**
 * Save ACF JSON files to theme directory
 */
function acf_json_save_point( $path ) {

	// Grab the theme transient
	$theme = (array) get_transient( 'theme' );

	$path = array_key_exists('acf-json', $theme) ? $theme['acf-json'] : $path;
	return $path;
}
add_filter('acf/settings/save_json', __NAMESPACE__ . '\\acf_json_save_point');


/**
 * Load ACF JSON files from theme directory
 */
function acf_json_load_point( $paths ) {

	// Grab the theme transient
	$theme = (array) get_transient( 'theme' );

	unset($paths[0]);
	$paths[] = array_key_exists('acf-json', $theme) ? $theme['acf-json'] : '';
	return $paths;
}
add_filter('acf/settings/load_json', __NAMESPACE__ . '\\acf_json_load_point');
