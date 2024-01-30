import { createListing } from "../api/listings/index.mjs";

export function setCreateListingListener() {
    const form = document.querySelector("#newListing");

    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const formData = new FormData(form);
            const listing = Object.fromEntries(formData.entries());

            if (listing.endsAt) {
                listing.endsAt = new Date(listing.endsAt).toISOString();
            }

            if (!listing.media) {
                listing.media = [];
            } else {
                listing.media = listing.media.split(",").map(media => media.trim());
            }

            try {
                await createListing(listing);
            } catch (error) {
                console.error("Error creating listing:", error);
            }
        });
    }
}
