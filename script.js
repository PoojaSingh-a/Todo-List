const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const allTasks = document.getElementById("allTasks");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const renderTasks = () => {
    allTasks.innerHTML = "";
    tasks.forEach((task,index) => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("tasks");

        const descDiv = document.createElement("div");
        descDiv.classList.add("desc");

        descDiv.textContent = task.done ? `✅ ${task.text}` : task.text;
        
        const optionsDiv = document.createElement("div");
        optionsDiv.classList.add("options");

        const doneButton = document.createElement("button");
        doneButton.innerHTML = `<i class="fa-solid fa-check icon" style="color: #26e759;"></i>`;
        doneButton.onclick = () => {
            tasks[index].done = !tasks[index].done;
            localStorage.setItem("tasks",JSON.stringify(tasks));
            renderTasks();
        }
        const editButton = document.createElement("button");
        editButton.innerHTML = `<i class="fa-solid fa-pen-to-square icon" style="color: #47bbf9;"></i>`;
        editButton.onclick = () => {
            const newTask = prompt("Edit task : ",task.text);
            if(newTask != null && newTask.trim() != ""){
                tasks[index].text = newTask.trim();
                localStorage.setItem("tasks",JSON.stringify(tasks));

                renderTasks();
            }
        }

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = `<i class="fa-solid fa-trash icon" style="color: #fa1d28;"></i> `;
        deleteButton.onclick = () => {
            tasks.splice(index,1);
            localStorage.setItem("tasks",JSON.stringify(tasks));
            renderTasks();
        }
        optionsDiv.appendChild(doneButton);
        optionsDiv.appendChild(editButton);
        optionsDiv.appendChild(deleteButton);

        taskDiv.appendChild(descDiv);
        taskDiv.appendChild(optionsDiv);
        allTasks.appendChild(taskDiv);
    })
}

taskForm.addEventListener("submit",(e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if(taskText){
        tasks.push({ text:taskText,done:false});
        localStorage.setItem("tasks", JSON.stringify(tasks));

            renderTasks();
            taskInput.value = "";
    }
})

renderTasks();