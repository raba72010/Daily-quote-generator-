// Function to fetch a quote from ZenQuotes API
async function fetchQuoteFromZenQuotes(icon) {
    try {
        console.log(`Fetching a quote related to the selected category...`);
        const response = await fetch('https://zenquotes.io/api/random');

        console.log(`Response Status Code: ${response.status}`);
        if (!response.ok) {
            document.getElementById('quote').innerText = `Error ${response.status}: ${response.statusText}`;
            console.error(`HTTP error! Status: ${response.status}`);
            return;
        }

        const data = await response.json();
        console.log('API Response Data:', data);

        if (data.length > 0) {
            const quote = data[0].q; // Quote text
            const author = data[0].a || 'Unknown'; // Author
            document.getElementById('quote').innerText = `${quote} – ${author}`;
            document.getElementById('selected-icon').innerText = `Selected: ${icon}`;
        } else {
            console.warn('No data returned from ZenQuotes API.');
            document.getElementById('quote').innerText = 'No quotes available at the moment.';
        }
    } catch (error) {
        console.error('An error occurred while fetching the quote:', error);
        document.getElementById('quote').innerText = 'Failed to fetch a quote. Please check your connection and try again later.';
    }
}

// Function to render clickable icons for different categories
function renderIcons() {
    const iconContainer = document.getElementById('icon-container');
    const iconCategories = {
        'fa-smile': 'happiness',
        'fa-star': 'inspiration',
        'fa-heart': 'love'
    };

    for (const [iconClass, category] of Object.entries(iconCategories)) {
        const iconButton = document.createElement('button');
        iconButton.className = `icon-button fas ${iconClass}`;
        iconButton.addEventListener('click', () => {
            document.querySelectorAll('.icon-button').forEach(btn => btn.classList.remove('active'));
            iconButton.classList.add('active');
            fetchQuoteFromZenQuotes(iconClass);
        });
        iconContainer.appendChild(iconButton);
    }
}

// Call the function to render icons on page load
renderIcons();

// Event listener for the "New Quote" button to fetch a new random quote
document.getElementById('new-quote-btn').addEventListener('click', () => {
    fetchQuoteFromZenQuotes('New Quote');
});

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    console.log('Dark mode toggled');
}

// Attach event listener for dark mode button
document.getElementById('darkModeToggle').addEventListener('click', () => {
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
