<?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$label     = esc_html( $attributes['label'] ?? '' );
$menu_slug = esc_attr( $attributes['menuSlug'] ?? '');
$close_icon  = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path d="M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"></path></svg>';

// Don't display the mega menu link if there is no label or no menu slug.
if ( ! $label || ! $menu_slug ) {
	return null;	
}
?>

<li 
	<?php echo get_block_wrapper_attributes(); ?>
	data-wp-interactive="fwd/mega-menu"
	data-wp-context='{ "isMenuOpen": false }'
>
	<a
		data-wp-on--click="actions.toggleMenu"
		data-wp-bind--aria-expanded="context.isMenuOpen"
        class="wp-block-navigation-item__content"
	>
		<?php echo $label; ?>
	</a>
	<div class="mega-menu__wrapper">
		<?php echo block_template_part( $menu_slug ); ?>
		<button 
			aria-label="<?php echo __( 'Close menu', 'mega-menu' ); ?>" 
			class="mega-menu__close-button" 
			type="button" 
			data-wp-on--click="actions.closeMenu"
		>
			<?php echo $close_icon; ?>
		</button>
	</div>
</li>