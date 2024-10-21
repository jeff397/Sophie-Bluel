createButtons();

async function createButtons() {
  const categories = await getCategories();
  console.log(categories);
  categories.forEach((category) => {
    setButtons(category);
  });


};

function setButtons(category) {
  const div = document.createElement("div");
  div.innerHTML = `${category.name}`;
  document.querySelector(".filter-container").append(div);
  div.addEventListener("click", () => filterGallery(category.id));
};

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
  });
  figure.appendChild(img);
  figure.appendChild(trashcan);
  document.querySelector(".modal-gallery").append(figure);
};

// filtrage de la galerie principale

async function filterGallery(categoryId) {
  const works = await getWorks();
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  const filteredWorks = works.filter(work => work.categoryId === categoryId);
  filteredWorks.forEach((work) => {
    setImages(work);
  });
};


document.querySelector(".fullGallery").addEventListener("click", () => createGallery());


// gestion de la bannière en mode Admin

function isUserLoggedIn() {

  return sessionStorage.getItem("token") !== null;
};


function displayLoginBanner() {
  const banner = document.getElementById("loginBanner");
  const modify = document.querySelector(".modify");
  if (isUserLoggedIn()) {
    banner.style.display = "block";
    modify.style.display = "block";
  };
};


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
    };
  };
};



document.querySelectorAll(".js-modal").forEach(a => {
  a.addEventListener("click", openModal);
});

const closeModal = function (e) {
  const modal = e.target.closest('.modal');
  if (modal) {
    resetModal2();
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  };
};

document.querySelectorAll(".close-modal").forEach(button => {
  button.addEventListener("click", closeModal);
});


async function callDeleteWork(work) {
  const token = sessionStorage.getItem("token");
  const success = await deleteWork(work, token);
  if (success) {
    alert("ça a marché");
  }
  else {
    alert("ça n'a pas marché");
  }
};

const addPhotoButton = document.querySelector(".add-photo-btn");
const modal1 = document.getElementById("modal1");
const modal2 = document.getElementById("modal2");

addPhotoButton.addEventListener("click", function () {
  modal1.style.display = "none";
  modal2.removeAttribute('aria-hidden');
  modal2.style.display = "flex";

});

const arrowLeft = document.querySelector(".arrow-left");
arrowLeft.addEventListener("click", function () {
  console.log("flèche gauche");
  resetModal2();
  modal2.setAttribute('aria-hidden', 'true');
  modal2.style.display = "none";
  modal1.style.display = "flex";
});



document.getElementById('photo-upload').addEventListener('change', function (event) {
  const fileUpload = document.querySelector(".file-upload");
  const photoLimits = document.querySelector(".photo-limits");
  const file = event.target.files[0];
  if (file) {
    const fileType = file.type;
    if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
      alert("Veuillez sélectionner une image au format JPEG ou PNG.");
      return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
      const previewImage = document.getElementById('preview-image');
      previewImage.src = e.target.result;
      fileUpload.style.display = "none";
      photoLimits.style.display = "none";
      previewImage.style.display = 'flex';
    };

    reader.readAsDataURL(file);
  }
});

async function createFormCategories() {
  const categories = await getCategories();
  console.log(categories);
  if (categories) {
    selectCategories(categories);
  }
}


async function selectCategories(categories) {
  const categorySelect = document.getElementById("category");
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    categorySelect.appendChild(option);
  })
}

document.addEventListener("DOMContentLoaded", createFormCategories);



function resetModal2() {
  const preview = document.getElementById('preview-image');
  const fileUpload = document.querySelector(".file-upload");
  const photoLimits = document.querySelector(".photo-limits");
  const defaultText = document.getElementById('image-area');
  preview.src = '';
  preview.style.display = 'none';
  fileUpload.style.display = '';
  photoLimits.style.display = '';
  defaultText.style.display = '';
  document.getElementById('photo-title').value = '';
  document.getElementById('category').value = '';
  const errorMessage = document.getElementById('error-message');
  const titleErrorMessage = document.getElementById('title-error-message');
  const categoryErrorMessage = document.getElementById('category-error-message');
  errorMessage.textContent = '';
  errorMessage.style.display = 'none';
  titleErrorMessage.textContent = '';
  titleErrorMessage.style.display = 'none';
  categoryErrorMessage.textContent = '';
  categoryErrorMessage.style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function () {
  const validateButton = document.querySelector(".validate");
  const photoUploadInput = document.getElementById("photo-upload");
  const photoTitleInput = document.getElementById("photo-title");
  const categoryInput = document.getElementById("category");
  const errorMessage = document.getElementById("error-message");
  const titleErrorMessage = document.getElementById("title-error-message");
  const categoryErrorMessage = document.getElementById("category-error-message");
  photoUploadInput.addEventListener("change", function () {
    errorMessage.style.display = "none";
    const file = photoUploadInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const preview = document.getElementById('preview-image');
        preview.src = e.target.result;
        preview.style.display = 'block';
      }
      reader.readAsDataURL(file);
    }
  });

  photoTitleInput.addEventListener("input", function () {
    titleErrorMessage.style.display = "none";
  });

  categoryInput.addEventListener("change", function () {
    categoryErrorMessage.style.display = "none";
  });


  validateButton.addEventListener("click", function (e) {
    e.preventDefault();

    const file = photoUploadInput.files[0];
    const photoTitle = photoTitleInput.value;
    const category = categoryInput.value;
    errorMessage.style.display = "none";
    titleErrorMessage.style.display = "none";
    categoryErrorMessage.style.display = "none";
    let valid = true;
    if (!file) {
      errorMessage.textContent = "Veuillez sélectionner une photo.";
      errorMessage.style.display = "flex";
      valid = false;
    } else if (!["image/jpeg", "image/png"].includes(file.type)) {
      errorMessage.textContent = "Format non valide. Veuillez télécharger une image au format jpg ou png.";
      errorMessage.style.display = "flex";
      valid = false;
    } else if (file.size > 4 * 1024 * 1024) {
      errorMessage.textContent = "Le fichier dépasse la taille maximale de 4 Mo.";
      errorMessage.style.display = "flex";
      valid = false;
    }
    if (!photoTitle) {
      titleErrorMessage.textContent = "Veuillez entrer un titre pour la photo.";
      titleErrorMessage.style.display = "flex";
      valid = false;
    }
    if (!category) {
      categoryErrorMessage.textContent = "Veuillez choisir une catégorie.";
      categoryErrorMessage.style.display = "block";
      valid = false;
    }
    if (valid) {
      console.log("Formulaire validé");


      resetModal2();

    } else {
      console.log("Formulaire non validé, réinitialisation annulée.");
    }
  });
});













