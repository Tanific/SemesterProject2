import { API_HOST_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/listings"

export async function getListings() {
    const getListingsURL = `${API_HOST_URL}${action}?_active=true&_seller=true&_bids=true&sort=created`
    const response = await authFetch(getListingsURL);
    return await response.json();
}

export async function getListing(id) {
    if(!id) {
        throw new Error("Get requires a listing ID");
    }
    const getListingURL = `${API_HOST_URL}${action}/${id}?_seller=true&_bids=true`;
    const response = await authFetch(getListingURL)
    return await response.json();
}