async function fetchData() {
  try {
    const response = await fetch("travel_recommendation_api.json");
    return await response.json();

    const options = {
      timeZone: "Asia/Kolkata",
      hour24: true,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const KolkataTime = new Date().toLocaleTimeString("en-US", options);
    console.log("Current time in Kolkata:", KolkataTime);
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

async function handleSearch(event) {
  event.preventDefault();

  const data = await fetchData();
  if (!data) {
    document.getElementById("result").innerText = "No results found";
    return;
  }

  const searchQuery = document
    .getElementById("destinationInput")
    .value.toLowerCase();
  let results = "";

  if (searchQuery == "temples" || searchQuery == "temple") {
    data.temples.forEach((temple) => {
      results += `<div><img src="${temple.imageUrl}" alt="${temple.name}"><h3>${temple.name}</h3><p>${temple.description}</p></div>`;
    });
  } else if (searchQuery == "beaches" || searchQuery == "beach") {
    data.beaches.forEach((beach) => {
      results += `<div><img src="${beach.imageUrl}" alt="${beach.name}"><h3>${beach.name}</h3><p>${beach.description}</p></div>`;
    });
  } else if (searchQuery == "countries" || searchQuery == "countries") {
    data.countries.forEach((countries) => {
      results += `<div><img src="${countries.imageUrl}" alt="${countries.name}"><h3>${countries.name}</h3><p>${countries.description}</p></div>`;
    });
  } else {
    data.countries.forEach((country) => {
      if (countries.name.toLowerCase().includes(searchQuery)) {
        countries.cities.forEach((city) => {
          results += `<img src="${city.imageUrl}" alt="${city.name}"><div><h3>${city.name}</h3><p>${city.description}</p></div>`;
        });
      }
    });
  }
  document.querySelector("#result").classList.add("result-card");
  document.getElementById("result").innerHTML = results;
}

function clearResults() {
  document.getElementById("destinationInput").value = "";
  document.getElementById("result").innerHTML = "";
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("btnSearch").addEventListener("click", handleSearch);
  document.getElementById("btnClear").addEventListener("click", clearResults);
});
