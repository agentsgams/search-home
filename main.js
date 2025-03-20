import { BatteryDisplay } from "./battery-display.js";
import { DateDisplay } from "./date-display.js";
import { TimeDisplay } from "./time-display.js";

const urlInput = document.getElementById('url-input');
const searchButton = document.getElementById('search-button');

const date = document.querySelector('.date');
const time = document.querySelector('.time');
const battery = document.querySelector('.battery');

const config = document.querySelector('.config');
const configClose = document.querySelector('.close-button');
const modal = document.querySelector('#config-modal');
const savebtn = document.querySelector('#save-button');
const srchengine = document.querySelector('#search-engine');

var searchEngine = "google";

// Typewriter Config
const phrases = [
  "Where do you want to go to...?",
  "Search anywhere or type an URL...",
  "Get to typing..!",
  "Find what you need online here..."
];
let typingSpeed = 50;
let deletingSpeed = 80;
let loopDelay = 1000;

function search() {
  const userInput = urlInput.value.trim();
  const urlRegex = /^(?:(?:https?):\/\/)?(?:(?!(?:www\.|m\.)).+\.)?((?:[a-z0-9\-]+\.)+[a-z]{2,}|localhost)(?:\/[^#?\s]+)?$/i;

  if (urlRegex.test(userInput)) {
    const formattedUrl = /^(?:http|https):\/\//i.test(userInput) ? userInput : `https://${userInput}`;
    window.location.href = formattedUrl;
  } else {
    var temp
    switch (searchEngine) { case "google":temp="https://www.google.com/search?q=";break }
    const searchUrl = `${temp}${encodeURIComponent(userInput)}`;
    window.location.href = searchUrl;
  }
}

urlInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') { search() }
});

config.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent default anchor behavior
  modal.style.display = "block";
});

// Close the modal when the close button is clicked
configClose.addEventListener("click", () => {
  modal.style.display = "none";
});

searchButton.onclick = function() { search() }
savebtn.onclick = function() { searchEngine = srchengine.value }



let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

function type() {
  const currentPhrase = phrases[currentPhraseIndex];
  if (isDeleting) {
    // deleting
    if (currentCharIndex > 0) {
      urlInput.placeholder = currentPhrase.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      setTimeout(type, deletingSpeed);
    } else {
      isDeleting = false;
      currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
      setTimeout(type, loopDelay);
    }
  } else {
    // typing
    if (currentCharIndex < currentPhrase.length) {
      urlInput.placeholder = currentPhrase.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      setTimeout(type, typingSpeed);
    } else {
      isDeleting = true;
      setTimeout(type, loopDelay);
    }
  }
}


new BatteryDisplay(battery);
new DateDisplay(date);
new TimeDisplay(time);
type();
