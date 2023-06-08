let projects = [];
let projectsWrapper = document.getElementById("projectsWrapper");
let projectDetails = document.getElementById("projectDetails");
let bodyElm = document.querySelector("body");

fetch("js/projects.json")
  .then((response) => response.json())
  .then(async (data) => {
    projects = await data;
  });

window.onload = () => {
  console.table(projects);
  projects.map((item, index) => {
    projectsWrapper.innerHTML += `
    <div class="col-md-4">
      <div
        onclick="openProject(event, '${item.id}')"
        class="portfolio-card projects"
      >
        <div class="portfolio-img">
          <img
            src="img/${item.thumbnail}"
            class="img-fluid"
            alt="suhel portfolio"
          />
        </div>
        <div class="portfolio-content">
          <p>${item.name}</p>
        </div>
      </div>
    </div>
    `;
  });
};

// handle back press
window.history.pushState({ page: 1 }, "", "");
window.onpopstate = function (event) {
  if (event) {
    window.location.href = "./index.html";
    // Code to handle back button or prevent from navigation
  }
};

// Get the element with id="defaultOpen" and click on it
document.getElementById("activedefault").click();

// function below to change class of navbar
const navBar = document.getElementById("nav-bar");
let menuOpen = false;
navBar.addEventListener("click", () => {
  if (!menuOpen) {
    menuOpen = true;
    navBar.classList.add("open");
  } else {
    menuOpen = false;
    navBar.classList.remove("open");
  }
});

// fuction below to move through the pages
function openPage(evt, pageName) {
  let i, navLink, page;
  page = document.getElementsByClassName("page");
  for (i = 0; i < page.length; i++) {
    page[i].style.display = "none";
  }
  navLink = document.getElementsByClassName("nav-link");
  for (i = 0; i < navLink.length; i++) {
    navLink[i].className = navLink[i].className.replace("active", "");
  }
  document.getElementById(pageName).style.display = "block";
  document.getElementById(pageName).classList.add("page-animation");
  setTimeout(function () {
    document.getElementById(pageName).classList.remove("page-animation");
  }, 1500);
  evt.currentTarget.className += " active";
}

// function below to display single project
function openProject(evt, projectID) {
  let projectInfo = projects.filter((item) => {
    return item.id === projectID;
  });

  projectDetails.innerHTML = `
      <div id="overlay" onclick="closeProject()"></div>
      <div id="project1" class="single-project">
        <div class="single-details">
          <div class="project-img">
            <img src="img/${
              projectInfo[0].thumbnail
            }" class="img-fluid" alt="project 1" />
          </div>
          <div class="project-content">
            <div class="project-title">
              <h4>${projectInfo[0].name}</h4>
            </div>
            <ul class="project-name">
            <li>
              <i class="fa fa-code"></i> Technologies :
                ${projectInfo[0].tech.map((item, index) => {
                  return `<span> ${item} </span>`;
                })}
              </li>
            </ul>
            <div className="bottomBtn">
              <a
                class="btn btn-home-border waves-effect waves-light"
                onclick="closeProject()"
              >
                <span><i class="fa fa-times"></i> close</span>
              </a>
              <a
                href="${projectInfo[0].link}"
                target="_blank"
                class="btn btn-home-color m-0"
              >
              <span><i class="fa fa-external-link text-dark" style="color:#222222!important;"></i> priview</span>
              </a>
            </div>
          </div>
        </div>
      </div>
  `;

  projectDetails.classList.add("active");
  bodyElm.classList.add("scrollHide");
}

// come below to close single project
function closeProject() {
  bodyElm.classList.remove("scrollHide");
  projectDetails.classList.remove("active");
  // projectDetails.innerHTML = ""
}
