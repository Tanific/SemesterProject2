import { API_HOST_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

/**
 * sends post request to api endpoint for creating new listings
 * 
 * @async
 * @function
 * @param {Object} listingData - contains listing data such as title, description, tags and media gallery
 * @returns {Promise<Object>} - returns response in json format
 */

const action = "/listings";
const method = "post"

export async function createListing(listingData) {

    const createListingURL = API_HOST_URL + action;

    const response = await authFetch(createListingURL, {
        method,
        body: JSON.stringify(listingData)
    })
    if (!response.ok) {
        throw new Error(`${response.status}: Failed to create listing`);
    }
    return await response.json();
}
/**
 * Submits a bid for listings
 *
 * @async
 * @function
 * @param {string} id - listing id
 * @param {number} amount - amount in bid input
 *
 * @throws {Error} If ID is missing, amount is not provided, amount is negative, or amount is not a number
 * @returns {Promise<Object>} returns new amount
 */
export async function submitBid(id, amount) {
    if (!id) throw new Error("missing required ID");
    if (!amount) throw new Error ("Provide an amount to submit bid");
    if (amount < 0) throw new Error ("Bid amount cant be negative");
    const newAmount = parseInt(amount);
    if (typeof newAmount !== "number") throw new Error("Please enter a number");

    const submitBidURL = `${API_HOST_URL}${action}/${id}/bids`;
    const response = await authFetch(submitBidURL, {
        method,
        body: JSON.stringify({amount: +newAmount})
    });
    
    return await response.json();
    }
    