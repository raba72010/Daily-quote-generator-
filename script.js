const quotes = [
    "The best way to predict the future is to invent it. – Alan Kay",
    "Do what you can, with what you have, where you are. – Theodore Roosevelt",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
    "Believe you can and you're halfway there. – Theodore Roosevelt",
    "Keep your face always toward the sunshine—and shadows will fall behind you. – Walt Whitman"
];

function generateQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById('quote').innerText = quotes[randomIndex];
}
function shareQuote() {
    const quoteText = document.getElementById('quote').innerText;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quoteText)}`;
    window.open(shareUrl, '_blank');
}

function generateQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quoteElement = document.getElementById('quote');
    quoteElement.style.opacity = 0; // Start with opacity 0 for fade-out

    setTimeout(() => {
        quoteElement.innerText = quotes[randomIndex];
        quoteElement.style.opacity = 1; // Fade-in the new quote
    }, 300);
}