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
    // console.log(country.name + " - " + country.timezones + " - " + country.cioc);

    //add country name to country array\
    countries[country.cioc] = [country.name, country.capital, country.population, country.timezones, country.flag];
    
    var option = document.createElement("option");
    option.text = country.name;
    option.value = country.cioc;
    countrySelect.add(option);

  });
  }


// Send request
request.send();


  	var countriex;
	function insertTR(countriex) {
		var table = document.getElementById("countriesTable");
		var count = 1;
		// console.log(countries)
		var row = table.insertRow(0);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);
		cell1.innerHTML = "Name";
		cell2.innerHTML = "Capital";
		cell3.innerHTML = "Population";
		cell4.innerHTML = "Timezone";
		cell5.innerHTML = "Flag";
		for (x in countries) {
		    var row = table.insertRow(count);
			if (countriex.includes(x) == true) {
				row.style.backgroundColor = "green";
			}
		    var cell1 = row.insertCell(0);
		    var cell2 = row.insertCell(1);
		    var cell3 = row.insertCell(2);
		    var cell4 = row.insertCell(3);
		    var cell5 = row.insertCell(4);
		    cell1.innerHTML = countries[x][0];
		    cell2.innerHTML = countries[x][1];
		    cell3.innerHTML = countries[x][2];
		    cell4.innerHTML = countries[x][3][0];
		    cell5.innerHTML = '<img src="'+countries[x][4]+'" alt="" width="30" height="30">'
		    // "<img src='countries[x][4]' alt=''>";

		    count++;
		}
	}



	function populateTable(){
				document.getElementById('note').innerHTML = 'Countries with the same time zones or close with +/- 1:00 are shaded green';
//clear table before loading new data
		 document.getElementById("countriesTable").innerHTML="";
	//get the value of selected country
		var selectedCountry = document.getElementById("countries").value;
		// alert(selectedCountry)
		
		var timezone = getTimeZone(selectedCountry);
		getCloseCountries(timezone);		
	}

	function getCloseCountries(timezone) {
		
		var x = timezone.substring(3);
		//check if the operation in x
		if (x == "") {
			x = 0;
		}else{
			x = timezone.substring(5,6);
		}
		var countriex = getCountriesCioc(x);
		// console.log(countriex)
		insertTR(countriex);		
		// return countriesCioc;
	}

	function getCountriesCioc(value){
		var countriesCioc = [];
		for (x in countries) {
			var zone = countries[x][3][0].substring(5,6);
			if (zone == value || zone == value + 1 || zone == value - 1) {
				countriesCioc.push(x);
			}
		}
		return countriesCioc;
	}

	function getTimeZone(cioc){
		var timezone = countries[cioc][3][0];
		// console.log(timezone)
		return timezone;
	}
  	
