createButtons();

async function createButtons() {
  const categories = await getCategories();
  console.log(categories);
  categories.forEach((category) => {
    setButtons(category);
  });


}

function setButtons(category) {
  const div = document.createElement("div");
  div.innerHTML = `${category.name}`;
  document.querySelector(".filter-container").append(div);
  div.addEventListener("click", () => filterGallery(category.id));
}

createGallery();

async function createGallery() {
  const works = await getWorks();
  console.log(works);
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  works.forEach((work) => {
    setImages(work, gallery);
    setModalImages(work);
  });
}

function setImages(work) {
  const figure = document.createElement("figure");
  figure.innerHTML = `<img src="${work.imageUrl}" alt="${work.title}"><figcaption>${work.title}</figcaption>`;
  document.querySelector(".gallery").append(figure);

}

// galerie de la modal

function setModalImages(work) {
  const figure = document.createElement("figure");
  figure.innerHTML = `<img src="${work.imageUrl}" alt="${work.title}">`;
  document.querySelector(".modal-gallery").append(figure);

}


// filtrage de la galerie principale


async function filterGallery(categoryId) {
  const works = await getWorks();
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  const filteredWorks = works.filter(work => work.categoryId === categoryId);
  filteredWorks.forEach((work) => {
    setImages(work);
  });
}


document.querySelector(".fullGallery").addEventListener("click", () => createGallery());


// gestion de la bannière en mode Admin

function isUserLoggedIn() {

  return sessionStorage.getItem("token") !== null;
}


function displayLoginBanner() {
  const banner = document.getElementById("loginBanner");
  const modify = document.querySelector(".modify");
  if (isUserLoggedIn()) {
    banner.style.display = "block";
    modify.style.display = "block";
  }
}


window.onload = function () {
  displayLoginBanner();
};

//gestion des boutons login/logout

document.addEventListener("DOMContentLoaded", function () {
  const authorise = document.getElementById("authorise");
  const token = sessionStorage.getItem("token");
  console.log("Token récupéré", token);
  if (token) {
    authorise.textContent = "Logout";
    authorise.href = "#";
    console.log("utilisateur connecté, affichage Logout");
    authorise.addEventListener("click", function (event) {
      event.preventDefault();
      sessionStorage.removeItem("token");
      console.log("déconnexion, suppression du token");
      window.location.href = "login.html";
    });
  }
  else {
    authorise.textContent = "login";
    authorise.href = "login.html";
    console.log("utilisateur non connecté, affichage login");
  }
});

const openModal = function (e) {
  e.preventDefault(); 
  const targetElement = e.target.closest('a');
  if (targetElement) {
    const target = document.querySelector(targetElement.getAttribute("href"));  
    if (target) {
      target.style.display = "flex";   
      target.removeAttribute("aria-hidden");      
    }
  }
};

 
document.querySelectorAll(".js-modal").forEach(a => {
  a.addEventListener("click", openModal);
});

const closeModal = function (e) {
  const modal = e.target.closest('.modal');  // Trouver la modale parente
  if (modal) {
    modal.style.display = "none";  // Masquer la modale
    modal.setAttribute("aria-hidden", "true");  // Accessibilité : masquer la modale
  }
};

document.querySelectorAll(".close-modal").forEach(button => {
  button.addEventListener("click", closeModal);
});


