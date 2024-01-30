import { createHtmlElement } from "../utils/index.mjs";
import { formatTimeDifference } from "../utils/index.mjs";
import { submitBid } from "../api/listings/post.mjs";

export function renderSingleListingTemplate(listing) {
    const listingContainer = createHtmlElement("div", ["row", "mx-auto"]);

    const listingMedia = createHtmlElement("div", ["col-sm-12", "col-md-6", "col-lg-5"]);
    const listingDescription = createHtmlElement("div", ["col-12", "col-md-6"]);

    const media = createHtmlElement("img", ["img-fluid"], { src: listing.media[0] });
    media.style.maxHeight = "550px";
    media.style.width = "100%";
    listingMedia.appendChild(media);


    const submitBidContainer = createHtmlElement("div", ["row"]);
    listingMedia.appendChild(submitBidContainer);

    const biddingForm = createHtmlElement("form", ["mt-3", "row"]);
    const bidInputContainer = createHtmlElement("div", ["col-6", "mb-2"]);
    const bidInput = createHtmlElement("input", ["form-control"], {
        type: "number",
        placeholder: "1",
        name: "bid",
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
            submitBid(listing.id, bidInput.value);
        } catch (error) {
            console.error("Error submitting bid:", error);
        }
    });

    // description content
    const title = createHtmlElement("h1", ["display-1"], {}, listing.title);
    const description = createHtmlElement("h5", ["mt-3", "display-6"], {}, listing.description);
    const highestBidContainer = createHtmlElement("div", ["mt-3"]);
    const highestBidTitle = createHtmlElement("h3", ["fw-bold"], {}, "Current bid:");
    const endsAt = createHtmlElement("p", ["fw-bold"], {}, `Ends in: ${formatTimeDifference(listing.endsAt)} hours`);
    const bidsHistory = createHtmlElement("h4", ["text-secondary", "fw-bold"], {}, "Bid History:");

    listingDescription.appendChild(title);
    listingDescription.appendChild(description);
    listingDescription.appendChild(endsAt);
    listingDescription.appendChild(highestBidContainer);
    highestBidContainer.appendChild(highestBidTitle);
    listingDescription.appendChild(bidsHistory);

    if (listing.bids.length > 0) {
        const sortedBids = listing.bids.sort((a, b) => b.amount - a.amount);
        const highestBid = sortedBids[0];
        const highestBidDisplay = createHtmlElement("div", ["p-2", "mb-4", "bg-white", "rounded-2", "shadow", "p-0"]);
        const highestBidderName = createHtmlElement("p", ["mb-1", "fw-bold"], {}, `${highestBid.bidderName}`);
        const highestBidAmount = createHtmlElement("p", ["mb-0"], {}, `${highestBid.amount} kr`);
        highestBidDisplay.appendChild(highestBidderName);
        highestBidDisplay.appendChild(highestBidAmount);
        highestBidContainer.appendChild(highestBidDisplay);

        listing.bids.forEach(bid => {
            const bidContainer = createHtmlElement("div", ["border", "p-2", "mb-2"]);
            const bidderName = createHtmlElement("p", ["mb-1", "fw-bold"], {}, `${bid.bidderName}`);
            const bidAmount = createHtmlElement("p", ["mb-0"], {}, `${bid.amount} kr`);
            bidContainer.appendChild(bidderName);
            bidContainer.appendChild(bidAmount);
            listingDescription.appendChild(bidContainer);
        });
    } else {
        // displaying a message if no bids
        const noBids = createHtmlElement("p", [], {}, "Be the first to bid on this listing!");
        listingDescription.appendChild(noBids);
    }

    listingContainer.appendChild(listingMedia);
    listingContainer.appendChild(listingDescription);

    return listingContainer;
}

