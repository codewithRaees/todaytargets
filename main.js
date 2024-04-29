const checkBoxList = document.querySelectorAll(".custom-checkbox");
const goalinputlist = document.querySelectorAll(".goal-input");
const errorlabel = document.querySelector(".error-lable");
const progressLabel = document.querySelector(".progress-lable");
const progressBar = document.querySelector(".progress-value");
const addGoal = document.querySelector(".addgoal");
const container = document.querySelector(".container");
const qoute = document.querySelector(".qoute");
let counter = 3;

// const allgoals = JSON.parse(localStorage.getItem("allgoals")) || {
//   first: {
//     name: "",
//     completed: false,
//   },
//   second: {
//     name: "",
//     completed: false,
//   },
//   third: {
//     name: "",
//     completed: false,
//   },
// };
const allgoals = JSON.parse(localStorage.getItem("allgoals")) || {};
const allQuotes = [
  "Raise the bar by completing your goals!",
  "Well begun is half done!",
  "Just a step away keep going!",
  "Whao! You just completed all the goals, time for chill :D",
];
let completedgoals = Object.values(allgoals).filter(
  (goal) => goal.completed
).length;
progressBar.style.width = `${(completedgoals / goalinputlist.length) * 100}%`;
progressBar.firstChild.innerText = `${completedgoals}/${goalinputlist.length} completed`;
progressLabel.innerText = allQuotes[completedgoals];
// if (completedgoals < 1) {
//   progressBar.firstChild.style.display = "none";
// } else {
//   progressBar.firstChild.style.display = "block";
// }

checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    checkinput = [...goalinputlist].every((input) => {
      return input.value;
    });
    if (checkinput) {
      checkbox.parentElement.classList.toggle("completed");
      const inputid = checkbox.nextElementSibling.id;
      allgoals[inputid].completed = !allgoals[inputid].completed;
      completedgoals = Object.values(allgoals).filter(
        (goal) => goal.completed
      ).length;
      progressBar.style.width = `${
        (completedgoals / goalinputlist.length) * 100
      }%`;
      progressBar.firstElementChild.innerText = `${completedgoals}/${goalinputlist.length} completed`;
      progressLabel.innerText = allQuotes[completedgoals];

      // if (completedgoals < 1) {
      //   progressBar.firstElementChild.style.display = "none";
      // } else {
      //   progressBar.firstElementChild.style.display = "block";
      // }
      localStorage.setItem("allgoals", JSON.stringify(allgoals));
    } else {
      errorlabel.classList.add("show-error");
    }
  });
});
goalinputlist.forEach((checkbox) => {
  if (allgoals[checkbox.id]) {
    checkbox.value = allgoals[checkbox.id].name;
    if (allgoals[checkbox.id].completed) {
      checkbox.parentElement.classList.add("completed");
    }
  }

  checkbox.addEventListener("focus", () => {
    errorlabel.classList.remove("show-error");
  });
  checkbox.addEventListener("input", (e) => {
    if (allgoals[checkbox.id] && allgoals[checkbox.id].completed) {
      checkbox.value = allgoals[checkbox.id].name;
      return;
    }
    if (allgoals[checkbox.id]) {
      allgoals[checkbox.id].name = checkbox.value;
    } else {
      allgoals[checkbox.id] = {
        name: checkbox.value,
        completed: false,
      };
    }
    // checkbox.parentElement.classList.toggle("completed");

    localStorage.setItem("allgoals", JSON.stringify(allgoals));
  });
});

//Self added code
//Function to create new Goal Text Field
function CreateNewGoal() {
  localStorage.removeItem(allgoals);
  let goalContainer = document.createElement("div");
  goalContainer.classList.add("goal-container");
  let innerdiv = document.createElement("div");
  innerdiv.classList.add("custom-checkbox");
  goalContainer.appendChild(innerdiv);
  let img = document.createElement("img");
  img.classList.add("check-icon");
  img.src = "./images/check-icon.svg";
  img.alt = "check-icon";
  innerdiv.appendChild(img);
  let input = document.createElement("input");
  input.classList.add("goal-input");
  input.setAttribute("type", "text");
  input.setAttribute("id", "fourth");
  input.id = "goal-" + (counter + 1);
  counter++;
  input.placeholder = "Add new goal...";
  goalContainer.appendChild(input);
  container.insertBefore(goalContainer, qoute);
}
addGoal.addEventListener("click", () => {
  if (counter < 5) {
    CreateNewGoal();
  } else {
    alert("Maximum Goal Limit reached!");
  }
});

//test
// Function to create a new div with nested div
function createNestedDiv() {
  var parentDiv = document.createElement("div");
  parentDiv.textContent = "Parent Div";

  var childDiv = document.createElement("div");
  childDiv.textContent = "Child Div";

  parentDiv.appendChild(childDiv);
  document.body.appendChild(parentDiv);

  // Save the HTML content to local storage
  saveToLocalStorage();
}

// Function to save the HTML content to local storage
function saveToLocalStorage() {
  var htmlContent = document.body.innerHTML;
  localStorage.setItem("savedContent", htmlContent);
}

// Function to load the HTML content from local storage
function loadFromLocalStorage() {
  var savedContent = localStorage.getItem("savedContent");
  if (savedContent) {
    document.body.innerHTML = savedContent;
  }
}

// Load from local storage when the page loads
window.onload = loadFromLocalStorage;
