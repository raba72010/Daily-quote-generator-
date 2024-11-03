const API_NINJAS_URL = 'https://api.api-ninjas.com/v1/quotes';
const API_NINJAS_KEY = 'qNTM4mVdrBxgl03u5uc+4g==pc2B41oPw2e19NB8'; // Your API key

// Function to fetch quotes by keyword for a specific category
async function fetchQuoteByCategory(keyword) {
    try {
        console.log(`Fetching quotes related to "${keyword}"...`);
        const response = await fetch(`${API_NINJAS_URL}?category=${encodeURIComponent(keyword)}`, {
            headers: {
                'X-Api-Key': API_NINJAS_KEY
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Quote fetched:', data);
        
        if (data.length > 0) {
            const quote = data[0].quote;
            const author = data[0].author || 'Unknown';
            document.getElementById('quote').innerText = `${quote} – ${author}`;
        } else {
            document.getElementById('quote').innerText = 'No quotes available for this category.';
        }
    } catch (error) {
        console.error(`Error fetching quotes for category "${keyword}":`, error);
        document.getElementById('quote').innerText = 'Failed to fetch a quote. Please try again later.';
    }
}

// Function to render clickable emojis for different categories
function renderEmojis() {
    const emojiContainer = document.getElementById('emoji-container');
    const emojiCategories = {
        '💪': 'strength',
        '😊': 'happiness',
        '✨': 'hope',
        '❤️': 'love'
    };

    for (const [emoji, keyword] of Object.entries(emojiCategories)) {
        const emojiButton = document.createElement('button');
        emojiButton.className = 'emoji-button';
        emojiButton.innerText = emoji;
        emojiButton.addEventListener('click', () => {
            fetchQuoteByCategory(keyword);
        });
        emojiContainer.appendChild(emojiButton);
    }
}

// Call this function to render emojis on page load
renderEmojis();

// Event listener for the "New Quote" button to fetch a default quote
document.getElementById('new-quote-btn').addEventListener('click', () => {
    fetchQuoteByCategory('inspirational');
});

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
        });
    } else {
        alert('Sharing is not supported on this browser.');
    }
});