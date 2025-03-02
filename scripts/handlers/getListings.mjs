import { getListings } from "../api/listings/index.mjs";
import { renderListingTemplate } from "../templates/renderListings.mjs";

//fetches and renders listings, 6 at a time, load more button to display 6 more
let visibleListings = 6;
let step = 6;
export async function setReadListingsListener() {
    try {
        const listingsContainer = document.getElementById("listingContainer");
        const loadMoreButton = document.getElementById("loadMore");

        // Create loading indicator using Bootstrap spinner
        const loadingIndicator = document.createElement("div");
        loadingIndicator.className = "text-center my-4 loading-indicator";
        loadingIndicator.innerHTML = `
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        `;
        
        const toggleLoading = (isLoading) => {
            if (isLoading) {
                listingsContainer.innerHTML = "";
                listingsContainer.appendChild(loadingIndicator);
                if (loadMoreButton) loadMoreButton.disabled = true;
            } else {
                const existingIndicator = document.querySelector('.loading-indicator');
                if (existingIndicator) existingIndicator.remove();
                if (loadMoreButton) loadMoreButton.disabled = false;
            }
        };

        loadMoreButton.addEventListener("click", async () => {
            toggleLoading(true);
            
            try {
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
            } catch (error) {
                console.error('Error loading more listings:', error.message);
                listingsContainer.innerHTML = `<div class="alert alert-danger">Error loading listings: ${error.message}</div>`;
            } finally {
                toggleLoading(false);
            }
        });

        // Show loading indicator for initial load
        toggleLoading(true);
        
        // Fetch and display initial listings
        const listings = await getListings();
        listingsContainer.innerHTML = "";
        
        listings.slice(0, visibleListings).forEach(listing => {
            const listingTemplate = renderListingTemplate(listing);
            listingsContainer.appendChild(listingTemplate);
        });
        
        toggleLoading(false);

    } catch (error) {
        console.error('Error fetching or displaying listings:', error.message);
        const listingsContainer = document.getElementById("listingContainer");
        if (listingsContainer) {
            listingsContainer.innerHTML = `<div class="alert alert-danger">Error loading listings: ${error.message}</div>`;
        }
        toggleLoading(false);
    }
}