window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');

import { createProject } from '../createProject.js';
import { localStorageConfig } from '../localStorageConfig.js';

import { projectsButton } from './projectsButton.js';

const addProjectModal = (() => {
    let _modalNode = new bootstrap.Modal(
        document.querySelector('#addProjectModal'));
    
    const _setUpAddProjectButton = () => {
        let addProjectButton = document.querySelector('#addProjectButton');
        addProjectButton.addEventListener('click', () => {
            let projectName = (
                document.querySelector('#addProjectInputName').value);
            let projectObj = createProject(projectName);
            localStorageConfig.pushProject(projectObj);
            projectsButton.updateDropdownMenu();
        });
    }

    _setUpAddProjectButton();
})();