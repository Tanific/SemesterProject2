import { load } from "../storage/index.mjs";
/**
 * Generates and returns headers for authenticated requests
 * @returns {Object} - object containing headers for authenticated request
 */
export function headers() {
  const token = load("token");

  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  }
}
/**
 * an authenticated fetch request to the specified URL with optional request options
 * @param {string} url - url to send fetch request to
 * @param {Object} [options] - optional request options such as method and body
 */

export async function authFetch(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: headers()
  })
}