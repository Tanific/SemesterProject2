import { createHtmlElement } from "../utils/index.mjs";
import { formatTimeDifference } from "../utils/index.mjs";

//layout of listings on home page
export function renderListingTemplate(listing) {
    const listingContainer = createHtmlElement("div", ["col-4", "m-3", "bg-white", "rounded-2", "shadow", "p-0"]);
    listingContainer.style.width = "350px";
    listingContainer.style.height = "550px";
    listingContainer.style.overflow = "hidden";

    const listingPicture = createHtmlElement("img", ["img-fluid"], { src: listing.media[0] });
    listingPicture.style.width = "350px";
    listingPicture.style.height = "300px";

    const listingBody = createHtmlElement("div", ["col-12", "p-3"]);

    const title = createHtmlElement("h2", ["d-block", "text-truncate", "pb-1"], {}, listing.title);
    const highestBid = listing.bids && listing.bids.length > 0 ? Math.max(...listing.bids.map(bid => bid.amount)) : 0;
    const bids = createHtmlElement("p", ["fs-5", "fw-bold"], {}, `Current Bid: ${highestBid} kr`);
    const endsAt = createHtmlElement("p", ["fw-bold", "text-danger"], {}, `${formatTimeDifference(listing.endsAt)}`);
    const description = createHtmlElement("p", ["d-block", "text-truncate"], {}, listing.description);
    const viewButton = createHtmlElement("a", ["btn", "btn-secondary", "mt-2"], {
        href: `/listings/single/?id=${listing.id}`
    }, "View Listing");

    listingBody.appendChild(title);
    listingBody.appendChild(description);
    listingBody.appendChild(bids);
    listingBody.appendChild(endsAt); 
    listingBody.appendChild(viewButton);
    
    listingContainer.appendChild(listingPicture);
    listingContainer.appendChild(listingBody);
      
    return listingContainer;
}