import { createHtmlElement } from "./createHtmlElement.mjs";

export function showAlertSuccess(message, type = "info", duration = 5000, ariaLive = "polite") {
    const alertContainer = document.getElementById("alert");

    const successAlert = createHtmlElement("div", ["alert", `alert-${type}`, "fade", "show", "position-fixed", "top-0", "start-50", "translate-middle-x", "mt-5"]);
    successAlert.setAttribute("role", "alert");
    successAlert.setAttribute("aria-live", ariaLive);

    successAlert.innerHTML = `${message}`;

    alertContainer.appendChild(successAlert);

    setTimeout(() => {
        alertContainer.removeChild(successAlert);
    }, duration);
}

export function showAlertError(message, type = "danger", duration = 5000, ariaLive = "polite") {
    const alertContainer = document.getElementById("alert");

    const errorAlert = createHtmlElement("div", ["alert", `alert-${type}`, "fade", "show", "position-fixed", "top-0", "start-50", "translate-middle-x", "mt-5"]);
    errorAlert.setAttribute("role", "alert");
    errorAlert.setAttribute("aria-live", ariaLive);

    errorAlert.innerHTML = `${message}`;

    alertContainer.appendChild(errorAlert);

    setTimeout(() => {
        alertContainer.removeChild(errorAlert);
    }, duration);
}
