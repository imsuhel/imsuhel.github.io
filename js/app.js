

window.history.pushState({page: 1}, "", "");
window.onpopstate = function(event) {
    if(event){
        window.location.href = './index.html';
        // Code to handle back button or prevent from navigation
    }
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("activedefault").click();

// function below to change class of navbar
const navBar = document.getElementById('nav-bar');
let menuOpen = false;
navBar.addEventListener('click', () => {
  if(!menuOpen){
    menuOpen = true;
    navBar.classList.add('open');
  } else {
    menuOpen = false;
    navBar.classList.remove('open');
  }
});


// fuction below to move through the pages
function openPage(evt, pageName){
  let i, navLink, page;
  page = document.getElementsByClassName('page');
  for (i = 0; i < page.length; i++) {
    page[i].style.display = 'none';
  }
  navLink = document.getElementsByClassName('nav-link');
  for (i = 0; i < navLink.length; i++) {
    navLink[i].className = navLink[i].className.replace('active', '');
  }
  document.getElementById(pageName).style.display = "block";
  document.getElementById(pageName).classList.add('page-animation');
  setTimeout(function(){
    document.getElementById(pageName).classList.remove('page-animation');
  }, 1500);
  evt.currentTarget.className += " active";
}


// function below to display single project
function openProject(evt, projectName){
  let i, projectCard, projectDetails;
  projectDetails = document.getElementsByClassName('single-project');
  for(i = 0; i < projectDetails.length; i++){
    projectDetails[i].style.display = "none";
  }
  document.getElementById(projectName).style.display = "block";
}



// function below to open project detaisl pages
let project = document.getElementsByClassName('projects');
for(let i = 0; i < project.length; i++){
  project[i].addEventListener('click', function(e){
    let details = document.getElementById('project');
    details.classList.add('project-active');
    let projectOverlay = document.getElementById('overlay');
    projectOverlay.classList.add('project-overlay');
    let body = document.getElementById('body');
    body.classList.add('main-scroll');
    document.getElementById('nav-bar').classList.add('nav-none');


    // code below to close here project details pags and remove classes
    let closeBtn = document.getElementsByClassName('close-btn');
    for (let i = 0; i < closeBtn.length; i++) {
      closeBtn[i].addEventListener('click', function(e){
        let projectClose = document.getElementById('project');
        projectClose.classList.add('project-close');
        setTimeout(function(){
          projectClose.classList.remove('project-close', 'project-active');
          projectOverlay.classList.remove('project-overlay');
          body.classList.remove('main-scroll');
          document.getElementById('nav-bar').classList.remove('nav-none');
        }, 500);
      }) // closeBtn addEventListener
    }
  }); // project addEventListener
}
