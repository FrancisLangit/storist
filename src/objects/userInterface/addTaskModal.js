window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');

import { createTask } from '../createTask.js';
import { localStorageConfig } from '../localStorageConfig.js';
import { tasksCard } from './tasksCard.js';

const addTaskModal = (() => {
    /**"Add Task" modal that appears when "+ Add Task" button is clicked.*/
    let _modalNode = new bootstrap.Modal(
        document.querySelector('#addTaskModal'), { keyboard: false });

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

    const _validateFormIntoStorage = (taskText, taskProjectName) => {
        /**Creates a new task object, pushes such to localStorage, and updates
         * user interface.*/ 
        let taskObject = createTask(taskText, taskProjectName)
        localStorageConfig.pushTask(taskObject, taskProjectName)
        if (taskProjectName) {
            tasksCard.showProject(taskProjectName);
        } else {
            tasksCard.showInbox();
        }
    }

    const _validateForm = () => {
        /**Passes form field values into _validateFormIntoStorage().*/
        let taskText = document.querySelector('#addTaskInputText').value;
        let taskProject = document.querySelector('#addTaskInputProject').value;
        if (taskProject === 'None') {
            _validateFormIntoStorage(taskText);
        } else {
            _validateFormIntoStorage(taskText, taskProject);
        }
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

    const _resetAddTaskButton = () => {
        /**Removes all event listeners from the Add Task button. */
        let addTaskButton = document.querySelector('#addTaskButton');
        let addTaskButtonClone = addTaskButton.cloneNode(true);
        let addTaskButtonParent = addTaskButton.parentNode;
        addTaskButtonParent.replaceChild(addTaskButtonClone, addTaskButton);
    }


    const _setUpAddTaskButton = () => {
        /**Adds click event listener to "Add Task" button. Makes it check 
         * modal's form. If user input valid, calls _validateForm() and 
         * closes and resets the modal. Otherwise, calls _invalidateForm().*/
        let addTaskButton = document.querySelector('#addTaskButton');
        addTaskButton.innerHTML = 'Add Task';
        addTaskButton.addEventListener('click', () => {
            if (_isRequiredInputsFilled()) {
                _validateForm();
                _modalNode.hide();
                _reset();
            } else {
                _invalidateForm();
            }
        });
    }

    const _resetFormFields = () => {
        /**Resets modals form fields.*/
        let form = document.querySelector('#addTaskForm');
        let formInputs = form.getElementsByTagName('input');
        for (let i = 0; i < formInputs.length; i++) {
            formInputs[i].value = '';
            formInputs[i].classList.remove('is-invalid');
        }
        document.querySelector('#addTaskInputProject').disabled = false;
    }

    const _reset = () => {
        /**Resets modal's form fields, Add Task button, and header.*/
        _resetFormFields()
        _resetAddTaskButton();
        _setUpAddTaskButton();
        document.querySelector('#addTaskModalLabel').innerHTML = 'Add Task';
    }

    const _setUpCancelButton = () => {
        /**Adds click event listener to modal's "Cancel" button that makes it
         * reset the modal before closing it.*/
        let cancelButton = document.querySelector('#addTaskCancelButton');
        cancelButton.addEventListener('click', _reset);
    }

    const _getResetProjectField = () => {
        /**Returns cleared #addTaskInputProject dropdown menu with an appended 
         * 'None' option.*/
        let projectField = document.querySelector('#addTaskInputProject');
        projectField.innerHTML = '';

        let noneDropdownOption = document.createElement('option');
        noneDropdownOption.innerHTML += 'None';
        projectField.appendChild(noneDropdownOption);

        return projectField;
    }

    const updateProjectField = () => {
        /**Resets #addTaskInputProject dropdown menu and adds all current
         * projects to it as choices.*/
        let projectField = _getResetProjectField();
        let projects = localStorageConfig.getLocalStorageAsObject().projects;
        for (let i = 0; i < projects.length; i++) {
            let newDropdownItem = document.createElement('option');
            newDropdownItem.innerHTML = projects[i].name;
            projectField.appendChild(newDropdownItem);
        }
    }

    const setProjectField = () => {
        /**Makes selected option in "Projects" dropdown menu equal to current
         * project being viewed. Sets selected option to "None" if current 
         * view is Inbox.*/
        let projectNameDisplay = document.querySelector(
            '#tasksCardProjectNameDisplay').innerHTML;
        let projectField = document.querySelector("#addTaskInputProject");
        let projectFieldOptions = projectField.querySelectorAll('option');

        for (let i = 0; i < projectFieldOptions.length; i++) {
            if (projectNameDisplay === projectFieldOptions[i].value) {
                projectFieldOptions[i].selected = true;
                break;
            } else if (projectNameDisplay === 'Inbox') {
                projectField.value = 'None';
                break;
            }
        }
    }

    const _styleAsEditTaskModal = (textFieldValue) => {
        /**Styles the modal as an Edit Task Modal.*/
        document.querySelector('#addTaskModalLabel').innerHTML = 'Edit Task';
        document.querySelector('#addTaskButton').innerHTML = 'Edit Task';
        document.querySelector('#addTaskInputText').value = textFieldValue;
        document.querySelector('#addTaskInputProject').disabled = true;
        setProjectField();
    }

    const _getEditedTaskObject = (taskObject) => {
        /**Returns a task object with paremeters set to current values of 
         * modal form's input fields.
         * 
         * Args:
         *  taskObject (object) : Task object to be edited.*/
        let taskVal = document.querySelector('#addTaskInputText').value;
        let projectVal = document.querySelector('#addTaskInputProject').value;

        taskObject.text = taskVal;
        if (projectVal === 'None') {
            delete taskObject.parentProjectName;
        } else {
            taskObject.parentProjectName = projectVal;
        }

        return taskObject;
    }

    const _showEditedTask = (editedTaskObject) => {
        /**Updates contents of task card dependent on task object passed.
         * 
         * Args:
         *  editedTaskObject (object) : Edited task object from 
         *      _getEditedTaskObject method.*/
        if (editedTaskObject.parentProjectName) {
            tasksCard.showProject(editedTaskObject.parentProjectName);
        } else {
            tasksCard.showInbox();
        }
    }

    const _setUpEditTaskButton = (taskObject) => {
        /**Turns Add Task button into Edit Task button. Such replaces task 
         * object passed with another task object made out of current input 
         * field values.
         * 
         * Args: 
         *  taskObject (object) : Task object to be edited.*/
        _resetAddTaskButton();
        let addTaskButton = document.querySelector('#addTaskButton');
        addTaskButton.addEventListener('click', () => {
            if (_isRequiredInputsFilled()) {
                let editedTaskObject = _getEditedTaskObject(taskObject);
                localStorageConfig.editTask(editedTaskObject);
                _showEditedTask(editedTaskObject);
                _modalNode.hide();
                _reset();
            } else {
                _invalidateForm();
            }
        });
    }

    const _setUpDeleteTaskButton = (taskObject) => {
        /**Adds click event listener to Delete Task modal Delete Task button. 
         * Makes it delete the specified task from localStorage.*/
        let deleteTaskButton = document.querySelector('#deleteTaskButton');
        deleteTaskButton.addEventListener('click', () => {
            localStorageConfig.deleteTask(taskObject);
        });
    }

    const openAsEditTaskModal = (taskObject) => {
        /**Opens the modal as an "Edit Task" modal with functionality built 
         * to edit task object opened.
         * 
         * Args:
         *  taskObject (object): Task object to be edited.*/
        _styleAsEditTaskModal(taskObject.text);
        _setUpEditTaskButton(taskObject);
        _setUpDeleteTaskButton(taskObject);
        _modalNode.show();
    }

    _setUpAddTaskButton();
    _setUpCancelButton();
    updateProjectField();

    return { updateProjectField, setProjectField, openAsEditTaskModal }
})();

export { addTaskModal }