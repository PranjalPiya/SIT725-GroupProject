document.addEventListener('DOMContentLoaded', async function () {
    // Extract trek ID from the URL (corrected parameter name)
    const urlParams = new URLSearchParams(window.location.search);
    const trekId = urlParams.get('id'); // Use 'id' instead of 'trekId'

    console.log('trekId:', trekId); // Log trekId for debugging

    if (!trekId) {
        alert('Invalid Trek ID!');
        return;
    }

    console.log('anusha');
    // Fetch trek details using the trek ID
    try {
        const response = await fetch(`http://localhost:3000/api/treks/${trekId}/reviews`);
        console.log(response);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const reviews = await response.json();

        // console.log(trek), 'saadsa';
        if (response.ok) {

            // If you want to add reviews dynamically
   // If you want to add reviews dynamically
            const reviewsList = document.getElementById('reviews-list');

            // Check if there are reviews
            if (reviews && reviews.length > 0) {

                reviews.forEach(review => {
                  const reviewElement = document.createElement('div');

                      // Safely access the user name
                    const userName = typeof review.userId === 'object' && review.userId !== null
                    ? review.userId.fullName || "Unknown User"
                    : review.userId || "Unknown User";


                  reviewElement.classList.add('review');
                  reviewElement.innerHTML = `
                    <div class="review-header">
                      <span class="review-user">${userName}</span>
                      <div class="review-rating">${generateStars(review.rating)}</div>
                    </div>
                    <br/>
                    <p class="review-comment">${review.comment}</p>
                  `;
                  reviewsList.appendChild(reviewElement);
                });
              } else {
                reviewsList.innerHTML = `<p>No reviews at the moment.</p>`;
              }

        }
    } catch (error) {
        console.error('Error fetching review details:', error);
        alert('An error occurred while fetching review details.');
    }
});

// Function to generate star ratings
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      stars += i <= rating ? '<span>★</span>' : '<span>☆</span>';
    }
    return stars;
}