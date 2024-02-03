import { createHtmlElement } from "../utils/index.mjs";
import { getUser } from "../utils/index.mjs";
import { logout } from "../utils/index.mjs";

const userLoggedIn = getUser();
const baseURL = "/";

export function renderNavigation() {
    const mainNav = document.getElementById("main-nav");

    if (userLoggedIn) {
        const profileListItem = createHtmlElement("li", ["nav-item"]);
        const profileButton = createHtmlElement("a", ["nav-link", "text-white", "mx-3"], {
            href: `${baseURL}profile/`
        }, "Profile");
        profileListItem.appendChild(profileButton)
        mainNav.appendChild(profileListItem);

        const newListingItem = createHtmlElement("li", ["nav-item"]);
        const newListingButton = createHtmlElement("a", ["btn", "border", "bg-secondary","text-white", "mx-3", "m-md-0", "m-3"], {
            href: `${baseURL}listings/create/`
        }, "New Listing");
        newListingItem.appendChild(newListingButton);
        mainNav.appendChild(newListingItem)

        const logoutListItem = createHtmlElement("li", ["nav-item"]);
        const logOutButton = createHtmlElement("a", ["btn", "btn-light", "px-3", "py-1", "mx-3"], {
            href: `${baseURL}authentication/login/`
        }, "Log Out");

        logOutButton.addEventListener("click", () => {
            logout();
        });
        
        logoutListItem.appendChild(logOutButton);
        mainNav.appendChild(logoutListItem);     

    } else {
        const loginListItem = createHtmlElement("li", ["nav-item"]);
        const loginButton = createHtmlElement("a", ["btn", "btn-light", "px-3", "py-1", "mx-3"], {
            href: `${baseURL}authentication/login/`
        }, "Log In");
        
        loginListItem.appendChild(loginButton);
        mainNav.appendChild(loginListItem);     
    }
}