createButtons();

async function createButtons(){
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
works.forEach((work) => {
  setImages(work, gallery);
});
}

function setImages(work) {
const figure = document.createElement("figure");
figure.innerHTML = `<img src="${work.imageUrl}" alt="${work.title}"><figcaption>${work.title}</figcaption>`;

document.querySelector(".gallery").append(figure);
  
}

async  function filterGallery(categoryId) {
  const works = await getWorks();
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML="";
  const filteredWorks = works.filter (work => work.categoryId===categoryId);
  filteredWorks.forEach((work) => {
    setImages(work);
  });
}

document.querySelector(".fullGallery").addEventListener("click", () => createGallery());
