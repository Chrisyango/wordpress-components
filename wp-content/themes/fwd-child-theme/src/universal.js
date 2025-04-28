/**
 * Universal JavaScript loaded for the theme.
 */

"use strict";

// Load universal styles, for Webpack CSS Tree Shaking.
import "./universal.scss";

/**
 * Vendor libraries and plugin settings
 */

/*
 * Core Block Scripts
 */

/*
 * Template part scripts
 */

/*
 * Theme specific scripts
 */

/**
 * Controls the color cycling for items throughout the theme
 *
 * Set the animation delay to synchronize with the CSS animation
 */
document.addEventListener("DOMContentLoaded", function () {
	let time = new Date();
	let seconds = time.getSeconds();

	// Set the animation delay to synchronize with the CSS animation.
	document.documentElement.style.setProperty(
		"--animation-delay",
		`-${seconds}s`
	);
});
