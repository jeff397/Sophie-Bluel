async function getCategories() {
    const url = 'http://localhost:5678/api/categories';
    const res = await fetch(url);
    const categories = await res.json();

    return categories;
}

async function getWorks() {
    const url = 'http://localhost:5678/api/works';
    const res = await fetch(url);
    const works = await res.json();

    return works;
}

async function postLogin(credentials) {
    const url = 'http://localhost:5678/api/users/login';
    const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (res.ok) {
        const data = await res.json();
        return data;
    } else {

        return null;
    }
}

async function deleteWork(work, token) {
    const url = `http://localhost:5678/api/works/${work.id}`;
    const res = await fetch(url, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.ok;
}

async function postWork(file, title, category) {
    const token = sessionStorage.getItem("token");
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("category", category);

    const res = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    });

    if (res.ok) {
        const newWork = await res.json();        
        createGallery(); 
    }
}

