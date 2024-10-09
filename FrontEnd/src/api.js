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
        
    return works;
}

async function postLogin(credentials){
    const url='http://localhost:5678/api/users/login';   
    const res= await fetch(url, {
        method:"POST",
        body:JSON.stringify(credentials),
        headers:{
            "Content-Type":"application/json"
        }
    });
    return await res.json();
    console.log("Statut de la réponse:", res.status); // Ajoute ce log pour voir le statut HTTP exact
console.log("Réponse complète:", await res.text()); // Affiche la réponse texte brute
}

