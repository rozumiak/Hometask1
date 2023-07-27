const notes = [
    {
        name: "Shopping list",
        created: "20.03.2021",
        category: "Task",
        content: "Tomatoes,bread",
        dates: "",
    },
    {
        name: "The theory",
        created: "27.03.2021",
        category: "Random thought",
        content: "Evolution",
        dates: "",
    },
    {
        name: "New Feature",
        created: "05.05.2021",
        category: "Idea",
        content: "Implement new feature on the 07.05.2021",
        dates: "07.05.2021",
    },
    {
        name: "William Gaddis",
        created: "07.03.2021",
        category: "Idea",
        content: "You shell not pass",
        dates: "",
    },
    {
        name: "Books",
        created: "15.05.2021",
        category: "Task",
        content: "Learn new language",
        dates: "",
    },
    {
        name: "Go in bar",
        created: "20.07.2021",
        category: "Random thought",
        content: "Drink",
        dates: "",
    },
    {
        name: "Take a shower",
        created: "21.02.2021",
        category: "Random thought",
        content: "Oh, yeah",
        dates: "",
    },
];

function UserTasks(_form, notes) {
    const _btn = _form.querySelector("button");
    const _archiveAll = _form.querySelector(".js--archive-all");
    const _deleteAll = _form.querySelector(".js--delete-all");
    const _tbody = _form.querySelector("tbody");
    const _modal = _form.querySelector(".modal");
    const _btnModal = _modal.querySelector("button");
    this._notes = notes;

    this.createNote = function (content) {
        return `
        <tr>
            <td>${content.name}</td>
            <td>${content.created}</td>
            <td>${content.category}</td>
            <td>${content.content}</td>
            <td>${content.dates}</td>
            <td>
                <img src="./icons/edit.png" alt="Edit" />
                <img src="./icons/archive.png" alt="Archive" />
                <img src="./icons/delete.png" alt="Delete" />
            </td>
        </tr>`;
    };

    this.renderTable = function (notes) {
        _tbody.innerHTML = "";
        const rows = notes.map((element) => this.createNote(element)).join("");
        _tbody.insertAdjacentHTML("beforeend", rows);
    };

    this.parseDate = function (contentValue) {
        const dateRegex = /\b(?:(?<day>\d{1,2})[./](?<month>\d{1,2})[./](?<year>\d{4})|(?<year2>\d{4})[./](?<month2>\d{1,2})[./](?<day2>\d{1,2}))\b/g;
         return contentValue.match(dateRegex);

    };

    this.addNote = () => {
        _modal.style.display = "block";
        _btnModal.addEventListener("click", (event) => {
            event.preventDefault();
            const _nameValue = _modal.querySelector("#name").value;
            const _categoryValue = _modal.querySelector("#category").value;
            const _contentValue = _modal.querySelector("#content").value;

            this._notes = [
                ...this._notes,
                {
                    name: _nameValue,
                    created: new Date().toJSON().slice(0, 10),
                    category: _categoryValue,
                    content: _contentValue,
                    dates: this.parseDate(_contentValue),
                },
            ];

            this.renderTable(this._notes);

            _modal.style.display = "none";
        });
    };
    this.editNote = function () {};
    this.archiveNote = function () {};
    this.deleteNote = function () {};

    this.renderTable(this._notes);

    const _allStrTbody = _tbody.querySelectorAll("tr");
    console.log(_allStrTbody);

    _btn.addEventListener("click", this.addNote);
}

const userForm = document.querySelector(".js--form");
const task = new UserTasks(userForm, notes);
//userForm.addEventListener("submit", task.createNote);
