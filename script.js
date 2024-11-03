const API_QUOTABLE_URL = 'https://api.quotable.io/random';

// Function to fetch a quote from the new Quotable API
async function fetchQuote() {
    try {
        console.log('Fetching a new quote...');
        const response = await fetch(API_QUOTABLE_URL);

        // Check if the response is ok
        if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status}`);
            document.getElementById('quote').innerText = `Error ${response.status}: ${response.statusText}`;
            return;
        }

        const data = await response.json();
        console.log('API response:', data);

        const quote = data.content;
        const author = data.author || 'Unknown';
        document.getElementById('quote').innerText = `${quote} – ${author}`;
    } catch (error) {
        console.error('Error fetching a quote:', error);
        document.getElementById('quote').innerText = 'Failed to fetch a quote. Please try again later.';
        alert(`Error fetching quotes: ${error.message}`);
    }
}

// Event listener for the "New Quote" button to fetch a new quote
document.getElementById('new-quote-btn').addEventListener('click', fetchQuote);

// Function to render clickable emojis for different categories (static for now)
function renderEmojis() {
    const emojiContainer = document.getElementById('emoji-container');
    const emojis = ['😊', '✨', '❤️']; // Static emojis without specific categories

    emojis.forEach(emoji => {
        const emojiButton = document.createElement('button');
        emojiButton.className = 'emoji-button';
        emojiButton.innerText = emoji;
        emojiButton.addEventListener('click', fetchQuote);
        emojiContainer.appendChild(emojiButton);
    });
}

// Call this function to render emojis on page load
renderEmojis();

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    console.log('Dark mode toggled');
}

// Attach event listener for dark mode button
document.getElementById('darkModeToggle').addEventListener('click', () => {
    console.log('Dark Mode button clicked');
    toggleDarkMode();
});

// Share quote functionality
document.getElementById('share-quote-btn').addEventListener('click', () => {
    const quoteElement = document.getElementById('quote').innerText;
    if (navigator.share) {
        navigator.share({
            title: 'Motivational Quote',
            text: quoteElement,
            url: window.location.href
        }).then(() => {
            console.log('Quote shared successfully');
        }).catch((error) => {
            console.error('Error sharing the quote:', error);
            alert(`Sharing failed: ${error.message}`);
        });
    } else {
        alert('Sharing is not supported on this browser.');
    }
});
