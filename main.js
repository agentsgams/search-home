
import { BatteryDisplay } from "./battery-display.js";
import { DateDisplay } from "./date-display.js";
import { TimeDisplay } from "./time-display.js";

const urlInput = document.getElementById('url-input');
const searchButton = document.getElementById('search-button');

let date = document.querySelector('.date')
let time = document.querySelector('.time')
let battery = document.querySelector('.battery')

function search() {
  const userInput = urlInput.value.trim();
  const urlRegex = /^(?:(?:https?):\/\/)?(?:(?!(?:www\.|m\.)).+\.)?((?:[a-z0-9\-]+\.)+[a-z]{2,}|localhost)(?:\/[^#?\s]+)?$/i;

  if (urlRegex.test(userInput)) {
    const formattedUrl = /^(?:http|https):\/\//i.test(userInput) ? userInput : `https://${userInput}`;
    window.location.href = formattedUrl;
  } else {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(userInput)}`;
    window.location.href = searchUrl;
  }
}

urlInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') { search() }
});

searchButton.onclick = function() { search() }

new BatteryDisplay(battery);
new DateDisplay(date);
new TimeDisplay(time);
