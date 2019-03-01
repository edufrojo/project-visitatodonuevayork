function UpdateCopyYear() {
  var d = new Date();
  document.getElementById('copy-year').innerHTML = d.getFullYear();
}

$(document).ready(function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('service-worker.js')
      .then(function(reg) {
        console.log('Service Worker registered successfully');
      })
      .catch(function(err) {
        console.log('Service worker registration failed');
      });
  }

  window.addEventListener('load', function() {
    window.cookieconsent.initialise({
      palette: {
        popup: {
          background: '#237afc'
        },
        button: {
          background: '#fff',
          text: '#237afc'
        }
      },
      theme: 'edgeless',
      content: {
        message: 'Esta web usa cookies para mejorar la experiencia del usuario.',
        dismiss: 'Entendido',
        link: 'Más información'
      }
    });
  });

  $('body').scrollspy({ target: '#header' });
  $('#icon-down').addClass('animated infinite bounce');

  // Select all links with hashes
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate(
            {
              scrollTop: target.offset().top
            },
            1000,
            function() {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();
              if ($target.is(':focus')) {
                // Checking if the target was focused
                return false;
              } else {
                $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              }
            }
          );
        }
      }
    });

  $('[data-toggle="tooltip"]').tooltip();

  UpdateCopyYear();
});
