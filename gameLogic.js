// Data for the game
var gameData = {
    backgroundImages: ['PG 10.png', 'PG 21.png', 'PG 22.png', 'PG 23.png'],
    microMeditations: [
        "\"Feel my breath on your neck...\"",
        "\"Trace a finger down your spine...\"",
        "\"Imagine our fingers entwined, warm...\"",
        "\"My voice, a caress in your ear...\"",
        "\"Close your eyes, feel my presence...\"",
        "\"Our heartbeats sync, slow, steady...\""
    ],
    scenes: [
        {
            description: "In the dimly lit room, a woman with fiery red hair locks eyes with you, her presence a blend of mystery and allure.",
            options: ["Ask about her mysterious aura.", "Praise her captivating beauty.", "Stay silent, waiting for her cue."]
        }
        // More scenes can be added here
    ]
};

var backgroundImageIndex = 0;
var sceneIndex = 0;
var textElements;
var microMeditationElement;
var optionsContainer;

// Initializes the game
function initGame() {
    textElements = document.querySelectorAll('.scene-description, .option');
    microMeditationElement = document.querySelector('.micro-meditation');
    optionsContainer = document.getElementById('optionsContainer');

    showScene(sceneIndex);
}

// Changes the background image and handles scene transitions
function changeBackground(index) {
    if (index >= gameData.backgroundImages.length) {
        return; // No more changes
    }

    // Fade out the current text before changing the background
    fadeOutText();

    // Delay for micro-meditation message before changing the background
    setTimeout(showMicroMeditation, 2300);

    // Start the background transition after the micro-meditation message
    setTimeout(function() {
        var fadeOverlay = document.querySelector('.fade-overlay');
        fadeOverlay.style.opacity = 1;

        // Change the background after the fade to black
        setTimeout(function() {
            backgroundImageIndex = index;
            var backgroundDiv = document.querySelector('.background');
            backgroundDiv.style.backgroundImage = "url('" + gameData.backgroundImages[backgroundImageIndex] + "')";

            // Fade from black and then fade in the new text
            setTimeout(function() {
                fadeOverlay.style.opacity = 0;
                // Move to the next scene if available
                sceneIndex = (sceneIndex + 1) % gameData.scenes.length;
                showScene(sceneIndex);
            }, 5300); // Time for fading from black
        }, 5300); // Time for fading to black
    }, 800); // Initial delay before starting the transition
}

// Shows the current scene
function showScene(index) {
    var scene = gameData.scenes[index];
    if (!scene) return;

    var descriptionElement = document.querySelector('.scene-description');
    descriptionElement.innerHTML = scene.description;

    var optionsHtml = scene.options.map(function(option, idx) {
        return '<div class="option" onclick="changeBackground(' + (idx + 1) + ')">' + option + '</div>';
    }).join('');

    optionsContainer.innerHTML = optionsHtml;

    fadeInText();
}

// Fades out text elements and option buttons
function fadeOutText() {
    var descriptionElement = document.querySelector('.scene-description');
    var optionButtons = document.querySelectorAll('.option');

    // Fade out the scene description
    if (descriptionElement) {
        descriptionElement.classList.remove('show');
    }

    // Fade out each option button
    optionButtons.forEach(function(button) {
        button.classList.remove('show');
    });
}

// Fades in text elements
function fadeInText() {
    setTimeout(function() {
        var descriptionElement = document.querySelector('.scene-description');
        descriptionElement.classList.add('show');

        setTimeout(function() {
            var options = document.querySelectorAll('.option');
            options.forEach(function(option, index) {
                setTimeout(function() {
                    option.classList.add('show');
                }, (options.length - index - 1) * 1000);
            });
        }, 3500); // 3.5 seconds after the scene description
    }, 2000); // 2 seconds after the new background is set
}

// Shows a micro-meditation message with fade-in and extended display time
function showMicroMeditation() {
    var message = gameData.microMeditations[Math.floor(Math.random() * gameData.microMeditations.length)];
    microMeditationElement.textContent = message;
    
    // Start with micro-meditation element hidden
    microMeditationElement.style.display = 'block';
    microMeditationElement.style.opacity = 0;

    // Fade in the micro-meditation message
    setTimeout(function() {
        microMeditationElement.style.opacity = 1;

        // Keep the message displayed for longer before fading out
        setTimeout(function() {
            microMeditationElement.style.opacity = 0;

            // Hide the element after fading out
            setTimeout(function() {
                microMeditationElement.style.display = 'none';
            }, 2500); // Extended fade out duration (0.5 seconds additional)
        }, 4300); // Display message for 4.3 seconds (1 second additional)
    }, 500); // Fade in duration (0.5 seconds additional)
}

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', initGame);
