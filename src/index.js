import './styles/bootstrap.min.css'
import './styles/style.css'

import './bootstrap.bundle.min.js';

const createTask = (text) => {
    /**Returns object representing task.
     * 
     * Args:
     *  text (string) : Main text of the task.*/
    return { text }
}

const createProject = (name) => {
    /**Returns object representing a project.
     * 
     * Args:
     *  name (string) : Name of the project.*/
    let tasks = []
    
    const addTask = (task) => {
        /**Pushes a task object into the project's tasks array.*/
        tasks.push(task); 
    }

    return { name, tasks, addTask }
}

const localStorageConfiguration = (() => {
    /**Holds methods allowing for the configuration and usage of the user's 
     * localStorage "storist" array.*/

    const _checkLocalStorage = () => {
        /**Checks 'storist' object in users localStorage and sets it up if it
         * is missing.*/
        if (!localStorage.getItem('storist')) {
            const initialLocalStorage = JSON.stringify(
                {
                    'inbox': [], 
                    'projects': [],
                }
            );
            localStorage.setItem('storist', initialLocalStorage);
        } 
    }

    const _updateLocalStorage = (newLocalStorageAsObject) => {
        /**Updates the user's current localStorage "storist" array. 
         * 
         * Args:
         *  newLocalStorageAsObject (object) : Object to update "storist" in
         *      localStorage with. Passed as object, not string.*/
        localStorage.setItem(
            'storist', JSON.stringify(newLocalStorageAsObject));
    }

    const getLocalStorageAsObject = () => {
        /**Returns localStorage 'storist' string as object.*/
        _checkLocalStorage();
        return JSON.parse(localStorage.getItem('storist'));
    }

    const pushProject = (newProjectObject) => {
        /**Pushes a new project object into user's "storist" array.
         * 
         * Args:
         *  newProjectObject (object) : Project object to be pushed.*/
        let currentLocalStorage = getLocalStorageAsObject();
        let projects = currentLocalStorage['projects'];
        projects.push(newProjectObject);
        _updateLocalStorage(currentLocalStorage);
    }

    const pushTask = (newTaskObject, targetProjectName) => {
        /**Pushes a new task into a targeted project object's tasks array. If
         * no project indicated, pushes task to user's inbox by default.
         * 
         * Args:
         *  newTaskObject (object) : Task object to be pushed.
         *  targetProjectName (string) : Name of the target project where
         *      newTaskObject will be pushed to.*/
        let currentLocalStorage = getLocalStorageAsObject();
        if (!targetProjectName) {
            currentLocalStorage['inbox'].push(newTaskObject);
        } else {
            let projects = currentLocalStorage['projects'];
            let targetProjectObject = projects.find(projectObj => {
                return projectObj.name === targetProjectName;
            });
            targetProjectObject['tasks'].push(newTaskObject);
        }
        _updateLocalStorage(currentLocalStorage);
    }

    return { getLocalStorageAsObject, pushProject, pushTask }
})();

// let newProject = createProject('Personal');
// localStorageConfiguration.pushProject(newProject);
// console.log(localStorage['storist']);

// let newTask = createTask('Buy groceries.');
// localStorageConfiguration.pushTask(newTask);
// console.log(localStorage['storist']);

// const userInterface = (() => {
//     const updateTasksDiv = () => {
//         let _tasksDiv = document.querySelector('#tasks');
//         _tasksDiv.innerHTML = '';

//         let currentLocalStorage = (
//             localStorageConfiguration.getLocalStorageAsObject());
//         console.log(currentLocalStorage);
//     }

//     updateTasksDiv();
// })();

// localStorage.clear();