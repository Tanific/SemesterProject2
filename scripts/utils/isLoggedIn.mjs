import { getAccessToken } from "./getAccessToken.mjs";
//check for existing access token
export function isLoggedIn() {
    const accessToken = getAccessToken();
    if(!accessToken) return false;
    return true;
}
