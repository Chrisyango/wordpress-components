<?php
/**
 * Title: Announcement Bar
 * Slug: fwd/announcement-bar
 * Inserter: false
 */

// Set the initial announcemnt message
$announcement_message = '';

// If there is ACF support, get the announcement bar message
if( function_exists('get_field') ) :

	// Uncomment the line below to reset the transient
	// delete_transient( 'announcement_bar' );

	// Announcement bar options are in theme options and stored in a transient
	$announcement_bar = get_transient('announcement_bar');

	// If the transient does not exist, get the announcement bar options
	if( false === $announcement_bar ) {

		// Get the announcement bar options
		$show_announcement_bar = get_field('show_announcement_bar', 'option');
		$announcement_message = get_field('announcement_bar_message', 'option');

		$announcement_bar = array(
			'is_visible' => $show_announcement_bar,
			'message' => $announcement_message,
		);

		// Set the transient
		set_transient('announcement_bar', $announcement_bar, 1 * HOUR_IN_SECONDS);
	} else {

		// Get the announcement bar options from the transient
		$show_announcement_bar = $announcement_bar['is_visible'];
		$announcement_message = $announcement_bar['message'];
	}

endif;

// Only show the announcement bar if the message is not empty
if( !empty($announcement_message) && $show_announcement_bar ) :
?>
<div class="announcement-bar is-hidden">
	<p class="announcement-bar__message">
		<?php echo $announcement_message; ?>
	</p>
	<svg class="announcement-bar__close" xmlns="http://www.w3.org/2000/svg" width="12.037" height="12.037" viewBox="0 0 12.037 12.037" aria-label="Close">
		<g id="Close_X" data-name="Close X" transform="translate(0.707 0.707)">
			<line id="Line_18" data-name="Line 18" y2="15.023" transform="translate(10.623) rotate(45)" fill="none" stroke="#000" stroke-width="2"/>
			<line id="Line_17" data-name="Line 17" x1="15.023" transform="translate(0 0) rotate(45)" fill="none" stroke="#000" stroke-width="2"/>
		</g>
	</svg>
</div>
<?php
endif;
