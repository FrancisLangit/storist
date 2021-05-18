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

    const _validateForm = () => {
        /**Creates a new task object, pushes such to localStorage, and updates
         * user interface.*/
        let newTaskObject = createTask(
            document.querySelector('#addTaskInputText').value);
        let targetProjectName = (
            document.querySelector('#addTaskInputProject').value);

        if (targetProjectName === 'None') {
            localStorageConfig.pushTask(newTaskObject);
            tasksCard.showInbox();
        } else {
            localStorageConfig.pushTask(newTaskObject, targetProjectName)
            tasksCard.showProject(targetProjectName);
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

    const _resetForm = () => {
        /**Resets all field in modal's form.*/
        let form = document.querySelector('#addTaskForm');
        let formInputs = form.getElementsByTagName('input');
        for (let i = 0; i < formInputs.length; i++) {
            formInputs[i].value = '';
            formInputs[i].classList.remove('is-invalid');
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
                _modalNode.hide();
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

    const _getResetProjectsDropdown = () => {
        /**Returns cleared #addTaskInputProject dropdown menu with an appended 
         * 'None' option.*/
        let projectsDropdown = document.querySelector('#addTaskInputProject');
        projectsDropdown.innerHTML = '';

        let noneDropdownOption = document.createElement('option');
        noneDropdownOption.innerHTML += 'None';
        projectsDropdown.appendChild(noneDropdownOption);

        return projectsDropdown;
    }

    const updateProjectsDropdown = () => {
        /**Resets #addTaskInputProject dropdown menu and adds all current
         * projects to it as choices.*/
        let projectsDropdown = _getResetProjectsDropdown();
        let projects = localStorageConfig.getLocalStorageAsObject().projects;
        for (let i = 0; i < projects.length; i++) {
            let newDropdownItem = document.createElement('option');
            newDropdownItem.innerHTML = projects[i].name;
            projectsDropdown.appendChild(newDropdownItem);
        }
    }

    _setUpAddTaskButton();
    _setUpCancelButton();
    updateProjectsDropdown();

    return { updateProjectsDropdown }
})();

export { addTaskModal }