import { createListing } from "../api/listings/index.mjs";
import { getAccessToken } from "../utils/getAccessToken.mjs";
import * as alert from "../utils/showAlert.mjs"

//handler to create listings with title, description, deadline, media gallery (separate with comma)
export function setCreateListingListener() {
    const form = document.querySelector("#newListing");

    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const formData = new FormData(form);
            const listing = Object.fromEntries(formData.entries());

            if (listing.endsAt) {
                const enteredDeadline = new Date(listing.endsAt);
                const currentDate = new Date();

                if (enteredDeadline < currentDate) {
                    alert.showAlertError("Please choose a future date and time for the deadline");
                    return;
                }

                listing.endsAt = enteredDeadline.toISOString();
            }

            if (!listing.media) {
                listing.media = [];
            } else {
                listing.media = listing.media.split(",").map(media => media.trim());
            }
        //check for accesstoken. redirect to login page if unauthorized
            try {
                const accessToken = getAccessToken();
                if (!accessToken) {
                    alert.showAlertError("Unauthorized request");
                    setTimeout(() => {
                        window.location.href = '/authentication/login/';
                    }, 2400);
                    return;
                }
                await createListing(listing);
                alert.showAlertSuccess("Successfully created listing");
                setTimeout(() => {
                    window.location.href = '/';
                }, 2400);
            } catch (error) {
                alert.showAlertError(error);
            }
        });
    }
}