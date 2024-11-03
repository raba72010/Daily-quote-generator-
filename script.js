// Function to fetch a quote by keyword
async function fetchQuoteByKeyword(keyword) {
    try {
        const response = await fetch(`https://zenquotes.io/keywords/${keyword}`);
        if (!response.ok) {
            throw new Error('Failed to fetch the quote by keyword');
        }

        const data = await response.json();
        document.getElementById('quote').innerText = data[0].q + " – " + data[0].a;
    } catch (error) {
        console.error('Error fetching quote by keyword:', error);
        document.getElementById('quote').innerText = 'Failed to fetch a quote. Please try again later.';
    }
}

// Other existing functions like newQuote, shareQuote, toggleDarkMode, etc.

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
        }).catch(() => console.log("Sharing failed or was canceled by the user."));
    } else {
        console.log("Sharing not supported on this browser.");
    }
}

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    // Save dark mode preference in local storage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.removeItem('darkMode');
    }
}

// Check local storage for dark mode preference
window.onload = () => {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
};

// Adding event listener for the "New Quote" button
document.querySelector('button[onclick="newQuote()"]').addEventListener('click', () => newQuote("general"));