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

function generateQuote() {
    const isArabic = document.body.classList.contains('rtl');
    const randomIndex = Math.floor(Math.random() * (isArabic ? arabicQuotes.length : quotes.length));
    const quoteElement = document.getElementById('quote');
    const selectedQuote = isArabic ? arabicQuotes[randomIndex] : quotes[randomIndex];
    
    quoteElement.style.opacity = 0;

    setTimeout(() => {
        quoteElement.innerText = selectedQuote;
        quoteElement.style.opacity = 1;
    }, 300);
}

document.getElementById('toggle-language').addEventListener('click', () => {
    document.body.classList.toggle('rtl');
    const isArabic = document.body.classList.contains('rtl');

    document.getElementById('header-title').innerText = isArabic ? "مولد الاقتباسات" : "Quote Generator";
    document.getElementById('new-quote-btn').innerText = isArabic ? "اقتباس جديد" : "New Quote";
    document.getElementById('share-quote-btn').