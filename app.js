const $circle = document.querySelector('#circle');
const $score = document.querySelector('#score');
const $reset = document.querySelector('#reset');

const images = [
    '../Luda1.jpg',
    '../Luda2.jpg',
    '../Luda3.jpg',
    '../Luda4.jpg',
    '../Luda5.jpg',
    '../Luda6.jpg',
    '../Luda7.jpg',
    '../Luda8.jpg',
    '../Luda9.jpg',
    '../Luda10.jpg',
    '../Luda11.jpg',
    '../Luda12.jpg',
    '../Luda13.jpg',
    '../Luda14.jpg',
    '../Luda15.jpg'
];

// Initialize the application
function start() {
    setScore(getScore());
    setImage();
}

// Set the score in local storage and update the display
function setScore(score) {
    localStorage.setItem('score', score);
    $score.textContent = score;
}

// Get the score from local storage or return 0 if not found
function getScore() {
    return Number(localStorage.getItem('score')) || 0;
}

// Change image based on score
function setImage() {
    const score = getScore();
    const imageIndex = Math.floor(score / 10) % images.length;
    const imageSrc = images[imageIndex];

    if ($circle) {
        // Apply fade-out effect
        $circle.classList.add('fade-out');

        setTimeout(() => {
            $circle.setAttribute('src', imageSrc);
            // Remove fade-out class to trigger fade-in
            $circle.classList.remove('fade-out');
        }, 400);
    }
}

// Increment score by 1 and update image every 10 points
function addOne() {
    const newScore = getScore() + 1;
    setScore(newScore);

    if (newScore % 10 === 0) {
        setImage();
    }
}

// Reset score and update image
function resetScore() {
    setScore(0);
    setImage();
}

// Add tilt and "+1" animation on click
$circle.addEventListener('click', (event) => {
    const rect = event.target.getBoundingClientRect();

    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    const DEG = 80;

    const tiltX = (offsetY / rect.height) * DEG;
    const tiltY = (offsetX / rect.width) * -DEG;

    $circle.style.setProperty('--tiltX', `${tiltX}deg`);
    $circle.style.setProperty('--tiltY', `${tiltY}deg`);

    setTimeout(() => {
        $circle.style.setProperty('--tiltX', '0deg');
        $circle.style.setProperty('--tiltY', '0deg');
    }, 300);

    const plusOne = document.createElement('div');
    plusOne.classList.add('plus-one');
    plusOne.textContent = '+1';

    plusOne.style.left = `${event.clientX - rect.left}px`;
    plusOne.style.top = `${event.clientY - rect.top}px`;

    $circle.parentElement.appendChild(plusOne);

    addOne(); // Increase score

    setTimeout(() => {
        plusOne.remove();
    }, 2000);
});

// Reset score on reset button click
$reset.addEventListener('click', resetScore);

start();
