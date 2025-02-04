// Register new user api integration
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent the default form submission

        const fullName = document.getElementById('fullName').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const gender = document.getElementById('gender').value;

        // Form data validation can be done here if necessary
        const signupData = {
            fullName: fullName,
            phone: phone,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            gender: gender
        };

        try {
            const response = await fetch('http://localhost:3000/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupData)
            });

            const result = await response.json();

            if (response.ok) {
                alert('User registered successfully!');
                window.location.href = '/login.html'; // Redirect to login page on success
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error during signup:', error);
            alert('An error occurred while registering. Please try again later.');
        }
    });
}

// Log in api integration
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent the default form submission
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        // Form data validation can be done here if necessary
        const loginData = {
            email: email,
            password: password,
        };

        try {
            const response = await fetch('http://localhost:3000/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            const result = await response.json();

            if (response.ok) {

                // Store the token in localStorage
                localStorage.setItem('token', result.token);
                console.log(result.token);
                if (result.user.role == 'admin') {
                    alert('Admin Logged in successfully!');
                    window.location.href = '/dashboard.html';
                } else {
                    alert('User Logged in successfully!');
                    window.location.href = '/index.html'; // Redirect to index page on success

                }
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred while logging in. Please try again later.');
        }
    });
}

// Log out API integration
const logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
    logoutButton.addEventListener('click', async function () {
        // try {
        //     const response = await fetch('http://localhost:3000/api/user/logout', {
        //         method: 'POST'
        //     });

        //     const result = await response.json();

        //     if (response.ok) {
        //         // Clear the token from localStorage
        //         localStorage.removeItem('token');
        //         alert(result.message); // "Logged out successfully"
        //         window.location.href = '/index.html'; // Redirect to index page after logout
        //     } else {
        //         alert(`Error: ${result.message}`);
        //     }
        // } catch (error) {
        //     console.error('Error during logout:', error);
        //     alert('An error occurred while logging out. Please try again later.');
        // }

        try {
            const response = await fetch('/api/user/logout', {
                method: 'POST', // or GET if you prefer; just make sure it matches your route.
                credentials: 'include'
            });
            if (response.ok) {
                // After logout, update the nav display or redirect to login page.
                window.location.href = '/login.html';
            } else {
                console.error('Logout failed.');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    });
}

