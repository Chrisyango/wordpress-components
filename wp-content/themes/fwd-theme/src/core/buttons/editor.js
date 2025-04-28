/**
 * Unregister core button styles
 */
wp.domReady(() => {
	wp.blocks.unregisterBlockStyle('core/button', 'outline');
	wp.blocks.unregisterBlockStyle('core/button', 'fill');
});
