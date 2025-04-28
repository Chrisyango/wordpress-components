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
document.addEventListener("DOMContentLoaded", function () {
    const blogPostTilesWrappers = Array.from(document.querySelectorAll('.blog-post-tiles__wrapper'));
    const profileTilesWrappers = Array.from(document.querySelectorAll('.profile-tiles__wrapper'));
    const url = `http://${window.location.hostname}`;

    /**
     * This is used to create a slider effect for the blog post tiles wrapper
     * Calculate width of blogPostTilesWrapper
     * (Window Width * Number of Children in Wrapper) - (blogPostTilesWrapper Left and Right Padding + blogPostTilesWrapper Gap)
    */
    function resizeWrapper(wrapper) {
        const windowWidth = window.innerWidth;
        if (windowWidth > 601) {
            wrapper.style.width = 'auto';
            return;
        }

        const children = wrapper.children.length;
        wrapper.style.width = (340 * children) - (16 * children) + 'px';
    }

    /**
	 * Shorten string based on characters
	 * @param {*} str
	 * @param {*} maxLen
	 * @param {*} separator
	 * @returns
	 */
	function shorten(str, maxLen = 60, separator = ' ') {
		if (str.length <= maxLen) return str;
		return str.substr(0, str.lastIndexOf(separator, maxLen)) + '...';
	}

    if (blogPostTilesWrappers.length != 0) {
        blogPostTilesWrappers.forEach(blogPostTilesWrapper => {
            /**
             * Get Theme Options: Default Assets
             * Create Default Post Images
             */
            fetch(`${url}/wp-json/wp/v2/acf/options/all`)
                .then(response => response.json())
                .then(data => {
                    const defaultPostImage = data.default_assets.default_featured_post_image;

                    Array.from(blogPostTilesWrapper.children).forEach(element => {
                        if (!element.classList.contains('has-post-thumbnail')) {
                            const figure = document.createElement('figure');
                            const link = element.querySelector('.blog-roll__title a').cloneNode(true);
                            const img = document.createElement('img');

                            img.classList.add('attachment-post-thumbnail')
                            img.classList.add('size-post-thumbnail');
                            img.classList.add('wp-post-image');
                            img.setAttribute('alt', defaultPostImage.title);
                            img.setAttribute('style', 'object-fit:cover');
                            img.setAttribute('srcset', defaultPostImage.sizes.large);

                            link.innerHTML = '';
                            link.prepend(img);

                            figure.prepend(link);
                            figure.classList.add('blog-roll__image')
                            figure.classList.add('wp-block-post-featured-image');
                            element.prepend(figure);
                        }
                    });
                })
                .catch(error => {
                    console.error("Error:", error);
                });

            const blogPosts = Array.from(blogPostTilesWrapper.querySelectorAll('li'));
            blogPosts.forEach(blogPost => {
                const blogPostTitle = blogPost.querySelector('.blog-roll__title a');
                blogPostTitle.innerHTML = shorten(blogPostTitle.innerHTML);
            });

            /**
             * Archive Pages don't use a scrolling blog post roll, so this disables it
             */
            if (!document.querySelector('.blog-roll--archive')) {
                resizeWrapper(blogPostTilesWrapper);
                window.addEventListener('resize', () => {
                    resizeWrapper(blogPostTilesWrapper);
                });
            }
        });
    }

    if (profileTilesWrappers.length != 0) {
        profileTilesWrappers.forEach(profileTilesWrapper => {
            /**
             * Get Theme Options: Default Assets
             * Create Default Post Images
             */
            fetch(`${url}/wp-json/wp/v2/acf/options/all`)
                .then(response => response.json())
                .then(data => {
                    const defaultPostImage = data.default_assets.default_featured_bio_image;

                    Array.from(profileTilesWrapper.children).forEach(element => {
                        if (!element.classList.contains('has-post-thumbnail')) {
                            const figure = document.createElement('figure');
                            const link = element.querySelector('.profile-tiles__title a').cloneNode(true);
                            const img = document.createElement('img');

                            img.classList.add('attachment-post-thumbnail')
                            img.classList.add('size-post-thumbnail');
                            img.classList.add('wp-post-image');
                            img.setAttribute('alt', defaultPostImage.title);
                            img.setAttribute('style', 'object-fit:cover');
                            img.setAttribute('srcset', defaultPostImage.sizes.large);

                            link.innerHTML = '';
                            link.prepend(img);

                            figure.prepend(link);
                            figure.classList.add('profile-tiles__image')
                            figure.classList.add('wp-block-post-featured-image');
                            element.prepend(figure);
                        }
                    });
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        });
    }
});
/* eslint-enable no-console */
