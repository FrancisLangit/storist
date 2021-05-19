import { localStorageConfig } from '../localStorageConfig.js';

import { addTaskModal } from './addTaskModal.js';

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

    const _updateProjectNameDisplay = (projectName) => {
        /**Updates inner HTML of #tasksCardProjectNameDisplay.
         * 
         * Args:
         *  projectName : Name of the project to be displayed.*/
        let projectNameDisplay = (
            document.querySelector('#tasksCardProjectNameDisplay'));
        if (projectName) {
            projectNameDisplay.innerHTML = projectName;
        } else {
            projectNameDisplay.innerHTML = 'Inbox';
        }
    }

    const _updateTasksDisplay = (arrayOfTaskObjects) => {
        /**Erases inner HTML of #tasksCardTasksDisplay div and fills it with
         * nodes made out of tasks from a passed array.
         * 
         * Args:
         *  arrayOfTaskObjects (array) : Array holding tasks objects to be 
         *      made nodes out of.*/
        let tasksDiv = document.querySelector('#tasksCardTasksDisplay');
        tasksDiv.innerHTML = '';
        for (let i = 0; i < arrayOfTaskObjects.length; i++) {
            tasksDiv.append(_createTaskNode(arrayOfTaskObjects[i]));
        }
    }

    const showInbox = () => {
        /**Updates the #tasks div to show only those tasks that are in the 
         * user's inbox.*/
        let inbox = localStorageConfig.getLocalStorageAsObject().inbox;
        _updateProjectNameDisplay('Inbox');
        _updateTasksDisplay(inbox);
    }

    const showProject = (targetProjectName) => {
        /**Updates the #tasks div to only show tasks from a particular 
         * project.
         * 
         * Args:
         *  targetProjectName (string) : Name of the project holding tasks to
         *      be displayed.*/        
        let project = localStorageConfig.getProjectObject(targetProjectName);
        _updateProjectNameDisplay(project.name);
        _updateTasksDisplay(project.tasks);
    }

    const _setUpAddTaskButton = () => {
        /**Adds click listener to "Add Task" button. Makes it update the 
         * "Projects" dropdown menu of the "Add Task" modal.*/
        let addTaskButton = document.querySelector('#tasksCardAddTaskButton');
        addTaskButton.addEventListener('click', () => {
            addTaskModal.setProjectsDropdown();
        });
    }

    showInbox();
    _setUpAddTaskButton();

    return { showInbox, showProject };
})();

export { tasksCard }