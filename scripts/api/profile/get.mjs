import { API_HOST_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";
/**
 * Retrieves profile details by name, including owned listings.
 *
 * @async
 * @function
 * @param {string} name - profile name to retrieve
 *
 * @throws {Error} if no name is provided
 * @returns {Promise<Object>} resolves details of profile and owned listings
 */
const action = "/profiles";

export async function getProfile(name) {
    if (!name) {
      throw new Error("Get requires a name");
    }
    
    const getProfileURL = `${API_HOST_URL}${action}/${name}?_listings=true`;
    const response = await authFetch(getProfileURL)
    return await response.json();
  }