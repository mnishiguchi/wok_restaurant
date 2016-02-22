(function() {

  //=============================================//
  // Module declaration.
  //=============================================//


  angular
    .module( "app", [
      "ngRoute",
      "ngAnimate"
    ]);


  //=============================================//
  // Configuration.
  //=============================================//


  angular
    .module( "app" )
    .config( config )
    .run( run );

  config.$inject = [
    "$routeProvider"
  ];

  function config( $routeProvider ) {

    $routeProvider

      .when("/", {
          title:       "Home",
          templateUrl: "partials/home.html",
          controller:   HomeController,
          controllerAs: "vm",
      })
      .when("/restaurant", {
          title:       "Restaurant",
          templateUrl: "partials/restaurant.html"
      })
      .when("/karaoke", {
          title:       "Karaoke",
          templateUrl: "partials/karaoke.html",
          controller:   KaraokeController,
          controllerAs: "vm",
      })
      .when("/online-order", {
          title:       "Online Order",
          templateUrl: "partials/online-order.html",
          controller:   function() {},
          controllerAs: "vm",
      })
      .otherwise({
          redirectTo: "/"
      });

  } // end config


  run.$inject = [
    "$rootScope",  // To pass data to appNavbar.
    "$route"       // To access route data.
  ];

  function run( $rootScope, $route ) {

    var baseTitle = " | Wok";

    $rootScope.$on( "$routeChangeSuccess", function() {

      // Set page title.
      if ( $route.current.title ) {

        window.document.title = $route.current.title + baseTitle;

      }

    });

  } // end run


  //=============================================//
  // View controllers.
  //=============================================//


  angular
    .module( "app" )
    .controller( "HomeController", HomeController );

    HomeController.$inject = [];

    function HomeController() {

      this.categoryImages = categoryImages;

    } // end HomeController


  angular
    .module( "app" )
    .controller( "KaraokeController", KaraokeController );

    KaraokeController.$inject = [];

    function KaraokeController() {

      this.roomCharge = roomCharge;

    } // end KaraokeController


  //=============================================//
  // Layout commponents.
  //=============================================//


  /**
   * The app navbar.
   * - Switch page contents when the user clicks on a navigation link.
   */
  angular
    .module( "app" )
    .component( "appNavbar", {

      bindings: {},
      templateUrl: 'layout/app-navbar.html',
      controller:  AppNavbarController,

    });

  angular
    .module( "app" )
    .controller( "AppNavbarController", AppNavbarController );

    AppNavbarController.$inject = [
      "$route",
      "$location",
      "$window",
      "$scope"
    ];

    function AppNavbarController( $route, $location, $window, $scope ) {

      var breakpoint = 544;

      // Store the reference to the angular element of the navigation menu.
      var navElem;

      var animationClass = "cssSlideUp";

      var vm  = this;

      vm.pages = [];      // path:  The "#" paths, e.g., "#/about".
                          // title: The same as the page title.
      vm.activeTab;       // The name of the active tab.
      vm.isMobile;        // The current display type.
      vm.isVisibleMenu;   // The visibility of hamburger button.


      // Expose the public methods.
      vm.toggleMenu = toggleMenu;


      // Initialize the state of the navbar.
      handleResizing();


      // Keep watch on window resizing.
      angular.element( $window ).on('resize', function() {

        // Update the state of the navbar
        $scope.$apply( function() { handleResizing(); } );

      });


      // Regex to filter out paths with trailing slash.
      // Accept kabob-case paths.
      var pathRegex = /^\/\w*(-|\w*)+[^\/]$/;
      /*
        console.info( $route.routes );
        ---
        {
          /             : { controller: HomeController(), title: "Home", ... }
          /description  : { ... }
          /description/ : { ... }  // invalid path
          /resources    : { ... }
          /resources/   : { ... }  // invalid path
          /species      : { ... }
          /species/     : { ... }  // invalid path
          ...
        }
       */


      // Extract paths from routes info.
      angular.forEach( $route.routes, function( value, key ) {

        // If a valid path name is found, push its data to the lists.
        if ( key === "/" || key.match( pathRegex ) ) {

          vm.pages.push({
             path:  "#" + key,
             title: value.title
          });

          // If the current path is found, remember the title as a active tab.
          if ( key === $location.path() ) { vm.activeTab = value.title; }

        }

      }); // end angular.forEach


      // ---
      // PUBLIC METHODS
      // ---


      /**
       * Toggles the nav menu with animation effect.
       */
      function toggleMenu() {

        addAnimation();

        // Toggle the visibility.
        vm.isVisibleMenu = ! vm.isVisibleMenu;

      };


      // ---
      // PRIVATE METHODS
      // ---


      /**
       * Sets the state of the navbar according to the current screen width.
       */
      function handleResizing() {

        // Update the state.
        vm.isMobile      = ( $window.innerWidth < breakpoint ) ? true : false;
        vm.isVisibleMenu = ( vm.isMobile ) ? false : true;

        removeAnimation();

      } // end handleResizing


      /**
       * Sets up animation.
       */
      function addAnimation() {

        // If not done already, find the nav element and
        if ( ! navElem ) {

          navElem = angular.element( document.querySelector( '#app-navbar--nav' ) );

        }

        // Add the animation class.
        navElem.addClass( animationClass );

      } // end addAnimation


      /**
       * Removes animation.
       */
      function removeAnimation() {

        if ( navElem && navElem.hasClass( animationClass ) ) {

          navElem.removeClass( animationClass );

        }

      } // end removeAnimation

    } // end AppNavbarController


  /**
   * The app footer.
   */
  angular
    .module( "app" )
    .component( "appFooter", {

      templateUrl: "layout/app-footer.html"

    });


  //=============================================//
  // Data.
  //=============================================//


  var categoryImages  = [
    {
      name: "Restaurant",
      imgUrl: "img/img_1080_cover_sushi.jpg",
      linkUrl: "#/restaurant",
      desc: "Restaurant, Serving the best of Japanese and Chinese cuisine."
    },
    {
      name: "Karaoke",
      imgUrl: "img/img_1080_cover_karaoke.jpg",
      linkUrl: "#/karaoke",
      desc: "Karaoke, Features over 50,000 hit songs from all the time."
    },
    {
      name: "Online Order",
      imgUrl: "img/img_1080_cover_order.jpg",
      linkUrl: "http://washington.eat24hours.com/wok-and-roll-restaurant/7260?W=1",
      desc: "Online Order, Our delivery service is FREE when you order online."
    },
  ];

  var roomCharge = [
    {
      room: "Small",
      price: "$35.00/hr + 10% tax + 18% gratuity",
      capacity: 10,
    },
    {
      room: "Medium",
      price: "$45.00/hr + 10% tax + 18% gratuity",
      capacity: 14,
    },
    {
      room: "Large",
      price: "$55.00/hr + 10% tax + 18% gratuity",
      capacity: 25,
    },
    {
      room: "Bar",
      price: "Minimum $15.00 on drink or food",
      capacity: -1,
    },
  ];

})(); // end module

