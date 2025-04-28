<?php

namespace Theme\Google_Tag_Manager;

/**
 * Add Google Tag Manager to the site.
 *
 * Replace the GTM ID in the $gtag_id variable with your own GTM ID. It's left
 * blank intentionally to avoid accidental use and to allow simple copy-pasting.
 */
function gtag_head() {
	$gtag_id = '';

	if( $gtag_id !== '' ):
	?>
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','<?php echo $gtag_id ?>');</script>
<!-- End Google Tag Manager -->
	<?php
	endif;
}
add_action( 'wp_head', __NAMESPACE__ . '\\gtag_head' );

function gtag_body() {
	$gtag_id = '';

	if( $gtag_id !== '' ):
	?>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=<?php echo $gtag_id ?>"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
	<?php
	endif;
}
add_action( 'wp_body_open', __NAMESPACE__ . '\\gtag_body' );
