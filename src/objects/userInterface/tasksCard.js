import { localStorageConfig } from '../localStorageConfig.js';

const tasksCard = (() => {
    /**Card showing currently displayed tasks, either from user's Inbox or a
     * specific project of theirs. */

    const _createTaskNode = (taskObject) => {
        /**Returns div node constructed out of a task object.
         * 
         * Args:
         *  taskObject (object) : Task object holding data that the div node
         *      will be constructed out of.*/
        let taskCheckBox = document.createElement('div');
        taskCheckBox.classList.add('task-checkbox');

        let taskText = document.createElement('div');
        taskText.classList.add('task-text');
        taskText.textContent = taskObject.text;

        let taskNode = document.createElement('div');
        taskNode.classList.add('task', 'card-text');
        taskNode.append(taskCheckBox, taskText);

        return taskNode;
    }

    const _updateTasksDiv = (arrayOfTaskObjects) => {
        /**Erases inner HTML of #tasks div and fills it with nodes made out
         * of tasks from a passed array.
         * 
         * Args:
         *  arrayOfTaskObjects (array) : Array holding tasks objects to be 
         *      made nodes out of.*/
        let tasksDiv = document.querySelector('#tasks');
        tasksDiv.innerHTML = '';
        for (let i = 0; i < arrayOfTaskObjects.length; i++) {
            tasksDiv.append(_createTaskNode(arrayOfTaskObjects[i]));
        }
    }

    const showInbox = () => {
        /**Updates the #tasks div to show only those tasks that are in the 
         * user's inbox.*/
        let inbox = localStorageConfig.getLocalStorageAsObject().inbox;
        _updateTasksDiv(inbox);
    }

    const showProject = (targetProjectName) => {
        /**Updates the #tasks div to only show tasks from a particular 
         * project.
         * 
         * Args:
         *  targetProjectName (string) : Name of the project holding tasks to
         *      be displayed.*/        
        let project = localStorageConfig.getProjectObject(targetProjectName);
        _updateTasksDiv(project.tasks);
    }

    showInbox();

    return { showInbox, showProject };
})();

export { tasksCard }