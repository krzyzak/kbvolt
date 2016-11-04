

window.smoothScroll = (function (window, document, undefined) {

  'use strict';


  var _defaults = {
    speed: 500,
    easing: 'easeInOutCubic',
    updateURL: false,
    callbackBefore: function () {},
    callbackAfter: function () {}
  };


  var _mergeObjects = function ( original, updates ) {
    for (var key in updates) {
      original[key] = updates[key];
    }
    return original;
  };


  var _easingPattern = function ( type, time ) {
    if ( type == 'easeInQuad' ) return time * time; 
    if ( type == 'easeOutQuad' ) return time * (2 - time); 
    if ( type == 'easeInOutQuad' ) return time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time;
    if ( type == 'easeInCubic' ) return time * time * time; 
    if ( type == 'easeOutCubic' ) return (--time) * time * time + 1; 
    if ( type == 'easeInOutCubic' ) return time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1; 
    if ( type == 'easeInQuart' ) return time * time * time * time; 
    if ( type == 'easeOutQuart' ) return 1 - (--time) * time * time * time; 
    if ( type == 'easeInOutQuart' ) return time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time;
    if ( type == 'easeInQuint' ) return time * time * time * time * time; 
    if ( type == 'easeOutQuint' ) return 1 + (--time) * time * time * time * time;
    if ( type == 'easeInOutQuint' ) return time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * (--time) * time * time * time * time; 
    return time; 
  };

  var _getEndLocation = function ( anchor, headerHeight ) {
    var location = 0;
    if (anchor.offsetParent) {
      do {
        location += anchor.offsetTop;
        anchor = anchor.offsetParent;
      } while (anchor);
    }
    location = location - headerHeight;
    if ( location >= 0 ) {
      return location;
    } else {
      return 0;
    }
  };


  var _getDataOptions = function ( options ) {

    if ( options === null || options === undefined  ) {
      return {};
    } else {
      var settings = {}; 
      options = options.split(';'); 

      options.forEach( function(option) {
        option = option.trim();
        if ( option !== '' ) {
          option = option.split(':');
          settings[option[0]] = option[1].trim();
        }
      });

      return settings;
    }

  };

  var _updateURL = function ( anchor, url ) {
    if ( (url === true || url === 'true') && history.pushState ) {
      history.pushState( {pos:anchor.id}, '', anchor );
    }
  };

  var animateScroll = function ( toggle, anchor, options, event ) {


    options = _mergeObjects( _defaults, options || {} ); 
    var overrides = _getDataOptions( toggle ? toggle.getAttribute('data-options') : null );
    var speed = overrides.speed || options.speed;
    var easing = overrides.easing || options.easing;
    var updateURL = overrides.updateURL || options.updateURL;


    var headerHeight = 55;
    var startLocation = window.pageYOffset; 
    var endLocation = _getEndLocation( document.querySelector(anchor), headerHeight ); 
    var animationInterval;
    var distance = endLocation - startLocation;
    var timeLapsed = 0;
    var percentage, position;


    if ( toggle && toggle.tagName === 'A' && event ) {
      event.preventDefault();
    }

    // Update URL
    _updateURL(anchor, updateURL);


    var _stopAnimateScroll = function (position, endLocation, animationInterval) {
      var currentLocation = window.pageYOffset;
      if ( position == endLocation || currentLocation == endLocation || ( (window.innerHeight + currentLocation) >= document.body.scrollHeight ) ) {
        clearInterval(animationInterval);
        options.callbackAfter( toggle, anchor ); 
      }
    };

    var _loopAnimateScroll = function () {
      timeLapsed += 16;
      percentage = ( timeLapsed / speed );
      percentage = ( percentage > 1 ) ? 1 : percentage;
      position = startLocation + ( distance * _easingPattern(easing, percentage) );
      window.scrollTo( 0, Math.floor(position) );
      _stopAnimateScroll(position, endLocation, animationInterval);
    };

    var _startAnimateScroll = function () {
      options.callbackBefore( toggle, anchor ); 
      animationInterval = setInterval(_loopAnimateScroll, 16);
    };

    if ( window.pageYOffset === 0 ) {
      window.scrollTo( 0, 0 );
    }


    _startAnimateScroll();

  };

  var init = function ( options ) {

    if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

      options = _mergeObjects( _defaults, options || {} ); 
      var toggles = document.querySelectorAll('[data-scroll]'); 


      Array.prototype.forEach.call(toggles, function (toggle, index) {
        toggle.addEventListener('click', animateScroll.bind( null, toggle, toggle.getAttribute('href'), options ), false);
      });

    }

  };

  return {
    init: init,
    animateScroll: animateScroll
  };

})(window, document);
