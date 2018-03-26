/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* Loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('has a url and content', function() {
      allFeeds.forEach(function(feed) {
        feedName = feed.name;
        expect(feedName).toBeDefined();
        expect(feedName).not.toBe('');
      });
    });

    /* Loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('has a name and content', function() {
      allFeeds.forEach(function(feed) {
        feedName = feed.name;
        expect(feedName).toBeDefined();
        expect(feedName).not.toBe('');
      });
    });
  });

  describe('The menu', function() {
    // Ensures menu element is hidden by default
    it('element is hidden by default', function() {
      var bodyObj = document.body.className;
      if (typeof(bodyObj) == 'undefined') {
        throw 'bodyObj undefined';
      }
      expect(bodyObj).toEqual('menu-hidden');
    });

    // Does the menu hide and show when clicked
    it('opens and closes when clicked', function() {
      var classExists = $('body');
      expect(classExists.hasClass('menu-hidden')).toEqual(true);
      $('.menu-icon-link').click();
      expect(classExists.hasClass('menu-hidden')).toEqual(false);
      $('.menu-icon-link').click();
    });
  });

  describe('Initial Entries', function() {
    /* When the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     */
    var checker = false;
    beforeEach(function(done) {
      if (typeof(checker) == 'undefined') {
        throw 'checker undefined';
      }
      loadFeed(0, function() {
        var feedElems = $('.feed').children().children();
        for (i = 0; i < feedElems.length; i++) {
          if (feedElems[i].className === 'entry') {
            checker = true;
            done();
            break;
          }
        }
      });
    });
    it('have at least one .entry element in .feed container', function() {
      expect(checker).toEqual(true);
    });
  });

  describe('New Feed Selection', function() {
    /* When a new feed is loaded
     * by the loadFeed function that the content actually changes.
     */
    var myFeed1, myFeed2, domFeed;
    beforeEach(function(done) {
      loadFeed(0, function() {
        domFeed = $('.feed > a');
        myFeed1 = domFeed[0].href;
        loadFeed(1, function() {
          domFeed = $('.feed > a');
          myFeed2 = domFeed[0].href;
          done();
        });
      });
    });

    it('content changes when new feed loaded', function() {
      expect(myFeed1).not.toEqual(myFeed2);
    });

  });
}());
