import "./style.css";
import { addToDoItem } from "./todoList";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <main>
    <section class="todo-header">
    <h1>My To-Do List 📃</h1>
    <button id="add-card" type="button"></button>
    </section>
    <section class="todo-items">
    </section>
  </main>
`;

addToDoItem(document.querySelector<HTMLButtonElement>("#add-card")!);
