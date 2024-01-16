import { API_HOST_URL } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";

const action = "/auth/login";
const method = "post";

export async function login(user) {
    const loginURL = API_HOST_URL + action;
    const body = JSON.stringify(user);
  
    const response = await fetch(loginURL, {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      body,
    });
  
    if (response.status === 200) {
      const { accessToken, ...user } = await response.json();
      storage.save("token", accessToken);
      storage.save("user", user);
      window.location.href = '/index.html';
    }
}