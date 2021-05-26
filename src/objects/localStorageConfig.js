const localStorageConfig = (() => {
    /**Holds methods allowing for the configuration and usage of the user's 
     * localStorage "storist" array.*/
    
    const _checkLocalStorage = () => {
        /**Checks 'storist' object in users localStorage and sets it up if it
         * is missing.*/
        if (!localStorage.getItem('storist')) {
            const initialLocalStorage = JSON.stringify(
                {'inbox': [], 'projects': []});
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

    const getProjectObject = (targetProjectName) => {
        /**Returns a targeted locally stored project object in 'storist' of 
         * user's localStorage.
         * 
         * Args:
         *  targetProjectName (string) : Name of the project object to be 
         *      returned.*/
        let projectObjects = getLocalStorageAsObject().projects;
        return projectObjects.find(projectObject => {
            return projectObject.name === targetProjectName;
        });
    }

    const pushProject = (newProjectObject) => {
        /**Pushes a new project object into user's "storist" array.
         * 
         * Args:
         *  newProjectObject (object) : Project object to be pushed.*/
        let storage = getLocalStorageAsObject();
        let projects = storage['projects'];
        projects.push(newProjectObject);
        _updateLocalStorage(storage);
    }

    const pushTask = (newTaskObject, targetProjectName) => {
        /**Pushes a new task into a targeted project object's tasks array. If
         * no project indicated, pushes task to user's inbox by default.
         * 
         * Args:
         *  newTaskObject (object) : Task object to be pushed.
         *  targetProjectName (string) : Name of the target project where
         *      newTaskObject will be pushed to.*/
        let storage = getLocalStorageAsObject();
        if (!targetProjectName) {
            storage['inbox'].push(newTaskObject);
        } else {
            let targetProjectObject = storage.projects.find(projectObject => {
                return projectObject.name === targetProjectName;
            });
            targetProjectObject['tasks'].push(newTaskObject);
        }
        _updateLocalStorage(storage);
    }

    const _replaceTaskInArray = (newTaskObject, arrayOfTaskObjects) => {
        /**Replaces a task object with another in an array of task objects.
         * 
         * Args:
         *  newTaskObject (object) : Task object to replace with.
         *  arrayOfTaskObjects (array) : Array of made up of task objects.*/
        return arrayOfTaskObjects.map(
            task => (task.id === newTaskObject.id) ? newTaskObject : task);
    }

    const _getProjectIndex = (projectObjectName) => {
        /**Returns index of project object passed in projects array of 
         * localStorage.*/
        let storage = getLocalStorageAsObject();
        return storage.projects.findIndex(project => { 
            return project.name === projectObjectName; 
        });
    }

    const editTask = (newTaskObject) => {
        /**Replaces a task object with its corresponding match in user's 
         * local storage.
         * 
         * Args:
         *  newTaskObject (object) : Task object to replace with.*/
        let storage = getLocalStorageAsObject();
        if (!newTaskObject.parentProjectName) {
            storage.inbox = _replaceTaskInArray(newTaskObject, storage.inbox);
        } else {
            let projIndex = _getProjectIndex(newTaskObject.parentProjectName);
            storage.projects[projIndex].tasks = _replaceTaskInArray(
                newTaskObject, storage.projects[projIndex].tasks);
        }
        _updateLocalStorage(storage);
    }

    const _getFilteredTasksArray = (taskToFilterOut, tasksArrayToFilter) => {
        /**Returns array with task object passed filtered out of it.
         * 
         * Args:
         *  taskToFilterOut (object) : Task object to filter out of array.
         *  tasksArrayToFilter (array): Array of task objects to filter task 
         *      object out of.*/
        return tasksArrayToFilter.filter(t => t.id !== taskToFilterOut.id);
    }

    const deleteTask = (taskObject) => {
        /**Deletes passed task object from localStorage.
         * 
         * Args:
         *  taskObject (object): Task object to delete from localStorage.*/
        let storage = getLocalStorageAsObject();
        if (!taskObject.parentProjectName) {
            storage.inbox = _getFilteredTasksArray(taskObject, storage.inbox);
        } else {
            let projIndex = _getProjectIndex(taskObject.parentProjectName);
            storage.projects[projIndex].tasks = _getFilteredTasksArray(
                taskObject, storage.projects[projIndex].tasks)
        }
        _updateLocalStorage(storage);
    }

    const deleteProject = (projectName) => {
        /**Deletes a project from the local storage.
         * 
         * Args:
         *  projectName (string): Name of the project to be deleted.*/
        let storage = getLocalStorageAsObject();
        let projectIndex = _getProjectIndex(projectName);
        let project = storage.projects[projectIndex];
        storage.projects = storage.projects.filter(p => p.id !== project.id);
        _updateLocalStorage(storage);
    }

    return { getLocalStorageAsObject, getProjectObject, pushProject, 
        pushTask, editTask, deleteTask, deleteProject }
})();

export { localStorageConfig }