<?php


class Extension_Styles_Scripts {
	/**
	 * An array of blocks used in this page.
	 *
	 * @var array
	 */
	private static $page_blocks = array();

	protected $prefix = '';
	protected $directory = '';
	protected $plugin_blocks = array();

	public function __construct() {
		/**
		 * Set up our variables
		 */
		$this->prefix = 'fwd-';
		$this->directory = plugin_dir_path( __DIR__ ) . 'src/block-extensions/';
		$this->plugin_blocks = array_diff(scandir($this->directory), array('..', '.'));

		/**
		 * Run required filters before each block gets rendered.
		 */
		foreach ( $this->plugin_blocks as $block_name ) {
			/**
			 * Require files for blocks that have additional functionality filters
			 */
			$file = plugin_dir_path( __DIR__ ) . 'src/block-extensions/' . $block_name . '/filters.php';
			if ( file_exists($file) ) {
				require( $file );
			}
		}

		/**
		 * Use a filter to figure out which blocks are used.
		 * We'll use this to populate the $blocks property of this object
		 * and enqueue the CSS needed for them.
		 */
		add_filter( 'render_block', [ $this, 'get_page_blocks' ], 10, 2 );

		/**
		 * Enqueue block styles and scripts.
		 * (Only applies to the Editor)
		 */
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_editor_scripts_styles' ], 10, 2);

		/**
		 * Enqueue block styles and scripts.
		 * (Only applies to the Frontend)
		 */
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_frontend_scripts_styles' ] );
	}

	/**
	 * Enqueue block styles and scripts.
	 * (Only applies to the Editor)
	 */
	public function enqueue_editor_scripts_styles() {
		foreach ( $this->plugin_blocks as $block_name ) {
			$plugin_url = plugin_dir_url( __DIR__ ) . 'build/block-extensions/' . $block_name;

			wp_enqueue_style(
				$this->prefix . $block_name . '-extensions-editor-styles',
				$plugin_url . '/index.css'
			);

			wp_enqueue_script(
				$this->prefix . $block_name . '-extensions-editor-scripts',
				$plugin_url . '/index.js',
				array( 'wp-blocks', 'wp-dom-ready', 'wp-edit-post' )
			);

			wp_register_style(
				$this->prefix . $block_name . '-extensions-styles',
				$plugin_url . '/style-index.css',
			);
			wp_enqueue_style( $this->prefix . $block_name . '-extensions-styles' );
		}
	}

	/**
	 * Enqueue block styles and scripts.
	 * (Only applies to the Frontend)
	 */
	public function enqueue_frontend_scripts_styles() {
		$page_blocks = array_unique( self::$page_blocks );
		foreach ( $this->plugin_blocks as $block_name ) {
			if ( !in_array( 'core/' . $block_name, $page_blocks ) ) {
				continue;
			}

			$plugin_url = plugin_dir_url( __DIR__ ) . 'build/block-extensions/' . $block_name;
			wp_register_style(
				$this->prefix . $block_name . '-extensions-styles',
				$plugin_url . '/style-index.css',
			);
			wp_enqueue_style( $this->prefix . $block_name . '-extensions-styles' );
			wp_enqueue_script(
				$this->prefix . $block_name . '-extensions-scripts',
				$plugin_url . '/view.js',
				array( 'acf-input', 'wp-blocks', 'wp-i18n', 'wp-element' )
			);
		}
	}

	/**
	 * Get all blocks on the current page
	 *
	 * @param string $block_content The block content about to be appended.
	 * @param array  $block         The full block, including name and attributes.
	 * @return string               Returns $block_content unaltered.
	 */
	public function get_page_blocks( $block_content, $block ) {
		if ( $block['blockName'] ) {
			self::$page_blocks[] = $block['blockName'];
		}

		return $block_content;
	}
}

new Extension_Styles_Scripts();
