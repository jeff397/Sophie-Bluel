createButtons();

async function createButtons(){
    const categories = await getCategories();
    console.log(categories);
    categories.forEach((categories) => {
      setButtons(categories);
    });
    
       
}

function setButtons(data) {
  const div = document.createElement("div");
  div.innerHTML = `${data.name}`;
  document.querySelector(".filter-container").append(div);
}

createGallery();

async function createGallery() { 
const works = await getWorks();
console.log(works);
const gallery = document.querySelector(".gallery");
works.forEach((works) => {
  setImages(works, gallery);
});
}

function setImages(data) {
const figure = document.createElement("figure");
figure.innerHTML = `<img src="${data.imageUrl}" alt="${data.title}"><figcaption>${data.title}</figcaption>`;

document.querySelector(".gallery").append(figure);
  
}

