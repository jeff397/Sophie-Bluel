createButtons();

async function createButtons(){
    const categories = await getCategories();
    console.log(categories);
       
}

createGallery();

async function createGallery() { 
const works = await getWorks();
console.log(works);

}

function setImages(data) {
const figure = document.createElement("figure");
figure.innerHTML = '<img src=${data[i].imageUrl} alt=${data[i].title}><figcaption>${data[i].title}</figcaption>';

document.body.append(figure);
}
        



