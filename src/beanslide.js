// ==UserScript==
// @name         Beanstalk Niceties
// @namespace    http://github.com/phatsk
// @version      0.1
// @description  Does some things to make beanstalk nicer...
// @author       You
// @match        https://*.beanstalkapp.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

	var href   = window.location.href;
	var bs_url = [ window.location.host, window.location.pathname.split('/')[1] ].join('/') + '/';
	var $      = $ || window.jQuery;
	var _noJq  = ! ( window.jQuery );

	/**
	 * Changeset pages.
	 */
	if ( href.match( 'changesets' ) ) {
		/**
		 * Find the branch names at the top of a changeset list and turn them into hyperlinks.
		 */
		var b = document.getElementsByClassName('i-branch');
		var a;
		var i;
		for( i = b.length; i--; ){
			a              = document.createElement('a');
			a.href         = 'https://' + bs_url + '/browse/git?ref=b-';
			a.href        += encodeURIComponent( b[i].innerText );
			a.innerText    = b[i].innerText;
			b[i].innerHTML = a.outerHTML;
		}

		/**
		 * @TODO This can be done easily enough in VanillaJS.
		 */
		if ( ! _noJq ) {
	        // Make commit headers copy-able links
			$('h2.cs-message').html('<a href="' + href + '"> ' + $('h2.cs-message').html() + '</a>' );
		}
	}

	/**
	 * Branch comparison pages.
	 */
	if ( href.match( /compare|code_reviews/ ) ) {
		if ( ! _noJq ) {
			/**
			* Beanslide.js
			*
			* - Allows rolling up files in Beanstalk's Change view
			* - Auto-hides patterns matched in `mask`
			* - Click a file's header row to hide/show
			*/

			/**
			 * Files that match patterns in this array will be slid up and hidden.
			 */
			var mask = [
				'^\\.*',         // Hide "hidden" files that start with ".".
				'README.*',      // Hide README files.
				'package.json',  // NPM.
				'gruntfile.js',  // Grunt.
				'bower.json',    // Bower.
				'\\.pot',        // WordPress .pot files.
				'.*css.map',     // CSS Map files.
				'.*\\.min\\..*', // Minified files.
				'\\.(m|p)o'      // MO/PO translation files.
			];

			// Make sure we can override.
			if ( ! window.Browse || ! window.Browse.init || ( 'function' !== typeof window.Browse.init ) ) {
				return;
			}

			// See if we need to override.
			if ( window.Browse._hasBSOverride ) {
				return;
			}

			window.Browse._hasBSOverride = true;
			// Override the change browser's init method.
			window.Browse._BSInit        = window.Browse.init;
			window.Browse.init = function() {
				window.Browse._BSInit();

				// Bind the beanslide method
				$( '.cv-container .ct .ct_path' ).off( 'click' ).on( 'click', beanslide);

				// Hide matches in mask
				$( '.cv-container .ct .ct_path' ).children( 'a.path_item.path_item--current' ).each( function( index, el ) {
					var h = $(el).attr( 'href' ).split( '/' ).pop().split( '?' )[0];
					if ( maskmatch(h) ) {
						$(el).parents( '.cv-container' ).children( '.cv' ).addClass( 'hidden' ).slideUp();
					}
				});

				/**
				 * Toggle file slide up/down when clicking on a file's header
				 */
				function beanslide() {
					/**
					 * @TODO Use of `this` here is a possible strict violation.
					 */
					var n = $(this).parents( '.cv-container' ).children( '.cv' );
					if ( n.hasClass( 'hidden' ) ) {
						n.slideDown();
					} else {
						n.slideUp();
					}

					n.toggleClass( 'hidden' );
				}

				/**
				 * See if a string matches the mask.
				 *
				 * @param String s The string to test
				 * @return Boolean
				 */
				function maskmatch( s ) {
					var regex = new RegExp( '', 'i' );
					var i;

					for ( i = mask.length; i--; ) {
						regex.compile( mask[ i ], 'i' );
						if ( s.match(regex) && s.match(regex)[0] !== '' ) {
							return true;
						}
					}

					return false;
				}
			};
		}
	}
})();
