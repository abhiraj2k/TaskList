const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Loading all EventListners

loadeventlisteners();


// Function event listner

function loadeventlisteners() {
    // DOM load Event
    document.addEventListener('DOMContentLoaded', gettasks);
    // add task event
    form.addEventListener('submit', addtask);
    // remove task event
    taskList.addEventListener('click', removeTask);
    // Clear task Event
    clearBtn.addEventListener('click', clearTask);
    // Filter tasks Event
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from LS function
function gettasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task) {

        // create li element
        const li = document.createElement('li');
        li.className = 'collection-item'
        // Text Node
        li.appendChild(document.createTextNode(task));
        // link element
        const link = document.createElement('a');
        link.className = ('delete-item secondary-content');
        link.innerHTML = '<i class = "fa fa-remove"></i>';
        li.appendChild(link);

        taskList.appendChild(li);

    });

}


// Addtask function

function addtask(e) {
    if (taskInput.value === '') {
        alert('Add a Task')
    } else {


        // create li element
        const li = document.createElement('li');
        li.className = 'collection-item'
        // Text Node
        li.appendChild(document.createTextNode(taskInput.value));
        // link element
        const link = document.createElement('a');
        link.className = ('delete-item secondary-content');
        link.innerHTML = '<i class = "fa fa-remove"></i>';
        li.appendChild(link);

        taskList.appendChild(li);

    }

    // Store in LS
    storeTaskInLocalStorage(taskInput.value);
    taskInput.value = '';
    e.preventDefault();
}

// Store in LS Function

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Remove task funcion
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();

            // remove from LS
            removeFromLocalStorage(e.target.parentElement.parentElement);
        }
    }

}

// Remove from LS
function removeFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
 
}

// Clear Task Function
function clearTask(e) {
    // slower
    // taskList.innerHTML='';

    // faster
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    clearTasksFromLocalStorage();
    e.preventDefault();
}
// Clear Tasks From Local Storage
function clearTasksFromLocalStorage(){
    localStorage.clear();
} 
// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    // console.log(e.target.value);
    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });

}