import { createHtmlElement } from "../utils/createHtmlElement.mjs";
import { getUser } from "../utils/getUser.mjs";
import { logout } from "../utils/logout.mjs";

const userLoggedIn = getUser();
const baseURL = "http://127.0.0.1:5501";

export function renderNavigation() {
    const mainNav = document.getElementById("main-nav");

    if (userLoggedIn) {
        const profileListItem = createHtmlElement("li", ["nav-item"]);
        const profileButton = createHtmlElement("a", ["nav-link", "text-white", "mx-3"], {
            href: `${baseURL}/profile/`
        }, "Profile");
        profileListItem.appendChild(profileButton)
        mainNav.appendChild(profileListItem);

        const logoutListItem = createHtmlElement("li", ["nav-item"]);
        const logOutButton = createHtmlElement("a", ["btn", "btn-light", "px-3", "py-1", "mx-3"], {
            href: `${baseURL}/authentication/login/`
        }, "Log Out");

        logOutButton.addEventListener("click", () => {
            logout();
        });
        
        logoutListItem.appendChild(logOutButton);
        mainNav.appendChild(logoutListItem);     

    } else {
        const loginListItem = createHtmlElement("li", ["nav-item"]);
        const loginButton = createHtmlElement("a", ["btn", "btn-light", "px-3", "py-1", "mx-3"], {
            href: `${baseURL}/authentication/login/`
        }, "Log In");
        
        loginListItem.appendChild(loginButton);
        mainNav.appendChild(loginListItem);     
    }
}