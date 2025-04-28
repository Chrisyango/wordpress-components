/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* eslint-disable no-console */
import {
	store,
	getElement,
	getContext,
	withScope,
} from '@wordpress/interactivity';

// eslint-disable-next-line no-unused-vars
document.addEventListener("DOMContentLoaded", function () {
  const { state, actions } = store( 'slideshow', {
    state: {
      get noPrevSlide() {
        const ctx = getContext();
        if ( ctx.continuous ) {
          return false;
        }
        return ctx.currentSlide === 1;
      },
      get noNextSlide() {
        const ctx = getContext();
        if ( ctx.continuous ) {
          return false;
        }
        return ctx.currentSlide === ctx.totalSlides;
      },
      get currentPos() {
        const ctx = getContext();
        return ctx.transitionEffect == 'slide' ? `translateX(-${ ( ctx.currentSlide - 1 ) * 100 }%)` : false;
      },
      get transitionsSpeed() {
        const ctx = getContext();
        return Number( ctx.speed ) * 1000;
      },
    },
    actions: {
      prevImage: () => {
        const ctx = getContext();
        ctx.slides[ctx.currentSlide - 1].classList.remove('active');
        if ( ctx.continuous && ctx.currentSlide === 1 ) {
          ctx.currentSlide = ctx.totalSlides;
        } else {
          ctx.currentSlide--;
        }
        ctx.slides[ctx.currentSlide - 1].classList.add('active');
      },
      nextImage: () => {
        const ctx = getContext();
        ctx.slides[ctx.currentSlide - 1].classList.remove('active');
        if (
          ( ctx.continuous || ctx.autoplay ) &&
          ctx.currentSlide === ctx.totalSlides
        ) {
          ctx.currentSlide = 1;
        } else {
          ctx.currentSlide++;
        }
        ctx.slides[ctx.currentSlide - 1].classList.add('active');
      },
      goToSlide: () => {
        const ctx = getContext();
        const slides = ctx.slides;
        const currentSlide = slides[ctx.item - 1];

        // Remove 'active' class from Active Slide and add it to the corresponding slide in the pagination the user clicked
        if (!currentSlide.classList.contains('active')) {
          const activeSlide = slides.find(element => element.classList.contains('active'));
          activeSlide.classList.remove('active');
          ctx.currentSlide = ctx.item;
          currentSlide.classList.add('active');
        }
      },
      onKeyDown: ( e ) => {
        switch ( e.key ) {
          case 'ArrowLeft': {
            if ( ! state.noPrevSlide ) {
              actions.prevImage();
            }
            break;
          }
          case 'ArrowRight': {
            if ( ! state.noNextSlide ) {
              actions.nextImage();
            }
            break;
          }
        }
      },
      onMouseDown: ( e ) => {
        e.preventDefault();
        const ctx = getContext();
        ctx.swipe = e.clientX;
      },
      onMouseUp: ( e ) => {
        const { swipe } = getContext();
        if ( e.clientX == swipe ) {
          return;
        }

        if ( e.clientX < swipe ) {
          if ( ! state.noNextSlide ) {
            actions.nextImage();
          }
        } else {
          if ( ! state.noPrevSlide ) {
            actions.prevImage();
          }
        }
      },
      onTouchStart: ( e ) => {
        const ctx = getContext();
        ctx.swipe = e.changedTouches[ 0 ].clientX;
      },
      onTouchEnd: ( e ) => {
        const { swipe } = getContext();
        if ( e.changedTouches[ 0 ].clientX < swipe ) {
          if ( ! state.noNextSlide ) {
            actions.nextImage();
          }
        } else {
          if ( ! state.noPrevSlide ) {
            actions.prevImage();
          }
        }
      },
    },
    callbacks: {
      initSlideShow: () => {
        const ctx = getContext();
        ctx.slides[ctx.currentSlide - 1].classList.add('active');
        if ( ctx.autoplay ) {
          const int = setInterval(
            withScope( () => {
              actions.nextImage();
            } ),
            state.transitionsSpeed
          );
          // The returned function executes when the element is removed from the DOM.
          return () => clearInterval( int );
        }
      },
      initSlide: () => {
        const ctx = getContext();
        // This is called by the core/cover blocks inside this block.
        // Adds the element reference to the `slides` array.
        const { ref } = getElement();
        ctx.slides.push( ref );
        // The returned function executes when the element is removed from
        // the DOM.
        return () => {
          ctx.slides = ctx.slides.filter( ( s ) => s !== ref );
        };
      },
      watchPagination: () => {
        const ctx = getContext();
        const { ref } = getElement();

        if (ctx.item == ctx.currentSlide) {
          ref.classList.add('active');
        } else {
          ref.classList.remove('active');
        }
      }
    },
  } );
});
/* eslint-enable no-console */
