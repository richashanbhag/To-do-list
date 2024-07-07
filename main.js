document.addEventListener('DOMContentLoaded', () => {
    let tasks = [];

    const addTask = () => {
        const taskInput = document.getElementById("taskInput");
        const text = taskInput.value.trim();
        if (text) {
            tasks.push({ text: text, completed: false });
            taskInput.value = "";
            updateTasksList();
            updateStats();
        }
    };

    const updateTasksList = () => {
        const taskList = document.getElementById("task-list");
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <div class="taskItem">
                    <div class="task ${task.completed ? 'completed' : ''}">
                        <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
                        <p>${task.text}</p>
                    </div>
                    <div class="icons">
                        <img src="edit.png" class="edit-icon" data-index="${index}" />
                        <img src="delete.png" class="delete-icon" data-index="${index}" />
                    </div>
                </div>
            `;
            listItem.querySelector('.checkbox').addEventListener('change', () => toggleTaskComplete(index));
            listItem.querySelector('.delete-icon').addEventListener('click', () => deleteTask(index));
            listItem.querySelector('.edit-icon').addEventListener('click', () => editTask(index));
            taskList.append(listItem);
        });
    };

    const toggleTaskComplete = (index) => {
        tasks[index].completed = !tasks[index].completed;
        updateTasksList();
        updateStats();
    };

    const deleteTask = (index) => {
        tasks.splice(index, 1);
        updateTasksList();
        updateStats();
    };

    const editTask = (index) => {
        const newText = prompt("Edit task:", tasks[index].text);
        if (newText !== null) {
            tasks[index].text = newText.trim();
            updateTasksList();
            updateStats();
        }
    };
    const updateStats =() =>{
        const completeTasks =tasks.filter(task=> task.completed).length
        const totalTasks =tasks.length
        const progress =(completeTasks/totalTasks)*100
        const progressBar= document.getElementById('progress')
        progressBar.style.width =`${progress}%`;
        document.getElementById("numbers").innerText=`${completeTasks}/${totalTasks}`;
    };

    document.getElementById('newTask').addEventListener('click', function (e) {
        e.preventDefault();
        addTask();
    });
});
