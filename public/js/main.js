const deleteBtn = document.querySelectorAll(".del");
const todoItem = document.querySelectorAll(".todoItem span");
const todoItemComplete = document.querySelectorAll(".todoItem span.completed");

Array.from(deleteBtn).forEach((el) => {
  el.addEventListener("click", deleteTodo);
});

Array.from(todoItem).forEach((el) => {
  el.addEventListener("click", markComplete);
});

Array.from(todoItem).forEach((el) => {
  el.addEventListener("click", undo);
});

async function deleteTodo() {
  alert("Clicked!");
  const todoText = this.parentNode.childNodes[1].innerText;
  try {
    const response = await fetch("deleteTodo", {
      method: "delete",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        todoTextStuff: todoText,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload;
  } catch {}
}

async function markComplete() {
  const todoText = this.parentNode.childNodes[1].innerText;
  try {
    const response = await fetch("markComplete", {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        todoTextStuff: todoText,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload;
  } catch {}
}

async function undo() {
  const todoText = this.parentNode.childNodes[1].innerText;
  try {
    const response = await fetch("undo", {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        todoTextStuff: todoText,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload;
  } catch {}
}
