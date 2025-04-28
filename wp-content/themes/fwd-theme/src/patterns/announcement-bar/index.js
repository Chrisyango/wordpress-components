/**
 * Scripting for the announcement bar.
 *
 * Manages a value in session storage to determine if the announcement bar has
 * been dismissed. If it has been dismissed, the announcement bar will not be
 * displayed.
 */

"use strict";

// Load page template stylesheet for webpack to process
import "./style.scss";

document.addEventListener('DOMContentLoaded', function () {

	// Get the announcement bar element and close button.
	const announcementBar = document.querySelector('.announcement-bar');
	const closeButton = document.querySelector('.announcement-bar__close');

	// If the announcement bar is not found, stop.
	if (!announcementBar) {
		return;
	}

	/**
	 * If 'announcement-bar-dismissed' is not set in session storage, remove
	 * the 'is-hidden' class from the announcement bar.
	 */
	if (!sessionStorage.getItem('announcement-bar-dismissed')) {
		announcementBar.classList.remove('is-hidden');
	}

	/**
	 * If the closeButton is clicked, add a value to session storage to
	 * indicate that and add the 'is-hidden' class to the announcement bar.
	 */
	if (closeButton) {
		closeButton.addEventListener('click', function () {
			sessionStorage.setItem('announcement-bar-dismissed', 'true');
			announcementBar.classList.add('is-hidden');
		});
	}
});
