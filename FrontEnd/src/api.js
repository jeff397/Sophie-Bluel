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
    
    if (res.ok) {
        return res;  
    } else {
       
        throw new Error('Login échoué');
    }
}

