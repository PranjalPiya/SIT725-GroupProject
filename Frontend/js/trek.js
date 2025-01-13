document.addEventListener('DOMContentLoaded', () => {
    const trekGrid = document.getElementById('trekGrid');

    function createTrekCard(trek) {
        return `
            <div class="trek-card">
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
        `;
    }

    trekGrid.innerHTML = popularTreks.map(trek => createTrekCard(trek)).join('');
});