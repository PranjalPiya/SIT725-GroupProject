


document.addEventListener('DOMContentLoaded', function () {
  // Get the token from localStorage
  const token = localStorage.getItem('token');
  console.log(`token: ${token}`)
  // Select the nav-auth and nav-profile sections
  const navAuth = document.getElementById('nav-auth');
  const navProfile = document.getElementById('nav-profile');

  if (token) {
    // If the token exists, hide the nav-auth (login/signup) and show the nav-profile (profile/logout)
    navAuth.style.display = 'none';
    navProfile.style.display = 'block';
  } else {
    // If no token is found, show the login/signup buttons and hide the profile section
    navAuth.style.display = 'block';
    navProfile.style.display = 'none';
  }
});