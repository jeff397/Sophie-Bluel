document.querySelector('.user-login').addEventListener('submit', submitId);

async function submitId(event) { 
    event.preventDefault();  
    let credentials = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };
    let result = await postLogin(credentials);
    console.log(result);
    console.log("E-mail:", credentials.email);
    console.log("Mot de passe:", credentials.password);
    

    
}


