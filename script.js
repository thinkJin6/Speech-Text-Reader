'use strict';

const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textArea = document.getElementById('text');
const btnRead = document.getElementById('read');
const btnToggle = document.getElementById('toggle');
const btnClose = document.getElementById('close');

const data = [
  {
    image: 'img/drink.jpg',
    text: "I'm Thirsty",
  },
  {
    image: 'img/food.jpg',
    text: "I'm Hungry",
  },
  {
    image: 'img/tired.jpg',
    text: "I'm Tired",
  },
  {
    image: 'img/hurt.jpg',
    text: "I'm Hurt",
  },
  {
    image: 'img/happy.jpg',
    text: "I'm Happy",
  },
  {
    image: 'img/angry.jpg',
    text: "I'm Angry",
  },
  {
    image: 'img/sad.jpg',
    text: "I'm Sad",
  },
  {
    image: 'img/scared.jpg',
    text: "I'm Scared",
  },
  {
    image: 'img/outside.jpg',
    text: 'I Wanna Go Outside',
  },
  {
    image: 'img/home.jpg',
    text: 'I Wanna Go Home',
  },
  {
    image: 'img/school.jpg',
    text: 'I Wanna Go To School',
  },
  {
    image: 'img/grandma.jpg',
    text: 'I Wanna Go To Granmas',
  },
];

// Create speech boxes
const createBox = function (item) {
  const box = document.createElement('div');

  const { image, text } = item;

  box.classList.add('box');
  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>  
  `;

  box.addEventListener('click', function () {
    setTextMessage(text);
    speakText();

    // Add active effect
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });

  main.appendChild(box);
};

// Init speech synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];
const getVoices = function () {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
};

// Set text
const setTextMessage = function (text) {
  message.text = text;
};

// Speak Text
const speakText = function () {
  speechSynthesis.speak(message);
};

// Set voice
const setVoice = function (e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
};

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

getVoices();
data.forEach(createBox);

// Toggle the text box
btnToggle.addEventListener('click', function () {
  document.getElementById('text__box').classList.toggle('show');
});

// Close button
btnClose.addEventListener('click', function () {
  document.getElementById('text__box').classList.remove('show');
});

// Change voice
voicesSelect.addEventListener('change', setVoice);

// Read Text button
btnRead.addEventListener('click', function () {
  setTextMessage(textArea.value);
  speakText();
});
