window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';

import { createTask } from './objects/createTask.js';
import { createProject } from './objects/createProject.js';
import { localStorageConfig } from './objects/localStorageConfig.js';

const addTaskModal = (() => {
    /**"Add Task" modal that appears when "+ Add Task" button is clicked.*/
    let _addTaskModalNode = new bootstrap.Modal(
        document.querySelector('#addTaskModal'));

    const _getRequiredInputs = () => {
        /**Returns array of input nodes that, by minimum, are required to be
         * filled out by the user to successfully add a task.*/
        let form = document.querySelector('#addTaskForm');
        let formInputs = form.getElementsByTagName('input');
        let formInputsAsArray = Array.from(formInputs);
        return formInputsAsArray.filter(formInput => {
            return formInput.id === 'addTaskInputText';
        });
    }

    const _isRequiredInputsFilled = () => {
        /**Returns true if all inputs in #addTaskForm are filled. Otherwise, 
         * returns false.*/
        const requiredInputs = _getRequiredInputs();
        const isEmpty = (inputNode) => inputNode.value === '';
        return !requiredInputs.some(isEmpty);
    }

    const _validateForm = () => {
        /**Creates a new task object, pushes such to localStorage, and updates
         * user interface.*/
        let newTaskObj = createTask(
            document.querySelector('#addTaskInputText').value);
        localStorageConfig.pushTask(newTaskObj);
        userInterfaceConfig.showInbox();
    }

    const _invalidateForm = () => {
        /**Adds 'is-invalid' class to classLists of all required input
         * nodes that are empty.*/
        const requiredInputs = _getRequiredInputs();
        for (let i = 0; i < requiredInputs.length; i++) {
            if (requiredInputs[i].value === '') {
                requiredInputs[i].classList.add('is-invalid');
            }
        }
    }

    const _resetForm = () => {
        /**Resets all field in modal's form.*/
        let form = document.querySelector('#addTaskForm');
        let formInputs = form.getElementsByTagName('input');
        for (let i = 0; i < formInputs.length; i++) {
            formInputs[i].value = '';
            formInputs[i].classList.remove('is-invalid');
        }
    }

    const _setUpProjectsDropdown = () => {
        /**Adds all current projects to #addTaskInputProject dropdown menu.*/
        let dropdownMenu = document.querySelector('#addTaskInputProject');
        let projects = localStorageConfig.getLocalStorageAsObject().projects;
        for (let i = 0; i < projects.length; i++) {
            let newDropdownItem = document.createElement('option');
            newDropdownItem.innerHTML = projects[i].name;
            dropdownMenu.appendChild(newDropdownItem);
        }
    }

    const _setUpAddTaskButton = () => {
        /**Adds click event listener to "Add Task" button that makes it check
         * the modal's form. If user input valid, calls _validateForm() and 
         * closes and resets the modal. Otherwise, _invalidateForm() is 
         * called.*/
        let addTaskButton = document.querySelector('#addTaskButton');
        addTaskButton.addEventListener('click', () => {
            if (_isRequiredInputsFilled()) {
                _validateForm();
                _addTaskModalNode.hide();
                _resetForm();
            } else {
                _invalidateForm();
            }
        });
    }

    const _setUpCancelButton = () => {
        /**Adds click event listener to modal's "Cancel" button that makes it
         * reset the modal before closing it.*/
        let cancelButton = document.querySelector('#addTaskCancelButton');
        cancelButton.addEventListener('click', _resetForm);
    }

    localStorageConfig.pushProject(createProject('Chores'));
    localStorageConfig.pushProject(createProject('Academics'));
    localStorageConfig.pushProject(createProject('Fitness'));

    _setUpProjectsDropdown();
    _setUpAddTaskButton();
    _setUpCancelButton();
})();

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