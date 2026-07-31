
const API_KEY = "Gr3GUnZlQ6Xep7XhRfqncHZbEnpua0wnjToaszB8fYBFJwAPwtbhWNmS";

const categories = [
    "technology",
    "animals",
    "nature",
    "travel",
    "food",
    "sports",
    "business",
    "coding",
    "cars",
    "fashion",
    "fitness",
    "music",
    "gaming",
    "architecture",
    "space",
    "education",
    "health",
    "art"
];

const images = document.querySelectorAll(".card_img");

images.forEach(async (img, index) => {

    const category = categories[index];
    const cardImgContainer = img.closest(".card_img_container");

    try {

        const response = await fetch(
            `https://api.pexels.com/v1/search?query=${category}&per_page=15`,
            {
                headers: {
                    Authorization: API_KEY
                }
            }
        );

        const data = await response.json();

        if (data.photos.length > 0) {

            // Pick a random image from the 15 results
            const randomIndex = Math.floor(Math.random() * data.photos.length);

            img.src = data.photos[randomIndex].src.medium;

        } else {

            img.src = "https://via.placeholder.com/300x200?text=No+Image";

        }

    } catch (error) {

        console.error("Error loading image:", error);

        img.src = "https://via.placeholder.com/300x200?text=Error";

    } finally {

        // Remove shimmer placeholder once image is set
        if (cardImgContainer) {
            // Mark as loaded after a brief delay to let the src attribute take effect
            img.addEventListener("load", () => {
                cardImgContainer.classList.add("loaded");
            });
            img.addEventListener("error", () => {
                cardImgContainer.classList.add("loaded");
            });
            // Fallback: if image already loaded, remove shimmer
            if (img.complete) {
                cardImgContainer.classList.add("loaded");
            }
        }

    }

});
