let currentPage = 1;
const recordsPerPage = 10;
let peopleArray = [];
let shipsArray = [];

let nextButton = document.getElementById("next");
let prevButton = document.getElementById("previous");

let createTablePeople = () => {
    result.innerHTML = "";
  let table = document.createElement("table");
  table.style.border = "1px solid black";
  table.style.margin = "auto"; 

  let header = table.createTHead();
  let headerRow = header.insertRow();
  let headers = ["Name", "Height", "Mass", "Gender", "Birth Year", "Appearances"];
  headers.forEach((headerText) => {
    let headerCell = headerRow.insertCell();
    headerCell.innerText = headerText;
    headerCell.style.border = "1px solid black";
  });

  let body = table.createTBody();
    if (peopleArray.length !== 0) {
      for (let i = 0; i < peopleArray.length; i++) {
        let row = body.insertRow();
        let person = peopleArray[i];

        let cells = ["name", "height", "mass", "gender", "birth_year", "films.length"];
        cells.forEach((cell) => {
        let cellElement = row.insertCell();
        cellElement.innerText = person[cell];
        cellElement.style.border = "1px solid black";
        });
    }
  }
  

  result.appendChild(table);
  result.style.textAlign = "center";

  if (currentPage <= 1) {
    nextButton.classList.remove("btn");
  } else {
    prevButton.classList.remove("btn");
  }
};

let createShipsTable = () => {
    result.innerHTML = "";
  let table = document.createElement("table");
  table.style.border = "1px solid black";
  table.style.margin = "auto"; 

  let header = table.createTHead();
  let headerRow = header.insertRow();
  let headers = ["Name", "Model", "Manufacturer", "Cost", "People Capacity", "Class"];
  headers.forEach((headerText) => {
    let headerCell = headerRow.insertCell();
    headerCell.innerText = headerText;
    headerCell.style.border = "1px solid black";
  });

    let body = table.createTBody();

    if (shipsArray.length !== 0) {
      for (let i = 0; i < shipsArray.length; i++) {
        let row = body.insertRow();
        let ship = shipsArray[i];

        let cells = ["name", "model", "manufacturer", "cost_in_credits", "passengers", "starship_class"];
        cells.forEach((cell) => {
        let cellElement = row.insertCell();
        cellElement.innerText = ship[cell];
        cellElement.style.border = "1px solid black";
        });
    }
  }
  
  result.appendChild(table);
  result.style.textAlign = "center";

  if (currentPage <= 1 ) {
    nextButton.classList.remove("btn");
  } else {
    prevButton.classList.remove("btn");
  }
};

let spaceShip = document.getElementById("spaceShip");
let lukeSkywalker = document.getElementById("lukeSkywalker");
let result = document.getElementById("result");

spaceShip.addEventListener("click", function () {
    fetchDataShips(`https://swapi.dev/api/starships/?page=1`);
    
    nextButton.addEventListener("click", function () {
        currentPage++;
        fetchDataShips(`https://swapi.dev/api/starships/?page=${currentPage}`);
    });

    prevButton.addEventListener("click", function () {
    if (currentPage > 1) {
        currentPage--;
        fetchDataShips(`https://swapi.dev/api/starships/?page=${currentPage}`);
    }
    });
});

lukeSkywalker.addEventListener("click", function () {
  fetchDataPeople(`https://swapi.dev/api/people/?page=1`);

    
    nextButton.addEventListener("click", function () {
        currentPage++;
        fetchDataPeople(`https://swapi.dev/api/people/?page=${currentPage}`);
    });

    prevButton.addEventListener("click", function () {
    if (currentPage > 1) {
        currentPage--;
        fetchDataPeople(`https://swapi.dev/api/people/?page=${currentPage}`);
    }
    });
});




function fetchDataPeople(url) {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log("call success");
      console.log(response);

      peopleArray = response.results; 
      createTablePeople();
    })
    .catch(function (response) {
      console.log("call failed " + response.status);
    });
}

function fetchDataShips(url) {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log("call success");
      console.log(response);

      shipsArray = response.results; 
      createShipsTable();
    })
    .catch(function (response) {
      console.log("call failed " + response.status);
    });
}


