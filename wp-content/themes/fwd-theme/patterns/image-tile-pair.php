<?php
/**
 * Title: Image Tile Pair
 * Slug: fwd/image-tile-pair
 * Categories: fwd-images
 * Block Types: core/columns, core/column, core/image
 * Description: A pair of images side-by-side.
 */
?>

<!-- wp:columns {"metadata":{"categories":["fwd-images"],"patternName":"fwd/image-tile-pair","name":"Image Tile Pair"},"align":"wide","className":"image-tile-pair"} -->
<div class="wp-block-columns image-tile-pair"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:image {"id":48,"sizeSlug":"full","linkDestination":"none","align":"full","style":{"border":{"radius":{"bottomRight":"80px","topLeft":"10px","topRight":"10px","bottomLeft":"80px"}}},"backgroundColor":"base-3"} -->
<figure class="wp-block-image alignfull size-full has-custom-border has-base-3-background-color has-background"><img src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/png/featured-image-fallback.png" alt="" class="wp-image-48" style="border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-left-radius:80px;border-bottom-right-radius:80px"/><figcaption class="wp-element-caption">Relationship: Lorem ipsum dolor sit amet<br>Engagement: Consetetur sadipscing elitr</figcaption></figure>
<!-- /wp:image --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:image {"id":48,"sizeSlug":"full","linkDestination":"none","align":"full","style":{"border":{"radius":{"bottomRight":"10px","topLeft":"80px","topRight":"10px","bottomLeft":"10px"}}},"backgroundColor":"base-2"} -->
<figure class="wp-block-image alignfull size-full has-custom-border has-base-2-background-color has-background"><img src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/png/featured-image-fallback.png" alt="" class="wp-image-48" style="border-top-left-radius:80px;border-top-right-radius:10px;border-bottom-left-radius:10px;border-bottom-right-radius:10px"/><figcaption class="wp-element-caption">Relationship: Lorem ipsum dolor sit amet<br>Engagement: Consetetur sadipscing elitr</figcaption></figure>
<!-- /wp:image --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->