async function getCategories(){
    const url='http://localhost:5678/api/categories';
    const res= await fetch(url);
    const categories= await res.json();
   

    return categories;
}

async function getWorks(){
    const url='http://localhost:5678/api/works';
    const res= await fetch(url);
    const works= await res.json();
    // for (let i=0; i<json.length; index ++); {
    //     setImages(json[i]);
    // }
    setImages(json);

        
    return works;
}