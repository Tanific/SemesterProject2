import { getAccessToken } from "./getAccessToken.mjs";

export function isLoggedIn() {
    const accessToken = getAccessToken();
    if(!accessToken) return false;
    return true;
}
