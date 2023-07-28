import { notes } from "./data.js";
import { UserTasks } from "./UserTasks.js";

window.addEventListener("load", () => {
    const userForm = document.querySelector(".js--form");
    const task = new UserTasks(userForm, notes);
});
