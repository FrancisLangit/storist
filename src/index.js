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
    const _getLocalStorageAsObject = () => {
        if (!localStorage.getItem('storist')) {
            localStorage.setItem('storist', '[]');
        } 
        return JSON.parse(localStorage.getItem('storist'));
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

    const pushProject = (newProjectObject) => {
        /**Pushes a new project object into user's "storist" array.
         * 
         * Args:
         *  newProjectObject (object) : Project object to be pushed.*/
        let currentLocalStorage = _getLocalStorageAsObject();
        currentLocalStorage.push(newProjectObject);
        _updateLocalStorage(currentLocalStorage);
    }

    const pushTask = (newTaskObject, targetProjectName) => {
        /**Pushes a new task into a targeted project object's tasks array.
         * 
         * Args:
         *  newTaskObject (object) : Task object to be pushed.
         *  targetProjectName (string) : Name of the target project where
         *      newTaskObject will be pushed to.*/
        let currentLocalStorage = _getLocalStorageAsObject();
        let targetProjectObject = currentLocalStorage.find(projectObject => {
            return projectObject.name === targetProjectName;
        });
        targetProjectObject.tasks.push(newTaskObject);
        _updateLocalStorage(currentLocalStorage);
    }

    return { pushProject, pushTask }
})();

let newProject = createProject('Personal');
localStorageConfiguration.pushProject(newProject);
console.log(localStorage);

let newTask = createTask('Buy flowers for mom.');
localStorageConfiguration.pushTask(newTask, 'Personal');
console.log(localStorage);

localStorage.clear();