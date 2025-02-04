document.addEventListener('DOMContentLoaded', function () {
  // 1. Token-based navigation logic

  async function handleTokenBasedNavigation() {

    try {
      // Make a call to the user status endpoint.
      const response = await fetch('/api/user/me', {
        method: 'GET',
        credentials: 'include', // Ensures cookies (JWT cookie) are sent along with the request.
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const navAuth = document.getElementById('nav-auth');
      const navProfile = document.getElementById('nav-profile');

      if (response.ok) {
        // User is logged in (token valid). You could use the returned user info if needed.
        const data = await response.json();
        console.log('User data:', data);

        // Show profile and logout buttons
        if (navAuth && navProfile) {
          navAuth.style.display = 'none';
          navProfile.style.display = 'block';
        }
      } else {
        // No valid token found, so display login/signup buttons.
        if (navAuth && navProfile) {
          navAuth.style.display = 'block';
          navProfile.style.display = 'none';
        }
      }
    } catch (error) {
      console.error('Error checking user status:', error);
      // On error, default to showing login/signup
      const navAuth = document.getElementById('nav-auth');
      const navProfile = document.getElementById('nav-profile');
      if (navAuth && navProfile) {
        navAuth.style.display = 'block';
        navProfile.style.display = 'none';
      }
    }

    //   const token = localStorage.getItem('token');
    //   console.log(`token: ${token}`); // Debugging line to ensure token is retrieved

    //   // Select the nav-auth and nav-profile sections
    //   const navAuth = document.getElementById('nav-auth');
    //   const navProfile = document.getElementById('nav-profile');

    //   // Check if both elements exist before trying to manipulate their display
    //   if (navAuth && navProfile) {
    //     if (token) {
    //       // If token exists, show profile/logout section and hide login/signup section
    //       navAuth.style.display = 'none';
    //       navProfile.style.display = 'block';
    //     } else {
    //       // If no token, show login/signup and hide profile/logout
    //       navAuth.style.display = 'block';
    //       navProfile.style.display = 'none';
    //     }
    //   } else {
    //     console.error('nav-auth or nav-profile elements are not found.');
    //   }
  }

  // 2. Carousel logic
  function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');

    if (!track || !prevButton || !nextButton) {
      console.error('Carousel elements not found.');
      return; // Exit if any of the carousel elements are missing
    }

    let currentIndex = 0;

    function updateCarousel() {
      const slideWidth = track.children[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

      prevButton.disabled = currentIndex === 0;
      nextButton.disabled = currentIndex === track.children.length - 1;
    }

    prevButton.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });

    nextButton.addEventListener('click', () => {
      if (currentIndex < track.children.length - 1) {
        currentIndex++;
        updateCarousel();
      }
    });

    updateCarousel(); // Initialize carousel
  }

  // Execute both functions after DOMContentLoaded event
  handleTokenBasedNavigation();
  initCarousel();
});







// document.addEventListener('DOMContentLoaded', function () {
//   async function checkUserStatus() {
//     try {
//       // Make a call to the user status endpoint.
//       const response = await fetch('/api/user/me', {
//         method: 'GET',
//         credentials: 'include', // Ensures cookies (JWT cookie) are sent along with the request.
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       const navAuth = document.getElementById('nav-auth');
//       const navProfile = document.getElementById('nav-profile');

//       if (response.ok) {
//         // User is logged in (token valid). You could use the returned user info if needed.
//         const data = await response.json();
//         console.log('User data:', data);

//         // Show profile and logout buttons
//         if (navAuth && navProfile) {
//           navAuth.style.display = 'none';
//           navProfile.style.display = 'block';
//         }
//       } else {
//         // No valid token found, so display login/signup buttons.
//         if (navAuth && navProfile) {
//           navAuth.style.display = 'block';
//           navProfile.style.display = 'none';
//         }
//       }
//     } catch (error) {
//       console.error('Error checking user status:', error);
//       // On error, default to showing login/signup
//       const navAuth = document.getElementById('nav-auth');
//       const navProfile = document.getElementById('nav-profile');
//       if (navAuth && navProfile) {
//         navAuth.style.display = 'block';
//         navProfile.style.display = 'none';
//       }
//     }
//   }

//   checkUserStatus();
// });
