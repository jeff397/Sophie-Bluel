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

 // Fonction pour vérifier si l'utilisateur est connecté
 function isUserLoggedIn() {
  // Vérifie si le token de session est présent
  return sessionStorage.getItem("token") !== null;
}

// Fonction pour afficher la bannière après la connexion
function displayLoginBanner() {
  const banner = document.getElementById("loginBanner");
  if (isUserLoggedIn()) {
      banner.style.display = "block"; // Afficher la bannière
  }
}

// Exécute la fonction après le chargement de la page
window.onload = function() {
  displayLoginBanner();
};