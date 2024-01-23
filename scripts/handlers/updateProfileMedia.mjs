import { getUser } from "../utils/index.mjs";
import { updateAvatar } from "../api/profile/index.mjs";
import { save } from "../storage/index.mjs";

const user = getUser();

const confirmChangesBtn = document.getElementById('confirmChangesBtn');
const avatarInput = document.getElementById('avatarInput');

confirmChangesBtn.addEventListener('click', async (event) => {
    event.preventDefault();

    try {
        const newAvatarUrl = avatarInput.value;
        await updateAvatar(user.name, newAvatarUrl);
        
        if (user) {
            user.avatar = newAvatarUrl;
            save('user', user);
            window.location.href = `/profile/`; 

        }        
    } catch (error) {
        console.error('Error updating avatar:', error.message);
        alert('Failed to update avatar. Please try again.');
    }
});