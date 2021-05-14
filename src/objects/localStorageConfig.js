const localStorageConfig = (() => {
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

export { localStorageConfig }