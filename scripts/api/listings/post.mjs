import { API_HOST_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/listings";
const method = "post"

export async function createListing(listingData) {
    const createListingURL = API_HOST_URL + action;

    const response = await authFetch(createListingURL, {
        method,
        body: JSON.stringify(listingData)
    })

    return await response.json();
}

export async function submitBid(id, newAmount) {
    const submitBidURL = `${API_HOST_URL}${action}/${id}/bids`;

    const response = await authFetch(submitBidURL, {
        method,
        body: JSON.stringify({amount: +newAmount})
    });

    return await response.json();
} 