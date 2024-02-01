import { getListings } from "../api/listings/get.mjs";
import { renderListingTemplate } from "../templates/renderListings.mjs";

const searchForm = document.getElementById("search-form");

if (searchForm) {
    searchForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        try {
            const searchInput = document.getElementById("search-input").value.toLowerCase();
            const allListings = await getListings();
            
            const filteredListings = allListings.filter(listing => {
                const title = listing.title.toLowerCase().includes(searchInput);
                const description = listing.description && listing.description.toLowerCase().includes(searchInput);

                return title || description;
            });

            renderListings(filteredListings);
        } catch (error) {
            console.error('Error filtering and displaying listings:', error.message);
        }
    });
}

function renderListings(listings) {
    const listingsContainer = document.getElementById("listingContainer");
    if (listingsContainer) {
        listingsContainer.innerHTML = "";

        listings.forEach(listing => {
            const listingTemplate = renderListingTemplate(listing);
            listingsContainer.appendChild(listingTemplate);
        });
    }
}