function loadDocPicker() {

    const jsonPath = '/spec/docs.json';
    
    fetch(jsonPath)
        .then(response => response.json())
        .then(data => {
            const currentPage = window.location.pathname;
            const docPicker = document.querySelector('.doc-picker');

            const sortedData = data.sort((a, b) => {
                if (a.address === currentPage) return -1; // Move the current page item to the front
                if (b.address === currentPage) return 1;
                return 0; // No change in order for other items
            });

            // Create the row of buttons
            sortedData.forEach(item => {
                const imgButton = document.createElement('a');
                imgButton.href = item.address;
                imgButton.classList.add('doc-button');
                
                const img = document.createElement('img');
                img.src = item.address.endsWith(currentPage) ? '/assets/spec/doctab-current.png' : '/assets/spec/doctab.png'; // Use a different image for the current page
                img.alt = item.title;

                const titleText = document.createElement('span');
                titleText.textContent = item.title;
                titleText.classList.add('button-title');

                imgButton.appendChild(img);
                imgButton.appendChild(titleText);

                docPicker.appendChild(imgButton);
            });
        })
        .catch(error => {
            console.error('Error loading JSON:', error);
        });
}

document.addEventListener('DOMContentLoaded', loadDocPicker);

