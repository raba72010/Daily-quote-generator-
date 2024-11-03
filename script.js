// Function to fetch a new quote from the Ninja API
async function newQuote() {
    try {
        const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
            headers: {
                'X-Api-Key': 'qNTM4mVdrBxgl03u5uc+4g==pc2B41oPw2e19NB8'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch the quote');
        }

        const data = await response.json();
        // Assuming the API returns an array of quotes
        document.getElementById('quote').innerText = data[0].quote + " – " + data[0].author;
    } catch (error) {
        console.error('Error fetching quote:', error);
        document.getElementById('quote').innerText = 'Failed to fetch a new quote. Please try again later.';
    }
}

// Function to share the current quote
function shareQuote() {
    const quote = document.getElementById('quote').innerText;
    if (navigator.share) {
        navigator.share({
            title: 'Inspirational Quote',
            text: quote,
        }).catch(() => alert("Sharing not supported on this browser."));
    } else {
        alert("Sharing not supported on this browser.");
    }
}

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Event listeners for emojis to generate a new quote when clicked
document.querySelectorAll('.emoji-bar span').forEach(emoji => {
    emoji.addEventListener('click', newQuote);
});

// Adding event listener for the "New Quote" button
document.querySelector('button[onclick="newQuote()"]').addEventListener('click', newQuote);