document.querySelector('.user-login').addEventListener('submit', submitId);

async function submitId(event) {
    event.preventDefault();
    let credentials = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    }

    try {

        let result = await postLogin(credentials);
        if (result.status === 200) {
            console.log("Connexion réussie");
            sessionStorage.setItem("token", result.token);
            console.log("Token enregistré dans sessionStorage:", result.token);
            let token = sessionStorage.getItem("token");
            console.log("Token récupéré :", token);
            window.location.href = "index.html";

        }
    }

    catch {

        errorMessage();

    }

}


function errorMessage() {
    const existingErrorBox = document.querySelector(".error-box");
    if (existingErrorBox) {
        existingErrorBox.remove();
    }
    const messageErrorBox = document.createElement("div");
    messageErrorBox.className = "error-box";
    messageErrorBox.innerHTML = "E-mail ou mot de passe invalide";
    messageErrorBox.addEventListener("click", () => {
    messageErrorBox.remove();
    });
    document.querySelector(".user-login").prepend(messageErrorBox);


}