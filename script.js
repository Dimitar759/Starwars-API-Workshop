let currentPagePople = 1;
let currentPageStarships = 1;
const recordsPerPage = 10;
let peopleArray = [];
let shipsArray = [];

let nextButton = document.getElementById("next");
let prevButton = document.getElementById("previous");
let tablesAndButtonsDiv = document.getElementById("tablesAndButtons");

let createTablePeople = () => {
  let table = document.createElement("table");
  table.style.border = "1px solid black";
  table.style.margin = "auto";

  let header = table.createTHead();
  let headerRow = header.insertRow();
  let headers = [
    "Name",
    "Height",
    "Mass",
    "Gender",
    "Birth Year",
    "Appearances",
  ];
  headers.forEach(headerText => {
    let headerCell = headerRow.insertCell();
    headerCell.innerText = headerText;
    headerCell.style.border = "1px solid black";
  });

  let body = table.createTBody();
  if (peopleArray.length !== 0) {
    for (let i = 0; i < peopleArray.length; i++) {
      let row = body.insertRow();
      let person = peopleArray[i];

      let cells = [
        "name",
        "height",
        "mass",
        "gender",
        "birth_year",
        "films.length",
      ];
      cells.forEach(cell => {
        let cellElement = row.insertCell();
        cellElement.innerText = person[cell];
        cellElement.style.border = "1px solid black";
      });
    }
  }

  result.innerHTML = "";
  result.appendChild(table);
  result.style.textAlign = "center";

  if (currentPagePople <= 1) {
    nextButton.classList.remove("btn");
  } else {
    prevButton.classList.remove("btn");
  }
};

let createShipsTable = () => {
  let table = document.createElement("table");
  table.style.border = "1px solid black";
  table.style.margin = "auto";

  let header = table.createTHead();
  let headerRow = header.insertRow();
  let headers = [
    "Name",
    "Model",
    "Manufacturer",
    "Cost",
    "People Capacity",
    "Class",
  ];
  headers.forEach(headerText => {
    let headerCell = headerRow.insertCell();
    headerCell.innerText = headerText;
    headerCell.style.border = "1px solid black";
  });

  let body = table.createTBody();

  if (shipsArray.length !== 0) {
    for (let i = 0; i < shipsArray.length; i++) {
      let row = body.insertRow();
      let ship = shipsArray[i];

      let cells = [
        "name",
        "model",
        "manufacturer",
        "cost_in_credits",
        "passengers",
        "starship_class",
      ];
      cells.forEach(cell => {
        let cellElement = row.insertCell();
        cellElement.innerText = ship[cell];
        cellElement.style.border = "1px solid black";
      });
    }
  }

  result.innerHTML = "";
  result.appendChild(table);
  result.style.textAlign = "center";

  if (currentPageStarships <= 1) {
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
    currentPageStarships++;
    console.log(currentPageStarships);
    fetchDataShips(
      `https://swapi.dev/api/starships/?page=${currentPageStarships}`
    );
  });

  prevButton.addEventListener("click", function () {
    if (currentPageStarships >= 1) {
      currentPageStarships--;
      console.log(currentPageStarships);
      fetchDataShips(
        `https://swapi.dev/api/starships/?page=${currentPageStarships}`
      );
    }
  });
});

lukeSkywalker.addEventListener("click", function () {
  fetchDataPeople(`https://swapi.dev/api/people/?page=1`);

  nextButton.addEventListener("click", function () {
    currentPagePople++;
    console.log(currentPagePople);
    fetchDataPeople(`https://swapi.dev/api/people/?page=${currentPagePople}`);
  });

  prevButton.addEventListener("click", function () {
    if (currentPagePople >= 1) {
      currentPagePople--;
      console.log(currentPagePople);
      fetchDataPeople(`https://swapi.dev/api/people/?page=${currentPagePople}`);
    }
  });
});

function handleBtnsPeople(prevPage, nextPage) {
  if (prevPage === "https://swapi.dev/api/people/?page=8") {
    nextButton.style.visibility = "hidden";
  } else if (prevPage !== null) {
    nextButton.style.visibility = "visible";
  }

  if (
    nextPage === "https://swapi.dev/api/starships/?page=2" ||
    prevPage === null
  ) {
    prevButton.classList.add("btn");
  }
}

function handleBtnsShips(prevPage, nextPage) {
  if (prevPage === "https://swapi.dev/api/starships/?page=3") {
    nextButton.style.visibility = "hidden";
  } else if (prevPage !== null) {
    nextButton.style.visibility = "visible";
  }

  if (
    nextPage === "https://swapi.dev/api/people/?page=2" ||
    prevPage === null
  ) {
    prevButton.classList.add("btn");
  }
}

function fetchDataPeople(url) {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log("call success");
      console.log(response);

      peopleArray = response.results;
      let previousPage = response.previous;
      let nextPage = response.next;

      handleBtnsPeople(previousPage, nextPage);
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
      let previousPage = response.previous;
      let nextPage = response.next;
      handleBtnsShips(previousPage, nextPage);
      createShipsTable();
    })
    .catch(function (response) {
      console.log("call failed " + response.status);
    });
}


