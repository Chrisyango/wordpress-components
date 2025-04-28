/**
 * Unregister core button styles
 */
wp.domReady(() => {
    wp.blocks.registerBlockStyle( 'core/column', {
        name: 'stagger-down',
        label: 'Stagger Down',
    });
    wp.blocks.registerBlockStyle( 'core/column', {
        name: 'stagger-up',
        label: 'Stagger Up',
    });
});
