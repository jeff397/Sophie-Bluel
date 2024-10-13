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
  });
}

function setImages(work) {
  const figure = document.createElement("figure");
  figure.innerHTML = `<img src="${work.imageUrl}" alt="${work.title}"><figcaption>${work.title}</figcaption>`;
  document.querySelector(".gallery").append(figure);

}

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
  if (isUserLoggedIn()) {
    banner.style.display = "block";
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
