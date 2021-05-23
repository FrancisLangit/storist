import { addTaskModal } from './addTaskModal.js';
import { localStorageConfig } from '../localStorageConfig.js';


const createTaskNode = (taskObject) => {
    /**Returns div node constructed out of a task object.
     * 
     * Args:
     *  taskObject (object) : Task object holding data that the div node
     *      will be constructed out of.*/

    const _createCheckBox = () => {
        /**Returns div node with class "task-checkbox".*/
        let checkBox = document.createElement('div');
        checkBox.classList.add('task-checkbox');

        checkBox.addEventListener('click', () => {
            let taskText = checkBox.parentNode.querySelector('.task-text');
            taskText.classList.toggle('taskDone');

            taskObject.isDone = !taskObject.isDone;
            localStorageConfig.editTask(taskObject);
        });

        return checkBox;
    }

    const _expandTaskTextNode = () => {
        console.log('hello world');
    }

    const _createTaskText = () => {
        /**Returns div node with class "task-text", textContent equal to
         * text property of taskObject.*/
        let taskText = document.createElement('div');
        taskText.textContent = taskObject.text;
        taskText.classList.add('task-text', 'card-text');
        if (taskObject.isDone) {
            taskText.classList.add('taskDone');
        }
        taskText.addEventListener('click', _expandTaskTextNode);
        return taskText;
    }

    let taskCheckBox = _createCheckBox();
    let taskText = _createTaskText();

    let taskNode = document.createElement('div');
    taskNode.append(taskCheckBox, taskText);
    taskNode.id = taskObject.id;
    taskNode.classList.add('task');

    return taskNode;
}

const tasksCard = (() => {
    /**Card showing currently displayed tasks, either from user's Inbox or a
     * specific project of theirs. */

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

    const _toggleNoTasksNode = (showNode) => {
        /**Removes or adds class "d-none" to #tasksCardNoTasks node dependent 
         * on showNode argument.
         * 
         * Args:
         *  showNode (boolean) : True if node is to be shown. False, if
         *      otherwise.*/
        let noTasksNode = document.querySelector('#tasksCardNoTasks');
        if (showNode) {
            noTasksNode.classList.remove('d-none');
        } else {
            noTasksNode.classList.add('d-none');
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
        if (arrayOfTaskObjects.length > 0) {
            _toggleNoTasksNode();
            for (let i = 0; i < arrayOfTaskObjects.length; i++) {
                tasksDiv.append(createTaskNode(arrayOfTaskObjects[i]));
            }
        } else {
            _toggleNoTasksNode(true);
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