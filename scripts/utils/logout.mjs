import { reload } from "./reload.mjs";

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    reload();
}