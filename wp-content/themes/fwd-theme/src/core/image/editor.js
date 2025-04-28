wp.domReady(() => {
	/**
	 * Unregister core image styles
	 */
	wp.blocks.unregisterBlockStyle('core/image', 'default');
	wp.blocks.unregisterBlockStyle('core/image', 'rounded');

	/**
	 * Register secondary background color
	 */
	wp.blocks.registerBlockStyle( 'core/image', {
		name: 'default',
		label: 'Default BG',
		isDefault: true
	} );
	wp.blocks.registerBlockStyle( 'core/image', {
		name: 'alternate',
		label: 'Alternate BG',
	} );
});
