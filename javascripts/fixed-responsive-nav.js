

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
