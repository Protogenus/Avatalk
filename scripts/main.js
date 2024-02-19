const draggableRectangle = document.getElementById('draggable-rectangle');
const avatar = document.getElementById('avatar');
const messages = document.getElementById('messages');
const inputField = document.getElementById('input-field');
const submitButton = document.getElementById('submit-button');
const avatarUpload = document.getElementById('avatar-upload');
const changeAvatarButton = document.getElementById('change-avatar-button');
let isDown = false;
let offsetX, offsetY;

draggableRectangle.addEventListener('mousedown', function(e) {
    isDown = true;
    offsetX = e.clientX - draggableRectangle.getBoundingClientRect().left;
    offsetY = e.clientY - draggableRectangle.getBoundingClientRect().top;
}, true);

document.addEventListener('mouseup', function() {
    isDown = false;
}, true);

document.addEventListener('mousemove', function(event) {
    event.preventDefault();
    if (isDown) {
        draggableRectangle.style.left = (event.clientX - offsetX) + 'px';
        draggableRectangle.style.top = (event.clientY - offsetY) + 'px';
    }
}, true);

inputField.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default form submission
        submitButton.click(); // Trigger the click event on the submit button
    }
});

changeAvatarButton.addEventListener('click', function() {
    avatarUpload.click();
});

avatarUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = function() {
            avatar.src = reader.result;
        }
        reader.readAsDataURL(file);
    }
});

submitButton.addEventListener('click', function() {
    const message = inputField.value;
    if (message.trim() !== '') {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.className = 'message';
        messages.appendChild(messageElement);
        inputField.value = '';

        // Set a timer to add the fade-out class after   10 seconds
        setTimeout(function() {
            messageElement.classList.add('fade-out');

            // Set a timer to remove the message after the transition is complete
            setTimeout(function() {
                messages.removeChild(messageElement);
            },  1000); //  1000ms =  1s, which is the duration of the transition
        },  5000); //  10000ms =  10s, the time until the message expires
    }
});
