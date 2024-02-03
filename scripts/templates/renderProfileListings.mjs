import { createHtmlElement } from "../utils/index.mjs";
import { formatTimeDifference } from "../utils/endsAt.mjs";

export function renderProfileListingTemplate(listing) {
    
    const profileListings = createHtmlElement("div", ["col-4", "my-3", "me-3", "bg-white", "rounded-2", "shadow", "p-0"]);
    profileListings.style.width = "320px";
    profileListings.style.height = "450px";
    profileListings.style.overflow = "hidden";

    const listingPicture = createHtmlElement("img", ["img-fluid"], { src: listing.media[0] });
    const listingBody = createHtmlElement("div", ["col-12", "p-3"]);

    const title = createHtmlElement("h2", [], {}, listing.title);
    const endsAt = createHtmlElement("p", ["fw-bold", "fs-5"], {}, `${formatTimeDifference(listing.endsAt)}`);
    const description = createHtmlElement("p", ["d-block", "text-truncate"], {}, listing.description);
    const viewButton = createHtmlElement("a", ["btn", "btn-secondary", "mt-2"], {
        href: `/listings/single/?id=${listing.id}`
    }, "View Listing");

    listingBody.appendChild(title);
    listingBody.appendChild(description);
    listingBody.appendChild(endsAt); 
    listingBody.appendChild(viewButton);
    
    profileListings.appendChild(listingPicture);
    profileListings.appendChild(listingBody);
      
    return profileListings;
}
