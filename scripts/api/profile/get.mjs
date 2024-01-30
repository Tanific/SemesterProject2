import { API_HOST_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/profiles";

export async function getProfile(name) {
    if (!name) {
      throw new Error("Get requires a name");
    }
  
    const getProfileURL = `${API_HOST_URL}${action}/${name}?_listings=true`;
    
    const response = await authFetch(getProfileURL)
  
    return await response.json();
  }