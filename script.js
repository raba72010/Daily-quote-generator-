// Function to fetch a new quote
async function newQuote() {
    try {
        const response = await fetch('https://zenquotes.io/api/random');
        if (!response.ok) {
            throw new Error('Failed to fetch a new quote');
        }

        const data = await response.json();
        const quoteText = data[0].q + " – " + data[0].a;
        document.getElementById('quote').innerText = quoteText;
        document.getElementById('quote-box').classList.add('fade-in');
        setTimeout(() => {
            document.getElementById('quote-box').classList.remove('fade-in');
        }, 1000);
    } catch (error) {
        console.error('Error fetching new quote:', error);
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

// Function to copy the current quote to the clipboard
function copyQuote() {
    const quote = document.getElementById('quote').innerText;
    navigator.clipboard.writeText(quote).then(() => {
        alert('Quote copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
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