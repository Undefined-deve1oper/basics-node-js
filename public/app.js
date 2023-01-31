document.addEventListener("click", function ({ target }) {
    if (target.dataset.type === "remove") {
        const id = target.dataset.id;

        remove(id).then(() => {
            target.closest("li").remove();
        });
    } else if (target.dataset.type === "edit") {
        const updatedTitle = prompt("Введите новое значение")?.trim();
        const id = target.dataset.id;

        if (updatedTitle) {
            edit(id, updatedTitle).then(() => {
                target.closest("li").childNodes[0].textContent = updatedTitle;
            });
        }
    }
});

async function remove(id) {
    await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(id, updatedTitle) {
    return await fetch(`/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updatedTitle })
    });
}
