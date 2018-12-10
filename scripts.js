// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();

//create countries array variable to hold the names of african countries
var countries = [];

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://restcountries.eu/rest/v2/regionalbloc/au', true);
// request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
var countrySelect = document.getElementById("countries");
request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);

  data.forEach(country => {
    // Log each country's data
    console.log(country.name + " - " + country.timezones + " - " + country.cioc);

    //add country name to country array\
    // countries[country.cioc] = [country.name, country.capital, country.population, country.timezones, country.flag];
    // countries.push(country.name);
    // countries.push(country.capital);
    // countries.push(country.population);
    // countries.push(country.timezones);
    // countries.push(country.flag);

    var option = document.createElement("option");
    option.text = country.name;
    option.value = country.cioc;
    countrySelect.add(option);

  });
  }


// Send request
request.send();