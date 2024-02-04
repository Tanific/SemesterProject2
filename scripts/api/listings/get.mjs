import { API_HOST_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";
/**
 * Retrieves a list of active listings from the server, sorted by recent.
 * @async
 * @function
 * @throws {Error} response.json shows error if there is an issue fetching the listings
 * @returns {Promise<Object[]>} promise that resolves to an array of listings
 */
const action = "/listings"

export async function getListings() {
    const getListingsURL = `${API_HOST_URL}${action}?_active=true&_seller=true&_bids=true&sort=created`
    const response = await authFetch(getListingsURL);
    return await response.json();
}
/**
 * Retrieves single listing based on id
 * @async
 * @function
 * @param {string} id - The id of the listing
 *
 * @throws {Error} If no id is provided 
 * @returns {Promise<Object>} returns details of the listing based on id
 */
export async function getListing(id) {
    if(!id) {
        throw new Error("Get requires a listing ID");
    }
    const getListingURL = `${API_HOST_URL}${action}/${id}?_seller=true&_bids=true`;
    const response = await authFetch(getListingURL)
    return await response.json();
}