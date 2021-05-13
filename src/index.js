import './styles/bootstrap.min.css'
import './styles/style.css'

import './bootstrap.bundle.min.js';

const createTask = (text) => {
    return { text }
}

const createProject = (name) => {
    let tasks = []
    
    const addTask = (task) => {
        tasks.push(task);
    }

    return { name, tasks, addTask }
}

const main = (() => {
    const configureLocalStorage = () => {
        if (!localStorage.getItem('storist')) {
            localStorage.setItem('storist', '[]');
        }
    }

    configureLocalStorage();
})();

// let newTask = createTask('Wash the dishes.');
// console.log(newTask);

// let newProject = createProject('Chores');
// newProject.addTask(newTask);
// console.log(newProject);