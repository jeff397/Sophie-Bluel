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
  const img = document.createElement("img");
  const trashcan = document.createElement("i");
  img.src = work.imageUrl;
  img.alt = work.title;
  trashcan.classList.add("fa-solid", "fa-trash-can");
  trashcan.addEventListener("click", () => {
    callDeleteWork(work);
  })
  figure.appendChild(img);
  figure.appendChild(trashcan);
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

// gestion de la modale

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
  const modal = e.target.closest('.modal');   
  if (modal) {
    modal.style.display = "none";   
    modal.setAttribute("aria-hidden", "true");   
  }
};

document.querySelectorAll(".close-modal").forEach(button => {
  button.addEventListener("click", closeModal);
});


async function callDeleteWork(work) {
  const token = sessionStorage.getItem("token");
  const success = await deleteWork(work, token);
  if (success) {
    alert("ça a marché")
  }
  else {
    alert("ça n'a pas marché")
  }
}
