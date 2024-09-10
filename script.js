document.getElementById('fetchDataBtn').addEventListener('click', () => {
    // Get the URL entered by the user
    const apiUrl = document.getElementById('api_url').value;

    // Clear previous results
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = 'Fetching data...';

    // Validate if the URL is provided
    if (!apiUrl) {
        resultContainer.innerHTML = 'Please provide a valid URL.';
        return;
    }

    // Fetch data from the provided API URL
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Clear the container
            resultContainer.innerHTML = '';

            // Check if the data contains records
            if (data.data && data.data.data.length > 0) {
                // Loop through each record in the data array
                data.data.data.forEach(call => {
                    const callDiv = document.createElement('div');
                    callDiv.classList.add('status-box');

                    const statusText = document.createElement('p');
                    statusText.textContent = `Status: ${call.status}`;

                    const createdAtText = document.createElement('p');
                    createdAtText.textContent = `Created at: ${call.created_at}`;

                    callDiv.appendChild(statusText);
                    callDiv.appendChild(createdAtText);

                    resultContainer.appendChild(callDiv);
                });
            } else {
                resultContainer.innerHTML = 'No data available.';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            resultContainer.innerHTML = 'Error fetching data. Please check the URL or try again.';
        });
});
