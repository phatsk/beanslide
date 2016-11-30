beanslide.js
===

About
---

Beanslide is a simple bookmarklet for use with [Beanstalk](http://beanstalkapp.com/). On Code view pages (such as
"Changes" in Code Review), you can use beanslide to automatically hide files matching a mask, or toggle files by
clicking their headers.

Beanslide now also provides some other cleanups and features, including:

* Convert commit messages to URLs that can be easily copied for prettier links.
* Converts branch names under "Exists in branches" to be URLs to browse that branch.

Installation
---
You can always just grab the JS from [the build file](/build/beanslide.min.js) and copy it into the URL field of a new
bookmark for the quickest install.

Clone the repository and `npm install; grunt` to build the `build/beanslide.min.js` file. Copy this file's contents
into a Bookmark in your favorite browser (tested on Chrome, but should be fine elsewhere) and use it when you're on a
Beanstalk page.

Customizing
---
By default, the plugin hides things _I_ don't want to see typically when reviewing changes. The default set of
files is defined in the `mask` array:

```javascript
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
```

You should modify this to your needs and then rebuild using `grunt` or simply minify in your preferred way and change
your bookmarklet href to `javascript:<contents of minified file>`.

Tampermonkey
---
The raw file in `src/beanslide.js` can be dropped into Tampermonkey and matches `https://*.beanstalkapp.com/*`.

Screenshots
---
![Example usage of beanslide](/../screenshots/screenshots/beanslide.gif?raw=true "Example usage of beanslide")

![Converted links in the changeset UI](/../screenshots/screenshots/beanslide-linkify.png "Converted links in the changeset UI")

Current Release: v0.2.0
---

Changelog
---
**v0.2.0**
* Convert script to a userscript format (for Tampermonkey)
* Original bookmarklet is dead, long live the userscript!
* Add link-ifying some helpful links like branches and commit messages.

**v0.1.1**
* Add CSS Map files to mask
* Add Minified files matching `\*.min.\*` to mask

**v0.1.0**
* Initial checkin
