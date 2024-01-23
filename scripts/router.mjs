import * as listeners from "./handlers/index.mjs";
import * as templates from "./templates/index.mjs";

export default function router() {
    const path = location.pathname;

    switch (path) {
        case "/authentication/login/":
            listeners.setLoginFormListener();
            return;
        case "/authentication/register/":
            listeners.setRegisterFormListener();
            return;
        case "/profile/":
            listeners.setReadProfileListener();
            templates.renderNavigation();
            return;
        case "/profile/edit/":
            templates.renderNavigation();
            return;
        case "/":
            listeners.setReadListingsListener();
            templates.renderNavigation();
            return;
        case "/index.html":
            listeners.setReadListingsListener();
            templates.renderNavigation();
            return;

    }
}