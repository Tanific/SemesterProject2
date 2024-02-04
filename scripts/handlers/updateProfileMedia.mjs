import { getUser } from "../utils/index.mjs";
import { updateAvatar } from "../api/profile/index.mjs";
import { save } from "../storage/index.mjs";
import * as alerts from "../utils/index.mjs"

const user = getUser();
// handler for put request to update avatar url
const confirmChangesBtn = document.getElementById("confirmChangesBtn");
const avatarInput = document.getElementById("avatarInput");

confirmChangesBtn.addEventListener("click", async (event) => {
    event.preventDefault();
        const newAvatarUrl = avatarInput.value;
        const response = await updateAvatar(user.name, newAvatarUrl);

        if (response.ok) {
            user.avatar = newAvatarUrl;
            save('user', user);
            window.location.href =`/profile/`;         
        } else {
            alerts.showAlertError("Avatar must be a valid URL");
            }
        });