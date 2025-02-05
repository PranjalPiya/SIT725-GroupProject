function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

const treks = [
    { name: "Everest Base Camp", difficulty: 8 },
    { name: "Annapurna Circuit", difficulty: 7 },
    { name: "Poon Hill Trek", difficulty: 4 },
    { name: "Langtang Valley Trek", difficulty: 5 },
    { name: "RARA Trek", difficulty: 10 }
];

function filterTreks() {
    const age = document.getElementById('age').value;
    const weight = document.getElementById('weight').value;
    const fitness = document.getElementById('fitness').value;
    
    if (!age || !weight || !fitness) {
        alert("Please enter all details");
        return;
    }

    const filteredTreks = treks.filter(trek => trek.difficulty <= fitness);
    
    let resultsHTML = "<h3>Recommended Treks:</h3>";
    if (filteredTreks.length === 0) {
        resultsHTML += "<p>No suitable treks found.</p>";
    } else {
        resultsHTML += "<ul>";
        filteredTreks.forEach(trek => {
            resultsHTML += `<li>${trek.name} (Difficulty: ${trek.difficulty})</li>`;
        });
        resultsHTML += "</ul>";
    }
    
    document.getElementById('trekResults').innerHTML = resultsHTML;
}