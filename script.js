window.addEventListener('load', ()=>{
    let long;
    let lat;
    let locationName = document.querySelector('.location-timezone');
    let tempValue = document.querySelector('.temperature-degree');
    let tempDescription = document.querySelector('.temperature-description');
    let tempIcon = document.querySelector('.icon');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            // console.log(position);
            long=position.coords.longitude;
            lat = position.coords.latitude;


            const apikey = "AdxFSexdbJmEJ2t5J3jWxup3HUdJu2p8";
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const geoKeyApi = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apikey}&q=${lat}%2C${long}`;
            let weatherApi ;
            let weatherData;

            fetch(geoKeyApi)
                .then(response => {
                    return response.json();
                })
                .then(data =>{
                    console.log(data);
                    locationName.textContent = data.LocalizedName;
                    console.log(data.LocalizedName)
                    weatherApi = `${proxy}http://dataservice.accuweather.com/forecasts/v1/daily/5day/${data.Key}?apikey=${apikey}&details=true`;
                    return weatherApi;
                })
                .then(weatherApi =>{
                    fetch(weatherApi)
                        .then(response =>{
                            weatherData = response.json();
                            console.log(weatherData);
                            return weatherData
                            
                        })
                        .then(data=>{
                            console.log(weatherData);
                            console.log(data.DailyForecasts[0].Temperature.Maximum);
                            tempValue.textContent = data.DailyForecasts[0].Temperature.Maximum.Value;
                            tempDescription.textContent = data.DailyForecasts[0].Day.ShortPhrase;
                            let iconSrc = `https://developer.accuweather.com/sites/default/files/0${data.DailyForecasts[0].Day.Icon}-s.png`
                            tempIcon.setAttribute('src', iconSrc)
                            
                        })
                })

            // fetch(geoKeyApi)
            //     .then(response =>{
            //         return response.json();
            //     })
            //     .then(data =>{
            //         console.log(data.Key);
            //     })
            //     .then(key =>{
            //         weatherApi = `${proxy}http://dataservice.accuweather.com/forecasts/v1/daily/5day/3352012?apikey=${key}&details=true`;
            //     })
            //     .then()
            // fetch(weatherApi)
            //     .then(response =>{
            //         return response.json();
            //     })
            //     .then(data =>{
            //         console.log(data);
            //     })
            

        });
    }
});




// <img typeof="foaf:Image" class="img-responsive" src="
// https://developer.accuweather.com/sites/default/files/03-s.png
// " width="75" height="45" alt="Partly Sunny" title="Partly Sunny">