function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskValue = taskInput.value.trim();

  if (taskValue === "") {
    alert("Please enter a task!");
    return;
  }

  // Create list item
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = taskValue;
  li.appendChild(span);

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete";
  deleteBtn.onclick = function() {
    li.remove();
  };
  li.appendChild(deleteBtn);

  // Add to list
  document.getElementById("taskList").appendChild(li);

  // Clear input
  taskInput.value = "";
}
