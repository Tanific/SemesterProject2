import { getListings } from "../api/listings/index.mjs"
import { renderListingTemplate } from "../templates/renderListings.mjs";

const listingsContainer = document.getElementById("listingContainer");

export async function setReadListingsListener() {
    try {
        const listings = await getListings();

        listings.forEach(listing => {
            const listingTemplate = renderListingTemplate(listing);
            listingsContainer.appendChild(listingTemplate);
        });
    } catch (error) {
        console.error('Error fetching or displaying listings:', error.message);
    }
}