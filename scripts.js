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

    //add country name to country array
    countries[country.cioc] = [country.name, country.capital, country.population, country.timezones, country.flag, country.latlng];
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


  	var countriex;
	var latlong;
	var country;
	function insertTR(countriex) {
			document.getElementById("notification").innerHTML="Countries with the same time zones or close to "+ country.toUpperCase() + " with +/- 1:00 are shaded green";
	
		var table = document.getElementById("countriesTable");
		var count = 1;
		// console.log(countries)
		
		var row = table.insertRow(0);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);
		var cell6 = row.insertCell(5);
		cell1.innerHTML = "Name";
		cell2.innerHTML = "Capital";
		cell3.innerHTML = "Population";
		cell4.innerHTML = "Timezone";
		cell5.innerHTML = "Distance";
		cell6.innerHTML = "Flag";
		for (x in countries) {
//console.log(latlong)		
		var row = table.insertRow(count);
		 
		  var cell1 = row.insertCell(0);
		    var cell2 = row.insertCell(1);
		    var cell3 = row.insertCell(2);
		    var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
			var cell6 = row.insertCell(5);
		  
		    cell1.innerHTML = countries[x][0];
		    cell2.innerHTML = countries[x][1];
		    cell3.innerHTML = countries[x][2];
		    cell4.innerHTML = countries[x][3][0];
			cell6.innerHTML = '<img src="'+countries[x][4]+'" alt="" width="30" height="30">'
	
//check if country is among the nearest country	

	if (countriex.includes(x) == true) {
				row.style.backgroundColor = "green";
				//take the latitude and longitude of nearest country
				var latlng2=[countries[x][5][0],countries[x][5][1]];
				// convert the longitude and latitude to number for mathematical operations
		     	var	 lat1=Number(latlong[0]);
				var  lat2=Number(latlng2[0]);
				var	  lon1=Number(latlong[1]);
				var	  lon2=Number(latlng2[1]);
		  var dist;
				if ((lat1 == lat2) && (lon1 == lon2)) {
		dist= 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		 dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
			//	console.log(latlng2)
			
									
			}
			  		cell5.innerHTML = Math.round(dist);
	}
	 		  
	// "<img src='countries[x][4]' alt=''>";
	
	    count++;
	
	}
	}


	function populateTable(){
		document.getElementById("countriesTable").innerHTML="";
		var selectedCountry = document.getElementById("countries").value;
		// alert(selectedCountry)
		var timezone = getTimeZone(selectedCountry);
		var latlng=getlatlng(selectedCountry);
	//	 console.log(latlng)
		getCloseCountries(timezone);		
	}
//	function to get longitude and latitude of selected country
	function getlatlng(cioc){
		 latlong=[countries[cioc][5][0],countries[cioc][5][1]];
	
}
	function getCloseCountries(timezone) {
		var x = timezone.substring(3);
		if (x == "") {
			x = 0;
		}else{
			x = timezone.substring(5,6);
		}
		var countriex = getCountriesCioc(Number(x));
	//	 console.log(countriex)
		insertTR(countriex);		
		// return countriesCioc;
	}

	function getCountriesCioc(value){
		var countriesCioc = [];
		for (x in countries) {
			var zone = Number(countries[x][3][0].substring(5,6));
			if (zone == value || zone == value + 1 || zone == value - 1) {
				countriesCioc.push(x);
			}
		}
		return countriesCioc;
	}

	function getTimeZone(cioc){
		country=countries[cioc][0]
		var timezone = countries[cioc][3][0];
		// console.log(timezone)
		return timezone;
	}
  	
