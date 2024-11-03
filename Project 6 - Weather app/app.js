var button = document.querySelector('.button')
var inputValue = document.querySelector('.inputValue')
var desc = document.querySelector('.desc');
var name = document.querySelector('.name');
var temp = document.querySelector('.temp');

button.addEventListener('click', function () {
  fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=c983aed69b497603ff80d72814dbadd1')
  .then(response => response.json())
    .then(data => {
      var nameValue = data['name'];
      var tempValue = data['main']['temp'];
      var descValue = data['weather'][0]['description'];

      name.innerHTML = nameValue;
      temp.innerHTML = tempValue;
      desc.innerHTML = descValue;
    })
    

  .catch(err => alert("Wrong city name!"))
})