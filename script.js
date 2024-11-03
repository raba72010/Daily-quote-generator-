// List of English and Arabic quotes
const quotes = [
    "The best way to predict the future is to invent it. – Alan Kay",
    "Do what you can, with what you have, where you are. – Theodore Roosevelt",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
    "Believe you can and you're halfway there. – Theodore Roosevelt",
    "Keep your face always toward the sunshine—and shadows will fall behind you. – Walt Whitman"
];

const arabicQuotes = [
    "أفضل وسيلة للتنبؤ بالمستقبل هي اختراعه. – آلان كاي",
    "افعل ما تستطيع، بما تملك، حيث أنت. – ثيودور روزفلت",
    "النجاح ليس نهائيًا، والفشل ليس قاتلاً: الشجاعة على الاستمرار هي التي تهم. – ونستون تشرشل",
    "آمن بأنك تستطيع، وستكون قد قطعت نصف الطريق. – ثيودور روزفلت",
    "اجعل وجهك دائمًا باتجاه الشمس، وستقع الظلال خلفك. – والت ويتمان"
];

// Function to generate a new quote
function generateQuote() {
    const isArabic = document.body.classList.contains('rtl');
    const randomIndex = Math.floor(Math.random() * (isArabic ? arabicQuotes.length : quotes.length));
    const quoteElement = document.getElementById('quote');
    const selectedQuote = isArabic ? arabicQuotes[randomIndex] : quotes[randomIndex];

    quoteElement.style.opacity = 0; // Fade out

    setTimeout(() => {
        quoteElement.innerText = selectedQuote;
        quoteElement.style.opacity = 1; // Fade in
    }, 300);
}

// Function to share the current quote
function shareQuote() {
    const quoteElement = document.getElementById('quote');
    const quoteText = quoteElement.innerText;

    if (quoteText === "Click the button to generate a motivational quote!" || quoteText === "اضغط على الزر لتوليد اقتباس تحفيزي!") {
        alert("Please generate a quote before sharing.");
        return;
    }

    // Share API for modern browsers
    if (navigator.share) {
        navigator.share({
            title: 'Motivational Quote',
            text: quoteText,
            url: window.location.href
        }).then(() => {
            console.log('Quote shared successfully');
        }).catch((error) => {
            console.error('Error sharing the quote:', error);
        });
    } else {
        // Fallback for browsers without the Share API
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quoteText)}`;
        window.open(shareUrl, '_blank');
    }
}

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.class