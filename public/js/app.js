const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {

    e.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = `Location: ${data.location}`;
                messageTwo.textContent = `It's now ${data.description}. The temperature is ${data.temperature} degrees Celsius & Outside it feels like ${data.feelslike} degrees Celsius. 
                The humidity is ${data.humidity}.`;
            }
        });
    });
});