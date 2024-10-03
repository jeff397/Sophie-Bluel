createButtons();

async function createButtons(){
    const categories = await getCategories();
    console.log(categories);
       
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

