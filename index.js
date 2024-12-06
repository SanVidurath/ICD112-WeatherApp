let searchBtn = document.getElementById("searchBtn");
let inputText = document.getElementById("inputCity");
let errorText = document.getElementById("errorMsg");
let weatherCard = document.getElementById("weatherCard");
let forecastWrapper = document.getElementById("wrapper");

searchBtn.addEventListener("click", searchCity);

function searchCity() {
  let cityName = inputText.value;
  errorText.innerHTML = "";
  weatherCard.innerHTML = "";
  forecastWrapper.innerHTML = "";
  if (cityName == "") {
    Swal.fire("Have to input a city to search!!!");
  } else {
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=eb9740e3a7f24c84a5074204241604&q=${cityName}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        errorText.textContent = "Error";
        throw new Error("Something went wrong");
      })
      .then((data) => {
        setData(data);
        setForecast(cityName);
      })
      .catch((error) => {
        console.log(error);
        errorText.innerHTML = "City not found. Try again later!!!";
      });
    inputText.value = "";
  }
}

function setData(data) {
  weatherCard.innerHTML = `
  <div class="row d-flex justify-content-center py-5">
  <div class="col-md-8 col-lg-6 col-xl-5">

    <div class="card text-body" style=" border-radius: 35px;">
      <div class="card-body p-4">

        <div class="d-flex">
          <h6 class="flex-grow-1">${data.location.name}, ${data.location.country}</h6>
          <h6>${data.location.localtime}</h6>
        </div>

        <div class="d-flex flex-column text-center mt-5 mb-4">
          <h6 class="display-4 mb-0 font-weight-bold"> ${data.current.temp_c}°C </h6>
          <span class="small">${data.current.condition.text}</span>
        </div>

        <div class="d-flex align-items-center">
          <div class="flex-grow-1 icons" style="font-size: 1rem;">
            <div><i class="fas fa-wind fa-fw"></i> <span class="ms-1"> ${data.current.wind_kph} km/h
              </span>
            </div>
            <div><i class="fas fa-tint fa-fw"></i> <span class="ms-1"> ${data.current.humidity}%
              </span></div>
            <div><i class="fa-solid fa-eye"></i> <span class="ms-1"> ${data.current.vis_km}km
              </span></div>
          </div>
          <div>
            <img src=${data.current.condition.icon}
              width="100px">
          </div>
        </div>

      </div>
    </div>

  </div>
</div>
  `;
}

function setForecast(cityName) {
  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=eb9740e3a7f24c84a5074204241604&q=${cityName}&days=5`
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("Something went wrong");
    })
    .then((data) => {
      setForecastData(data.forecast.forecastday);
    })
    .catch((error) => {
      console.log(error);
    });
}

function setForecastData(dataArray) {
  forecastWrapper.innerHTML = "";
  let dataArr = [dataArray[0], dataArray[1]];

  dataArr.forEach((element) => {
    forecastWrapper.innerHTML += `
    <div class="container">
    <div class="row">
      <div class="col text-center mb-5">
        <h3 class="display-4 font-weight-bolder mt-3">
          Forecast : ${element.date}
        </h3>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
        <div
          class="card text-dark card-has-bg click-col"
        >
          <img
            class="card-img d-none"
            src="https://source.unsplash.com/600x900/?tech,street"
            alt="Creative Manner Design Lorem Ipsum Sit Amet Consectetur dipisi?"
          />
          <div class="card-img-overlay d-flex flex-column" style="background-color: #6a5acd;">
            <div class="card-body">
              <h4 class="card-title mt-0  mb-4">
                <a class="text-dark">
                  ${element.hour[6].time.split(" ")[1]}
                </a>
              </h4>
              <h2>
                ${element.hour[6].condition.text}
              </h2>
              <img
                  class="mr-3 rounded-circle d-block mt-3 mx-auto"
                  src=${element.hour[6].condition.icon}
                  alt="Generic placeholder image"
                  style="width: 100px"
                />
            </div>
            <div class="card-footer">
              <div class="media">
                
                <div class="media-body">
                  <h1 class="my-0 text-dark d-block">${
                    element.hour[6].temp_c
                  } °C </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
        <div
          class="card text-dark card-has-bg click-col"
        >
          <img
            class="card-img d-none"
            src="https://source.unsplash.com/600x900/?tech,street"
            alt="Creative Manner Design Lorem Ipsum Sit Amet Consectetur dipisi?"
          />
          <div class="card-img-overlay d-flex flex-column" style="background-color: #6a5acd;">
            <div class="card-body">
              <h4 class="card-title mt-0 mb-4">
                <a class="text-dark">
                  ${element.hour[12].time.split(" ")[1]}
                </a>
              </h4>
              <h2>
                ${element.hour[12].condition.text}
              </h2>
              <img
                  class="mr-3 rounded-circle d-block mt-3 mx-auto"
                  src=${element.hour[12].condition.icon}
                  alt="Generic placeholder image"
                  style="width: 100px"
                />
            </div>
            <div class="card-footer">
              <div class="media">
                <div class="media-body">
                  <h1 class="my-0 text-dark d-block">${
                    element.hour[12].temp_c
                  } °C</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
        <div
          class="card text-dark card-has-bg click-col"
        >
          <img
            class="card-img d-none"
            src="https://source.unsplash.com/600x900/?tech,street"
            alt="Creative Manner Design Lorem Ipsum Sit Amet Consectetur dipisi?"
          />
          <div class="card-img-overlay d-flex flex-column" style="background-color: #6a5acd;">
            <div class="card-body">
              <h4 class="card-title mt-0 mb-4">
                <a class="text-dark">
                  ${element.hour[18].time.split(" ")[1]}
                </a>
              </h4>
              <h2>
                ${element.hour[18].condition.text}
              </h2>
              <img
                  class="mr-3 rounded-circle d-block mt-3 mx-auto"
                  src=${element.hour[18].condition.icon}
                  alt="Generic placeholder image"
                  style="width: 100px"
                />
            </div>
            <div class="card-footer">
              <div class="media">
                <div class="media-body">
                  <h1 class="my-0 text-dark d-block">${
                    element.hour[18].temp_c
                  } °C</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
  });
}
