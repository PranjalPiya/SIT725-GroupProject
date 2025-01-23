// document.addEventListener('DOMContentLoaded', () => {
//     const trekGrid = document.getElementById('trekGrid');

//     function createTrekCard(trek) {
//         return `
//             <div class="trek-card" data-id="${trek.id}" onclick="goToTrekDetails(${trek.id})">
//             <div class="trek-card" data-id="${trek.id}" onclick="goToTrekDetails(${trek.id})">
//                 <div class="trek-card-image">
//                     <img src="${trek.image}" alt="${trek.title}">
//                     <div class="difficulty-badge">${trek.difficulty}</div>
//                 </div>
//                 <div class="trek-card-content">
//                     <h3 class="text-xl font-bold mb-2">${trek.title}</h3>
//                     <div class="location">
//                         <img src="images/treeker-1.jpg" alt="Location">
//                         <span>${trek.location}</span>
//                     </div>
//                     <div class="trek-details">
//                         <div class="detail">
//                             <img src="https://cdn.jsdelivr.net/npm/lucide-static@0.344.0/icons/clock.svg" alt="Duration">
//                             <span>${trek.duration}</span>
//                         </div>
//                         <div class="detail">
//                             <img src="https://cdn.jsdelivr.net/npm/lucide-static@0.344.0/icons/users.svg" alt="Group">
//                             <span>Max 12 people</span>
//                         </div>
//                     </div>
//                     <div class="trek-action">
//                         <div class="price">
//                             <span class="amount">$${trek.price}</span>
//                             <span class="period">/person</span>
//                         </div>
//                         <button class="btn-primary">Book Now</button>
//                     </div>
//                 </div>
//             </div>
//             <script>
// function goToTrekDetails(trekId) {
//     window.location.href = /specific_trek.html?id=${trekId} ;
// }
// </script>
//         `;
//     }

//     trekGrid.innerHTML = popularTreks.map(trek => createTrekCard(trek)).join('');
// });



//  for specific trek destination details




// document.addEventListener('DOMContentLoaded', async function () {
//     // Extract trek ID from the URL (corrected parameter name)
//     const urlParams = new URLSearchParams(window.location.search);
//     const trekId = urlParams.get('id'); // Use 'id' instead of 'trekId'

//     console.log('trekId:', trekId); // Log trekId for debugging

//     if (!trekId) {
//         alert('Invalid Trek ID!');
//         return;
//     }

//     // Fetch trek details using the trek ID
//     try {
//         const response = await fetch(`http://localhost:3000/api/treks/${trekId}`);

//         if (!response.ok) {
//             throw new Error(`Error: ${response.status} - ${response.statusText}`);
//         }

//         const trek = await response.json();

//         if (response.ok) {
//             // Populate the HTML with trek details
//             document.getElementById('trek-title').textContent = trek.name;
//             document.getElementById('trek-name').textContent = trek.name;
//             document.getElementById('trek-image').src = trek.images[0]; // Assuming the first image is used
//             document.getElementById('trek-description').textContent = trek.description;
//             document.getElementById('difficulty-level').textContent = trek.difficultyLevel;
//             document.getElementById('total-days').textContent = trek.totalDays;
//             document.getElementById('max-altitude').textContent = trek.maxAltitude;
//             document.getElementById('best-season').textContent = trek.bestSeason;
//             document.getElementById('total-distance').textContent = trek.totalDistance;
//             document.getElementById('expenses').textContent = trek.expenses;

//             // Create all images in the slider dynamically
//             const slider = document.getElementById('slider');
//             trek.images.forEach((image, index) => {
//                 const imgElement = document.createElement('img');
//                 imgElement.src = image;
//                 imgElement.classList.add('slide');
//                 imgElement.dataset.index = index; // Add an index for navigation
//                 slider.appendChild(imgElement);
//             });

//             // Initialize slider navigation
//             let currentIndex = 0;
//             const slides = slider.getElementsByClassName('slide');
//             const totalSlides = slides.length;

//             // Display the first image
//             slides[currentIndex].style.display = 'block';

//             // Handle the 'next' button click
//             document.getElementById('next').addEventListener('click', () => {
//                 slides[currentIndex].style.display = 'none'; // Hide current slide
//                 currentIndex = (currentIndex + 1) % totalSlides; // Increment index, loop back if needed
//                 slides[currentIndex].style.display = 'block'; // Show new slide
//             });

//             // Handle the 'prev' button click
//             document.getElementById('prev').addEventListener('click', () => {
//                 slides[currentIndex].style.display = 'none'; // Hide current slide
//                 currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Decrement index, loop back if needed
//                 slides[currentIndex].style.display = 'block'; // Show new slide
//             });



//             // If you want to add reviews dynamically
//             const reviewsList = document.getElementById('reviews-list');

//             // Check if there are reviews
//             if (trek.reviews && trek.reviews.length > 0) {
//                 trek.reviews.forEach(review => {
//                     const reviewElement = document.createElement('div');
//                     reviewElement.classList.add('review');
//                     reviewElement.innerHTML = `
//                     <p><strong>User:</strong> ${review.user.fullName}</p>
//                     <p><strong>Rating:</strong> ${review.rating}/5</p>
//                     <p>${review.review}</p>
//                 `;
//                     reviewsList.appendChild(reviewElement);
//                 });
//             } else {
//                 // If no reviews, display a message
//                 reviewsList.innerHTML = `<p>No reviews at the moment.</p>`;
//             }

//         }
//     } catch (error) {
//         console.error('Error fetching trek details:', error);
//         alert('An error occurred while fetching trek details.');
//     }
// });





document.addEventListener('DOMContentLoaded', async function () {
    // Extract trek ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const trekId = urlParams.get('id'); // Use 'id' instead of 'trekId'

    console.log('trekId:', trekId); // Log trekId for debugging

    if (!trekId) {
        alert('Invalid Trek ID!');
        return;
    }

    // Fetch trek details using the trek ID
    try {
        const response = await fetch(`http://localhost:3000/api/treks/${trekId}`);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const trek = await response.json();

        if (response.ok) {
            // Populate the HTML with trek details
            document.getElementById('trek-title').textContent = trek.name;
            document.getElementById('trek-name').textContent = trek.name;
            document.getElementById('trek-image').src = trek.images[0]; // Assuming the first image is used
            document.getElementById('trek-description').textContent = trek.description;
            document.getElementById('difficulty-level').textContent = trek.difficultyLevel;
            document.getElementById('total-days').textContent = trek.totalDays;
            document.getElementById('max-altitude').textContent = trek.maxAltitude;
            document.getElementById('best-season').textContent = trek.bestSeason;
            document.getElementById('total-distance').textContent = trek.totalDistance;
            document.getElementById('expenses').textContent = trek.expenses;

            // Create all images in the slider dynamically
            const slider = document.getElementById('slider');
            trek.images.forEach((image, index) => {
                const imgElement = document.createElement('img');
                imgElement.src = image;
                imgElement.classList.add('slide');
                imgElement.dataset.index = index; // Add an index for navigation
                slider.appendChild(imgElement);
            });

            // Initialize slider navigation
            let currentIndex = 0;
            const slides = slider.getElementsByClassName('slide');
            const totalSlides = slides.length;

            // Display the first image
            slides[currentIndex].style.display = 'block';

            // Handle the 'next' button click
            document.getElementById('next').addEventListener('click', () => {
                slides[currentIndex].style.display = 'none'; // Hide current slide
                currentIndex = (currentIndex + 1) % totalSlides; // Increment index, loop back if needed
                slides[currentIndex].style.display = 'block'; // Show new slide
            });

            // Handle the 'prev' button click
            document.getElementById('prev').addEventListener('click', () => {
                slides[currentIndex].style.display = 'none'; // Hide current slide
                currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Decrement index, loop back if needed
                slides[currentIndex].style.display = 'block'; // Show new slide
            });



            // Fetch and display all trek reviews, excluding the current user's review
            const reviewsList = document.getElementById('reviews-list');
            const token = localStorage.getItem('token'); // Assume token is used for identifying the user
            const userId = localStorage.getItem('userId');
            const currentUserReview = {};
            if (trek.reviews && trek.reviews.length > 0) {
                // Filter out the current user's review from the general list of reviews
                const filteredReviews = trek.reviews.filter(review => {
                    console.log(`userId :${userId} , review userId: ${review.user._id}`)

                    if (review.user._id === userId) {
                        currentUserReview.review = review; // Store current user's review for later
                        return false; // Don't add this review to the list of general reviews
                    }
                    return true; // Include other reviews
                });

                // Display the remaining reviews
                filteredReviews.forEach(review => {
                    const reviewElement = document.createElement('div');
                    reviewElement.classList.add('review');
                    reviewElement.innerHTML = `
                      <p><strong>User:</strong> ${review.user.fullName}</p>
                      <p><strong>Rating:</strong> ${review.rating}/5</p>
                      <p>${review.review}</p>
                  `;
                    reviewsList.appendChild(reviewElement);
                });


            } else {
                reviewsList.innerHTML = `<p>No reviews at the moment.</p>`;
            }


            // Fetch and display "My Review" (fetch based on user token and trek ID)
            const myReviewSection = document.getElementById('my-review');


            if (token) {
                try {
                    const myReviewResponse = await fetch(`http://localhost:3000/api/treks/${trekId}/my-review`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    // Check if the response is OK or not (200 OK)
                    if (myReviewResponse.ok) {
                        const myReview = await myReviewResponse.json();

                        // If a review exists, display it
                        myReviewSection.innerHTML = `
                            <h3>My Review</h3>
                            <p><strong>Rating:</strong> ${myReview.rating}/5</p>
                            <p>${myReview.review}</p>
                            <button class="edit-review" onclick="editReview(${myReview.review._id})">Edit</button>
                            <button class="delete-review" onclick="deleteReview(${myReview.review._id})">Delete</button>
                        `;
                    }
                    // Handle the 404 case with the message "No review found"
                    else if (myReviewResponse.status === 404) {
                        const myReview = await myReviewResponse.json();

                        // Check if the message indicates no review found
                        if (myReview.message === 'No review found for this user on this trek destination') {
                            myReviewSection.innerHTML = `<p>You haven't submitted a review yet.</p>`;

                            // Create and append the "Add Review" button
                            const addReviewButton = document.createElement('button');
                            addReviewButton.innerText = 'Add Your Review';
                            addReviewButton.onclick = () => addReview(); // Replace with your review submission logic
                            myReviewSection.appendChild(addReviewButton);
                        }
                    }
                    // Handle other errors
                    else {
                        throw new Error(`Error fetching your review: ${myReviewResponse.status}`);
                    }
                } catch (error) {
                    console.error('Error fetching my review:', error);
                    myReviewSection.innerHTML = `<p>An error occurred while fetching your review.</p>`;
                }
            } else {
                // User is not logged in, optionally show a login prompt
                myReviewSection.innerHTML = `<p>Please log in to submit a review.</p>`;
            }


        }
    } catch (error) {
        console.error('Error fetching trek details:', error);
        alert('An error occurred while fetching trek details.');
    }
});

// Function to edit a review
async function editReview() {

    // Extract trek ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const trekId = urlParams.get('id'); // Use 'id' instead of 'trekId'

    console.log('trekId:', trekId); // Log trekId for debugging

    if (!trekId) {
        alert('Invalid Trek ID!');
        return;
    }

    const newReview = prompt("Enter your new review:");
    const newRating = prompt("Enter your new rating (1-5):");

    if (newReview && newRating) {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/treks/${trekId}/my-review`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ review: newReview, rating: newRating })
            });

            if (response.ok) {
                alert('Review updated successfully!');
                location.reload(); // Reload the page to show updated review
            } else {
                throw new Error('Failed to update review');
            }
        } catch (error) {
            console.error('Error updating review:', error);
            alert('An error occurred while updating the review.');
        }
    }
}


// Function to delete a review
async function deleteReview() {
    // Extract trek ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const trekId = urlParams.get('id'); // Use 'id' instead of 'trekId'

    console.log('trekId:', trekId); // Log trekId for debugging
    if (!trekId) {
        alert('Invalid Trek ID!');
        return;
    }
    if (confirm('Are you sure you want to delete your review?')) {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/treks/${trekId}/my-review`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                alert('Review deleted successfully!');
                location.reload(); // Reload the page after deleting the review
            } else {
                throw new Error('Failed to delete review');
            }
        } catch (error) {
            console.error('Error deleting review:', error);
            alert('An error occurred while deleting the review.');
        }
    }
}

async function addReview() {
    // Extract trek ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const trekId = urlParams.get('id'); // Use 'id' instead of 'trekId'

    console.log('trekId:', trekId); // Log trekId for debugging
    if (!trekId) {
        alert('Invalid Trek ID!');
        return;
    }
    // Show the review form
    const reviewFormTemplate = document.getElementById('reviewFormTemplate');
    reviewFormTemplate.style.display = 'block';

    // Get the form element
    const addReviewForm = document.getElementById('addReviewForm');

    // Handle form submission
    addReviewForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Get the token from localStorage
        const token = localStorage.getItem('token'); // Adjust based on where the token is stored

        // Collect review data from the form
        const rating = document.getElementById('rating').value;
        const review = document.getElementById('review').value;

        try {
            const response = await fetch(`http://localhost:3000/api/treks/${trekId}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    rating: rating,
                    review: review
                })
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message); // "Review added successfully"
                window.location.reload(); // Reload the page to reflect the new review
            } else {
                throw new Error(result.message || 'Failed to submit review');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('There was an error submitting your review. Please try again.');
        }
    });
}
