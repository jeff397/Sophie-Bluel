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

async function getLogin(){
    const url='http://localhost:5678/api/users/login';
    const res= await fetch(url);
    const login= await res.json();     
    
    return login;
}

