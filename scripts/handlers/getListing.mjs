import { getListing } from "../api/listings/get.mjs";
import { getValueFromURLParameter } from "../utils/getValueFromURLParameter.mjs";
import { renderSingleListingTemplate } from "../templates/renderSingleListing.mjs";

const singleListingContainer = document.getElementById("singleListing");
//fetches single listings based on id, retrieved from url param
export async function setReadListingListener() {
    const listingID = getValueFromURLParameter("id");

    if (!listingID){
        console.error("missing listing id");
        singleListingContainer.innerHTML = `<div class="alert alert-danger">Missing listing ID</div>`;
        return;
    }
    
    // Create loading indicator using Bootstrap spinner
    const loadingIndicator = document.createElement("div");
    loadingIndicator.className = "text-center my-4 loading-indicator";
    loadingIndicator.innerHTML = `
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    `;
    
    // Toggle loading state function
    const toggleLoading = (isLoading) => {
        if (isLoading) {
            singleListingContainer.innerHTML = "";
            singleListingContainer.appendChild(loadingIndicator);
        } else {
            const existingIndicator = document.querySelector('.loading-indicator');
            if (existingIndicator) existingIndicator.remove();
        }
    };
    
    try {
        // Show loading indicator
        toggleLoading(true);
        
        // Fetch listing data
        const listing = await getListing(listingID);
        
        // Hide loading indicator and show listing
        toggleLoading(false);
        const listingTemplate = renderSingleListingTemplate(listing);
        singleListingContainer.appendChild(listingTemplate);

    } catch (error) {
        console.error("Error fetching and displaying the post:", error);
        toggleLoading(false);
        singleListingContainer.innerHTML = `<div class="alert alert-danger">Error loading listing: ${error.message}</div>`;
    }
}