<?php
/**
 * Title: Content Row w/2 Images
 * Slug: fwd/content-row-2-image
 * Categories: fwd-content
 * Block Types: core/group, core/image
 * Description: Set media and words side-by-side for a richer layout.
 */
?>

<!-- wp:group {"tagName":"section","metadata":{"categories":["fwd-content"],"patternName":"fwd/content-row-2-image","name":"Content Row w/2 Images"},"align":"full","className":"content-row","backgroundColor":"base-3","layout":{"type":"constrained"}} -->
<section class="wp-block-group alignfull content-row has-base-3-background-color has-background"><!-- wp:group {"align":"wide","className":"content-row__wrapper","style":{"spacing":{"padding":{"top":"120px","bottom":"120px"}}},"layout":{"type":"flex","flexWrap":"wrap"}} -->
<div class="wp-block-group alignwide content-row__wrapper" style="padding-top:120px;padding-bottom:120px"><!-- wp:image {"id":48,"sizeSlug":"full","linkDestination":"none","className":"content-row__image"} -->
<figure class="wp-block-image size-full has-custom-border content-row__image"><img src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/jpg/content-row.jpg" alt="" class="wp-image-48" style="border-top-left-radius:80px;border-top-right-radius:10px;border-bottom-left-radius:10px;border-bottom-right-radius:10px"/></figure>
<!-- /wp:image -->

<!-- wp:image {"id":48,"sizeSlug":"full","linkDestination":"none","className":"content-row__image"} -->
<figure class="wp-block-image size-full has-custom-border content-row__image"><img src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/jpg/content-row.jpg" alt="" class="wp-image-48" style="border-top-left-radius:80px;border-top-right-radius:10px;border-bottom-left-radius:10px;border-bottom-right-radius:10px"/></figure>
<!-- /wp:image --></div>
<!-- /wp:group --></section>
<!-- /wp:group -->