function toggleDetails(event) {
    const item = event.currentTarget;
    const expanded = item.nextElementSibling;
    if (expanded.style.display === "block") {
        expanded.style.display = "none";
        item.querySelector(".toggle").textContent = "▼";
    } else {
        expanded.style.display = "block";
        item.querySelector(".toggle").textContent = "▲";
    }
}
function filterGuides() {
    const selectedCountry = document.getElementById("country-filter").value;
    const guideSections = document.querySelectorAll(".country-section");
    guideSections.forEach(section => {
        if (selectedCountry === "all" || section.dataset.country === selectedCountry) {
            section.classList.remove("hidden");
        } else {
            section.classList.add("hidden");
        }
    });
}