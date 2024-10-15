document.querySelector('.user-login').addEventListener('submit', submitId);

async function submitId(event) {

    event.preventDefault();
    let credentials = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    }



    let result = await postLogin(credentials);
    if (result) {
        sessionStorage.setItem("token", result.token);
        window.location.href = "index.html";
    }
    else {
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


