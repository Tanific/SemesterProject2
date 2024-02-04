import { reload } from "./reload.mjs";
//logs user out by removing token and user in local storage
export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    reload();
}