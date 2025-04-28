/**
 * On the front end, show a scroll to top button when the user scrolls down.
 */

"use strict";

// Load styles, for Webpack CSS Tree Shaking.
import "./style.scss";

document.addEventListener('DOMContentLoaded', function () {
	const scrollToTopButton = document.querySelector('.scroll-to-top');
	const progressBar = document.querySelector('.progress-bar');
	let totalLength = 0;

	// Get the total length of the progress bar
	if( progressBar !== null )
		totalLength = progressBar.getTotalLength();

	// Add an event listener to the button.
	if( scrollToTopButton !== null ) {
		scrollToTopButton.addEventListener('click', function () {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		});
	}

	// Add an event listener to the window.
	window.addEventListener('scroll', debounce(onScroll));

	// Create Progress Bar
	if( progressBar !== null ) {
		progressBar.style.strokeDasharray = totalLength;
		progressBar.style.strokeDashoffset = totalLength;
	}

	// Set progress bar
	window.addEventListener('scroll', () => {
		setProgress(progressBar, totalLength);
	});

	// This will make sure there's at least 150ms between each event
	function debounce(func, wait = 150, immediate) {
		let timeout;
		return function() {
			let context = this, args = arguments;
			clearTimeout(timeout);
			if (immediate && !timeout) func.apply(context, args);
			timeout = setTimeout(function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			}, wait);
		};
	}

	function onScroll() {
		// Store the scroll position
		let scrollPosition = window.scrollY;

		// If the user scrolls down, add a visible modifier class.
		requestAnimationFrame(() => {
			if (scrollPosition > 100) {
				scrollToTopButton.classList.add('is-visible');
			} else {
				scrollToTopButton.classList.remove('is-visible');
			}
		})
	}

	function setProgress(progressBar, totalLength) {
		const clientHeight = document.documentElement.clientHeight;
		const scrollHeight = document.documentElement.scrollHeight;
		const scrollTop = document.documentElement.scrollTop;

		const percentage = scrollTop / (scrollHeight - clientHeight);
		progressBar.style.strokeDashoffset = totalLength - totalLength * percentage;
	}
});
