// Example for fetching data and display it
fetch('/category')
    .then(res => res.json())
    .then(res => {
        if(!res) {
            return;
        }
        const rootElement = document.querySelector("#categoryList");
        res.categories.forEach(category => {
            rootElement.innerHTML = `${rootElement.innerHTML}<li>${category.name}</li>`;
        });
    });