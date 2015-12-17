/**
 * Beanslide.js
 *
 * - Allows rolling up files in Beanstalk's Change view
 * - Auto-hides patterns matched in `mask`
 * - Click a file's header row to hide/show
 */
(function($) {
	/**
	 * Files that match patterns in this array will be slid up and hidden.
	 */
	var mask = [
		'^\\.*',        // Hide "hidden" files that start with "."
		'README.*',     // Hide README files
		'package.json',
		'gruntfile.js',
		'bower.json',
		'\\.pot'        // WordPress .pot files
	];

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

		for ( i = mask.length; i--; ) {
			regex.compile( mask[ i ], 'i' );
			if ( s.match(regex) && s.match(regex)[0] !== '' ) {
				return true;
			}
		}

		return false;
	}
})(jQuery);
