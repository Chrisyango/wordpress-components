"use strict";

// Load styles, for Webpack CSS Tree Shaking.
import "./style.scss";

import MmenuLight from "mmenu-light";

document.addEventListener('DOMContentLoaded', () => {
    const headerWrapper = document.querySelector('.header__wrapper');
    const nav = document.querySelector('.wp-block-navigation');

    // Create nav wrapper and append to header
    const navWrapper = document.createElement('div');
    navWrapper.classList.add('wp-block-nav__wrapper');
    headerWrapper.append(navWrapper);
    navWrapper.append(nav);

    // Create mobile nav icon
    const mobileToggle = document.createElement('div');
    mobileToggle.classList.add('mobile-toggle');
    headerWrapper.append(mobileToggle);

    /**
     * Set up mobile nav
     */
    let myMenu = document.querySelector('.wp-block-nav__wrapper');
    const menu = new MmenuLight( myMenu, "(max-width: 992px)");
    const navigator = menu.navigation({
        title: '',
    });
    const drawer = menu.offcanvas();
    drawer.wrapper.classList.remove('mm-ocd--left');

    /**
     * Mobile Menu Toggle
     */
    if (mobileToggle) {
        mobileToggle.addEventListener('click', (event) => {
            event.preventDefault();

            mobileToggle.classList.toggle('show-mobile-menu');
            if (mobileToggle.classList.contains('show-mobile-menu')) {
                drawer.open();
            } else {
                drawer.close();
            }
        });
    }

    // Check if user has scrolled and resize header accordingly
    function resizeNavItems() {
        const navLogo = document.querySelector('.header__logo a');
        const navLinks = nav.querySelectorAll('.wp-block-navigation-item__content');
        if (window.innerWidth <= 991) {
            navLogo.style.width = `120px`;
            navLinks.forEach(navLink => {
                navLink.style.fontSize = `clamp(20px, 15.273px + 0.606vw, 24px)`;
            })
            return;
        }

        const scrollTop = window.scrollY;
        if (scrollTop >= 500) {
            return;
        }
        const logoWidth = Math.round(10 * ((scrollTop >= 400 ? 400 : scrollTop) / 100));
        const navLinksSize = Math.round(1 * ((scrollTop >= 400 ? 400 : scrollTop) / 100));

        navLogo.style.width = `${195 - logoWidth}px`;
        navLinks.forEach(navLink => {
            navLink.style.fontSize = `${24 - navLinksSize}px`;
        })
    }

    /**
     * Set up Mobile Menu top style
     */
    function moveNav() {
        // Get relevant elements and their heights
        const header = document.querySelector('header.wp-block-template-part');
        const headerHeight = header.offsetHeight;
        const wpadminbar = document.querySelector('#wpadminbar');
        const wpadminbarHeight = wpadminbar ? wpadminbar.offsetHeight : 0;
        const top = headerHeight + wpadminbarHeight;
        const mobileNav = document.querySelector('.mm-ocd');

        mobileNav.style.top = `${top}px`
    }
    window.addEventListener('load', () => {
        moveNav();
        resizeNavItems();
    });
    window.addEventListener('resize', () => {
        moveNav();
    });
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header.wp-block-template-part');
        const scrollY = window.scrollY;
        if (scrollY >= 200) {
            header.classList.add('has-scrolled');
        } else {
            header.classList.remove('has-scrolled');
        }

        resizeNavItems();
    });
});
