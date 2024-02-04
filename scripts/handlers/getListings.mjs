import { getListings } from "../api/listings/index.mjs";
import { renderListingTemplate } from "../templates/renderListings.mjs";

//fetches and renders listings, 6 at a time, load more button to display 6 more
let visibleListings = 6;
let step = 6;
export async function setReadListingsListener() {
    try {
        const listingsContainer = document.getElementById("listingContainer");
        const loadMoreButton = document.getElementById("loadMore");

        loadMoreButton.addEventListener("click", async () => {
            visibleListings += step;
            const listings = await getListings(); 
            listingsContainer.innerHTML = ""; 

            listings.slice(0, visibleListings).forEach(listing => {
                const listingTemplate = renderListingTemplate(listing);
                listingsContainer.appendChild(listingTemplate);
            });

            if (visibleListings >= listings.length) {
                loadMoreButton.style.display = "none";
            }
        });

        const listings = await getListings();
        listings.slice(0, visibleListings).forEach(listing => {
            const listingTemplate = renderListingTemplate(listing);
            listingsContainer.appendChild(listingTemplate);
        });

    } catch (error) {
        console.error('Error fetching or displaying listings:', error.message);
    }
}
