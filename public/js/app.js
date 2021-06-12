const weatherForm = document.querySelector('form');

const search = document.querySelector('input');

const message_one = document.querySelector('#message1');

const message_two = document.querySelector('#message2');

weatherForm.addEventListener('submit', (e) => {
  //prevent the form from reloading the browser.
  e.preventDefault();

  const location = search.value;
  message_one.textContent = 'Fetching Weather Info';
  message_two.textContent = '';
  fetch(`/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        message_one.textContent = data.error;

        console.log(data.error);
      } else {
        const forecast = `${data.forecast}. Temperature for ${data.location} is ${data.temperature} celcius. There is a ${data.precip}% chance of rainfall.`;
        message_one.textContent = data.location;
        message_two.textContent = forecast;

        console.log(forecast);
      }
    });
  });
});
