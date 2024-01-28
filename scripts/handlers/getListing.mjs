import { getListing } from "../api/listings/get.mjs";
import { getValueFromURLParameter } from "../utils/getValueFromURLParameter.mjs";
import { renderSingleListingTemplate } from "../templates/renderSingleListing.mjs";

const singleListingContainer = document.getElementById("singleListing");

export async function setReadListingListener() {
    const listingID = getValueFromURLParameter("id");

    if (!listingID){
        console.error ("missing listing id");
        return;
    }
    
    try {
        const listing = await getListing(listingID);

        singleListingContainer.innerHTML = '';

        const listingTemplate = renderSingleListingTemplate(listing);
            singleListingContainer.appendChild(listingTemplate);

    } catch (error) {
        console.error("Error fetching and displaying the post:", error);
    }
} 