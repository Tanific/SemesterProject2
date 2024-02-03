import { API_HOST_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";
import { getUser } from "../../utils/getUser.mjs";
import { save } from "../../storage/index.mjs";

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

