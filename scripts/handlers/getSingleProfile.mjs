import { getProfile } from "../api/profile/index.mjs";
import { load } from "../storage/index.mjs";
import { renderProfileListingTemplate } from "../templates/renderProfileListings.mjs"; 

export async function setReadProfileListener() {
    const profileImage = document.querySelector("#profile-image");
    const profileName = document.querySelector("#profile-name");
    const profileEmail = document.querySelector("#profile-email");
    const profileCredits = document.querySelector("#profile-credits");
    const profileWins = document.querySelector("#profile-wins");
    const profileListingsContainer = document.querySelector("#myListings");


    const { name, email, credits, wins = [] } = load("user");
    const profile = await getProfile(name);
  
    profileName.textContent = name;
    profileEmail.textContent = "Email: " + email;
    profileWins.textContent = "Auctions won: " + wins.length;
    profileCredits.textContent = "Available Credits: " + credits;
    profileImage.src = profile.avatar;

    if (profile.listings && profile.listings.length > 0) {
        profile.listings.forEach(listing => {
            const listingCard = renderProfileListingTemplate(listing);
            profileListingsContainer.appendChild(listingCard);
        });
    } else {
        // Handle the case when there are no listings
        const noListingsMessage = document.createElement("p");
        noListingsMessage.textContent = "No listings available.";
        profileListingsContainer.appendChild(noListingsMessage);
    }
}