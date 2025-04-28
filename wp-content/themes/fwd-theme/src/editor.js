/**
 * Universal JavaScript loaded for the theme.
 */

"use strict";

/* Core Block Scripts */

import './core/buttons/editor.js';
import './core/columns/editor.js';
import './core/image/editor.js';

import './editor.scss';

/**
 * Recategorize block(s) into a new category
 */
function recategorizeCoreBlocks( settings, name ) {
	const blocksToRecategorize = [
		'core/buttons',
		'core/details',
	];

	if( blocksToRecategorize.includes( name ) ) {
		return Object.assign({}, settings, {
			category: 'fwd',
		});
	}

	return settings;
}

wp.hooks.addFilter(
	'blocks.registerBlockType',
	'fwd/recategorize-core-blocks',
	recategorizeCoreBlocks
);
