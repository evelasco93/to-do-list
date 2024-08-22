import "./style.css";
import { addToDoItem } from "./todoList";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <section id="todo-list">
    <section class="todo-header">
    <h1>My To-Do List 📃</h1>
    <button id="add-card" type="button"></button>
    </section>
    <section class="todo-items">
    </section>
  </section>
`;

addToDoItem(document.querySelector<HTMLButtonElement>("#add-card")!);
