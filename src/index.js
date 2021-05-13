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

const localStorageConfiguration = (() => {
    const _getUserLocalStorage = () => {
        if (!localStorage.getItem('storist')) {
            localStorage.setItem('storist', '[]');
        } 
        return localStorage.getItem('storist');
    }

    const _updateUserLocalStorage = (updatedLocalStorage) => {
        let updatedLocalStorageString = JSON.stringify(updatedLocalStorage);
        localStorage.setItem('storist', updatedLocalStorageString);
    }

    const addProjectToLocalStorage = (project) => {
        let userLocalStorage = JSON.parse(_getUserLocalStorage());
        userLocalStorage.push(project);
        _updateUserLocalStorage(userLocalStorage);
    }

    return { addProjectToLocalStorage }
})();

let newProject = createProject('Personal');
localStorageConfiguration.addProjectToLocalStorage(newProject);
console.log(localStorage);
localStorage.clear();

// Configure task and project generation in local storage
    // Add projects to local storage
        // Setup local storage JSON if not present
        // Add project to storist local storage JSON 
    // Add tasks to projects in local storage
        // Setup local storage JSON if not present
        // Get project that task will be pushed into
        // Push task into project

// Set up task and project displaying in user interface