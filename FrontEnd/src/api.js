async function getCategories(){
    const url='http://localhost:5678/api/categories';
    const res= await fetch(url);
    const categories= await res.json();

    return categories;
}