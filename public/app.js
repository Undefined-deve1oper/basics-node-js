let isEdit = false;

function toggleEditState() {
    return (isEdit = !isEdit);
}
function parentLi(event) {
    return event.target.closest("li");
}

function renderNoteItem(event) {
    const noteParent = parentLi(event);
    const title =
        event.target.closest("div").previousElementSibling.textContent;

    if (isEdit) {
        noteParent.innerHTML = `
		<input type="text" class="form-control" id="floatingInput" value="${title}" />
		<div class="d-flex gap-3">
			<button class="btn btn-success" data-type="save">Сохранить</button>
			<button class="btn btn-danger" data-type="cancel">Отменить</button>
		</div>
		`;
    } else {
        const title = event.target.closest("div").previousElementSibling.value;
        noteParent.innerHTML = `
		<span>${title}</span>

		<div class="d-flex gap-3">
			<button
				class="btn btn-primary"
				data-type="edit"
				data-id="<%= notes[i].id %>"
			>
				Редактировать
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
        const id = event.target.dataset.id;
        const updatedTitle =
            event.target.closest("div").previousElementSibling.value;

        toggleEditState();
        renderNoteItem(event);

        edit(id, updatedTitle);
    }
    if (event.target.dataset.type === "cancel") {
        toggleEditState();
        renderNoteItem(event);
    }
    if (event.target.dataset.type === "remove") {
        const id = event.target.dataset.id;

        remove(id).then(() => {
            parentLi(event).remove();
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
