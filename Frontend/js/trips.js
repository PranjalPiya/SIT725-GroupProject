const cardsData = [
    { title: "Jeju Oedolgae Beach", duration: "3 Days - 3 Nights", time: "May - June", image: "https://via.placeholder.com/300x200" },
    { title: "Pyramids Of Giza", duration: "6 Days - 5 Nights", time: "June - Oct", image: "https://via.placeholder.com/300x200" },
    { title: "Nile Adventure", duration: "6 Days - 4 Nights", time: "Mar - May", image: "https://via.placeholder.com/300x200" },
    { title: "France Heritage Tour", duration: "2 Days - 2 Nights", time: "Feb - Mar", image: "https://via.placeholder.com/300x200" },
    { title: "Statue of Liberty Tour", duration: "4 Days - 3 Nights", time: "Aug - Sept", image: "https://via.placeholder.com/300x200" },
    { title: "Niagara Falls Adventure", duration: "5 Days - 4 Nights", time: "Apr - May", image: "https://via.placeholder.com/300x200" },
    { title: "Golden Gate Bridge Tour", duration: "3 Days - 2 Nights", time: "May - July", image: "https://via.placeholder.com/300x200" },
    { title: "Mount Rushmore Visit", duration: "2 Days - 1 Night", time: "Sept - Oct", image: "https://via.placeholder.com/300x200" },
    { title: "Santorini Escape", duration: "3 Days - 3 Nights", time: "July - Aug", image: "https://via.placeholder.com/300x200" },
    { title: "Great Wall of China Tour", duration: "5 Days - 4 Nights", time: "Mar - May", image: "https://via.placeholder.com/300x200" }
  ];
  
  const cardsContainer = document.getElementById("travel-cards");
  const paginationContainer = document.getElementById("pagination");
  const cardsPerPage = 8;
  let currentPage = 1;
  
  // Function to display cards
  function displayCards(page) {
    cardsContainer.innerHTML = "";
    const startIndex = (page - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const cardsToShow = cardsData.slice(startIndex, endIndex);
  
    cardsToShow.forEach(card => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.innerHTML = `
        <img src="${card.image}" alt="${card.title}">
        <div class="card-content">
          <h4>${card.title}</h4>
          <p>(${card.duration})</p>
          <p>All New Year (${card.time})</p>
          <button>EXPLORE TRIP</button>
        </div>
      `;
      cardsContainer.appendChild(cardElement);
    });
  }
  
  // Function to create pagination buttons
  function createPagination() {
    paginationContainer.innerHTML = "";
    const totalPages = Math.ceil(cardsData.length / cardsPerPage);
  
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.textContent = i;
      button.classList.add("pagination-button");
      if (i === currentPage) button.classList.add("active");
      button.addEventListener("click", () => {
        currentPage = i;
        displayCards(currentPage);
        createPagination();
      });
      paginationContainer.appendChild(button);
    }
  
    // Previous and Next buttons
    const prevButton = document.createElement("button");
    prevButton.textContent = "Previous";
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        displayCards(currentPage);
        createPagination();
      }
    });
  
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        displayCards(currentPage);
        createPagination();
      }
    });
  
    paginationContainer.prepend(prevButton);
    paginationContainer.appendChild(nextButton);
  }
  
  // Initialize the display
  displayCards(currentPage);
  createPagination();
  