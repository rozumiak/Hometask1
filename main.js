const notes = [
    {
        id: Date.now() + 1,
        name: "Shopping list",
        created: "20.03.2021",
        category: "Task",
        content: "Tomatoes,bread",
        dates: "",
    },
    {
        id: Date.now() + 2,
        name: "The theory",
        created: "27.03.2021",
        category: "Random thought",
        content: "Evolution",
        dates: "",
    },
    {
        id: Date.now() + 3,
        name: "New Feature",
        created: "05.05.2021",
        category: "Idea",
        content: "Implement new feature on the 07.05.2021",
        dates: "07.05.2021",
    },
    {
        id: Date.now() + 4,
        name: "William Gaddis",
        created: "07.03.2021",
        category: "Idea",
        content: "You shell not pass",
        dates: "",
    },
    {
        id: Date.now() + 5,
        name: "Books",
        created: "15.05.2021",
        category: "Task",
        content: "Learn new language",
        dates: "",
    },
    {
        id: Date.now() + 6,
        name: "Go in bar",
        created: "20.07.2021",
        category: "Random thought",
        content: "Drink",
        dates: "",
    },
    {
        id: Date.now() + 7,
        name: "Take a shower",
        created: "21.02.2021",
        category: "Random thought",
        content: "Oh, yeah",
        dates: "",
    },
];

function UserTasks(_form, notes) {
    const _btn = _form.querySelector("button");
    const _countActiveIdea = document.querySelector(".js--count-active-idea");
    const _countActiveTask = document.querySelector(".js--count-active-task");
    const _countActiveThought = document.querySelector(".js--count-active-thought");

    const _archiveAll = _form.querySelector(".js--archive-all");
    const _deleteAll = _form.querySelector(".js--delete-all");
    const _table = _form.querySelector("table");
    const _tbody = _form.querySelector("tbody");
    const _modal = _form.querySelector(".modal");
    const _btnModal = _modal.querySelector("button");

    this._notes = notes;
    this.currentItemId = null;

    this.createNote = function (content) {
        return `
        <tr data-id="${content.id}">
            <td>${content.name}</td>
            <td>${content.created}</td>
            <td>${content.category}</td>
            <td>${content.content}</td>
            <td>${content.dates}</td>
            <td>
                <img class="js--edit" src="./icons/edit.png" alt="Edit" />
                <img class="js--archive" src="./icons/archive.png" alt="Archive" />
                <img class="js--delete" src="./icons/delete.png" alt="Delete" />
            </td>
        </tr>`;
    };

    this.renderTable = function (notes) {
        _tbody.innerHTML = "";
        const rows = notes.map((element) => this.createNote(element)).join("");
        _tbody.insertAdjacentHTML("beforeend", rows);

        document.querySelectorAll(".js--delete").forEach((item) => {
            item.addEventListener("click", this.deleteNote);
        });
        document.querySelectorAll(".js--edit").forEach((item) => {
            item.addEventListener("click", this.editNote);
        });
        document.querySelectorAll(".js--archive").forEach((item) => {
            item.addEventListener("click", this.archiveNote);
        });
        const {
            countIdeaCategory,
            countTaskCategory,
            countRandomThoughtCategory,
        } = this.getCountCategory();
        _countActiveIdea.innerHTML = countIdeaCategory;
        _countActiveTask.innerHTML = countTaskCategory;
        _countActiveThought.innerHTML = countRandomThoughtCategory;
    };

    this.parseDate = function (contentValue) {
        const dateRegex =
            /\b(?:(?<day>\d{1,2})[./](?<month>\d{1,2})[./](?<year>\d{4})|(?<year2>\d{4})[./](?<month2>\d{1,2})[./](?<day2>\d{1,2}))\b/g;
        return contentValue.match(dateRegex)
            ? contentValue.match(dateRegex)
            : "";
    };

    this.getModalValues = () => {
        const _nameValue = _modal.querySelector("#name");
        const _categoryValue = _modal.querySelector("#category");
        const _contentValue = _modal.querySelector("#content");
        return { _nameValue, _categoryValue, _contentValue };
    };
    this.getCountCategory = () => {
        const IdeaCategory = this._notes.filter(
            (item) => item.category === "Idea"
        );
        const TaskCategory = this._notes.filter(
            (item) => item.category === "Task"
        );
        const RandomThoughtCategory = this._notes.filter(
            (item) => item.category === "Random thought"
        );
        const countIdeaCategory = IdeaCategory.length;
        const countTaskCategory = TaskCategory.length;
        const countRandomThoughtCategory = RandomThoughtCategory.length;
        return {
            countIdeaCategory,
            countTaskCategory,
            countRandomThoughtCategory,
        };
    };

    this.addNote = () => {
        this.currentItemId = null;
        _modal.style.display = "block";
    };
    this.editNote = (event) => {
        const currentItem = event.target.closest("tr");
        const { _nameValue, _contentValue } = this.getModalValues();

        const currentNote = this._notes.find(
            (note) => note.id === +currentItem.dataset.id
        );
        if (currentNote) {
            _nameValue.value = currentNote.name;
            _contentValue.value = currentNote.content;
            _modal.style.display = "block";
            this.currentItemId = currentNote.id;
        }
    };
    this.archiveNote = () => {};
    this.deleteNote = (event) => {
        const currentItem = event.target.closest("tr");
        this._notes = this._notes.filter(
            (note) => note.id !== +currentItem.dataset.id
        );

        this.renderTable(this._notes);
    };
    this.deleteAllNote = () => {
        const rowCount = _table.rows.length;
        for (let i = rowCount - 1; i > 0; i--) {
            _table.deleteRow(i);
        }
        notes.length = 0;
    };

    this.renderTable(this._notes);
    _deleteAll.addEventListener("click", this.deleteAllNote);
    window.addEventListener("click", (event) => {
        if (event.target === _modal) {
            _modal.style.display = "none";
        }
    });
    _btn.addEventListener("click", this.addNote);
    _btnModal.addEventListener("click", (event) => {
        event.preventDefault();
        const { _nameValue, _categoryValue, _contentValue } =
            this.getModalValues();
        if (_nameValue.value || _contentValue.value) {
            if (this.currentItemId) {
                const currentNote = this._notes.find(
                    (item) => item.id === this.currentItemId
                );
                if (currentNote) {
                    const editedNote = {
                        ...currentNote,
                        name: _nameValue.value,
                        content: _contentValue.value,
                    };
                    const index = this._notes.findIndex(
                        (item) => item.id === this.currentItemId
                    );
                    this._notes.splice(index, 1, editedNote);
                }
            } else {
                this._notes = [
                    ...this._notes,
                    {
                        id: Date.now(),
                        name: _nameValue.value,
                        created: new Date().toJSON().slice(0, 10),
                        category: _categoryValue.value,
                        content: _contentValue.value,
                        dates: this.parseDate(_contentValue.value),
                    },
                ];
            }

            this.renderTable(this._notes);
            _nameValue.value = "";
            _contentValue.value = "";
            _modal.style.display = "none";
        }
    });
}

const userForm = document.querySelector(".js--form");
const task = new UserTasks(userForm, notes);
