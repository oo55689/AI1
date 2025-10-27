class Todo {
  constructor() {
    this.container = document.createElement("div");
    this.container.className = "todo-container";

    this.searchInput = this.createInput("search", "Szukaj...");
    this.list = document.createElement("ul");
    this.list.className = "todo-list";

    this.newTask = this.createInput("text", "Nowe zadanie...");
    this.newDate = this.createInput("date");
    const today = new Date();
    const minDate = today.toISOString().split("T")[0];
    this.newDate.min = minDate;

    this.addBtn = this.createButton("Dodaj", () => this.addTask());

    const addForm = document.createElement("div");
    addForm.className = "add-form";
    addForm.append(this.newTask, this.newDate, this.addBtn);

    this.container.append(this.searchInput, this.list, addForm);
    document.body.appendChild(this.container);

    this.tasks = [];
    this.term = "";
    this.load();

    this.searchInput.addEventListener("input", e => {
      this.term = e.target.value.toLowerCase().trim();
      this.draw();
    });

    this.draw();
  }

  createInput(type, placeholder = "") {
    const input = document.createElement("input");
    input.type = type;
    if (placeholder) input.placeholder = placeholder;
    return input;
  }

  createButton(label, onClick) {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.addEventListener("click", onClick);
    return btn;
  }

  draw() {
    this.list.innerHTML = "";
    const filtered = this.getFilteredTasks();

    if (filtered.length === 0) {
      const empty = document.createElement("li");
      empty.textContent = "Brak zadań.";
      empty.className = "empty";
      this.list.appendChild(empty);
      return;
    }

    filtered.forEach(task => {
      const li = document.createElement("li");
      li.className = "todo-item";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.done;
      checkbox.addEventListener("change", () => {
        task.done = checkbox.checked;
        this.save();
      });

      const span = document.createElement("span");
      span.className = "todo-text";
      span.innerHTML = this.highlight(task.text);
      span.addEventListener("click", () => this.editTask(task.id));

      const date = document.createElement("span");
      date.className = "todo-date";
      date.textContent = task.date || "";

      const delBtn = this.createButton("Usuń", () => this.deleteTask(task.id));

      li.append(checkbox, span, date, delBtn);
      this.list.appendChild(li);
    });

    this.save();
  }

  addTask() {
    const text = this.newTask.value.trim();
    const date = this.newDate.value;

    if (text.length < 3 || text.length > 255) {
      alert("Zadanie musi mieć od 3 do 255 znaków.");
      return;
    }

    if (date) {
      const today = new Date();
      const chosen = new Date(date);
      today.setHours(0, 0, 0, 0);
      chosen.setHours(0, 0, 0, 0);
      if (chosen < today) {
        alert("Nie można wybrać daty z przeszłości.");
        return;
      }
    }

    this.tasks.push({
      id: Date.now(),
      text,
      date,
      done: false
    });

    this.newTask.value = "";
    this.newDate.value = "";
    this.draw();
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.draw();
  }

  editTask(id) {
    const task = this.tasks.find(t => t.id === id);
    const li = [...this.list.children].find(li =>
      li.textContent.includes(task.text)
    );
    if (!li) return;

    li.innerHTML = "";
    const input = document.createElement("input");
    input.type = "text";
    input.value = task.text;
    const dateInput = document.createElement("input");
    dateInput.type = "date";
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
    dateInput.value = task.date || "";
    const saveBtn = this.createButton("Zapisz", () => {
      const val = input.value.trim();
      const newDate = dateInput.value;
      if (val.length < 3) return alert("Za krótki tekst!");
      if (newDate) {
        const now = new Date();
        const chosen = new Date(newDate);
        now.setHours(0, 0, 0, 0);
        chosen.setHours(0, 0, 0, 0);
        if (chosen < now) {
          alert("Nie można ustawić daty z przeszłości.");
          return;
        }
      }
      task.text = val;
      task.date = newDate;
      this.draw();
    });

    li.append(input, dateInput, saveBtn);
    input.focus();
  }

  getFilteredTasks() {
    if (this.term.length < 2) return this.tasks;
    return this.tasks.filter(t =>
      t.text.toLowerCase().includes(this.term)
    );
  }

  highlight(text) {
    if (this.term.length < 2) return text;
    const re = new RegExp(`(${this.term})`, "gi");
    return text.replace(re, `<mark>$1</mark>`);
  }

  save() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  load() {
    const data = localStorage.getItem("tasks");
    if (data) this.tasks = JSON.parse(data);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Todo();
});
