<?php
/**
 * Block customizations
 */

namespace Theme\Block_Customizations;

/**
 * Remove Styles for Core Blocks
 */
function prefix_remove_core_block_styles() {
	wp_dequeue_style( 'wp-block-navigation' );
}
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\prefix_remove_core_block_styles' );
