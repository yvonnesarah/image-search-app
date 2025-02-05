// Access key for the Unsplash API (to authenticate requests)
const accessKey = "oUvQp6_ae4I6i9fYxdadI9vAG5SW2odvxeUAsToyWmk";

// Get references to the DOM elements
const formEl = document.querySelector("form"); // Form element
const searchInputEl = document.getElementById("search-input"); // Search input field
const searchResultsEl = document.querySelector(".search-results"); // Container for search results
const showMoreButtonEl = document.getElementById("show-more-button"); // "Show more" button

let inputData = ""; // Variable to store user input (search query)
let page = 1; // Variable to track the current page of search results

// Function to search for images from the Unsplash API
async function searchImages() {
  inputData = searchInputEl.value; // Get the search input value
  // Build the API URL with search query and page number
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  // Fetch data from the Unsplash API
  const response = await fetch(url);
  const data = await response.json(); // Parse the JSON response

  // If it's the first page of results, clear the previous search results
  if (page === 1) {
    searchResultsEl.innerHTML = "";
  }

  // Extract the results (images) from the API response
  const results = data.results;

  // Loop through each result and create HTML elements for each image
  results.map((result) => {
    // Create a div to wrap the image and link
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result"); // Add a class for styling

    // Create an image element and set its source
    const image = document.createElement("img");
    image.src = result.urls.small; // Set the image source URL
    image.alt = result.alt_description; // Set the alt text for the image

    // Create a link for the image that opens in a new tab
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html; // Link to the image's page on Unsplash
    imageLink.target = "_blank"; // Open the link in a new tab
    imageLink.textContent = result.alt_description; // Use the alt description as link text

    // Append the image and link to the image wrapper
    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);

    // Append the image wrapper to the search results container
    searchResultsEl.appendChild(imageWrapper);
  });

  // Increment the page number for the next set of results
  page++;

  // Show the "Show more" button if it's not the first page
  if (page > 1) {
    showMoreButtonEl.style.display = "block"; // Display the "Show more" button
  }
}

// Event listener for form submission (when user presses Enter or submits the form)
formEl.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the default form submission (page reload)
  page = 1; // Reset the page to 1 when starting a new search
  searchImages(); // Call the function to search for images
});

// Event listener for clicking the "Show more" button to load more images
showMoreButtonEl.addEventListener("click", () => {
  searchImages(); // Call the function to load more images
});
