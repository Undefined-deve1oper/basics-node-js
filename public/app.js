let isEdit = false;

function toggleEditState() {
    return (isEdit = !isEdit);
}
function getNoteId(event) {
    return event.target.closest("li").dataset.id;
}

function renderNoteItem(event) {
    const noteParent = event.target.closest("li");
    const title =
        event.target.closest("div").previousElementSibling.textContent ||
        event.target.closest("div").previousElementSibling.value;

    if (isEdit) {
        noteParent.innerHTML = `
		<input type="text" class="form-control w-25" autofocus value="${title}" />
		<div class="d-flex gap-3">
			<button class="btn btn-success" data-type="save">Сохранить</button>
			<button class="btn btn-danger" data-type="cancel">Отменить</button>
		</div>
		`;
    } else {
        noteParent.innerHTML = `
		<span>${title}</span>

		<div class="d-flex gap-3">
			<button
				class="btn btn-primary"
				data-type="edit"
				data-id="<%= notes[i].id %>"
			>
				Обновить
			</button>
			<button
				class="btn btn-danger"
				data-type="remove"
				data-id="<%= notes[i].id %>"
			>
				&times;
			</button>
		</div>
		`;
    }
}

document.addEventListener("click", function (event) {
    if (event.target.dataset.type === "edit") {
        toggleEditState();
        renderNoteItem(event);
    }
    if (event.target.dataset.type === "save") {
        const id = getNoteId(event);
        const updatedTitle =
            event.target.closest("div").previousElementSibling.value;

        edit(id, updatedTitle).then(() => {
            toggleEditState();
            renderNoteItem(event);
        });
    }
    if (event.target.dataset.type === "cancel") {
        toggleEditState();
        renderNoteItem(event);
    }
    if (event.target.dataset.type === "remove") {
        const id = getNoteId(event);

        remove(id).then(() => {
            event.target.closest("li").remove();
        });
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
