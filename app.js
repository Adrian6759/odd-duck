'use strict';

// #pragma: Global Variables
let duckVotes = 25;
let duckArray = [];
let randomDuckArray = [];


//pragma: Dom References
let imgContainer = document.getElementById('image-container');
let resultsBtn = document.getElementById('display-results-button');
let resultList = document.getElementById('results-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let chartContext = document.getElementById('my-chart').getContext('2d');


//Constructor
function Duck(name, imgFile = 'jpg') {
  this.name = name;
  this.imagePath = `images/${name}.${imgFile}`;
  this.imageShown = 0;
  this.imageClicks = 0;
}

//Chart Object


// #pragma: Helper Functions - Utilities
//Grabbed from MDN Docs
function randomDuck(name, imagePath) {
  return Math.floor(Math.random() * duckArray.length);

}

function renderImages() {
  while (randomDuckArray.length < 6) {
    let randomDucks = randomDuck();
    if (!randomDuckArray.includes(randomDucks)) {
      randomDuckArray.push(randomDucks);
    }
  }
  let imageOneDuck = randomDuckArray.shift();
  let imageTwoDuck = randomDuckArray.shift();
  let imageThreeDuck = randomDuckArray.shift();


  imgOne.src = duckArray[imageOneDuck].imagePath;
  imgTwo.src = duckArray[imageTwoDuck].imagePath;
  imgThree.src = duckArray[imageThreeDuck].imagePath;

  imgOne.alt = duckArray[imageOneDuck].name;
  imgTwo.alt = duckArray[imageTwoDuck].name;
  imgThree.alt = duckArray[imageThreeDuck].name;

  duckArray[imageOneDuck].imageShown++;
  duckArray[imageTwoDuck].imageShown++;
  duckArray[imageThreeDuck].imageShown++;
}

// #pragma Create Object Using Constructor
let bag = new Duck('bag');
let banana = new Duck('banana');
let bathroom = new Duck('bathroom');
let boots = new Duck('boots');
let breakfast = new Duck('breakfast');
let bubblegum = new Duck('bubblegum');
let chair = new Duck('chair');
let cthulhu = new Duck('cthulhu');
let dog = new Duck('dog-duck');
let dragon = new Duck('dragon');
let pen = new Duck('pen');
let pet = new Duck('pet-sweep');
let scissors = new Duck('scissors');
let shark = new Duck('shark');
let sweep = new Duck('sweep', 'png');
let tauntaun = new Duck('tauntaun');
let unicorn = new Duck('unicorn');
let water = new Duck('water-can');
let wine = new Duck('wine-glass');

duckArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dog, dragon, pen, pet, scissors, shark, sweep, tauntaun, unicorn, water, wine);

renderImages();


//Step 3: Define our Callback
function handleImageClick(event) {

  let duckClicked = event.target.alt;
  for (let i = 0; i < duckArray.length; i++) {
    if (duckArray[i].name === duckClicked) {
      duckArray[i].imageClicks++;
      console.log(duckArray[i]);
      duckVotes--;
      renderImages();
    }
  }

  if (duckVotes === 0) {
    imgContainer.removeEventListener('click', handleImageClick);

  }
}

function handleResultsClick() {
  if (duckVotes === 0) {
    for (let i = 0; i < duckArray.length; i++) {
      let liElem = document.createElement('li');
      liElem.textContent = `${duckArray[i].name} was viewed: ${duckArray[i].imageShown} time(s) and clicked ${duckArray[i].imageClicks} time(s). ${duckArray[i].name} was clicked ${Math.round(duckArray[i].imageClicks / duckArray[i].imageShown * 100)}% of the time it was shown`;

      resultList.appendChild(liElem);
    }
    resultsBtn.removeEventListener('click', handleResultsClick);
    let duckNames = [];
    let duckShown = [];
    let duckClicks = [];
    for (let i = 0; i < duckArray.length; i++) {
      duckNames.push(duckArray[i].name);
      duckShown.push(duckArray[i].imageShown);
      duckClicks.push(duckArray[i].imageClicks);
    }
    let chartConfig = {
      type: 'bar',
      data: {
        datasets: [{
          label: '# Shown',
          data: duckShown,
          backgroundColor: 'green',
        }, {
          label: '# Clicked',
          data: duckClicks,
          backgroundColor: 'yellow'
        }],
        labels: duckNames,
      },
      options: {

      },
    };
    const myChart = new Chart(chartContext, chartConfig);
  }
}
// Step 2 Attach Event Listener: (type of event, callback function)
imgContainer.addEventListener('click', handleImageClick);

resultsBtn.addEventListener('click', handleResultsClick);

