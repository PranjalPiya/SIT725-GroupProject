document.addEventListener('DOMContentLoaded', () => {
    const trekGrid = document.getElementById('trekGrid');

    function createTrekCard(trek) {
        return `
            <div class="trek-card" data-id="${trek.id}" onclick="goToTrekDetails(${trek.id})">
                <div class="trek-card-image">
                    <img src="${trek.image}" alt="${trek.title}">
                    <div class="difficulty-badge">${trek.difficulty}</div>
                </div>
                <div class="trek-card-content">
                    <h3 class="text-xl font-bold mb-2">${trek.title}</h3>
                    <div class="location">
                        <img src="https://cdn.jsdelivr.net/npm/lucide-static@0.344.0/icons/map-pin.svg" alt="Location">
                        <span>${trek.location}</span>
                    </div>
                    <div class="trek-details">
                        <div class="detail">
                            <img src="https://cdn.jsdelivr.net/npm/lucide-static@0.344.0/icons/clock.svg" alt="Duration">
                            <span>${trek.duration}</span>
                        </div>
                        <div class="detail">
                            <img src="https://cdn.jsdelivr.net/npm/lucide-static@0.344.0/icons/users.svg" alt="Group">
                            <span>Max 12 people</span>
                        </div>
                    </div>
                    <div class="trek-action">
                        <div class="price">
                            <span class="amount">$${trek.price}</span>
                            <span class="period">/person</span>
                        </div>
                        <button class="btn-primary">Book Now</button>
                    </div>
                </div>
            </div>
            <script>
function goToTrekDetails(trekId) {
    window.location.href = /specific_trek.html?id=${trekId} ;
}
</script>
        `;
    }

    trekGrid.innerHTML = popularTreks.map(trek => createTrekCard(trek)).join('');
});



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
        const response = await fetch(`http://localhost:3000/api/treks/${trekId}`);
        console.log(response);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const trek = await response.json();
        console.log(trek), 'saadsa';
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


//             const reviewResponse = await fetch(`http://localhost:3000/api/treks/${trekId}/reviews`);
//             console.log(response);
//             if (!reviewResponse.ok) {
//                 throw new Error(`Error: ${reviewResponse.status} - ${reviewResponse.statusText}`);
//             }
    
//             const reviews = await reviewResponse.json();

//             // If you want to add reviews dynamically
//    // If you want to add reviews dynamically
//             const reviewsList = document.getElementById('reviews-list');

//             // Check if there are reviews
//             if (reviews && reviews.length > 0) {

//                 reviews.forEach(review => {
//                   const reviewElement = document.createElement('div');

//                       // Safely access the user name
//                     const userName = typeof review.userId === 'object' && review.userId !== null
//                     ? review.userId.fullName || "Unknown User"
//                     : review.userId || "Unknown User";


//                   reviewElement.classList.add('review');
//                   reviewElement.innerHTML = `
//                     <div class="review-header">
//                       <span class="review-user">${userName}</span>
//                       <div class="review-rating">${generateStars(review.rating)}</div>
//                     </div>
//                     <br/>
//                     <p class="review-comment">${review.comment}</p>
//                   `;
//                   reviewsList.appendChild(reviewElement);
//                 });
//               } else {
//                 reviewsList.innerHTML = `<p>No reviews at the moment.</p>`;
//               }

        }
    } catch (error) {
        console.error('Error fetching trek details:', error);
        alert('An error occurred while fetching trek details.');
    }
});



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