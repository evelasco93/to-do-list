import { ITodoListItem } from "./common/types";

// Creates a to-do item based on user input
function createTodoItem(values: ITodoListItem) {
  const todoItem = document.createElement("div");
  todoItem.className = "todo-item";

  const title = document.createElement("h3");
  title.className = "todo-item-title";
  title.innerText = values.title;

  const contentContainer = document.createElement("div");
  contentContainer.className = "todo-item-content";

  const checkboxContainer = document.createElement("div");
  checkboxContainer.className = "todo-item-checkbox";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = values.status;
  checkboxContainer.appendChild(checkbox);

  const status = document.createElement("span");
  status.className = `todo-item-status ${values.status ? "done" : "pending"}`;

  checkbox.addEventListener("change", () => {
    values.status = checkbox.checked;
    status.className = `todo-item-status ${values.status ? "done" : "pending"}`;
    status.innerText = values.status ? "Done" : "Pending";
  });

  status.innerText = values.status ? "Done" : "Pending";

  contentContainer.appendChild(checkboxContainer);
  contentContainer.appendChild(title);
  contentContainer.appendChild(status);

  const actionsContainer = document.createElement("div");
  actionsContainer.className = "todo-item-actions";

  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.className = "todo-item-edit";
  editButton.addEventListener("click", () => {
    const newTitle = prompt("Enter new title:", values.title);
    if (newTitle) {
      values.title = newTitle;
      title.innerText = values.title;
    }
  });

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.className = "todo-item-delete";
  deleteButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this item?")) {
      todoItem.remove();
    }
  });

  actionsContainer.appendChild(editButton);
  actionsContainer.appendChild(deleteButton);

  todoItem.appendChild(contentContainer);
  todoItem.appendChild(actionsContainer);

  return todoItem;
}

// Pop up form to ask the user for a title and lets them submit it
function showPopupAndCreateTodoItem() {
  const overlay = document.createElement("div");
  overlay.className = "overlay";

  const popup = document.createElement("div");
  popup.className = "add-todo-item-form";

  const titleLabel = document.createElement("label");
  titleLabel.innerText = "Title";

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.placeholder = "Give this task a title...";
  titleInput.required = true;

  const submitButton = document.createElement("button");
  submitButton.innerHTML = "Add";

  submitButton.addEventListener("click", () => {
    if (titleInput.value.trim() === "") {
      alert("Please give your task a title");
      return;
    }

    const todoItem = createTodoItem({
      title: titleInput.value,
      status: false,
    });

    const todoItemsSection =
      document.querySelector<HTMLDivElement>(".todo-items");
    todoItemsSection?.appendChild(todoItem);

    closePopup(popup, overlay);
  });

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closePopup(popup, overlay);
    }
  });

  popup.appendChild(titleLabel);
  popup.appendChild(titleInput);
  popup.appendChild(submitButton);
  document.body.appendChild(overlay);
  document.body.appendChild(popup);
}

// handling closing the pop up (pseudo modal)
function closePopup(popup: HTMLElement, overlay: HTMLElement) {
  document.body.removeChild(popup);
  document.body.removeChild(overlay);
}

// Function given to the add item button on the main page
export function addToDoItem(button: HTMLButtonElement) {
  button.innerHTML = "+ Add item";
  button.addEventListener("click", showPopupAndCreateTodoItem);
}
