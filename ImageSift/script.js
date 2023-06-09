const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const imageGallery = document.getElementById('image-gallery');
const imageCountSelect = document.getElementById('image-count');

// Event listener for search button click
searchButton.addEventListener('click', searchImages);

// Event listener for Enter key press in the search input
searchInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    searchImages();
  }
});

// Function to fetch images from the Unsplash API
async function searchImages() {
  const query = searchInput.value;
  const clientId = 'kI93GhUsxLwEYeO_Licn9m6JN0ze2SOURw-CDuS3fOI'; // Replace with your own Unsplash access key
  const numberOfImages = imageCountSelect.value; // Retrieve the selected image count

  const apiUrl = `https://api.unsplash.com/search/photos?page=1&query=${query}&per_page=${numberOfImages}&client_id=${clientId}`;

  // Clear previous search results
  imageGallery.innerHTML = '';

  // Show loading animation
  imageGallery.innerHTML = '<div class="loader"></div>';

  try {
    // Fetch images
    const response = await fetch(apiUrl);
    const data = await response.json();

    imageGallery.innerHTML = ''; // Clear the loading animation

    data.results.forEach(result => {
      const imageCard = document.createElement('div');
      imageCard.classList.add('image-card');

      const image = document.createElement('img');
      image.src = result.urls.regular;

      imageCard.appendChild(image);
      imageGallery.appendChild(imageCard);
    });
  } catch (error) {
    console.log(error);
    imageGallery.innerHTML = '<div class="error">Error occurred while loading images.</div>'; // Show error message
  }
}
