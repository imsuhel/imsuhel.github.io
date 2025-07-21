// Wait for the DOM to load

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  function activateNavLink() {
    let currentSection = "";

    // Find current section in viewport
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        currentSection = section.getAttribute("id");
      }
    });

    // Add/remove `active` class from nav links
    navLinks.forEach((link) => {
      link.classList.remove("active");

      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", activateNavLink);
});

const container = document.getElementById("projectCardsContainer");

projects.forEach((project, index) => {
  const card = document.createElement("div");
  card.className = `stack-card card-${index + 1}`;
  card.style.top = `${60 + index * 20}px`;
  card.style.zIndex = `${index + 1}`;

  card.innerHTML = `
      <div class="project-card-glass">
        <h5 class="project-title">${project.name}</h5>
        <p class="project-desc">${project.description}</p>
        <p class="project-tech"><strong>Tech:</strong> ${project.technologies.join(
          ", "
        )}</p>
        <div class="project-links">
          ${
            project.androidUrl
              ? `<a href="${project.androidUrl}" target="_blank">Android</a>`
              : ""
          }
          ${
            project.iosUrl
              ? `<a href="${project.iosUrl}" target="_blank">iOS</a>`
              : ""
          }
        </div>
      </div>
    `;

  container.appendChild(card);
});
