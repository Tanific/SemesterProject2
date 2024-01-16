import { load } from "../storage/index.mjs"

export function getAccessToken() {
    return load("token");
}