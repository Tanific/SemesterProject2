import { API_HOST_URL } from "../constants.mjs";
import * as alert from "../../utils/showAlert.mjs"

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
