import { createHtmlElement } from "../utils/index.mjs";
import { formatTimeDifference } from "../utils/index.mjs";
import { submitBid } from "../api/listings/post.mjs";
import { getUser } from "../utils/index.mjs";
import { isLoggedIn } from "../utils/index.mjs";
import { reload } from "../utils/index.mjs";
import { getAccessToken } from "../utils/index.mjs";
import * as alerts from "../utils/index.mjs"

const userLoggedIn = getUser();
const loggedIn = isLoggedIn();

export function renderSingleListingTemplate(listing) {

    const sortedBids = listing.bids.sort((a, b) => b.amount - a.amount);
    const highestBid = sortedBids[0];
    const listingContainer = createHtmlElement("div", ["row", "mx-5", "justify-content-center"]);

    const listingMedia = createHtmlElement("div", ["col-sm-12", "col-lg-6"]);
    const listingDescription = createHtmlElement("div", ["col-12", "col-lg-6"]);

    const media = createHtmlElement("img", ["img-fluid"], { src: listing.media[0] });
    media.style.maxHeight = "550px";
    media.style.width = "100%";
    listingMedia.appendChild(media);
    
    if (loggedIn && userLoggedIn.name !== listing.seller.name) {
        const submitBidContainer = createHtmlElement("div", ["row"]);
        listingMedia.appendChild(submitBidContainer);
        
        const biddingForm = createHtmlElement("form", ["mt-3", "row"]);
        const bidInputContainer = createHtmlElement("div", ["col-6", "mb-2"]);
        const bidInput = createHtmlElement("input", ["form-control"], {
            type: "number",
            name: "bid",
            min: highestBid ? highestBid.amount + 1 : 1,
            max: userLoggedIn.credits,
            value: highestBid ? highestBid.amount + 1 : 1,
        });
        
        const bidSubmitButtonContainer = createHtmlElement("div", ["col-6"]); 
        const bidSubmitButton = createHtmlElement("button", ["btn", "btn-primary"], { type: "submit" }, "Place Bid");    
        submitBidContainer.appendChild(biddingForm);
        biddingForm.appendChild(bidInputContainer);
        bidInputContainer.appendChild(bidInput);
        biddingForm.appendChild(bidSubmitButtonContainer);
        bidSubmitButtonContainer.appendChild(bidSubmitButton);
         
        biddingForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            try {
                const accessToken = getAccessToken();
                if (!accessToken) {
                    alerts.showAlertError("Unauthorized request");
                    reload(2400);
                    return;
                }
                await submitBid(listing.id, bidInput.value);
                alerts.showAlertSuccess("Bid successful");
                reload(2400);
            } catch (error) {
                alerts.showAlertError(error);
            }
        });
    }
    // description content
    const title = createHtmlElement("h1", ["display-4"], {}, `"${listing.title}" by: ${listing.seller.name}`);
    const description = createHtmlElement("h5", ["mt-3", "display-6"], {}, listing.description);
    const highestBidContainer = createHtmlElement("div", ["mt-3"]);
    const highestBidTitle = createHtmlElement("h2", ["fw-bold"], {}, "Current bid:");
    const endsAt = createHtmlElement("p", ["fw-bold"], {}, `${formatTimeDifference(listing.endsAt)}`);
    const bidsHistory = createHtmlElement("h2", ["text-secondary", "fw-bold"], {}, "Bid History:");

    highestBidContainer.style.maxWidth= "400px";

    listingDescription.appendChild(title);
    listingDescription.appendChild(description);
    listingDescription.appendChild(endsAt);
    listingDescription.appendChild(highestBidContainer);
    highestBidContainer.appendChild(highestBidTitle);
    listingDescription.appendChild(bidsHistory);

    if (listing.bids.length > 0) {
        const sortedBids = listing.bids.sort((a, b) => b.amount - a.amount);
        const highestBid = sortedBids[0];
        const highestBidDisplay = createHtmlElement("div", ["row", "p-2", "mb-4", "bg-white", "border","border-secondary", "p-0"]);
        const highestBidderName = createHtmlElement("p", ["col", "fw-bold", "fs-4", "m-0"], {}, `${highestBid.bidderName}:`);
        const highestBidAmount = createHtmlElement("p", ["col","mb-0","fs-4", "text-end"], {}, `${highestBid.amount} kr`);
        highestBidDisplay.appendChild(highestBidderName);
        highestBidDisplay.appendChild(highestBidAmount);
        highestBidContainer.appendChild(highestBidDisplay);

        listing.bids.forEach(bid => {
            const bidContainer = createHtmlElement("div", ["row", "border", "p-2", "mb-2"]);
            const bidderName = createHtmlElement("p", ["col", "fw-bold", "fs-4", "m-0"], {}, `${bid.bidderName}:`);
            const bidAmount = createHtmlElement("p", ["col", "mb-0", "fs-4", "m-0", "text-end"], {}, `${bid.amount} kr`);
            bidContainer.style.maxWidth = "400px";
            bidContainer.appendChild(bidderName);
            bidContainer.appendChild(bidAmount);
            listingDescription.appendChild(bidContainer);
        });
    } else {
        // displaying a message if no bids
        const noBids = createHtmlElement("p", [], {}, "Be the first to bid on this listing!");
        const noCurrentBid = createHtmlElement("p", [], {}, "No bids yet");
        highestBidContainer.appendChild(noCurrentBid)
        listingDescription.appendChild(noBids);
    }

    listingContainer.appendChild(listingMedia);
    listingContainer.appendChild(listingDescription);

    return listingContainer;
}

