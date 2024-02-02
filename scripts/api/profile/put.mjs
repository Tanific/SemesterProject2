import { API_HOST_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/profiles";
const method = "put";

export async function updateAvatar(name, newAvatarUrl) {
  if (!name) {
    throw new Error("Update requires a name");
  }

  const updateAvatarURL = `${API_HOST_URL}${action}/${name}/media`;

  const response = await authFetch(updateAvatarURL, {
    method,
    body: JSON.stringify({ avatar: newAvatarUrl }),
  });

  return response;
}

