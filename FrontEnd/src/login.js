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
            const data = await result.json();
            localStorage.setItem("token", data.token);
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

function displayAdminMode() {
    if (localStorage.getItem("token")) {
        const editBanner = document.createElement("div");
        editBanner.className ="edit";
        editBanner.innerHTML = `<p><a href="#modal1" class="js-modal"><i class="fa-regular fa-pen-to-square"></i>Mode édition</a></p>`;
        document.body.prepend(editBanner);
    }

}

displayAdminMode();

const openModal = function(e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute("href"));
    target.style.display = "block";
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", "true");
}
document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal);
});