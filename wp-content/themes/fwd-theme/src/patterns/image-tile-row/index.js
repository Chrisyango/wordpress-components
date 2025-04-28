/**
 * Scripting for the image tile row
 */

"use strict";

// Load page template stylesheet for webpack to process
import "./style.scss";

document.addEventListener('DOMContentLoaded', function () {
    const imageTileRows = document.querySelectorAll('.image-tile-row');

    // Background color goes full width
    imageTileRows.forEach(imageTileRow => {
        const style = window.getComputedStyle(imageTileRow);
        const backgroundColor = style.getPropertyValue('background-color');

        imageTileRow.style.boxShadow = `0 0 0 100vmax ${backgroundColor}`;
    });
});