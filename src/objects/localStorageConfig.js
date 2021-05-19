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
        let currentStorage = getLocalStorageAsObject();
        let projects = currentStorage['projects'];
        projects.push(newProjectObject);
        _updateLocalStorage(currentStorage);
    }

    const pushTask = (newTaskObject, targetProjectName) => {
        /**Pushes a new task into a targeted project object's tasks array. If
         * no project indicated, pushes task to user's inbox by default.
         * 
         * Args:
         *  newTaskObject (object) : Task object to be pushed.
         *  targetProjectName (string) : Name of the target project where
         *      newTaskObject will be pushed to.*/
        let currentStorage = getLocalStorageAsObject();
        if (!targetProjectName) {
            currentStorage['inbox'].push(newTaskObject);
        } else {
            let targetProjectObject = currentStorage.projects.find(
                (projectObject) => {
                    return projectObject.name === targetProjectName;
                }
            );
            targetProjectObject['tasks'].push(newTaskObject);
        }
        _updateLocalStorage(currentStorage);
    }

    return { getLocalStorageAsObject, getProjectObject, pushProject, 
        pushTask }
})();

export { localStorageConfig }