import { createHtmlElement } from "../utils/createHtmlElement.mjs";
import { formatTimeDifference } from "../utils/endsAt.mjs";

export function renderSingleListingTemplate(listing) {
    //main body of listing divided into 2 columns
    const listingContainer = createHtmlElement("div", ["row", "mx-auto"]);
    const listingMedia = createHtmlElement("div", ["col-sm-12", "col-md-6", "col-lg-5"]);
    const listingDescription = createHtmlElement("div", ["col-12", "col-md-6"]);

    //image content
    const media = createHtmlElement("img", ["img-fluid"], { src: listing.media });
    media.style.maxHeight = "550px";
    media.style.width = "100%"
    listingMedia.appendChild(media);

    //description content
    const title = createHtmlElement("h1", ["fw-bold"], {}, listing.title);
    const description = createHtmlElement("h4", [], {}, listing.description);
    const highestBid = listing.bids.length > 0 ? Math.max(...listing.bids.map(bid => bid.amount)) : 0;
    const bids = createHtmlElement("h3", ["text-secondary", "fw-bold"], {}, `Current Bid: ${highestBid} kr`);

    listingDescription.appendChild(title);
    listingDescription.appendChild(description);
    listingDescription.appendChild(bids);

    listingContainer.appendChild(listingMedia);
    listingContainer.appendChild(listingDescription);
    
    return listingContainer;
} 
