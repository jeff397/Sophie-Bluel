const openModal = function(e) {
    e.preventDefault();
    const target = document.querySelector (e.target.getattribute("href"));
    target.style.display = null;
    target.remove("aria-hidden");
    target.setattribute("aria-modal", "true");
}

document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal);
})

let result = await postLogin(credentials);
function editAdmin() {
    if (result.status === 200) {
        const Banner = document.createElement ("div");
        Banner.className = "banner";
        Banner.innerHTML = `<p><a href="modal1" class="js-modal"><i class="fa-regular fa-pen-to-square"></i>Mode édition</a></p>`;
        document.body.prepend(Banner);
        }

}

editAdmin();



