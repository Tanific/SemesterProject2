import { API_HOST_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";
import { getUser } from "../../utils/getUser.mjs";
/**
 * Updates the avatar with valid media url
 *
 * @async
 * @function
 * @param {string} name - name of profile
 * @param {string} newAvatarUrl - media url of new avatar
 *
 * @throws {Error} If no name is found or there is an issue updating the avatar
 * @returns {Promise<Response>} response after sending put request to update avatar
 */
const action = "/profiles";
const method = "put";

export async function updateAvatar(name, newAvatarUrl) {
  const user = getUser();
  if (!user) {
    throw new Error("No username found");
  }
  const updateAvatarURL = `${API_HOST_URL}${action}/${name}/media`;

  const response = await authFetch(updateAvatarURL, {
    method,
    body: JSON.stringify({ avatar: newAvatarUrl }),
  });

  return response;
}

