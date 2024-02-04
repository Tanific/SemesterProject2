import { API_HOST_URL } from "../constants.mjs";
import * as alert from "../../utils/showAlert.mjs"

/**
 * sends post request to register a new user, will redirect to login if successful
 *
 * @param {Object} profile - the user profile object containing profile information
 * @param {string} profile.username - name
 * @param {string} profile.password - pasword
 * @param {string} profile.email - noroff email
 * @returns {Promise<void>} - delayed redirect to log in page on successful registration or throw error on failed request
 */

const action ="/auth/register";
const method ="post";

export async function register(user) {
    const registerURL = API_HOST_URL + action;
    const body = JSON.stringify(user);

    const response = await fetch(registerURL, {
        headers: {
            "Content-Type": "application/json"
        },
        method,
        body
    })

if (response.ok) {
    alert.showAlertSuccess("Successfully registered");
    setTimeout(() => {
        window.location.href = '/authentication/login/';
    }, 2400);    
    } else {
    const errorData = await response.json();
    const errorMessage = errorData.errors[0].message;      
    alert.showAlertError(errorMessage);
  }
}
