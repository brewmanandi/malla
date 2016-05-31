import fs from 'fs';
import path from 'path';

let textCache;

const textFilePath = path.resolve(__dirname, 'mallaText.json');

function parseResponse(raw) {
  return {
    title: raw.title,
    siteName: raw.title,
    slogan: raw.label2,
    box1Title: raw.label4,
    box1Desc: raw.label6,
    box2Title: raw.label12,
    box2Desc: raw.label10,
    box3Title: raw.label8,
    box3Desc: raw.label14,
    signUpLong: raw.label16,
    question1: raw.label18,
    answer1: raw.label20,
    question2: raw.label22,
    answer2: raw.label24,
    question3: raw.label26,
    answer3: raw.label28,
    signIn: raw.label30,
    signUp: raw.label32,
    signOut: raw.label34,
    apiButtonShort: raw.label48,
    apiButtonLong: raw.label36,
    help: raw.label38,
    shareFacebookTooltip: raw.label40,
    shareTwitterTooltip: raw.label42,
    shareLinkedInTooltip: raw.label44,
    feedbackTooltip: raw.label46,
    betaDisclaimer: raw.label50,
  }
}

function fetchMallaText() {
  return fetch('http://www.malla.io/api/-KIu8pHPr8i9oyLh56Ok.json')
    .then(response => response.json())
    .then(data => {
      textCache = parseResponse(data);

      fs.writeFile(textFilePath, JSON.stringify(textCache, null, 2), 'utf8');

      return Promise.resolve(textCache);
    })
    .catch(err => {
      console.warn(`Error fetching Malla text: ${err}`);
    });
}

// kick off when the server starts
// and check every now and then
export function startListening() {
  fetchMallaText();

  setInterval(() => {
    fetchMallaText();
  }, 1000);
}

// as soon as text has been fetched once, it will be in textCache
// this returns a promise on the off change the first fetch isn't back
export function getText() {
  // if the fetch hasn't worked, use the local text file
  if (!textCache) {
    console.warn(`There was no cache for text. Loading from ${textFilePath}`);
    const text = fs.readFileSync(textFilePath, 'utf8');
    return Promise.resolve(JSON.parse(text));
  }
  
  return fetchMallaText();
}