import * as listeners from "./handlers/index.mjs";

export default function router() {
    const path = location.pathname;

    switch (path) {
        case "/authentication/login/":
            listeners.setLoginFormListener()
            return;
        case "/authentication/register/":
            listeners.setRegisterFormListener()
            return;
        case "/profile/":
            listeners.setReadProfileListener()
            return;
    }
}