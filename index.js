let searchBtn = document.getElementById("searchBtn");
let inputText = document.getElementById("inputCity");
let errorText = document.getElementById("errorMsg");
let weatherCard = document.getElementById("weatherCard");

searchBtn.addEventListener("click", searchCity);

function searchCity() {
  let cityName = inputText.value;
  errorText.innerHTML = "";
  weatherCard.innerHTML = "";
  if (cityName == "") {
    Swal.fire("Have to input a city to search!!!");
  } else {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=eb9740e3a7f24c84a5074204241604&q=${cityName}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        errorText.textContent = "Error";
        throw new Error("Something went wrong");
      })
      .then((data) => setData(data))
      .catch((error) => {
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
