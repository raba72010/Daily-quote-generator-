// Array of quotes for the app
const quotes = [
    "Too much good fortune can make you smug and unaware. Happiness should be like an oasis, the greener for the desert that surrounds it. – Rachel Field",
    "The only way to achieve the impossible is to believe it is possible. – Charles Kingsleigh",
    "You only live once, but if you do it right, once is enough. – Mae West",
    "In the end, we will remember not the words of our enemies, but the silence of our friends. – Martin Luther King Jr.",
    "Life is really simple, but we insist on making it complicated. – Confucius"
];

// Function to display a new random quote
function newQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById('quote').innerText = quotes[randomIndex];
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