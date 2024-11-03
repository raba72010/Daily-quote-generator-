// Function to fetch a random quote from an external API
async function fetchQuote() {
    try {
        const response = await fetch('https://api.quotable.io/random'); // Use a reliable quote API
        const data = await response.json();
        document.getElementById('quote').innerText = `${data.content} – ${data.author}`;
    } catch (error) {
        console.error('Error fetching quote:', error);
        document.getElementById('quote').innerText = 'Failed to fetch a new quote. Please try again later.';
    }
}

// Update the event listener for generating quotes
document.getElementById('new-quote-btn').addEventListener('click', fetchQuote);