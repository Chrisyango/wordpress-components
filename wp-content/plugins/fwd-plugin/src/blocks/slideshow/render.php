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

?>
<div <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>
	data-wp-interactive='slideshow'
	data-wp-on-document--keydown="actions.onKeyDown"
	data-wp-init="callbacks.initSlideShow"
>
	<div
		class="slider__wrapper transition-<?= $attributes['transitionEffect'] ?>"
		data-wp-style--transform="state.currentPos"
		data-wp-on--touchstart="actions.onTouchStart"
		data-wp-on--touchend="actions.onTouchEnd"
		data-wp-on--mousedown="actions.onMouseDown"
		data-wp-on--mouseup="actions.onMouseUp"
	>
		<?php echo wp_kses_post( $content ); ?>
	</div>
	<div class="slideshow__navigation">
		<button data-wp-on--click="actions.prevImage" data-wp-bind--disabled="state.noPrevSlide" aria-label="go to previous slide">&lt;</button>
		<ul class="slideshow__pagination">
			<template data-wp-each="context.pagination">
				<li class="slideshow__pagination-bullet" data-wp-watch="callbacks.watchPagination" data-wp-on--click="actions.goToSlide" data-wp-text="context.item"></li>
			</template>
		</ul>
		<button data-wp-on--click="actions.nextImage"data-wp-bind--disabled="state.noNextSlide" aria-label="go to next slide">&gt;</button>
	</div>
</div>
