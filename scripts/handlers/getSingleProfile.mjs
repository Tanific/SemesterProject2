import { getProfile } from "../api/profile/index.mjs";
import { load } from "../storage/index.mjs";

export async function setReadProfileListener() {

    const profileImage = document.querySelector("#profile-image");
    const profileName = document.querySelector("#profile-name");
    const profileEmail = document.querySelector("#profile-email");
    const profileCredits = document.querySelector("#profile-credits");
    const profileWins = document.querySelector("#profile-wins");

    const { name, email, credits, wins = [] } = load("user");
    const profile = await getProfile(name);
  
    profileName.textContent = name;
    profileEmail.textContent = "Email: " + email;
    profileWins.textContent = "Auctions won: " + wins.length;
    profileCredits.textContent = "Available Credits: " + credits;

    profileImage.src = profile.avatar;
}

