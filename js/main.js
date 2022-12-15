let sett = document.getElementById("sett");
let gear = document.getElementById("gear");
let lis = document.querySelectorAll("ul li");
let test = document.getElementById("test");
let removeAll = document.getElementById("re-all");
gear.onclick = function () {
  if (sett.style.left === "0px") {
    sett.style.left = "-300px";
  } else {
    sett.style.left = "0px";
  }
};

if (window.localStorage.getItem("main-color")) {
  // add color to main color
  document.documentElement.style.setProperty(
    "--main-color",
    window.localStorage.getItem("main-color")
  );
  // remove active class from all elements
  lis.forEach((li) => {
    li.classList.remove("active");
  });
  // add active class to
  document
    .querySelector(
      `[data-color="${window.localStorage.getItem("main-color")}"]`
    )
    .classList.add("active");
}

lis.forEach((li) => {
  li.addEventListener("click", (e) => {
    // console.log(e.currentTarget.dataset.color);
    lis.forEach((li) => {
      li.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    window.localStorage.setItem("main-color", e.currentTarget.dataset.color);
    document.documentElement.style.setProperty(
      "--main-color",
      e.currentTarget.dataset.color
    );
  });
});

let userInput = document.getElementById("user-input");
let add = document.getElementById("add");
let parentTasks = document.getElementById("tasks");

let arrayOfTasks = [];

if (window.localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"));
}

getDataFromLocalStorage();

add.onclick = function () {
  if (userInput.value != "") {
    addTasksToArray(userInput.value);
    userInput.value = "";
  }
};

function addTasksToArray(value) {
  let task = {
    id: Date.now(),
    title: value,
    complate: false,
  };
  arrayOfTasks.push(task);
  addElementsToThePage(arrayOfTasks);
  addArrayToLocalStorage(arrayOfTasks);
}

function addElementsToThePage(arr) {
  parentTasks.innerHTML = "";
  arr.forEach((task) => {
    let div = document.createElement("div");
    div.classList.add("task");
    div.innerHTML = task.title;
    div.setAttribute("data-id", task.id);
    let del = document.createElement("span");
    del.classList.add("delete");
    del.innerHTML = "Delete";
    div.appendChild(del);
    parentTasks.appendChild(div);
  });
}

function addArrayToLocalStorage(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let Data = window.localStorage.getItem("tasks");
  if (Data) {
    let parsent = JSON.parse(Data);
    addElementsToThePage(parsent);
  }
}

parentTasks.addEventListener("click", (e) => {
  if (e.target.className === "delete") {
    e.target.parentElement.remove();
    deleteElementFromLocal(e.target.parentElement.getAttribute("data-id"));
  }
});

function deleteElementFromLocal(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addArrayToLocalStorage(arrayOfTasks);
}

// script for background Image
let imagesImg = document.querySelectorAll(".images div img");

// window.onclick = function () {
//   if (window.localStorage.getItem("main-image")) {
//     document.body.style.backgroundImage = `url("${window.localStorage.getItem(
//       "main-image"
//     )}")`;
//   }

//   imagesImg.forEach((img) => {
//     img.addEventListener("click", (e) => {
//       window.localStorage.setItem("main-image", e.target.getAttribute("src"));
//     });
//   });
// };

if (window.localStorage.getItem("main-image")) {
  document.body.style.backgroundImage = `url("${window.localStorage.getItem(
    "main-image"
  )}")`;
}

imagesImg.forEach((img) => {
  img.addEventListener("click", (e) => {
    window.localStorage.setItem("main-image", e.target.getAttribute("src"));
    document.body.style.backgroundImage = `url("${window.localStorage.getItem(
      "main-image"
    )}")`;
  });
});

// move all function
removeAll.onclick = function () {
  window.localStorage.removeItem("tasks");
  parentTasks.innerHTML = "";
  arrayOfTasks = [];
};
