

(function (document, window, index) {


  "use strict";

  var responsiveNav = function (el, options) {

    var computed = !!window.getComputedStyle;

    /**
    * getComputedStyle polyfill for old browsers
    */
    if (!computed) {
      window.getComputedStyle = function(el) {
        this.el = el;
        this.getPropertyValue = function(prop) {
          var re = /(\-([a-z]){1})/g;
          if (prop === "float") {
            prop = "styleFloat";
          }
          if (re.test(prop)) {
            prop = prop.replace(re, function () {
              return arguments[2].toUpperCase();
            });
          }
          return el.currentStyle[prop] ? el.currentStyle[prop] : null;
        };
        return this;
      };
    }


    var addEvent = function (el, evt, fn, bubble) {
      if ("addEventListener" in el) {
   
        try {
          el.addEventListener(evt, fn, bubble);
        } catch (e) {
          if (typeof fn === "object" && fn.handleEvent) {
            el.addEventListener(evt, function (e) {
          
              fn.handleEvent.call(fn, e);
            }, bubble);
          } else {
            throw e;
          }
        }
      } else if ("attachEvent" in el) {
       
        if (typeof fn === "object" && fn.handleEvent) {
          el.attachEvent("on" + evt, function () {
        
            fn.handleEvent.call(fn);
          });
        } else {
          el.attachEvent("on" + evt, fn);
        }
      }
    },

  
    removeEvent = function (el, evt, fn, bubble) {
      if ("removeEventListener" in el) {
        try {
          el.removeEventListener(evt, fn, bubble);
        } catch (e) {
          if (typeof fn === "object" && fn.handleEvent) {
            el.removeEventListener(evt, function (e) {
              fn.handleEvent.call(fn, e);
            }, bubble);
          } else {
            throw e;
          }
        }
      } else if ("detachEvent" in el) {
        if (typeof fn === "object" && fn.handleEvent) {
          el.detachEvent("on" + evt, function () {
            fn.handleEvent.call(fn);
          });
        } else {
          el.detachEvent("on" + evt, fn);
        }
      }
    },

  
    getChildren = function (e) {
      if (e.children.length < 1) {
        throw new Error("The Nav container has no containing elements");
      }
     
      var children = [];
      
      for (var i = 0; i < e.children.length; i++) {
        if (e.children[i].nodeType === 1) {
          children.push(e.children[i]);
        }
      }
      return children;
    },

    setAttributes = function (el, attrs) {
      for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
      }
    },

 
    addClass = function (el, cls) {
      if (el.className.indexOf(cls) !== 0) {
        el.className += " " + cls;
        el.className = el.className.replace(/(^\s*)|(\s*$)/g,"");
      }
    },

   
    removeClass = function (el, cls) {
      var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
      el.className = el.className.replace(reg, " ").replace(/(^\s*)|(\s*$)/g,"");
    },

    forEach = function (array, callback, scope) {
      for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]);
      }
    };

    var nav,
    opts,
    navToggle,
    styleElement = document.createElement("style"),
    htmlEl = document.documentElement,
    hasAnimFinished,
    isMobile,
    navOpen;

    var ResponsiveNav = function (el, options) {
      var i;

   
      this.options = {
        animate: true,
        transition: 284,           
        label: "Menu",                    
        insert: "before",               
        customToggle: "",                
        closeOnNavClick: false,          
        openPos: "relative",            
        navClass: "nav-spadek",         
        navActiveClass: "js-nav-active",  
        jsClass: "js",                   
        init: function(){},               
        open: function(){},               
        close: function(){}               
      };

     
      for (i in options) {
        this.options[i] = options[i];
      }

     
      addClass(htmlEl, this.options.jsClass);

      
      this.wrapperEl = el.replace("#", "");

      if (document.getElementById(this.wrapperEl)) {
        this.wrapper = document.getElementById(this.wrapperEl);

      
      } else if (document.querySelector(this.wrapperEl)) {
        this.wrapper = document.querySelector(this.wrapperEl);

    
      } else {
        throw new Error("The nav element you are trying to select doesn't exist");
      }

    
      this.wrapper.inner = getChildren(this.wrapper);

     
      opts = this.options;
      nav = this.wrapper;

   
      this._init(this);
    };

    ResponsiveNav.prototype = {

   
      destroy: function () {
        this._removeStyles();
        removeClass(nav, "closed");
        removeClass(nav, "opened");
        removeClass(nav, opts.navClass);
        removeClass(nav, opts.navClass + "-" + this.index);
        removeClass(htmlEl, opts.navActiveClass);
        nav.removeAttribute("style");
        nav.removeAttribute("aria-hidden");

        removeEvent(window, "resize", this, false);
        removeEvent(window, "focus", this, false);
        removeEvent(document.body, "touchmove", this, false);
        removeEvent(navToggle, "touchstart", this, false);
        removeEvent(navToggle, "touchend", this, false);
        removeEvent(navToggle, "mouseup", this, false);
        removeEvent(navToggle, "keyup", this, false);
        removeEvent(navToggle, "click", this, false);

        if (!opts.customToggle) {
          navToggle.parentNode.removeChild(navToggle);
        } else {
          navToggle.removeAttribute("aria-hidden");
        }
      },

      toggle: function () {
        if (hasAnimFinished === true) {
          if (!navOpen) {
            this.open();
          } else {
            this.close();
          }

         
          this._enablePointerEvents();
        }
      },

   
      open: function () {
        if (!navOpen) {
          removeClass(nav, "closed");
          addClass(nav, "opened");
          addClass(htmlEl, opts.navActiveClass);
          addClass(navToggle, "active");
          nav.style.position = opts.openPos;
          setAttributes(nav, {"aria-hidden": "false"});
          navOpen = true;
          opts.open();
        }
      },

     
      close: function () {
        if (navOpen) {
          addClass(nav, "closed");
          removeClass(nav, "opened");
          removeClass(htmlEl, opts.navActiveClass);
          removeClass(navToggle, "active");
          setAttributes(nav, {"aria-hidden": "true"});

         
          if (opts.animate) {
            hasAnimFinished = false;
            setTimeout(function () {
              nav.style.position = "absolute";
              hasAnimFinished = true;
            }, opts.transition + 10);

           
          } else {
            nav.style.position = "absolute";
          }

          navOpen = false;
          opts.close();
        }
      },

     
      resize: function () {

     
        if (window.getComputedStyle(navToggle, null).getPropertyValue("display") !== "none") {

          isMobile = true;
          setAttributes(navToggle, {"aria-hidden": "false"});

         
          if (nav.className.match(/(^|\s)closed(\s|$)/)) {
            setAttributes(nav, {"aria-hidden": "true"});
            nav.style.position = "absolute";
          }

          this._createStyles();
          this._calcHeight();
        } else {

          isMobile = false;
          setAttributes(navToggle, {"aria-hidden": "true"});
          setAttributes(nav, {"aria-hidden": "false"});
          nav.style.position = opts.openPos;
          this._removeStyles();
        }
      },

   
      handleEvent: function (e) {
        var evt = e || window.event;

        switch (evt.type) {
          case "touchstart":
            this._onTouchStart(evt);
            break;
            case "touchmove":
              this._onTouchMove(evt);
              break;
              case "touchend":
                case "mouseup":
                  this._onTouchEnd(evt);
                  break;
                  case "click":
                    this._preventDefault(evt);
                    break;
                    case "keyup":
                      this._onKeyUp(evt);
                      break;
                      case "focus":
                        case "resize":
                          this.resize(evt);
                          break;
                        }
                      },

                      _init: function () {
                        this.index = index++;

                        addClass(nav, opts.navClass);
                        addClass(nav, opts.navClass + "-" + this.index);
                        addClass(nav, "closed");
                        hasAnimFinished = true;
                        navOpen = false;

                        this._closeOnNavClick();
                        this._createToggle();
                        this._transitions();
                        this.resize();

                    
                        var self = this;
                        setTimeout(function () {
                          self.resize();
                        }, 20);

                        addEvent(window, "resize", this, false);
                        addEvent(window, "focus", this, false);
                        addEvent(document.body, "touchmove", this, false);
                        addEvent(navToggle, "touchstart", this, false);
                        addEvent(navToggle, "touchend", this, false);
                        addEvent(navToggle, "mouseup", this, false);
                        addEvent(navToggle, "keyup", this, false);
                        addEvent(navToggle, "click", this, false);

                       
                        opts.init();
                      },

                      _createStyles: function () {
                        if (!styleElement.parentNode) {
                          styleElement.type = "text/css";
                          document.getElementsByTagName("head")[0].appendChild(styleElement);
                        }
                      },

                    
                      _removeStyles: function () {
                        if (styleElement.parentNode) {
                          styleElement.parentNode.removeChild(styleElement);
                        }
                      },

                    
                      _createToggle: function () {

                     
                        if (!opts.customToggle) {
                          var toggle = document.createElement("a");
                          toggle.innerHTML = opts.label;
                          setAttributes(toggle, {
                            "href": "#",
                            "class": "nav-toggle"
                          });

                          
                          if (opts.insert === "after") {
                            nav.parentNode.insertBefore(toggle, nav.nextSibling);
                          } else {
                            nav.parentNode.insertBefore(toggle, nav);
                          }

                          navToggle = toggle;

                          
                        } else {
                          var toggleEl = opts.customToggle.replace("#", "");

                          if (document.getElementById(toggleEl)) {
                            navToggle = document.getElementById(toggleEl);
                          } else if (document.querySelector(toggleEl)) {
                            navToggle = document.querySelector(toggleEl);
                          } else {
                            throw new Error("The custom nav toggle you are trying to select doesn't exist");
                          }
                        }
                      },

                      _closeOnNavClick: function () {
                        if (opts.closeOnNavClick) {
                          var links = nav.getElementsByTagName("a"),
                          self = this;
                          forEach(links, function (i, el) {
                            addEvent(links[i], "click", function () {
                              if (isMobile) {
                                self.toggle();
                              }
                            }, false);
                          });
                        }
                      },

                     
                      _preventDefault: function(e) {
                        if (e.preventDefault) {
                          if (e.stopImmediatePropagation) {
                            e.stopImmediatePropagation();
                          }
                          e.preventDefault();
                          e.stopPropagation();
                          return false;

                        
                        } else {
                          e.returnValue = false;
                        }
                      },

                      
                      _onTouchStart: function (e) {
                        this._preventDefault(e);
                        addClass(document.body, "disable-pointer-events");
                        this.startX = e.touches[0].clientX;
                        this.startY = e.touches[0].clientY;
                        this.touchHasMoved = false;

                        
                        removeEvent(navToggle, "mouseup", this, false);
                      },

                     
                      _onTouchMove: function (e) {
                        if (Math.abs(e.touches[0].clientX - this.startX) > 10 ||
                          Math.abs(e.touches[0].clientY - this.startY) > 10) {
                            this._enablePointerEvents();
                            this.touchHasMoved = true;
                          }
                        },

                     
                        _onTouchEnd: function (e) {
                          this._preventDefault(e);
                          if (!isMobile) {
                            return;
                          }

                         
                          if (!this.touchHasMoved) {

                           
                            if (e.type === "touchend") {
                              this.toggle();
                              if (opts.insert === "after") {
                                setTimeout(function () {
                                  removeClass(document.body, "disable-pointer-events");
                                }, opts.transition + 300);
                              }
                              return;

                              
                            } else {
                              var evt = e || window.event;

                              
                              if (!(evt.which === 3 || evt.button === 2)) {
                                this.toggle();
                              }
                            }
                          }
                        },

                    
                        _onKeyUp: function (e) {
                          var evt = e || window.event;
                          if (evt.keyCode === 13) {
                            this.toggle();
                          }
                        },

                     
                        _enablePointerEvents: function () {
                          removeClass(document.body, "disable-pointer-events");
                        },

                      
                        _transitions: function () {
                          if (opts.animate) {
                            var objStyle = nav.style,
                            transition = "max-height " + opts.transition + "ms";

                            objStyle.WebkitTransition = transition;
                            objStyle.MozTransition = transition;
                            objStyle.OTransition = transition;
                            objStyle.transition = transition;
                          }
                        },

                       
                        _calcHeight: function () {
                          var savedHeight = 0;
                          for (var i = 0; i < nav.inner.length; i++) {
                            savedHeight += nav.inner[i].offsetHeight;
                          }

                         
                          var innerStyles = "." + opts.jsClass + " ." + opts.navClass + "-" + this.index + ".opened{max-height:" + savedHeight + "px !important} ." + opts.jsClass + " .disable-pointer-events{pointer-events:none !important} ." + opts.jsClass + " ." + opts.navClass + "-" + this.index + ".opened.dropdown-active {max-height:9999px !important}";


                          if (styleElement.styleSheet) {
                            styleElement.styleSheet.cssText = innerStyles;
                          } else {
                            styleElement.innerHTML = innerStyles;
                          }

                          innerStyles = "";
                        }

                      };

                     
                      return new ResponsiveNav(el, options);

                    };

                    window.responsiveNav = responsiveNav;

                  }(document, window, 0));

function FastClick(layer) {
  'use strict';
  var oldOnClick;


 
  this.trackingClick = false;


 
  this.trackingClickStart = 0;


 
  this.targetElement = null;


  
  this.touchStartX = 0;


 
  this.touchStartY = 0;


  
  this.lastTouchIdentifier = 0;


  
  this.touchBoundary = 10;


  
  this.layer = layer;

  if (FastClick.notNeeded(layer)) {
    return;
  }

  
  function bind(method, context) {
    return function() { return method.apply(context, arguments); };
  }

 
  if (deviceIsAndroid) {
    layer.addEventListener('mouseover', bind(this.onMouse, this), true);
    layer.addEventListener('mousedown', bind(this.onMouse, this), true);
    layer.addEventListener('mouseup', bind(this.onMouse, this), true);
  }

  layer.addEventListener('click', bind(this.onClick, this), true);
  layer.addEventListener('touchstart', bind(this.onTouchStart, this), false);
  layer.addEventListener('touchmove', bind(this.onTouchMove, this), false);
  layer.addEventListener('touchend', bind(this.onTouchEnd, this), false);
  layer.addEventListener('touchcancel', bind(this.onTouchCancel, this), false);


  if (!Event.prototype.stopImmediatePropagation) {
    layer.removeEventListener = function(type, callback, capture) {
      var rmv = Node.prototype.removeEventListener;
      if (type === 'click') {
        rmv.call(layer, type, callback.hijacked || callback, capture);
      } else {
        rmv.call(layer, type, callback, capture);
      }
    };

    layer.addEventListener = function(type, callback, capture) {
      var adv = Node.prototype.addEventListener;
      if (type === 'click') {
        adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
          if (!event.propagationStopped) {
            callback(event);
          }
        }), capture);
      } else {
        adv.call(layer, type, callback, capture);
      }
    };
  }

 
  if (typeof layer.onclick === 'function') {

    
    oldOnClick = layer.onclick;
    layer.addEventListener('click', function(event) {
      oldOnClick(event);
    }, false);
    layer.onclick = null;
  }
}



var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0;



var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);



var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);



var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS ([6-9]|\d{2})_\d/).test(navigator.userAgent);



FastClick.prototype.needsClick = function(target) {
  'use strict';
  switch (target.nodeName.toLowerCase()) {

  
  case 'button':
  case 'select':
  case 'textarea':
    if (target.disabled) {
      return true;
    }

    break;
  case 'input':

    
    if ((deviceIsIOS && target.type === 'file') || target.disabled) {
      return true;
    }

    break;
  case 'label':
  case 'video':
    return true;
  }

  return (/\bneedsclick\b/).test(target.className);
};



FastClick.prototype.needsFocus = function(target) {
  'use strict';
  switch (target.nodeName.toLowerCase()) {
  case 'textarea':
    return true;
  case 'select':
    return !deviceIsAndroid;
  case 'input':
    switch (target.type) {
    case 'button':
    case 'checkbox':
    case 'file':
    case 'image':
    case 'radio':
    case 'submit':
      return false;
    }

 
    return !target.disabled && !target.readOnly;
  default:
    return (/\bneedsfocus\b/).test(target.className);
  }
};



FastClick.prototype.sendClick = function(targetElement, event) {
  'use strict';
  var clickEvent, touch;


  if (document.activeElement && document.activeElement !== targetElement) {
    document.activeElement.blur();
  }

  touch = event.changedTouches[0];


  clickEvent = document.createEvent('MouseEvents');
  clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
  clickEvent.forwardedTouchEvent = true;
  targetElement.dispatchEvent(clickEvent);
};

FastClick.prototype.determineEventType = function(targetElement) {
  'use strict';


  if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
    return 'mousedown';
  }

  return 'click';
};



FastClick.prototype.focus = function(targetElement) {
  'use strict';
  var length;

 
  if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time') {
    length = targetElement.value.length;
    targetElement.setSelectionRange(length, length);
  } else {
    targetElement.focus();
  }
};



FastClick.prototype.updateScrollParent = function(targetElement) {
  'use strict';
  var scrollParent, parentElement;

  scrollParent = targetElement.fastClickScrollParent;

  if (!scrollParent || !scrollParent.contains(targetElement)) {
    parentElement = targetElement;
    do {
      if (parentElement.scrollHeight > parentElement.offsetHeight) {
        scrollParent = parentElement;
        targetElement.fastClickScrollParent = parentElement;
        break;
      }

      parentElement = parentElement.parentElement;
    } while (parentElement);
  }

 
  if (scrollParent) {
    scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
  }
};



FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {
  'use strict';

 
  if (eventTarget.nodeType === Node.TEXT_NODE) {
    return eventTarget.parentNode;
  }

  return eventTarget;
};



FastClick.prototype.onTouchStart = function(event) {
  'use strict';
  var targetElement, touch, selection;

  
  if (event.targetTouches.length > 1) {
    return true;
  }

  targetElement = this.getTargetElementFromEventTarget(event.target);
  touch = event.targetTouches[0];

  if (deviceIsIOS) {

    
    selection = window.getSelection();
    if (selection.rangeCount && !selection.isCollapsed) {
      return true;
    }

    if (!deviceIsIOS4) {

    
      if (touch.identifier === this.lastTouchIdentifier) {
        event.preventDefault();
        return false;
      }

      this.lastTouchIdentifier = touch.identifier;

     
      this.updateScrollParent(targetElement);
    }
  }

  this.trackingClick = true;
  this.trackingClickStart = event.timeStamp;
  this.targetElement = targetElement;

  this.touchStartX = touch.pageX;
  this.touchStartY = touch.pageY;

  
  if ((event.timeStamp - this.lastClickTime) < 200) {
    event.preventDefault();
  }

  return true;
};



FastClick.prototype.touchHasMoved = function(event) {
  'use strict';
  var touch = event.changedTouches[0], boundary = this.touchBoundary;

  if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
    return true;
  }

  return false;
};



FastClick.prototype.onTouchMove = function(event) {
  'use strict';
  if (!this.trackingClick) {
    return true;
  }


  if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
    this.trackingClick = false;
    this.targetElement = null;
  }

  return true;
};



FastClick.prototype.findControl = function(labelElement) {
  'use strict';


  if (labelElement.control !== undefined) {
    return labelElement.control;
  }

 
  if (labelElement.htmlFor) {
    return document.getElementById(labelElement.htmlFor);
  }

 
  return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
};



FastClick.prototype.onTouchEnd = function(event) {
  'use strict';
  var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

  if (!this.trackingClick) {
    return true;
  }

  
  if ((event.timeStamp - this.lastClickTime) < 200) {
    this.cancelNextClick = true;
    return true;
  }

 
  this.cancelNextClick = false;

  this.lastClickTime = event.timeStamp;

  trackingClickStart = this.trackingClickStart;
  this.trackingClick = false;
  this.trackingClickStart = 0;

 
  if (deviceIsIOSWithBadTarget) {
    touch = event.changedTouches[0];

  
    targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
    targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
  }

  targetTagName = targetElement.tagName.toLowerCase();
  if (targetTagName === 'label') {
    forElement = this.findControl(targetElement);
    if (forElement) {
      this.focus(targetElement);
      if (deviceIsAndroid) {
        return false;
      }

      targetElement = forElement;
    }
  } else if (this.needsFocus(targetElement)) {

  
    if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
      this.targetElement = null;
      return false;
    }

    this.focus(targetElement);
    this.sendClick(targetElement, event);

  
    if (!deviceIsIOS4 || targetTagName !== 'select') {
      this.targetElement = null;
      event.preventDefault();
    }

    return false;
  }

  if (deviceIsIOS && !deviceIsIOS4) {

    scrollParent = targetElement.fastClickScrollParent;
    if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
      return true;
    }
  }

 
  if (!this.needsClick(targetElement)) {
    event.preventDefault();
    this.sendClick(targetElement, event);
  }

  return false;
};



FastClick.prototype.onTouchCancel = function() {
  'use strict';
  this.trackingClick = false;
  this.targetElement = null;
};



FastClick.prototype.onMouse = function(event) {
  'use strict';


  if (!this.targetElement) {
    return true;
  }

  if (event.forwardedTouchEvent) {
    return true;
  }


  if (!event.cancelable) {
    return true;
  }


  if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

 
    if (event.stopImmediatePropagation) {
      event.stopImmediatePropagation();
    } else {

  
      event.propagationStopped = true;
    }

 
    event.stopPropagation();
    event.preventDefault();

    return false;
  }

 
  return true;
};



FastClick.prototype.onClick = function(event) {
  'use strict';
  var permitted;

  if (this.trackingClick) {
    this.targetElement = null;
    this.trackingClick = false;
    return true;
  }

  
  if (event.target.type === 'submit' && event.detail === 0) {
    return true;
  }

  permitted = this.onMouse(event);

  
  if (!permitted) {
    this.targetElement = null;
  }

 
  return permitted;
};



FastClick.prototype.destroy = function() {
  'use strict';
  var layer = this.layer;

  if (deviceIsAndroid) {
    layer.removeEventListener('mouseover', this.onMouse, true);
    layer.removeEventListener('mousedown', this.onMouse, true);
    layer.removeEventListener('mouseup', this.onMouse, true);
  }

  layer.removeEventListener('click', this.onClick, true);
  layer.removeEventListener('touchstart', this.onTouchStart, false);
  layer.removeEventListener('touchmove', this.onTouchMove, false);
  layer.removeEventListener('touchend', this.onTouchEnd, false);
  layer.removeEventListener('touchcancel', this.onTouchCancel, false);
};



FastClick.notNeeded = function(layer) {
  'use strict';
  var metaViewport;
  var chromeVersion;

 
  if (typeof window.ontouchstart === 'undefined') {
    return true;
  }

 
  chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

  if (chromeVersion) {

    if (deviceIsAndroid) {
      metaViewport = document.querySelector('meta[name=viewport]');

      if (metaViewport) {
       
        if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
          return true;
        }
        
        if (chromeVersion > 31 && window.innerWidth <= window.screen.width) {
          return true;
        }
      }

   
    } else {
      return true;
    }
  }

 
  if (layer.style.msTouchAction === 'none') {
    return true;
  }

  return false;
};



FastClick.attach = function(layer) {
  'use strict';
  return new FastClick(layer);
};


if (typeof define !== 'undefined' && define.amd) {

  
  define(function() {
    'use strict';
    return FastClick;
  });
} else if (typeof module !== 'undefined' && module.exports) {
  module.exports = FastClick.attach;
  module.exports.FastClick = FastClick;
} else {
  window.FastClick = FastClick;
}
;


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


(function () {

  "use strict";


  if ("querySelector" in document && "addEventListener" in window) {


    var forEach = function (array, callback, scope) {
      for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]);
      }
    };


    FastClick.attach(document.body);


    smoothScroll.init();


    var navigation = responsiveNav(".nav-spadek", {


      closeOnNavClick: true
    });


    var mask = document.createElement("div");
    mask.className = "mask";


    document.body.appendChild(mask);


    if (navigator.userAgent.match(/Android/i) !== null) {
      document.documentElement.className += " android";
    }


    var nav = document.querySelector(".nav-spadek ul"),
      links = nav.querySelectorAll("a");


    var content;


    var setupLocations = function () {
      content = [];
      forEach(links, function (i, el) {
        var href = links[i].getAttribute("href").replace("#", "");
        content.push(document.getElementById(href).offsetTop + 200);
      });
    };


    setupLocations();


    window.addEventListener("resize", function () {
      setupLocations();
    }, false);


    var selectActiveMenuItem = function (i) {
      forEach(links, function (i, el) {
        links[i].parentNode.className = links[i].parentNode.className.replace(/[\s]{0,}active/, "");
      });
      links[i].parentNode.className += links[i].parentNode.className ? " active" : "active";
    };


    var wasNavigationTapped = false;
    window.addEventListener("scroll", function () {


      var top = window.pageYOffset,
        body = document.body,
        html = document.documentElement,
        viewport = window.innerHeight,
        bodyheight = Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight
        );


      if (!wasNavigationTapped) {
        forEach(content, function (i, loc) {
          if ((loc > top && (loc < top + 300 || (top + viewport) >= bodyheight))) {
            selectActiveMenuItem(i);
          }
        });
      }
    }, false);


    mask.addEventListener("click", function (e) {
      e.preventDefault();
      navigation.close();
    }, false);


    var clearTapCheck = function () {
      setTimeout(function () {
        wasNavigationTapped = false;
      }, 500);
    };


    document.querySelector(".logovolt").addEventListener("click", function (e) {
      e.preventDefault();
      wasNavigationTapped = true;


      selectActiveMenuItem(0);


      navigation.close();


      if (history.pushState) {
        history.pushState("", document.title, window.location.pathname);
      }


      clearTapCheck();
    }, false);


    forEach(links, function (i, el) {
      links[i].addEventListener("click", function (e) {
        e.preventDefault();
        wasNavigationTapped = true;


        selectActiveMenuItem(i);


        var thisID = this.getAttribute("href").replace("#", ""),
          pane = document.getElementById(thisID);


        if (thisID !== "home") {
          pane.removeAttribute("id");
          location.hash = "#" + thisID;
          pane.setAttribute("id", thisID);

        } else {
          if (history.pushState) {
            history.pushState("", document.title, window.location.pathname);
          }
        }


        clearTapCheck();
      }, false);
    });

  }

})();




