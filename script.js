const output = document.getElementById("output");
const errorDiv = document.getElementById("error");
const loading = document.getElementById("loading");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to create an image element and return a Promise
function downloadImage(image) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = image.url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${image.url}`));
  });
}

// Main function to download and display images
function downloadImages() {
  // Clear previous content
  output.innerHTML = "";
  errorDiv.textContent = "";
  loading.style.display = "block"; // Show loading spinner

  const downloadPromises = images.map(downloadImage);

  Promise.all(downloadPromises)
    .then((downloadedImages) => {
      loading.style.display = "none"; // Hide loading spinner

      downloadedImages.forEach((img) => {
        output.appendChild(img); // Display each image
      });
    })
    .catch((error) => {
      loading.style.display = "none"; // Hide loading spinner
      errorDiv.textContent = error.message; // Show error message
    });
}

// Event listener for button click
btn.addEventListener("click", downloadImages);
