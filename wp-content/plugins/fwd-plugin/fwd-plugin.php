<?php
/**
 * Plugin Name: FWD Plugin
 * Description: Functionality plugin for FWD
 * Author: Design FWD
 * Author URI: https://www.designfwd.com
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: fwd-plugin
 */

// If there are vendor files from Composer, load them
if( file_exists( get_stylesheet_directory() . '/vendor/autoload.php' ) )
	require( get_stylesheet_directory() . '/vendor/autoload.php' );

require( plugin_dir_path( __FILE__ ) . 'inc/block-registrations.php' );
require( plugin_dir_path( __FILE__ ) . 'inc/block-extensions.php' );

add_filter( 'block_categories_all' , function( $categories ) {

	/**
	 * Note: The slug and text domain are 'fwd' here to allow for simpler use
	 * of code across codebases.
	 */
	$custom_category = array(
        'slug'  => 'fwd',
        'title' => __( 'FWD', 'fwd' ),
    );

    $categories_sorted = array();
    $categories_sorted[0] = $custom_category;

    foreach ($categories as $category) {
        $categories_sorted[] = $category;
    }

    return $categories_sorted;
}, 10, 2 );
