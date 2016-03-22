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

      .when("/home", {
          title:       "Home",
          templateUrl: "partials/home.html",
          controller:   HomeController,
          controllerAs: "vm",
      })
      .when("/restaurant", {
          title:       "Restaurant",
          templateUrl: "partials/restaurant.html",
          controller:   RestaurantController,
          controllerAs: "vm",
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
          controller:   OnlineOrderController,
          controllerAs: "vm",
      })
      .otherwise({
          redirectTo: "/home"
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

      // Remove the active class from the previously active nav-items.
      angular
        .element( document.querySelector( '.nav-link.active' ) )
        .removeClass( "active" );

      // Set the active nav-item.
      // console.table( $route.current.originalPath );
      var currentActive = '.nav-link.' + $route.current.originalPath.substring( 1 );
      angular
        .element( document.querySelector( currentActive ) )
        .addClass( "active" );
    });

  } // end run


  //=============================================//
  // View controllers.
  //=============================================//

  angular
    .module( "app" )
    .controller( "AppController", AppController );

    AppController.$inject = [];

    function AppController() {
    } // end AppController

  angular
    .module( "app" )
    .controller( "HomeController", HomeController );

    HomeController.$inject = [];

    function HomeController() {

      this.categoryImages = categoryImages;

    } // end HomeController

  angular
    .module( "app" )
    .controller( "RestaurantController", RestaurantController );

    RestaurantController.$inject = [];

    function RestaurantController() {

      this.categoryImages = categoryImages;
      this.bgCss = {
        "background": "url(" + this.categoryImages[ 0 ].imgUrl + "  )",
        "background-size":     "cover",
        "background-position": "center",
      };

      this.menuItems = menuItems;
    } // end RestaurantController

  angular
    .module( "app" )
    .controller( "KaraokeController", KaraokeController );

    KaraokeController.$inject = [];

    function KaraokeController() {

      this.roomCharge = roomCharge;
      this.categoryImages = categoryImages;
      this.bgCss = {
        "background": "url(" + this.categoryImages[ 1 ].imgUrl + "  )",
        "background-size":     "cover",
        "background-position": "center",
      };

    } // end KaraokeController

  angular
    .module( "app" )
    .controller( "OnlineOrderController", OnlineOrderController );

    OnlineOrderController.$inject = [];

    function OnlineOrderController() {

      this.categoryImages = categoryImages;
      this.bgCss = {
        "background": "url(" + this.categoryImages[ 2 ].imgUrl + "  )",
        "background-size":     "cover",
        "background-position": "center",
      };

    } // end OnlineOrderController


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

  var menuItems = [
    {
      name: "J-1",
      imgUrl: "img/sushi_1.jpg",
      linkUrl: "",
      desc: ""
    },
    {
      name: "J-2",
      imgUrl: "img/sushi_2.jpg",
      linkUrl: "",
      desc: ""
    },
    {
      name: "J-3",
      imgUrl: "img/sushi_3.jpg",
      linkUrl: "",
      desc: ""
    },
    {
      name: "J-4",
      imgUrl: "img/sushi_4.jpg",
      linkUrl: "",
      desc: ""
    },
    {
      name: "J-5",
      imgUrl: "img/sushi_5.jpg",
      linkUrl: "",
      desc: ""
    },
    {
      name: "J-6",
      imgUrl: "img/sushi_6.jpg",
      linkUrl: "",
      desc: ""
    },
    {
      name: "C-1",
      imgUrl: "img/chinese_1.jpg",
      linkUrl: "",
      desc: ""
    },
    {
      name: "C-2",
      imgUrl: "img/chinese_2.jpg",
      linkUrl: "",
      desc: ""
    },
    {
      name: "C-3",
      imgUrl: "img/chinese_3.jpg",
      linkUrl: "",
      desc: ""
    }
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
