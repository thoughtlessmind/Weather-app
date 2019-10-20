

window.addEventListener('load', () =>{
    let lat, long;
    let htmlTemp = document.querySelector('.temperature-degree');
    let htmlTempDescription = document.querySelector('.temperature-description');
    let htmlTempIcon = document.querySelector('.icon');
    let htmlLocationName = document.querySelector('.location-timezone');
    let htmlTempUnit = document.querySelector('.temperature-unit');
    let htmlPage = document.querySelector('.page-data');
    let htmlAnimationWrapper = document.querySelector('.loader');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            // console.log(position);
            long=position.coords.longitude;
            lat = position.coords.latitude;
            // console.log(lat, long);


            const apikey1 = "AdxFSexdbJmEJ2t5J3jWxup3HUdJu2p8";
            const apikey2 = "24d0a2571288360d0fdda56bca3790d4";
            const weatherAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&APPID=${apikey2}&units=metric`
            fetch(weatherAPI)
                .then(response =>{
                    return response.json();
                })                
                .then(data =>{
                    // console.log(data);
                    htmlTemp.textContent = Math.round(data.list[0].main.temp);
                    htmlTempDescription.textContent = data.list[0].weather[0].description;
                    let iconSrc = `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`
                    htmlTempIcon.setAttribute('src', iconSrc);
                    htmlLocationName.textContent = data.city.name;
                    htmlTempUnit.textContent = 'C';
                    htmlAnimationWrapper.classList.add('hide');
                    htmlPage.classList.remove('hide');


                })
                .catch( ()=>{
                    alert("Something is wrong. Please try again later!")
                })

        });
    }else{
        window.alert("Location permission is required.")
    }

})
// APPID=24d0a2571288360d0fdda56bca3790d4