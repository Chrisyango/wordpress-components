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
import "./core/image/index.js";
import './core/buttons/index.js'

/*
 * Template part scripts
 */
import './parts/background-circle/index.js';
import "./parts/header/index.js";
import "./parts/footer/index.js";
import './parts/scroll-to-top/index.js';
import './patterns/announcement-bar/index.js';

/*
 * Theme specific scripts
 */
