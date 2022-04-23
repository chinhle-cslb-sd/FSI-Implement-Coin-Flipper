
/*
    Using all that i know from the CSS, JAVASCRIPT Introduction class
    Whatt's a big upgrade to my coding skills
    This class is Awesome!!
*/

// Set id to image anchor in HTML file
// Just to show that i can manually create HTML element 
// & creating elements using JavaScript from class lessons
let imgTag = document.getElementById('imageAnchor') 
imgTag.textContent = '' // clear image anchor text
// create img element inside imageAnchor div
let imgElement = document.createElement('img')
imgElement.setAttribute('id', 'penny-image')
imgTag.append(imgElement)

let pennyImage = document.getElementById('penny-image') 

// select all div to build a div tree to insert new element(s)
let selectAllDiv = document.querySelectorAll('div')
// create a div element to store buttons
let createDivForButtons = document.createElement('div')
createDivForButtons.setAttribute('class', 'controls')

// create a div element for "let's get rolling"
let createDivMessage = document.createElement('div')
createDivMessage.setAttribute('class', 'message-container')
let message = document.createElement('h3')
message.setAttribute('id', 'message')
message.textContent = 'Let\'s Get Rolling!'
createDivMessage.append(message)

// create flip button
let flipButton = document.createElement('button')
flipButton.setAttribute('id', 'flip')
flipButton.textContent = "Flip the Penny!"
createDivForButtons.append(flipButton)

// create clear button
let clearButton = document.createElement('button')
clearButton.setAttribute('id', 'clear')
clearButton.textContent = "Clear Scoreboard"
createDivForButtons.append(clearButton)


// TODO: Declare any global variables we need
// set public variables to be used
let numberOfHeads = 0;
let numberOfTails = 0;
let totalOfHeadsTails = 0;
let percentOfHeads = 0;
let percentOfTails = 0;

// set mouse events boolean
// didn't really understand event boolean
// until now! thanks Mr. Panos
let isNotMouseOver = true
let mouseIsNotClicked = true
let skipUpdatingText = false

    // random function to be called again if needed
    function flipRandomly() {
        return Math.random()>0.5
    }

    // function to flip heads & tails randomly
    function flipTheCoin() {
        
        if(flipRandomly()) { // trick or treat :)
            pennyImage.src = './assets/images/penny-heads.jpg' // set the source for heads image
            pennyImage.setAttribute('alt', 'Picture of head') // set alt for disability
                if(!skipUpdatingText) {
                    message.textContent = 'You\'ve got head!'
                }
        return true // return 0
        } else {
            pennyImage.src = './assets/images/penny-tails.jpg' // set the source for tails image
            pennyImage.setAttribute('alt', 'Picture of tails') // set alt for disability
                if(!skipUpdatingText) {
                    message.textContent = 'You\'ve got tail!'
                }
        return false // return 1
        }
           
    }

    // recurive function to keep folling the coin
    function rollingPenny() {
        setInterval(setTimeout(function() {
                // keeps flipping & rolling if mouse is not click
                if(mouseIsNotClicked) { // if you don't set this, 
                    // it will never stop rolling when you click
                    flipTheCoin()
                    rollingPenny()
                }
            }, 001)) // set to 001 :) hmm, look good to me when it spins
        }

    // a function to update heads || tails scoring
    function updateScoreBoard() {
        totalOfHeadsTails = numberOfHeads + numberOfTails
        // do the math
        if(totalOfHeadsTails>0) {
            percentOfHeads = Math.round(numberOfHeads/totalOfHeadsTails * 100) // thanks class for doing this
            percentOfTails = Math.round(numberOfTails/totalOfHeadsTails * 100) // :) didn't know how to get the posibility
        }

        // assign heads & tails value to global variable
        document.getElementById('heads').textContent = numberOfHeads
        document.getElementById('tails').textContent = numberOfTails
        // template (string) interpolation)
        document.getElementById('heads-percent').textContent = `${percentOfHeads}%`
        document.getElementById('tails-percent').textContent = `${percentOfTails}%`

    }

    // Create a function to set score board default values
    function resetScoreBoard() {
        numberOfHeads = 0;
        numberOfTails = 0;
        totalOfHeadsTails = 0;
        percentOfHeads = 0;
        percentOfTails = 0;
        message.textContent = "Let's get rolling!"
        pennyImage.src = './assets/images/penny-heads.jpg' // set the source for heads image
        updateScoreBoard() // update the score board to default (0)
        
    }
    
document.addEventListener('DOMContentLoaded', function () {
    // loop through div tree
    for(let i = 0; i < selectAllDiv.length; i++); 
    /* using static array assignment is an inappropriate approach
       this is for exploration into div tree as learning purposes
       for this practice
       */
    selectAllDiv[1].append(createDivForButtons)
    selectAllDiv[1].append(createDivMessage) 

    // ensure that the event load with preset values
    // i'm not sure if this is a best practice 
    // - but it is the best i can come up with
    if(mouseIsNotClicked && isNotMouseOver) {
        resetScoreBoard() // on page load, set to default values
        // when mouseClick and mouseOver not in action

        // Set listener for "Flip the Penny!" button
        // i don't have to place this click button in here
        // it looks mysterious and it works so - :)
        flipButton.addEventListener('click', function() {

            if(flipTheCoin()) {
                numberOfHeads++ // count number or Heads being clicked
            } else {
                numberOfTails++ // count number or Tails being clicked
            }
            mouseIsNotClicked=false // if mouse is clicked
            // update the score to each of the clicking
            updateScoreBoard()
        })

        // listen to mouse over event
        flipButton.addEventListener('mouseover', function() {
            rollingPenny() 
            mouseIsNotClicked=true // if mouse is not clicked, 
            // keep rolling when mouse is over the button
        }) 

    } 

        clearButton.addEventListener('click', function() {
            resetScoreBoard() // reset score board to default values
        })

        /* something can be upgraded everyday 
           calling it a day for now

           ADDED IMG WIDTH AND HEIGH IN CSS STYLE SHEET TO PREVENT IMAGE FROM JUMPING
           */

})