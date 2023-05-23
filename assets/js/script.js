
var api_key = "b65646526636a68703d3aa4e19d4117a";


// const getLatLong = async (city) => {
//     let latlong_url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${api_key}`;
   

//     try{
//        await fetch(latlong_url)
//        .then(res => res.json())
//        .then(data => {
//         console.log(data);
//            return data;
//        })
//        .catch(err=> console.log(err));
//     }catch(err){
//        console.log(err);
//     }
// }

const getLatLongOfCityAndWeather =  async () => {
  
 let city = document.getElementById("dropdown_locations").value;
 let url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${api_key}`;
   

 try{
    await fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log("lat: " ,data[0].lat);
        console.log("long : ",data[0].lon);
        var lat = data[0].lat;
        var lon = data[0].lon;
        
        weatherForNextFewDays(8,lat,lon,city);
    })
    .catch(err=> console.log(err));
 }catch(err){
    console.log(err);
 }
}


// const getWeatherOfCity = async (lat,lon) => {
//     try{
//         var weather_api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
//         await fetch(weather_api_url)
//                 .then(res => res.json())
//                 .then(data => console.log("Weather data of city : ",data))
//                 .catch(err => console.log("error in fetching cit weather : ",err))
//     }catch(err){
//         console.log(err);
//     }
// }


const weatherForNextFewDays =  async (no_days,lat,lon,city) => {
    
    var api_key_for_no_days = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=-${lon}&cnt=8&appid=${api_key}`;
    fetch(api_key_for_no_days)
        .then(res => res.json())
        .then(data => {
            console.log("weather_data_for_next_8_days : " ,data.daily);

            document.getElementById("city").innerText = city;
            const currentTime = new Date();
            const hours = currentTime.getHours();
            const minutes = currentTime.getMinutes();
            const seconds = currentTime.getSeconds();

            document.getElementById("curr_time").innerText = `${hours}:${minutes}:${seconds}`;
            document.getElementById("weather_description").innerText = data.daily[0].weather[0].main;
            document.getElementById("weather_sub_desc").innerText = data.daily[0].weather[0].description;

            let imageURL = `https://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}@2x.png`;
            document.getElementById("weather_image").src = imageURL; 
            document.getElementById("temperature").innerText = `feels like ${Math.round(data.daily[0].feels_like.day - 273) }°C`;
            document.getElementById("humidity").innerText = `Humidity ${data.daily[0].humidity}%`;
            document.getElementById("wind_speed").innerText = `${data.daily[0].wind_speed}km/hr`;
            
            const day = currentTime.getDate();
            const month = currentTime.getMonth() + 1; 
            const year = currentTime.getFullYear();
            const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

            for(let i=1;i<6;i++){
                var cont = document.getElementById(`weather_next_days${i}`);
                const newDiv = document.createElement('div');

               
                newDiv.id = 'weather-info'; 
                

                const timestamp = data.daily[i].sunrise; 

                const timestampMilliseconds = timestamp * 1000;

                const date = new Date(timestampMilliseconds);
                const dayOfWeek = date.getDay();
                const resultDay = weekdays[dayOfWeek];
                const datee = document.createElement('p');
               
                datee.innerText = `${resultDay}`;
                newDiv.appendChild(datee);

                const temperature = document.createElement('p');
                temperature.innerText = `Temperature: ${Math.round(data.daily[i].feels_like.day - 273)}°C`;
                newDiv.appendChild(temperature);
                const iconImage = document.createElement('img');


                iconImage.src = `https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`;
                iconImage.alt = 'Icon';
                newDiv.appendChild(iconImage);

                const humidity = document.createElement('p');
                humidity.innerText = `${data.daily[i].weather[0].description}`;
                newDiv.appendChild(humidity);

                
                const windSpeed = document.createElement('p');
                windSpeed.innerText = `Wind Speed: ${data.daily[i].wind_speed} km/hr`;
                newDiv.appendChild(windSpeed);

                
                const container = document.getElementById('container');
                cont.innerHTML = newDiv.innerHTML;

            }
            





        })
        .catch(err=> console.log("error in getting 8 days weather : ",err))

}




getLatLongOfCityAndWeather("Chennai");
