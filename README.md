beanslide.js
===

About
---

Beanslide is a simple bookmarklet for use with [Beanstalk](http://beanstalkapp.com/). On Code view pages (such as
"Changes" in Code Review), you can use beanslide to automatically hide files matching a mask, or toggle files by
clicking their headers.

Installation
---

Clone the repository and `npm install; grunt` to build the `build/beanslide.min.js` file. Copy this file's contents
into a Bookmark in your favorite browser (tested on Chrome, but should be fine elsewhere) and use it when you're on a
Beanstalk page.

Screenshots
---
![Example usage of beanslide](/../screenshots/screenshots/beanslide.gif?raw=true "Example usage of beanslide")

Current Release: v0.1.1
---

Changelog
---
**v0.1.1**
* Add CSS Map files to mask
* Add Minified files matching `\*.min.\*` to mask

**v0.1.0**
* Initial checkin
