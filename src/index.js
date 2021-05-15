import './styles/bootstrap.min.css'
import './styles/style.css'

import './bootstrap.bundle.min.js'

import { createTask } from './objects/createTask.js'
import { createProject } from './objects/createProject.js'
import { localStorageConfig } from './objects/localStorageConfig.js'

const userInterfaceConfig = (() => {
    /**Holds methods assisting in the configuration and setup of the 
     * application's user interface.*/

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

    const _setUpAddTaskButton = () => {
        /** */
        let addTaskButton = document.querySelector('#addTaskButton');
        addTaskButton.addEventListener('click', () => {
            let newTaskObj = createTask(
                document.querySelector('#inputTaskText').value);
            localStorageConfig.pushTask(newTaskObj);
            showInbox();
        });
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

    _setUpAddTaskButton();
    showInbox();

    return { showInbox, showProject };
})();

// localStorageConfig.pushProject(createProject('Chores'));

// localStorageConfig.pushTask(
//     createTask('Buy groceries.', 'Chores'), 'Chores');
// localStorageConfig.pushTask(
//     createTask('Do laundry.', 'Chores'), 'Chores');
// localStorageConfig.pushTask(
//     createTask('Play NBA 2k for 100 hours.'));

// userInterfaceConfig.showInbox();
// userInterfaceConfig.showProject('Chores');

localStorage.clear();