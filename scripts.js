// cache the buttons for our quote generator
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');


let apiQuotes = [];

// Show New Quote
function newQuote() {
   // Pick a random quote from apiQuotes Array
   const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
   //Check if Author field is blank (null) and replace it with 'Unknown' else set the author text to the random author.
   if (!quote.author) {
      authorText.textContent = 'Unknown Author';
   } else {
      authorText.textContent = quote.author;
   }
   // Check quote length to determine styling
   if (quote.text.length > 50) {
      quoteText?.classList.add('long-quote');
   } else {
      quoteText?.classList.remove('long-quote');
   }
   // Set Quote Text to random quote text from array.
   quoteText.textContent = quote.text;
}

// Get Quotes from API
async function getQuotes() {
   const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
   try {
      const response = await fetch(apiUrl);
      apiQuotes = await response.json();
      newQuote();
   } catch (error) {
   // Catch error here
      console.log(error);
   }
}

// Tweet Quote
function tweetQuote() {
   const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
   window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteBtn?.addEventListener('click', newQuote)
twitterBtn?.addEventListener('click', tweetQuote)
//On Load
getQuotes();