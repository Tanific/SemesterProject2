import { getProfile } from "../api/profile/index.mjs";
import { load, save } from "../storage/index.mjs";
import { renderProfileListingTemplate } from "../templates/renderProfileListings.mjs"; 

export async function setReadProfileListener() {
    try {
        const { name, email } = load("user");

        const profileContainer = document.querySelector("#profileContainer");
        const profileListingsContainer = document.querySelector("#myListings");
        
        const loadingIndicator = document.createElement("div");
        loadingIndicator.className = "text-center my-4 loading-indicator";
        loadingIndicator.innerHTML = `
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading profile...</span>
            </div>
        `;
        
        if (profileListingsContainer) {
            profileListingsContainer.innerHTML = "";
            profileListingsContainer.appendChild(loadingIndicator);
        } else if (profileContainer) {
            const loadingWrapper = document.createElement("div");
            loadingWrapper.className = "profile-loading-wrapper";
            loadingWrapper.appendChild(loadingIndicator);
            profileContainer.appendChild(loadingWrapper);
        }
        
        const profile = await getProfile(name);
        
        const userData = load("user");
        userData.credits = profile.credits;
        save("user", userData);

        // Update UI elements
        const profileImage = document.querySelector("#profile-image");
        const profileName = document.querySelector("#profile-name");
        const profileEmail = document.querySelector("#profile-email");
        const profileCredits = document.querySelector("#profile-credits");
        const profileWins = document.querySelector("#profile-wins");

        // Remove loading indicator
        const existingIndicator = document.querySelector('.loading-indicator');
        if (existingIndicator) existingIndicator.remove();
        
        // Also remove the wrapper if it was created
        const loadingWrapper = document.querySelector('.profile-loading-wrapper');
        if (loadingWrapper) loadingWrapper.remove();

        profileName.textContent = name;
        profileEmail.textContent = "Email: " + email;
        profileWins.textContent = "Auctions won: " + profile.wins.length;
        profileCredits.textContent = "Available Credits: " + profile.credits;
        profileImage.src = profile.avatar || 'https://via.placeholder.com/150';

        profileListingsContainer.innerHTML = "";

        // Display listings or no-listings message
        if (profile.listings && profile.listings.length > 0) {
            profile.listings.forEach(listing => {
                const listingCard = renderProfileListingTemplate(listing);
                profileListingsContainer.appendChild(listingCard);
            });
        } else {
            // no listings
            const noListingsMessage = document.createElement("p");
            noListingsMessage.textContent = "No listings available.";
            profileListingsContainer.appendChild(noListingsMessage);
        }
    } catch (error) {
        console.error("Error loading profile:", error);
        const profileContainer = document.querySelector("#profileContainer");
        if (profileContainer) {
            profileContainer.innerHTML = `<div class="alert alert-danger">Error loading profile: ${error.message}</div>`;
        }
    }
}