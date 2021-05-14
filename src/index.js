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
        taskNode.classList.add('task');
        taskNode.classList.add('card-text');
        taskNode.append(taskCheckBox, taskText);

        return taskNode;
    }

    const showInbox = () => {
        /**Updates the #tasks div to show only those tasks that are in the 
         * user's inbox.*/
        let tasksDiv = document.querySelector('#tasks');
        tasksDiv.innerHTML = '';
        let inbox = (localStorageConfig.getLocalStorageAsObject().inbox);
        for (let i = 0; i < inbox.length; i++) {
            tasksDiv.append(_createTaskNode(inbox[i]));
        }
    }

    const showProject = (targetProjectName) => {
        /**Updates the #tasks div to only show tasks from a particular 
         * project.
         * 
         * Args:
         *  targetProjectName (string) : Name of the project holding tasks to 
         *      be displayed.*/        
        let tasksDiv = document.querySelector('#tasks');
        tasksDiv.innerHTML = '';
        let project = localStorageConfig.getProjectObject(targetProjectName);
        for (let i = 0; i < project['tasks'].length; i++) {
            tasksDiv.append(_createTaskNode(project['tasks'][i]));
        }
    }

    return { showInbox, showProject };
})();

localStorageConfig.pushProject(createProject('Chores'));

localStorageConfig.pushTask(
    createTask('Buy groceries.', 'Chores'), 'Chores');
localStorageConfig.pushTask(
    createTask('Do laundry.', 'Chores'), 'Chores');
localStorageConfig.pushTask(
    createTask('Play NBA 2k for 100 hours.'));

// userInterfaceConfig.showInbox();
userInterfaceConfig.showProject('Chores');

localStorage.clear();