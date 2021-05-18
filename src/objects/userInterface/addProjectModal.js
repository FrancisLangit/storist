window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');

import { createProject } from '../createProject.js';
import { localStorageConfig } from '../localStorageConfig.js';

import { addTaskModal } from './addTaskModal.js'
import { projectsButton } from './projectsButton.js';

const addProjectModal = (() => {
    /**Modal where user fills out form to add a new project.*/
    let _modalNode = new bootstrap.Modal(
        document.querySelector('#addProjectModal'));
    
    const _isInputValid = () => {
        /**Returns true if "Name" field is filled. Else, returns false.*/
        let nameInput = document.querySelector('#addProjectInputName');
        return nameInput.value !== '';
    }

    const _validateForm = () => {
        /**Creates a new project object out of user input, pushes such to 
         * localStorage, and updates the Projects button dropdown menu.*/
        let projectName = (
            document.querySelector('#addProjectInputName').value);
        let projectObj = createProject(projectName);
        localStorageConfig.pushProject(projectObj);
        projectsButton.updateDropdownMenu();
        addTaskModal.updateProjectsDropdown();
    }

    const _invalidateForm = () => {
        /**Adds "is-invalid" class to node of name field.*/
        let inputNameNode = document.querySelector('#addProjectInputName');
        inputNameNode.classList.add('is-invalid');
    }

    const _resetForm = () => {
        /**Removes "is-invalid" class from name field node and clears its 
         * contents.*/
        let inputNameNode = document.querySelector('#addProjectInputName');
        inputNameNode.classList.remove('is-invalid');
        inputNameNode.value = '';
    }

    const _setUpAddProjectButton = () => {
        /**Adds click event listener to "Add Project" button of modal. Makes 
         * it validate form dependent on user input.*/
        let addProjectButton = document.querySelector('#addProjectButton');
        addProjectButton.addEventListener('click', () => {
            if (_isInputValid()) {
                _validateForm();
                _modalNode.hide();
                _resetForm();
            } else {
                _invalidateForm();
            }
        });
    }

    const _setUpCancelButton = () => {
        /**Adds click event listener to "Cancel" button of modal. Makes it 
         * reset the form.*/
        let cancelButton = document.querySelector('#addProjectCancelButton');
        cancelButton.addEventListener('click', _resetForm);
    }

    _setUpAddProjectButton();
    _setUpCancelButton();
})();

export { addProjectModal }