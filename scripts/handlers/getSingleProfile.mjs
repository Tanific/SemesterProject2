import { getProfile } from "../api/profile/getProfile.mjs";
import { load } from "../storage/index.mjs";

export async function setReadProfileListener() {

    const profileImage = document.querySelector("#profile-image");
    const profileName = document.querySelector("#profile-name");
    const profileEmail = document.querySelector("#profile-email");
    const profileCredits = document.querySelector("#profile-credits");


    const { name, email, credits } = load("user");
    const profile = await getProfile(name);
  
    profileName.textContent = "Name: " + name;
    profileEmail.textContent = "Email: " + email;
    profileCredits.textContent = "Available Credits: " + credits;
    profileImage.src = profile.avatar;
}

