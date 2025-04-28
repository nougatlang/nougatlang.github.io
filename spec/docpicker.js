// Function to load the JSON and create the link buttons
function loadDocPicker() {
    // Path to your JSON file
    const jsonPath = '/spec/docs.json'; // Adjust this to your actual JSON path

    // Fetch the JSON data
    fetch(jsonPath)
        .then(response => response.json())
        .then(data => {
            const currentPage = window.location.pathname; // Current page address
            const docPicker = document.querySelector('.doc-picker'); // The div where we will insert the buttons

            // Sort the data based on whether the address matches the current page
            const sortedData = data.sort((a, b) => {
                if (a.address === currentPage) return -1; // Move the current page item to the front
                if (b.address === currentPage) return 1;
                return 0; // No change in order for other items
            });

            // Create the row of buttons
            sortedData.forEach(item => {
                // Create an <img> element for each address and title
                const imgButton = document.createElement('a');
                imgButton.href = item.address; // Set the link to the address
                imgButton.classList.add('doc-button');
                
                const img = document.createElement('img');
                img.src = item.address.endsWith(currentPage) ? '/assets/spec/doctab-current.png' : '/assets/spec/doctab.png'; // Use a different image for the current page
                img.alt = item.title;

                // Create a span to hold the title text inside the button
                const titleText = document.createElement('span');
                titleText.textContent = item.title;
                titleText.classList.add('button-title');

                // Append elements to the button
                imgButton.appendChild(img);
                imgButton.appendChild(titleText);

                // Append the button to the doc-picker
                docPicker.appendChild(imgButton);
            });
        })
        .catch(error => {
            console.error('Error loading JSON:', error);
        });
}

// Call the function when the document is ready
document.addEventListener('DOMContentLoaded', loadDocPicker);

