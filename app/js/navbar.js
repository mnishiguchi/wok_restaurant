( function() {

  // Store elements.
  var hamburger;
  var logo;
  var nav;

  // Wait until DOM is loaded and then execute.
  document.addEventListener( "DOMContentLoaded", function( event ) {

    // Find elements.
    hamburger = document.querySelector( "#hamburger" );
    nav       = document.querySelector( "#navbar nav" );
    logo      = document.querySelector( "#logo" );

    // Apply the slide up animation defined in CSS to the navigation when:
    // - the hamburger is clicked.
    hamburger.addEventListener( 'click', toggleNavbarAnimations );

    // Remove the animation when:
    // - the mouse leaves the naviagation
    // - the navigation is clicked
    // - the logo is clicked
    // - the window size is resized
    nav.addEventListener( 'mouseleave', removeNavbarAnimations );
    nav.addEventListener( 'click',      removeNavbarAnimations );
    logo.addEventListener( 'click',    function() { nav.click(); });
    window.addEventListener( 'resize', function() { nav.click(); });
  });
  function toggleNavbarAnimations() {
    nav.classList.toggle( "cssSlideUp" );
    hamburger.classList.toggle( "active" );
  }
  function removeNavbarAnimations() {
    nav.classList.remove( "cssSlideUp" );
    hamburger.classList.remove( "active" );
  }
})();
